import { processStages } from "@/content/process";

import { SectionIntro } from "../ui/SectionIntro";
import styles from "./Sections.module.css";

export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="section-shell">
      <SectionIntro
        description="A systems-minded process that keeps product intent, engineering decisions, and operational reality connected."
        eyebrow="Engineering process"
        index="04"
        title="From possibility to production"
        titleId="process-title"
      />

      <ol className={styles.process}>
        <span
          aria-hidden="true"
          className={styles.processSignal}
          data-process-signal
        />
        {processStages.map((stage) => (
          <li data-reveal key={stage.name}>
            <div className={styles.processNode}>
              <span>{stage.index}</span>
            </div>
            <h3>{stage.name}</h3>
            <p>{stage.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
