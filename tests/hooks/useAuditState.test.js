import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useAuditState } from '../../src/hooks/useAuditState'

describe('useAuditState', () => {
  it('starts with no findings and no platform', () => {
    const { result } = renderHook(() => useAuditState())
    expect(result.current.platform).toBe(null)
    expect(result.current.findings).toEqual([])
    expect(result.current.severity).toBe('clean')
  })

  it('sets platform', () => {
    const { result } = renderHook(() => useAuditState())
    act(() => result.current.setPlatform('chatgpt'))
    expect(result.current.platform).toBe('chatgpt')
  })

  it('adds a green finding', () => {
    const { result } = renderHook(() => useAuditState())
    act(() => result.current.addFinding({ promptId: 'A1', level: 'green', note: 'Nothing unusual' }))
    expect(result.current.findings).toHaveLength(1)
    expect(result.current.severity).toBe('clean')
  })

  it('escalates to yellow', () => {
    const { result } = renderHook(() => useAuditState())
    act(() => result.current.addFinding({ promptId: 'A1', level: 'yellow', note: 'Something odd' }))
    expect(result.current.severity).toBe('yellow')
  })

  it('escalates to red', () => {
    const { result } = renderHook(() => useAuditState())
    act(() => result.current.addFinding({ promptId: 'A1', level: 'yellow', note: 'Odd' }))
    act(() => result.current.addFinding({ promptId: 'B1', level: 'red', note: 'Framework found' }))
    expect(result.current.severity).toBe('red')
  })

  it('does not downgrade severity', () => {
    const { result } = renderHook(() => useAuditState())
    act(() => result.current.addFinding({ promptId: 'B1', level: 'red', note: 'Bad' }))
    act(() => result.current.addFinding({ promptId: 'A1', level: 'green', note: 'Fine' }))
    expect(result.current.severity).toBe('red')
  })

  it('tracks current tier', () => {
    const { result } = renderHook(() => useAuditState())
    expect(result.current.currentTier).toBe(1)
    act(() => result.current.setCurrentTier(2))
    expect(result.current.currentTier).toBe(2)
  })
})
