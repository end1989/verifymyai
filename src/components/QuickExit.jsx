import { useEffect } from 'react'

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
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') quickExit()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <button
      onClick={quickExit}
      aria-label="Leave this site quickly -- jumps to a generic Google search"
      className="group relative flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-sm"
    >
      {/* Shield icon */}
      <svg viewBox="0 0 80 96" className="w-4 h-5 shrink-0" aria-hidden="true">
        <path
          d="M40 2 L78 14 L78 52 Q78 72 40 94 Q2 72 2 52 L2 14 Z"
          className="fill-white/90"
        />
      </svg>
      <span>Exit</span>
      <kbd className="ml-1 text-[10px] font-mono text-red-200 font-normal hidden sm:inline">(Esc)</kbd>
    </button>
  )
}
