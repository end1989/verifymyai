import FindingCard from '../components/FindingCard'
import { prompts } from '../data/prompts'

const promptMap = Object.fromEntries(prompts.map((p) => [p.id, p]))

export default function Results({ findings, severity, tier, onContinue, onEvidence, onCleanup }) {
  return (
    <div className="space-y-8">
      {severity === 'clean' && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h1 className="text-xl font-bold text-green-800">Nothing unusual found</h1>
          <p className="text-green-700 mt-2">
            Based on what you checked, your AI settings look normal. It was worth checking, and now you know. Consider running this check every few months, the way you'd change a password.
          </p>
        </div>
      )}

      {severity === 'yellow' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h1 className="text-xl font-bold text-amber-800">Some things worth watching</h1>
          <p className="text-amber-700 mt-2">
            A few things came up that aren't necessarily harmful, but are worth understanding. Review the details below and consider running a deeper check.
          </p>
        </div>
      )}

      {severity === 'red' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h1 className="text-xl font-bold text-red-800">Concerns detected</h1>
          <p className="text-red-700 mt-2">
            Some of what was found is not typical for a normal AI setup. Before making any changes, we recommend documenting what's here. Evidence disappears once you clean it up.
          </p>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="font-semibold text-slate-800">What was found</h2>
        {findings.map((f, i) => (
          <FindingCard key={i} finding={f} prompt={promptMap[f.promptId]} />
        ))}
      </div>

      <div className="space-y-3">
        {tier < 3 && (
          <button
            onClick={() => onContinue(tier + 1)}
            className="w-full p-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium transition-colors"
          >
            {tier === 1 && 'Continue to Full Audit (deeper check, ~15 min)'}
            {tier === 2 && 'Continue to Deep Dig (thorough check, ~25 min)'}
          </button>
        )}

        {severity === 'red' && (
          <button
            onClick={onEvidence}
            className="w-full p-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
          >
            Document evidence before cleanup
          </button>
        )}

        <button
          onClick={onCleanup}
          className="w-full p-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium transition-colors"
        >
          {severity === 'red' ? 'Skip to cleanup (not recommended)' : 'View cleanup and next steps'}
        </button>
      </div>
    </div>
  )
}
