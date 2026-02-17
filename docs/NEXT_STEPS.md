# VerifyMyAI — Roadmap & Next Steps

> Last updated: 2026-02-17

This document maps out everything between where we are now and where this project needs to be — organized by priority, grouped into phases, and written so anyone picking up a task knows exactly what to do and why it matters.

---

## Where We Are

**Core app: complete and functional.**

- 7-page wizard audit flow (landing → platform → audit → results → evidence → actions)
- 12 targeted prompts across 3 tiers (Quick Check / Full Audit / Deep Dig)
- 6 platform targets (ChatGPT, Claude, Gemini, Copilot, Voice Assistants, Other)
- Evidence pipeline: screenshot upload, PDF generation, ZIP packaging with embedded images
- Emergency Exit: shield button, Esc key, history scrubbing, sessionStorage wipe
- 72+ crisis organizations across 11 categories
- 44 tests passing
- Deployed to Cloudflare Pages (verifymyai.org)
- GitHub repo live (github.com/end1989/verifymyai)

**What's missing falls into two buckets: things that make it findable, and things that make it trustworthy at scale.**

---

## Phase 1: Launch Integrity

**Priority: Do these before promoting the site anywhere.**

These are the gaps between "it works" and "it's ready for people to find it, share it, and trust it."

### 1.1 — Meta tags & social sharing

The site has zero discoverability metadata. If someone shares verifymyai.org on Twitter, Facebook, Signal, or iMessage — it shows a blank card. For a project that depends on people sharing one link, this is a blocker.

- [x] Add `<meta name="description">` — something careful and neutral (remember: the tab already says "Safety Resource" for privacy)
- [x] Add Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [x] Add Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [x] Create a social preview image (1200x630) — should be informational, not alarming. Something someone wouldn't be afraid to have pop up on their screen
- [x] Add `<meta name="theme-color">` for mobile browser chrome
- [x] Add canonical URL link

**Tension to navigate:** The meta description and OG tags will be visible in link previews. They need to communicate what this is without making someone in danger feel exposed for clicking the link. Consider something neutral like "Free tool to check your AI assistant's settings" rather than anything about abuse or manipulation.

### 1.2 — Favicon & branding

Still using the default Vite logo. Anyone who's used Vite will clock it instantly — it undermines trust.

- [x] Design a simple favicon (shield motif matches the Emergency Exit button)
- [x] Create favicon.ico (16x16, 32x32)
- [x] Create favicon.svg for modern browsers
- [x] Create apple-touch-icon.png (180x180)
- [x] Create PWA icons (192x192, 512x512) — needed for Phase 2 anyway
- [x] Update `index.html` to reference new icons
- [x] Remove vite.svg from public/

### 1.3 — Project health files

The README says MIT license. There's no LICENSE file. Open-source projects without these files look abandoned or unserious.

