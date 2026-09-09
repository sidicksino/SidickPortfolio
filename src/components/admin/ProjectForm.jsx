import { useEffect, useRef, useState } from "react";
import { api, ApiError } from "../../lib/adminApi";

const CATEGORIES = ["web", "mobile", "design", "ai"];

const EMPTY = {
  category: "web",
  title_en: "",
  title_fr: "",
  description_en: "",
  description_fr: "",
  technologies: "",
  image_url: "",
  image_public_id: "",
  live_url: "",
  github_url: "",
  featured: false,
  featured_order: 0,
  sort_order: 0,
};

/** API row -> form state (technologies is an array there, a string here). */
const toForm = (p) =>
  !p
    ? { ...EMPTY }
    : {
        ...EMPTY,
        ...p,
        technologies: (p.technologies || []).join(", "),
        image_url: p.image_url || "",
        image_public_id: p.image_public_id || "",
        live_url: p.live_url || "",
        github_url: p.github_url || "",
      };

const ProjectForm = ({ project, onSaved, onCancel }) => {
  const isNew = !project;
  const [form, setForm] = useState(() => toForm(project));
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  useEffect(() => setForm(toForm(project)), [project]);

  const set = (k) => (e) =>
    setForm((f) => ({
      ...f,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  /* Mirrors the API's own rules so a mistake is caught before the round trip
     — the server still enforces all of this. */
  const validate = () => {
    const req = ["title_en", "title_fr", "description_en", "description_fr"];
    for (const k of req) {
      if (!form[k].trim()) return `${k.replace("_", " ")} is required`;
    }
    if (!form.image_url.trim()) return "An image is required";
    for (const k of ["live_url", "github_url", "image_url"]) {
      const v = form[k].trim();
      if (v && !/^https?:\/\//i.test(v)) return `${k.replace("_", " ")} must start with http`;
    }
    return "";
  };

  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { image_url, image_public_id } = await api.uploadImage(file);
      setForm((f) => ({ ...f, image_url, image_public_id }));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const problem = validate();
    if (problem) return setError(problem);

    setBusy(true);
    setError("");
    const payload = {
      category: form.category,
      title_en: form.title_en.trim(),
      title_fr: form.title_fr.trim(),
      description_en: form.description_en.trim(),
      description_fr: form.description_fr.trim(),
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      image_url: form.image_url.trim(),
      image_public_id: form.image_public_id.trim() || null,
      // null, not "": the API expects a URL or nothing at all.
      live_url: form.live_url.trim() || null,
      github_url: form.github_url.trim() || null,
      featured: form.featured,
      featured_order: Number(form.featured_order) || 0,
      sort_order: Number(form.sort_order) || 0,
    };
    try {
      const saved = isNew
        ? await api.createProject(payload)
        : await api.updateProject(project.id, payload);
      onSaved(saved);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="af" onSubmit={submit}>
      <h2>{isNew ? "New project" : `Edit — ${project.title_en}`}</h2>
      {error && <p className="af-error">{error}</p>}

      <div className="af-row">
        <label>
          <span>Category</span>
          <select value={form.category} onChange={set("category")}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Order on its category page</span>
          <input type="number" value={form.sort_order} onChange={set("sort_order")} />
        </label>
      </div>

      {/* Both languages together: the site is bilingual, so a project saved
          with only English would show an empty card to French visitors. */}
      <div className="af-row">
        <label>
          <span>Title (EN) *</span>
          <input value={form.title_en} onChange={set("title_en")} />
        </label>
        <label>
          <span>Titre (FR) *</span>
          <input value={form.title_fr} onChange={set("title_fr")} />
        </label>
      </div>

      <div className="af-row">
        <label>
          <span>Description (EN) *</span>
          <textarea rows={3} value={form.description_en} onChange={set("description_en")} />
        </label>
        <label>
          <span>Description (FR) *</span>
          <textarea rows={3} value={form.description_fr} onChange={set("description_fr")} />
        </label>
      </div>

      <label>
        <span>Technologies — comma separated</span>
        <input
          value={form.technologies}
          onChange={set("technologies")}
          placeholder="React, Node.js, MongoDB"
        />
      </label>

      <div className="af-row">
        <label>
          <span>Live URL — leave empty for apps with no public site</span>
          <input value={form.live_url} onChange={set("live_url")} placeholder="https://…" />
        </label>
        <label>
          <span>GitHub URL</span>
          <input value={form.github_url} onChange={set("github_url")} placeholder="https://…" />
        </label>
      </div>

      <div className="af-image">
        <div className="af-preview">
          {form.image_url ? (
            <img src={form.image_url} alt="" />
          ) : (
            <span>No image yet</span>
          )}
        </div>
        <div className="af-imagectl">
          <span className="af-lbl">Screenshot *</span>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif"
            onChange={(e) => upload(e.target.files?.[0])}
          />
          {uploading && <p className="af-hint">Uploading to Cloudinary…</p>}
          <p className="af-hint">Max 5 MB. Converted to WebP automatically.</p>
        </div>
      </div>

      <fieldset className="af-featured">
        <legend>Featured Work</legend>
        <p className="af-hint">
          The homepage shows a small selection above &ldquo;My Projects&rdquo;.
          Tick this to put the project there. Every project appears on its
          category page either way — this only controls the homepage.
        </p>
        <div className="af-row">
          <label className="af-check">
            <input type="checkbox" checked={form.featured} onChange={set("featured")} />
            <span>Show in Featured Work</span>
          </label>
          <label>
            <span>Position — 1 shows first</span>
            <input
              type="number"
              min="1"
              value={form.featured_order}
              onChange={set("featured_order")}
              disabled={!form.featured}
            />
            <span className="af-hint">
              Desktop shows 8, phones show only the first 6 — so anything past
              position 6 is invisible on a phone.
            </span>
          </label>
        </div>
      </fieldset>

      <div className="af-actions">
        <button type="submit" className="af-primary" disabled={busy || uploading}>
          {busy ? "Saving…" : isNew ? "Create project" : "Save changes"}
        </button>
        <button type="button" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
