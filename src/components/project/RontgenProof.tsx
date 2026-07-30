import type { Project } from "@/content/projects";

import styles from "./ProjectCaseStudy.module.css";

const liveProducts = [
  {
    name: "Blueprint",
    function: "Architecture review",
    href: "https://rontgenai.dev/app/blueprint",
  },
  {
    name: "Pulse",
    function: "Data exploration",
    href: "https://rontgenai.dev/app/pulse",
  },
  {
    name: "Atlas",
    function: "Repository understanding",
    href: "https://rontgenai.dev/app/atlas",
  },
  {
    name: "Sentinel",
    function: "Pull-request review",
    href: "https://rontgenai.dev/app/sentinel",
  },
  {
    name: "Forge",
    function: "Issue to implementation",
    href: "https://rontgenai.dev/app/forge",
  },
  {
    name: "Radar",
    function: "Incident analysis",
    href: "https://rontgenai.dev/app/radar",
  },
  {
    name: "Relay",
    function: "CI optimization",
    href: "https://rontgenai.dev/app/relay",
  },
] as const;

export function RontgenProof({ project }: { project: Project }) {
  if (!project.featured || !project.domain) return null;

  return (
    <section
      aria-labelledby="public-proof-title"
      className={styles.proofSection}
      id="public-proof"
    >
      <div className={styles.proofTopline}>
        <span>Flagship / Public product proof</span>
        <span>Live at {project.domain}</span>
      </div>

      <div className={styles.proofIntro}>
        <div>
          <p className={styles.eyebrow}>SEVEN PRODUCT SURFACES / V1</p>
          <h2 id="public-proof-title">Open it. Inspect it. Use it.</h2>
        </div>
        <p>
          RontgenAI is not presented as a future concept. Its public preview
          exposes seven focused engineering products, authenticated application
          routes and structured demonstration output.
        </p>
      </div>

      <dl className={styles.proofMetrics}>
        {project.proofPoints?.map((point) => (
          <div key={point.label}>
            <dt>{point.label}</dt>
            <dd>{point.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.liveSurface} data-reveal>
        <div className={styles.liveSurfaceHeader}>
          <span>RÖNTGEN AI / PRODUCT INDEX</span>
          <i>CONNECTED</i>
        </div>
        <div className={styles.liveProductGrid}>
          {liveProducts.map((product, index) => (
            <a
              href={product.href}
              key={product.name}
              rel="noreferrer"
              target="_blank"
            >
              <span>0{index + 1}</span>
              <strong>{product.name}</strong>
              <small>{product.function}</small>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </div>

      <a
        className={styles.proofCta}
        href={`https://${project.domain}`}
        rel="noreferrer"
        target="_blank"
      >
        Launch public preview
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
