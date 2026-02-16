import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ActionSteps from '../../src/pages/ActionSteps'

describe('ActionSteps', () => {
  it('shows security steps for red severity', () => {
    render(<ActionSteps platformId="chatgpt" severity="red" />)
    expect(screen.getByText(/change.*password/i)).toBeInTheDocument()
  })

  it('shows the neutralizer prompt for red severity', () => {
    render(<ActionSteps platformId="chatgpt" severity="red" />)
    const matches = screen.getAllByText(/neutralizer prompt/i)
    expect(matches.length).toBeGreaterThan(0)
  })

  it('shows periodic recheck advice for clean severity', () => {
    render(<ActionSteps platformId="chatgpt" severity="clean" />)
    expect(screen.getByText(/every few months/i)).toBeInTheDocument()
  })
})
