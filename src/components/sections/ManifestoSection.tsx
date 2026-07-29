import { SectionIntro } from "@/components/ui/SectionIntro";

import styles from "./Sections.module.css";

const disciplines = [
  {
    index: "01",
    name: "Intelligence",
    description:
      "AI systems, machine learning, LLM applications, agents and automation.",
    meta: "REASON · RETRIEVE · ADAPT",
  },
  {
    index: "02",
    name: "Product",
    description:
      "Web platforms, mobile applications, frontend systems and user experience.",
    meta: "DESIGN · BUILD · SHIP",
  },
  {
    index: "03",
    name: "Infrastructure",
    description:
      "APIs, microservices, cloud systems, DevOps and scalable architecture.",
    meta: "CONNECT · SCALE · OPERATE",
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
        description="From machine-learning workflows and autonomous agents to full-stack platforms and mobile experiences, I build across the complete path from idea to production."
        eyebrow="Operating range"
        index="01"
        title="I work where intelligent systems meet product engineering."
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
