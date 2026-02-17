import CopyButton from './CopyButton'

export default function PromptStep({ prompt, platformId, onResult }) {
  const platformNote = prompt.platformNotes?.[platformId] || prompt.platformNotes?.other || null

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{prompt.title}</h2>
        <p className="text-slate-600 dark:text-slate-300 mt-1">{prompt.description}</p>
      </div>

      {platformNote && (
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-lg p-3 text-sm text-blue-800 dark:text-blue-300">
          {platformNote}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Copy this prompt and paste it into your AI:</p>
        <blockquote className="text-slate-700 dark:text-slate-200 whitespace-pre-line text-sm leading-relaxed border-l-2 border-slate-300 dark:border-slate-600 pl-3">
          {prompt.prompt}
        </blockquote>
        <CopyButton text={prompt.prompt} />
      </div>

      <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-5 mt-2">
        <p className="font-semibold text-slate-800 dark:text-slate-100 text-lg">What did you see?</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Click the one that best matches the response you got.</p>

        {[
          { level: 'green', label: 'Looks normal', items: prompt.lookFor.normal, stripe: 'bg-green-500 dark:bg-green-600', text: 'text-green-800 dark:text-green-300', subtext: 'text-green-700 dark:text-green-400', hoverBg: 'hover:bg-green-50 dark:hover:bg-green-900', arrow: 'text-green-400 group-hover:text-green-600' },
          { level: 'yellow', label: 'Something seems off', items: prompt.lookFor.yellow, stripe: 'bg-amber-500 dark:bg-amber-600', text: 'text-amber-800 dark:text-amber-300', subtext: 'text-amber-700 dark:text-amber-400', hoverBg: 'hover:bg-amber-50 dark:hover:bg-amber-900', arrow: 'text-amber-400 group-hover:text-amber-600' },
          { level: 'red', label: 'This is concerning', items: prompt.lookFor.red, stripe: 'bg-red-500 dark:bg-red-600', text: 'text-red-800 dark:text-red-300', subtext: 'text-red-700 dark:text-red-400', hoverBg: 'hover:bg-red-50 dark:hover:bg-red-900', arrow: 'text-red-400 group-hover:text-red-600' },
        ].map(({ level, label, items, stripe, text, subtext, hoverBg, arrow }) => (
          <button
            key={level}
            onClick={() => onResult(level)}
            className={`group w-full text-left flex items-stretch rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 ${hoverBg} hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all cursor-pointer shadow-sm overflow-hidden`}
          >
            <div className={`${stripe} w-2 shrink-0 rounded-l-xl`} />
            <div className="flex-1 p-4">
              <span className={`font-semibold ${text}`}>{label}</span>
              <ul className={`mt-1.5 text-sm ${subtext} list-disc list-inside`}>
                {items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className={`flex items-center pr-4 ${arrow} transition-colors`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
