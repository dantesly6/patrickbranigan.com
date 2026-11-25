// The site is one page, src/site/signal.html (the redesign prototype, kept whole so it renders exactly as designed).
// Each route fills its placeholders at build: the writing, the head tags, a no-JS fallback, and which entry to open.
import SRC from '../site/signal.html?raw';
import { getWritingItems, type WritingItem } from './writing';

export const SITE = 'https://patrickbranigan.com';
export const DESCRIPTION = 'Designer, maker, gamer. What I’ve built, what I’m thinking about, and what I’m playing.';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const json = (v: unknown) => JSON.stringify(v).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

export const writing = getWritingItems;

type Page = { path: string; title: string; description: string; type?: 'website' | 'article'; open?: string; noscript: string; items: WritingItem[] };

export function page({ path, title, description, type = 'website', open, noscript, items }: Page): string {
  const url = SITE + path;
  const data = items.map(it => ({ slug: it.slug, title: it.title, date: it.entry.data.date.toISOString().slice(0, 10), ...(it.excerpt ? { excerpt: it.excerpt } : {}), body: it.entry.body ?? '' }));
  const head = [
    `<meta name="description" content="${esc(description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta name="twitter:card" content="summary">`,
    open ? `<script>window.OPEN_ENTRY = ${json(open)};</script>` : '',
  ].filter(Boolean).join('\n');
  let html = SRC;
  const swap = (a: string, b: string) => { if (!html.includes(a)) throw new Error('site template is missing ' + a); html = html.replace(a, () => b); };
  swap('<title>Patrick Branigan</title>', `<title>${esc(title)}</title>`);
  swap('<!--HEAD-->', head);
  swap('<!--NOSCRIPT-->', `<noscript><main style="max-width:680px;margin:0 auto;padding:56px 20px 96px;font:17px/1.55 system-ui,sans-serif">${noscript}</main></noscript>`);
  swap('/*WRITING*/[]', json(data));
  if (open) swap('<html lang="en" data-s="now"', '<html lang="en" data-s="thinking"');
  return html;
}

export const writingLinks = (items: WritingItem[]) =>
  `<h2>Writing</h2><ul>${items.map(it => `<li><a href="/log/${it.slug}/">${esc(it.title)}</a></li>`).join('')}</ul>`;
