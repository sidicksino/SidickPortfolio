import { useTranslation } from "react-i18next";
import "./Skills.css";
import TechCubes from "./TechCubes";
import Reveal from "../common/Reveal";
import { skillsData } from "../../data/siteData";

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="section-head">
          <Reveal as="span" className="eyebrow">
            03 — {t("skills.title")}
          </Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            {t("skills.headline")} <em>{t("skills.headlineAccent")}</em>
          </Reveal>
        </div>

        <div className="skills-layout">
          <ul className="skills-list">
            {skillsData.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <Reveal
                  as="li"
                  key={skill.id}
                  className="skill-row"
                  style={{ "--icon-color": skill.color }}
                  delay={Math.min(i * 0.08, 0.3)}
                >
                  <span className="skill-index" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="skill-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div className="skill-copy">
                    <h3>{t(skill.titleKey)}</h3>
                    <ul className="skill-tools">
                      {t(skill.descKey)
                        .split(",")
                        .map((tool) => (
                          <li key={tool.trim()}>{tool.trim()}</li>
                        ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="skills-visual" delay={0.1}>
            <TechCubes />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Skills;
