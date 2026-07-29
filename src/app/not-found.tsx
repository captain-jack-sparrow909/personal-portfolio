import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        display: "grid",
        minHeight: "100svh",
        placeItems: "center",
        padding: "2rem",
      }}
    >
      <div>
        <p className="eyebrow">404 / ROUTE NOT FOUND</p>
        <h1
          style={{
            marginBlock: "1rem 2rem",
            fontSize: "clamp(4rem, 15vw, 12rem)",
            lineHeight: 0.8,
          }}
        >
          Signal lost.
        </h1>
        <Link className="arrow-link" href="/">
          Return to the system
          <span aria-hidden="true" className="arrow-link__icon">
            ↗
          </span>
        </Link>
      </div>
    </main>
  );
}
