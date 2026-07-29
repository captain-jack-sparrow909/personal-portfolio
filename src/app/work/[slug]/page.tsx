import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ProjectCaseStudy } from "@/components/project/ProjectCaseStudy";
import { getProjectBySlug, projects } from "@/content/projects";
import {
  getProjectStructuredData,
  serializeStructuredData,
} from "@/lib/seo/structuredData";

type ProjectRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: `${project.name} — Jabir Khan`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — Jabir Khan`,
      description: project.summary,
      type: "website",
      url: `/work/${project.slug}`,
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: "Jabir Khan — Intelligence in Motion",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Jabir Khan`,
      description: project.summary,
      images: ["/og.jpg"],
    },
  };
}

export default async function ProjectRoute({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const structuredData = getProjectStructuredData(project);

  return (
    <MotionProvider>
      <a className="skip-link" href="#project-content">
        Skip to project
      </a>
      <SiteHeader />
      <ProjectCaseStudy project={project} />
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
