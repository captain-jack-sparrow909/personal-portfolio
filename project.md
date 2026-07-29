You are acting as a principal creative developer, motion designer, WebGL engineer,
3D interaction designer, and senior Next.js architect.

Build a production-quality personal portfolio for:

Name: Jabir Khan
Professional positioning:
AI/ML Engineer + Full-Stack Web and Mobile Developer

Primary message:
“I design and engineer intelligent systems across AI, web, mobile, cloud,
and developer infrastructure.”

Location copy:
“Based in Dubai. Building globally.”

This must not be a generic developer portfolio.

It should feel like an award-level interactive digital exhibition with:

- Sophisticated visual direction
- Large editorial typography
- Complex but intentional animation
- Advanced layered parallax
- Scroll-synchronized WebGL
- A custom animated 3D centerpiece
- Seamless project transitions
- Strong storytelling
- Excellent responsive behavior
- Production-level performance
- Accessibility and reduced-motion support

Use https://cosmos.studio only as a mood and quality reference.

Do not reproduce its exact layout, assets, content, visual identity, fonts,
animations, or interaction sequences. Create a distinct identity for Jabir Khan.

==================================================
1. WORKING METHOD
==================================================

Do not try to generate the entire application in one uncontrolled pass.

Before implementing components:

1. Inspect the repository.
2. Create docs/creative-direction.md.
3. Create docs/technical-architecture.md.
4. Create docs/animation-map.md.
5. Create docs/performance-budget.md.
6. Create docs/implementation-plan.md.
7. Divide implementation into clearly defined phases.
8. Keep the project runnable after every phase.

Do not leave half-implemented experimental components in the codebase.

After every phase:

- Run TypeScript checks
- Run lint
- Run the production build
- Fix all console warnings
- Remove unused imports
- Verify mobile behavior
- Verify reduced-motion behavior

==================================================
2. CREATIVE DIRECTION
==================================================

Project concept:

“INTELLIGENCE IN MOTION”

The portfolio should present Jabir as an engineer who works across multiple
layers of modern technology:

- Artificial intelligence
- Machine learning
- Agentic systems
- Full-stack web applications
- Mobile applications
- Cloud architecture
- Developer infrastructure
- Product engineering

The design should combine:

- Scientific precision
- Experimental technology
- Editorial sophistication
- Cinematic depth
- Controlled futuristic aesthetics

Do not make the design look like:

- A SaaS landing-page template
- A Tailwind template
- A shadcn dashboard
- A gaming website
- A cyberpunk cliché
- A collection of glassmorphism cards
- A purple-gradient AI startup
- A portfolio with random floating spheres
- A portfolio where every object moves constantly
- A direct Cosmos Studio clone

Animation must support hierarchy and storytelling rather than exist only
for decoration.

==================================================
3. VISUAL IDENTITY
==================================================

Base palette:

--background-primary: #050506
--background-secondary: #0A0A0C
--surface: #101014
--text-primary: #F2F1EC
--text-secondary: #9B9B9F
--border-subtle: rgba(255, 255, 255, 0.12)

Primary luminous accents:

--phosphor: #B8FF63
--electric-cyan: #5DE4FF
--signal-violet: #8974FF
--warm-signal: #FF8A5C

Do not use every accent simultaneously.

The general website remains dark and restrained. Each project owns one
accent color.

Typography:

- Primary display and body: Manrope or a similarly clean geometric sans
- Editorial accent: Instrument Serif
- Technical labels: IBM Plex Mono

Use next/font.

Typography behavior:

- Large responsive display text using clamp()
- Tight display line-height
- Technical labels in uppercase mono
- Strong contrast between editorial serif phrases and technical sans text
- Occasional outlined or masked typography
- No excessive gradient text

Grid:

- 12-column desktop grid
- 8-column tablet grid
- 4-column mobile grid
- Wide editorial margins
- Deliberate asymmetry
- Text and objects should sometimes break the grid, but never accidentally

Texture:

- Very subtle animated grain overlay
- Soft radial lighting
- Fine technical grid lines
- Occasional scan-line or data-stream details
- No heavy noise that reduces readability

Radii:

- Mostly sharp or slightly softened geometry
- Small controls: 999px pills allowed
- Project surfaces: 8px–16px
- Avoid excessively rounded cards

