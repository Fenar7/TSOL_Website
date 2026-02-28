import type { ReactNode } from "react";
import "./style.scss";

interface SectionTitleProps {
  className?: string;
  label: string;
  subtitle?: ReactNode;
  title: ReactNode;
}

const SectionTitle = ({
  className = "",
  label,
  subtitle,
  title,
}: SectionTitleProps) => {
  return (
    <div className={`section-title ${className}`.trim()}>
      <div className="section-title__kicker-row">
        <span className="section-title__kicker-line" aria-hidden="true" />
        <p className="section-title__kicker">{label}</p>
        <span className="section-title__kicker-line" aria-hidden="true" />
      </div>

      <p className="section-title__title">{title}</p>
      {subtitle ? <p className="section-title__subtitle">{subtitle}</p> : null}
    </div>
  );
};

export default SectionTitle;
