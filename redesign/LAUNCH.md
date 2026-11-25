# Launch plan: switching patrickbranigan.com to the redesign

Written 2026-11-24.

## Status: LIVE (2026-11-24). Merged to `main` as 8ac514e; the previous site is tagged `site-v1`.

Undo: Cloudflare Pages > patrickbranigan-com > Deployments > roll back to the deployment before 8ac514e, then `git revert -m 1 8ac514e` on `main`.

### How it got there

Patrick: "do whatever is going to make my site exactly like what we've arrived at with this redesign prototype. Do it in the most efficient way."

- Done:
  - `src/site/signal.html` is served whole at `/`. The only changes from the prototype are the head tags, the no-JS fallback, live `WRITING`, the old-anchor aliases, and entry URLs. The writing data is identical to the pasted copy.
  - Each `/log/<slug>/` is the same page, opened on Thinking with that entry's reading sheet up, plus its own title, description and canonical URL. Closing the sheet goes to `/#thinking`. Opening an entry in the app sets the address to `/log/<slug>/`.
  - `sitemap.xml` and `robots.txt` added.
  - Media and cutouts moved to `/media` and `/cutouts`.
  - Old site code removed (Layout, Reading, HeroGame, Wall, global.css, `flight.ts`, the D1 migration). Prototype v1 and `type-goo.html` moved to `redesign/reference/`.
  - Verified with `astro build` and a headless check on desktop and phone: every route loads, no page errors, no failed requests.
- Then: branch pushed, preview checked (desktop + phone, no errors), `site-v1` tagged, merged by Patrick, production checked the same way. The newsletter function was checked with a malformed address (400 invalid_email); no real signup was made.

## Where things stand

- **The live site** is `main`, built by Astro as a static site. Cloudflare Pages deploys every push to `main`.
  - `src/pages/index.astro`: hero, projects, writing, playing and newsletter sections.
  - `src/pages/log/[slug].astro`: a page per writing entry, using `Reading.astro`.
  - `functions/api/subscribe.ts`: sends signups to Beehiiv.
  - `public/decks/*.html`: three standalone pages.
- **The redesign** is one self-contained file, `public/prototypes/signal-2.html` (about 4,700 lines), on `redesign/signal`. That branch is 6 commits ahead of `main` and has never been pushed.
  - Its five tabs map onto the live sections one for one: Now = hero, Built = projects, Thinking = writing, Playing = playing, Newsletter = newsletter. Only Workweek drops out, and it is parked on purpose.
- **The branch also carries an older experiment.** The Wall hero game (`HeroGame.astro`, `Wall.astro`, `functions/api/flight.ts`, the D1 migration) is wired into the *current* `Layout.astro` and `index.astro`. **So merging the branch as it stands would ship the old site plus the Wall, not the redesign.** Merging alone is not the switch.

## Approach: lift first, refactor later

**1. Lift (recommended for launch).** The prototype becomes the homepage almost unchanged. Only what has to be real gets wired up. This is about 1 session to port and 1 to verify. Visitors get exactly what Patrick has been testing.

**2. Full port (optional, after launch).** Streams become components, and projects, library, favorites and games become content collections. This is about 4–6 sessions. It is easier to maintain, but visitors see no difference. It can happen piece by piece on the live site later.

## Lift: steps

1. **Homepage.** Rewrite `src/pages/index.astro` to output the prototype:
   - its CSS and its markup;
   - its script as `<script is:inline>`, so Astro doesn't bundle or rewrite it.
2. **Live writing.** Replace the pasted `WRITING` array with build-time data from `getCollection('writing')`. Drafts prefixed with `_` stay excluded. The current "Add writing entry" flow then publishes to the new design with no re-export.
3. **One source for QA.** Move the questions out of `Layout.astro` into one shared file.
4. **Head.** Bring over the title, description, Open Graph tags, canonical URL and favicon from `Layout.astro`.
5. **Crawlable text.** The new homepage draws almost everything with JS and canvas, so search engines and no-JS readers would see close to nothing. Render plain HTML underneath that the script takes over:
   - name and intro;
   - the project list;
   - writing links to `/log/<slug>`;
   - newsletter form.
6. **Old links keep working.**
   - Keep `/log/<slug>` (those URLs have been shared), restyled with the new tokens and type.
   - Map old anchors: `#top` → `#now`, `#projects` → `#built`, `#writing` → `#thinking`. `#playing` and `#newsletter` are unchanged.
   - Keep `/decks/*`.
7. **Assets.**
   - Move `public/prototypes/media` and `public/prototypes/cutouts` to `/media` and `/cutouts`, and update the paths.
   - Take `signal.html` and `type-goo.html` out of `public/`; they can live in `redesign/` for reference.
   - Lazy-load videos beyond the first. The Chaotic reel is 6 MB.
8. **Settle the flags.** Bake in the chosen palette and type. `?hour` and the debug hooks are harmless and can stay.
9. **Remove the old site's code:** Wall, HeroGame, the old Layout sections and `flight.ts` (it needs a D1 binding that was never set up). It stays in git history. If the Wall should come back later, that is a separate decision.
10. **Verify.**
    - `astro build` then `astro preview`.
    - Push the branch, so Pages builds a preview URL, and test it on iPhone and desktop.
    - Send one real signup through the preview with Patrick's own address, then remove it in Beehiiv.
11. **Switch.**
    - Tag the current `main` as `site-v1`.
    - Merge to `main`, with Patrick's explicit OK. Pages deploys it.
12. **Undo.** In the Cloudflare Pages dashboard, go to Deployments, pick the previous production deployment and choose "Rollback" (instant). Then `git revert -m 1 <merge sha>` so `main` matches.

## Patrick's calls before launch

- **Approve the lift plan.**
- **Push the branch?** The repo is public: pushing makes the redesign visible on GitHub, and the Pages preview URL is public but unlisted.
- **Design open items:**
  - play-test the games on iPhone and desktop;
  - typography (Fraunces or sans; Exposure is paid);
  - palette (colored, Sherbet or bw);
  - SNES favorite.
- **The Wall:** drop it for launch, or keep it for later?
- **Reading pages:** restyle `/log/<slug>` to match (recommended, small), or keep the current look for launch.
