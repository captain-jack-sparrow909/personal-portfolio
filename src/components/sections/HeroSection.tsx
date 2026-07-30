import { ArrowLink } from "@/components/ui/ArrowLink";
import { CognitiveEngineFallback } from "@/components/visuals/CognitiveEngineFallback";

import styles from "./Sections.module.css";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className={styles.hero}
      data-scene-mode="hero"
      id="top"
    >
      <div
        aria-hidden="true"
        className={styles.heroField}
        data-parallax="slow"
      />
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className="eyebrow" data-hero-eyebrow>
            AI/ML &amp; AUTOMATION · FULL-STACK WEB/MOBILE ENGINEERING
          </p>
          <h1 className={styles.heroTitle} id="hero-title">
            <span className={styles.lineMask}>
              <span data-hero-line>Engineering</span>
            </span>
            <span className={styles.lineMask}>
              <span className={styles.heroSerif} data-hero-line>
                intelligence
              </span>
            </span>
            <span className={styles.lineMask}>
              <span data-hero-line>into motion.</span>
            </span>
          </h1>
          <p
            className={styles.heroDescription}
            data-hero-support
            data-parallax="slow"
          >
            I architect, build, automate, and deploy complete intelligent
            products—across models, agents, frontend, backend, web, mobile,
            data, cloud, and production infrastructure.
          </p>
          <div className={styles.heroActions} data-hero-support>
            <ArrowLink href="#work">Explore the systems</ArrowLink>
            <ArrowLink href="#contact" variant="quiet">
              Start a conversation
            </ArrowLink>
          </div>
        </div>

        <div
          className={styles.heroVisual}
          data-hero-visual
          data-parallax="medium"
        >
          <CognitiveEngineFallback />
        </div>
      </div>

      <div className={styles.heroRail} data-hero-rail>
        <p>
          <span>LOC</span> Dubai, UAE
        </p>
        <p>
          <span>FOCUS</span> End-to-end intelligent systems
        </p>
        <p>
          <span>STATUS</span> Building globally
        </p>
      </div>

      <div
        aria-label="Technical disciplines"
        className={styles.ticker}
        data-hero-rail
      >
        <div className={styles.tickerTrack} data-ticker-track>
          {[0, 1].map((copy) => (
            <p aria-hidden={copy === 1} key={copy}>
              AI <span>/</span> ML <span>/</span> AGENTS <span>/</span>{" "}
              AUTOMATION <span>/</span> FRONTEND <span>/</span> BACKEND{" "}
              <span>/</span> WEB <span>/</span> MOBILE <span>/</span> MLOPS{" "}
              <span>/</span> CLOUD <span>/</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
