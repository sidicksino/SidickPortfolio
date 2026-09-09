import { useCallback, useEffect, useState } from "react";
import { api, ApiError, clearToken, getToken, setToken } from "../../lib/adminApi";
import ProjectForm from "./ProjectForm";
import "./Admin.css";

const CATEGORIES = ["all", "web", "mobile", "design", "ai"];

/** Render's free tier sleeps; a first request can take ~50s. Say so rather
    than showing a spinner that looks broken. */
const Waking = () => (
  <p className="ad-waking">
    Waking the server… Render&rsquo;s free tier sleeps after 15 minutes idle, so
    the first request can take up to a minute.
  </p>
);

const Login = ({ onDone }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const timer = setTimeout(() => setSlow(true), 3000);
    try {
      const { access_token } = await api.login(email, password);
      setToken(access_token);
      onDone();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not reach the API");
    } finally {
      clearTimeout(timer);
      setSlow(false);
      setBusy(false);
    }
  };

  return (
    <form className="ad-login" onSubmit={submit}>
      <h1>Dashboard</h1>
      <p className="ad-sub">Sign in to manage your projects.</p>
      {error && <p className="ad-error">{error}</p>}
      <label>
        <span>Email</span>
        <input
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
      {slow && <Waking />}
    </form>
  );
};

const Admin = () => {
  const [authed, setAuthed] = useState(() => Boolean(getToken()));
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null); // project | "new" | null
  const [loading, setLoading] = useState(false);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const timer = setTimeout(() => setSlow(true), 3000);
    try {
      setProjects(await api.listProjects());
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not load projects");
    } finally {
      clearTimeout(timer);
      setSlow(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  /* The page has no crawl value and must never be indexed. */
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    const prev = document.title;
    document.title = "Dashboard — Sidick Sino";
    return () => {
      meta.remove();
      document.title = prev;
    };
  }, []);

  const signOut = () => {
    clearToken();
    setAuthed(false);
    setProjects([]);
  };

  const onSaved = (saved) => {
    setProjects((list) => {
      const i = list.findIndex((p) => p.id === saved.id);
      return i === -1 ? [...list, saved] : list.map((p) => (p.id === saved.id ? saved : p));
    });
    setEditing(null);
    setNotice(`Saved "${saved.title_en}". Publish to put it on the live site.`);
  };

  const remove = async (p) => {
    // Deleting also removes the Cloudinary file — not undoable.
    if (!window.confirm(`Delete "${p.title_en}"? This also deletes its image.`)) return;
    try {
      await api.deleteProject(p.id);
      setProjects((list) => list.filter((x) => x.id !== p.id));
      setNotice(`Deleted "${p.title_en}". Publish to update the live site.`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Delete failed");
    }
  };

  const publish = async () => {
    setNotice("");
    setError("");
    try {
      await api.publish();
      setNotice("Rebuild triggered — the live site updates in about a minute.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Publish failed");
    }
  };

  if (!authed) return <div className="ad"><Login onDone={() => setAuthed(true)} /></div>;

  const shown =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const featuredCount = projects.filter((p) => p.featured).length;
  const noImage = projects.filter((p) => !p.image_url).length;

  return (
    <div className="ad">
      <header className="ad-head">
        <div>
          <h1>Projects</h1>
          <p className="ad-sub">
            {projects.length} total · {featuredCount} featured
            {noImage ? ` · ${noImage} without an image` : ""}
          </p>
        </div>
        <div className="ad-headctl">
          <button onClick={() => setEditing("new")}>New project</button>
          <button className="ad-primary" onClick={publish}>Publish</button>
          <button className="ad-ghost" onClick={signOut}>Sign out</button>
        </div>
      </header>

      {error && <p className="ad-error">{error}</p>}
      {notice && <p className="ad-notice">{notice}</p>}
      {loading && slow && <Waking />}

      {editing ? (
        <ProjectForm
          project={editing === "new" ? null : editing}
          onSaved={onSaved}
          onCancel={() => setEditing(null)}
        />
      ) : (
        <>
          <div className="ad-filters">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={c === filter ? "on" : ""}
                onClick={() => setFilter(c)}
              >
                {c}
                {c !== "all" && ` (${projects.filter((p) => p.category === c).length})`}
              </button>
            ))}
          </div>

          {loading && !projects.length ? (
            <p className="ad-sub">Loading…</p>
          ) : (
            <ul className="ad-list">
              {shown
                .slice()
                .sort((a, b) => a.sort_order - b.sort_order || a.id - b.id)
                .map((p) => (
                  <li key={p.id} className="ad-item">
                    <div className="ad-thumb">
                      {p.image_url ? <img src={p.image_url} alt="" /> : <span>no image</span>}
                    </div>
                    <div className="ad-meta">
                      <strong>{p.title_en}</strong>
                      <span className="ad-tags">
                        <em>{p.category}</em>
                        {p.featured && <em className="on">featured #{p.featured_order}</em>}
                        {!p.live_url && <em>no live URL</em>}
                      </span>
                      <span className="ad-fr">{p.title_fr}</span>
                    </div>
                    <div className="ad-itemctl">
                      <button onClick={() => setEditing(p)}>Edit</button>
                      <button className="ad-danger" onClick={() => remove(p)}>Delete</button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Admin;
