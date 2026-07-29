import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        <span aria-hidden="true">©</span> {new Date().getFullYear()}{" "}
        {siteConfig.name}
      </p>
      <p>Designed and engineered in Dubai</p>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
