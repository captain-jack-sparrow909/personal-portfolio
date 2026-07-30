export const siteConfig = {
  name: "Jabir Khan",
  shortName: "JK",
  title: "Jabir Khan — AI/ML and Full-Stack Systems Engineer",
  description:
    "Portfolio of Jabir Khan, an AI/ML and full-stack systems engineer building complete intelligent products across models, agents, automation, frontend, backend, web, mobile, MLOps, cloud and production deployment.",
  location: "Dubai, UAE",
  availability: "Open to ambitious product collaborations",
  email: "khanjabir909@gmail.com",
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jabirkhan-dev",
      handle: "/in/jabirkhan-dev",
    },
    {
      label: "GitHub",
      href: "https://github.com/captain-jack-sparrow909",
      handle: "@captain-jack-sparrow909",
    },
    {
      label: "X / Twitter",
      href: "https://x.com/codeCaptain404",
      handle: "@codeCaptain404",
    },
  ],
} as const;

export function getSiteUrl(): URL {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
}
