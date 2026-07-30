import { featuredProjects } from "@/content/projects";

import { ProjectChapter } from "./ProjectChapter";
import { SectionIntro } from "../ui/SectionIntro";
import styles from "./Sections.module.css";

export function ProjectsSection() {
  return (
    <section aria-labelledby="work-title" className="section-shell" id="work">
      <SectionIntro
        description="One public flagship and three focused product studies spanning software understanding, content intelligence, adaptive learning, and supervised autonomy."
        eyebrow="Selected systems"
        index="02"
        title="Products I have shaped, built, and put to work."
        titleId="work-title"
      />

      <div className={styles.projects}>
        {featuredProjects.map((project, index) => (
          <ProjectChapter
            displayOrder={index + 1}
            key={project.slug}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
