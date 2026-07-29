import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "quiet";
};

export function ArrowLink({
  href,
  children,
  variant = "primary",
}: ArrowLinkProps) {
  return (
    <Link
      className={`arrow-link arrow-link--${variant}`}
      data-magnetic
      href={href}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="arrow-link__icon">
        ↗
      </span>
    </Link>
  );
}
