export const evidenceSteps = {
  chatgpt: [
    {
      title: 'Export your data',
      description: 'Go to Settings > Data Controls > Export Data. ChatGPT will email you a zip file containing your custom instructions, memory entries, and conversation history as structured files. This is platform-generated evidence that cannot be dismissed as fabricated.',
      important: true,
    },
    {
      title: 'Screenshot your custom instructions',
      description: 'Go to Settings > Personalization > Custom Instructions. Screenshot both the "What would you like ChatGPT to know about you?" and "How would you like ChatGPT to respond?" fields. Include the browser URL bar in the screenshot.',
    },
    {
      title: 'Screenshot your memory entries',
      description: "Go to Settings > Personalization > Memory > Manage. Screenshot all memory entries. Look for entries you don't recognize or didn't create.",
    },
    {
      title: 'Check your shared GPTs',
      description: "Go to Explore GPTs > My GPTs. If there are custom GPTs you didn't create, screenshot their configuration (instructions, conversation starters, knowledge files).",
    },
    {
      title: 'Run the comparison test',
      description: 'Open an incognito/private browser window. Go to ChatGPT without logging in (or create a temporary free account). Ask both the logged-in and logged-out versions the same neutral question: "How should I handle a disagreement with someone I care about?" Screenshot both responses side by side.',
      important: true,
    },
  ],
  claude: [
    {
      title: 'Check project instructions',
      description: 'If you use Claude Projects, open each project and check the "Project instructions" section. Screenshot any instructions you find.',
    },
    {
      title: 'Review recent conversations',
      description: "Look at your recent conversation list. Are there conversations you don't remember starting? Screenshot the titles and opening messages of any suspicious ones.",
    },
    {
      title: 'Run the comparison test',
      description: 'Start a brand new conversation with no project context. Ask: "How should I handle a disagreement with someone I care about?" Compare this response to what you get in your usual conversation context. Screenshot both.',
      important: true,
    },
  ],
  gemini: [
    {
      title: 'Export via Google Takeout',
      description: 'Go to takeout.google.com. Select "Gemini Apps" and export your data. This includes conversation history and any extensions.',
      important: true,
    },
    {
      title: 'Check extensions and Gems',
      description: 'In Gemini settings, review all active extensions and any custom Gems. Screenshot their configurations.',
    },
    {
      title: 'Run the comparison test',
      description: 'Open an incognito window and use Gemini without your Google account (if possible). Compare responses to the same question. Screenshot both.',
      important: true,
    },
  ],
  copilot: [
    {
      title: 'Check personalization settings',
      description: "Review Copilot's personalization and notebook sections. Screenshot any stored context or preferences.",
    },
    {
      title: 'Review Microsoft privacy dashboard',
      description: 'Go to your Microsoft account privacy dashboard. Check what data Copilot has stored.',
    },
    {
      title: 'Run the comparison test',
      description: 'Open an incognito window and try Copilot without signing in. Compare responses.',
      important: true,
    },
  ],
  voice: [
    {
      title: 'Check routines and automations',
      description: "In your voice assistant app (Alexa, Google Home, etc.), go to Routines/Automations. Screenshot all configured routines. Look for routines you didn't create.",
      important: true,
    },
    {
      title: 'Review linked skills/actions',
      description: "Check what third-party skills or actions are enabled. Screenshot the list and remove any you don't recognize.",
    },
    {
      title: 'Check voice history',
      description: "Review your voice command history in the app. Look for commands or interactions you don't recognize.",
    },
  ],
  other: [
    {
      title: 'Find the settings or configuration',
      description: 'Look for any Settings, Preferences, System Prompt, or Configuration section. Screenshot everything you find.',
    },
    {
      title: 'Run the comparison test',
      description: "If possible, create a new account or use the tool without signing in. Compare responses to the same question. Screenshot both.",
      important: true,
    },
    {
      title: 'Document the tool itself',
      description: 'Write down or screenshot: the name of the AI tool, how you access it, who recommended it or set it up, and when you started using it.',
    },
  ],
}
