import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import WizardNav from '../../src/components/WizardNav'

describe('WizardNav', () => {
  it('returns null on the landing page', () => {
    const { container } = render(
      <WizardNav currentStep="landing" canGoBack={false} onBack={vi.fn()} onStartOver={vi.fn()} />
    )
    expect(container.innerHTML).toBe('')
  })

  it('shows current step label', () => {
    render(<WizardNav currentStep="platform" canGoBack={false} onBack={vi.fn()} onStartOver={vi.fn()} />)
    expect(screen.getByText('Choose Platform')).toBeInTheDocument()
  })

  it('shows back button when canGoBack is true', () => {
    render(<WizardNav currentStep="audit" canGoBack={true} onBack={vi.fn()} onStartOver={vi.fn()} />)
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument()
  })

  it('hides back button when canGoBack is false', () => {
    render(<WizardNav currentStep="platform" canGoBack={false} onBack={vi.fn()} onStartOver={vi.fn()} />)
    expect(screen.queryByRole('button', { name: /go back/i })).not.toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn()
    render(<WizardNav currentStep="audit" canGoBack={true} onBack={onBack} onStartOver={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /go back/i }))
    expect(onBack).toHaveBeenCalledOnce()
  })

  it('calls onStartOver when start over is clicked', () => {
    const onStartOver = vi.fn()
    render(<WizardNav currentStep="results" canGoBack={true} onBack={vi.fn()} onStartOver={onStartOver} />)
    fireEvent.click(screen.getByRole('button', { name: /start over/i }))
    expect(onStartOver).toHaveBeenCalledOnce()
  })

  it('renders as nav landmark', () => {
    render(<WizardNav currentStep="audit" canGoBack={true} onBack={vi.fn()} onStartOver={vi.fn()} />)
    expect(screen.getByRole('navigation', { name: /audit navigation/i })).toBeInTheDocument()
  })
})
