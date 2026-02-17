export default function PlatformCard({ platform, onSelect }) {
  return (
    <button
      onClick={() => onSelect(platform.id)}
      className="text-left w-full p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-sm transition-all"
    >
      <h3 className="font-semibold text-slate-800 dark:text-slate-100">{platform.name}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{platform.description}</p>
    </button>
  )
}
