import type { Project } from "@/content/projects";
import { getProjectStorytelling } from "@/content/project-storytelling";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

export function ProjectModules({ project }: { project: Project }) {
  const story = getProjectStorytelling(project);

  return (
    <section
      aria-labelledby="modules-title"
      className={styles.section}
      id="modules"
    >
      <ProjectSectionHeader
        description={story.modules.description}
        index="03"
        label="Core modules"
        title={story.modules.title}
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
