import { useEffect } from 'react'

function quickExit() {
  window.location.replace('https://www.google.com')
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
      aria-label="Leave this site"
      className="fixed top-4 right-4 z-50 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-md shadow-sm transition-colors"
    >
      Exit
    </button>
  )
}
