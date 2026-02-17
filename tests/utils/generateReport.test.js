import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock jsPDF
const mockDoc = {
  internal: { pageSize: { getWidth: () => 210, getHeight: () => 297 } },
  setFontSize: vi.fn(),
  setFont: vi.fn(),
  setTextColor: vi.fn(),
  setDrawColor: vi.fn(),
  splitTextToSize: vi.fn((text) => [text]),
  text: vi.fn(),
  line: vi.fn(),
  addPage: vi.fn(),
  addImage: vi.fn(),
  output: vi.fn(() => new Blob(['pdf-content'], { type: 'application/pdf' })),
}

vi.mock('jspdf', () => ({
  jsPDF: function MockJsPDF() { return mockDoc },
}))

// Mock JSZip
const mockFolder = { file: vi.fn() }
const mockZip = {
  folder: vi.fn(() => mockFolder),
  file: vi.fn(),
  generateAsync: vi.fn().mockResolvedValue(new Blob(['zip-content'], { type: 'application/zip' })),
}

vi.mock('jszip', () => ({
  default: function MockJSZip() { return mockZip },
}))

const { generateReport } = await import('../../src/utils/generateReport')

describe('generateReport', () => {
  let mockAnchor

  beforeEach(() => {
    vi.clearAllMocks()
    mockDoc.splitTextToSize.mockImplementation((text) => [text])
    mockDoc.output.mockReturnValue(new Blob(['pdf'], { type: 'application/pdf' }))
    mockZip.generateAsync.mockResolvedValue(new Blob(['zip'], { type: 'application/zip' }))

    // Mock Image so onload fires immediately (jsdom doesn't load images)
    globalThis.Image = class {
      constructor() { this.width = 200; this.height = 150 }
      set src(_val) { setTimeout(() => this.onload?.(), 0) }
    }

    globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
    globalThis.URL.revokeObjectURL = vi.fn()

    mockAnchor = { href: '', download: '', click: vi.fn() }
    vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor)
    vi.spyOn(document.body, 'appendChild').mockImplementation(() => {})
    vi.spyOn(document.body, 'removeChild').mockImplementation(() => {})
  })

  const baseParams = {
    platform: 'chatgpt',
    records: [
      { promptId: 'A1', level: 'green', responseText: '', screenshots: [], docPromptUsed: null, timestamp: Date.now() },
    ],
    findings: [{ promptId: 'A1', level: 'green', note: '' }],
    severity: 'green',
    auditStartTime: Date.now(),
  }

  it('creates a PDF document and outputs blob', async () => {
    await generateReport(baseParams)
    expect(mockDoc.text).toHaveBeenCalled()
    expect(mockDoc.output).toHaveBeenCalledWith('blob')
  })

  it('creates a ZIP with the PDF inside', async () => {
    await generateReport(baseParams)
    expect(mockZip.file).toHaveBeenCalledWith(
      expect.stringMatching(/AI-Safety-Audit.*\.pdf$/),
      expect.any(Blob)
    )
    expect(mockZip.generateAsync).toHaveBeenCalledWith({ type: 'blob' })
  })

  it('triggers a download via anchor click', async () => {
    await generateReport(baseParams)
    expect(document.createElement).toHaveBeenCalledWith('a')
    expect(mockAnchor.click).toHaveBeenCalledOnce()
    expect(mockAnchor.download).toMatch(/AI-Safety-Audit.*\.zip$/)
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
  })

  it('creates a Screenshots folder in ZIP', async () => {
    await generateReport(baseParams)
    expect(mockZip.folder).toHaveBeenCalledWith(expect.stringContaining('Screenshots'))
  })

  it('adds screenshots to ZIP when records have them', async () => {
    const params = {
      ...baseParams,
      records: [{
        promptId: 'A1', level: 'red', responseText: 'response',
        screenshots: [{ name: 'evidence.png', type: 'image/png', dataUrl: 'data:image/png;base64,abc123' }],
        docPromptUsed: 'follow-up', timestamp: Date.now(),
      }],
      findings: [{ promptId: 'A1', level: 'red', note: '' }],
      severity: 'red',
    }
    await generateReport(params)
    expect(mockFolder.file).toHaveBeenCalledWith(
      expect.stringContaining('Step-01-A1'),
      'abc123',
      { base64: true }
    )
  })

  it('includes severity label in PDF', async () => {
    await generateReport(baseParams)
    const allText = mockDoc.text.mock.calls.map((c) => c[0]).flat()
    expect(allText.some((t) => typeof t === 'string' && t.includes('Nothing Unusual Found'))).toBe(true)
  })

  it('uses red severity label for concerning findings', async () => {
    await generateReport({ ...baseParams, severity: 'red', findings: [{ promptId: 'A1', level: 'red', note: '' }] })
    const allText = mockDoc.text.mock.calls.map((c) => c[0]).flat()
    expect(allText.some((t) => typeof t === 'string' && t.includes('Concerns Detected'))).toBe(true)
  })
})
