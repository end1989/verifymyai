import FindingCard from '../components/FindingCard'
import GenerateReportButton from '../components/GenerateReportButton'
import { prompts } from '../data/prompts'

const promptMap = Object.fromEntries(prompts.map((p) => [p.id, p]))

export default function Results({ platform, findings, records, severity, tier, auditStartTime, onContinue, onEvidence, onCleanup }) {
  return (
    <div className="space-y-8">
      {severity === 'clean' && (
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <h1 className="text-xl font-bold text-green-800 dark:text-green-300">Nothing unusual found</h1>
          <p className="text-green-700 dark:text-green-400 mt-2">
            Based on what you checked, your AI settings look normal. It was worth checking, and now you know. Consider running this check every few months, the way you'd change a password.
          </p>
        </div>
      )}

      {severity === 'yellow' && (
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
          <h1 className="text-xl font-bold text-amber-800 dark:text-amber-300">Some things worth watching</h1>
          <p className="text-amber-700 dark:text-amber-400 mt-2">
            A few things came up that aren't necessarily harmful, but are worth understanding. Review the details below and consider running a deeper check.
          </p>
        </div>
      )}

      {severity === 'red' && (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <h1 className="text-xl font-bold text-red-800 dark:text-red-300">Concerns detected</h1>
          <p className="text-red-700 dark:text-red-400 mt-2">
            Some of what was found is not typical for a normal AI setup. Before making any changes, we recommend documenting what's here. Evidence disappears once you clean it up.
          </p>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">What was found</h2>
        {findings.map((f, i) => (
          <FindingCard key={i} finding={f} prompt={promptMap[f.promptId]} />
        ))}
      </div>

      {records && records.length > 0 && (
        <GenerateReportButton
          platform={platform}
          records={records}
          findings={findings}
          severity={severity}
          auditStartTime={auditStartTime}
        />
      )}

      <div className="space-y-3" data-print-hide>
        {tier < 3 && (
          <button
            onClick={() => onContinue(tier + 1)}
            className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-colors"
          >
            {tier === 1 && 'Continue to Full Audit (deeper check, ~15 min)'}
            {tier === 2 && 'Continue to Deep Dig (thorough check, ~25 min)'}
          </button>
        )}

        {severity === 'red' && (
          <button
            onClick={onEvidence}
            className="w-full p-3 rounded-xl bg-red-600 dark:bg-red-700 text-white font-semibold hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
          >
            Document evidence before cleanup
          </button>
        )}

        <button
          onClick={onCleanup}
          className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-colors"
        >
          {severity === 'red' ? 'Skip to cleanup (not recommended)' : 'View cleanup and next steps'}
        </button>
      </div>
    </div>
  )
}
