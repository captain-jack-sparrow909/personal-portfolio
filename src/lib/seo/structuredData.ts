import type { Project } from "@/content/projects";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { getSiteUrl } from "@/content/site";

export function getPersonStructuredData() {
  const siteUrl = getSiteUrl();
  const personId = new URL("/#jabir-khan", siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": personId,
        "@type": "Person",
        name: siteConfig.name,
        url: siteUrl.toString(),
        email: `mailto:${siteConfig.email}`,
        sameAs: siteConfig.socialLinks.map((link) => link.href),
        jobTitle: "AI/ML Engineer and Full-Stack Web and Mobile Developer",
        description: siteConfig.description,
        homeLocation: {
          "@type": "Place",
          name: siteConfig.location,
        },
        knowsAbout: [
          "Artificial intelligence",
          "Machine learning",
          "Full-stack web development",
          "Mobile application development",
          "Cloud infrastructure",
          "Developer tools",
        ],
      },
      {
        "@type": "WebSite",
        name: `${siteConfig.name} Portfolio`,
        url: siteUrl.toString(),
        author: { "@id": personId },
      },
      {
        "@type": "ItemList",
        name: "Selected engineering work",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: new URL(`/work/${project.slug}`, siteUrl).toString(),
          item: {
            "@type": "CreativeWork",
            name: project.name,
            description: project.summary,
            creator: { "@id": personId },
            keywords: project.technologies.join(", "),
          },
        })),
      },
    ],
  };
}

export function getProjectStructuredData(project: Project) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    url: new URL(`/work/${project.slug}`, siteUrl).toString(),
    description: project.summary,
    abstract: project.productConcept,
    creator: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteUrl.toString(),
    },
    genre: project.category,
    keywords: project.technologies.join(", "),
  };
}

export function serializeStructuredData(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
