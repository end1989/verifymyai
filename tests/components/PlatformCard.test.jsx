import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PlatformCard from '../../src/components/PlatformCard'

describe('PlatformCard', () => {
  const platform = {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Custom instructions, memory, uploaded files',
  }

  it('renders platform name and description', () => {
    render(<PlatformCard platform={platform} onSelect={() => {}} />)
    expect(screen.getByText('ChatGPT')).toBeInTheDocument()
    expect(screen.getByText(/Custom instructions/)).toBeInTheDocument()
  })

  it('calls onSelect with platform id on click', () => {
    const onSelect = vi.fn()
    render(<PlatformCard platform={platform} onSelect={onSelect} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onSelect).toHaveBeenCalledWith('chatgpt')
  })
})
