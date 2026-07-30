export type ProjectAccent = "warm" | "cyan" | "phosphor" | "violet";
export type ProjectSceneMode = "devpulse" | "rontgen" | "cognora" | "orkestria";

export type ProjectModule = {
  name: string;
  description: string;
};

export type ArchitectureStage = {
  label: string;
  description: string;
  signal: string;
};

export type ProjectDecision = {
  title: string;
  description: string;
};

export type ProjectProofPoint = {
  value: string;
  label: string;
};

export type InterfaceConcept = {
  label: string;
  title: string;
  description: string;
  signals: readonly string[];
};

export type Project = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  status: string;
  summary: string;
  detail?: string;
  problem: string;
  productConcept: string;
  capabilities: readonly string[];
  modules: readonly ProjectModule[];
  architecture: readonly ArchitectureStage[];
  decisions: readonly ProjectDecision[];
  interfaceConcepts: readonly InterfaceConcept[];
  technologies: readonly string[];
  visualMotif: string;
  currentStatus: string;
  nextFocus: string;
  accent: ProjectAccent;
  domain?: string;
  order: number;
  sceneMode: ProjectSceneMode;
  featured?: boolean;
  proofPoints?: readonly ProjectProofPoint[];
};

export const projects: readonly Project[] = [
  {
    slug: "dev-pulse-ai",
    name: "Dev Pulse AI",
    shortName: "Dev Pulse",
    category: "AI Content Intelligence",
    status: "Research prototype",
    summary:
      "A research-first AI content platform for software engineers, transforming trusted AI and engineering sources into polished content for X and LinkedIn.",
    detail:
      "It researches AI, machine learning, LLMs, agentic systems, full-stack engineering, cloud platforms, open-source projects, technical papers and developer news, then produces useful human-readable posts.",
    problem:
      "High-value engineering information is distributed across papers, repositories, product updates, technical writing and fast-moving news. Turning that material into useful content requires more than generation: sources need to be discovered, checked, organized and adapted without losing their technical meaning.",
    productConcept:
      "Dev Pulse AI is designed as a research-first editorial system. Source discovery and validation establish the evidence layer; planning and channel-specific generation shape the narrative; a human review gate remains in control before anything is published.",
    capabilities: [
      "Automated source discovery",
      "Research and source validation",
      "Trend detection",
      "Content planning",
      "Human review before publishing",
    ],
    modules: [
      {
        name: "Source discovery",
        description:
          "Find relevant material across trusted AI, engineering, open-source and research sources.",
      },
      {
        name: "Research validation",
        description:
          "Keep source context visible while material is reviewed and organized for use.",
      },
      {
        name: "Trend detection",
        description:
          "Identify recurring technical themes without replacing editorial judgment.",
      },
      {
        name: "Content planning",
        description:
          "Turn validated research into a deliberate queue of useful engineering topics.",
      },
      {
        name: "Channel generation",
        description:
          "Prepare distinct X and LinkedIn drafts from the same research foundation.",
      },
      {
        name: "Human review",
        description:
          "Hold every publishing action behind an explicit review and approval step.",
      },
    ],
    architecture: [
      {
        label: "Trusted sources",
        description:
          "Technical papers, repositories, engineering writing and developer news enter as traceable source material.",
        signal: "INPUT",
      },
      {
        label: "Research layer",
        description:
          "Discovery, validation and topic clustering establish the working context.",
        signal: "EVIDENCE",
      },
      {
        label: "Editorial planner",
        description:
          "The system organizes research into channel-aware content opportunities.",
        signal: "PLAN",
      },
      {
        label: "Draft engines",
        description:
          "X and LinkedIn outputs are generated with different structural constraints.",
        signal: "COMPOSE",
      },
      {
        label: "Human review",
        description:
          "A person checks usefulness, accuracy and tone before publication.",
        signal: "APPROVE",
      },
    ],
    decisions: [
      {
        title: "Research precedes generation",
        description:
          "The system is organized around evidence collection and validation rather than a blank prompt.",
      },
      {
        title: "Channels remain distinct",
        description:
          "X and LinkedIn drafts share research context but not an identical output format.",
      },
      {
        title: "Publishing stays supervised",
        description:
          "Automation prepares the work; a human remains responsible for the final decision.",
      },
    ],
    interfaceConcepts: [
      {
        label: "Concept 01 / Research radar",
        title: "Source intelligence",
        description:
          "A traceable view of source material, emerging themes and items awaiting validation.",
        signals: ["Source context", "Topic clusters", "Validation queue"],
      },
      {
        label: "Concept 02 / Editorial flow",
        title: "From evidence to draft",
        description:
          "A staged content pipeline that keeps research, planning, generation and review visibly separate.",
        signals: ["Research brief", "Channel draft", "Review gate"],
      },
    ],
    technologies: ["AI research", "Content pipelines", "Human-in-the-loop"],
    visualMotif:
      "Live signals move through a research and publishing pipeline.",
    currentStatus:
      "Dev Pulse AI is being built as a research and content workflow. The portfolio describes the intended system and active product direction without claiming publishing volume or audience outcomes.",
    nextFocus:
      "Refining source validation, editorial planning and the human-review experience.",
    accent: "warm",
    order: 2,
    sceneMode: "devpulse",
  },
  {
    slug: "rontgenai",
    name: "RontgenAI",
    shortName: "Rontgen",
    category: "AI Engineering Platform",
    status: "Public preview",
    summary:
      "An AI engineering platform that helps teams understand, review and improve software systems.",
    detail:
      "Seven focused product surfaces are publicly available across architecture review, data exploration, repository understanding, pull-request review, implementation planning, incident analysis, and CI optimization.",
    problem:
      "Architecture, repository behavior, pull requests, incidents and delivery pipelines are usually investigated in separate tools. That fragmentation makes it harder to form one reliable picture of how a software system works and where engineering attention is needed.",
    productConcept:
      "RontgenAI is a public engineering-intelligence suite with focused workflows for architecture review, repository explanation, pull-request review, issue planning, incident analysis, CI/CD optimization and data exploration.",
    capabilities: [
      "Architecture reviews",
      "Repository explanations",
      "Pull-request reviews",
      "Issue planning",
      "Incident analysis",
      "CI/CD optimization",
    ],
    modules: [
      {
        name: "Blueprint",
        description:
          "Review architecture diagrams for bottlenecks, single points of failure and improvement paths.",
      },
      {
        name: "Pulse",
        description:
          "Explore spreadsheets and SQL data through plain-language questions with inspectable query output.",
      },
      {
        name: "Atlas",
        description:
          "Map unfamiliar repositories, surface architecture decisions and answer questions about the codebase.",
      },
      {
        name: "Sentinel",
        description:
          "Review pull requests for bugs, security concerns and potential regressions in context.",
      },
      {
        name: "Forge",
        description:
          "Turn an engineering issue into an implementation plan and a proposed pull request.",
      },
      {
        name: "Radar",
        description:
          "Correlate production evidence to support root-cause analysis and remediation.",
      },
      {
        name: "Relay",
        description:
          "Inspect CI workflows for critical paths, cache misses, flaky tests and duplicated work.",
      },
    ],
    architecture: [
      {
        label: "Engineering inputs",
        description:
          "Repositories, changes, issues, incidents and delivery context provide the working material.",
        signal: "INGEST",
      },
      {
        label: "System context",
        description:
          "A shared representation connects code, architecture and workflow relationships.",
        signal: "MAP",
      },
      {
        label: "Review workflows",
        description:
          "Each product workflow applies its own reasoning while using the shared context.",
        signal: "ANALYZE",
      },
      {
        label: "Platform services",
        description:
          "Authentication, billing, usage and infrastructure concerns remain shared across products.",
        signal: "SUPPORT",
      },
      {
        label: "Engineer decision",
        description:
          "Explanations and review findings support—not replace—engineering judgment.",
        signal: "DECIDE",
      },
    ],
    decisions: [
      {
        title: "One context, multiple workflows",
        description:
          "Shared system understanding reduces duplicated foundations while allowing each workflow to evolve independently.",
      },
      {
        title: "Explanations remain inspectable",
        description:
          "Architecture relationships and review context should be visible rather than hidden behind a single score.",
      },
      {
        title: "Platform concerns stay shared",
        description:
          "Identity, billing, usage and infrastructure are treated as common services instead of being rebuilt per workflow.",
      },
    ],
    interfaceConcepts: [
      {
        label: "Concept 01 / System scanner",
        title: "Architecture layers",
        description:
          "A navigable system map that reveals services, dependencies and review context layer by layer.",
        signals: ["Service boundary", "Dependency path", "Review focus"],
      },
      {
        label: "Concept 02 / Review workspace",
        title: "Change in context",
        description:
          "A focused review surface connecting a proposed change to architecture and repository context.",
        signals: ["Change set", "System impact", "Engineer notes"],
      },
    ],
    technologies: [
      "System intelligence",
      "Code analysis",
      "Shared infrastructure",
    ],
    visualMotif:
      "An architecture scanner reveals relationships inside complex systems.",
    currentStatus:
      "RontgenAI is available as a public preview at rontgenai.dev. Seven focused v1 product surfaces are live, while four additional workflows remain on the roadmap.",
    nextFocus:
      "Deepening the live workflows, making their evidence easier to inspect and validating them with real engineering teams.",
    accent: "cyan",
    domain: "rontgenai.dev",
    featured: true,
    proofPoints: [
      { value: "07", label: "public v1 product surfaces" },
      { value: "<2s", label: "analysis target shown in product" },
      { value: "04", label: "additional workflows on roadmap" },
    ],
    order: 1,
    sceneMode: "rontgen",
  },
  {
    slug: "cognoraai",
    name: "CognoraAI",
    shortName: "Cognora",
    category: "AI Learning Workspace",
    status: "Product design",
    summary:
      "A unified AI learning workspace that helps people plan, understand, practice and improve.",
    detail:
      "Instead of separating learning into disconnected tools, CognoraAI creates one continuous system that understands what the learner is studying, where they struggle and what they should do next.",
    problem:
      "Planning, lecture support, practice, feedback and knowledge-gap analysis are often isolated from one another. A learner has to repeatedly rebuild context even though each activity is part of the same learning journey.",
    productConcept:
      "CognoraAI is designed as one continuous learning workspace. Its modules share learner and subject context so planning, understanding, practice and feedback can contribute to a clearer next action.",
    capabilities: [
      "Study Planner",
      "Lecture Companion",
      "Learning Roadmap Generator",
      "Assignment Feedback",
      "Knowledge Gap Detector",
    ],
    modules: [
      {
        name: "Study Planner",
        description:
          "Organize learning goals and available time into a practical sequence of work.",
      },
      {
        name: "Lecture Companion",
        description:
          "Support understanding by keeping lecture material connected to the wider subject context.",
      },
      {
        name: "Roadmap Generator",
        description:
          "Turn a learning goal into an ordered path of concepts and practice.",
      },
      {
        name: "Assignment Feedback",
        description:
          "Provide structured feedback that points back to concepts requiring attention.",
      },
      {
        name: "Knowledge Gap Detector",
        description:
          "Identify disconnected or uncertain concepts that should shape the next study step.",
      },
    ],
    architecture: [
      {
        label: "Learner context",
        description:
          "Goals, subject material and current activity establish the working learning context.",
        signal: "CONTEXT",
      },
      {
        label: "Learning graph",
        description:
          "Concepts and their relationships form a shared map across the workspace.",
        signal: "CONNECT",
      },
      {
        label: "Workspace modules",
        description:
          "Planning, lecture support, roadmaps, feedback and gap detection use the same context.",
        signal: "PRACTICE",
      },
      {
        label: "Understanding signal",
        description:
          "Activity reveals where concepts appear connected, uncertain or incomplete.",
        signal: "REFLECT",
      },
      {
        label: "Next action",
        description:
          "The workspace turns current context into a clear next learning step.",
        signal: "CONTINUE",
      },
    ],
    decisions: [
      {
        title: "Continuity over isolated tools",
        description:
          "Modules are designed around shared learning context rather than independent AI utilities.",
      },
      {
        title: "The graph supports the learner",
        description:
          "Knowledge relationships exist to clarify the next action, not to become a decorative visualization.",
      },
      {
        title: "Feedback reconnects to concepts",
        description:
          "Assignment feedback should feed back into planning and knowledge-gap awareness.",
      },
    ],
    interfaceConcepts: [
      {
        label: "Concept 01 / Learning graph",
        title: "Connected understanding",
        description:
          "A concept map showing current focus, related ideas and areas that need another pass.",
        signals: ["Current concept", "Related knowledge", "Needs attention"],
      },
      {
        label: "Concept 02 / Next-action view",
        title: "One clear step",
        description:
          "A calm workspace that combines the learning plan, immediate task and supporting context.",
        signals: ["Study plan", "Next activity", "Supporting material"],
      },
    ],
    technologies: ["Knowledge systems", "Adaptive learning", "AI workflows"],
    visualMotif:
      "A knowledge graph grows, connects and reorganizes around the learner.",
    currentStatus:
      "CognoraAI is being built as a unified learning-workspace concept. The product direction is active, while educational outcomes and user numbers remain intentionally unclaimed.",
    nextFocus:
      "Defining the shared learner context and how each module contributes to the next learning action.",
    accent: "phosphor",
    order: 3,
    sceneMode: "cognora",
  },
  {
    slug: "orkestriaai",
    name: "OrkestriaAI",
    shortName: "Orkestria",
    category: "Human-Supervised AI Operations",
    status: "Interaction prototype",
    summary:
      "An intelligent orchestration layer for browser actions, workflows, developer operations, cloud efficiency and security.",
    detail:
      "Powerful autonomous execution with human approval before purchases, submissions, infrastructure changes or other risky actions.",
    problem:
      "Browser actions, workflow automation, developer operations, cloud efficiency and security can benefit from autonomous execution, but the risk changes when a system can submit, purchase or alter infrastructure. Capability needs to be paired with explicit control.",
    productConcept:
      "OrkestriaAI is conceived as a human-supervised orchestration layer. Specialized agents can prepare and coordinate work, while risk-aware approval gates pause consequential actions until a person decides whether execution should continue.",
    capabilities: [
      "Autonomous Browser Agent",
      "AI Workflow Builder",
      "AI DevOps Assistant",
      "AI Cloud Cost Optimizer",
      "AI Security Review Assistant",
    ],
    modules: [
      {
        name: "Autonomous Browser Agent",
        description:
          "Coordinate multi-step browser work while pausing before consequential submissions or purchases.",
      },
      {
        name: "AI Workflow Builder",
        description:
          "Compose repeatable agent workflows with visible stages and control points.",
      },
      {
        name: "AI DevOps Assistant",
        description:
          "Prepare developer-operations actions while keeping infrastructure changes supervised.",
      },
      {
        name: "Cloud Cost Optimizer",
        description:
          "Investigate cloud-efficiency opportunities and prepare actions for review.",
      },
      {
        name: "Security Review Assistant",
        description:
          "Support structured security review without silently executing risky changes.",
      },
    ],
    architecture: [
      {
        label: "Human intent",
        description:
          "A goal and its operating boundaries enter the orchestration layer.",
        signal: "DIRECT",
      },
      {
        label: "Workflow planner",
        description:
          "The system breaks the goal into visible stages and specialized work.",
        signal: "ORCHESTRATE",
      },
      {
        label: "Specialized agents",
        description:
          "Browser, workflow, DevOps, cloud and security capabilities prepare their actions.",
        signal: "PREPARE",
      },
      {
        label: "Approval core",
        description:
          "Purchases, submissions and infrastructure changes pause for a human decision.",
        signal: "APPROVE",
      },
      {
        label: "Controlled execution",
        description:
          "Approved actions continue while rejected or revised actions return to the workflow.",
        signal: "EXECUTE",
      },
    ],
    decisions: [
      {
        title: "Approval is part of the architecture",
        description:
          "Human review is a first-class workflow state, not a warning added after the automation is designed.",
      },
      {
        title: "Risk changes the route",
        description:
          "Consequential actions take a different path from reversible or preparatory work.",
      },
      {
        title: "Orchestration remains visible",
        description:
          "Users should be able to understand which agent is acting, what is waiting and where approval is required.",
      },
    ],
    interfaceConcepts: [
      {
        label: "Concept 01 / Workflow field",
        title: "Agents in formation",
        description:
          "A spatial workflow view showing active agents, queued stages and the shared approval core.",
        signals: ["Active agent", "Queued action", "Approval required"],
      },
      {
        label: "Concept 02 / Approval gate",
        title: "Control at the critical moment",
        description:
          "A focused decision surface that separates context, proposed action and explicit approval.",
        signals: ["Action context", "Risk boundary", "Human decision"],
      },
    ],
    technologies: ["Agent orchestration", "Approval gates", "Cloud operations"],
    visualMotif:
      "Agent nodes converge on a human-approval core before execution.",
    currentStatus:
      "OrkestriaAI is in active product definition and build exploration. This case study describes the supervision model without claiming autonomous production use.",
    nextFocus:
      "Formalizing approval states and the interaction contract between specialized agents and human control.",
    accent: "violet",
    order: 4,
    sceneMode: "orkestria",
  },
] as const;

export const featuredProjects: readonly Project[] = [
  ...projects.filter((project) => project.featured),
  ...projects.filter((project) => !project.featured),
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(project: Project): Project {
  const currentIndex = featuredProjects.findIndex(
    (candidate) => candidate.slug === project.slug,
  );
  return (
    featuredProjects[(currentIndex + 1) % featuredProjects.length] ?? project
  );
}
