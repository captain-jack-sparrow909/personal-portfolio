import styles from "./Sections.module.css";

export function ContactSection() {
  return (
    <section
      aria-labelledby="contact-title"
      className={styles.contact}
      data-scene-mode="contact"
      id="contact"
    >
      <div className={styles.contactMeta} data-reveal>
        <p className="eyebrow">OPEN CHANNEL / DUBAI — GLOBAL</p>
        <span>06 / CONTACT</span>
      </div>
      <h2 data-reveal id="contact-title">
        Let&apos;s build what
        <span>does not exist yet.</span>
      </h2>
      <div className={styles.contactBottom} data-reveal>
        <p>
          Available for ambitious AI, web, mobile and product-engineering
          collaborations.
        </p>
        <p className={styles.contactPlaceholder}>
          Verified contact and social channels will be connected in the
          production features phase.
        </p>
      </div>
    </section>
  );
}
