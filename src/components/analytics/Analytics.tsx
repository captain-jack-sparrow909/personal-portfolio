import Script from "next/script";

export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();

  if (!domain) return null;

  const source =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SRC?.trim() ??
    "https://plausible.io/js/script.js";

  return (
    <Script data-domain={domain} src={source} strategy="afterInteractive" />
  );
}
