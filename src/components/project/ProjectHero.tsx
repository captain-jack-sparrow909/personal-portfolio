import type { Project } from "@/content/projects";

import styles from "./ProjectCaseStudy.module.css";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <section aria-labelledby="project-title" className={styles.hero}>
      <div className={styles.heroMeta}>
        <span>Case study 0{project.order}</span>
        <span>{project.category}</span>
        <span>{project.status}</span>
      </div>

      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            Intelligence in motion / System study
          </p>
          <h1 id="project-title">{project.name}</h1>
          <p className={styles.heroSummary}>{project.summary}</p>
        </div>

        <div
          aria-hidden="true"
          className={styles.heroArtifact}
          data-scene={project.sceneMode}
        >
          <div className={styles.artifactMeta}>
            <span>SYS / 0{project.order}</span>
            <span>{project.sceneMode.toUpperCase()}</span>
          </div>
          <i className={styles.artifactRing} />
          <i className={styles.artifactRing} />
          <i className={styles.artifactCore} />
          <b />
          <b />
          <b />
          <b />
        </div>
      </div>

      <div className={styles.heroFooter}>
        <p>{project.visualMotif}</p>
        <div>
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        {project.domain ? (
          <a
            href={`https://${project.domain}`}
            rel="noreferrer"
            target="_blank"
          >
            Product domain / {project.domain} ↗
          </a>
        ) : (
          <span>Product status / {project.status}</span>
        )}
      </div>
    </section>
  );
}
