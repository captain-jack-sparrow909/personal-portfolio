import type { Project } from "@/content/projects";
import { getProjectStorytelling } from "@/content/project-storytelling";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

export function ProjectOverview({ project }: { project: Project }) {
  const story = getProjectStorytelling(project);

  return (
    <section
      aria-labelledby="overview-title"
      className={styles.section}
      id="overview"
    >
      <ProjectSectionHeader
        description={story.overview.description}
        index="01"
        label="Overview"
        title={story.overview.title}
        titleId="overview-title"
      />

      <div className={styles.overviewGrid}>
        <article data-reveal>
          <span>Problem</span>
          <p>{project.problem}</p>
        </article>
        <article data-reveal>
          <span>Product concept</span>
          <p>{project.productConcept}</p>
        </article>
      </div>
    </section>
  );
}
