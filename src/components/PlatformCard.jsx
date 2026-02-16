export default function PlatformCard({ platform, onSelect }) {
  return (
    <button
      onClick={() => onSelect(platform.id)}
      className="text-left w-full p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-sm transition-all"
    >
      <h3 className="font-semibold text-slate-800">{platform.name}</h3>
      <p className="text-sm text-slate-500 mt-1">{platform.description}</p>
    </button>
  )
}
