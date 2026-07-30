import Link from "next/link";

import { buildLog } from "@/content/experience";

import { SectionIntro } from "../ui/SectionIntro";
import styles from "./Sections.module.css";

export function BuildLogSection() {
  return (
    <section
      aria-labelledby="build-log-title"
      className="section-shell"
      id="build-log"
    >
      <SectionIntro
        description="A compact record of what is public, what has shipped and what I am testing now."
        eyebrow="Build log"
        index="05"
        title="Proof leaves a trail."
        titleId="build-log-title"
      />

      <ol className={styles.buildLog}>
        {buildLog.map((entry, index) => {
          const external = entry.href.startsWith("http");
          const content = (
            <>
              <div>
                <span>0{index + 1}</span>
                <small>{entry.marker}</small>
              </div>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
              <b>
                {entry.linkLabel}
                <i aria-hidden="true">↗</i>
              </b>
            </>
          );

          return (
            <li data-reveal key={entry.title}>
              {external ? (
                <a href={entry.href} rel="noreferrer" target="_blank">
                  {content}
                </a>
              ) : (
                <Link href={entry.href}>{content}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
