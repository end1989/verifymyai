import { useState, useMemo } from 'react'

const SEVERITY_RANK = { clean: 0, green: 0, yellow: 1, red: 2 }

export function useAuditState() {
  const [platform, setPlatform] = useState(null)
  const [findings, setFindings] = useState([])
  const [records, setRecords] = useState([])
  const [currentTier, setCurrentTier] = useState(1)
  const [auditStartTime, setAuditStartTime] = useState(new Date().toISOString())

  const severity = useMemo(() => {
    let max = 'clean'
    for (const f of findings) {
      if ((SEVERITY_RANK[f.level] ?? 0) > SEVERITY_RANK[max]) {
        max = f.level
      }
    }
    return max
  }, [findings])

  function addFinding(finding) {
    setFindings((prev) => [...prev, finding])
  }

  function addRecord(record) {
    setRecords((prev) => [...prev, { ...record, timestamp: new Date().toISOString() }])
  }

  function reset() {
    setPlatform(null)
    setFindings([])
    setRecords([])
    setCurrentTier(1)
    setAuditStartTime(new Date().toISOString())
  }

  return {
    platform,
    setPlatform,
    findings,
    addFinding,
    records,
    addRecord,
    severity,
    currentTier,
    setCurrentTier,
    auditStartTime,
    reset,
  }
}
