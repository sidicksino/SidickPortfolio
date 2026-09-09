from contextlib import asynccontextmanager

import httpx
from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from psycopg import errors

from auth import create_token, require_admin, verify_password
from config import settings
from db import get_conn, pool
from schemas import (
    LoginIn,
    ProjectCreate,
    ProjectOut,
    ProjectUpdate,
    TokenOut,
    UploadOut,
)
from storage import delete_image, upload_image

MAX_IMAGE_BYTES = 5 * 1024 * 1024
ALLOWED_IMAGE_TYPES = {"image/png", "image/jpeg", "image/webp", "image/avif"}

# NOTE: require_admin is declared BEFORE get_conn in every write handler.
# FastAPI resolves dependencies in signature order, so the other way round
# opened a database connection for requests that were about to be rejected.
COLUMNS = """id, category, title_en, title_fr, description_en, description_fr,
             technologies, image_url, image_public_id, live_url, github_url,
             featured, featured_order, sort_order"""


@asynccontextmanager
async def lifespan(_: FastAPI):
    pool.open()
    yield
    pool.close()


app = FastAPI(title="Sidick Sino — Portfolio API", version="1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    """Render pings this; it also warms the free-tier dyno."""
    with pool.connection() as conn:
        conn.execute("SELECT 1")
    return {"status": "ok"}


# ---------------------------------------------------------------- auth
@app.post("/auth/login", response_model=TokenOut)
def login(body: LoginIn):
    ok = body.email.lower() == settings.admin_email.lower() and verify_password(
        body.password, settings.admin_password_hash
    )
    if not ok:
        # Same message either way: never reveal which half was wrong.
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid credentials")
    return TokenOut(access_token=create_token(settings.admin_email))


# ------------------------------------------------------------- projects
@app.get("/projects", response_model=list[ProjectOut])
def list_projects(category: str | None = None, featured: bool | None = None,
                  conn=Depends(get_conn)):
    sql = f"SELECT {COLUMNS} FROM projects"
    where, params = [], []
    if category:
        where.append("category = %s")
        params.append(category)
    if featured is not None:
        where.append("featured = %s")
        params.append(featured)
    if where:
        sql += " WHERE " + " AND ".join(where)
    sql += " ORDER BY featured_order, sort_order, id" if featured \
        else " ORDER BY sort_order, id"
    return conn.execute(sql, params).fetchall()


@app.get("/projects/{project_id}", response_model=ProjectOut)
def get_project(project_id: int, conn=Depends(get_conn)):
    row = conn.execute(
        f"SELECT {COLUMNS} FROM projects WHERE id = %s", (project_id,)
    ).fetchone()
    if not row:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Project not found")
    return row


@app.post("/projects", response_model=ProjectOut, status_code=201)
def create_project(body: ProjectCreate, _: str = Depends(require_admin),
                   conn=Depends(get_conn)):
    data = body.model_dump()
    for k in ("live_url", "github_url", "image_url"):
        if data.get(k) is not None:
            data[k] = str(data[k])
    cols = list(data)
    sql = (
        f"INSERT INTO projects ({', '.join(cols)}) "
        f"VALUES ({', '.join(['%s'] * len(cols))}) RETURNING {COLUMNS}"
    )
    try:
        return conn.execute(sql, [data[c] for c in cols]).fetchone()
    except errors.UniqueViolation:
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            "A project with that live URL already exists",
        )


@app.patch("/projects/{project_id}", response_model=ProjectOut)
def update_project(project_id: int, body: ProjectUpdate,
                   _: str = Depends(require_admin), conn=Depends(get_conn)):
    data = body.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Nothing to update")
    for k in ("live_url", "github_url", "image_url"):
        if data.get(k) is not None:
            data[k] = str(data[k])
    sets = ", ".join(f"{c} = %s" for c in data)
    try:
        row = conn.execute(
            f"UPDATE projects SET {sets} WHERE id = %s RETURNING {COLUMNS}",
            [*data.values(), project_id],
        ).fetchone()
    except errors.UniqueViolation:
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            "A project with that live URL already exists",
        )
    if not row:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Project not found")
    return row


@app.delete("/projects/{project_id}", status_code=204)
def delete_project(project_id: int, _: str = Depends(require_admin),
                   conn=Depends(get_conn)):
    row = conn.execute(
        "DELETE FROM projects WHERE id = %s RETURNING image_public_id",
        (project_id,),
    ).fetchone()
    if not row:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Project not found")
    if row["image_public_id"]:
        delete_image(row["image_public_id"])


# -------------------------------------------------------------- publish
@app.post("/publish")
def publish(_: str = Depends(require_admin)):
    """Trigger a Vercel rebuild so the static site picks up the new data.

    The site reads projects from a JSON file baked at build time, so a save is
    not visible until a rebuild runs. Takes about a minute.
    """
    if not settings.vercel_deploy_hook:
        # Naming the variable is not enough — say where to put it. This fires
        # when the env var exists locally but was never added to the host.
        raise HTTPException(
            status.HTTP_501_NOT_IMPLEMENTED,
            "Publishing is not configured: VERCEL_DEPLOY_HOOK is missing from "
            "this server's environment. Add it in Render > your service > "
            "Environment (Vercel > Settings > Git > Deploy Hooks), then save — "
            "Render redeploys and Publish will work. Saving projects is "
            "unaffected; only the rebuild is.",
        )
    try:
        r = httpx.post(settings.vercel_deploy_hook, timeout=20)
        r.raise_for_status()
    except httpx.HTTPError as exc:
        raise HTTPException(
            status.HTTP_502_BAD_GATEWAY, f"Deploy hook failed: {exc}"
        )
    return {"triggered": True, "vercel": r.json() if r.content else None}


# -------------------------------------------------------------- uploads
@app.post("/upload", response_model=UploadOut)
async def upload(file: UploadFile = File(...), _: str = Depends(require_admin)):
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            f"Use one of: {', '.join(sorted(ALLOWED_IMAGE_TYPES))}",
        )
    blob = await file.read()
    if len(blob) > MAX_IMAGE_BYTES:
        raise HTTPException(
            status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, "Image must be under 5 MB"
        )
    if not blob:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Empty file")
    return upload_image(blob)
