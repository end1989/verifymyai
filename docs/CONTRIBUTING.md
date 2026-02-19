# Contributing to VerifyMyAI

Thank you for wanting to help. This project exists to protect people — every contribution matters.

## Getting Started

```bash
git clone https://github.com/end1989/verifymyai.git
cd verifymyai
npm install
npm run dev        # Dev server at localhost:5173
npm test           # Run all tests
```

## What We Need Help With

Check the [roadmap](NEXT_STEPS.md) for the full list. High-impact areas right now:

- **Testing** — Expanding test coverage for safety-critical components
- **Accessibility** — Screen reader support, keyboard navigation, color contrast
- **Translations** — Making the tool available in more languages
- **Platform research** — Documenting where hidden settings live on each AI platform
- **Crisis resources** — Adding international organizations and hotlines

## How to Contribute

1. **Fork the repo** and create a branch from `master`
2. **Make your changes** — keep them focused on one thing
3. **Add tests** if you're touching behavior
4. **Run `npm test`** and `npm run lint` before submitting
5. **Open a pull request** with a clear description of what and why

## Guidelines

- **Keep it client-side.** No backends, no external requests, no analytics. Ever.
- **Keep language neutral.** UI text should be safe to appear on someone's screen. Avoid alarming words in visible elements.
- **Test safety features.** If your change touches Emergency Exit, crisis resources, or the tab title — test it manually. These protect people.
- **Don't add tracking.** No analytics, cookies, or third-party scripts.
- **Respect the non-goals.** See the [roadmap](NEXT_STEPS.md#non-goals) for what we intentionally don't do.

## Reporting Bugs

Open a [GitHub issue](https://github.com/end1989/verifymyai/issues) with:

- What you expected to happen
- What actually happened
- Browser and OS
- Screenshots if relevant

## Suggesting Features

Open an issue with the "feature request" label. Explain the problem you're trying to solve, not just the solution you want.

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Given the subject matter of this project, we take conduct seriously. Contributors may include survivors, advocates, and researchers — be respectful.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](../LICENSE).
