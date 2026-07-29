import { SectionIntro } from "../ui/SectionIntro";
import styles from "./Sections.module.css";

const range = [
  "Senior software engineering experience",
  "Frontend leadership",
  "Full-stack product development",
  "AI and machine-learning systems",
  "Web and mobile architecture",
  "Cloud and DevOps experience",
] as const;

export function AboutSection() {
  return (
    <section aria-labelledby="about-title" className="section-shell" id="about">
      <SectionIntro
        eyebrow="About"
        index="05"
        title="Engineer across boundaries."
        titleId="about-title"
      />

      <div className={styles.about}>
        <div className={styles.aboutLead} data-reveal>
          <p>
            I&apos;m Jabir Khan, an AI/ML engineer and full-stack web and mobile
            developer based in Dubai.
          </p>
          <p>
            I work across intelligent systems, frontend engineering, mobile
            products, APIs, cloud infrastructure and developer tooling.
          </p>
        </div>
        <div className={styles.aboutDetail} data-reveal>
          <p>
            I&apos;m most interested in products where advanced engineering
            becomes a clear, useful and thoughtfully designed experience.
          </p>
          <ul>
            {range.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
