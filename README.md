# Jabir Khan — Portfolio

An original, space-inspired Next.js portfolio with scroll reveals, orbital graphics,
procedural project artwork, responsive navigation, and reduced-motion support.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Create and run a production build with:

```bash
npm run build
npm start
```

## Update your information

All portfolio copy, projects, contact information, tools, and social links live in:

`src/data.js`

Replace the placeholder email, project links, project descriptions, and social URLs
there. The layout updates automatically from that data.

## Visual system

- `app/layout.js` controls metadata and the server-rendered document shell.
- `app/globals.css` controls the complete design and responsive behavior.
- `src/components/PortfolioPage.jsx` contains the interactive components and animation logic.
- Project art is generated with CSS, so no third-party imagery is required.
