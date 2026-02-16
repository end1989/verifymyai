import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Landing from '../../src/pages/Landing'

describe('Landing', () => {
  it('renders the headline', () => {
    render(<Landing onStart={() => {}} />)
    expect(screen.getByText(/check if your ai is really yours/i)).toBeInTheDocument()
  })

  it('renders the trust pact', () => {
    render(<Landing onStart={() => {}} />)
    expect(screen.getByText(/our promise to you/i)).toBeInTheDocument()
  })

  it('calls onStart when start button is clicked', () => {
    const onStart = vi.fn()
    render(<Landing onStart={onStart} />)
    fireEvent.click(screen.getByRole('button', { name: /start checking/i }))
    expect(onStart).toHaveBeenCalled()
  })
})
