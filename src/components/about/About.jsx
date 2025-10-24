import React from "react";
import "./About.css";
import photo1 from "../../assets/SI1.jpg";
import photo2 from "../../assets/phote5.jpeg";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-images">
          <motion.img
            initial={{ opacity: 0, translateX: "-50%" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1 }}
          src={photo1} alt="Sidick working" className="about-img1" loading="lazy" />
          <motion.img
            initial={{ opacity: 0, translateY: "50%" }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 1 }}
           src={photo2} alt="Sidick coding" className="about-img2" loading="lazy" />
        </div>

        <div className="about-content">
          <motion.h2
            initial={{ opacity: 0, translateX: "50%" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1 }}
            className="section-title"
          >
            ABOUT ME
          </motion.h2>
          <div className="about-item">
            <div className="icon-circle-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 51 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M34.7595 22.2596C34.7595 27.4471 30.572 31.6346 25.3845 31.6346C20.197 31.6346 16.0095 27.4471 16.0095 22.2596C16.0095 17.0721 20.197 12.8846 25.3845 12.8846C30.572 12.8846 34.7595 17.0721 34.7595 22.2596Z"
                  fill="#E748C8"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M50.3845 25.3846C50.3845 39.1971 39.197 50.3846 25.3845 50.3846C11.572 50.3846 0.384521 39.1971 0.384521 25.3846C0.384521 11.5721 11.572 0.384644 25.3845 0.384644C39.197 0.384644 50.3845 11.5721 50.3845 25.3846ZM12.8845 43.3534C13.3845 42.5221 18.2283 34.7596 25.3533 34.7596C32.447 34.7596 37.322 42.5409 37.822 43.3534C40.7279 41.344 43.1021 38.6588 44.7406 35.5288C46.3791 32.3988 47.2328 28.9176 47.2283 25.3846C47.2283 13.2909 37.447 3.50964 25.3533 3.50964C13.2595 3.50964 3.47827 13.2909 3.47827 25.3846C3.47827 32.8221 7.19702 39.4159 12.8845 43.3534Z"
                  fill="#E748C8"
                />
              </svg>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-block"
            >
              <h3>Who I Am</h3>
              <p>
                I'm a Data Science student and product-minded builder. Curious,
                resourceful and detail-oriented, I care about clarity, usability
                and a smooth experience for real users.
              </p>
            </motion.div>
          </div>

          <div className="about-item">
            <div className="icon-circle-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.1083 37.9137C38.0943 37.9137 39.7192 35.4764 39.7192 32.4975V5.41625C39.7192 2.43731 38.0943 0 36.1083 0H7.22167C5.23571 0 3.61083 2.43731 3.61083 5.41625V32.4975C3.61083 35.4764 5.23571 37.9137 7.22167 37.9137H0V43.33H43.33V37.9137H36.1083ZM7.22167 5.41625H36.1083V32.4975H7.22167V5.41625Z"
                  fill="#6A9955"
                />
              </svg>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-block"
            >
              <h3>What I Do</h3>
              <p>
                Data Analyst and developer of web, app platforms and small tools
                that solve concrete problems. I iterate quickly, ship
                frequently, and validate ideas with working prototypes and
                measurable outcomes.
              </p>
            </motion.div>
          </div>

          <div className="about-item">
            <div className="icon-circle-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="#CE9178"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="32"
                  stroke="#CE9178"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="16"
                  stroke="#CE9178"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="50" cy="50" r="6" fill="#CE9178" />
              </svg>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-block"
            >
              <h3>My Mission</h3>
              <p>
                Build thoughtful digital products that empower students and
                entrepreneurs in Africa—scalable, reliable and simple to use.
                I'm driven by impact and continuous improvement.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
