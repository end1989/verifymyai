import ThemeToggle from './ThemeToggle'
import QuickExit from './QuickExit'

// The always-visible bar offers *direction* rather than bare phone numbers:
// each chip opens the full resource list scrolled to the category it names, where
// every hotline has a label + a line of context. (Numbers live there, not here.)
const QUICK_CATEGORIES = [
  { id: 'crisis', label: 'Immediate crisis' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'lgbtq', label: 'LGBTQ+' },
  { id: 'youth', label: 'Young people' },
  { id: 'legal', label: 'Legal' },
]

export default function CrisisResources({ elevated = false, onShowResources }) {
  const barBg = elevated
    ? 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800'
    : 'bg-white/95 dark:bg-slate-800/95 border-slate-200 dark:border-slate-700 backdrop-blur-sm'

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 border-t ${barBg}`}>
      <div className="max-w-5xl mx-auto px-2 sm:px-3 flex items-center min-h-[52px] gap-2">
        {/* Left: theme toggle */}
        <div className="shrink-0" data-print-hide>
          <ThemeToggle />
        </div>

        {/* Center: help is available + directed category links */}
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <span className={`font-medium shrink-0 text-xs sm:text-sm ${elevated ? 'text-amber-800 dark:text-amber-300' : 'text-slate-700 dark:text-slate-200'}`}>
            Help is available
          </span>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline shrink-0" aria-hidden="true">|</span>
          <nav
            aria-label="Find help by who it is for"
            className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap py-1"
          >
            <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0 hidden sm:inline">Find the right help:</span>
            {QUICK_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => onShowResources?.(c.id)}
                className="shrink-0 px-2.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                aria-label={`Resources: ${c.label}`}
              >
                {c.label}
              </button>
            ))}
            <button
              onClick={() => onShowResources?.()}
              className="shrink-0 px-2.5 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 underline underline-offset-2 transition-colors"
            >
              More
            </button>
          </nav>
        </div>

        {/* Right: emergency exit */}
        <div className="shrink-0" data-print-hide>
          <QuickExit />
        </div>
      </div>
    </div>
  )
}
