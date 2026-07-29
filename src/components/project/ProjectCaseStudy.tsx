import { getNextProject, type Project } from "@/content/projects";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectArchitecture } from "./ProjectArchitecture";
import { ProjectConceptFrames } from "./ProjectConceptFrames";
import { ProjectDecisions } from "./ProjectDecisions";
import { ProjectHero } from "./ProjectHero";
import { ProjectModules } from "./ProjectModules";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectStatus } from "./ProjectStatus";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const nextProject = getNextProject(project);

  return (
    <main
      className={styles.projectPage}
      data-accent={project.accent}
      id="project-content"
    >
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectModules project={project} />
      <ProjectArchitecture project={project} />
      <ProjectConceptFrames project={project} />
      <ProjectDecisions project={project} />
      <ProjectStatus project={project} />
      <ProjectNavigation nextProject={nextProject} />
    </main>
  );
}
