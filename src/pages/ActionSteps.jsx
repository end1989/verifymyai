import { cleanupSteps } from '../data/cleanup'
import { neutralizerPrompt } from '../data/prompts'
import CopyButton from '../components/CopyButton'
import GenerateReportButton from '../components/GenerateReportButton'

export default function ActionSteps({ platformId, platform, severity, records, findings, auditStartTime }) {
  const steps = cleanupSteps[platformId] || cleanupSteps.other

  if (severity === 'clean') {
    return (
      <div className="space-y-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h1 className="text-xl font-bold text-green-800">You're in good shape</h1>
          <p className="text-green-700 mt-2">
            Your AI settings look normal. Here's how to keep it that way.
          </p>
        </div>
        <div className="space-y-3 text-slate-600">
          <p>Run this check every few months, the same way you'd update a password.</p>
          <p>If you share devices or accounts with anyone, consider setting up a separate AI account that only you access.</p>
          <p>Trust your instincts. If your AI ever starts feeling "off" -- like it's pushing you in a direction -- come back and check.</p>
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
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">
        {severity === 'red' ? 'Clean up and secure your account' : 'Next steps'}
      </h1>

      {(severity === 'red' || severity === 'yellow') && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
          <h2 className="font-semibold text-slate-800">Neutralizer prompt</h2>
          <p className="text-sm text-slate-600">
            Use this in your current AI conversation to immediately reset its behavior while you clean up:
          </p>
          <blockquote className="text-slate-700 text-sm border-l-2 border-slate-300 pl-3 whitespace-pre-line">
            {neutralizerPrompt}
          </blockquote>
          <CopyButton text={neutralizerPrompt} />
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold text-slate-800">Immediate steps</h2>
          <ul className="mt-2 space-y-2">
            {steps.immediate.map((s, i) => (
              <li key={i} className="text-sm text-slate-600 pl-4 border-l-2 border-slate-300">{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-slate-800">Secure your account</h2>
          <ul className="mt-2 space-y-2">
            {steps.security.map((s, i) => (
              <li key={i} className="text-sm text-slate-600 pl-4 border-l-2 border-red-300">{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-slate-800">Thorough cleanup</h2>
          <ul className="mt-2 space-y-2">
            {steps.thorough.map((s, i) => (
              <li key={i} className="text-sm text-slate-600 pl-4 border-l-2 border-slate-200">{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {severity === 'red' && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600 space-y-2">
          <p className="font-medium text-slate-700">You don't have to figure this out alone.</p>
          <p>If you think someone intentionally tampered with your AI to influence you, that's a form of manipulation. You deserve support from people you trust.</p>
        </div>
      )}

      {records && records.length > 0 && (
        <GenerateReportButton
          platform={platform}
          records={records}
          findings={findings}
          severity={severity}
          auditStartTime={auditStartTime}
        />
      )}
    </div>
  )
}
