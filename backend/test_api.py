"""Behaviour checks that need no database — auth and validation only."""
import io, os

os.environ.setdefault("DATABASE_URL", "postgresql://u:p@localhost:5432/db")
os.environ.setdefault("JWT_SECRET", "test-secret-not-real")
os.environ.setdefault("ADMIN_EMAIL", "me@example.com")
os.environ.setdefault("CLOUDINARY_CLOUD_NAME", "x")
os.environ.setdefault("CLOUDINARY_API_KEY", "y")
os.environ.setdefault("CLOUDINARY_API_SECRET", "z")

import bcrypt
PW = "correct horse battery"
os.environ.setdefault("ADMIN_PASSWORD_HASH",
                      bcrypt.hashpw(PW.encode(), bcrypt.gensalt()).decode())

from fastapi.testclient import TestClient
import main
from db import get_conn
from schemas import ProjectCreate


class _NoDB:
    """Stand-in connection. These cases must be rejected before any query runs;
    if one reaches the database the test fails loudly instead of passing."""

    def execute(self, *a, **k):
        raise AssertionError("request reached the database — it should not have")


main.app.dependency_overrides[get_conn] = lambda: _NoDB()
c = TestClient(main.app)
fails = []
def check(name, cond, extra=""):
    print(f"  {'pass' if cond else 'FAIL'}  {name}{'' if cond else '  <- '+str(extra)}")
    if not cond: fails.append(name)

r = c.post("/auth/login", json={"email": "me@example.com", "password": "wrong"})
check("wrong password -> 401", r.status_code == 401, r.status_code)
check("error does not say which half was wrong", "password" not in r.text.lower(), r.text)

r = c.post("/auth/login", json={"email": "nobody@example.com", "password": PW})
check("wrong email -> 401", r.status_code == 401, r.status_code)

r = c.post("/auth/login", json={"email": "ME@Example.com", "password": PW})
check("correct login (case-insensitive email) -> 200", r.status_code == 200, r.text[:120])
token = r.json().get("access_token", "")
check("returns a token", bool(token))
AUTH = {"Authorization": f"Bearer {token}"}

good = {"category": "web", "title_en": "T", "title_fr": "T",
        "description_en": "d", "description_fr": "d",
        "image_url": "https://example.com/a.webp"}

check("create without token -> 401", c.post("/projects", json=good).status_code == 401)
check("delete without token -> 401", c.delete("/projects/1").status_code == 401)
check("upload without token -> 401",
      c.post("/upload", files={"file": ("a.png", b"x", "image/png")}).status_code == 401)
check("bad token -> 401",
      c.post("/projects", json=good,
             headers={"Authorization": "Bearer nonsense"}).status_code == 401)

r = c.post("/projects", json={**good, "category": "blockchain"}, headers=AUTH)
check("unknown category -> 422", r.status_code == 422, r.status_code)
r = c.post("/projects", json={**good, "title_en": "   "}, headers=AUTH)
check("blank title rejected", r.status_code == 422, r.status_code)
r = c.post("/projects", json={**good, "description_fr": "  \t "}, headers=AUTH)
check("blank description rejected", r.status_code == 422, r.status_code)
r = c.patch("/projects/1", json={"title_en": "  "}, headers=AUTH)
check("blank title rejected on PATCH too", r.status_code == 422, r.status_code)
p2 = ProjectCreate(**{**good, "title_en": "  Spaced  "})
check("valid text is stripped", p2.title_en == "Spaced", repr(p2.title_en))

r = c.post("/projects", json={k: v for k, v in good.items() if k != "image_url"},
           headers=AUTH)
check("missing image_url -> 422 (the mobile/1 bug)", r.status_code == 422, r.status_code)
r = c.post("/projects", json={**good, "live_url": "not-a-url"}, headers=AUTH)
check("malformed live_url -> 422", r.status_code == 422, r.status_code)
r = c.patch("/projects/1", json={"titel_en": "typo"}, headers=AUTH)
check("unknown field on PATCH -> 422", r.status_code == 422, r.status_code)

p = ProjectCreate(**{**good, "technologies": [" React ", "react", "", "Node.js"]})
check("technologies trimmed + de-duplicated",
      p.technologies == ["React", "Node.js"], p.technologies)

r = c.post("/upload", files={"file": ("a.txt", b"hello", "text/plain")}, headers=AUTH)
check("non-image upload -> 415", r.status_code == 415, r.status_code)
r = c.post("/upload",
           files={"file": ("big.png", io.BytesIO(b"0" * (6 * 1024 * 1024)), "image/png")},
           headers=AUTH)
check("oversized upload -> 413", r.status_code == 413, r.status_code)

print(f"\n{'ALL PASS' if not fails else str(len(fails)) + ' FAILED: ' + ', '.join(fails)}")
raise SystemExit(1 if fails else 0)
