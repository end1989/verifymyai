import { generateReport } from '../utils/generateReport'

export default function GenerateReportButton({ platform, records, findings, severity, auditStartTime }) {
  function handleGenerate() {
    generateReport({ platform, records, findings, severity, auditStartTime })
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
      <h3 className="font-semibold text-slate-800">Generate your audit report</h3>
      <p className="text-sm text-slate-600">
        Create a PDF document of your entire audit -- every step, every prompt used, every response you pasted, organized as a clear timeline. This is the document you can print, save, or share with someone you trust.
      </p>
      <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-xs text-slate-500">
        This PDF is created entirely in your browser. Nothing is uploaded or sent anywhere. This works even if you're offline.
      </div>
      <button
        onClick={handleGenerate}
        className="w-full p-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors"
      >
        Generate PDF Report
      </button>
    </div>
  )
}
