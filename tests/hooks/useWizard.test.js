import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useWizard } from '../../src/hooks/useWizard'

describe('useWizard', () => {
  const steps = ['landing', 'platform', 'audit', 'results', 'evidence', 'actions']

  it('starts at the first step', () => {
    const { result } = renderHook(() => useWizard(steps))
    expect(result.current.currentStep).toBe('landing')
    expect(result.current.stepIndex).toBe(0)
  })

  it('goes forward', () => {
    const { result } = renderHook(() => useWizard(steps))
    act(() => result.current.next())
    expect(result.current.currentStep).toBe('platform')
  })

  it('goes back', () => {
    const { result } = renderHook(() => useWizard(steps))
    act(() => result.current.next())
    act(() => result.current.back())
    expect(result.current.currentStep).toBe('landing')
  })

  it('does not go before first step', () => {
    const { result } = renderHook(() => useWizard(steps))
    act(() => result.current.back())
    expect(result.current.stepIndex).toBe(0)
  })

  it('does not go past last step', () => {
    const { result } = renderHook(() => useWizard(steps))
    steps.forEach(() => act(() => result.current.next()))
    act(() => result.current.next())
    expect(result.current.stepIndex).toBe(steps.length - 1)
  })

  it('jumps to a named step', () => {
    const { result } = renderHook(() => useWizard(steps))
    act(() => result.current.goTo('results'))
    expect(result.current.currentStep).toBe('results')
  })

  it('skips evidence step when not needed', () => {
    const { result } = renderHook(() => useWizard(steps))
    act(() => result.current.goTo('results'))
    act(() => result.current.next({ skipEvidence: true }))
    expect(result.current.currentStep).toBe('actions')
  })
})
