import type { Project } from "@/content/projects";
import { getProjectStorytelling } from "@/content/project-storytelling";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

export function ProjectJourney({ project }: { project: Project }) {
  const story = getProjectStorytelling(project);

  return (
    <section
      aria-labelledby="journey-title"
      className={styles.section}
      data-journey={project.sceneMode}
      id="journey"
    >
      <ProjectSectionHeader
        description={story.journey.description}
        index="02"
        label={story.journey.label}
        title={story.journey.title}
        titleId="journey-title"
      />

      <ol className={styles.journeySteps}>
        {story.journey.steps.map((step, index) => (
          <li data-reveal key={step.title}>
            <div>
              <span>0{index + 1}</span>
              <small>{step.label}</small>
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
