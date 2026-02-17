import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TrustPact from '../../src/components/TrustPact'

describe('TrustPact', () => {
  it('renders the heading', () => {
    render(<TrustPact />)
    expect(screen.getByRole('heading', { name: /why this site exists/i })).toBeInTheDocument()
  })

  it('renders the promise section', () => {
    render(<TrustPact />)
    expect(screen.getByText(/our promise to you/i)).toBeInTheDocument()
  })

  it('lists key privacy commitments', () => {
    render(<TrustPact />)
    expect(screen.getByText(/no data leaves your browser/i)).toBeInTheDocument()
    expect(screen.getByText(/no cookies/i)).toBeInTheDocument()
    expect(screen.getByText(/open source/i)).toBeInTheDocument()
  })

  it('mentions Emergency Exit', () => {
    render(<TrustPact />)
    expect(screen.getByText(/emergency exit/i)).toBeInTheDocument()
  })
})
