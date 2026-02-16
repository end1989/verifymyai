export const cleanupSteps = {
  chatgpt: {
    immediate: [
      "Use the neutralizer prompt (provided below) in your current conversation to reset the session.",
      "Go to Settings > Personalization > Custom Instructions. Read everything there. Delete anything you didn't write.",
      "Go to Settings > Personalization > Memory > Manage. Review every entry. Delete anything suspicious.",
    ],
    security: [
      'Change your OpenAI password immediately.',
      'Enable two-factor authentication (2FA) in your OpenAI account settings.',
      'Go to Settings > Security and check active sessions. Log out all other sessions.',
      'If you use "Login with Google/Microsoft," check that your linked email account is also secured.',
    ],
    thorough: [
      "Check Explore GPTs > My GPTs for custom GPTs you didn't create. Delete them.",
      "Review your conversation history for conversations you didn't start.",
      'Consider requesting a full data export and reviewing it on a device only you access.',
    ],
  },
  claude: {
    immediate: [
      'Use the neutralizer prompt in your current conversation.',
      "Check all Project instructions and clear anything you didn't write.",
      'Start fresh conversations rather than continuing old ones if concerned.',
    ],
    security: [
      'Change your Anthropic account password.',
      'Enable 2FA if available.',
      "Review your account settings for any API keys you didn't create.",
    ],
    thorough: [
      'Review all saved Projects for unfamiliar instructions.',
      'Check if anyone has access to an API key linked to your account.',
    ],
  },
  gemini: {
    immediate: [
      'Use the neutralizer prompt in your current conversation.',
      "Review and disable any extensions you didn't enable.",
      "Delete any Gems you didn't create.",
    ],
    security: [
      'Change your Google account password.',
      'Enable 2FA on your Google account.',
      'Review account access at myaccount.google.com > Security > Your devices.',
      'Check for unfamiliar app access at myaccount.google.com > Security > Third-party apps.',
    ],
    thorough: [
      'Run Google Takeout export for Gemini data.',
      'Review Google Activity controls for Gemini-related activity.',
    ],
  },
  copilot: {
    immediate: [
      'Use the neutralizer prompt.',
      "Clear any personalization settings you don't recognize.",
    ],
    security: [
      'Change your Microsoft account password.',
      'Enable 2FA on your Microsoft account.',
      'Review sign-in activity at account.microsoft.com.',
    ],
    thorough: [
      'Review Microsoft privacy dashboard for stored data.',
      'Check for unfamiliar devices linked to your account.',
    ],
  },
  voice: {
    immediate: [
      "Delete any routines or automations you didn't create.",
      "Disable any skills or actions you don't recognize.",
    ],
    security: [
      'Change the password for your Amazon/Google/Apple account.',
      'Enable 2FA.',
      "Remove any voice profiles you don't recognize.",
      'Check if any unfamiliar devices are linked to your account.',
    ],
    thorough: [
      'Review full voice history and delete anything suspicious.',
      'Consider resetting the device to factory settings if deeply concerned.',
    ],
  },
  other: {
    immediate: [
      'Use the neutralizer prompt if the tool supports conversational interaction.',
      "Find and clear any system prompts, instructions, or configuration you didn't set.",
    ],
    security: [
      'Change your password for this service.',
      'Enable 2FA if available.',
      'Check for unfamiliar sessions or devices.',
    ],
    thorough: [
      'Consider whether this tool was recommended or set up by someone else.',
      "If you can't verify the tool's safety, consider switching to a well-known alternative.",
    ],
  },
}
