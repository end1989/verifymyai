export const platforms = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Custom instructions, memory, uploaded files, shared GPTs',
    settingsPath: 'Settings > Personalization > Custom Instructions / Memory',
    exportPath: 'Settings > Data Controls > Export Data',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Project instructions, system prompts, conversation history',
    settingsPath: 'Project settings or conversation start',
    exportPath: 'No built-in export -- use screenshot method',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Extensions, Google account integrations, Gems',
    settingsPath: 'Settings > Extensions / Gems',
    exportPath: 'Google Takeout > Gemini Apps',
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    description: 'Notebook context, enterprise configurations',
    settingsPath: 'Settings > Personalization',
    exportPath: 'Microsoft account privacy dashboard',
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
