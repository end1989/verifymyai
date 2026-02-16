import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import QuickExit from '../../src/components/QuickExit'

describe('QuickExit', () => {
  let replaceSpy

  beforeEach(() => {
    replaceSpy = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { replace: replaceSpy },
      writable: true,
    })
  })

  it('renders exit button with accessible label', () => {
    render(<QuickExit />)
    const btn = screen.getByRole('button', { name: /leave this site/i })
    expect(btn).toBeInTheDocument()
  })

  it('redirects to google on click using location.replace', () => {
    render(<QuickExit />)
    fireEvent.click(screen.getByRole('button', { name: /leave this site/i }))
    expect(replaceSpy).toHaveBeenCalledWith('https://www.google.com')
  })

  it('redirects on Escape key press', () => {
    render(<QuickExit />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(replaceSpy).toHaveBeenCalledWith('https://www.google.com')
  })
})
