# Security Policy

## Scope

VerifyMyAI is a client-side static web application. There is no backend, no database, no user accounts, and no data transmission. All processing happens in the user's browser.

That said, security matters here in two dimensions:

### Technical vulnerabilities

Standard web security issues that could affect users:

- Cross-site scripting (XSS)
- Malicious content injection
- Dependencies with known vulnerabilities
- Service worker cache poisoning (once PWA is implemented)
- Any issue that could cause data to leave the browser unintentionally

### Behavioral detection vulnerabilities

Issues specific to this tool's purpose:

- Audit prompts that could be detected and evaded by a tampered AI
- Prompt patterns that could trigger an AI to alert its operator
- Gaps in the detection methodology that miss known tampering techniques
- Emergency Exit failures that could leave traces

## Reporting a Vulnerability

**Do not open a public issue for security vulnerabilities.**

Email: **end1989@users.noreply.github.com**

Include:

- Description of the vulnerability
- Steps to reproduce
- Which category it falls into (technical or behavioral)
- Severity assessment if you have one

We will acknowledge receipt within 48 hours and aim to resolve critical issues within 7 days.

## Supported Versions

Only the latest version deployed to verifymyai.org is supported. There are no legacy versions to maintain.

## Dependencies

We keep dependencies minimal by design. Current runtime dependencies:

- **jsPDF** — PDF generation (client-side)
- **JSZip** — ZIP packaging (client-side)
- **React** / **React DOM** — UI framework

We monitor for dependency vulnerabilities and update promptly.
