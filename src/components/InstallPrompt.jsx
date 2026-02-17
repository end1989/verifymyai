import { useState, useEffect } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Don't show if user previously dismissed
    if (localStorage.getItem('pwa-install-dismissed')) {
      setDismissed(true)
      return
    }

    function handleBeforeInstall(e) {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
  }, [])

  function handleInstall() {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then(() => {
      setDeferredPrompt(null)
    })
  }

  function handleDismiss() {
    localStorage.setItem('pwa-install-dismissed', '1')
    setDismissed(true)
    setDeferredPrompt(null)
  }

  if (!deferredPrompt || dismissed) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 mx-auto max-w-md z-40" data-print-hide>
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-4 py-3 flex items-center justify-between gap-3 text-sm">
        <span className="text-slate-600">
          Install this app for offline access
        </span>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-slate-600 px-3 py-2 min-h-[44px]"
          >
            Not now
          </button>
          <button
            onClick={handleInstall}
            className="bg-blue-600 text-white px-4 py-2 min-h-[44px] rounded hover:bg-blue-700"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  )
}
