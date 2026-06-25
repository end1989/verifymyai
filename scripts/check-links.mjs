#!/usr/bin/env node
// Link checker for the safety-critical resource directory.
//
// Extracts every `url` from src/data/resources.js and src/data/comprehensiveResources.js
// and checks that each is reachable. A dead link to a support org can fail someone in
// crisis, so this runs on a schedule (see .github/workflows/link-check.yml) -- not just
// on PRs -- to catch external link rot over time.
//
//   npm run check-links
//
// Exit code is non-zero if there are HARD failures (404/410/5xx, DNS/timeout) so CI fails.
// Soft statuses (401/403/406/429) usually mean the org blocks bots; they are reported for
// manual review but do not fail the build.

import { crisisResources } from '../src/data/resources.js'
import { resourceCategories } from '../src/data/comprehensiveResources.js'

const SOFT = new Set([401, 403, 406, 429])
const TIMEOUT_MS = 15000
// Use a real browser UA: several support-org servers block or hang on non-browser
// agents, which would otherwise produce false failures.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

// url -> Set(labels) so we can show where a broken link lives
const urls = new Map()
function add(url, label) {
  if (!url) return
  if (!urls.has(url)) urls.set(url, new Set())
  urls.get(url).add(label)
}
for (const r of crisisResources) add(r.url, `resources.js: ${r.name}`)
for (const cat of resourceCategories) for (const r of cat.resources) add(r.url, `${cat.id}: ${r.name}`)

async function attempt(url) {
  for (const method of ['HEAD', 'GET']) {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
    try {
      const res = await fetch(url, { method, redirect: 'follow', signal: ctrl.signal, headers: { 'User-Agent': UA } })
      if (res.status === 405 && method === 'HEAD') continue // some servers reject HEAD; retry with GET
      return res.status
    } catch (err) {
      if (method === 'GET') return err.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK_ERR'
    } finally {
      clearTimeout(timer)
    }
  }
  return 'NETWORK_ERR'
}

async function check(url) {
  let status = await attempt(url)
  // Retry once on transient errors so a slow page doesn't cause a false CI failure.
  if (status === 'TIMEOUT' || status === 'NETWORK_ERR') status = await attempt(url)
  return status
}

const sorted = [...urls.keys()].sort()
console.log(`Checking ${sorted.length} unique URLs from src/data/*.js ...\n`)

const results = await Promise.all(sorted.map(async (u) => [u, await check(u)]))

const ok = []
const soft = []
const hard = []
for (const [u, status] of results) {
  const labels = [...urls.get(u)].join(', ')
  if (typeof status === 'number' && status < 400) ok.push(u)
  else if (typeof status === 'number' && SOFT.has(status)) soft.push([u, status, labels])
  else hard.push([u, status, labels])
}

if (soft.length) {
  console.log('SOFT (likely bot-block; verify manually if it persists):')
  for (const [u, s, l] of soft) console.log(`  ${String(s).padEnd(4)} ${u}  [${l}]`)
  console.log('')
}
if (hard.length) {
  console.log('HARD FAILURES (fix these):')
  for (const [u, s, l] of hard) console.log(`  ${String(s).padEnd(12)} ${u}  [${l}]`)
  console.log('')
}

console.log(`OK: ${ok.length}  |  Soft: ${soft.length}  |  Hard: ${hard.length}`)
process.exit(hard.length ? 1 : 0)
