import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CrisisResources from '../../src/components/CrisisResources'

describe('CrisisResources', () => {
  it('renders "Help is available" always visible', () => {
    render(<CrisisResources />)
    expect(screen.getAllByText(/help is available/i).length).toBeGreaterThan(0)
  })

  it('always shows hotline numbers without needing a click', () => {
    render(<CrisisResources />)
    expect(screen.getByText('1-800-799-7233')).toBeInTheDocument()
  })

  it('uses elevated styling when elevated prop is true', () => {
    const { container } = render(<CrisisResources elevated />)
    expect(container.firstChild.className).toContain('bg-amber-50')
  })
})
