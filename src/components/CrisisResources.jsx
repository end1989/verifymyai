import { useState } from 'react'
import { crisisResources } from '../data/resources'

export default function CrisisResources({ elevated = false }) {
  const [open, setOpen] = useState(elevated)

  return (
    <div className={`fixed bottom-4 left-4 z-50 text-sm ${elevated ? 'bg-amber-50 border border-amber-200 rounded-lg p-3 shadow-md' : ''}`}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="text-slate-500 hover:text-slate-700 underline underline-offset-2"
        >
          Need to talk to a person?
        </button>
      ) : (
        <div className="space-y-2">
          <p className="font-medium text-slate-700">
            Need to talk to a person?
          </p>
          {crisisResources.map((r) => (
            <div key={r.name} className="text-slate-600">
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900">
                {r.name}
              </a>
              {r.phone && <span className="ml-2">{r.phone}</span>}
              {r.text && <span className="ml-2 text-slate-500">{r.text}</span>}
            </div>
          ))}
          {!elevated && (
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs">
              close
            </button>
          )}
        </div>
      )}
    </div>
  )
}
