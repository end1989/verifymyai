import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DocumentationPrompt from '../../src/components/DocumentationPrompt'

describe('DocumentationPrompt', () => {
  const defaultProps = {
    promptId: 'A1',
    promptTitle: 'Surface all stored memories',
    onContinue: vi.fn(),
  }

  it('renders the documentation prompt warning', () => {
    render(<DocumentationPrompt {...defaultProps} />)
    expect(screen.getByText(/document this before moving on/i)).toBeInTheDocument()
  })

  it('displays the follow-up prompt text for known prompt IDs', () => {
    render(<DocumentationPrompt {...defaultProps} />)
    // A1 doc prompt contains "factual report about every memory entry"
    expect(screen.getByText(/factual report about every memory entry/i)).toBeInTheDocument()
  })

  it('renders copy button for the prompt', () => {
    render(<DocumentationPrompt {...defaultProps} />)
    expect(screen.getByRole('button', { name: /copy prompt/i })).toBeInTheDocument()
  })

  it('renders textarea for pasting AI response', () => {
    render(<DocumentationPrompt {...defaultProps} />)
    const textarea = screen.getByPlaceholderText(/paste the ai's response/i)
    expect(textarea).toBeInTheDocument()
  })

  it('allows typing in the response textarea', () => {
    render(<DocumentationPrompt {...defaultProps} />)
    const textarea = screen.getByPlaceholderText(/paste the ai's response/i)
    fireEvent.change(textarea, { target: { value: 'Test response' } })
    expect(textarea.value).toBe('Test response')
  })

  it('calls onContinue with response text when continue button is clicked', () => {
    const onContinue = vi.fn()
    render(<DocumentationPrompt {...defaultProps} onContinue={onContinue} />)
    const textarea = screen.getByPlaceholderText(/paste the ai's response/i)
    fireEvent.change(textarea, { target: { value: 'My AI response' } })
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(onContinue).toHaveBeenCalledWith('My AI response', [])
  })

  it('renders screenshot upload area', () => {
    render(<DocumentationPrompt {...defaultProps} />)
    expect(screen.getByText(/click to add screenshots/i)).toBeInTheDocument()
  })

  it('uses fallback prompt for unknown prompt IDs', () => {
    render(<DocumentationPrompt {...defaultProps} promptId="UNKNOWN" promptTitle="Custom Check" />)
    // Fallback prompt contains the prompt title
    expect(screen.getByText(/custom check/i)).toBeInTheDocument()
  })
})
