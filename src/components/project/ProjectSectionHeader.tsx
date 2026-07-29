import styles from "./ProjectCaseStudy.module.css";

type ProjectSectionHeaderProps = {
  description?: string;
  index: string;
  label: string;
  title: string;
  titleId: string;
};

export function ProjectSectionHeader({
  description,
  index,
  label,
  title,
  titleId,
}: ProjectSectionHeaderProps) {
  return (
    <header className={styles.sectionHeader} data-reveal>
      <div className={styles.sectionLabel}>
        <span>{index}</span>
        <span>{label}</span>
      </div>
      <div className={styles.sectionHeading}>
        <h2 id={titleId}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  );
}
