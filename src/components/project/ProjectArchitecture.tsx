import type { Project } from "@/content/projects";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

export function ProjectArchitecture({ project }: { project: Project }) {
  return (
    <section
      aria-labelledby="architecture-title"
      className={styles.section}
      id="architecture"
    >
      <ProjectSectionHeader
        description="A conceptual system flow showing responsibility and decision boundaries. It documents direction, not a claim of finalized infrastructure."
        index="03"
        label="Technical architecture"
        title="A visible path through the system."
        titleId="architecture-title"
      />

      <figure className={styles.architecture} data-reveal>
        <figcaption>
          <span>{project.shortName} / Conceptual architecture</span>
          <span>FLOW 01—05</span>
        </figcaption>
        <ol>
          {project.architecture.map((stage, index) => (
            <li key={stage.label}>
              <div>
                <span>0{index + 1}</span>
                <i aria-hidden="true" />
                <small>{stage.signal}</small>
              </div>
              <h3>{stage.label}</h3>
              <p>{stage.description}</p>
            </li>
          ))}
        </ol>
      </figure>
    </section>
  );
}
