import { prompts } from '../data/prompts'
import { platforms } from '../data/platforms'

const promptMap = Object.fromEntries(prompts.map((p) => [p.id, p]))

const severityLabels = {
  clean: 'Nothing Unusual Found',
  green: 'Nothing Unusual Found',
  yellow: 'Items Worth Watching',
  red: 'Concerns Detected',
}

function buildReportData({ platform, records, findings, severity, auditStartTime }) {
  const platformInfo = platforms.find((p) => p.id === platform)
  const auditDate = new Date(auditStartTime).toISOString()

  return {
    platform: platformInfo?.name || platform,
    platformId: platform,
    auditDate,
    severity,
    severityLabel: severityLabels[severity] || severity,
    stepsCompleted: records.length,
    totalScreenshots: records.reduce((sum, r) => sum + (r.screenshots?.length || 0), 0),
    timeline: records.map((r, i) => {
      const prompt = promptMap[r.promptId]
      return {
        step: i + 1,
        promptId: r.promptId,
        title: prompt?.title || r.promptId,
        description: prompt?.description || '',
        promptText: prompt?.prompt || '',
        level: r.level,
        levelLabel: r.level === 'red' ? 'CONCERN DETECTED' : r.level === 'yellow' ? 'WORTH WATCHING' : 'NORMAL',
        responseText: r.responseText || '',
        docPromptUsed: r.docPromptUsed || null,
        screenshotCount: r.screenshots?.length || 0,
        timestamp: new Date(r.timestamp).toISOString(),
      }
    }),
    findings: findings.map((f) => {
      const p = promptMap[f.promptId]
      return {
        promptId: f.promptId,
        title: p?.title || f.promptId,
        level: f.level,
        note: f.note || '',
      }
    }),
  }
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function exportJSON(params) {
  const data = buildReportData(params)
  const dateStr = new Date().toISOString().slice(0, 10)
  const json = JSON.stringify(data, null, 2)
  downloadFile(json, `AI-Safety-Audit-${dateStr}.json`, 'application/json')
}

export function exportPlainText(params) {
  const data = buildReportData(params)
  const dateStr = new Date().toISOString().slice(0, 10)
  const lines = []

  lines.push('AI SAFETY AUDIT REPORT')
  lines.push('='.repeat(40))
  lines.push('')
  lines.push('Generated locally in browser -- no data was transmitted.')
  lines.push('')
  lines.push(`Date: ${new Date(data.auditDate).toLocaleString()}`)
  lines.push(`Platform: ${data.platform}`)
  lines.push(`Overall Result: ${data.severityLabel}`)
  lines.push(`Steps Completed: ${data.stepsCompleted}`)
  if (data.totalScreenshots > 0) {
    lines.push(`Screenshots Taken: ${data.totalScreenshots}`)
  }
  lines.push('')
  lines.push('-'.repeat(40))
  lines.push('')

  lines.push('AUDIT TIMELINE')
  lines.push('')

  for (const step of data.timeline) {
    lines.push(`Step ${step.step}: ${step.title}`)
    lines.push(`  Result: ${step.levelLabel}`)
    lines.push(`  Time: ${new Date(step.timestamp).toLocaleTimeString()}`)
    if (step.description) {
      lines.push(`  What was checked: ${step.description}`)
    }
    lines.push('')
    if (step.promptText) {
      lines.push('  Audit prompt provided:')
      lines.push(`    ${step.promptText.replace(/\n/g, '\n    ')}`)
      lines.push('')
    }
    if (step.docPromptUsed) {
      lines.push('  Documentation follow-up prompt:')
      lines.push(`    ${step.docPromptUsed.replace(/\n/g, '\n    ')}`)
      lines.push('')
    }
    if (step.responseText) {
      lines.push('  AI response (pasted by user):')
      lines.push(`    ${step.responseText.replace(/\n/g, '\n    ')}`)
      lines.push('')
    }
    if (step.screenshotCount > 0) {
      lines.push(`  Screenshots for this step: ${step.screenshotCount}`)
      lines.push('')
    }
    lines.push('-'.repeat(40))
    lines.push('')
  }

  lines.push('SUMMARY OF FINDINGS')
  lines.push('')

  const red = data.findings.filter((f) => f.level === 'red')
  const yellow = data.findings.filter((f) => f.level === 'yellow')
  const green = data.findings.filter((f) => f.level === 'green')

  if (red.length > 0) {
    lines.push(`Concerns detected: ${red.length}`)
    red.forEach((f) => lines.push(`  - ${f.title}${f.note ? ': ' + f.note : ''}`))
    lines.push('')
  }
  if (yellow.length > 0) {
    lines.push(`Items worth watching: ${yellow.length}`)
    yellow.forEach((f) => lines.push(`  - ${f.title}${f.note ? ': ' + f.note : ''}`))
    lines.push('')
  }
  if (green.length > 0) {
    lines.push(`Normal results: ${green.length}`)
    green.forEach((f) => lines.push(`  - ${f.title}`))
    lines.push('')
  }

  lines.push('-'.repeat(40))
  lines.push('')
  lines.push('This report was generated locally by AI Safety Check.')
  lines.push('No data was transmitted. Keep this file in a safe place.')

  downloadFile(lines.join('\n'), `AI-Safety-Audit-${dateStr}.txt`, 'text/plain')
}
