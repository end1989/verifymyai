import { useState, useEffect, useRef, useCallback } from 'react'
import { resourceCategories } from '../data/comprehensiveResources'

export default function ResourcesPage({ onClose }) {
  const [expandedCategory, setExpandedCategory] = useState(null)
  const overlayRef = useRef(null)
  const headingRef = useRef(null)

  const totalOrgs = resourceCategories.reduce((sum, cat) => sum + cat.resources.length, 0)

  function toggleCategory(id) {
    setExpandedCategory((prev) => (prev === id ? null : id))
  }

  // Focus heading on mount
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  // Escape to close + focus trap
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }

    if (e.key === 'Tab') {
      const focusable = overlayRef.current?.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div ref={overlayRef} className="fixed inset-0 z-40 bg-slate-50 dark:bg-slate-900 overflow-y-auto" role="dialog" aria-modal="true" aria-label="Crisis resources">
      <div className="max-w-3xl mx-auto px-4 py-8 pb-24">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-slate-900 dark:text-slate-50 outline-none">You are not alone</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {totalOrgs} organizations across {resourceCategories.length} categories. Every single one of these exists because someone cared enough to build it. Thousands of people wake up every day and go to work at these places specifically to help people in situations like yours.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2 -mr-2 flex-shrink-0"
            aria-label="Close resources"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-8 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Every resource listed here is free or low-cost. Many are 24/7. None of them will judge you or tell you what to do -- they'll listen and help you figure out your options. If one doesn't feel right, try another. The right help is out there.
          </p>
        </div>

        <div className="space-y-3">
          {resourceCategories.map((category) => {
            const isExpanded = expandedCategory === category.id
            return (
              <div key={category.id} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full text-left p-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div>
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">{category.title}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {category.resources.length} organization{category.resources.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic">{category.description}</p>

                    <div className="space-y-3">
                      {category.resources.map((r) => (
                        <div key={r.name} className="border border-slate-100 dark:border-slate-800 rounded-lg p-3 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-slate-800 dark:text-slate-100 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-400 transition-colors text-sm"
                            >
                              {r.name}
                            </a>
                          </div>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                            {r.phone && (
                              <a href={`tel:${r.phone.replace(/[^+\d]/g, '')}`} className="text-blue-700 dark:text-blue-400 font-medium hover:underline">
                                {r.phone}
                              </a>
                            )}
                            {r.text && (
                              <span className="text-slate-500 dark:text-slate-400">{r.text}</span>
                            )}
                          </div>
                          {r.note && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{r.note}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center space-y-4">
          <div className="w-16 h-px bg-slate-200 dark:bg-slate-700 mx-auto" />
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
            {totalOrgs} organizations. Thousands of counselors, advocates, and volunteers. Millions of people who have been where you are and made it through. You are surrounded by people who care, even when it doesn't feel like it.
          </p>
          <button
            onClick={onClose}
            className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 underline underline-offset-2 transition-colors"
          >
            Return to safety check
          </button>
        </div>
      </div>
    </div>
  )
}
