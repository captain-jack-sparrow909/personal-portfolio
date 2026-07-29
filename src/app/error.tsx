"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main
          style={{
            display: "grid",
            minHeight: "100svh",
            placeItems: "center",
            padding: "2rem",
          }}
        >
          <div>
            <p className="eyebrow">SYSTEM INTERRUPTION</p>
            <h1 style={{ marginBlock: "1rem 2rem", fontSize: "3rem" }}>
              The interface encountered an error.
            </h1>
            <button className="arrow-link" onClick={reset} type="button">
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
