export const cleanupSteps = {
  chatgpt: {
    immediate: [
      "Use the neutralizer prompt (provided below) in your current conversation to reset the session.",
      "Go to Settings > Personalization > Custom Instructions. Read everything there. Delete anything you didn't write.",
      "Go to Settings > Personalization > Memory > Manage. Review every saved-memory entry and delete anything suspicious. ChatGPT also has 'Reference chat history' (implicit memory from past chats with no deletable list) -- to fully stop personalization, turn off both 'Reference saved memories' and 'Reference chat history,' and use a Temporary Chat for clean conversations.",
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
      'Go to Settings > Capabilities > Memory and click "View and edit memory." Read every entry and delete anything you did not establish. Use "Reset memory" to wipe everything (including project memory) if concerned -- you can also turn Memory off here.',
      "Check all Project instructions and clear anything you didn't write.",
      'Start fresh conversations rather than continuing old ones if concerned.',
    ],
    security: [
      'Change your Anthropic account password.',
      'Enable two-factor authentication in Settings > Account.',
      'Review Settings for connected apps / connectors and active sessions or devices; revoke anything unfamiliar.',
      "Check for API keys you didn't create (developer/console accounts).",
    ],
    thorough: [
      'Review all saved Projects for unfamiliar instructions.',
      'Check if anyone has access to an API key linked to your account.',
    ],
  },
  gemini: {
    immediate: [
      'Use the neutralizer prompt in your current conversation.',
      'Go to gemini.google.com/saved-info (Settings > Personal context / Saved info). Review every saved entry and standing instruction. Delete anything you did not add -- you can turn Memory off entirely here.',
      "Review and disable any connected apps/extensions you didn't enable.",
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
      'Sign in at copilot.microsoft.com, open your Account/profile > Memory, and review saved memories. Delete any you do not recognize (individually or "Delete all"). Note: turning Personalization off does NOT delete existing memories.',
      "Clear any custom instructions or personalization settings you don't recognize.",
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
  grok: {
    immediate: [
      'Use the neutralizer prompt in your current conversation.',
      'Open Settings > Data Controls (Memory) and review saved memories. Delete anything you did not establish, or turn Memory off.',
      "Check Customize / custom instructions, Workspaces, and Custom Agents; clear anything you didn't create.",
    ],
    security: [
      'Change your X / xAI account password.',
      'Enable two-factor authentication.',
      'Review authorized apps and active sessions; revoke anything unfamiliar.',
    ],
    thorough: [
      'Review any Skills or Custom Agents for hidden instructions.',
      'Start fresh conversations rather than continuing old ones if concerned.',
    ],
  },
  meta: {
    immediate: [
      'Use the neutralizer prompt in a chat with Meta AI.',
      'Open Meta AI > your profile > Memory and review saved memories. Delete anything you did not add -- remember memory can be shared across WhatsApp, Instagram, and Messenger.',
      'Check whether anyone else has access to the linked accounts Meta AI runs on.',
    ],
    security: [
      'Change your Facebook / Instagram / WhatsApp account passwords.',
      'Enable two-factor authentication on each linked account.',
      "Review active sessions and logged-in devices; remove any you don't recognize.",
    ],
    thorough: [
      'Check Accounts Center to see which accounts are linked together.',
      'Review whether a shared family or household account is exposing your chats.',
    ],
  },
  companion: {
    immediate: [
      'Use the neutralizer prompt if the app supports open conversation.',
      "Open the character / persona settings and read the personality, description, and any pinned or saved memories. Delete or edit anything you didn't write.",
      'If someone else created or recommended the character, consider starting a new one you control.',
    ],
    security: [
      'Change your password for the app.',
      'Enable 2FA if available.',
      'Check whether the account is shared or was set up by someone else.',
    ],
    thorough: [
      'Review the full persona / character definition for instructions about you or your relationships.',
      'Consider deleting the character and starting fresh if it was set up by someone else.',
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
