export const platforms = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Custom instructions, saved memories, reference chat history, Projects, uploaded files, custom GPTs',
    settingsPath: 'Settings > Personalization (Custom instructions, Manage memory, Reference chat history)',
    exportPath: 'Settings > Data Controls > Export Data',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Memory (persistent across chats), custom instructions & styles, Projects, system prompts, conversation history',
    settingsPath: 'Settings > Capabilities > Memory; Project settings; custom instructions',
    exportPath: 'Settings > Memory (view/edit/export) and Settings > Privacy > Export data. Screenshots still recommended for memory & project instructions.',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Personal context (memory of past chats), saved info & standing instructions, Gems, connected apps, Google account integrations',
    settingsPath: 'Settings > Personal context (Saved info) / Gems; gemini.google.com/saved-info',
    exportPath: 'Google Takeout > Gemini Apps; review/delete in Saved info',
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    description: 'Saved memories & personalization, custom instructions, work profile, chat history, enterprise/agent configs',
    settingsPath: 'copilot.microsoft.com > profile/Account > Memory; Settings > Personalization (Custom instructions / Saved memories)',
    exportPath: 'Microsoft account privacy dashboard; review/delete Saved memories in Personalization',
  },
  {
    id: 'voice',
    name: 'Voice Assistants',
    description: 'Routines, skills, linked accounts (Alexa, Siri, Google)',
    settingsPath: 'Varies by device -- check app settings',
    exportPath: 'Varies by platform -- see evidence steps',
  },
  {
    id: 'other',
    name: 'Other / Unknown',
    description: 'General checks that work on any AI tool',
    settingsPath: 'Look for Settings, Preferences, or System Prompt',
    exportPath: 'Screenshot everything you find',
  },
]
