import { siteConfig } from "@/content/site";

export function getPersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
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
  };
}
