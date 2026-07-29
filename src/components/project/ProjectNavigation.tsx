import Link from "next/link";

import type { Project } from "@/content/projects";

import styles from "./ProjectCaseStudy.module.css";

export function ProjectNavigation({ nextProject }: { nextProject: Project }) {
  return (
    <nav aria-label="Project navigation" className={styles.projectNavigation}>
      <Link className={styles.allProjectsLink} href="/#work">
        <span aria-hidden="true">←</span>
        All selected systems
      </Link>

      <Link
        className={styles.nextProject}
        data-case-study-link
        data-project-accent={nextProject.accent}
        data-project-name={nextProject.name}
        href={`/work/${nextProject.slug}`}
      >
        <span>
          Next system / 0{nextProject.order}
          <small>{nextProject.category}</small>
        </span>
        <strong>{nextProject.name}</strong>
        <i aria-hidden="true">↗</i>
      </Link>
    </nav>
  );
}
