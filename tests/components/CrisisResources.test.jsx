import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CrisisResources from '../../src/components/CrisisResources'

describe('CrisisResources', () => {
  it('renders a toggle link', () => {
    render(<CrisisResources />)
    expect(screen.getByText(/need to talk to a person/i)).toBeInTheDocument()
  })

  it('shows resources when toggle is clicked', () => {
    render(<CrisisResources />)
    fireEvent.click(screen.getByText(/need to talk to a person/i))
    expect(screen.getByText(/National Domestic Violence Hotline/i)).toBeInTheDocument()
  })

  it('shows resources expanded when elevated prop is true', () => {
    render(<CrisisResources elevated />)
    expect(screen.getByText(/National Domestic Violence Hotline/i)).toBeInTheDocument()
  })
})