==================================================
4. GLOBAL EXPERIENCE ARCHITECTURE
==================================================

The site should include:

1. Cinematic preloader
2. Persistent navigation
3. Hero / identity sequence
4. Engineering manifesto
5. Selected work
6. Capability constellation
7. Engineering process
8. About and experience
9. Contact finale
10. Individual project case-study routes

Primary routes:

/
  Main immersive portfolio

/work/dev-pulse-ai
/work/rontgenai
/work/cognoraai
/work/orkestriaai

Optional later routes:

/about
/lab

Do not hide essential content inside WebGL. The semantic DOM must contain
all important text, links, headings, project descriptions, and navigation.

==================================================
5. PRELOADER
==================================================

Create a short cinematic loader.

Sequence:

1. The letters “JK” appear as a thin technical wireframe.
2. A scanning line passes through them.
3. Loading percentage appears in monospaced text.
4. Fine particles converge toward the center.
5. The wireframe transforms into the first silhouette of the Cognitive Engine.
6. The hero is revealed through an expanding circular or irregular mask.

Duration:

- Approximately 1.4–2 seconds after required hero assets are ready
- Do not create a fake long loading animation
- Skip or shorten the loader during the same browser session

The loader must never block indefinitely when the 3D asset fails.

Provide an error-safe fallback.

==================================================
6. NAVIGATION
==================================================

Desktop navigation:

- Fixed near the top
- Jabir Khan / JK monogram on the left
- Work
- Expertise
- About
- Contact
- Availability indicator on the right

The navigation starts minimal and transparent.

After scrolling:

- It gains a subtle dark surface
- A thin border appears
- Its width contracts slightly
- The active section indicator animates

Add magnetic hover behavior, but keep the displacement subtle.

Mobile navigation:

- Compact monogram
- Menu trigger
- Full-screen editorial overlay
- Large section links
- Project links
- Social links
- Email link

The mobile menu should have a high-quality masked transition, not a
standard dropdown.

==================================================
7. HERO SECTION
==================================================

Hero copy:

Eyebrow:
“AI/ML ENGINEER · FULL-STACK WEB/MOBILE DEVELOPER”

Main headline:

“Engineering
intelligence
into motion.”

Alternative supporting line:

“I build AI-native systems, web platforms, mobile experiences, and
developer infrastructure that turn ambitious ideas into working products.”

Primary CTA:
“Explore the systems”

Secondary CTA:
“Start a conversation”

Additional technical ticker:

“AI SYSTEMS / AGENTIC WORKFLOWS / WEB / MOBILE / CLOUD / DEVTOOLS”

Hero visual:

- A fixed WebGL canvas sits behind the DOM
- The Cognitive Engine occupies the right and central portion
- It must feel sculptural, mechanical, intelligent, and alive
- It should not be a humanoid robot
- It should not be a generic chrome sphere
- It should not look like a downloaded stock asset

Hero entrance:

1. Eyebrow fades and slides in.
2. Headline lines reveal through masks.
3. The Cognitive Engine assembles from separate pieces.
4. Small luminous nodes activate.
5. The camera performs a subtle push-in.
6. Background grid lines become visible.
7. CTA controls appear.
8. The technical ticker begins moving slowly.

Pointer movement should influence:

- Camera position
- Light direction
- A subtle object rotation
- Particle drift

The movement must remain restrained.

==================================================
8. THE COGNITIVE ENGINE — 3D CENTERPIECE
==================================================

Create a reusable 3D object called CognitiveEngine.

Concept:

A mechanical-neural artifact built from:

- A translucent dark central core
- Three gyroscopic rings
- Fine neural filaments
- Floating data fragments
- Luminous connection nodes
- Layered internal mechanisms
- Small technical labels
- Controlled emissive surfaces

It represents the intersection of:

- Intelligence
- Product engineering
- Web systems
- Mobile systems
- Cloud infrastructure

Initial implementation:

Build a polished procedural version using Three.js geometry so that the
experience works without an external asset.

Final asset contract:

public/models/cognitive-engine.glb

Expected named animation clips:

- Idle
- Awaken
- Orbit
- Disassemble
- Reassemble
- Pulse
- Shutdown

