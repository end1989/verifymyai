export default function TrustPact() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4">
      <h2 className="font-semibold text-slate-800 dark:text-slate-100">Why this site exists</h2>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        This site is not a business. Nobody makes money from it. There are no investors, no sponsors, no ads, no premium tiers. It was built because someone we care about needed it and it didn't exist. It is here to help. That is the only reason it exists.
      </p>

      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">Our promise to you</h3>
      <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
        <li>No data leaves your browser. Ever. Nothing is sent anywhere.</li>
        <li>No accounts. No sign-ups. No email capture.</li>
        <li>No cookies. No analytics. No tracking pixels.</li>
        <li>No ads. No sponsors. No monetization of any kind.</li>
        <li>We do not store, track, or collect anything about you or your visit.</li>
        <li>Your results aren't stored -- close the tab and they're gone.</li>
        <li>This site works offline once loaded.</li>
        <li>The code is open source -- anyone can verify these claims.</li>
      </ul>

      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        <p>
          The <strong>Emergency Exit</strong> button in the bottom-right corner (or press <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono">Esc</kbd>) will take you to a boring cooking Google search instantly (so it looks ordinary if someone walks in) and replace this tab's history entry. The back button won't bring you here. We sincerely hope this is a precaution that is never needed, and it breaks our hearts that it might be. If you need it, you're not overreacting — you're protecting yourself. You're seen, and you're loved.
        </p>
      </div>
    </div>
  )
}
