import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        <span aria-hidden="true">©</span> {new Date().getFullYear()}{" "}
        {siteConfig.name} / Dubai
      </p>
      <nav aria-label="Footer social links" className="site-footer__socials">
        {siteConfig.socialLinks.map((link) => (
          <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
            {link.label}
          </a>
        ))}
      </nav>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
