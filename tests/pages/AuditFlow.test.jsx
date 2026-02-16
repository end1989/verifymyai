import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AuditFlow from '../../src/pages/AuditFlow'

describe('AuditFlow', () => {
  it('renders the first tier 1 prompt', () => {
    render(<AuditFlow platformId="chatgpt" tier={1} onComplete={() => {}} onFinding={() => {}} />)
    expect(screen.getByText(/Surface all stored memories/i)).toBeInTheDocument()
  })

  it('shows progress indicator', () => {
    render(<AuditFlow platformId="chatgpt" tier={1} onComplete={() => {}} onFinding={() => {}} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
