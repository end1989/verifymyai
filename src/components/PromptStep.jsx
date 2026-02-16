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

      <div className="space-y-3">
        <p className="font-medium text-slate-700">After you get a response, what did you see?</p>

        <button
          onClick={() => onResult('green')}
          className="w-full text-left p-3 rounded-lg border border-green-200 bg-green-50 hover:bg-green-100 transition-colors"
        >
          <span className="font-medium text-green-800">Looks normal</span>
          <ul className="mt-1 text-sm text-green-700 list-disc list-inside">
            {prompt.lookFor.normal.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </button>

        <button
          onClick={() => onResult('yellow')}
          className="w-full text-left p-3 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors"
        >
          <span className="font-medium text-amber-800">Something seems off</span>
          <ul className="mt-1 text-sm text-amber-700 list-disc list-inside">
            {prompt.lookFor.yellow.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </button>

        <button
          onClick={() => onResult('red')}
          className="w-full text-left p-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
        >
          <span className="font-medium text-red-800">This is concerning</span>
          <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
            {prompt.lookFor.red.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </button>
      </div>
    </div>
  )
}
