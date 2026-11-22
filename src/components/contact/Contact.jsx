import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Reveal from "../common/Reveal";
import SocialLinks from "../SocialLinks";
import {
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import "./Contact.css";

/* emailjs and sweetalert2 are only needed once someone actually submits the
   form, but as static imports they were bundled into the initial page load —
   sweetalert2 in particular ships its own CSS. Imported dynamically below so
   they're fetched on submit instead. */

const Contact = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const [{ default: emailjs }, { default: Swal }] = await Promise.all([
      import("@emailjs/browser"),
      import("sweetalert2"),
    ]);

    /* SweetAlert's default confirm button is its own blue-purple. Pull the
       brand accent out of the live tokens so it follows the active theme. */
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent-strong")
      .trim();

    try {
      await emailjs.sendForm(
        "service_c4vcw6c",
        "template_1b290dh",
        formRef.current,
        "DGu360jLgTiYGNW6H"
      );
      Swal.fire({
        icon: "success",
        title: t("contact.sentSuccess"),
        text: t("contact.sentSuccessMsg"),
        showConfirmButton: false,
        timer: 2500,
      });
      formRef.current?.reset();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonColor: accent,
        text: t("contact.sentError"),
        footer: `<a href="mailto:sidickabdoulayesino1@gmail.com">${t("contact.contactByEmail")}</a>`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container contact-layout">
        <div className="contact-intro">
          <Reveal as="span" className="eyebrow">
            06 — {t("contact.title")}
          </Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            {t("contact.headline")} <em>{t("contact.headlineAccent")}</em>
          </Reveal>
          <Reveal as="p" className="section-lead" delay={0.1}>
            {t("contact.subtitle")}
          </Reveal>

          <Reveal as="ul" className="contact-info" delay={0.15}>
            <li>
              <span className="contact-info-icon" aria-hidden="true"><FaEnvelope /></span>
              <div>
                <span className="contact-info-label">{t("contact.email")}</span>
                <a href="mailto:sidickabdoulayesino1@gmail.com">sidickabdoulayesino1@gmail.com</a>
              </div>
            </li>
            <li>
              <span className="contact-info-icon" aria-hidden="true"><FaPhoneAlt /></span>
              <div>
                <span className="contact-info-label">{t("contact.phone")}</span>
                <a href="tel:+250793225853">+250 793 22 58 53</a>
              </div>
            </li>
            <li>
              <span className="contact-info-icon" aria-hidden="true"><FaMapMarkerAlt /></span>
              <div>
                <span className="contact-info-label">{t("contact.location")}</span>
                <span>{t("contact.ndjamena")} · {t("contact.kigali")}</span>
              </div>
            </li>
          </Reveal>

          <Reveal delay={0.2}>
            <SocialLinks />
          </Reveal>
        </div>

        <Reveal className="contact-form-card" delay={0.1}>
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t("contact.name")}</label>
                <input type="text" id="name" name="name" autoComplete="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t("contact.email")}</label>
                <input type="email" id="email" name="email" autoComplete="email" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">{t("contact.subject")}</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t("contact.message")}</label>
              <textarea id="message" name="message" rows="6" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary contact-submit" disabled={loading}>
              {loading ? t("contact.sending") : t("contact.send")}
              <FaPaperPlane aria-hidden="true" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
