// Headless check of the prototype: screenshots every tab on desktop and phone, reports page errors.
//
// Setup (once): npx playwright install chromium-headless-shell
// Run (dev server up):  node redesign/tools/shoot.cjs [outDir]
//
// If `require('playwright')` fails, point PLAYWRIGHT at an installed copy, e.g.
//   PLAYWRIGHT=~/.npm/_npx/<hash>/node_modules/playwright node redesign/tools/shoot.cjs
// Screenshots are single frames: they can't judge motion, and View Transition layers don't appear.
const path = require('path'), fs = require('fs');
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const out = path.resolve(process.argv[2] || 'redesign/shots');
const URL = process.env.URL || 'http://localhost:4321/prototypes/signal-2.html';
const TABS = ['now', 'thinking', 'built', 'playing', 'newsletter'];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  // Playwright's own browser if its version is installed; otherwise any installed headless shell (or CHROME=path)
  const cache = path.join(require('os').homedir(), 'Library/Caches/ms-playwright');
  const found = fs.existsSync(cache) ? fs.readdirSync(cache).filter(d => d.startsWith('chromium_headless_shell-')).sort().reverse()
    .map(d => path.join(cache, d, 'chrome-headless-shell-mac-arm64/chrome-headless-shell')).find(f => fs.existsSync(f)) : undefined;
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {})
    .catch(() => chromium.launch({ executablePath: found }));
  for (const [w, h, tag] of [[1440, 860, 'desktop'], [390, 844, 'phone']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(URL + '#now'); await p.waitForTimeout(1500);
    for (const t of TABS) {
      await p.click(`.tab[data-s="${t}"]`); await p.waitForTimeout(2500);
      await p.screenshot({ path: `${out}/${tag}-${t}.png` });
    }
    console.log(tag, errs.length ? errs : 'no errors');
    await p.close();
  }
  await b.close();
  console.log('screenshots in', out);
})();
