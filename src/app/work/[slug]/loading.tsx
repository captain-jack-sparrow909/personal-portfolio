export default function ProjectLoading() {
  return (
    <main
      aria-label="Loading project case study"
      aria-live="polite"
      style={{
        display: "grid",
        minHeight: "100svh",
        placeItems: "center",
        padding: "2rem",
      }}
    >
      <div style={{ width: "min(100%, 42rem)" }}>
        <p className="eyebrow">JK / Loading system</p>
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            marginTop: "1.5rem",
            background:
              "linear-gradient(90deg, var(--color-cyan), transparent)",
          }}
        />
      </div>
    </main>
  );
}
