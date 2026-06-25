import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CrisisResources from '../../src/components/CrisisResources'

describe('CrisisResources', () => {
  it('renders "Help is available" always visible', () => {
    render(<CrisisResources />)
    expect(screen.getAllByText(/help is available/i).length).toBeGreaterThan(0)
  })

  it('shows directed help categories without needing a click', () => {
    render(<CrisisResources onShowResources={() => {}} />)
    expect(screen.getByText(/immediate crisis/i)).toBeInTheDocument()
    expect(screen.getByText('Women')).toBeInTheDocument()
    expect(screen.getByText(/legal/i)).toBeInTheDocument()
  })

  it('opens resources to a specific category when a chip is clicked', () => {
    const onShowResources = vi.fn()
    render(<CrisisResources onShowResources={onShowResources} />)
    fireEvent.click(screen.getByText('Women'))
    expect(onShowResources).toHaveBeenCalledWith('women')
  })

  it('uses elevated styling when elevated prop is true', () => {
    const { container } = render(<CrisisResources elevated />)
    expect(container.firstChild.className).toContain('bg-amber-50')
  })
})
