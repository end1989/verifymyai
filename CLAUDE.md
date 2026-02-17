# VerifyMyAI

Free, open-source tool to detect AI assistant tampering. Guides users through structured audits of their AI's hidden configurations.

**Live site:** verifymyai.org | **Repo:** github.com/end1989/verifymyai

## Stack

React 19 + Vite 7 + Tailwind CSS 4. No backend, no database, no API keys. Static SPA deployed to Cloudflare Pages. Report generation uses jsPDF + JSZip (client-side only).

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Dev server at localhost:5173
npx vitest run           # Run all tests (44 tests)
npx vitest run tests/pages/AuditFlow.test.jsx  # Single test file
npm run build            # Production build to dist/
npm run lint             # ESLint
```

## Architecture

Wizard-based SPA with steps: landing → platform → audit → results → evidence → actions

- `src/App.jsx` — Root. Wizard navigation + audit state orchestration
- `src/hooks/useWizard.js` — Step navigation (next/back/goTo/reset)
- `src/hooks/useAuditState.js` — Findings, records, severity, platform selection
- `src/pages/` — One page component per wizard step
- `src/data/` — Prompts, platforms, red flags, resources, cleanup instructions (data-driven, not hardcoded in components)
- `src/components/` — Shared UI (CopyButton, PromptStep, FindingCard, etc.)
- `src/utils/generateReport.js` — Async ZIP generation (PDF + Screenshots folder) using jsPDF + JSZip

## Safety-Critical Behavior

This tool is built for people who may be in danger. Do NOT break these:

- **Tab title must stay "Safety Resource"** — see `index.html`
- **Emergency Exit (QuickExit.jsx)** — Shield button clears sessionStorage, pushes innocuous Google searches into history, replaces current URL. Esc key triggers it.
- **Zero tracking** — No analytics, no cookies, no external requests. Everything runs in-browser.
- **Crisis resources always visible** — CrisisResources.jsx is rendered on every page
- **ResourcesPage** — 70+ organizations across 11 categories (src/data/comprehensiveResources.js)

## Key Patterns

- **Data-driven prompts**: Audit prompts are in `src/data/prompts.js`, keyed by tier (quick/full/deep) and platform. Components render from data, don't contain prompt text.
- **Screenshot handling**: DocumentationPrompt accepts file uploads, reads as dataURLs, passes array to generateReport which embeds them in the PDF and bundles originals in ZIP.
- **Severity levels**: green/yellow/red — determined by findings. Red elevates crisis resources styling.
- **ESLint rule**: `no-unused-vars` ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).

## Testing

Vitest + React Testing Library + jsdom. Setup in `tests/setup.js`. Test files mirror src structure in `tests/`. Currently 44 tests.

Note: `npm test` is NOT configured in package.json. Use `npx vitest run`.

## Deployment

Cloudflare Pages. Push to `master` branch triggers auto-deploy. Build command: `npm run build`, output dir: `dist/`.

## Gotchas

- No `npm test` script — use `npx vitest run`
- jsPDF/JSZip are runtime dependencies (not dev) because report generation happens in-browser
- QuickExit pushes 10 history entries — this is intentional (back button protection)
- React 19 (not 18) — uses the new JSX transform
- Tailwind CSS 4 via Vite plugin (`@tailwindcss/vite`), not PostCSS
