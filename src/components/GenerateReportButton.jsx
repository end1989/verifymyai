import { useState } from 'react'
import { generateReport } from '../utils/generateReport'
import { exportPlainText, exportJSON } from '../utils/exportFormats'

export default function GenerateReportButton({ platform, records, findings, severity, auditStartTime }) {
  const [generating, setGenerating] = useState(false)

  const exportParams = { platform, records, findings, severity, auditStartTime }

  async function handleGenerate() {
    setGenerating(true)
    try {
      await generateReport(exportParams)
    } finally {
      setGenerating(false)
    }
  }

  const totalScreenshots = records.reduce((sum, r) => sum + (r.screenshots?.length || 0), 0)

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3" data-print-hide>
      <h3 className="font-semibold text-slate-800">Download your documentation package</h3>
      <p className="text-sm text-slate-600">
        Download a zip file containing your complete audit report as a PDF and all {totalScreenshots > 0 ? `${totalScreenshots} ` : ''}screenshots organized in a Screenshots folder. The PDF includes the full timeline -- every step, every prompt used, every response you pasted{totalScreenshots > 0 ? ', and your screenshots embedded inline' : ''}. Print it, save it, or share it with someone you trust.
      </p>
      <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs text-slate-500 space-y-1">
        <p>Everything is created entirely in your browser. Nothing is uploaded or sent anywhere. Works offline.</p>
        {totalScreenshots > 0 && (
          <p className="font-medium text-slate-600">
            Your package will contain: 1 PDF report + {totalScreenshots} screenshot{totalScreenshots !== 1 ? 's' : ''} in a Screenshots folder.
          </p>
        )}
      </div>
      <button
        onClick={handleGenerate}
        disabled={generating}
        className="w-full p-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-wait"
      >
        {generating ? 'Building your package...' : 'Download Documentation Package (.zip)'}
      </button>
      <div className="flex gap-2">
        <button
          onClick={() => exportPlainText(exportParams)}
          className="flex-1 p-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Export as Plain Text
        </button>
        <button
          onClick={() => exportJSON(exportParams)}
          className="flex-1 p-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Export as JSON
        </button>
      </div>
    </div>
  )
}
