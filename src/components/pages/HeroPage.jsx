import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./HeroPage.css";
import Logo from "../../assets/Logo.svg";
import heroImageDark from "../../assets/image.png";
import heroImageLight from "../../assets/sdark.png";
import { useTheme } from "../theme/useTheme";

const HeroPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: "🔗",
      title: "Connected Capabilities",
      desc: "Integrated services across data, media and creative to drive growth.",
    },
    {
      icon: "🧠",
      title: "Advanced Intelligence",
      desc: "Data-driven insights and ML to power better decisions.",
    },
    {
      icon: "⚡",
      title: "True Flexibility",
      desc: "Fast, scalable solutions built for real-world constraints.",
    },
    {
      icon: "🤝",
      title: "Collaborative Work",
      desc: "Cross-discipline teams focused on outcomes and impact.",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Small component to select hero image based on current theme
  function ThemeImage() {
    const { theme } = useTheme();
    const src = theme === "light" ? heroImageLight : heroImageDark;
    return <img src={src} loading="lazy" alt="Sidick Abdoulaye Hissein" className="hero-img" />;
  }

  return (
    <div className="hero-page">
      {/* Navigation */}
      <nav className={`hero-navbar ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" className="nav-back">
          <FaArrowLeft /> Back
        </Link>
        <div className="nav-logo">
          <img src={Logo} loading="lazy" alt="Logo" />
          <span className="nav-active" aria-hidden="true"></span>
          <p className="nav-logo-text">
            <span>Sidick</span>Sino
          </p>
        </div>
        <div className="nav-spacer"></div>
      </nav>

      {/* Hero Section */}
      <section className="hero-page-hero">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>
              Hey, I'm <span className="highlight">Sidick Abdoulaye Hissein</span>
            </h1>
            <p className="subtitle">
              A passionate Data Analyst, Web Developer, and ML Enthusiast from <span>Africa</span>
            </p>
            <p className="bio">
              I love turning complex problems into simple, beautiful, and intuitive digital experiences.
              With expertise in data science, web development, and machine learning, I create solutions
              that not only look great but also deliver real value.
            </p>
          </motion.div>

          <motion.div
            className="hero-image-section"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="image-wrapper">
              {/* choose image based on theme (dark uses image.png, light uses sdark.png) */}
              {/**/}
              <ThemeImage />
              <div className="image-glow"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features / Content Section (inspired by omc.com) */}
      <section className="features-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Capabilities
          </motion.h2>

          <motion.div
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((f, idx) => (
              <motion.div
                className="feature-card"
                key={idx}
                variants={itemVariants}
                whileHover={{ translateY: -8 }}
              >
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            About Me
          </motion.h2>

          <div className="about-content">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3>Who am I?</h3>
              <p>
                I'm a versatile tech professional with a deep passion for solving real-world problems
                through technology. My journey began with a curiosity about data, which led me to explore
                web development and machine learning.
              </p>
              <p>
                My unique blend of skills allows me to bridge the gap between data insights and user-centric
                design. Whether it's building responsive web applications, analyzing complex datasets, or
                developing intelligent models, I bring creativity and precision to every project.
              </p>
            </motion.div>

            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3>What drives me?</h3>
              <p>
                I'm driven by the desire to create meaningful digital experiences that make a difference.
                I believe in continuous learning and staying updated with the latest technologies and trends.
              </p>
              <p>
                When I'm not coding or analyzing data, you'll find me exploring new technologies, contributing
                to open-source projects, or helping others learn and grow in the tech space. I'm always excited
                about opportunities to collaborate and create amazing things together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="journey-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            My Journey
          </motion.h2>

          <div className="timeline">
            <motion.div
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Data Science & Analytics</h4>
                <p>
                  Started my career with a focus on data analysis, using tools like R, Python, and SQL
                  to extract meaningful insights from large datasets.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="timeline-item"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Web Development</h4>
                <p>
                  Expanded into web development, mastering HTML, CSS, JavaScript, React, and modern
                  frameworks to create responsive and interactive web applications.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Machine Learning</h4>
                <p>
                  Diving into machine learning and AI, developing models and algorithms to solve
                  complex problems and automate intelligent systems.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="timeline-item"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Full-Stack Mastery</h4>
                <p>
                  Now combining all skills to create end-to-end solutions that integrate data science,
                  beautiful UX/UI, and intelligent backend systems.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            My Core Values
          </motion.h2>

          <div className="values-grid">
            <motion.div
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>Always seeking new ways to solve problems and improve existing solutions.</p>
            </motion.div>

            <motion.div
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="value-icon">🎯</div>
              <h3>Quality</h3>
              <p>Committed to delivering excellence in every project and every detail.</p>
            </motion.div>

            <motion.div
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="value-icon">🤝</div>
              <h3>Collaboration</h3>
              <p>Believing in the power of teamwork and open communication.</p>
            </motion.div>

            <motion.div
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="value-icon">📚</div>
              <h3>Learning</h3>
              <p>Continuously evolving and staying updated with technology trends.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Let's Work Together</h2>
            <p>Interested in collaborating or have a project in mind?</p>
            <Link to="/#contact" className="cta-button">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Social Links */}
      <section className="social-section">
        <div className="container">
          <motion.div
            className="social-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3>Connect With Me</h3>
            <div className="social-links">
              <motion.a
                href="https://github.com/sidicksino"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub /> GitHub
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/sidick-abdoulaye"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin /> LinkedIn
              </motion.a>
              <motion.a
                href="https://twitter.com/sidick_sino"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter /> Twitter
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default HeroPage;
