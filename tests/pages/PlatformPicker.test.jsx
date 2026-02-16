import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PlatformPicker from '../../src/pages/PlatformPicker'

describe('PlatformPicker', () => {
  it('renders all platforms', () => {
    render(<PlatformPicker onSelect={() => {}} />)
    expect(screen.getByText('ChatGPT')).toBeInTheDocument()
    expect(screen.getByText('Claude')).toBeInTheDocument()
    expect(screen.getByText('Gemini')).toBeInTheDocument()
    expect(screen.getByText(/Other/)).toBeInTheDocument()
  })

  it('calls onSelect with platform id when a card is clicked', () => {
    const onSelect = vi.fn()
    render(<PlatformPicker onSelect={onSelect} />)
    fireEvent.click(screen.getByText('ChatGPT'))
    expect(onSelect).toHaveBeenCalledWith('chatgpt')
  })
})
