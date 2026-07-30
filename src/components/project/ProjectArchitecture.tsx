import type { Project } from "@/content/projects";
import { getProjectStorytelling } from "@/content/project-storytelling";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

export function ProjectArchitecture({ project }: { project: Project }) {
  const story = getProjectStorytelling(project);

  return (
    <section
      aria-labelledby="architecture-title"
      className={styles.section}
      id="architecture"
    >
      <ProjectSectionHeader
        description={story.architecture.description}
        index="04"
        label="Technical architecture"
        title={story.architecture.title}
        titleId="architecture-title"
      />

      <figure className={styles.architecture} data-reveal>
        <figcaption>
          <span>
            {project.shortName} / {story.architecture.caption}
          </span>
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
