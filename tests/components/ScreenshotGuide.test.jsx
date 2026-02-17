import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ScreenshotGuide from '../../src/components/ScreenshotGuide'

describe('ScreenshotGuide', () => {
  it('renders collapsed by default', () => {
    render(<ScreenshotGuide />)
    const toggle = screen.getByRole('button', { name: /screenshots that hold up as evidence/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText(/capture your entire screen/i)).not.toBeInTheDocument()
  })

  it('expands on click and shows guidance', () => {
    render(<ScreenshotGuide />)
    fireEvent.click(screen.getByRole('button', { name: /screenshots that hold up as evidence/i }))
    expect(screen.getByText(/capture your entire screen.*not just the window/i)).toBeInTheDocument()
    expect(screen.getByText(/make sure the url bar is visible/i)).toBeInTheDocument()
    expect(screen.getByText(/don't edit or crop/i)).toBeInTheDocument()
  })

  it('collapses again on second click', () => {
    render(<ScreenshotGuide />)
    const toggle = screen.getByRole('button', { name: /screenshots that hold up as evidence/i })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
