import type { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import "./style.scss";

type ActionButtonVariant = "outline" | "solid";

interface ActionButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  variant?: ActionButtonVariant;
}

const ActionButton = ({
  children,
  className = "",
  href,
  onClick,
  type = "button",
  variant = "outline",
}: ActionButtonProps) => {
  const classes = `action-button action-button--${variant} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default ActionButton;
