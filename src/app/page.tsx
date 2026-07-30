import { SceneExperience } from "@/components/canvas/SceneExperience";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { AboutSection } from "@/components/sections/AboutSection";
import { BuildLogSection } from "@/components/sections/BuildLogSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import {
  getPersonStructuredData,
  serializeStructuredData,
} from "@/lib/seo/structuredData";

export default function HomePage() {
  const structuredData = getPersonStructuredData();

  return (
    <MotionProvider>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <SceneExperience />
      <main id="main-content">
        <HeroSection />
        <ManifestoSection />
        <ProjectsSection />
        <CapabilitiesSection />
        <ProcessSection />
        <BuildLogSection />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <script
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(structuredData),
        }}
        type="application/ld+json"
      />
    </MotionProvider>
  );
}
