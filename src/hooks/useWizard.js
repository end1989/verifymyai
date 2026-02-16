import { useState } from 'react'

export function useWizard(steps) {
  const [stepIndex, setStepIndex] = useState(0)

  return {
    currentStep: steps[stepIndex],
    stepIndex,
    next({ skipEvidence } = {}) {
      setStepIndex((i) => {
        let nextIndex = i + 1
        if (skipEvidence && steps[nextIndex] === 'evidence') {
          nextIndex++
        }
        return Math.min(nextIndex, steps.length - 1)
      })
    },
    back() {
      setStepIndex((i) => Math.max(i - 1, 0))
    },
    goTo(stepName) {
      const idx = steps.indexOf(stepName)
      if (idx !== -1) setStepIndex(idx)
    },
  }
}
