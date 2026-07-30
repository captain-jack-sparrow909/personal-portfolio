import Link from "next/link";

import type { Project, ProjectAccent } from "@/content/projects";
import { cn } from "@/lib/cn";

import styles from "./Sections.module.css";

function ProjectSignal({
  accent,
  technologies,
}: {
  accent: ProjectAccent;
  technologies: readonly string[];
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(styles.projectSignal, styles[accent])}
    >
      <div className={styles.signalCoordinates}>
        <span>SYS / {accent.toUpperCase()}</span>
        <span>LIVE SCENE</span>
      </div>
      <div className={styles.signalOrbit} data-signal-orbit>
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className={styles.signalCore} />
      <div className={styles.signalLabels}>
        {technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
    </div>
  );
}

export function ProjectChapter({
  displayOrder,
  project,
}: {
  displayOrder: number;
  project: Project;
}) {
  return (
    <article
      className={cn(styles.project, styles[project.accent])}
      data-featured={project.featured ? "true" : undefined}
      data-project-chapter
      data-scene-mode={project.sceneMode}
      id={`project-${project.slug}`}
    >
      <div aria-hidden="true" className={styles.projectProgress}>
        <span>0{displayOrder}</span>
        <i>
          <b />
        </i>
        <span>100</span>
      </div>

      <div className={styles.projectCopy}>
        <div
          className={styles.projectMeta}
          data-project-index
          data-project-mobile-reveal
        >
          <span>0{displayOrder}</span>
          <span data-project-category>{project.category}</span>
          <span>
            {project.featured ? "Flagship / " : ""}
            {project.status}
          </span>
        </div>

        <div className={styles.projectTitleMask} data-project-mobile-reveal>
          <h3 data-project-title>{project.name}</h3>
        </div>

        <p
          className={styles.projectSummary}
          data-project-mobile-reveal
          data-project-summary
        >
          {project.summary}
        </p>

        {project.detail ? (
          <p
            className={styles.projectDetail}
            data-project-detail
            data-project-mobile-reveal
          >
            {project.detail}
          </p>
        ) : null}

        <ul
          className={styles.projectCapabilities}
          data-project-detail
          data-project-mobile-reveal
        >
          {project.capabilities.slice(0, 5).map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>

        {project.proofPoints ? (
          <dl
            className={styles.projectProof}
            data-project-detail
            data-project-mobile-reveal
          >
            {project.proofPoints.map((point) => (
              <div key={point.label}>
                <dd>{point.value}</dd>
                <dt>{point.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}

        <div
          className={styles.projectFoot}
          data-project-detail
          data-project-mobile-reveal
        >
          <p>{project.visualMotif}</p>
          <span>{project.technologies.join(" / ")}</span>
        </div>

        <Link
          className={styles.projectCta}
          data-case-study-link
          data-project-accent={project.accent}
          data-project-mobile-reveal
          data-project-name={project.name}
          href={`/work/${project.slug}`}
        >
          <span>
            View case study
            <small>
              {project.featured
                ? "Inspect public flagship"
                : `Open system 0${displayOrder}`}
            </small>
          </span>
          <i aria-hidden="true">↗</i>
        </Link>
      </div>

      <div
        className={styles.projectVisual}
        data-project-mobile-reveal
        data-project-visual
      >
        <ProjectSignal
          accent={project.accent}
          technologies={project.technologies}
        />
      </div>
    </article>
  );
}
