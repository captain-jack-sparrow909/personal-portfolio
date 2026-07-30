import type { Project } from "@/content/projects";
import { getProjectStorytelling } from "@/content/project-storytelling";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

export function ProjectEngineeringEvidence({ project }: { project: Project }) {
  const story = getProjectStorytelling(project);

  return (
    <section
      aria-labelledby="evidence-title"
      className={styles.section}
      id="evidence"
    >
      <ProjectSectionHeader
        description={story.evidence.intro}
        index="05"
        label="Engineering evidence"
        title="What exists beneath the interface."
        titleId="evidence-title"
      />

      <div className={styles.evidenceLayout}>
        <aside className={styles.contribution} data-reveal>
          <span>What I personally built</span>
          <ul>
            {story.evidence.contribution.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>

        <div className={styles.evidenceGrid}>
          {story.evidence.items.map((item, index) => (
            <article data-reveal key={item.label}>
              <div>
                <span>0{index + 1}</span>
                <small>{item.state}</small>
              </div>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
