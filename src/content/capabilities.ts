export type CapabilityGroup = {
  index: string;
  name: string;
  description: string;
  skills: readonly string[];
};

export const capabilityGroups: readonly CapabilityGroup[] = [
  {
    index: "01",
    name: "Artificial Intelligence",
    description: "Systems that reason, retrieve, automate and adapt.",
    skills: [
      "Machine learning",
      "LLM applications",
      "Agentic AI",
      "LangChain",
      "LangGraph",
      "PyTorch",
      "Local models",
      "Retrieval systems",
    ],
  },
  {
    index: "02",
    name: "Web Engineering",
    description: "Performant product surfaces and resilient platforms.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "NestJS",
      "Three.js",
      "WebGL",
    ],
  },
  {
    index: "03",
    name: "Mobile",
    description: "Cross-platform experiences designed around real use.",
    skills: [
      "React Native",
      "Expo",
      "Mobile architecture",
      "Cross-platform product development",
    ],
  },
  {
    index: "04",
    name: "Backend and Data",
    description: "Reliable services, data flows and event-driven systems.",
    skills: [
      "Microservices",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Kafka",
      "REST APIs",
    ],
  },
  {
    index: "05",
    name: "Cloud and Infrastructure",
    description: "The operational layer that carries products into production.",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Nginx",
      "Observability",
      "Deployment architecture",
    ],
  },
] as const;
