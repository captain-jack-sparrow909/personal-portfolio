export type CapabilityGroup = {
  index: string;
  name: string;
  description: string;
  skills: readonly string[];
};

export const capabilityGroups: readonly CapabilityGroup[] = [
  {
    index: "01",
    name: "AI, ML and Automation",
    description:
      "The complete AI lifecycle—from models and intelligence to automation and production.",
    skills: [
      "Machine and deep learning",
      "LLM and multimodal systems",
      "Agentic AI and automation",
      "RAG and vector search",
      "Model evaluation",
      "NLP and computer vision",
      "PyTorch",
      "Local and hosted models",
    ],
  },
  {
    index: "02",
    name: "Frontend Engineering",
    description:
      "High-performance product interfaces engineered as robust systems.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Three.js",
      "WebGL",
      "Design systems",
      "Performance and accessibility",
    ],
  },
  {
    index: "03",
    name: "Mobile Engineering",
    description:
      "Production mobile systems designed, integrated and shipped end to end.",
    skills: [
      "React Native",
      "Expo",
      "Mobile architecture",
      "Cross-platform product development",
      "Native integrations",
      "Offline-first systems",
    ],
  },
  {
    index: "04",
    name: "Backend and Data Engineering",
    description:
      "Scalable services, APIs, data platforms and distributed system foundations.",
    skills: [
      "Node.js and NestJS",
      "Python and FastAPI",
      "Microservices",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Kafka",
      "REST and event-driven APIs",
    ],
  },
  {
    index: "05",
    name: "MLOps, Cloud and Deployment",
    description:
      "Automation and infrastructure that carry software and models into reliable production.",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Model serving and MLOps",
      "Infrastructure automation",
      "Observability",
      "Deployment architecture",
    ],
  },
] as const;
