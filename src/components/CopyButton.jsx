import { useState } from 'react'

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Copied' : 'Copy prompt'}
        className={`px-4 py-3 min-h-[44px] rounded-md text-sm font-medium transition-colors ${
          copied
            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
            : 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-300'
        }`}
      >
        {copied ? 'Copied' : 'Copy prompt'}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Prompt copied to clipboard' : ''}
      </span>
    </>
  )
}
