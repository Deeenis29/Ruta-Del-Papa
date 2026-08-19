interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  center?: boolean;
}

export function SectionHeading({ title, subtitle, eyebrow, center = true }: SectionHeadingProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className={`section-subtitle ${center ? 'mx-auto' : ''}`}>{subtitle}</p>}
    </div>
  );
}
