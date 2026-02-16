import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EvidenceKit from '../../src/pages/EvidenceKit'

describe('EvidenceKit', () => {
  it('renders platform-specific evidence steps', () => {
    render(<EvidenceKit platformId="chatgpt" onDone={() => {}} />)
    expect(screen.getByText(/export your data/i)).toBeInTheDocument()
  })

  it('renders the comparison test step', () => {
    render(<EvidenceKit platformId="chatgpt" onDone={() => {}} />)
    const matches = screen.getAllByText(/comparison test/i)
    expect(matches.length).toBeGreaterThan(0)
  })

  it('shows the "before we clean" message', () => {
    render(<EvidenceKit platformId="chatgpt" onDone={() => {}} />)
    expect(screen.getByText(/before we clean anything up/i)).toBeInTheDocument()
  })
})
