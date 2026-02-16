import QuickExit from './QuickExit'
import CrisisResources from './CrisisResources'

export default function Layout({ children, elevatedCrisis = false, onShowResources }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <QuickExit />
      <main className="max-w-2xl mx-auto px-4 py-12 pb-24">
        {children}
      </main>
      <CrisisResources elevated={elevatedCrisis} onShowResources={onShowResources} />
    </div>
  )
}
