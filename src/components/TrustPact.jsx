export default function TrustPact() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
      <h2 className="font-semibold text-slate-800">Why this site exists</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        This site is not a business. Nobody makes money from it. There are no investors, no sponsors, no ads, no premium tiers. It was built because someone we care about needed it and it didn't exist. It is here to help. That is the only reason it exists.
      </p>

      <h3 className="font-semibold text-slate-800 text-sm">Our promise to you</h3>
      <ul className="space-y-1.5 text-sm text-slate-600">
        <li>No data leaves your browser. Ever. Nothing is sent anywhere.</li>
        <li>No accounts. No sign-ups. No email capture.</li>
        <li>No cookies. No analytics. No tracking pixels.</li>
        <li>No ads. No sponsors. No monetization of any kind.</li>
        <li>We do not store, track, or collect anything about you or your visit.</li>
        <li>Your results aren't stored -- close the tab and they're gone.</li>
        <li>This site works offline once loaded.</li>
        <li>The code is open source -- anyone can verify these claims.</li>
      </ul>

      <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs text-slate-500 leading-relaxed">
        <p>
          The <strong>EXIT NOW</strong> button in the top-right corner (or press <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded font-mono">Esc</kbd>) will take you to Google instantly and scrub this site from your browser history. The back button won't bring you here. We built that in because we understand why you might need it.
        </p>
      </div>
    </div>
  )
}
