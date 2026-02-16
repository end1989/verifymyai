import { useState } from 'react'

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy prompt'}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        copied
          ? 'bg-green-100 text-green-700'
          : 'bg-slate-800 text-white hover:bg-slate-700'
      }`}
    >
      {copied ? 'Copied' : 'Copy prompt'}
    </button>
  )
}
