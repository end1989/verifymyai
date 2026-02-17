import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ResourcesPage from '../../src/pages/ResourcesPage'

describe('ResourcesPage', () => {
  it('renders heading and close button', () => {
    render(<ResourcesPage onClose={vi.fn()} />)
    expect(screen.getByRole('heading', { name: /you are not alone/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /close resources/i })).toBeInTheDocument()
  })

  it('renders all 11 category accordion buttons', () => {
    render(<ResourcesPage onClose={vi.fn()} />)
    const buttons = screen.getAllByRole('button', { expanded: false })
    // 11 categories + close button + return button = at least 11 accordion buttons
    expect(buttons.length).toBeGreaterThanOrEqual(11)
  })

  it('expands a category on click and shows resources', () => {
    render(<ResourcesPage onClose={vi.fn()} />)
    const crisisButton = screen.getByRole('button', { name: /immediate crisis support/i })
    fireEvent.click(crisisButton)
    expect(crisisButton).toHaveAttribute('aria-expanded', 'true')
    // Should now see at least one organization link
    expect(screen.getByText(/national domestic violence hotline/i)).toBeInTheDocument()
  })

  it('renders tel: links for phone numbers', () => {
    render(<ResourcesPage onClose={vi.fn()} />)
    // Expand crisis category
    fireEvent.click(screen.getByRole('button', { name: /immediate crisis support/i }))
    const phoneLinks = screen.getAllByRole('link').filter(
      (link) => link.getAttribute('href')?.startsWith('tel:')
    )
    expect(phoneLinks.length).toBeGreaterThan(0)
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<ResourcesPage onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: /close resources/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose on Escape key', () => {
    const onClose = vi.fn()
    render(<ResourcesPage onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('has dialog role and aria-modal', () => {
    render(<ResourcesPage onClose={vi.fn()} />)
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })
})
