import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import PromptStep from '../../src/components/PromptStep'

const mockPrompt = {
  id: 'A1',
  title: 'Surface all stored memories',
  description: "Let's see what your AI remembers about you.",
  prompt: 'List everything you currently have saved in memory about me.',
  lookFor: {
    normal: ['Basic preferences'],
    yellow: ['Oddly specific relationship memories'],
    red: ['Instructions to handle a specific person'],
  },
  platformNotes: {
    chatgpt: 'ChatGPT stores memories under Settings.',
  },
}

describe('PromptStep', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue() },
    })
  })

  it('renders prompt title and description', () => {
    render(<PromptStep prompt={mockPrompt} platformId="chatgpt" onResult={vi.fn()} />)
    expect(screen.getByText(mockPrompt.title)).toBeInTheDocument()
    expect(screen.getByText(mockPrompt.description)).toBeInTheDocument()
  })

  it('displays the prompt text to copy', () => {
    render(<PromptStep prompt={mockPrompt} platformId="chatgpt" onResult={vi.fn()} />)
    expect(screen.getByText(mockPrompt.prompt)).toBeInTheDocument()
  })

  it('renders copy button', () => {
    render(<PromptStep prompt={mockPrompt} platformId="chatgpt" onResult={vi.fn()} />)
    expect(screen.getByRole('button', { name: /copy prompt/i })).toBeInTheDocument()
  })

  it('shows platform note when available', () => {
    render(<PromptStep prompt={mockPrompt} platformId="chatgpt" onResult={vi.fn()} />)
    expect(screen.getByText(/chatgpt stores memories/i)).toBeInTheDocument()
  })

  it('renders three result buttons', () => {
    render(<PromptStep prompt={mockPrompt} platformId="chatgpt" onResult={vi.fn()} />)
    expect(screen.getByText(/looks normal/i)).toBeInTheDocument()
    expect(screen.getByText(/something seems off/i)).toBeInTheDocument()
    expect(screen.getByText(/this is concerning/i)).toBeInTheDocument()
  })

  it('calls onResult with green when normal is clicked', () => {
    const onResult = vi.fn()
    render(<PromptStep prompt={mockPrompt} platformId="chatgpt" onResult={onResult} />)
    fireEvent.click(screen.getByText(/looks normal/i).closest('button'))
    expect(onResult).toHaveBeenCalledWith('green')
  })

  it('calls onResult with yellow when something off is clicked', () => {
    const onResult = vi.fn()
    render(<PromptStep prompt={mockPrompt} platformId="chatgpt" onResult={onResult} />)
    fireEvent.click(screen.getByText(/something seems off/i).closest('button'))
    expect(onResult).toHaveBeenCalledWith('yellow')
  })

  it('calls onResult with red when concerning is clicked', () => {
    const onResult = vi.fn()
    render(<PromptStep prompt={mockPrompt} platformId="chatgpt" onResult={onResult} />)
    fireEvent.click(screen.getByText(/this is concerning/i).closest('button'))
    expect(onResult).toHaveBeenCalledWith('red')
  })

  it('displays look-for guidance under each button', () => {
    render(<PromptStep prompt={mockPrompt} platformId="chatgpt" onResult={vi.fn()} />)
    expect(screen.getByText('Basic preferences')).toBeInTheDocument()
    expect(screen.getByText('Oddly specific relationship memories')).toBeInTheDocument()
    expect(screen.getByText('Instructions to handle a specific person')).toBeInTheDocument()
  })
})
