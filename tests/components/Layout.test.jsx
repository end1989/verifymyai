import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Layout from '../../src/components/Layout'

describe('Layout', () => {
  it('renders children', () => {
    render(
      <Layout onShowResources={vi.fn()}>
        <p>Test content</p>
      </Layout>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('always renders CrisisResources', () => {
    render(
      <Layout onShowResources={vi.fn()}>
        <p>Page</p>
      </Layout>
    )
    expect(screen.getAllByText(/help is available/i).length).toBeGreaterThan(0)
  })

  it('renders Emergency Exit button', () => {
    render(
      <Layout onShowResources={vi.fn()}>
        <p>Page</p>
      </Layout>
    )
    expect(screen.getByRole('button', { name: /leave this site/i })).toBeInTheDocument()
  })

  it('renders skip-to-content link', () => {
    render(
      <Layout onShowResources={vi.fn()}>
        <p>Page</p>
      </Layout>
    )
    expect(screen.getByText(/skip to main content/i)).toBeInTheDocument()
  })

  it('renders main landmark', () => {
    render(
      <Layout onShowResources={vi.fn()}>
        <p>Page</p>
      </Layout>
    )
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders crisis resources in aside landmark', () => {
    render(
      <Layout onShowResources={vi.fn()}>
        <p>Page</p>
      </Layout>
    )
    expect(screen.getByRole('complementary', { name: /crisis resources/i })).toBeInTheDocument()
  })
})
