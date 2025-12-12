import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import Swal from "sweetalert2";

const Contact = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_c4vcw6c",
        "template_1b290dh",
        formRef.current,
        "DGu360jLgTiYGNW6H"
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: t("contact.sentSuccess"),
            text: t("contact.sentSuccessMsg"),
            showConfirmButton: false,
            timer: 2500,
          });
          setLoading(false);
          formRef.current.reset();
        },
        () => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: t("contact.sentError"),
            footer:
              `<a href="mailto:sidickabdoulayesino1@gmail.com">${t("contact.contactByEmail")}</a>`,
          });
          setLoading(false);
        }
      );
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Titre animé */}
        <div className="contact-header">
          <motion.h2
            initial={{ opacity: 0, translateX: "50%" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1 }}
          >
            <span>{t("contact.title")}</span> ✨
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>

        <div className="contact-content">
          {/* Formulaire */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, translateX: "-50%" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact-form"
            >
              <div className="form-group">
                <label htmlFor="name">{t("contact.name")}</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t("contact.email")}</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="subject">{t("contact.subject")}</label>
                <input type="text" id="subject" name="subject" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t("contact.message")}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {loading ? t("contact.sending") : t("contact.send")}{" "}
                <FaPaperPlane className="plane-icon" />
              </motion.button>
            </form>
          </motion.div>

          {/* Infos de contact */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, translateX: "50%" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="info-card">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>{t("contact.location")}</h3>
              <p>
                {t("contact.ndjamena")}
                <br />
                {t("contact.kigali")}
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaPhoneAlt />
              </div>
              <h3>{t("contact.phone")}</h3>
              <p>+250 793 22 58 53</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <h3>Email</h3>
              <p>sidickabdoulayesino1@gmail.com</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
