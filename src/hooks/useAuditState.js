import { useState, useMemo } from 'react'

const SEVERITY_RANK = { clean: 0, green: 0, yellow: 1, red: 2 }

export function useAuditState() {
  const [platform, setPlatform] = useState(null)
  const [findings, setFindings] = useState([])
  const [currentTier, setCurrentTier] = useState(1)

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

  return {
    platform,
    setPlatform,
    findings,
    addFinding,
    severity,
    currentTier,
    setCurrentTier,
  }
}
