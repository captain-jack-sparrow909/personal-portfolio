import { capabilityGroups } from "@/content/capabilities";

import { CognitiveEngineFallback } from "../visuals/CognitiveEngineFallback";
import { SectionIntro } from "../ui/SectionIntro";
import styles from "./Sections.module.css";

export function CapabilitiesSection() {
  return (
    <section
      aria-labelledby="capabilities-title"
      className="section-shell"
      data-scene-mode="identity"
      id="expertise"
    >
      <SectionIntro
        description="A multidisciplinary practice spanning models, interfaces, services, and the systems that keep them running."
        eyebrow="Capability constellation"
        index="03"
        title="Across the stack"
        titleId="capabilities-title"
      />

      <div className={styles.capabilityLayout}>
        <div className={styles.capabilityEngine} data-parallax="slow">
          <CognitiveEngineFallback compact label="Capability constellation" />
          <p>
            <span>05</span> CONNECTED DISCIPLINES
          </p>
        </div>
        <div className={styles.capabilityList}>
          {capabilityGroups.map((group) => (
            <article
              className={styles.capabilityGroup}
              data-reveal
              key={group.name}
            >
              <div>
                <span>{group.index}</span>
                <h3>{group.name}</h3>
              </div>
              <p>{group.description}</p>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
