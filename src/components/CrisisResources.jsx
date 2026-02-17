import { useState } from 'react'
import { crisisResources } from '../data/resources'
import ThemeToggle from './ThemeToggle'
import QuickExit from './QuickExit'

export default function CrisisResources({ elevated = false, onShowResources }) {
  const [expanded, setExpanded] = useState(false)

  const barBg = elevated
    ? 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800'
    : 'bg-white/95 dark:bg-slate-800/95 border-slate-200 dark:border-slate-700 backdrop-blur-sm'

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 border-t ${barBg}`}>
      {/* Main footer bar */}
      <div className="max-w-5xl mx-auto px-2 sm:px-3 flex items-center min-h-[52px] gap-2">
        {/* Left: theme toggle */}
        <div className="shrink-0" data-print-hide>
          <ThemeToggle />
        </div>

        {/* Center: hotlines */}
        <div className="flex-1 flex items-center justify-center gap-1 sm:gap-3 flex-wrap text-xs sm:text-sm min-w-0">
          <span className={`font-medium shrink-0 ${elevated ? 'text-amber-800 dark:text-amber-300' : 'text-slate-600 dark:text-slate-300'}`}>
            Help is available
          </span>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline" aria-hidden="true">|</span>
          {crisisResources.map((r, i) => (
            <span key={r.name} className="flex items-center gap-1 shrink-0">
              {r.phone ? (
                <a href={`tel:${r.phone.replace(/-/g, '')}`} className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-50 font-medium whitespace-nowrap">
                  {r.phone}
                </a>
              ) : (
                <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap">{r.text}</span>
              )}
              {i < crisisResources.length - 1 && (
                <span className="text-slate-300 dark:text-slate-600 ml-1" aria-hidden="true">&middot;</span>
              )}
            </span>
          ))}
          {onShowResources && (
            <button
              onClick={onShowResources}
              className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 underline underline-offset-2 transition-colors hidden sm:inline"
            >
              More
            </button>
          )}
          {/* Mobile expand */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 dark:text-slate-500 sm:hidden"
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse resources' : 'Expand resources'}
          >
            <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>

        {/* Right: emergency exit */}
        <div className="shrink-0" data-print-hide>
          <QuickExit />
        </div>
      </div>

      {/* Expanded detail (mobile only) */}
      {expanded && (
        <div className="sm:hidden px-3 pb-3 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-2">
          {crisisResources.map((r) => (
            <div key={r.name} className="text-xs text-slate-600 dark:text-slate-300">
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900 dark:hover:text-slate-50">
                {r.name}
              </a>
              {r.phone && <a href={`tel:${r.phone.replace(/-/g, '')}`} className="ml-2 text-slate-800 dark:text-slate-100 font-medium">{r.phone}</a>}
              {r.text && <span className="ml-2 text-slate-500 dark:text-slate-400">{r.text}</span>}
            </div>
          ))}
          {onShowResources && (
            <button
              onClick={onShowResources}
              className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 underline underline-offset-2 transition-colors min-h-[44px] py-1"
            >
              Many more resources available
            </button>
          )}
        </div>
      )}
    </div>
  )
}
