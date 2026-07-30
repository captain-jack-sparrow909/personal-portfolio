import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmailButton } from "@/components/contact/CopyEmailButton";
import { siteConfig } from "@/content/site";

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
        <span>07 / CONTACT</span>
      </div>
      <h2 data-reveal id="contact-title">
        Let&apos;s build what
        <span>does not exist yet.</span>
      </h2>
      <div className={styles.contactGrid} data-reveal>
        <aside className={styles.contactChannels}>
          <div>
            <p className={styles.contactLead}>
              Open to senior product-engineering conversations and ambitious AI,
              web, mobile and developer-tool collaborations.
            </p>
            <div className={styles.emailActions}>
              <a
                className={styles.contactEmail}
                href={`mailto:${siteConfig.email}`}
              >
                <span>Direct email</span>
                {siteConfig.email}
              </a>
              <CopyEmailButton email={siteConfig.email} />
            </div>
            <div className={styles.contactFit}>
              <span>Best fit</span>
              <ul>
                <li>AI products and applied ML</li>
                <li>Developer tools and platform engineering</li>
                <li>High-craft web and mobile products</li>
                <li>Technical product architecture</li>
              </ul>
            </div>
            <p className={styles.contactBrief}>
              A useful first message includes the problem, current stage,
              desired outcome and approximate timing.
            </p>
          </div>
          <nav aria-label="Social profiles">
            <p>Elsewhere / verified channels</p>
            <ul>
              {siteConfig.socialLinks.map((link, index) => (
                <li key={link.label}>
                  <a href={link.href} rel="noreferrer" target="_blank">
                    <span>0{index + 1}</span>
                    <b>{link.label}</b>
                    <i aria-hidden="true">↗</i>
                  </a>
                  <small>{link.handle}</small>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <ContactForm />
      </div>
    </section>
  );
}
