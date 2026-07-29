import type { Project } from "@/content/projects";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

export function ProjectConceptFrames({ project }: { project: Project }) {
  return (
    <section
      aria-labelledby="concepts-title"
      className={styles.section}
      id="concepts"
    >
      <ProjectSectionHeader
        description="These frames communicate product hierarchy and interaction intent. They are deliberately presented as concepts, not production screenshots."
        index="04"
        label="Interface explorations"
        title="Making system behavior legible."
        titleId="concepts-title"
      />

      <div className={styles.conceptGrid}>
        {project.interfaceConcepts.map((concept, index) => (
          <figure data-reveal key={concept.title}>
            <div aria-hidden="true" className={styles.conceptCanvas}>
              <div className={styles.conceptTopbar}>
                <span>JK / {project.shortName}</span>
                <span>CONCEPT 0{index + 1}</span>
              </div>
              <div className={styles.conceptRail}>
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className={styles.conceptFocus}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.conceptSignals}>
                {concept.signals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </div>
            <figcaption>
              <span>{concept.label}</span>
              <h3>{concept.title}</h3>
              <p>{concept.description}</p>
              <small>Conceptual interface — not final product UI</small>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
