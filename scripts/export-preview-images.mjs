// Exports the preview images of the main pages (src/assets/og/): each page's hero illustration,
// 1200 × 630, centered on the page's hero background. The pages use them when shared on social
// networks and messaging apps (see `image` in src/layouts/BaseLayout.astro).
//
// Run it again after changing one of these illustrations:
//   1. start the dev server: npx astro dev --background
//   2. node scripts/export-preview-images.mjs
//
// It drives Google Chrome (macOS path below) without a window, through the DevTools protocol, with
// reduced motion so the illustrations are still.
import { spawn } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const origin = process.argv[2] ?? 'http://localhost:4321'
const out = new URL('../src/assets/og/', import.meta.url).pathname
const pages = [
  ['home', '/', '.hero canvas'],
  ['research', '/research/', 'svg[data-illustration]'],
  ['publications', '/publications/', 'svg[data-illustration]'],
  ['team', '/team/', 'svg[data-illustration]'],
  ['news', '/news/', 'svg[data-illustration]'],
  ['contact', '/contact/', 'svg[data-illustration]'],
  // The games illustration has words in it: one image per language.
  ['games-en', '/serious-games/', 'svg[data-illustration]'],
  ['games-fr', '/fr/serious-games/', 'svg[data-illustration]'],
]

const chrome = spawn(
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  [
    '--headless=new',
    '--remote-debugging-port=9333',
    `--user-data-dir=${mkdtempSync(join(tmpdir(), 'og-chrome-'))}`,
    '--hide-scrollbars',
    'about:blank',
  ],
  { stdio: 'ignore' },
)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let targets
for (let i = 0; i < 50 && !targets; i++) {
  await sleep(200)
  targets = await fetch('http://127.0.0.1:9333/json')
    .then((r) => r.json())
    .catch(() => null)
}
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl)
await new Promise((r) => ws.addEventListener('open', r))
let id = 0
const waiting = new Map()
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data)
  if (msg.id && waiting.has(msg.id)) {
    waiting.get(msg.id)(msg)
    waiting.delete(msg.id)
  }
})
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id
    waiting.set(n, (msg) =>
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result),
    )
    ws.send(JSON.stringify({ id: n, method, params }))
  })

await send('Page.enable')
await send('Emulation.setEmulatedMedia', {
  features: [
    { name: 'prefers-reduced-motion', value: 'reduce' },
    { name: 'prefers-color-scheme', value: 'light' },
  ],
})
await send('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
})

for (const [name, path, selector] of pages) {
  await send('Page.navigate', { url: origin + path })
  await sleep(2500)
  // Keep only the illustration, on the background of the hero it sits in.
  const isolate = `(() => {
    const el = document.querySelector(${JSON.stringify(selector)})
    if (!el) return 'missing'
    let bgEl = el.parentElement
    while (bgEl && getComputedStyle(bgEl).backgroundImage === 'none' &&
           getComputedStyle(bgEl).backgroundColor === 'rgba(0, 0, 0, 0)') bgEl = bgEl.parentElement
    const cs = bgEl ? getComputedStyle(bgEl) : null
    const frame = document.createElement('div')
    frame.style.cssText = 'position:fixed;inset:0;width:1200px;height:630px;display:flex;' +
      'align-items:center;justify-content:center;z-index:99999;' +
      'background-color:' + (cs ? cs.backgroundColor : '#fff') + ';' +
      'background-image:' + (cs ? cs.backgroundImage : 'none') + ';'
    const box = document.createElement('div')
    box.style.cssText = ${JSON.stringify(name === 'home' ? 'width:820px' : 'height:500px;width:760px;display:flex;align-items:center;justify-content:center')}
    el.style.margin = '0'
    el.style.maxWidth = 'none'
    el.style.width = ${JSON.stringify(name === 'home' ? '100%' : 'auto')}
    el.style.height = ${JSON.stringify(name === 'home' ? 'auto' : '100%')}
    el.style.maxHeight = '100%'
    box.append(el)
    frame.append(box)
    document.body.append(frame)
    for (const child of [...document.body.children]) if (child !== frame) child.style.display = 'none'
    document.documentElement.style.background = 'none'
    return 'ok'
  })()`
  const res = await send('Runtime.evaluate', { expression: isolate, returnByValue: true })
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1200,
    height: 630,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await sleep(1200)
  const shot = await send('Page.captureScreenshot', { format: 'png' })
  writeFileSync(join(out, `${name}.png`), Buffer.from(shot.data, 'base64'))
  console.log(name, res.result.value)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  })
}
ws.close()
chrome.kill()
