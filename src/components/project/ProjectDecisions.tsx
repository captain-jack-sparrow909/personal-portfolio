import type { Project } from "@/content/projects";
import { getProjectStorytelling } from "@/content/project-storytelling";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

export function ProjectDecisions({ project }: { project: Project }) {
  const story = getProjectStorytelling(project);

  return (
    <section
      aria-labelledby="decisions-title"
      className={styles.section}
      id="decisions"
    >
      <ProjectSectionHeader
        index="08"
        label="Challenges and decisions"
        title={story.decisions.title}
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
