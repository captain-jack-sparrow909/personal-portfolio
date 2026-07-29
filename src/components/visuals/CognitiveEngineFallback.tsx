import styles from "./CognitiveEngineFallback.module.css";

type CognitiveEngineFallbackProps = {
  label?: string;
  compact?: boolean;
};

export function CognitiveEngineFallback({
  label = "Cognitive Engine",
  compact = false,
}: CognitiveEngineFallbackProps) {
  return (
    <figure
      aria-label={`${label}, an abstract mechanical-neural artifact`}
      className={`${styles.engine} ${compact ? styles.compact : ""}`}
    >
      <div aria-hidden="true" className={styles.field}>
        <span className={`${styles.axis} ${styles.axisHorizontal}`} />
        <span className={`${styles.axis} ${styles.axisVertical}`} />
        <span className={`${styles.ring} ${styles.ringOuter}`} />
        <span className={`${styles.ring} ${styles.ringMiddle}`} />
        <span className={`${styles.ring} ${styles.ringInner}`} />
        <span className={styles.coreHalo} />
        <span className={styles.core} />
        <span className={`${styles.node} ${styles.nodeOne}`} />
        <span className={`${styles.node} ${styles.nodeTwo}`} />
        <span className={`${styles.node} ${styles.nodeThree}`} />
        <span className={`${styles.node} ${styles.nodeFour}`} />
        <span className={`${styles.node} ${styles.nodeFive}`} />
        <span className={`${styles.fragment} ${styles.fragmentOne}`}>011</span>
        <span className={`${styles.fragment} ${styles.fragmentTwo}`}>AI</span>
        <span className={`${styles.fragment} ${styles.fragmentThree}`}>
          SYS
        </span>
      </div>
      <figcaption>
        <span>J/K — CE.01</span>
        <span>STATIC SYSTEM MODEL</span>
      </figcaption>
    </figure>
  );
}
