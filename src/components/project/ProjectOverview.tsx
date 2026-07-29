import type { Project } from "@/content/projects";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <section
      aria-labelledby="overview-title"
      className={styles.section}
      id="overview"
    >
      <ProjectSectionHeader
        description="The case study separates the underlying problem from the product response, keeping the engineering intent explicit."
        index="01"
        label="Overview"
        title="Why this system should exist."
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
