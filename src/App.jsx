import Layout from './components/Layout'
import WizardNav from './components/WizardNav'
import Landing from './pages/Landing'
import PlatformPicker from './pages/PlatformPicker'
import AuditFlow from './pages/AuditFlow'
import Results from './pages/Results'
import EvidenceKit from './pages/EvidenceKit'
import ActionSteps from './pages/ActionSteps'
import { useWizard } from './hooks/useWizard'
import { useAuditState } from './hooks/useAuditState'

const STEPS = ['landing', 'platform', 'audit', 'results', 'evidence', 'actions']

function App() {
  const wizard = useWizard(STEPS)
  const audit = useAuditState()

  function handlePlatformSelect(platformId) {
    audit.setPlatform(platformId)
    wizard.next()
  }

  function handleAuditComplete() {
    wizard.next()
  }

  function handleContinueAudit(nextTier) {
    audit.setCurrentTier(nextTier)
    wizard.goTo('audit')
  }

  function handleEvidence() {
    wizard.goTo('evidence')
  }

  function handleCleanup() {
    wizard.goTo('actions')
  }

  function handleEvidenceDone() {
    wizard.next()
  }

  function handleStartOver() {
    audit.reset()
    wizard.reset()
  }

  function handleCheckAnother() {
    audit.reset()
    wizard.goTo('platform')
  }

  const page = {
    landing: <Landing onStart={() => wizard.next()} />,
    platform: <PlatformPicker onSelect={handlePlatformSelect} />,
    audit: (
      <AuditFlow
        platformId={audit.platform}
        tier={audit.currentTier}
        onComplete={handleAuditComplete}
        onFinding={audit.addFinding}
        onRecord={audit.addRecord}
      />
    ),
    results: (
      <Results
        platform={audit.platform}
        findings={audit.findings}
        records={audit.records}
        severity={audit.severity}
        tier={audit.currentTier}
        auditStartTime={audit.auditStartTime}
        onContinue={handleContinueAudit}
        onEvidence={handleEvidence}
        onCleanup={handleCleanup}
      />
    ),
    evidence: (
      <EvidenceKit
        platformId={audit.platform}
        onDone={handleEvidenceDone}
      />
    ),
    actions: (
      <ActionSteps
        platformId={audit.platform}
        platform={audit.platform}
        severity={audit.severity}
        records={audit.records}
        findings={audit.findings}
        auditStartTime={audit.auditStartTime}
        onCheckAnother={handleCheckAnother}
        onStartOver={handleStartOver}
      />
    ),
  }

  return (
    <Layout elevatedCrisis={audit.severity === 'red'}>
      <WizardNav
        currentStep={wizard.currentStep}
        canGoBack={wizard.canGoBack}
        onBack={wizard.back}
        onStartOver={handleStartOver}
      />
      {page[wizard.currentStep]}
    </Layout>
  )
}

export default App
