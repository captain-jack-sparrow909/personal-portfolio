"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./CopyEmailButton.module.css";

export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const resetTimerRef = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(resetTimerRef.current);
    },
    [],
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = window.setTimeout(() => setState("idle"), 2200);
    } catch {
      setState("error");
    }
  };

  return (
    <button
      aria-label={`Copy ${email}`}
      className={styles.button}
      data-state={state}
      onClick={copyEmail}
      type="button"
    >
      <span>
        {state === "copied"
          ? "Copied"
          : state === "error"
            ? "Use email link"
            : "Copy email"}
      </span>
      <i aria-hidden="true">{state === "copied" ? "✓" : "⧉"}</i>
    </button>
  );
}
