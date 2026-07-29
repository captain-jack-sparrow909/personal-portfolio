import type { Project } from "@/content/projects";

import styles from "./ProjectCaseStudy.module.css";

export function ProjectStatus({ project }: { project: Project }) {
  return (
    <section
      aria-labelledby="status-title"
      className={styles.statusSection}
      data-reveal
      id="status"
    >
      <div className={styles.statusMeta}>
        <span>06 / Current status</span>
        <span>{project.status}</span>
      </div>
      <div className={styles.statusGrid}>
        <h2 id="status-title">Building in public, describing it honestly.</h2>
        <div>
          <p>{project.currentStatus}</p>
          <span>Next focus</span>
          <p>{project.nextFocus}</p>
        </div>
      </div>
    </section>
  );
}
