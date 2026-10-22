# patrickbranigan.com

Patrick Branigan's personal site. Astro static site on Cloudflare Pages (auto-deploys `main`). Newsletter signup goes through `functions/api/subscribe.ts` → Beehiiv.

Dev server needs Node 22: `source ~/.nvm/nvm.sh && nvm use 22 && npm run dev` (http://localhost:4321).

## Active work: portfolio redesign

A redesign is in progress as a standalone prototype at `public/prototypes/signal-2.html`, on the `redesign/signal` branch. **Read `redesign/HANDOFF.md` before working on it.** It covers the direction, the rules Patrick has set, how the prototype is built, what is placeholder, and what is next.

## Working with Patrick

- Terse responses. He iterates by feel in the browser: make small, reversible changes and let him look.
- Back up `signal-2.html` into `public/prototypes/_backup/` before each round of edits.
- Never merge prototype work to `main` without asking: `main` deploys publicly.
