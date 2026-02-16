import { jsPDF } from 'jspdf'
import JSZip from 'jszip'
import { prompts } from '../data/prompts'
import { platforms } from '../data/platforms'

const promptMap = Object.fromEntries(prompts.map((p) => [p.id, p]))

const severityLabels = {
  clean: 'Nothing Unusual Found',
  green: 'Nothing Unusual Found',
  yellow: 'Items Worth Watching',
  red: 'Concerns Detected',
}

function getImageDimensions(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.width, height: img.height })
    img.onerror = () => resolve({ width: 0, height: 0 })
    img.src = dataUrl
  })
}

function getImageFormat(name, type) {
  if (type === 'image/png' || name.toLowerCase().endsWith('.png')) return 'PNG'
  if (type === 'image/webp' || name.toLowerCase().endsWith('.webp')) return 'WEBP'
  return 'JPEG'
}

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_')
}

export async function generateReport({ platform, records, findings, severity, auditStartTime }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const zip = new JSZip()
  const dateStr = new Date().toISOString().slice(0, 10)
  const folderName = `AI-Safety-Audit-${dateStr}`
  const screenshotsFolder = zip.folder(`${folderName}/Screenshots`)

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = margin

  function checkPage(needed = 20) {
    if (y + needed > pageHeight - margin) {
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

  // Track all screenshot filenames for the index
  const screenshotIndex = []

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

  // Count total screenshots
  const totalScreenshots = records.reduce((sum, r) => sum + (r.screenshots?.length || 0), 0)
  if (totalScreenshots > 0) {
    addText(`Screenshots Included: ${totalScreenshots} (see Screenshots folder)`, margin, 10)
  }
  y += 4
  addLine()

  // === DISCLAIMER ===
  checkPage(30)
  addText('About This Report', margin, 12, 'bold')
  addText(
    'This report was generated entirely within the user\'s web browser using AI Safety Check (ai-safety-check). No data was uploaded, transmitted, or stored on any server. The report documents the steps taken during an AI safety audit and includes any responses the user chose to paste from their AI assistant.',
    margin, 8, 'normal', [71, 85, 105]
  )
  y += 2
  addText(
    'This tool provided prompts for the user to copy into their AI assistant. We cannot verify that the prompts were used exactly as provided, or that the responses pasted here are unmodified. Screenshots of the actual AI conversations are included in the Screenshots folder of this package and should be considered the primary evidence.',
    margin, 8, 'normal', [71, 85, 105]
  )

  if (totalScreenshots > 0) {
    y += 2
    addText(
      `This report package contains ${totalScreenshots} screenshot(s) taken by the user during the audit process. Each screenshot is referenced by filename within the timeline below and can be found in the Screenshots/ folder.`,
      margin, 8, 'normal', [71, 85, 105]
    )
  }

  y += 4
  addLine()

  // === AUDIT TIMELINE ===
  addText('Audit Timeline', margin, 16, 'bold')
  y += 4

  for (let index = 0; index < records.length; index++) {
    const record = records[index]
    checkPage(50)
    const prompt = promptMap[record.promptId]
    const stepTime = new Date(record.timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit',
    })
    const stepNum = String(index + 1).padStart(2, '0')

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

    // Screenshots for this step
    const stepScreenshots = record.screenshots || []
    if (stepScreenshots.length > 0) {
      y += 2
      addText(`Screenshots (${stepScreenshots.length}):`, margin + 2, 8, 'bold', [71, 85, 105])

      for (let si = 0; si < stepScreenshots.length; si++) {
        const screenshot = stepScreenshots[si]
        const ext = screenshot.name.split('.').pop() || 'png'
        const filename = `Step-${stepNum}-${record.promptId}-${si + 1}.${ext}`
        const sanitized = sanitizeFilename(filename)

        // Add to zip Screenshots folder
        const base64Data = screenshot.dataUrl.split(',')[1]
        screenshotsFolder.file(sanitized, base64Data, { base64: true })
        screenshotIndex.push({ step: index + 1, promptId: record.promptId, filename: sanitized, originalName: screenshot.name })

        // Reference in PDF
        addText(`  Screenshot: ${sanitized}  (original: ${screenshot.name})`, margin + 4, 8, 'normal', [71, 85, 105])

        // Embed the image in the PDF
        try {
          const dims = await getImageDimensions(screenshot.dataUrl)
          if (dims.width > 0 && dims.height > 0) {
            const format = getImageFormat(screenshot.name, screenshot.type)
            const maxImgWidth = contentWidth - 10
            const maxImgHeight = 100
            let imgWidth = maxImgWidth
            let imgHeight = (dims.height / dims.width) * imgWidth
            if (imgHeight > maxImgHeight) {
              imgHeight = maxImgHeight
              imgWidth = (dims.width / dims.height) * imgHeight
            }
            checkPage(imgHeight + 8)
            doc.addImage(screenshot.dataUrl, format, margin + 5, y, imgWidth, imgHeight)
            y += imgHeight + 4
          }
        } catch {
          addText('  [Image could not be embedded -- see Screenshots folder]', margin + 4, 7, 'italic', [148, 163, 184])
        }
      }
    }

    y += 4
    if (index < records.length - 1) addLine()
  }

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

  // === SCREENSHOT INDEX ===
  if (screenshotIndex.length > 0) {
    y += 4
    addLine()
    checkPage(30)
    addText('Screenshot Index', margin, 16, 'bold')
    y += 2
    addText(
      'The following screenshots are included in the Screenshots/ folder of this package. Each filename corresponds to the audit step where it was captured.',
      margin, 8, 'normal', [71, 85, 105]
    )
    y += 2

    screenshotIndex.forEach((s) => {
      checkPage(12)
      addText(`Step ${s.step} (${s.promptId}):  ${s.filename}`, margin + 2, 8)
    })
  }

  // === FOOTER ===
  y += 8
  addLine()
  addText(
    'This report was generated locally by AI Safety Check. No data was transmitted. Keep this package (PDF + Screenshots folder) together for complete documentation.',
    margin, 8, 'italic', [148, 163, 184]
  )

  // Add PDF to zip
  const pdfBlob = doc.output('blob')
  zip.file(`${folderName}/AI-Safety-Audit-Report.pdf`, pdfBlob)

  // Generate and download zip
  const zipBlob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(zipBlob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${folderName}.zip`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
