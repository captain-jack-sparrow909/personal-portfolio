export type ProjectAccent = "warm" | "cyan" | "phosphor" | "violet";
export type ProjectSceneMode = "devpulse" | "rontgen" | "cognora" | "orkestria";

export type Project = {
  slug: string;
  name: string;
  category: string;
  status: string;
  summary: string;
  detail?: string;
  capabilities: readonly string[];
  technologies: readonly string[];
  visualMotif: string;
  accent: ProjectAccent;
  domain?: string;
  order: number;
  sceneMode: ProjectSceneMode;
};

export const projects: readonly Project[] = [
  {
    slug: "dev-pulse-ai",
    name: "Dev Pulse AI",
    category: "AI Content Intelligence",
    status: "Building",
    summary:
      "A research-first AI content platform for software engineers, transforming trusted AI and engineering sources into polished content for X and LinkedIn.",
    detail:
      "It researches AI, machine learning, LLMs, agentic systems, full-stack engineering, cloud platforms, open-source projects, technical papers and developer news, then produces useful human-readable posts.",
    capabilities: [
      "Automated source discovery",
      "Research and source validation",
      "Trend detection",
      "Content planning",
      "Human review before publishing",
    ],
    technologies: ["AI research", "Content pipelines", "Human-in-the-loop"],
    visualMotif:
      "Live signals move through a research and publishing pipeline.",
    accent: "warm",
    order: 1,
    sceneMode: "devpulse",
  },
  {
    slug: "rontgen-ai",
    name: "RontgenAI",
    category: "AI Engineering Platform",
    status: "Early stage / Building",
    summary:
      "An AI engineering platform that helps teams understand, review and improve software systems.",
    capabilities: [
      "Architecture reviews",
      "Repository explanations",
      "Pull-request reviews",
      "Issue planning",
      "Incident analysis",
      "CI/CD optimization",
    ],
    technologies: [
      "System intelligence",
      "Code analysis",
      "Shared infrastructure",
    ],
    visualMotif:
      "An architecture scanner reveals relationships inside complex systems.",
    accent: "cyan",
    domain: "rontgenai.dev",
    order: 2,
    sceneMode: "rontgen",
  },
  {
    slug: "cognora-ai",
    name: "CognoraAI",
    category: "AI Learning Workspace",
    status: "Building",
    summary:
      "A unified AI learning workspace that helps people plan, understand, practice and improve.",
    detail:
      "Instead of separating learning into disconnected tools, CognoraAI creates one continuous system that understands what the learner is studying, where they struggle and what they should do next.",
    capabilities: [
      "Study Planner",
      "Lecture Companion",
      "Learning Roadmap Generator",
      "Assignment Feedback",
      "Knowledge Gap Detector",
    ],
    technologies: ["Knowledge systems", "Adaptive learning", "AI workflows"],
    visualMotif:
      "A knowledge graph grows, connects and reorganizes around the learner.",
    accent: "phosphor",
    order: 3,
    sceneMode: "cognora",
  },
  {
    slug: "orkestria-ai",
    name: "OrkestriaAI",
    category: "Human-Supervised AI Operations",
    status: "Building",
    summary:
      "An intelligent orchestration layer for browser actions, workflows, developer operations, cloud efficiency and security.",
    detail:
      "Powerful autonomous execution with human approval before purchases, submissions, infrastructure changes or other risky actions.",
    capabilities: [
      "Autonomous Browser Agent",
      "AI Workflow Builder",
      "AI DevOps Assistant",
      "AI Cloud Cost Optimizer",
      "AI Security Review Assistant",
    ],
    technologies: ["Agent orchestration", "Approval gates", "Cloud operations"],
    visualMotif:
      "Agent nodes converge on a human-approval core before execution.",
    accent: "violet",
    order: 4,
    sceneMode: "orkestria",
  },
] as const;
