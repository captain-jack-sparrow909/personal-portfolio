export const projectTypeValues = [
  "ai-ml",
  "web-product",
  "mobile-app",
  "developer-tool",
  "cloud-systems",
  "other",
] as const;

export const projectTypeLabels: Record<
  (typeof projectTypeValues)[number],
  string
> = {
  "ai-ml": "AI / ML system",
  "web-product": "Web product",
  "mobile-app": "Mobile application",
  "developer-tool": "Developer tool",
  "cloud-systems": "Cloud / systems engineering",
  other: "Something else",
};