Expected named groups:

- Core
- OuterRing
- MiddleRing
- InnerRing
- NeuralThreads
- Nodes
- DataFragments
- AccentLights

When the GLB exists, load it through useGLTF and useAnimations.

Do not tightly couple page logic to the placeholder geometry. Both the
procedural model and GLB model must implement the same conceptual API.

Suggested component API:

<CognitiveEngine
  mode="hero | identity | devpulse | rontgen | cognora | orkestria | contact"
  progress={number}
  pointer={normalizedPointer}
  reducedMotion={boolean}
/>

3D transformations by section:

Hero:
- Engine assembles
- Rings rotate at different speeds
- Core breathes gently

Identity:
- Engine opens into three layers:
  AI
  Product
  Infrastructure

Dev Pulse AI:
- The object stretches into a moving data waveform
- Content fragments move through a signal pipeline
- Accent color: warm signal

RontgenAI:
- The object becomes an architecture scanner
- A luminous scanning plane passes through transparent system layers
- Accent color: electric cyan

CognoraAI:
- Nodes branch into an evolving knowledge graph
- Connections activate in sequences
- Accent color: phosphor

OrkestriaAI:
- Rings expand into an orchestration system
- Multiple agents and workflows orbit a human-approval core
- Accent color: signal violet

Contact:
- All parts reassemble
- The engine gradually resolves into an abstract “JK” monogram
- The final glow follows the pointer

Use custom shaders carefully:

- Fresnel edge response
- Low-amplitude vertex noise
- Controlled emissive pulse
- Subtle chromatic split only at transitions
- Soft particles
- No permanent excessive bloom

==================================================
9. WEBGL ARCHITECTURE
==================================================

Use one persistent React Three Fiber Canvas for the main page.

Do not mount a separate Canvas for every section.

Recommended structure:

SceneCanvas
  SceneEnvironment
  CognitiveEngine
  ProjectVisualSystem
  ParticleField
  CameraRig
  LightingRig
  PostProcessing
  PerformanceController

The Canvas should:

- Be dynamically imported with SSR disabled
- Remain fixed behind the DOM
- Use alpha transparency
- Use a clamped device pixel ratio
- Pause expensive animation when the tab is hidden
- Degrade effects based on device capability
- handle WebGL context loss
- have a static fallback image

Use Zustand only for discrete global scene states:

- currentSection
- activeProject
- transitionState
- deviceTier
- reducedMotion
- canvasReady

Do not put frame-by-frame values in Zustand or React state.

Use refs and useFrame for continuously changing values.

Never call React setState on every animation frame.

==================================================
10. SCROLL AND ANIMATION ARCHITECTURE
==================================================

Use:

- GSAP for timelines
- ScrollTrigger for scroll-linked sequences
- Lenis for smooth scrolling
- CSS transitions for small hover and focus states
- React Three Fiber useFrame for continuous 3D movement

Do not add Framer Motion or another overlapping global animation library.

Create a single MotionProvider that:

- Initializes Lenis
- Connects Lenis updates to ScrollTrigger
- Refreshes triggers after fonts and assets load
- Pauses when the document is hidden
- Cleans up all timelines and listeners
- Disables smooth scrolling when reduced motion is enabled

Build animation logic in reusable modules.

Suggested files:

lib/motion/gsap.ts
lib/motion/lenis.ts
lib/motion/timelines.ts
hooks/useSectionTimeline.ts
hooks/useReducedMotion.ts
hooks/useDeviceTier.ts
hooks/usePointerPosition.ts

Animation principles:

- Prefer transform and opacity
- Avoid animating layout properties
- Use will-change temporarily
- Do not leave will-change on every element
- Use masks and clipping for major reveals
- Use stagger sparingly
- Maintain readable text while scrolling
- Do not make users wait for animations before accessing information

Parallax layers:

Layer 1:
Large background grid and light field
Moves very slowly

Layer 2:
3D object and large visual fragments
Moves at medium depth

Layer 3:
DOM typography and project content
Moves normally

Layer 4:
Technical labels and foreground particles
Moves slightly faster

Do not apply the same parallax speed to every object.

==================================================
11. MANIFESTO SECTION
==================================================

