-- Neon Postgres schema. Run once:  psql "$DATABASE_URL" -f schema.sql

CREATE TABLE IF NOT EXISTS projects (
  id              BIGSERIAL PRIMARY KEY,

  -- CHECK, not free text: the frontend routes on exactly these four.
  category        TEXT        NOT NULL
                  CHECK (category IN ('web', 'mobile', 'design', 'ai')),

  title_en        TEXT        NOT NULL CHECK (length(trim(title_en)) > 0),
  title_fr        TEXT        NOT NULL CHECK (length(trim(title_fr)) > 0),
  description_en  TEXT        NOT NULL CHECK (length(trim(description_en)) > 0),
  description_fr  TEXT        NOT NULL CHECK (length(trim(description_fr)) > 0),

  technologies    TEXT[]      NOT NULL DEFAULT '{}',

  -- Nullable on purpose: two existing mobile projects have no screenshot, and
  -- the migration should not invent one. The CREATE endpoint requires it, so
  -- nothing new can be added without an image.
  image_url       TEXT,
  image_public_id TEXT,        -- Cloudinary id, so DELETE can clean up the file

  live_url        TEXT UNIQUE, -- UNIQUE catches the same project cross-listed
  github_url      TEXT,

  featured        BOOLEAN     NOT NULL DEFAULT FALSE,
  -- Separate from sort_order: sort_order ranks a project inside its category
  -- page, featured_order ranks it in the Featured Work grid. They differ, and
  -- the Featured order matters because phones show only the first six.
  featured_order  INTEGER     NOT NULL DEFAULT 0,
  sort_order      INTEGER     NOT NULL DEFAULT 0,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS projects_category_idx ON projects (category);
CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects (featured)
  WHERE featured;

CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS trigger AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS projects_touch ON projects;
CREATE TRIGGER projects_touch BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- Added after the first deploy; safe to re-run.
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured_order INTEGER NOT NULL DEFAULT 0;
