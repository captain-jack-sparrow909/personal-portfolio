import Image from "next/image";

import { currentExplorations, experienceTimeline } from "@/content/experience";

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
    <section
      aria-labelledby="about-title"
      className="section-shell"
      data-scene-mode="identity"
      id="about"
    >
      <SectionIntro
        eyebrow="About"
        index="06"
        title="The person behind the systems."
        titleId="about-title"
      />

      <div className={styles.about}>
        <div className={styles.aboutLead} data-reveal>
          <p>
            I&apos;m Jabir Khan, an AI/ML engineer and full-stack web and mobile
            developer based in Dubai.
          </p>
          <p>
            I care about making technically difficult products feel obvious to
            use.
          </p>
        </div>
        <figure className={styles.aboutPortrait} data-reveal>
          <div className={styles.aboutPortraitFrame}>
            <Image
              alt="Portrait of Jabir Khan"
              height={1000}
              sizes="(max-width: 608px) 78vw, (max-width: 896px) 32vw, 24vw"
              src="/images/jabir-khan-portrait-2026.webp"
              width={800}
            />
          </div>
          <figcaption>
            <span>Profile / Dubai</span>
            <span>JK — 2026</span>
          </figcaption>
        </figure>
        <div className={styles.aboutDetail} data-reveal>
          <p>
            My work moves between intelligent products, frontend systems, mobile
            experiences, APIs, cloud infrastructure and developer tooling.
          </p>
          <ul>
            {range.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.experienceTimeline}>
        <div className={styles.timelineIntro} data-reveal>
          <span>Professional timeline</span>
          <p>
            A concise view of the work behind the portfolio—not a replacement
            for a résumé.
          </p>
        </div>
        <ol>
          {experienceTimeline.map((entry, index) => (
            <li data-reveal key={entry.marker}>
              <span>0{index + 1}</span>
              <small>{entry.marker}</small>
              <h3>{entry.role}</h3>
              <p>{entry.detail}</p>
            </li>
          ))}
        </ol>
      </div>

      <aside className={styles.currentlyExploring} data-reveal>
        <div>
          <span>Currently exploring</span>
          <p>
            The questions on my desk when I am not shipping client or product
            work.
          </p>
        </div>
        <ul>
          {currentExplorations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
