import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FindingCard from '../../src/components/FindingCard'

describe('FindingCard', () => {
  const mockPrompt = { title: 'Check for hidden frameworks' }

  it('renders prompt title', () => {
    render(<FindingCard finding={{ promptId: 'B1', level: 'green', note: '' }} prompt={mockPrompt} />)
    expect(screen.getByText('Check for hidden frameworks')).toBeInTheDocument()
  })

  it('shows green label with icon for normal findings', () => {
    render(<FindingCard finding={{ promptId: 'B1', level: 'green', note: '' }} prompt={mockPrompt} />)
    expect(screen.getByText(/nothing unusual/i)).toBeInTheDocument()
  })

  it('shows yellow label with icon for watch findings', () => {
    render(<FindingCard finding={{ promptId: 'B1', level: 'yellow', note: '' }} prompt={mockPrompt} />)
    expect(screen.getByText(/worth watching/i)).toBeInTheDocument()
  })

  it('shows red label with icon for concerning findings', () => {
    render(<FindingCard finding={{ promptId: 'B1', level: 'red', note: '' }} prompt={mockPrompt} />)
    expect(screen.getByText(/concern detected/i)).toBeInTheDocument()
  })

  it('renders note when provided', () => {
    render(<FindingCard finding={{ promptId: 'B1', level: 'red', note: 'Found suspicious framework' }} prompt={mockPrompt} />)
    expect(screen.getByText('Found suspicious framework')).toBeInTheDocument()
  })

  it('falls back to promptId when no prompt is provided', () => {
    render(<FindingCard finding={{ promptId: 'B1', level: 'green', note: '' }} prompt={null} />)
    expect(screen.getByText('B1')).toBeInTheDocument()
  })
})