Purpose:

Introduce Jabir’s multidisciplinary identity.

Suggested copy:

“I work where intelligent systems meet product engineering.”

“From machine-learning workflows and autonomous agents to full-stack
platforms and mobile experiences, I build across the complete path from
idea to production.”

Create three large discipline statements:

01 — Intelligence
AI systems, machine learning, LLM applications, agents and automation.

02 — Product
Web platforms, mobile applications, frontend systems and user experience.

03 — Infrastructure
APIs, microservices, cloud systems, DevOps and scalable architecture.

Interaction:

- Each discipline activates a different layer of the Cognitive Engine
- Hovering or scrolling reveals technical keywords
- Keywords should orbit or move along subtle paths
- The section uses asymmetric editorial typography
- Avoid card-based presentation

==================================================
12. SELECTED WORK
==================================================

Create a cinematic Selected Work chapter.

The section begins with:

“Selected systems”
“Products designed to think, adapt, and operate.”

Use four large project chapters rather than four small cards.

Each project chapter should occupy at least one viewport.

The left or right side contains project copy.
The persistent 3D scene transforms on the opposite side.

Alternate the editorial alignment between projects.

Each project must link to a dedicated case-study route.

--------------------------------------------------
PROJECT 1 — DEV PULSE AI
--------------------------------------------------

Name:
Dev Pulse AI

Category:
AI Content Intelligence

Status:
Building

Description:
“A research-first AI content platform for software engineers, transforming
trusted AI and engineering sources into polished content for X and LinkedIn.”

Supporting description:
“It researches AI, machine learning, LLMs, agentic systems, full-stack
engineering, cloud platforms, open-source projects, technical papers and
developer news, then produces useful human-readable posts.”

Core features:

- Automated source discovery
- Research and source validation
- Trend detection
- Content planning
- X post generation
- LinkedIn post generation
- Daily content pipelines
- Human review before publishing

Visual motif:

- Animated signal ribbon
- Text fragments moving through a research pipeline
- Pulsating waveform
- Warm orange/coral accent
- Typographic fragments appearing like live content signals

Do not claim real usage metrics unless provided later.

--------------------------------------------------
PROJECT 2 — RONTGENAI
--------------------------------------------------

Name:
RontgenAI

Category:
AI Engineering Platform

Status:
Early stage / Building

Description:
“An AI engineering platform that helps teams understand, review and improve
software systems.”

Core capabilities:

- Architecture reviews
- Repository explanations
- Pull-request reviews
- Issue planning
- Incident analysis
- CI/CD optimization
- Data exploration
- Shared authentication, billing, usage and infrastructure services
- Independently evolving product workflows

Visual motif:

- Transparent architecture layers
- An X-ray scanning plane
- System diagrams appearing inside the 3D engine
- Electric-cyan accent
- Fine dependency lines
- Architectural nodes revealing internal relationships

Use rontgenai.dev as the product domain where appropriate.

--------------------------------------------------
PROJECT 3 — COGNORAAI
--------------------------------------------------

Name:
CognoraAI

Category:
AI Learning Workspace

Status:
Building

Description:
“A unified AI learning workspace that helps people plan, understand,
practice and improve.”

Core modules:

- Study Planner
- Lecture Companion
- Learning Roadmap Generator
- Assignment Feedback
- Knowledge Gap Detector

Narrative:
“Instead of separating learning into disconnected tools, CognoraAI creates
one continuous system that understands what the learner is studying, where
they struggle and what they should do next.”

Visual motif:

- A growing knowledge graph
- Branching pathways
- Concepts connecting and reorganizing
- Phosphor-green accent
- Nodes activating as knowledge becomes connected

Do not claim educational outcomes or user numbers without evidence.

--------------------------------------------------
PROJECT 4 — ORKESTRIAAI
--------------------------------------------------

Name:
OrkestriaAI

Category:
Human-Supervised AI Operations

Status:
Building

Description:
“An intelligent orchestration layer for browser actions, workflows,
developer operations, cloud efficiency and security.”

Core modules:

- Autonomous Browser Agent
- AI Workflow Builder
- AI DevOps Assistant
- AI Cloud Cost Optimizer
- AI Security Review Assistant

Core product principle:

