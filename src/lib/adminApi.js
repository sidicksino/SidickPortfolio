/**
 * Thin client for the portfolio API.
 *
 * The base URL is a build-time env var so the dashboard can point at a local
 * backend during development without a code change.
 */
const BASE = (
  import.meta.env.VITE_API_URL || "https://sidickportfolio.onrender.com"
).replace(/\/$/, "");

const TOKEN_KEY = "portfolio-admin-token";

export const getToken = () => localStorage.getItem(TOKEN_KEY) || "";
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/** Thrown for any non-2xx, carrying the API's own message where there is one. */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

/** FastAPI returns 422 detail as an array of {loc, msg}. Make it readable. */
function describe(detail) {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((d) => {
        const field = (d.loc || []).filter((x) => x !== "body").join(".");
        return field ? `${field}: ${d.msg}` : d.msg;
      })
      .join("\n");
  }
  return "Request failed";
}

async function request(path, { method = "GET", body, auth = false, raw } = {}) {
  const headers = {};
  if (auth) headers.Authorization = `Bearer ${getToken()}`;
  if (body && !raw) headers["Content-Type"] = "application/json";

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: raw ? body : body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && auth) {
    clearToken();
    throw new ApiError("Session expired — sign in again", 401);
  }
  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try {
      detail = describe((await res.json()).detail);
    } catch {
      /* non-JSON error body; keep the status */
    }
    throw new ApiError(detail, res.status);
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  base: BASE,

  /** Render's free tier sleeps; this is what the "waking up" state polls. */
  health: () => request("/health"),

  login: (email, password) =>
    request("/auth/login", { method: "POST", body: { email, password } }),

  listProjects: () => request("/projects"),

  createProject: (data) =>
    request("/projects", { method: "POST", body: data, auth: true }),

  updateProject: (id, data) =>
    request(`/projects/${id}`, { method: "PATCH", body: data, auth: true }),

  deleteProject: (id) =>
    request(`/projects/${id}`, { method: "DELETE", auth: true }),

  uploadImage: (file) => {
    const fd = new FormData();
    fd.append("file", file);
    return request("/upload", { method: "POST", body: fd, auth: true, raw: true });
  },

  publish: () => request("/publish", { method: "POST", auth: true }),
};
