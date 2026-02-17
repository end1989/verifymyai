const stepLabels = {
  landing: 'Home',
  platform: 'Choose Platform',
  audit: 'Safety Check',
  results: 'Results',
  evidence: 'Evidence',
  actions: 'Next Steps',
}

export default function WizardNav({ currentStep, onBack, onStartOver, canGoBack }) {
  // Don't show nav on the landing page
  if (currentStep === 'landing') return null

  return (
    <nav aria-label="Audit navigation" className="flex items-center justify-between mb-6 pt-2">
      <div className="flex items-center gap-3">
        {canGoBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors min-h-[44px] min-w-[44px]"
            aria-label="Go back"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
        <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
          {stepLabels[currentStep] || currentStep}
        </span>
      </div>

      <button
        onClick={onStartOver}
        className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline underline-offset-2 min-h-[44px] px-2"
      >
        Start over
      </button>
    </nav>
  )
}
