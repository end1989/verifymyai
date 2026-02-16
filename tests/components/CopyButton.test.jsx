import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CopyButton from '../../src/components/CopyButton'

describe('CopyButton', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue() },
    })
  })

  it('copies text to clipboard on click', async () => {
    render(<CopyButton text="test prompt" />)
    fireEvent.click(screen.getByRole('button', { name: /copy/i }))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test prompt')
  })

  it('shows confirmation after copying', async () => {
    render(<CopyButton text="test prompt" />)
    fireEvent.click(screen.getByRole('button', { name: /copy/i }))
    expect(await screen.findByText(/copied/i)).toBeInTheDocument()
  })
})
