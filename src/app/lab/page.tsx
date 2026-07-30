import type { Metadata } from "next";

import { LabWorkbench } from "@/components/lab/LabWorkbench";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { getSiteUrl } from "@/content/site";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Systems Lab — Jabir Khan",
  description:
    "Interactive engineering experiments for repository intelligence, human-supervised agents and retrieval inspection.",
  alternates: {
    canonical: new URL("/lab", getSiteUrl()),
  },
};

export default function LabPage() {
  return (
    <MotionProvider>
      <a className="skip-link" href="#lab-content">
        Skip to experiments
      </a>
      <SiteHeader />
      <main className={styles.page} id="lab-content">
        <header className={styles.hero}>
          <div className={styles.meta}>
            <span>JK / SYSTEMS LAB</span>
            <span>DETERMINISTIC EXPERIMENTS / 03</span>
          </div>
          <p className="eyebrow">SMALL TOOLS · REAL INTERACTIONS</p>
          <h1>
            Ideas you can
            <span>touch.</span>
          </h1>
          <p className={styles.intro}>
            Compact experiments that expose how I think about software
            structure, agent authority and AI retrieval. They run entirely in
            the browser and make no claim to be production analyzers.
          </p>
        </header>
        <LabWorkbench />
      </main>
      <SiteFooter />
    </MotionProvider>
  );
}
