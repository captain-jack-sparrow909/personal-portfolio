import Image from "next/image";

import { currentExplorations, experienceTimeline } from "@/content/experience";

import { SectionIntro } from "../ui/SectionIntro";
import styles from "./Sections.module.css";

const range = [
  "AI and machine-learning systems mastery",
  "Equal frontend and backend engineering mastery",
  "Full-stack web product architecture",
  "Mobile application engineering",
  "Model deployment, MLOps and automation",
  "Cloud, DevOps and production systems",
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
            I&apos;m Jabir Khan, an AI/ML and full-stack systems engineer
            working end to end across web and mobile.
          </p>
          <p>
            I design the intelligence, engineer every product layer, automate
            the workflow, and own the path to reliable production.
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
            <span>Profile / GCC</span>
            <span>JK — 2026</span>
          </figcaption>
        </figure>
        <div className={styles.aboutDetail} data-reveal>
          <p>
            My practice spans AI, ML, agents, automation, frontend, backend,
            APIs, data, web, mobile, cloud infrastructure, MLOps, DevOps and
            deployment.
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
