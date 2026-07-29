import { projects, type ProjectAccent } from "@/content/projects";
import { cn } from "@/lib/cn";

import { SectionIntro } from "../ui/SectionIntro";
import styles from "./Sections.module.css";

function ProjectSignal({ accent }: { accent: ProjectAccent }) {
  return (
    <div
      aria-hidden="true"
      className={cn(styles.projectSignal, styles[accent])}
    >
      <div className={styles.signalOrbit} data-signal-orbit>
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className={styles.signalCore} />
      <p>ACTIVE SYSTEM / {accent.toUpperCase()}</p>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section aria-labelledby="work-title" className="section-shell" id="work">
      <SectionIntro
        description="Four evolving products exploring content intelligence, software understanding, adaptive learning, and supervised autonomy."
        eyebrow="Selected systems"
        index="02"
        title="Products designed to think, adapt, and operate."
        titleId="work-title"
      />

      <div className={styles.projects}>
        {projects.map((project) => (
          <article
            className={cn(styles.project, styles[project.accent])}
            data-scene-mode={project.sceneMode}
            id={`project-${project.slug}`}
            key={project.slug}
          >
            <div className={styles.projectCopy} data-reveal>
              <div className={styles.projectMeta}>
                <span>0{project.order}</span>
                <span>{project.category}</span>
                <span>{project.status}</span>
              </div>
              <h3>{project.name}</h3>
              <p className={styles.projectSummary}>{project.summary}</p>
              {project.detail ? (
                <p className={styles.projectDetail}>{project.detail}</p>
              ) : null}
              <ul className={styles.projectCapabilities}>
                {project.capabilities.slice(0, 5).map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
              <div className={styles.projectFoot}>
                <p>{project.visualMotif}</p>
                <span>Case study in development</span>
              </div>
            </div>

            <div className={styles.projectVisual} data-parallax="slow">
              <ProjectSignal accent={project.accent} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
