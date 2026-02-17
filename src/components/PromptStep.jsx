import CopyButton from './CopyButton'

export default function PromptStep({ prompt, platformId, onResult }) {
  const platformNote = prompt.platformNotes?.[platformId] || prompt.platformNotes?.other || null

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">{prompt.title}</h2>
        <p className="text-slate-600 mt-1">{prompt.description}</p>
      </div>

      {platformNote && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800">
          {platformNote}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <p className="text-sm font-medium text-slate-500">Copy this prompt and paste it into your AI:</p>
        <blockquote className="text-slate-700 whitespace-pre-line text-sm leading-relaxed border-l-2 border-slate-300 pl-3">
          {prompt.prompt}
        </blockquote>
        <CopyButton text={prompt.prompt} />
      </div>

      <div className="space-y-3 border-t border-slate-200 pt-5 mt-2">
        <p className="font-semibold text-slate-800 text-lg">What did you see?</p>
        <p className="text-sm text-slate-500 mb-1">Click the one that best matches the response you got.</p>

        {[
          { level: 'green', label: 'Looks normal', items: prompt.lookFor.normal, stripe: 'bg-green-500', text: 'text-green-800', subtext: 'text-green-700', hoverBg: 'hover:bg-green-50', arrow: 'text-green-400 group-hover:text-green-600' },
          { level: 'yellow', label: 'Something seems off', items: prompt.lookFor.yellow, stripe: 'bg-amber-500', text: 'text-amber-800', subtext: 'text-amber-700', hoverBg: 'hover:bg-amber-50', arrow: 'text-amber-400 group-hover:text-amber-600' },
          { level: 'red', label: 'This is concerning', items: prompt.lookFor.red, stripe: 'bg-red-500', text: 'text-red-800', subtext: 'text-red-700', hoverBg: 'hover:bg-red-50', arrow: 'text-red-400 group-hover:text-red-600' },
        ].map(({ level, label, items, stripe, text, subtext, hoverBg, arrow }) => (
          <button
            key={level}
            onClick={() => onResult(level)}
            className={`group w-full text-left flex items-stretch rounded-xl border border-slate-200 bg-white ${hoverBg} hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all cursor-pointer shadow-sm overflow-hidden`}
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
