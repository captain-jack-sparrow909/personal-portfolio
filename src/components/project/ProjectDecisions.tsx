import type { Project } from "@/content/projects";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

export function ProjectDecisions({ project }: { project: Project }) {
  return (
    <section
      aria-labelledby="decisions-title"
      className={styles.section}
      id="decisions"
    >
      <ProjectSectionHeader
        index="05"
        label="Challenges and decisions"
        title="The choices shaping the product."
        titleId="decisions-title"
      />

      <ol className={styles.decisionList}>
        {project.decisions.map((decision, index) => (
          <li data-reveal key={decision.title}>
            <span>Decision / 0{index + 1}</span>
            <h3>{decision.title}</h3>
            <p>{decision.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
