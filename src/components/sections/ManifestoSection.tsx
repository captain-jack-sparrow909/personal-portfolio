import { SectionIntro } from "@/components/ui/SectionIntro";

import styles from "./Sections.module.css";

const disciplines = [
  {
    index: "01",
    name: "Intelligence",
    description:
      "AI and ML across the full lifecycle: data, deep learning, LLMs, retrieval, agents, evaluation, automation, serving and deployment.",
    meta: "LEARN · REASON · AUTOMATE",
  },
  {
    index: "02",
    name: "Product",
    description:
      "Full-stack web and mobile products with equal depth across frontend, backend, architecture, performance and user experience.",
    meta: "DESIGN · ENGINEER · SHIP",
  },
  {
    index: "03",
    name: "Infrastructure",
    description:
      "APIs, data systems, MLOps, cloud platforms, CI/CD, observability, DevOps and resilient production architecture.",
    meta: "DEPLOY · SCALE · OPERATE",
  },
] as const;

export function ManifestoSection() {
  return (
    <section
      aria-labelledby="identity-title"
      className="section-shell"
      data-scene-mode="identity"
    >
      <SectionIntro
        description="I own the complete engineering path: intelligence, automation, frontend, backend, web, mobile, data, infrastructure, deployment and reliable production operation."
        eyebrow="Operating range"
        index="01"
        title="Mastery across intelligence, product, and production."
        titleId="identity-title"
      />

      <div className={styles.disciplines}>
        {disciplines.map((discipline) => (
          <article
            className={styles.discipline}
            data-reveal
            key={discipline.name}
          >
            <p className={styles.disciplineIndex}>{discipline.index}</p>
            <h3>{discipline.name}</h3>
            <p>{discipline.description}</p>
            <small>{discipline.meta}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
