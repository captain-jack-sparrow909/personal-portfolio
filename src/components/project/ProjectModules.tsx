import type { Project } from "@/content/projects";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

export function ProjectModules({ project }: { project: Project }) {
  return (
    <section
      aria-labelledby="modules-title"
      className={styles.section}
      id="modules"
    >
      <ProjectSectionHeader
        description="The system is divided into independently understandable capabilities rather than presented as one opaque AI surface."
        index="02"
        label="Core modules"
        title="The product, decomposed."
        titleId="modules-title"
      />

      <ol className={styles.moduleList}>
        {project.modules.map((module, index) => (
          <li data-reveal key={module.name}>
            <span>0{index + 1}</span>
            <h3>{module.name}</h3>
            <p>{module.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
