import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import GenerateReportButton from '../../src/components/GenerateReportButton'

// Mock generateReport
vi.mock('../../src/utils/generateReport', () => ({
  generateReport: vi.fn().mockResolvedValue(),
}))

import { generateReport } from '../../src/utils/generateReport'

const defaultProps = {
  platform: 'chatgpt',
  records: [
    { promptId: 'A1', level: 'green', responseText: '', screenshots: [], docPromptUsed: null },
  ],
  findings: [{ promptId: 'A1', level: 'green', note: '' }],
  severity: 'green',
  auditStartTime: Date.now(),
}

describe('GenerateReportButton', () => {
  it('renders download button and description', () => {
    render(<GenerateReportButton {...defaultProps} />)
    expect(screen.getByRole('button', { name: /download documentation package/i })).toBeInTheDocument()
    expect(screen.getByText(/download a zip file/i)).toBeInTheDocument()
  })

  it('calls generateReport on click', async () => {
    render(<GenerateReportButton {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /download documentation package/i }))
    await waitFor(() => {
      expect(generateReport).toHaveBeenCalledOnce()
    })
  })

  it('shows loading state while generating', async () => {
    // Make generateReport hang until we resolve it
    let resolve
    generateReport.mockImplementation(() => new Promise((r) => { resolve = r }))

    render(<GenerateReportButton {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: /download documentation package/i }))

    expect(screen.getByRole('button', { name: /building your package/i })).toBeDisabled()

    resolve()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /download documentation package/i })).not.toBeDisabled()
    })
  })

  it('shows screenshot count when records have screenshots', () => {
    const propsWithScreenshots = {
      ...defaultProps,
      records: [
        { promptId: 'A1', level: 'red', responseText: 'test', screenshots: [{ name: 'a.png' }, { name: 'b.png' }], docPromptUsed: 'test' },
      ],
    }
    render(<GenerateReportButton {...propsWithScreenshots} />)
    expect(screen.getByText(/1 PDF report \+ 2 screenshots/i)).toBeInTheDocument()
  })
})
