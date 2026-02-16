import { crisisResources } from '../data/resources'

export default function CrisisResources({ elevated = false }) {
  return (
    <div className={`fixed bottom-4 left-4 z-50 text-sm rounded-lg p-3 shadow-sm ${elevated ? 'bg-amber-50 border border-amber-200 shadow-md' : 'bg-white/90 border border-slate-200 backdrop-blur-sm'}`}>
      <p className={`font-medium mb-2 ${elevated ? 'text-amber-800' : 'text-slate-700'}`}>
        Help is available
      </p>
      <div className="space-y-1.5">
        {crisisResources.map((r) => (
          <div key={r.name} className="text-slate-600">
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900">
              {r.name}
            </a>
            {r.phone && <span className="ml-2">{r.phone}</span>}
            {r.text && <span className="ml-2 text-slate-500">{r.text}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
