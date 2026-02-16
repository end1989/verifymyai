import { useState } from 'react'
import { prompts } from '../data/prompts'
import PromptStep from '../components/PromptStep'
import DocumentationPrompt from '../components/DocumentationPrompt'
import { docPrompts, fallbackDocPrompt } from '../components/DocumentationPrompt'
import ProgressBar from '../components/ProgressBar'

export default function AuditFlow({ platformId, tier, onComplete, onFinding, onRecord }) {
  const tierPrompts = prompts.filter((p) => p.tier <= tier)
  const [stepIndex, setStepIndex] = useState(0)
  const [showDocPrompt, setShowDocPrompt] = useState(false)
  const [pendingResult, setPendingResult] = useState(null)

  const currentPrompt = tierPrompts[stepIndex]
  const isLast = stepIndex === tierPrompts.length - 1

  function handleResult(level) {
    if (level === 'yellow' || level === 'red') {
      setPendingResult(level)
      setShowDocPrompt(true)
      return
    }

    recordAndAdvance(level)
  }

  function handleDocContinue(responseText, hasScreenshot) {
    const docPromptUsed = docPrompts[currentPrompt.id] || fallbackDocPrompt(currentPrompt.title)

    if (onRecord) {
      onRecord({
        promptId: currentPrompt.id,
        level: pendingResult,
        responseText: responseText || '',
        hasScreenshot: hasScreenshot || false,
        docPromptUsed,
      })
    }

    setShowDocPrompt(false)
    recordAndAdvance(pendingResult)
    setPendingResult(null)
  }

  function recordAndAdvance(level) {
    if (level === 'green' && onRecord) {
      onRecord({
        promptId: currentPrompt.id,
        level: 'green',
        responseText: '',
        hasScreenshot: false,
        docPromptUsed: null,
      })
    }

    onFinding({
      promptId: currentPrompt.id,
      level,
      note: '',
    })

    if (isLast) {
      onComplete()
    } else {
      setStepIndex((i) => i + 1)
    }
  }

  if (!currentPrompt) return null

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500 mb-2">
          Prompt {stepIndex + 1} of {tierPrompts.length}
          {tier === 1 && ' (Quick Check)'}
          {tier === 2 && ' (Full Audit)'}
          {tier === 3 && ' (Deep Dig)'}
        </p>
        <ProgressBar current={stepIndex + 1} total={tierPrompts.length} />
      </div>

      {showDocPrompt ? (
        <DocumentationPrompt
          promptId={currentPrompt.id}
          promptTitle={currentPrompt.title}
          onContinue={handleDocContinue}
        />
      ) : (
        <PromptStep
          key={currentPrompt.id}
          prompt={currentPrompt}
          platformId={platformId}
          onResult={handleResult}
        />
      )}
    </div>
  )
}
