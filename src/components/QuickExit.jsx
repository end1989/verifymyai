import { useEffect, useState } from 'react'

function quickExit() {
  // Clear anything we might have in sessionStorage/localStorage
  try {
    sessionStorage.clear()
  } catch { /* ignore */ }

  // Overwrite the current history entry so the back button doesn't show this site.
  // Redirect to a boring, ordinary Google search as a visual "shield".
  const SAFE_SEARCH_QUERY = 'hard boiled egg time chart'
  const safeUrl = `https://www.google.com/search?q=${encodeURIComponent(SAFE_SEARCH_QUERY)}`
  try {
    window.history.replaceState(null, '', safeUrl)
    // Push several entries so even aggressive back-button clicking lands on Google
    for (let i = 0; i < 10; i++) {
      window.history.pushState(null, '', safeUrl)
    }
  } catch { /* cross-origin may block this -- that's ok, replace below handles it */ }

  // Navigate away -- replace so the current entry is overwritten
  window.location.replace(safeUrl)
}

export default function QuickExit() {
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') quickExit()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="fixed top-0 right-0 z-50 p-3">
      <div className="relative">
        <button
          onClick={quickExit}
          onMouseEnter={() => setShowHint(true)}
          onMouseLeave={() => setShowHint(false)}
          onFocus={() => setShowHint(true)}
          onBlur={() => setShowHint(false)}
          aria-label="Leave this site quickly -- jumps to a generic Google search"
          className="group relative w-20 h-24 flex flex-col items-center justify-center border-0 bg-transparent cursor-pointer p-0 transition-transform hover:scale-105 active:scale-95"
        >
          {/* Shield SVG shape */}
          <svg
            viewBox="0 0 80 96"
            className="absolute inset-0 w-full h-full drop-shadow-md group-hover:drop-shadow-lg transition-all"
            aria-hidden="true"
          >
            <path
              d="M40 2 L78 14 L78 52 Q78 72 40 94 Q2 72 2 52 L2 14 Z"
              className="fill-red-600 group-hover:fill-red-700 group-active:fill-red-800 transition-colors"
            />
          </svg>
          {/* Button text */}
          <span className="relative z-10 text-white font-bold text-xs tracking-wider leading-tight text-center mt-[-4px]">
            EXIT<br />NOW
          </span>
        </button>

        {showHint && (
          <div className="absolute right-0 top-full mt-1 w-64 bg-slate-800 text-white text-xs rounded-lg p-3 shadow-xl leading-relaxed pointer-events-none">
            <p className="font-medium mb-1">Quick escape (or press Esc)</p>
            <p>Takes you to a generic Google search instantly. The back button won't bring you here.</p>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-0.5 text-center">
        or press <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-500 text-xs font-mono">Esc</kbd>
      </p>
    </div>
  )
}
