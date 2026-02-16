import { evidenceSteps } from '../data/evidence'
import CopyButton from '../components/CopyButton'
import ScreenshotGuide from '../components/ScreenshotGuide'

export default function EvidenceKit({ platformId, onDone }) {
  const steps = evidenceSteps[platformId] || evidenceSteps.other

  return (
    <div className="space-y-8">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h1 className="text-xl font-bold text-amber-800">Document before you clean</h1>
        <p className="text-amber-700 mt-2">
          Before we clean anything up, let's document what's here. Once it's removed, it's gone. If you ever need to show someone what happened, this is your window.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border ${
              step.important
                ? 'border-amber-200 bg-amber-50'
                : 'border-slate-200 bg-white'
            }`}
          >
            <h3 className="font-semibold text-slate-800">
              {i + 1}. {step.title}
              {step.important && <span className="ml-2 text-xs font-medium text-amber-600 uppercase">Important</span>}
            </h3>
            <p className="text-sm text-slate-600 mt-1">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-slate-800">Metadata prompt</h3>
        <p className="text-sm text-slate-600">
          Use this neutral prompt to get your AI to list everything it's working with, including dates:
        </p>
        <blockquote className="text-slate-700 text-sm border-l-2 border-slate-300 pl-3">
          List every custom instruction, memory entry, or standing directive currently active on my account. For each one, include when it was created or last modified if that information is available.
        </blockquote>
        <CopyButton text="List every custom instruction, memory entry, or standing directive currently active on my account. For each one, include when it was created or last modified if that information is available." />
      </div>

      <ScreenshotGuide />

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-slate-800">Save your documentation</h3>
        <p className="text-sm text-slate-600">
          Save your screenshots, data exports, and comparison test results somewhere safe that only you can access. A personal email draft, a USB drive, or a trusted friend's device. Write down today's date and what you found.
        </p>
      </div>

      <button
        onClick={onDone}
        className="w-full p-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors"
      >
        I've documented what I need -- continue to cleanup
      </button>
    </div>
  )
}
