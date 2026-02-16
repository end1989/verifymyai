# AI Safety Check -- Design Document

**Date:** 2026-02-16
**Status:** Approved

## Problem

AI assistants learn about their users through memory, custom instructions, uploaded files, and conversation history. When someone else gains access to these controls -- a partner, a family member, anyone -- they can quietly reshape the AI's responses to gaslight, isolate, or manipulate the user. The victim sees "their" AI being helpful. They don't see the layer shaping it against them.

This is relationship-level harm delivered through technology. It's subtle, patient, and almost impossible to detect without knowing what to look for.

## Who This Is For

1. **Potential victims** -- people who suspect (or don't yet suspect) that their AI has been tampered with
2. **Everyone preventatively** -- any AI user who wants to audit their AI environment as a regular safety habit

## What We're Building

**AI Safety Check** -- a single-page interactive web app that guides a person through auditing their AI tools for hidden manipulation. One link. No sign-up. No data collection. Works on any device.

The user picks their AI platform, runs guided prompts step-by-step, and the site helps them interpret what they find -- with clear "normal / worth watching / red flag" assessments and concrete next steps.

## Core Principles

- **Guide the human** -- the user does the checking themselves. No API access, no browser extensions, no permissions needed. Works across every AI platform.
- **Empathy in the infrastructure** -- every design decision accounts for the possibility that the person using this is scared, isolated, and might have someone looking over their shoulder.
- **Facts, not framing** -- the site never says "you are being abused" or "leave this person." It surfaces what's configured, explains what it does, and lets the user draw their own conclusions.
- **Evidence before cleanup** -- if something is wrong, document it before removing it.

## Architecture

### Tech Stack
- React + Vite
- Tailwind CSS
- Static site -- no backend, no database, no accounts
- Hosted on Cloudflare Pages, Netlify, or GitHub Pages (free, fast, global)
- No external API calls, no analytics, no cookies
- Works offline once loaded
- Open source -- anyone can verify the claims

### Why Static / No Backend
- A person in a coercive situation shouldn't worry about tracking
- Nothing to maintain server-side
- Can be cached/saved for offline use
- Zero attack surface for data breaches (there's no data)

## User Flow

```
Landing Page --> Platform Picker --> Guided Audit (tiered) --> Results & Interpretation --> Evidence Gathering (if needed) --> Cleanup & Action Steps
```

Linear wizard-style flow. One screen at a time. Can go back but the default path is forward.

## Design Sections

### 1. Trust & Safety Layer

Persistent across the entire site:

**Quick Exit:**
- Always-visible button (top corner) -- one click redirects to Google
- Keyboard shortcut (Esc key) for speed
- Browser history replacement -- "Back" button won't return to the site
- Neutral browser tab title (e.g., "Safety Resource" or "Guide")

**Trust Pact (shown on landing, before anything else):**
- No data leaves your browser. Ever. Nothing is sent anywhere.
- No accounts. No sign-ups. No email capture.
- No cookies. No analytics. No tracking pixels.
- No ads. No sponsors. No agenda.
- Your results aren't stored -- close the tab and they're gone.
- This site works offline once loaded.
- The code is open source -- anyone can verify these claims.

Plain language. Not a privacy policy. A promise.

**Tone:**
- Never clinical. Never condescending.
- Doesn't assume danger -- frames as routine, like checking a smoke detector
- Doesn't minimize either -- if something is wrong, says so clearly
- Zero "you might be overreacting" energy anywhere

**Crisis resources:**
- Persistent, small link to domestic abuse hotlines and crisis text lines
- Framed as "if you need to talk to a person"
- Becomes more visible when red flags are detected

### 2. Landing Page (The On-Ramp)

Must accomplish three things in ~10 seconds: feel safe, explain why they're here, make the next step obvious.

1. Quick exit button (already visible)
2. Headline -- direct but not alarming: "Check if your AI is really yours." or "A free safety check for your AI tools."
3. One-paragraph hook -- explains the problem without jargon or alarm
4. Trust pact block
5. One button: "Start Checking"
6. Below the fold (optional): "Why does this matter?" context and "How this works" 3-step preview

Feels like a calm friend handing you a flashlight.

### 3. Platform Picker

Simple grid of cards:

- **ChatGPT** -- "Custom instructions, memory, uploaded files, shared GPTs"
- **Claude** -- "Project instructions, system prompts, conversation history"
- **Gemini** -- "Extensions, Google account integrations, Gems"
- **Microsoft Copilot** -- "Notebook context, enterprise configurations"
- **Voice Assistants (Alexa/Siri/Google)** -- "Routines, skills, linked accounts"
- **Other / Unknown** -- "General checks that work on any AI tool"

"Other" serves as a universal fallback since the core prompts target AI behavior rather than platform-specific settings.

### 4. Guided Audit

Each step has four parts:
1. **What we're checking** -- plain language, one sentence
2. **What to do** -- the prompt to copy + platform-specific instructions with screenshots/diagrams
3. **Copy button** -- one tap, clipboard, go paste, come back
4. **What to look for** -- interpretation guide with examples of normal vs. suspicious vs. red flag responses

**Three tiers (progressive depth):**

- **Tier 1 -- Quick Check (~5 min, 3 prompts):** Surface persistent info, hidden frameworks, relationship narrative locks. The "if you only do three" set.
- **Tier 2 -- Full Audit (~15 min, 8-10 prompts):** All memory/instruction checks, behavior differential tests, optimization target analysis.
- **Tier 3 -- Deep Dig (~25 min, all prompts):** Chat history scanning, file/document traces, full behavioral comparison.

Start at Tier 1. If clean, offer Tier 2 as optional. If concerns surface, recommend continuing. Tier 3 only when there's reason to dig deeper.

### 5. Results Interpretation

Plain-language summary. No scores, no dashboards.

**Three categories:**
- **"Nothing unusual found"** -- reassures without dismissing, recommends periodic rechecking
- **"Some things worth watching"** -- yellow flags with both benign and concerning explanations
- **"Concerns detected"** -- red flags stated directly, no hedging

**For each finding:**
1. What it is (factual)
2. Why it matters (what it does to their AI's behavior)
3. What to do about it (concrete steps)

### 6. Evidence Gathering & Preservation

**Triggered when red flags are detected. Comes BEFORE cleanup.**

> "Before we clean anything up, let's document what's here. Once it's removed, it's gone."

**The evidence kit:**

1. **Platform data export** -- step-by-step instructions for each platform's official export (e.g., ChatGPT "Export Data" includes custom instructions and memory as structured files). Platform-generated data is the strongest evidence -- can't be dismissed as fabricated.

2. **Screenshot walkthrough** -- guided screenshots of settings screens, memory entries, uploaded files. Include browser URL bar and timestamp.

3. **The comparison test** -- same neutral question asked in the compromised session vs. a fresh incognito/new-account session. The difference between responses is concrete and hard to explain away.

4. **The metadata prompt** -- a neutral, non-leading prompt that asks the AI to list all active instructions, memory entries, and directives with creation/modification dates. Dates that don't match the user's activity patterns are evidence.

5. **Documentation template** -- the site generates a structured document:
   - Date of audit
   - Platform checked
   - Findings (user's words + AI responses)
   - Comparison test results
   - Data export reference
   - Neutral, factual framing throughout -- reads as credible to a third party

**Goal:** Transform "my AI was acting weird" into "here is my data export showing a custom instruction added on [date] that says [exact text], and here is how it changed responses compared to a clean session."

### 7. Cleanup & Action Steps

**Scaled to severity:**

**Clean results:**
- Run this check periodically
- How to review your AI settings yourself (platform-specific links)

**Yellow flags:**
- How to remove specific memory/instruction (step-by-step per platform)
- Watch for this pattern going forward
- Neutralizer prompt for immediate session reset

**Red flags:**
- Immediate neutralizer prompt
- Step-by-step removal/cleanup guide per platform
- Change password and enable 2FA (with direct links)
- Consider device access security
- Crisis resources become more prominent

## What This Site Is Not

- Not a diagnostic tool ("you are being abused")
- Not relationship advice ("leave this person")
- Not a surveillance tool (works only on your own accounts)
- Not a data collector (nothing leaves the browser)

It's a mirror cleaner. It helps you see clearly and decide for yourself.