“Powerful autonomous execution with human approval before purchases,
submissions, infrastructure changes or other risky actions.”

Visual motif:

- Multiple orbiting agent nodes
- Workflows moving through an orchestration ring
- A central human-approval core
- Violet accent
- Branches pause at approval gates before continuing
- Cloud, browser, code and security signals converge

==================================================
13. PROJECT INTERACTION DESIGN
==================================================

For each project chapter:

1. Project number appears.
2. Category label reveals.
3. Project title enters with a masked typography animation.
4. One-line description appears.
5. 3D scene transforms into the project motif.
6. Technical details appear as floating labels.
7. A “View case study” control becomes active.
8. Scroll progress is represented by a thin line or arc.

Project hover interaction:

- Project title slightly tracks the pointer
- CTA arrow rotates or extends
- Accent light intensifies
- The 3D object reacts subtly

Do not tilt entire content cards aggressively.

Page transition into a project:

- Capture the project accent and visual state
- Expand a dark overlay from the selected CTA
- Move the active 3D visual toward the camera
- Transition into the case-study hero
- Provide a simple opacity fallback for unsupported or reduced-motion modes

==================================================
14. CASE-STUDY ARCHITECTURE
==================================================

Each case-study page should contain:

1. Hero
2. Project overview
3. Problem
4. Product concept
5. Core modules
6. Technical architecture
7. Selected interface explorations
8. Challenges and decisions
9. Current status
10. Next project navigation

Use a shared typed project data model.

Suggested fields:

- slug
- name
- shortName
- category
- status
- year
- accent
- summary
- longDescription
- capabilities
- technologies
- visualMotif
- repositoryUrl
- liveUrl
- featured
- order

Do not create fake dashboards and call them final product screenshots.

When real screenshots do not exist:

- Use intentional architectural diagrams
- Use interface concept frames clearly labeled as concepts
- Use abstract project visuals
- Use honest “currently building” language

Never invent:

- Customer logos
- Revenue
- User counts
- Performance improvements
- Testimonials
- Awards
- Production adoption

==================================================
15. CAPABILITY CONSTELLATION
==================================================

Create an interactive capability section.

Title:
“Across the stack”

Present capabilities as a spatial constellation rather than a badge cloud.

Primary groups:

Artificial Intelligence:
- Machine learning
- LLM applications
- Agentic AI
- LangChain
- LangGraph
- PyTorch
- Local models
- Retrieval systems

Web Engineering:
- React
- Next.js
- TypeScript
- JavaScript
- Node.js
- NestJS
- Three.js
- WebGL

Mobile:
- React Native
- Expo
- Mobile architecture
- Cross-platform product development

Backend and Data:
- Microservices
- FastAPI
- PostgreSQL
- MongoDB
- Redis
- Kafka
- REST APIs

Cloud and Infrastructure:
- AWS
- Docker
- Kubernetes
- CI/CD
- Nginx
- Observability
- Deployment architecture

Interaction:

- Selecting a group changes the central constellation
- Related capabilities connect
- The Cognitive Engine rotates to expose the corresponding layer
- Text remains accessible as normal DOM content

On mobile, replace the complex constellation with an elegant vertical
accordion and a lightweight 3D response.

==================================================
16. ENGINEERING PROCESS
==================================================

Create a section called:

“From possibility to production”

Stages:

01 — Discover
Understand the problem, system boundaries and user needs.

02 — Architect
Design the product, data flow, interfaces and technical system.

03 — Build
Develop the web, mobile, AI and infrastructure layers.

04 — Validate
Test behavior, usability, reliability and performance.

05 — Evolve
Measure, learn and improve the system.

Use a horizontal process line on desktop that transforms into a vertical
timeline on mobile.

Animate a single signal moving through the stages.

==================================================
17. ABOUT SECTION
==================================================

Suggested heading:

“Engineer across boundaries.”

Suggested copy:

“I’m Jabir Khan, an AI/ML engineer and full-stack web and mobile developer
based in Dubai. I work across intelligent systems, frontend engineering,
mobile products, APIs, cloud infrastructure and developer tooling.”

“I’m most interested in products where advanced engineering becomes a
clear, useful and thoughtfully designed experience.”

Possible supporting details:

