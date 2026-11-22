import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ACCENTS, ACCENT_STORAGE_KEY, applyAccent, getDefaultAccent } from "./theme/accents";
import "./AccentPicker.css";

const readStored = () => {
  try {
    return localStorage.getItem(ACCENT_STORAGE_KEY);
  } catch {
    return null;
  }
};

/**
 * Colour-theme switcher: a round button showing the current colour, opening
 * four swatches. The choice is remembered in this browser. index.html applies
 * a saved choice before React loads, so the page never flashes the default.
 */
const AccentPicker = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(() => {
    const stored = readStored();
    return ACCENTS.find((a) => a.id === stored)?.id ?? null;
  });
  const [defaultHex, setDefaultHex] = useState("");
  const wrapRef = useRef(null);

  /* index.html already applied the colour; this redraws the tab icon to match
     it (or the stylesheet default), since favicon.svg is a static file. */
  useEffect(() => {
    setDefaultHex(getDefaultAccent());
    applyAccent(ACCENTS.find((a) => a.id === readStored())?.hex ?? null);
  }, []);

  /* With no saved choice, the active swatch is whichever matches the
     stylesheet's default. */
  const activeId = current ?? ACCENTS.find((a) => a.hex === defaultHex)?.id ?? null;
  const activeHex = ACCENTS.find((a) => a.id === activeId)?.hex ?? defaultHex;

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (accent) => {
    setCurrent(accent.id);
    applyAccent(accent.hex);
    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, accent.id);
    } catch {
      /* Private mode or blocked storage: the colour still applies for this visit. */
    }
    setOpen(false);
  };

  return (
    <div className="accent-picker" ref={wrapRef}>
      <button
        type="button"
        className="accent-picker-btn"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t("accent.label")}
        title={t("accent.label")}
      >
        <span className="accent-picker-dot" style={{ background: activeHex }} />
      </button>

      {open && (
        <div className="accent-picker-pop" role="radiogroup" aria-label={t("accent.label")}>
          <p className="accent-picker-title">{t("accent.label")}</p>
          <div className="accent-picker-swatches">
            {ACCENTS.map((accent) => {
              const selected = accent.id === activeId;
              return (
                <button
                  key={accent.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`accent-swatch ${selected ? "selected" : ""}`}
                  onClick={() => choose(accent)}
                >
                  <span className="accent-swatch-color" style={{ background: accent.hex }} />
                  <span className="accent-swatch-name">{t(`accent.${accent.id}`)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccentPicker;
