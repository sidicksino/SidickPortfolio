"""One-time migration of the 19 hardcoded projects into Neon + Cloudinary.

    python seed.py --dry-run     # report only, writes nothing
    python seed.py               # upload images, insert rows

Idempotent: re-running skips anything whose live_url is already present.
"""

import argparse
import json
import sys
from pathlib import Path

from db import pool
from storage import upload_image

HERE = Path(__file__).parent
ASSETS = HERE.parent / "src" / "assets"


def preflight(rows: list[dict]) -> None:
    """Report the data problems before touching anything."""
    by_url: dict[str, list[str]] = {}
    for r in rows:
        if r["live_url"]:
            by_url.setdefault(r["live_url"], []).append(
                f"{r['category']}/{r['legacy_id']}"
            )
    dupes = {u: w for u, w in by_url.items() if len(w) > 1}
    missing = [f"{r['category']}/{r['legacy_id']}" for r in rows if not r["image_file"]]

    print(f"{len(rows)} projects in seed_data.json")
    if missing:
        print(f"  no image ({len(missing)}): {', '.join(missing)}")
        print("    -> inserted with image_url NULL; add one via the dashboard.")
    if dupes:
        print(f"  duplicate live_url ({len(dupes)}):")
        for url, who in dupes.items():
            print(f"    {' and '.join(who)} both point at {url}")
        print("    -> live_url is UNIQUE; only the first is inserted.")
    if not missing and not dupes:
        print("  no data problems found")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    rows = json.loads((HERE / "seed_data.json").read_text())
    preflight(rows)
    if args.dry_run:
        print("\ndry run — nothing written")
        return 0

    pool.open()
    inserted = skipped = 0
    with pool.connection() as conn:
        for r in rows:
            image_url = image_id = None
            if r["image_file"]:
                path = ASSETS / r["image_file"]
                if not path.exists():
                    print(f"  ! missing asset {path.name}, inserting without image")
                else:
                    up = upload_image(
                        path.read_bytes(),
                        public_id=f"{r['category']}-{r['legacy_id']}",
                    )
                    image_url, image_id = up["image_url"], up["image_public_id"]

            res = conn.execute(
                """
                INSERT INTO projects (category, title_en, title_fr,
                    description_en, description_fr, technologies,
                    image_url, image_public_id, live_url, github_url, sort_order)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                ON CONFLICT (live_url) DO NOTHING
                RETURNING id
                """,
                (
                    r["category"], r["title_en"], r["title_fr"],
                    r["description_en"], r["description_fr"], r["technologies"],
                    image_url, image_id, r["live_url"], r["github_url"],
                    r["legacy_id"],
                ),
            ).fetchone()
            if res:
                inserted += 1
            else:
                skipped += 1
                print(f"  skipped {r['category']}/{r['legacy_id']} (live_url exists)")

    print(f"\ninserted {inserted}, skipped {skipped}")
    pool.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
