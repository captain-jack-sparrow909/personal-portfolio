import { ArrowLink } from "@/components/ui/ArrowLink";
import { CognitiveEngineFallback } from "@/components/visuals/CognitiveEngineFallback";

import styles from "./Sections.module.css";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className={styles.hero} id="top">
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className="eyebrow" data-hero-eyebrow>
            AI/ML ENGINEER · FULL-STACK WEB/MOBILE DEVELOPER
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
            I build AI-native systems, web platforms, mobile experiences, and
            developer infrastructure that turn ambitious ideas into working
            products.
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
          <span>FOCUS</span> Intelligent product systems
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
              AI SYSTEMS <span>/</span> AGENTIC WORKFLOWS <span>/</span> WEB{" "}
              <span>/</span> MOBILE <span>/</span> CLOUD <span>/</span>{" "}
              DEVTOOLS <span>/</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
