import { useState } from 'react'
import { crisisResources } from '../data/resources'

export default function CrisisResources({ elevated = false, onShowResources }) {
  const [expanded, setExpanded] = useState(false)
  const primary = crisisResources[0]

  return (
    <div className={`fixed bottom-0 left-0 right-0 sm:bottom-4 sm:left-4 sm:right-auto z-50 text-sm sm:rounded-lg rounded-none ${elevated ? 'bg-amber-50 dark:bg-amber-950 border-t sm:border border-amber-200 dark:border-amber-800 shadow-md' : 'bg-white/95 dark:bg-slate-800/95 border-t sm:border border-slate-200 dark:border-slate-700 backdrop-blur-sm shadow-sm'}`}>
      {/* Mobile: compact bar */}
      <div className="sm:hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-3 py-2.5 min-h-[44px]"
          aria-expanded={expanded}
        >
          <span className={`font-medium text-xs ${elevated ? 'text-amber-800 dark:text-amber-300' : 'text-slate-600 dark:text-slate-300'}`}>
            Help is available
            <span className="text-slate-400 dark:text-slate-500 font-normal ml-2">{primary.phone}</span>
          </span>
          <svg className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        {expanded && (
          <div className="px-3 pb-3 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-2">
            {crisisResources.map((r) => (
              <div key={r.name} className="text-slate-600 dark:text-slate-300 text-xs">
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

      {/* Desktop: full panel */}
      <div className="hidden sm:block p-3">
        <p className={`font-medium mb-2 ${elevated ? 'text-amber-800 dark:text-amber-300' : 'text-slate-700 dark:text-slate-200'}`}>
          Help is available
        </p>
        <div className="space-y-1.5">
          {crisisResources.map((r) => (
            <div key={r.name} className="text-slate-600 dark:text-slate-300">
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900 dark:hover:text-slate-50">
                {r.name}
              </a>
              {r.phone && <span className="ml-2">{r.phone}</span>}
              {r.text && <span className="ml-2 text-slate-500 dark:text-slate-400">{r.text}</span>}
            </div>
          ))}
        </div>
        {onShowResources && (
          <button
            onClick={onShowResources}
            className="mt-1 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 underline underline-offset-2 transition-colors min-h-[44px] py-2"
          >
            Many more resources available
          </button>
        )}
      </div>
    </div>
  )
}
