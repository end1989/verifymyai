import { useEffect, useState } from 'react'

function quickExit() {
  // Clear anything we might have in sessionStorage/localStorage
  try {
    sessionStorage.clear()
  } catch { /* ignore */ }

  // Overwrite the current history entry so the back button doesn't show this site
  // Push multiple neutral entries to bury any trace in the history stack
  const safeUrl = 'https://www.google.com'
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
          aria-label="Leave this site quickly -- clears your visit from browser history"
          className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all text-base tracking-wide"
        >
          EXIT NOW
        </button>

        {showHint && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 text-white text-xs rounded-lg p-3 shadow-xl leading-relaxed pointer-events-none">
            <p className="font-medium mb-1">Quick escape (or press Esc)</p>
            <p>Takes you to Google instantly. Clears this site from your browser history so the back button won't bring you here.</p>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-1 text-right">
        or press <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-500 text-xs font-mono">Esc</kbd>
      </p>
    </div>
  )
}
