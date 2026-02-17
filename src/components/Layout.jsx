import QuickExit from './QuickExit'
import CrisisResources from './CrisisResources'
import InstallPrompt from './InstallPrompt'
import ThemeToggle from './ThemeToggle'

export default function Layout({ children, elevatedCrisis = false, onShowResources }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ThemeToggle />
      <QuickExit />
      <main id="main-content" className="max-w-2xl mx-auto px-4 py-12 pb-56">
        {children}
      </main>
      <InstallPrompt />
      <aside aria-label="Crisis resources">
        <CrisisResources elevated={elevatedCrisis} onShowResources={onShowResources} />
      </aside>
    </div>
  )
}