- Senior software engineering experience
- Frontend leadership
- Full-stack product development
- AI and machine-learning systems
- Web and mobile architecture
- Cloud and DevOps experience

Do not turn this into a long résumé wall.

Add a downloadable résumé control only when an actual résumé file exists.

==================================================
18. CONTACT FINALE
==================================================

The final section should feel like a conclusion to the visual story.

Heading:

“Let’s build what does not exist yet.”

Supporting copy:

“Available for ambitious AI, web, mobile and product-engineering
collaborations.”

Actions:

- Email
- LinkedIn
- GitHub
- X

The Cognitive Engine reassembles into an abstract JK monogram.

The background becomes slightly brighter.
The cursor creates a subtle field distortion.
The email control should be large and memorable.

Do not autoplay audio.

An optional sound layer may be added later, but it must:

- Be user initiated
- Start muted
- Include an obvious sound toggle
- Never block the experience

==================================================
19. TECHNICAL STACK
==================================================

Use compatible current stable versions of:

Core:

- Next.js App Router
- React
- TypeScript
- pnpm

Styling:

- Tailwind CSS for layout primitives and design tokens
- CSS Modules for complex component-specific styling
- CSS custom properties for the theme
- clsx
- tailwind-merge

Do not use shadcn as the visual design foundation.

Motion:

- GSAP
- ScrollTrigger
- Lenis

3D:

- three
- @react-three/fiber
- @react-three/drei
- @react-three/postprocessing

State:

- Zustand only for small cross-component scene state

Validation and forms:

- Zod
- A lightweight accessible form implementation

Testing:

- Vitest for utility logic where needed
- Playwright for critical interaction smoke tests

Code quality:

- ESLint
- Prettier
- Strict TypeScript
- No any types unless technically unavoidable and documented

==================================================
20. NEXT.JS RENDERING STRATEGY
==================================================

Use Server Components by default.

Client Components should be limited to:

- MotionProvider
- SceneCanvas
- Animated navigation
- Interactive project sections
- Pointer interactions
- Contact form
- Mobile menu

Render all important content on the server.

The page must remain understandable when:

- JavaScript is delayed
- WebGL fails
- The device is low powered
- Reduced motion is active

Dynamically load the WebGL experience.

Show the DOM hero immediately.

Use Suspense around heavy client experiences.

Do not make the page blank while Three.js downloads.

==================================================
21. RECOMMENDED FILE STRUCTURE
==================================================

Use a structure similar to:

src/
  app/
    layout.tsx
    page.tsx
    globals.css
    not-found.tsx
    error.tsx
    sitemap.ts
    robots.ts

    work/
      [slug]/
        page.tsx
        loading.tsx
        not-found.tsx

    api/
      contact/
        route.ts

  components/
    canvas/
      SceneCanvas.tsx
      CognitiveEngine.tsx
      ProceduralCognitiveEngine.tsx
      ModelCognitiveEngine.tsx
      CameraRig.tsx
      LightingRig.tsx
      ParticleField.tsx
      ProjectVisualSystem.tsx
      PerformanceController.tsx
      WebGLFallback.tsx

    layout/
      SiteHeader.tsx
      MobileMenu.tsx
      SiteFooter.tsx
      PageTransition.tsx

    motion/
      MotionProvider.tsx
      RevealText.tsx
      MaskReveal.tsx
      MagneticLink.tsx
      ParallaxLayer.tsx
      SplitText.tsx

    sections/
      HeroSection.tsx
      ManifestoSection.tsx
      ProjectsSection.tsx
      ProjectChapter.tsx
      CapabilitiesSection.tsx
      ProcessSection.tsx
      AboutSection.tsx
      ContactSection.tsx

    project/
      ProjectHero.tsx
      ProjectOverview.tsx
      ProjectArchitecture.tsx
      ProjectModules.tsx
      ProjectNavigation.tsx

    ui/
      Button.tsx
      SectionLabel.tsx
      TechnicalTag.tsx
      ProgressIndicator.tsx
      SocialLink.tsx

  content/
    projects.ts
    capabilities.ts
    navigation.ts
    social.ts

  hooks/
    useDeviceTier.ts
    useReducedMotion.ts
    usePointerPosition.ts
    useSectionProgress.ts
    useWebGLSupport.ts
    usePageVisibility.ts

  lib/
    motion/
      gsap.ts
      lenis.ts
      timelines.ts

    three/
      materials.ts
      quality.ts
      model.ts

    seo/
      metadata.ts
      structuredData.ts

    validation/
      contact.ts

  store/
    scene-store.ts

  styles/
    tokens.css
    typography.css
    utilities.css

