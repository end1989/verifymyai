import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Results from '../../src/pages/Results'

describe('Results', () => {
  it('shows clean message when all green', () => {
    const findings = [{ promptId: 'A1', level: 'green', note: '' }]
    render(<Results findings={findings} severity="clean" tier={1} onContinue={() => {}} onEvidence={() => {}} onCleanup={() => {}} />)
    expect(screen.getByText(/nothing unusual found/i)).toBeInTheDocument()
  })

  it('shows concern message when red', () => {
    const findings = [{ promptId: 'B1', level: 'red', note: '' }]
    render(<Results findings={findings} severity="red" tier={1} onContinue={() => {}} onEvidence={() => {}} onCleanup={() => {}} />)
    expect(screen.getByText(/concerns detected/i)).toBeInTheDocument()
  })

  it('offers to continue to tier 2 after tier 1', () => {
    const findings = [{ promptId: 'A1', level: 'green', note: '' }]
    render(<Results findings={findings} severity="clean" tier={1} onContinue={() => {}} onEvidence={() => {}} onCleanup={() => {}} />)
    expect(screen.getByText(/continue.*full audit/i)).toBeInTheDocument()
  })
})
