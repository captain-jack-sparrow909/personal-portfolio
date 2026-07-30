import type { Project, ProjectSceneMode } from "./projects";

export type StoryStep = {
  label: string;
  title: string;
  description: string;
};

export type EvidenceItem = {
  label: string;
  state: "Live evidence" | "Design direction" | "In development";
  description: string;
};

export type ProductGalleryFrame = {
  src: string;
  alt: string;
  label: string;
  title: string;
  description: string;
  featured?: boolean;
};

export type ProjectStorytelling = {
  overview: {
    title: string;
    description: string;
  };
  journey: {
    label: string;
    title: string;
    description: string;
    steps: readonly StoryStep[];
  };
  modules: {
    title: string;
    description: string;
  };
  architecture: {
    title: string;
    description: string;
    caption: string;
  };
  gallery: {
    title: string;
    description: string;
    frames: readonly ProductGalleryFrame[];
  };
  concepts: {
    title: string;
    description: string;
  };
  decisions: {
    title: string;
  };
  status: {
    title: string;
  };
  evidence: {
    intro: string;
    contribution: readonly string[];
    items: readonly EvidenceItem[];
  };
};

const storytelling: Record<ProjectSceneMode, ProjectStorytelling> = {
  devpulse: {
    overview: {
      title: "Editorial work starts before the prompt.",
      description:
        "The useful part is not generating more words. It is finding evidence, preserving its meaning and knowing when a draft is ready for a person to approve.",
    },
    journey: {
      label: "One article, end to end",
      title: "From source signal to an approved post.",
      description:
        "Follow one technical story through the research and editorial loop. Each step leaves a visible record instead of collapsing the work into one opaque generation request.",
      steps: [
        {
          label: "Discover",
          title: "A source enters the radar",
          description:
            "A paper, repository or engineering update is collected with its origin and publishing context intact.",
        },
        {
          label: "Validate",
          title: "The claim earns its place",
          description:
            "The material is checked for relevance, technical meaning and whether it can support a useful story.",
        },
        {
          label: "Plan",
          title: "An editorial angle emerges",
          description:
            "The evidence becomes a brief with an audience, takeaway and channel-specific structure.",
        },
        {
          label: "Compose",
          title: "Each channel gets its own draft",
          description:
            "X and LinkedIn outputs share facts while using different pacing and constraints.",
        },
        {
          label: "Approve",
          title: "A person makes the final call",
          description:
            "Accuracy, usefulness and voice are reviewed before anything can be published.",
        },
      ],
    },
    modules: {
      title: "What makes the editorial loop useful.",
      description:
        "Six focused capabilities keep research, planning and publishing separate enough to inspect.",
    },
    architecture: {
      title: "How information moves.",
      description:
        "The flow keeps evidence attached to the story from discovery through human approval.",
      caption: "Research-to-publishing flow",
    },
    gallery: {
      title: "The editorial product at work.",
      description:
        "Real product captures follow the operating loop from the first entry point through research context and controlled publishing.",
      frames: [
        {
          src: "/images/projects/dev-pulse-ai/entry-point.webp",
          alt: "Dev Pulse AI sign-in screen beside a concise explanation of the research-first product.",
          label: "Product entry",
          title: "A clear promise before the workspace",
          description:
            "The entry screen frames Dev Pulse AI around traceable product decisions and durable research context.",
          featured: true,
        },
        {
          src: "/images/projects/dev-pulse-ai/dashboard.webp",
          alt: "Dev Pulse AI command center showing product activity, recent posts and system status.",
          label: "Command center",
          title: "One daily operating view",
          description:
            "Activity, recent output and the state of the editorial engine meet in a compact control surface.",
        },
        {
          src: "/images/projects/dev-pulse-ai/research-radar.webp",
          alt: "Dev Pulse AI research feed with source filters, ranked items and tracked research runs.",
          label: "Research radar",
          title: "Sources stay visible",
          description:
            "Provider filters, ranked material and run history make discovery inspectable before a draft is generated.",
        },
        {
          src: "/images/projects/dev-pulse-ai/project-memory.webp",
          alt: "Dev Pulse AI project intelligence page listing project repositories and accumulated memory.",
          label: "Project intelligence",
          title: "Context persists by project",
          description:
            "Repository-specific memory gives each product a durable context instead of rebuilding it for every post.",
        },
        {
          src: "/images/projects/dev-pulse-ai/publishing.webp",
          alt: "Dev Pulse AI publishing command center with distinct review and publishing lanes.",
          label: "Publishing control",
          title: "Publishing remains deliberate",
          description:
            "Separate queues keep readiness, review and final distribution visible at the action boundary.",
        },
      ],
    },
    concepts: {
      title: "Interfaces for editorial judgment.",
      description:
        "The product direction favors traceable sources, explicit queues and calm review surfaces.",
    },
    decisions: {
      title: "Decisions that protect trust.",
    },
    status: {
      title: "Where the prototype stands today.",
    },
    evidence: {
      intro:
        "This project is presented as an active research prototype. The evidence below separates working product decisions from the areas still being validated.",
      contribution: [
        "Product concept and editorial workflow",
        "Research and approval architecture",
        "Interface direction and interaction model",
        "Full-stack prototype implementation",
      ],
      items: [
        {
          label: "Architecture",
          state: "In development",
          description:
            "Source ingestion, evidence organization, channel drafting and approval are separate workflow stages.",
        },
        {
          label: "AI system",
          state: "In development",
          description:
            "Research context is prepared before generation; channel outputs remain distinct and supervised.",
        },
        {
          label: "Data",
          state: "Design direction",
          description:
            "Every content item retains source context, validation state and its relationship to an editorial brief.",
        },
        {
          label: "Reliability",
          state: "Design direction",
          description:
            "Publishing is blocked behind a human gate so an incomplete draft cannot silently become a public post.",
        },
        {
          label: "Security",
          state: "Design direction",
          description:
            "External publishing credentials belong at the final action boundary rather than throughout the research pipeline.",
        },
        {
          label: "Trade-offs",
          state: "Live evidence",
          description:
            "The product deliberately favors traceability and review over fully autonomous publishing volume.",
        },
        {
          label: "Deployment",
          state: "In development",
          description:
            "The current focus is the end-to-end prototype; production operations and audience metrics are not claimed.",
        },
      ],
    },
  },
  rontgen: {
    overview: {
      title: "See the system before changing it.",
      description:
        "RontgenAI gives different engineering questions their own focused product surface while keeping the output structured and inspectable.",
    },
    journey: {
      label: "Repository inspection",
      title: "A codebase becomes a navigable system map.",
      description:
        "The flagship story follows a sample repository from connection to an engineer-ready explanation of services, dependencies, risks and next actions.",
      steps: [
        {
          label: "Connect",
          title: "Choose the engineering surface",
          description:
            "Start with a repository, architecture diagram, pull request, incident trace, dataset or CI workflow.",
        },
        {
          label: "Map",
          title: "Build shared context",
          description:
            "The selected product organizes the input into boundaries, relationships and evidence that can be inspected.",
        },
        {
          label: "Reveal",
          title: "Expose dependencies and risk",
          description:
            "The result calls out relevant paths, architectural decisions, bottlenecks or failure signals.",
        },
        {
          label: "Recommend",
          title: "Turn findings into options",
          description:
            "Structured output makes remediation, review comments or implementation steps explicit.",
        },
        {
          label: "Decide",
          title: "Keep the engineer in control",
          description:
            "Rontgen supports judgment with evidence; it does not hide the decision behind a score.",
        },
      ],
    },
    modules: {
      title: "Seven products, one engineering lens.",
      description:
        "Each public v1 surface is narrow enough to understand and useful without requiring one general-purpose assistant.",
    },
    architecture: {
      title: "How a review reaches an engineer.",
      description:
        "Public inputs enter a focused workflow, gain shared context and return as structured evidence for a human decision.",
      caption: "Current public-preview architecture",
    },
    gallery: {
      title: "Seven products, one live workspace.",
      description:
        "These captures show the public product entry, the shared workspace and focused tools for architecture, repositories, reviews, incidents and delivery.",
      frames: [
        {
          src: "/images/projects/rontgenai/public-entry.webp",
          alt: "RontgenAI public landing page with the headline See through your systems and a connected architecture visual.",
          label: "Public entry",
          title: "The product promise is immediate",
          description:
            "The public experience introduces one engineering-intelligence suite rather than seven disconnected utilities.",
          featured: true,
        },
        {
          src: "/images/projects/rontgenai/dashboard.webp",
          alt: "RontgenAI dashboard presenting seven live engineering products in one launch workspace.",
          label: "Shared workspace",
          title: "Every focused tool remains one click away",
          description:
            "A common dashboard keeps the seven product surfaces legible while preserving their separate jobs.",
        },
        {
          src: "/images/projects/rontgenai/blueprint.webp",
          alt: "RontgenAI Blueprint architecture-review workspace with an upload area and structured review controls.",
          label: "Blueprint",
          title: "Architecture enters as reviewable evidence",
          description:
            "Blueprint provides a focused starting point for examining diagrams, bottlenecks and system boundaries.",
        },
        {
          src: "/images/projects/rontgenai/atlas.webp",
          alt: "RontgenAI Atlas repository-understanding workspace with repository input and analysis controls.",
          label: "Atlas",
          title: "A repository becomes navigable",
          description:
            "Atlas concentrates repository context, mapping and explanation inside a dedicated engineering surface.",
        },
        {
          src: "/images/projects/rontgenai/sentinel.webp",
          alt: "RontgenAI Sentinel pull-request review workspace with repository and change context.",
          label: "Sentinel",
          title: "Review happens in change context",
          description:
            "The pull-request surface makes review scope and supporting repository context explicit before analysis.",
        },
        {
          src: "/images/projects/rontgenai/radar.webp",
          alt: "RontgenAI Radar incident-analysis workspace with evidence inputs and investigation panels.",
          label: "Radar",
          title: "Operational evidence converges",
          description:
            "Incident material is organized around investigation and remediation instead of a generic chat thread.",
        },
        {
          src: "/images/projects/rontgenai/relay.webp",
          alt: "RontgenAI Relay CI analysis workspace with workflow metrics, pipeline input and optimization panels.",
          label: "Relay",
          title: "Delivery work becomes measurable",
          description:
            "Relay frames CI analysis around critical paths, repeated work and concrete optimization evidence.",
        },
      ],
    },
    concepts: {
      title: "The product language in use.",
      description:
        "These studies mirror the scanner, review and output patterns visible across the current public preview.",
    },
    decisions: {
      title: "Decisions that changed the build.",
    },
    status: {
      title: "Public, usable and still evolving.",
    },
    evidence: {
      intro:
        "RontgenAI is the portfolio's flagship proof: a public suite with seven v1 product entry points and a shared visual and interaction system.",
      contribution: [
        "Product architecture and technical direction",
        "Full-stack product implementation",
        "AI workflow and output design",
        "Design system and interaction engineering",
      ],
      items: [
        {
          label: "Architecture",
          state: "Live evidence",
          description:
            "Seven focused product routes separate architecture, data, repository, review, planning, incident and CI concerns.",
        },
        {
          label: "AI system",
          state: "Live evidence",
          description:
            "Each workflow constrains its input and output around one engineering task instead of presenting a generic chat surface.",
        },
        {
          label: "Data",
          state: "Live evidence",
          description:
            "Product surfaces accept diagrams, tabular data, repositories, changes, operational evidence and workflow files.",
        },
        {
          label: "Reliability",
          state: "In development",
          description:
            "Outputs are structured and inspectable; deeper retry, idempotency and recovery evidence remains part of ongoing product hardening.",
        },
        {
          label: "Security",
          state: "Live evidence",
          description:
            "Product workflows sit behind an authenticated application boundary, while public pages expose only the product narrative.",
        },
        {
          label: "Trade-offs",
          state: "Live evidence",
          description:
            "Rontgen favors seven narrow products over one broad assistant so each workflow can express its own context and result.",
        },
        {
          label: "Deployment",
          state: "Live evidence",
          description:
            "The public preview is available at rontgenai.dev with seven product routes labeled v1 and live.",
        },
      ],
    },
  },
  cognora: {
    overview: {
      title: "Learning should remember what happened before.",
      description:
        "The product direction connects planning, lectures, practice and feedback so the learner does not have to rebuild context in every tool.",
    },
    journey: {
      label: "Learner trace",
      title: "Watch a knowledge graph change.",
      description:
        "One learner moves from a lecture to an assignment, receives feedback and leaves with a clearer next step.",
      steps: [
        {
          label: "Attend",
          title: "A lecture introduces new concepts",
          description:
            "Notes and source material connect the current topic to the learner's existing map.",
        },
        {
          label: "Practice",
          title: "An assignment tests the connection",
          description:
            "The workspace observes which ideas can be applied and where understanding breaks down.",
        },
        {
          label: "Reflect",
          title: "Feedback updates the graph",
          description:
            "Strong, uncertain and missing relationships become visible rather than disappearing into a grade.",
        },
        {
          label: "Adapt",
          title: "The plan changes with the learner",
          description:
            "The roadmap moves concepts that need attention closer to the next session.",
        },
        {
          label: "Continue",
          title: "One next action replaces overload",
          description:
            "The learner sees the most useful next activity and the context required to complete it.",
        },
      ],
    },
    modules: {
      title: "A workspace that keeps context.",
      description:
        "Each capability contributes to the same learner model instead of becoming another disconnected AI utility.",
    },
    architecture: {
      title: "How learning context compounds.",
      description:
        "Goals, activity and feedback change a shared graph that informs the next learning action.",
      caption: "Adaptive learning loop",
    },
    gallery: {
      title: "The learner's context, rendered.",
      description:
        "The current product surfaces turn plans, mastery signals and course context into one calm learning workspace.",
      frames: [
        {
          src: "/images/projects/cognoraai/product-entry.webp",
          alt: "CognoraAI public landing page showing the adaptive learning dashboard and product proposition.",
          label: "Product entry",
          title: "The learning promise stays concrete",
          description:
            "The entry experience connects course material to an adaptive plan rather than leading with an abstract AI claim.",
          featured: true,
        },
        {
          src: "/images/projects/cognoraai/dashboard.webp",
          alt: "CognoraAI learner dashboard with a recommended study session, mastery signals and an adaptive daily plan.",
          label: "Today",
          title: "One useful next step",
          description:
            "A recommended session, knowledge gaps and the day's plan share one learner-specific operating view.",
        },
        {
          src: "/images/projects/cognoraai/ai-coach.webp",
          alt: "CognoraAI AI Coach page with a course-aware question area and contextual guidance.",
          label: "AI Coach",
          title: "Questions retain course context",
          description:
            "The coach is positioned inside the learning workspace so assistance can remain tied to the active course.",
        },
        {
          src: "/images/projects/cognoraai/roadmaps.webp",
          alt: "CognoraAI roadmap builder asking the learner to describe a target and generate an adaptive path.",
          label: "Roadmaps",
          title: "Goals become an adaptive path",
          description:
            "The roadmap surface begins with a destination and leaves room for the plan to change as evidence arrives.",
        },
      ],
    },
    concepts: {
      title: "Make progress feel understandable.",
      description:
        "The interface direction turns a complex learner model into a calm map and one useful next step.",
    },
    decisions: {
      title: "Choices that keep the learner central.",
    },
    status: {
      title: "What is designed, and what comes next.",
    },
    evidence: {
      intro:
        "CognoraAI is currently a product and architecture design study. The portfolio shows the model being tested without claiming educational outcomes.",
      contribution: [
        "Product concept and learner journey",
        "Knowledge-graph interaction model",
        "Adaptive workflow architecture",
        "Interface prototyping",
      ],
      items: [
        {
          label: "Architecture",
          state: "Design direction",
          description:
            "Planning, lecture support, practice and feedback contribute to one learner-context boundary.",
        },
        {
          label: "AI system",
          state: "Design direction",
          description:
            "Specialized learning tasks share context while keeping recommendations explainable to the learner.",
        },
        {
          label: "Data",
          state: "Design direction",
          description:
            "Goals, concepts, activities and feedback become connected records in a learner-specific graph.",
        },
        {
          label: "Reliability",
          state: "In development",
          description:
            "A recommendation must preserve source learning material and show why an activity moved in the plan.",
        },
        {
          label: "Security",
          state: "Design direction",
          description:
            "Learner context is isolated by account, with educational material and feedback kept inside that boundary.",
        },
        {
          label: "Trade-offs",
          state: "Live evidence",
          description:
            "The concept prioritizes continuity and a clear next action over a large collection of unrelated AI tools.",
        },
        {
          label: "Deployment",
          state: "In development",
          description:
            "The interaction prototype precedes a public product release; user and learning metrics remain unclaimed.",
        },
      ],
    },
  },
  orkestria: {
    overview: {
      title: "Autonomy needs a visible brake pedal.",
      description:
        "OrkestriaAI explores how useful automation can continue quickly while consequential actions stop at an explicit human boundary.",
    },
    journey: {
      label: "Approval trace",
      title: "An autonomous run reaches a risky action.",
      description:
        "The story follows an agent workflow as it prepares work, detects a consequential step and pauses for a person.",
      steps: [
        {
          label: "Direct",
          title: "A person defines the goal",
          description:
            "The request enters with boundaries around systems, permissions and acceptable actions.",
        },
        {
          label: "Plan",
          title: "Agents divide the work",
          description:
            "The workflow exposes its stages, assigned capabilities and expected outcomes.",
        },
        {
          label: "Prepare",
          title: "Reversible work continues",
          description:
            "Agents gather context and prepare changes without silently crossing an external boundary.",
        },
        {
          label: "Pause",
          title: "Risk changes the route",
          description:
            "A purchase, submission or infrastructure change moves into a dedicated approval state.",
        },
        {
          label: "Decide",
          title: "A person approves, revises or rejects",
          description:
            "The workflow records the decision and resumes only with the authority it was given.",
        },
      ],
    },
    modules: {
      title: "Capabilities with explicit control points.",
      description:
        "The orchestration model treats approval as part of the workflow rather than a warning added at the end.",
    },
    architecture: {
      title: "Where autonomy stops.",
      description:
        "The flow separates preparation from consequential execution and routes risky work through a human decision.",
      caption: "Human-supervised execution flow",
    },
    gallery: {
      title: "Supervision is part of the product.",
      description:
        "Real interface captures show how goals become workflows, how risk becomes visible and where agent activity meets an accountable decision.",
      frames: [
        {
          src: "/images/projects/orkestriaai/product-entry.webp",
          alt: "OrkestriaAI public landing page introducing coordinated intelligence and a multi-agent workspace.",
          label: "Product entry",
          title: "Autonomy begins with a bounded promise",
          description:
            "The entry experience frames orchestration around useful work while keeping control and accountability visible.",
          featured: true,
        },
        {
          src: "/images/projects/orkestriaai/dashboard.webp",
          alt: "OrkestriaAI dashboard with operating signals, system health and recent autonomous runs.",
          label: "Operating view",
          title: "The system reports before it acts",
          description:
            "Health, active work and recent runs are visible from the main workspace instead of hidden behind an assistant.",
        },
        {
          src: "/images/projects/orkestriaai/loom.webp",
          alt: "OrkestriaAI Loom visual workflow builder with connected stages, configuration and agent controls.",
          label: "Loom",
          title: "The workflow remains inspectable",
          description:
            "Stages, agents and configuration live on one canvas so the path from intent to action can be reviewed.",
        },
        {
          src: "/images/projects/orkestriaai/aegis.webp",
          alt: "OrkestriaAI Aegis security review workspace comparing code context with an agent review panel.",
          label: "Aegis",
          title: "Risk changes the route",
          description:
            "Security evidence and the reviewing agent share a dedicated surface before a consequential change proceeds.",
        },
        {
          src: "/images/projects/orkestriaai/ensemble.webp",
          alt: "OrkestriaAI Ensemble workspace with five specialist agents, a case room and an executive gate on hold.",
          label: "Ensemble",
          title: "Specialists converge on one decision",
          description:
            "Bounded agents contribute evidence while an explicit executive gate preserves human ownership.",
        },
        {
          src: "/images/projects/orkestriaai/verity.webp",
          alt: "OrkestriaAI Verity governance page showing model and prompt lineage with evidence status.",
          label: "Verity",
          title: "The decision keeps its lineage",
          description:
            "Model, prompt and evidence records make the path behind an autonomous recommendation easier to inspect.",
        },
      ],
    },
    concepts: {
      title: "Make authority visible.",
      description:
        "The interface direction shows which agent is acting, what is waiting and why approval is required.",
    },
    decisions: {
      title: "Decisions that define safe autonomy.",
    },
    status: {
      title: "The supervision model under test.",
    },
    evidence: {
      intro:
        "OrkestriaAI is an interaction prototype focused on supervision states. It demonstrates the control model without claiming autonomous production use.",
      contribution: [
        "Product concept and safety model",
        "Agent workflow architecture",
        "Approval-state interaction design",
        "Prototype implementation",
      ],
      items: [
        {
          label: "Architecture",
          state: "Design direction",
          description:
            "Goals become staged workflows whose specialized agents converge on a shared approval boundary.",
        },
        {
          label: "AI system",
          state: "In development",
          description:
            "Planning and execution are separated so model reasoning cannot directly authorize a consequential action.",
        },
        {
          label: "Data",
          state: "Design direction",
          description:
            "Each run records stages, proposed actions, risk class, approval state and final outcome.",
        },
        {
          label: "Reliability",
          state: "Design direction",
          description:
            "Paused workflows need resumable state, idempotent actions and explicit recovery after rejection or failure.",
        },
        {
          label: "Security",
          state: "Design direction",
          description:
            "Tools receive scoped permissions, while purchases, submissions and infrastructure changes require separate authority.",
        },
        {
          label: "Trade-offs",
          state: "Live evidence",
          description:
            "The prototype sacrifices uninterrupted autonomy in exchange for legibility, control and safer failure behavior.",
        },
        {
          label: "Deployment",
          state: "In development",
          description:
            "The approval-state simulator is the current proof surface; production operations are not claimed.",
        },
      ],
    },
  },
};

export function getProjectStorytelling(project: Project): ProjectStorytelling {
  return storytelling[project.sceneMode];
}
