import PlatformCard from '../components/PlatformCard'
import { platforms } from '../data/platforms'

export default function PlatformPicker({ onSelect }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Which AI tool do you use?</h1>
        <p className="text-slate-600 mt-1">Pick the one you want to check. You can come back and check others later.</p>
      </div>

      <div className="grid gap-3">
        {platforms.map((p) => (
          <PlatformCard key={p.id} platform={p} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
