import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CrisisResources from '../../src/components/CrisisResources'

describe('CrisisResources', () => {
  it('renders "Help is available" always visible', () => {
    render(<CrisisResources />)
    expect(screen.getByText(/help is available/i)).toBeInTheDocument()
  })

  it('always shows resources without needing a click', () => {
    render(<CrisisResources />)
    expect(screen.getByText(/National Domestic Violence Hotline/i)).toBeInTheDocument()
  })

  it('uses elevated styling when elevated prop is true', () => {
    const { container } = render(<CrisisResources elevated />)
    expect(container.firstChild.className).toContain('bg-amber-50')
  })
})
