export const siteConfig = {
  name: "Jabir Khan",
  shortName: "JK",
  title: "Jabir Khan — AI/ML Engineer and Full-Stack Developer",
  description:
    "Portfolio of Jabir Khan, an AI/ML engineer and full-stack web and mobile developer building intelligent products, developer tools and scalable digital systems.",
  location: "Dubai, UAE",
  availability: "Available for select collaborations",
} as const;

export function getSiteUrl(): URL {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
}