- [x] Add `LICENSE` (MIT, full text)
- [x] Add `CONTRIBUTING.md` — how to contribute, code of conduct expectations, what kinds of contributions are needed (reference the README's contributing section)
- [x] Add `SECURITY.md` — responsible disclosure process, what constitutes a vulnerability in this context (both technical and behavioral pattern detection)
- [x] Add `CODE_OF_CONDUCT.md` — important given the subject matter; contributors may include survivors, advocates, and researchers

### 1.4 — Fix the test script

`npm test` doesn't work. Anyone who clones the repo and runs the standard command gets nothing.

- [x] Add `"test": "vitest run"` to package.json scripts
- [x] Add `"test:watch": "vitest"` for development
- [x] Verify both work on clean install

---

## Phase 2: Offline & Installable

**Priority: High. The README says "works offline after first load." That's not true yet.**

People using this tool may be doing so in situations where they need to disconnect from the internet, use airplane mode, or avoid network traffic. A service worker makes the promise real.

### 2.1 — PWA manifest

- [x] Create `manifest.webmanifest` with:
  - `name`: "Safety Resource" (NOT "VerifyMyAI" — maintain the neutral tab title pattern)
  - `short_name`: "Safety Check"
  - `description`: neutral phrasing
  - `start_url`: "/"
  - `display`: "standalone"
  - `background_color` / `theme_color`
  - `icons`: reference the icons from 1.2
- [x] Link manifest in `index.html`

### 2.2 — Service worker

- [x] Implement service worker with offline-first caching strategy
- [x] Cache all static assets on install (HTML, JS, CSS, fonts)
- [x] Use `vite-plugin-pwa` or manual SW — evaluate which gives more control
- [x] Handle cache versioning (bust cache on new deployments)
- [ ] Test: airplane mode after first visit should load the full app
- [ ] Test: audit flow should work completely offline (no external requests to break)

### 2.3 — Install prompt

- [x] Add subtle "Install this app" prompt for supported browsers
- [x] Keep it unobtrusive — no pushy modal, just a small notice
- [x] Respect dismissal — don't show again if declined

---

## Phase 3: Accessibility

**Priority: High. People using this tool may be in crisis, on medication, exhausted, using screen readers, or navigating with one hand while holding a phone they don't want someone to see.**

### 3.1 — Keyboard navigation

- [ ] Add skip-to-content link (hidden until focused)
- [ ] Ensure full wizard flow is navigable via Tab/Shift+Tab/Enter
- [ ] Test Emergency Exit with keyboard only (Esc already works — good)
- [ ] Document keyboard shortcuts if any exist beyond Esc

### 3.2 — Screen reader support

- [ ] Add `aria-live` regions for dynamic content (finding results, severity changes, step transitions)
- [ ] Add `sr-only` descriptive text where visual context is needed
- [ ] Ensure all interactive elements have accessible names
- [ ] Test with NVDA or VoiceOver

### 3.3 — Focus management

- [ ] Trap focus inside ResourcesPage overlay when open
- [ ] Move focus to new content on wizard step change
- [ ] Return focus appropriately when dialogs/overlays close
- [ ] Ensure CopyButton announces success to screen readers

### 3.4 — Visual accessibility

- [ ] Audit color contrast ratios (WCAG AA minimum, AAA preferred)
- [ ] Ensure severity colors (green/yellow/red) aren't the only indicator — add icons or text labels
- [ ] Test at 200% zoom
- [ ] Ensure touch targets are minimum 44x44px on mobile

---

## Phase 4: Test Coverage

**Priority: Medium. Core paths are tested, but gaps exist in critical safety components.**

### Current state
- **Tested:** Landing, PlatformPicker, AuditFlow, Results, EvidenceKit, ActionSteps, CopyButton, CrisisResources, PlatformCard, QuickExit, useWizard, useAuditState + smoke test
- **Not tested:** DocumentationPrompt, FindingCard, GenerateReportButton, Layout, ProgressBar, PromptStep, ScreenshotGuide, TrustPact, WizardNav, ResourcesPage, generateReport.js

### 4.1 — Safety-critical component tests

These are the components where a regression could cause real harm:

- [ ] **QuickExit** — expand existing tests: verify history entries are pushed, sessionStorage is cleared, Esc key works, the redirect URL is correct
- [ ] **GenerateReportButton** — test loading state, error handling, that it calls generateReport
- [ ] **generateReport.js** — unit test the ZIP/PDF generation (mock jsPDF and JSZip)
- [ ] **ResourcesPage** — test that all 11 categories render, phone links are `tel:`, expand/collapse works
- [ ] **DocumentationPrompt** — test screenshot upload, removal, text input, continue flow

### 4.2 — UI component tests

- [ ] WizardNav — back button, start over, step labels
- [ ] TrustPact — renders content
- [ ] ScreenshotGuide — renders guidance
- [ ] Layout — passes props to children, CrisisResources always present
- [ ] ProgressBar — correct width calculations
- [ ] PromptStep — copy button, prompt display, look-for guidance
- [ ] FindingCard — severity styling, content display

### 4.3 — Integration tests

- [ ] Full wizard flow: landing → platform → audit → results (happy path)
- [ ] Evidence collection: upload screenshots → generate report → download
- [ ] Emergency Exit from every page
- [ ] Severity escalation: findings change results messaging and crisis resource styling

---

## Phase 5: Content & Reach

**Priority: Medium. The tool works. Now it needs to reach people.**

### 5.1 — Print stylesheet

- [ ] Add `@media print` styles so the audit results can be printed cleanly
- [ ] Hide navigation, Emergency Exit, and interactive elements in print
- [ ] Format findings and evidence for paper
- [ ] Some users may need physical copies for counselors, lawyers, or law enforcement

### 5.2 — Additional export formats

- [ ] Plain text export (for pasting into secure notes or encrypted messages)
- [ ] JSON export (for researchers or forensic analysis)
- [ ] Consider: CSV of findings for spreadsheet analysis

### 5.3 — Educational content

- [ ] Create a "How This Attack Works" page (linked from README, not from main audit flow — keep the tool focused)
- [ ] Write platform-specific walkthroughs with screenshots showing where hidden settings live
- [ ] Consider: video demonstrations of the attack surface per platform

### 5.4 — Advocacy toolkit

- [ ] Create a one-page PDF that counselors/advocates can print and give to clients
- [ ] Write a template email for advocates to send to AI platform security teams
- [ ] Compile a press/media summary for journalists covering tech-facilitated abuse

---

## Phase 6: Internationalization

**Priority: Important but complex. This is a global problem with US-only resources right now.**

### 6.1 — i18n infrastructure

- [ ] Evaluate `react-i18next` vs `react-intl` — lightweight is better for this static site
- [ ] Extract all user-facing strings into translation files
- [ ] Set up locale detection and language switcher
- [ ] Ensure RTL layout support for Arabic, Hebrew, Farsi

### 6.2 — Priority translations

Based on global domestic violence statistics and AI adoption:

- [ ] Spanish (es) — 580M+ speakers, high DV rates across Latin America
- [ ] Portuguese (pt-BR) — Brazil has significant DV crisis
- [ ] French (fr) — covers France, West/Central Africa, Quebec
- [ ] Hindi (hi) — India's growing AI adoption + DV prevalence
- [ ] Arabic (ar) — important but requires RTL support first

### 6.3 — International resources

- [ ] Expand comprehensiveResources.js with country-specific organizations
- [ ] Locale-aware resource display (show relevant country's resources)
- [ ] International crisis hotlines per language/region

---

## Phase 7: Advanced Features

**Priority: Lower. Nice-to-haves that increase utility for specific audiences.**

### 7.1 — Comparison mode

- [ ] Let users run the same audit prompts on a fresh/default AI session vs their current one
- [ ] Side-by-side display of responses
- [ ] Highlight divergences — if the AI responds differently to the same prompt when custom instructions are present vs absent, that's a signal

### 7.2 — Audit history

- [ ] Optional local-only storage of previous audit results (localStorage, encrypted)
- [ ] Track changes over time — "your AI's behavior shifted between audit 1 and audit 2"
- [ ] Export comparison reports
- [ ] Clear all history button (with the same thoroughness as Emergency Exit)

### 7.3 — Browser extension

- [ ] Chrome/Firefox extension that can check AI settings directly (with explicit user permission)
- [ ] Would eliminate the copy-paste step — dramatically easier for non-technical users
- [ ] Privacy implications need very careful handling
- [ ] Would need its own security audit

### 7.4 — Platform API integrations

- [ ] For platforms that offer API access to custom instructions/memories (if any ever do)
- [ ] Automated detection of known coercive patterns
- [ ] This is aspirational — depends on platforms cooperating

---

## Phase 8: Community & Sustainability

**Priority: Ongoing. This project needs people, not just code.**

### 8.1 — Community infrastructure

- [ ] GitHub Discussions enabled for the repo
- [ ] Issue templates: bug report, feature request, resource suggestion, platform vulnerability report
- [ ] Consider: Discord or Signal group for contributors (not for users — users should never need to join anything)

### 8.2 — Research partnerships

- [ ] Reach out to DV/IPV research organizations (outlined in README)
- [ ] Connect with AI safety researchers at major labs
- [ ] Pursue academic collaboration for formal threat modeling
- [ ] Submit to relevant conferences (CHI, USENIX Security, CSCW)

### 8.3 — Platform advocacy

- [ ] Draft formal vulnerability reports for each major AI platform
- [ ] Track platform responses and any changes they make
- [ ] Maintain a public accountability page (which platforms have been notified, which have responded, which have acted)

### 8.4 — Sustainability

- [ ] The site costs nothing to run (Cloudflare Pages free tier) — keep it that way
- [ ] No donations, no sponsorships, no premium features — this is a public good
- [ ] Succession planning: if the maintainer can't continue, who takes over? Document this.
- [ ] Domain auto-renewal: ensure verifymyai.org, checkmyai.org, isitmyai.org don't lapse

---

## Dependency Map

Some phases have dependencies. Most don't — work can happen in parallel.

```
Phase 1 (Launch Integrity)
  └── no dependencies, do first

Phase 2 (PWA/Offline)
  └── needs icons from 1.2

Phase 3 (Accessibility)
  └── independent, can start anytime

Phase 4 (Testing)
  └── independent, can start anytime

Phase 5 (Content & Reach)
  └── independent, benefits from 1.1 (social sharing)

Phase 6 (i18n)
  └── benefits from 4.x (tests catch translation regressions)

Phase 7 (Advanced Features)
  └── depends on core stability (Phases 1-4)

Phase 8 (Community)
  └── depends on 1.3 (project health files)
```

---

## Who Can Help With What

| Phase | Skills Needed |
|-------|--------------|
| 1. Launch Integrity | Frontend dev, graphic design (social image, favicon) |
| 2. PWA/Offline | Frontend dev with service worker experience |
| 3. Accessibility | A11y specialist, screen reader testing |
| 4. Testing | React testing, anyone can write these |
| 5. Content | Writers, DV advocates, platform security researchers |
| 6. i18n | Translators, RTL layout experience, regional DV advocates |
| 7. Advanced | Senior frontend dev, browser extension dev |
| 8. Community | Community managers, researchers, advocates, anyone who cares |

---

## Non-Goals

Things we are intentionally NOT doing:

- **No backend.** Everything stays client-side. No servers, no databases, no accounts.
- **No analytics.** We don't track visitors, clicks, completions, or anything else. Ever.
- **No monetization.** No ads, no donations page, no premium tier, no sponsorships.
- **No user accounts.** Nobody signs up for anything. The tool is anonymous by design.
- **No data collection.** Screenshots, audit results, and reports never leave the browser unless the user downloads them.
- **No dark patterns.** No "share this with 5 friends" prompts, no guilt-based CTAs, no notification requests.

---

*This roadmap is a living document. Update it as things get done, priorities shift, or new needs surface.*
