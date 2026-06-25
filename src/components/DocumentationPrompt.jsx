import { useState } from 'react'
import CopyButton from './CopyButton'
import ScreenshotGuide from './ScreenshotGuide'

import { docPrompts, fallbackDocPrompt } from '../data/docPrompts'

function readFileAsDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve({ name: file.name, type: file.type, dataUrl: reader.result })
    reader.readAsDataURL(file)
  })
}

export default function DocumentationPrompt({ promptId, promptTitle, onContinue }) {
  const docPrompt = docPrompts[promptId] || fallbackDocPrompt(promptTitle)
  const [responseText, setResponseText] = useState('')
  const [screenshots, setScreenshots] = useState([])

  async function handleFileChange(e) {
    const files = Array.from(e.target.files)
    const newScreenshots = await Promise.all(files.map(readFileAsDataUrl))
    setScreenshots((prev) => [...prev, ...newScreenshots])
    e.target.value = ''
  }

  function removeScreenshot(index) {
    setScreenshots((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <h3 className="font-semibold text-amber-800 dark:text-amber-300">Document this before moving on</h3>
        <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
          Something stood out. Before you continue, get the full details from your AI. Copy the prompt below and paste it into your AI right now. Save or screenshot the response -- this is the kind of detailed evidence that matters.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Copy this follow-up prompt and paste it into your AI:
        </p>
        <blockquote className="text-slate-700 dark:text-slate-200 whitespace-pre-line text-sm leading-relaxed border-l-2 border-slate-300 dark:border-slate-600 pl-3">
          {docPrompt}
        </blockquote>
        <CopyButton text={docPrompt} />
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300 space-y-2">
        <p className="font-medium text-slate-700 dark:text-slate-200">Save what you get back</p>
        <p>Screenshot or copy the AI's full response. Save it somewhere only you can access -- a personal email draft, a note on your phone, a USB drive. Include today's date.</p>
        <p>This detailed report is what turns "something felt off" into documented facts.</p>
      </div>

      <ScreenshotGuide />

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
        <p className="font-medium text-slate-700 dark:text-slate-200">Paste your AI's response here (optional)</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          This stays in your browser only -- nothing is uploaded or sent anywhere. If you paste it here, we can include it in the report.
        </p>
        <textarea
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          placeholder="Paste the AI's response here..."
          className="w-full h-40 p-3 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 resize-y focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600"
        />
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
        <p className="font-medium text-slate-700 dark:text-slate-200">Attach screenshots (recommended)</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Screenshots are the strongest evidence. They stay on your device -- we bundle them into your report package alongside the PDF. Nothing leaves your browser.
        </p>
        <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <svg className="w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-slate-600 dark:text-slate-300">Click to add screenshots</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {screenshots.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{screenshots.length} screenshot{screenshots.length !== 1 ? 's' : ''} attached</p>
            <div className="grid grid-cols-2 gap-2">
              {screenshots.map((s, i) => (
                <div key={i} className="relative group border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <img src={s.dataUrl} alt={s.name} className="w-full h-24 object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  <button
                    onClick={() => removeScreenshot(i)}
                    className="absolute top-0 right-0 w-8 h-8 bg-red-500 dark:bg-red-600 text-white rounded-full text-xs opacity-80 hover:opacity-100 transition-opacity flex items-center justify-center"
                    aria-label={`Remove ${s.name}`}
                  >
                    &times;
                  </button>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate px-1 py-0.5">{s.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => onContinue(responseText, screenshots)}
        className="w-full p-3 rounded-xl bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-semibold hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors"
      >
        I've saved the response -- continue
      </button>
    </div>
  )
}
