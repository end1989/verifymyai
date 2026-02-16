import { jsPDF } from 'jspdf'
import { prompts } from '../data/prompts'
import { platforms } from '../data/platforms'

const promptMap = Object.fromEntries(prompts.map((p) => [p.id, p]))

const severityLabels = {
  clean: 'Nothing Unusual Found',
  green: 'Nothing Unusual Found',
  yellow: 'Items Worth Watching',
  red: 'Concerns Detected',
}

export function generateReport({ platform, records, findings, severity, auditStartTime }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = margin

  function checkPage(needed = 20) {
    if (y + needed > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage()
      y = margin
    }
  }

  function addText(text, x, fontSize, style = 'normal', color = [30, 41, 59]) {
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', style)
    doc.setTextColor(...color)
    const lines = doc.splitTextToSize(text, contentWidth - (x - margin))
    checkPage(lines.length * fontSize * 0.5)
    doc.text(lines, x, y)
    y += lines.length * fontSize * 0.45 + 2
    return lines.length
  }

  function addLine() {
    checkPage(8)
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, y, pageWidth - margin, y)
    y += 6
  }

  // === HEADER ===
  addText('AI Safety Audit Report', margin, 22, 'bold')
  y += 2
  addText('Generated locally in browser -- no data was transmitted', margin, 9, 'italic', [100, 116, 139])
  y += 4

  // === METADATA ===
  const platformInfo = platforms.find((p) => p.id === platform)
  const auditDate = new Date(auditStartTime).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  addText(`Date: ${auditDate}`, margin, 10)
  addText(`Platform: ${platformInfo?.name || platform}`, margin, 10)
  addText(`Overall Result: ${severityLabels[severity] || severity}`, margin, 10, 'bold',
    severity === 'red' ? [185, 28, 28] : severity === 'yellow' ? [180, 83, 9] : [22, 101, 52])
  addText(`Steps Completed: ${records.length}`, margin, 10)
  y += 4
  addLine()

  // === DISCLAIMER ===
  checkPage(30)
  addText('About This Report', margin, 12, 'bold')
  addText(
    'This report was generated entirely within the user\'s web browser using AI Safety Check (ai-safety-check). No data was uploaded, transmitted, or stored on any server. The report documents the steps taken during an AI safety audit and includes any responses the user chose to paste from their AI assistant. Screenshots referenced in this report were taken by the user and should be included as supplementary evidence.',
    margin, 8, 'normal', [71, 85, 105]
  )
  y += 2
  addText(
    'This tool provided prompts for the user to copy into their AI assistant. We cannot verify that the prompts were used exactly as provided, or that the responses pasted here are unmodified. Supplementary screenshots of the actual AI conversations should be considered the primary evidence.',
    margin, 8, 'normal', [71, 85, 105]
  )
  y += 4
  addLine()

  // === AUDIT TIMELINE ===
  addText('Audit Timeline', margin, 16, 'bold')
  y += 4

  records.forEach((record, index) => {
    checkPage(50)
    const prompt = promptMap[record.promptId]
    const stepTime = new Date(record.timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit',
    })

    // Step header
    addText(`Step ${index + 1}: ${prompt?.title || record.promptId}`, margin, 12, 'bold')
    addText(`Time: ${stepTime}`, margin + 2, 9, 'normal', [100, 116, 139])

    const levelColor = record.level === 'red' ? [185, 28, 28]
      : record.level === 'yellow' ? [180, 83, 9]
      : [22, 101, 52]

    const levelLabel = record.level === 'red' ? 'CONCERN DETECTED'
      : record.level === 'yellow' ? 'WORTH WATCHING'
      : 'NORMAL'
    addText(`Result: ${levelLabel}`, margin + 2, 9, 'bold', levelColor)

    // What was checked
    if (prompt?.description) {
      addText(`What was checked: ${prompt.description}`, margin + 2, 9, 'normal', [71, 85, 105])
    }

    // The audit prompt that was suggested
    y += 2
    addText('Audit prompt provided to user:', margin + 2, 8, 'bold', [71, 85, 105])
    if (prompt?.prompt) {
      addText(prompt.prompt, margin + 6, 7, 'italic', [100, 116, 139])
    }

    // The documentation follow-up prompt (for yellow/red)
    if (record.docPromptUsed) {
      y += 2
      addText('Documentation follow-up prompt provided to user:', margin + 2, 8, 'bold', [71, 85, 105])
      addText(record.docPromptUsed, margin + 6, 7, 'italic', [100, 116, 139])
    }

    // User's pasted response
    if (record.responseText) {
      y += 2
      addText('AI response (pasted by user):', margin + 2, 8, 'bold', [71, 85, 105])
      addText(record.responseText, margin + 6, 8)
    }

    // Screenshot note
    if (record.hasScreenshot) {
      addText('[User indicated a screenshot was taken for this step]', margin + 2, 8, 'italic', [100, 116, 139])
    }

    y += 4
    if (index < records.length - 1) addLine()
  })

  // === SUMMARY ===
  addLine()
  checkPage(40)
  addText('Summary of Findings', margin, 16, 'bold')
  y += 4

  const redFindings = findings.filter((f) => f.level === 'red')
  const yellowFindings = findings.filter((f) => f.level === 'yellow')
  const greenFindings = findings.filter((f) => f.level === 'green')

  if (redFindings.length > 0) {
    addText(`Concerns detected: ${redFindings.length}`, margin + 2, 10, 'bold', [185, 28, 28])
    redFindings.forEach((f) => {
      const p = promptMap[f.promptId]
      addText(`- ${p?.title || f.promptId}`, margin + 6, 9, 'normal', [185, 28, 28])
    })
    y += 2
  }

  if (yellowFindings.length > 0) {
    addText(`Items worth watching: ${yellowFindings.length}`, margin + 2, 10, 'bold', [180, 83, 9])
    yellowFindings.forEach((f) => {
      const p = promptMap[f.promptId]
      addText(`- ${p?.title || f.promptId}`, margin + 6, 9, 'normal', [180, 83, 9])
    })
    y += 2
  }

  if (greenFindings.length > 0) {
    addText(`Normal results: ${greenFindings.length}`, margin + 2, 10, 'normal', [22, 101, 52])
  }

  // === FOOTER ===
  y += 8
  addLine()
  addText(
    'This report was generated locally by AI Safety Check. No data was transmitted. For questions about AI safety auditing, visit the project repository.',
    margin, 8, 'italic', [148, 163, 184]
  )

  // Save
  const dateStr = new Date().toISOString().slice(0, 10)
  doc.save(`ai-safety-audit-${dateStr}.pdf`)
}
