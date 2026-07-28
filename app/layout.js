import "./globals.css";

export const metadata = {
  title: {
    default: "Jabir Khan — Creative Developer",
    template: "%s — Jabir Khan",
  },
  description:
    "Jabir Khan is a creative developer and AI product engineer building expressive, intelligent digital products.",
  applicationName: "Jabir Khan Portfolio",
  authors: [{ name: "Jabir Khan" }],
  creator: "Jabir Khan",
  openGraph: {
    title: "Jabir Khan — Creative Developer",
    description:
      "Creative developer and AI product engineer building expressive, intelligent digital products.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030303",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
