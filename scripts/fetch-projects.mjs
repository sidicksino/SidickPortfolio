/**
 * Bakes the project list into the bundle at build time.
 *
 * The site is static: no visitor ever calls the API, so the projects are in
 * the HTML for Google and there is no loading state. Saving in the dashboard
 * fires a Vercel deploy hook, which re-runs this.
 *
 * Render's free tier sleeps, so a cold start of up to ~60s is normal here —
 * hence the retries. If the API cannot be reached at all, the previously
 * committed JSON is kept and the build continues: a sleeping backend must
 * never take the portfolio down.
 */
import { writeFileSync, existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "src/data/projects.generated.json");
const API = process.env.API_URL || "https://sidickportfolio.onrender.com";

const ATTEMPTS = 5;
const TIMEOUT_MS = 45000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchProjects() {
  for (let i = 1; i <= ATTEMPTS; i++) {
    try {
      const ctl = AbortSignal.timeout(TIMEOUT_MS);
      const res = await fetch(`${API}/projects`, { signal: ctl });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("API returned no projects");
      }
      return data;
    } catch (err) {
      const last = i === ATTEMPTS;
      console.warn(`  attempt ${i}/${ATTEMPTS} failed: ${err.message}`);
      if (last) return null;
      await sleep(i * 5000); // 5s, 10s, 15s, 20s — covers a cold start
    }
  }
  return null;
}

const projects = await fetchProjects();

if (projects) {
  // Sort here, once, so the app never has to.
  projects.sort((a, b) => a.sort_order - b.sort_order || a.id - b.id);
  writeFileSync(OUT, JSON.stringify(projects, null, 2) + "\n");
  const featured = projects.filter((p) => p.featured).length;
  const noImage = projects.filter((p) => !p.image_url).length;
  console.log(
    `  wrote ${projects.length} projects (${featured} featured` +
      `${noImage ? `, ${noImage} without an image` : ""}) -> src/data/projects.generated.json`
  );
} else if (existsSync(OUT)) {
  const kept = JSON.parse(readFileSync(OUT, "utf8")).length;
  console.warn(
    `  API unreachable — keeping the committed ${kept} projects. ` +
      `The site builds; it just will not show changes made since the last successful build.`
  );
} else {
  console.error(
    "  API unreachable and no committed projects.generated.json exists."
  );
  process.exit(1);
}