public/
  models/
    cognitive-engine.glb
    README.md

  textures/
    noise.webp
    environment.hdr
    particles.webp

  images/
    projects/
    fallbacks/
    og/

docs/
  creative-direction.md
  technical-architecture.md
  animation-map.md
  performance-budget.md
  implementation-plan.md

==================================================
22. PERFORMANCE ARCHITECTURE
==================================================

Performance is a design requirement.

Use one primary Canvas.

3D requirements:

- Compress final GLB geometry using Draco or Meshopt
- Use KTX2 or appropriately compressed textures
- Keep the final hero GLB preferably below approximately 3 MB
- Avoid 4K textures
- Prefer 1K textures and procedural materials
- Reuse geometry and materials
- Dispose resources correctly
- Avoid unnecessary real-time shadows
- Bake details where appropriate
- Use instancing for repeated particles or nodes

Renderer:

- Clamp DPR to approximately 1–1.5
- Disable expensive postprocessing on lower device tiers
- Reduce particles on tablet and mobile
- Pause when page is hidden
- Avoid multiple render loops
- Avoid React state updates per frame

Suggested quality tiers:

HIGH:
- Full model
- Controlled bloom
- Ambient occlusion
- More particles
- Higher DPR

MEDIUM:
- Reduced DPR
- Reduced particles
- Simpler shadows
- Minimal postprocessing

LOW:
- Simplified model
- No ambient occlusion
- No depth of field
- Minimal particles
- Static or demand-based rendering

FALLBACK:
- Optimized static image or video frame
- Full DOM content remains available

Lazy-load:

- Case-study galleries
- Secondary project visuals
- Noncritical shaders
- Contact extras
- Large media

Targets:

- No severe layout shifts
- Fast visible DOM hero
- Smooth desktop motion
- Usable mobile performance
- No long main-thread freezes
- No permanent 100% GPU use after the tab becomes inactive

==================================================
23. RESPONSIVE BEHAVIOR
==================================================

Desktop:

- Full 3D experience
- Layered parallax
- Pinned project sequences
- Detailed pointer interactions
- Cinematic transitions

Tablet:

- Reduced parallax ranges
- Shorter pinned sequences
- Lower particle density
- Simplified postprocessing

Mobile:

- No long scroll-jacking
- Avoid fragile horizontal scroll sections
- Reduce or remove section pinning
- Simpler 3D transformations
- Lower model detail
- No hover-dependent content
- Touch-friendly controls
- Large readable typography
- Static fallback for low-capability devices

Do not simply shrink the desktop layout.

Design mobile as a deliberate version of the experience.

==================================================
24. ACCESSIBILITY
==================================================

Required:

- Semantic section headings
- Visible keyboard focus
- Keyboard-accessible navigation
- Accessible project links
- Sufficient contrast
- Descriptive labels
- Logical DOM order
- Skip-to-content link
- Focus trapping in mobile menu
- Restore focus after closing dialogs or menus
- Respect prefers-reduced-motion
- No essential information communicated only through color or movement

Reduced-motion mode:

- Disable Lenis
- Remove scroll scrubbing
- Replace large transitions with short fades
- Keep the 3D model static or nearly static
- Remove pointer parallax
- Preserve the complete content hierarchy

==================================================
25. SEO AND METADATA
==================================================

Create:

- Site metadata
- Dynamic project metadata
- Canonical URLs
- Open Graph metadata
- Twitter/X card metadata
- sitemap.xml
- robots.txt
- Person structured data
- CreativeWork or SoftwareApplication structured data for projects where valid

Suggested title:

“Jabir Khan — AI/ML Engineer and Full-Stack Developer”

Suggested description:

“Portfolio of Jabir Khan, an AI/ML engineer and full-stack web and mobile
developer building intelligent products, developer tools and scalable
digital systems.”

