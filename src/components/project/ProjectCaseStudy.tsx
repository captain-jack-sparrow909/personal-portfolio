import { getNextProject, type Project } from "@/content/projects";

import styles from "./ProjectCaseStudy.module.css";
import { ProjectArchitecture } from "./ProjectArchitecture";
import { ProjectConceptFrames } from "./ProjectConceptFrames";
import { ProjectDecisions } from "./ProjectDecisions";
import { ProjectEngineeringEvidence } from "./ProjectEngineeringEvidence";
import { ProjectHero } from "./ProjectHero";
import { ProjectJourney } from "./ProjectJourney";
import { ProjectModules } from "./ProjectModules";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectProductGallery } from "./ProjectProductGallery";
import { ProjectStatus } from "./ProjectStatus";
import { RontgenProof } from "./RontgenProof";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const nextProject = getNextProject(project);

  return (
    <main
      className={styles.projectPage}
      data-accent={project.accent}
      id="project-content"
    >
      <ProjectHero project={project} />
      <RontgenProof project={project} />
      <ProjectOverview project={project} />
      <ProjectJourney project={project} />
      <ProjectModules project={project} />
      <ProjectArchitecture project={project} />
      <ProjectEngineeringEvidence project={project} />
      <ProjectProductGallery project={project} />
      <ProjectConceptFrames project={project} />
      <ProjectDecisions project={project} />
      <ProjectStatus project={project} />
      <ProjectNavigation nextProject={nextProject} />
    </main>
  );
}
