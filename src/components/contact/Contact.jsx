import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
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
        (result) => {
          alert("✅ Message envoyé ! Je te réponds très vite 💜");
          setLoading(false);
          formRef.current.reset();
        },
        (error) => {
          alert(" Erreur, message non envoyé !");
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
            <span>Contact</span> ✨
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Prêt à créer quelque chose d’extraordinaire ensemble ? Écris-moi.
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
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <input type="text" id="subject" name="subject" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {loading ? "Envoi..." : "Envoyer"} <FaPaperPlane className="plane-icon" />
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
              <h4>Localisation</h4>
              <p>
                N'djamena, Tchad
                <br />
                Kigali, Rwanda
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaPhoneAlt />
              </div>
              <h4>Téléphone</h4>
              <p>+250 793 22 58 53</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <h4>Email</h4>
              <p>sidickabdoulayesino1@gmail.com</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
