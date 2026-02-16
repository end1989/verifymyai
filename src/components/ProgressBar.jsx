export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="w-full bg-slate-200 rounded-full h-2">
      <div
        className="bg-slate-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
      />
    </div>
  )
}
