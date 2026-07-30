"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import styles from "./LabWorkbench.module.css";

type ApprovalState =
  "idle" | "preparing" | "approval" | "approved" | "rejected";

const repositoryNodes = [
  { name: "web-client", kind: "UI", risk: "clear" },
  { name: "api-gateway", kind: "EDGE", risk: "clear" },
  { name: "identity", kind: "SERVICE", risk: "review" },
  { name: "billing", kind: "SERVICE", risk: "critical" },
  { name: "events", kind: "QUEUE", risk: "review" },
  { name: "postgres", kind: "DATA", risk: "clear" },
] as const;

const retrievalResults = [
  {
    score: "0.94",
    source: "incident-4821.md",
    excerpt: "Payment latency began immediately after the cache policy change.",
  },
  {
    score: "0.87",
    source: "redis-runbook.md",
    excerpt: "Checkout sessions require an eviction policy that preserves TTL.",
  },
  {
    score: "0.73",
    source: "deploy-214.log",
    excerpt:
      "Configuration rollout completed two minutes before the first alert.",
  },
] as const;

export function LabWorkbench() {
  const [repositoryScanned, setRepositoryScanned] = useState(false);
  const [approvalState, setApprovalState] = useState<ApprovalState>("idle");
  const [retrievalVisible, setRetrievalVisible] = useState(false);
  const approvalTimerRef = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(approvalTimerRef.current);
    },
    [],
  );

  const startApprovalRun = () => {
    window.clearTimeout(approvalTimerRef.current);
    setApprovalState("preparing");
    approvalTimerRef.current = window.setTimeout(
      () => setApprovalState("approval"),
      650,
    );
  };

  return (
    <div className={styles.workbench}>
      <section
        aria-labelledby="repository-lab-title"
        className={styles.experiment}
      >
        <ExperimentHeader
          index="01"
          label="Repository intelligence"
          title="Architecture visualizer"
          titleId="repository-lab-title"
        />
        <div className={styles.repositoryLab}>
          <div className={styles.controlPanel}>
            <span>SAMPLE / COMMERCE-API</span>
            <p>
              Reveal a deterministic service map and inspect where the sample
              architecture asks for review.
            </p>
            <button
              aria-pressed={repositoryScanned}
              onClick={() => setRepositoryScanned((current) => !current)}
              type="button"
            >
              {repositoryScanned ? "Reset sample" : "Run sample scan"}
            </button>
          </div>
          <div
            aria-live="polite"
            className={styles.repositoryMap}
            data-active={repositoryScanned}
          >
            <div className={styles.mapHeader}>
              <span>DEPENDENCY MAP / 06 NODES</span>
              <span>
                {repositoryScanned ? "SCAN COMPLETE" : "AWAITING SCAN"}
              </span>
            </div>
            <div className={styles.nodeGrid}>
              {repositoryNodes.map((node, index) => (
                <article
                  data-risk={node.risk}
                  key={node.name}
                  style={{ "--node-delay": `${index * 70}ms` } as CSSProperties}
                >
                  <span>0{index + 1}</span>
                  <small>{node.kind}</small>
                  <strong>{node.name}</strong>
                  <i>{node.risk}</i>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="approval-lab-title"
        className={styles.experiment}
      >
        <ExperimentHeader
          index="02"
          label="Agent authority"
          title="Approval-state simulator"
          titleId="approval-lab-title"
        />
        <div className={styles.approvalLab} data-state={approvalState}>
          <div className={styles.approvalFlow}>
            <span data-step="goal">Goal received</span>
            <i />
            <span data-step="prepare">Change prepared</span>
            <i />
            <span data-step="approve">Human approval</span>
            <i />
            <span data-step="execute">Execute</span>
          </div>
          <div aria-live="polite" className={styles.approvalCard}>
            <span>PROPOSED ACTION / INFRASTRUCTURE</span>
            <h3>
              {approvalState === "idle" && "Scale a production service"}
              {approvalState === "preparing" && "Preparing change context…"}
              {approvalState === "approval" && "Approval required"}
              {approvalState === "approved" && "Approved for execution"}
              {approvalState === "rejected" && "Rejected without execution"}
            </h3>
            <p>
              Increase the sample payment service from three to six replicas.
              This simulation never performs an external action.
            </p>
            <div>
              {approvalState === "idle" ? (
                <button onClick={startApprovalRun} type="button">
                  Start simulated run
                </button>
              ) : null}
              {approvalState === "approval" ? (
                <>
                  <button
                    onClick={() => setApprovalState("approved")}
                    type="button"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setApprovalState("rejected")}
                    type="button"
                  >
                    Reject
                  </button>
                </>
              ) : null}
              {approvalState === "approved" || approvalState === "rejected" ? (
                <button onClick={() => setApprovalState("idle")} type="button">
                  Reset simulation
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="retrieval-lab-title"
        className={styles.experiment}
      >
        <ExperimentHeader
          index="03"
          label="Retrieval inspection"
          title="RAG evidence viewer"
          titleId="retrieval-lab-title"
        />
        <div className={styles.retrievalLab}>
          <div className={styles.queryPanel}>
            <span>QUERY / SAMPLE INCIDENT</span>
            <blockquote>
              “What changed before checkout latency increased?”
            </blockquote>
            <button
              aria-pressed={retrievalVisible}
              onClick={() => setRetrievalVisible((current) => !current)}
              type="button"
            >
              {retrievalVisible ? "Hide evidence" : "Inspect retrieval"}
            </button>
          </div>
          <ol
            aria-live="polite"
            className={styles.retrievalResults}
            data-visible={retrievalVisible}
          >
            {retrievalResults.map((result, index) => (
              <li key={result.source}>
                <div>
                  <span>0{index + 1}</span>
                  <small>SCORE {result.score}</small>
                </div>
                <h3>{result.source}</h3>
                <p>{result.excerpt}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

function ExperimentHeader({
  index,
  label,
  title,
  titleId,
}: {
  index: string;
  label: string;
  title: string;
  titleId: string;
}) {
  return (
    <header className={styles.experimentHeader}>
      <div>
        <span>{index}</span>
        <small>{label}</small>
      </div>
      <h2 id={titleId}>{title}</h2>
    </header>
  );
}