Do not keyword-stuff.

==================================================
26. CONTACT FORM
==================================================

Create a secure contact endpoint using a Next.js route handler.

Fields:

- Name
- Email
- Company, optional
- Project type
- Message

Requirements:

- Zod validation
- Honeypot protection
- Basic rate limiting abstraction
- Server-side email sending
- Environment variables for SMTP or email provider credentials
- No secrets in client code
- Clear success and failure states
- Accessible error messages

When email credentials are missing in development:

- Log a safe development message
- Do not crash the application
- Explain configuration in .env.example

==================================================
27. TESTING
==================================================

Create Playwright smoke tests for:

- Home page loads
- Navigation works
- Project links work
- Case-study routes render
- Mobile menu opens and closes
- Keyboard navigation works
- Contact validation works
- Reduced-motion mode does not create broken layouts
- WebGL fallback renders when WebGL is unavailable

Also verify:

- No hydration warnings
- No duplicate IDs
- No uncaught animation errors
- No stale ScrollTriggers after route transitions
- No horizontal overflow
- No console errors

==================================================
28. IMPLEMENTATION PHASES
==================================================

PHASE 1 — Foundation

- Initialize Next.js architecture
- Configure TypeScript
- Configure styling and fonts
- Add design tokens
- Add project content model
- Build semantic static sections
- Add responsive grid
- Add metadata

The site must already look polished without animation.

PHASE 2 — Motion foundation

- Add MotionProvider
- Integrate Lenis and GSAP
- Implement text reveals
- Implement navigation transitions
- Implement layered parallax
- Add reduced-motion handling

PHASE 3 — Procedural WebGL scene

- Add persistent Canvas
- Build procedural Cognitive Engine
- Add camera and lighting
- Add performance tiers
- Add WebGL fallback
- Connect section state to the scene

PHASE 4 — Project storytelling

- Implement full-screen project chapters
- Add project-specific scene modes
- Add scroll-synchronized transformations
- Add project progress indicators
- Add case-study transitions

PHASE 5 — Case studies

- Build dynamic project routes
- Build reusable case-study components
- Add project metadata
- Add next-project navigation
- Add architecture and feature visualizations

PHASE 6 — Final 3D asset support

- Add GLB loading
- Map named animation clips
- Maintain procedural fallback
- Add shader refinement
- Optimize model and textures

PHASE 7 — Contact and production features

- Add contact form
- Add validation
- Add email endpoint
- Add social links
- Add structured data
- Add analytics placeholders only when configured

PHASE 8 — Optimization and QA

- Run production build
- Analyze bundle
- Reduce client JavaScript
- Compress assets
- Test desktop, tablet and mobile
- Test Safari, Chromium and Firefox
- Test reduced motion
- Run Playwright tests
- Fix layout shifts
- Fix memory leaks
- Fix animation cleanup

==================================================
29. QUALITY GATES
==================================================

The project is not complete unless:

- It does not resemble a downloaded template
- It has a coherent visual identity
- The static layout is strong without animation
- Motion supports the narrative
- The 3D object changes meaningfully across sections
- Projects have distinct visual motifs
- Mobile feels intentionally designed
- Reduced-motion mode works
- The site remains readable when WebGL fails
- The project builds without TypeScript errors
- There are no hydration warnings
- There are no major console errors
- ScrollTrigger instances are cleaned up
- No fake business metrics are present
- No Lorem Ipsum remains
- No copied Cosmos assets or layouts are present
- There is no generic purple-gradient hero
- There are no random glass cards
- There are no unnecessary animation libraries
- There is no separate Canvas for every project

==================================================
30. FIRST ACTION
==================================================

Begin by producing:

1. A repository assessment
2. docs/creative-direction.md
3. docs/technical-architecture.md
4. docs/animation-map.md
5. docs/performance-budget.md
6. docs/implementation-plan.md
7. The proposed dependency list
8. The exact Phase 1 file plan

Do not implement Phase 2 or the WebGL scene until the semantic static
portfolio and visual design foundation are complete.

After documenting the plan, implement Phase 1 and report:

- Files created
- Files modified
- Design decisions
- Remaining placeholders
- Commands used for validation
- Build and lint results
