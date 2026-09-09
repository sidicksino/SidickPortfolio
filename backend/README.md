# Portfolio API

FastAPI + Neon (Postgres) + Cloudinary. Serves the projects for the portfolio
and backs the admin dashboard. Reads are public; every write needs a token.

Deliberately small: one table, one admin, no user system.

## Endpoints

| | | |
|---|---|---|
| `POST` | `/auth/login` | email + password -> JWT (12 h) |
| `GET` | `/projects` | public. `?category=web` `?featured=true` |
| `GET` | `/projects/{id}` | public |
| `POST` | `/projects` | **auth** — create |
| `PATCH` | `/projects/{id}` | **auth** — partial update |
| `DELETE` | `/projects/{id}` | **auth** — also removes the Cloudinary file |
| `POST` | `/upload` | **auth** — multipart image -> Cloudinary URL |
| `GET` | `/health` | for Render's health check |

Interactive docs at `/docs` once it's running.

## Setup

**1. Neon** — create a project, copy the **pooled** connection string, then:

```bash
psql "$DATABASE_URL" -f schema.sql
```

**2. Cloudinary** — the three values are on your dashboard.

**3. Local run**

```bash
python3.11 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # then fill it in
python make_hash.py 'your password'   # paste into ADMIN_PASSWORD_HASH
uvicorn main:app --reload
```

Needs **Python 3.10+** — the annotations use `str | None`.

**4. Migrate the existing 19 projects**

```bash
python seed.py --dry-run   # reports problems, writes nothing
python seed.py             # uploads images to Cloudinary, inserts rows
```

Idempotent — re-running skips anything whose `live_url` is already there.

Two things it will report, both pre-existing:
- `mobile/1` and `mobile/4` have no screenshot -> inserted with `image_url`
  NULL. Add one through the dashboard; the API refuses to *create* without one.
- `web/5` and `ai/1` are the same project (identical live URL). `live_url` is
  `UNIQUE`, so only the first lands. Decide which category it belongs in.

## Deploy to Render

Point Render at this repo; `render.yaml` sets root dir, build and start
commands. Set the secrets in the dashboard (`JWT_SECRET` is generated for you).

**Set `CORS_ORIGINS` to your real domain before going live** — it defaults to
localhost only, so the deployed site cannot call the API until you do.

Free tier sleeps after ~15 min idle and cold-starts in ~30 s. Fine here: only
the dashboard and the build step talk to it, never a visitor.

## Tests

```bash
python test_api.py
```

20 checks covering auth and validation. No database needed — the DB dependency
is stubbed with an object that fails loudly if a request reaches it, which is
how the whitespace-title bug was found.
