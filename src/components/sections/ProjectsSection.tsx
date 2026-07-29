import { projects } from "@/content/projects";

import { ProjectChapter } from "./ProjectChapter";
import { SectionIntro } from "../ui/SectionIntro";
import styles from "./Sections.module.css";

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
          <ProjectChapter key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
