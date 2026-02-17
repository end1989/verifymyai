import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProgressBar from '../../src/components/ProgressBar'

describe('ProgressBar', () => {
  it('renders with correct progressbar role', () => {
    render(<ProgressBar current={3} total={10} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toBeInTheDocument()
  })

  it('sets correct aria values', () => {
    render(<ProgressBar current={3} total={10} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '3')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '10')
  })

  it('calculates correct width percentage', () => {
    render(<ProgressBar current={5} total={10} />)
    const bar = screen.getByRole('progressbar')
    expect(bar.style.width).toBe('50%')
  })

  it('shows 100% at completion', () => {
    render(<ProgressBar current={10} total={10} />)
    const bar = screen.getByRole('progressbar')
    expect(bar.style.width).toBe('100%')
  })
})
