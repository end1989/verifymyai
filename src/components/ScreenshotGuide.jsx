import { useState } from 'react'

export default function ScreenshotGuide() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 flex justify-between items-center hover:bg-slate-100 transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium text-slate-700 text-sm">How to take screenshots that hold up as evidence</span>
        <span className="text-slate-400 text-xs" aria-hidden="true">{open ? 'close' : 'read this'}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4 text-sm text-slate-600">
          <p className="font-medium text-slate-700">
            A cropped screenshot of just the chat can be dismissed. A full-screen capture with context is much harder to deny. Here's how to do it right:
          </p>

          <div className="space-y-3">
            <div className="pl-3 border-l-2 border-slate-300 space-y-1">
              <p className="font-medium text-slate-700">1. Capture your entire screen -- not just the window</p>
              <p>Use your full-screen screenshot shortcut, not a crop tool. This captures everything visible on your display -- the browser, the taskbar, the clock, any other open windows.</p>
              <p className="text-xs text-slate-500">
                <strong>Windows:</strong> Press the Print Screen key (PrtSc) or Windows + Shift + S and drag to select the full screen.
                <br />
                <strong>Mac:</strong> Press Command + Shift + 3 for full screen.
                <br />
                <strong>Phone:</strong> Use your normal screenshot (usually Power + Volume Down). The status bar with time and date will be included automatically.
              </p>
            </div>

            <div className="pl-3 border-l-2 border-slate-300 space-y-1">
              <p className="font-medium text-slate-700">2. Make sure the URL bar is visible</p>
              <p>The browser address bar proves which website or platform you're on. Don't use full-screen browser mode -- keep the URL bar showing. It should display something like <span className="font-mono text-xs">chatgpt.com</span> or <span className="font-mono text-xs">claude.ai</span>.</p>
            </div>

            <div className="pl-3 border-l-2 border-slate-300 space-y-1">
              <p className="font-medium text-slate-700">3. Make sure your system clock is visible</p>
              <p>Your computer's taskbar or menu bar usually shows the time. This should be visible in the screenshot. On a phone, the status bar time serves the same purpose.</p>
            </div>

            <div className="pl-3 border-l-2 border-amber-300 space-y-1">
              <p className="font-medium text-amber-800">4. Open a date-verification tab (strongest timestamp)</p>
              <p>Before taking the screenshot, open a second browser tab to a live news website (like a major news outlet's homepage) or a time-verification site. Don't switch to it -- just let it be visible as a tab title. The specific headline or timestamp on that tab can be independently verified to a specific date and time, making it very difficult to claim the screenshot was taken on a different day.</p>
            </div>

            <div className="pl-3 border-l-2 border-slate-300 space-y-1">
              <p className="font-medium text-slate-700">5. Email it to yourself immediately</p>
              <p>Right after taking the screenshot, email it to yourself. Email timestamps are set by the mail server, not your device -- this creates an independent, verifiable record of when the screenshot existed. Use a personal email account only you have access to.</p>
            </div>

            <div className="pl-3 border-l-2 border-slate-300 space-y-1">
              <p className="font-medium text-slate-700">6. Don't edit or crop</p>
              <p>Save the original, unedited screenshot. Cropping, highlighting, or annotating can be done on copies, but keep the original untouched. Edited images are easier to challenge.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-1">
            <p className="font-medium text-slate-700">Quick checklist before you take each screenshot:</p>
            <ul className="list-none space-y-1 text-slate-600">
              <li>&#9744; Full screen capture (not cropped)</li>
              <li>&#9744; URL bar visible showing the platform</li>
              <li>&#9744; System clock/time visible</li>
              <li>&#9744; News site or time reference open in another tab</li>
              <li>&#9744; Email it to yourself right after</li>
              <li>&#9744; Keep the original unedited</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
