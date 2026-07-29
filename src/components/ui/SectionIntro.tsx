type SectionIntroProps = {
  index: string;
  eyebrow: string;
  title: string;
  titleId: string;
  description?: string;
};

export function SectionIntro({
  index,
  eyebrow,
  title,
  titleId,
  description,
}: SectionIntroProps) {
  return (
    <header className="section-intro" data-reveal>
      <div className="section-intro__label">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <div className="section-intro__copy">
        <h2 id={titleId}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  );
}
