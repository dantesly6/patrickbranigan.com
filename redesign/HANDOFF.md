# Portfolio redesign: handoff

Everything needed to continue the patrickbranigan.com redesign in a fresh Claude session (any account). Start here, then open the prototype.

**The site:** `src/site/signal.html` (the redesign, ported as a whole on 2026-11-24, see `LAUNCH.md`). Run `npm run dev` (Node 22, see below) and open http://localhost:4321/. It is one self-contained HTML file and is the source of truth: edit it directly. At build, `src/lib/site.ts` fills four placeholders (`<!--HEAD-->`, `<!--NOSCRIPT-->`, `/*WRITING*/[]`, and the entry to open) for `/` (`src/pages/index.astro`) and each `/log/<slug>/` (`src/pages/log/[slug].astro`).

Status as of 2026-11-09: the prototype direction is accepted and being refined by feel. The real Astro site (`src/`) has not been touched by the redesign yet. The repo being public is fine; the work just has to stay independent of Workweek (no Workweek Claude account, no Workweek repos).

---

## 1. Why this exists

Patrick (Head of Design at Workweek; designs and codes his own site) felt the current site reads as "a portfolio site of the past." In his words, it doesn't reflect "the forward thinking, creative, curious mind I have. The playful spirit that I have. And the fact that I'm not just making visual UI as my job anymore. I'm design engineering more, and writing more, and analyzing more."

He wants a home for small web games, pieces of work, written and spoken thought, and presence, with liveliness. Early references he liked: dannpetty.com (a bento of recent life), justinmezzell.com, rog.ie, zhenyary.com. The Dia browser's motion and type also came up (see section 7).

## 2. Hard rules learned along the way

These came from his reactions. Treat them as constraints.

- **Liveliness must not depend on visitors.** The test: a lone visitor at 3am, a month after his last post, still feels the site is alive. Liveliness comes from the system (a shared clock, time of day, procedural motion) and from his own signals (writing, games, what he's building). Social features are a bonus layer at most.
- **Not "Claude-ish."** No dark glass panels, no monospace uppercase labels, no coral accents. He rejected the first prototype (`signal.html`) partly for this.
- **Not antiquated.** He rejected a TV "station/channel" framing as dated.
- **No abstract generative backgrounds** (a flow field became "a weird amalgamation of lines").
- **More magical motion without risking clarity.** Animation should make things feel alive, but text at rest must be plainly readable. Every experimental view has a plain alternative (for example, Index on Thinking).
- **No presentation formats.** He rejected line-by-line reading on Thinking ("presentation-like") and slideshow-like cards on Built.
- **Gooey/liquid is the house material,** but use it only where something is born from or returns to something else (the dock family). Keep it out of text and content. The one exception, at his request: headlines melt while they move and are crisp at rest.
- **Working style:** terse responses, iterate by feel in the browser, keep changes small and reversible. He judges motion himself, so say plainly when you could only verify a still frame.
- **Older site rules still apply:** no X/Twitter links anywhere; contact is click-to-copy, never `mailto:`; lightboxes never use native pinch-zoom (iOS Safari crashes), only a controlled zoom toggle; copy follows his editorial rubric (specific and observable over generic and puffed; don't invent facts).

## 3. What the prototype is

A single screen with five "worlds," each its own color, switched from a liquid dock at the bottom.

| Tab | Color | What it is |
|---|---|---|
| Now (dock label Hello) | lilac `#cdc7ef` | The page is his name. Fifteen soft letters to press, throw and spell with; some words do what they say (see below) |
| Thinking | navy `#18233d` | His writing as a field of thoughts with three arrangements: **Index** (default, plain list), Nebula (3D cloud), Threads (linked by shared words) |
| Built | clay `#b4512f` | Each project's real screen recordings and stills, in a frame that reshapes per medium (window, phone, bare board, or cut-apart pieces) |
| Playing | lime `#c9f06b` | **Arcade:** a self-playing game you can take over, full screen. **Library:** sortable bar chart of his collection plus "In rotation" |
| Newsletter | deep teal `#0f3b3a` | Pressing Pause signup; posts to the live Beehiiv function |

`?palette=mono` restores the older gray Now/Built colors for comparison. `?palette=bw` tries Patrick's question "should color be reserved for play?": Now, Thinking, Built and Newsletter go paper (one neutral; alternating paper and black read as arbitrary in review), Playing stays lime, Now's words still repaint the room, and the question overlay shows the page's original color as the reward. Undecided. `?type=sans` restores General Sans headlines and turns the melt off, to compare with Fraunces.

### Signature behaviors (keep these)
- **Page switch:** the new color blooms out from the pressed tab with a feathered edge while the old page sinks and blurs (View Transitions plus an animated mask, about 1.25s).
- **Kinetic type:** characters roll up out of their word; old text rolls away first.
- **Liquid dock:** the dock surface is an SVG goo filter.
  - The black tab highlight is two drops that stretch apart and fuse.
  - Thinking (3) and Playing (2) bud icon droplets out of the dock for their sub-views; hover shows the name, and on touch the dock "drips" the name instead.
  - Actions sit with their content (round 15; they used to bud off the dock and got lost): **Read** under Built's stepper, **Play** centered on the arcade preview. Thinking entries open by clicking them; Enter still opens whatever is in focus.
  - Messages (toasts) drip out of the dock's top edge.
- **Dive:** opening anything zooms into it and dissolves (the title or image morphs into the detail page); closing surfaces back out.
- **Thinking field:** idle, the camera turns to face one thought every 9s; drag to rotate, hover to trace threads (labeled with the shared word), click to dive in.
- **Built:**
  - Recordings play (no scrubbing; he asked for that to be removed).
  - Tall boards scroll top to bottom.
  - Boards that were several separate things are cut apart into floating pieces.
  - Phone screens sit in a drawn phone frame.
  - Project detail pages get the same treatments, plus a lightbox that zooms to full resolution on desktop.
- **Library:**
  - One square per game, a block per console, biggest first. Solid = finished, pale = not yet (`#units`, `fitUnits`).
  - Tapping a console blooms its squares into **Guess my favorite** (`fav`, `FAVS`): three titles, one right; the answer rolls up with his reason where he's given one. Guesses persist in `pb-favs`; the key keeps score.
  - "Currently playing" is one game rated in five pixel hearts plus a verdict (`VIBES`); the last lit heart beats.
- **Arcade:** opens to a ready card (ball hovers, field empty); the first tap starts the run and flaps. "Again" returns to ready.

### Now: fifteen letters

Patrick asked for something "really experimental and boundary pushing" that has nothing to do with work and is about interacting with the page, using type and his name. It replaced the rotating statements.

- **Soft bodies.** Each letter is its real Fraunces outline (opsz 144, SOFT 100, light and heavy masters embedded as `GLYPHS`), held as rings of points on springs. Nothing depends on the web font loading. Weight is interpolated between the masters, so a letter can swell under the cursor or turn heavy.
- **The name at rest.** The p's descender runs into the b's ascender on desktop; `STEMFIX` lines the two stems up so it reads as one long stem. `KERN` holds the hand kerning (Fraunces' own kerning didn't survive extraction).
- **Hands.** Hover swells and dents. Drag stretches like taffy and shoves other letters aside. Throw and it bounces off the walls and the dock, lands on the word, then goes home.
- **Spelling.** Type (desktop) or tap letters. The word moves to the center and the rest shrink to a rack. Backspace removes, Enter commits, Esc resets. Letters that are not in the name fall through the page (`No z in Patrick Branigan.`); a second b gets `Only one b.`
- **Words that do what they say (27, the `FX` table).** Since round 22 every one is a game when a person spells it. The 19 original gags (rain, banana, brick, panic, train, paint, nap, big, ink, prank, trick, king, art, bargain, pink, nag, atari, bang, grain) still live in `FX` and are what attract mode plays; spelled by hand, `intro()` starts the word's game from `GAMES` instead (`(GAMES[w] || FX[w])`). `WORDS` is the 647 other words that count but only make the letters hop. Found words persist in `localStorage` (`pb-words`).
- **Games (round 15).** Paint was his favorite because it hands you something to do, so five words are small games with a goal and an end. Each takes input through `fx.tap`/`fx.key` and keeps a best in `localStorage` (`pb-best`). **tag:** the letters run from the pointer, catch all fifteen in 15s. **gnat:** a gnat darts and lands on letters, swat it in 15s. **brain:** letters light up in a sequence, play it back, one longer each round. **ping:** a breaker since round 17: the word is the paddle, the other eleven letters shatter when hit; it ends when they're all broken or the ball drops. **pinata:** p-i-n / a-t-a hangs on a rope, hit it until it breaks into candy. Round 16 added three with new mechanics: **racing:** a dodge since round 17 (the start-lights reaction game was "less engaging"): the word is the car, the rest of the name comes down the road as traffic, steer with the pointer; score is letters passed. **tank:** "tank" on a tread at lower left, an 11-letter wall at right, five shells; aim with the pointer (distance is power), click or drag-and-release to fire; shells pierce and splash. **trap:** the letters drift as a loose herd that scatters from the pen; draw one loop with limited ink and whatever's inside goes to the rack. Every game opens on a start card (`HOW` table, `intro()`): how to play, a Start pill, the best score; tap, Space or Enter starts it, 15s idle cancels it. Drag games get the release through `fx.lift` (the canvas captures the pointer while one runs). **Round 22: the other 19** (`GAMES`, each with a `HOW` card and a best under its own word in `pb-best`), one mechanic each so none repeats: **rain:** steer an umbrella under one darting cloud that grows over 15s; gusts slant the rain; ten drops soak a letter, score is letters dry. **banana:** (round 23) the word sits along a crescent banana that's thrown up three times; swipe across it between letters, one letter to a piece, out of 18 (best key `banana2`). **brick:** a crane swings each letter over the stack, drop it; a drop that overlaps the one below by under 20% topples and ends it; the tower scrolls. **panic:** rhythm: tap as a ring closes on the circle, until the panic meter hits zero (lower time is better). **train:** Frogger: hop the t over three tracks of letter trains, across and back, faster each crossing. **paint:** (round 23) a coloring book: each letter of p-a-i-n-t in turn, huge and outlined, painted in to 85% before a shrinking timer, with the gag's multicolor speed-width brush; paint outside the lines shows and is reported at the end (best key `paint2`, out of five). **nap:** stealth: carry a lantern across and back; speed near a sleeping letter wakes it; 25s. **big:** an extreme close-up of one letter's edge zooms out over 6.5s; name it early (type or four buttons), five rounds. **ink:** pools spread from the letters, tap to blot, lose at half the page. **prank:** tap the letters in name order; every fourth, the canvas turns 180° (CSS transform; taps are mapped back). **trick:** (round 23, abstract) three ink circles; the letter sinks into one (the part inside shows as a cut-out), they swap with squash and stretch, more and faster each round. **king:** keep the crown on the k's stem by moving the k, 30s wins; since round 23 moving toward the lean pushes it back in proportion to speed (it used to clamp acceleration, so a fast move netted a push the wrong way). **art:** spot the differences in a busier scene (tree, house, clouds, flowers, boat), four per painting, 40s, wrong taps cost 2s. **bargain:** the price falls from $100 until someone buys it at a random moment; buy first, three deals. **pink:** trace a zigzag through the word from the dot, three cuts, scored on distance from the line. **nag:** real-life popups (cookie consent, notification permission, rate us, update, sign in, confirmshaming); each has one small way out (× or a text link), the big button spawns two more; lose past 7 open (5 on phones). **atari:** Pong to three, vertical court on phones. **grain:** hold to pour sand into each of g-r-a-i-n; sand in the air counts, spill scores zero. **bang:** the blast goes off at full speed for 0.2s, brakes into slow motion, then speeds up over 7s; tap letters out before they leave the page. Test hook: `room.debug.game` reads a running game's state.
- **The list is locked.** The lower-left note (instructions, words found, which do something) only shows after the cheat code: ↑ ↑ ↓ ↓ ← → ← → B A. Keys on desktop; on phones, swipes on empty space then tap the b and an a. While it's half entered, ←/→ and horizontal swipes stop changing pages. Unlock persists (`pb-cheat`). The code turns up among the questions in the header, as on the current site.
- **Plays by itself.** Between words, one letter fidgets: it hops, leans, dents or swells. It's mostly the same letter for 40s at a time, picked from the shared clock, so the name has a troublemaker. After 8s idle the page spells a word from `ATTRACT`, also picked from the clock, so two visitors see the same one. Prank and nag never play in attract. Any input takes over.
- **Night.** 11pm-6am in New York the letters droop, the room goes dusk and z's rise. The first input wakes them: `It's 3:12am in New York. They were asleep.`
- **Reduced motion:** letters snap, no jelly or attract; words only change the color.
- Copy on Now (note, toasts, the museum label on `art`) is a first pass for him to tune.

### Ask (upper right)

Replaces "last shipped." The current site's easter egg, restyled: a question from `QA` rolls by in the header every 8s, shuffled per visit. Pressing it blooms an answer page in the current world's colors turned inside out, with the answer in big melting Fraunces. Another or → advances; Esc closes. Closing moves on to the next question. On phones the question sits under the name. The header clock was removed in round 15 (night mode says the time when it matters). The Konami code is back among the questions; it unlocks the list on Now.

### Keyboard
1–5 switch tabs, ←/→ cycle, Enter opens, Esc closes, A cycles Thinking arrangements, Space plays (Arcade). On Now, letters spell (or answer, in brain). ↑ ↑ ↓ ↓ ← → ← → B A unlocks the list. Shortcuts are ignored while typing in a field.

## 4. File map

```
src/site/
  signal.html          THE site (≈210 KB, self-contained; glyph outlines embedded as JSON; writing filled in at build)
  _backup/             dated snapshots before each round (gitignored)
src/lib/site.ts        fills the placeholders: head tags, no-JS fallback, WRITING from src/content/writing, OPEN_ENTRY
src/pages/             index.astro (/), log/[slug].astro (/log/<slug>/ opens that entry), sitemap.xml.ts
public/
  media/               light 720p copies of project videos; the Ribbon ones are cropped to the phone screen
  cutouts/             boards cut apart into pieces + manifest.json (made by redesign/tools/cutout.py)
redesign/reference/
  signal-v1.html       v1, rejected (kept for reference only)
  type-goo.html        specimen of free "gooey" fonts + a liquid text filter (pending decision, see section 7)
  media/               light 720p copies of project videos; the Ribbon ones are cropped to the phone screen
  cutouts/             boards cut apart into pieces + manifest.json (made by redesign/tools/cutout.py)
  _backup/             dated snapshots before each round (gitignored)
redesign/
  HANDOFF.md           this file
  tools/cutout.py      splits boards into transparent pieces
  tools/media.sh       ffmpeg commands that made media/
  tools/shoot.cjs      headless screenshot + error check (see section 6)
  tools/glyphs.py      extracts the Fraunces outlines for GLYPHS (args: Fraunces.ttf out.json; needs fonttools, uharfbuzz)
  tools/words.py       builds WORDS, the words spellable from the name (args: out.txt)
```

Inside `signal.html` (search for these names):
- **Data:** `WRITING`, `PROJECTS`, `CHAPTERS`, `SETS`, `LIBRARY`, `GAMES`, `QA`, `GLYPHS`, `WORDS`; also `TZ`/`CITY`.
- **Core:** `STREAMS` (the five tabs), `tune()` (page switch), `render()` (per-frame), `kinetic()`, `melt()`, `vt()` (view transitions: `dive`, `surface`, `lb`, `game`).
- **Dock:** `moveBlob()`, `dockFrame()` (per-frame geometry for the liquid), `toast()`.
- **Now:** the `room` module (`shape()` outlines, `body()`/`jelly()` physics, `FX` words, `step()`, `frame()`). **Ask:** the `ask` module.
- **Thinking:** the `field` module (layouts, camera, projection).
- **Built:** `fitFrame()`, `showChapter()`, `figHTML()` (detail page), `lbOpen()` (lightbox).
- **Playing:** the `game` module, `setPlayMode()`, `buildBars()`.
- **Newsletter:** the `pform` submit handler.

## 5. Data: what's real vs. placeholder

- **Writing:** live: `WRITING` is filled at build from `src/content/writing` (published entries only; `_`-prefixed drafts excluded), so a new entry appears on the next deploy. An open entry's address is `/log/<slug>/`.
- **Time:** `TZ = 'America/New_York'`, `CITY = 'New York'` (confirmed by Patrick, 2026-11-06). No visible clock since round 15; it drives night mode and the wake toast.
- **Questions:** `QA` lives only in `signal.html` (the old `Layout.astro` is gone).
- **Projects:** copy from the current site; media from `public/images/projects/`. **Workweek is parked:** Patrick is rethinking it around tangible product features, so it's out of `PROJECTS` and `CHAPTERS`. Its media and cut-outs stay on disk, and the old entries are in commit 0657b26.
- **Library:** per-console counts copied from `src/pages/index.astro` (no titles exist). If he exports his collection with titles, the library can get per-game detail.
- **Currently playing:** one game, `GAMES[0]`, with its rating out of 10 (hearts) and a cover in `public/images/playing/` (box art, cropped and resized to 480px). Now: Ocarina of Time on Switch 2, 10/10 (Patrick, 2026-11-24).
- **Favorites (`FAVS`):** his own picks (2026-11-24). He wrote SNES: Donkey Kong Country Returns, which is a Wii game; it is set to Donkey Kong Country until he confirms. Wrong answers (`alt`) are other well-known games on that console. Guesses are stored under `pb-favs2` (the placeholder-era `pb-favs` is ignored).
- **Newsletter:** posts to `/api/subscribe` (Cloudflare Pages Function → Beehiiv). That function does not run under `astro dev`, so the form shows "Couldn't subscribe" locally. Deployed, it creates real subscribers.

## 6. Working on it

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run dev   # http://localhost:4321/
```

- **Before each round of edits,** copy `src/site/signal.html` into `src/site/_backup/` with a date or round suffix, so any round can be reverted.
- **Verifying:**
  - `node redesign/tools/shoot.cjs` takes desktop and phone screenshots of every tab and reports page errors (see the file header for setup).
  - Headless screenshots catch single frames only; they can't judge motion. View Transition pseudo-layers don't show in them. On Now, moving the browser window also moves the letters, which can't be tested headless.
  - Test hooks: `room.spell('rain')` in the console runs a word; `room.debug` reads letter state; `?hour=3` starts the page asleep.
  - The Playwright MCP browser ran at about 2fps here and was unusable for this page.
- **Deploy safety:**
  - `main` is the live site (Cloudflare Pages auto-deploys it). Merging `redesign/signal` ships the redesign.
  - Branch pushes get Cloudflare preview URLs.
  - Never merge to `main` without Patrick's explicit OK.

## 7. Open threads and next steps

1. **Port to Astro: lifted (2026-11-24).** The page is served whole from `src/site/signal.html`; writing and entry pages are live. Optional later: split streams into components and move projects, library, favorites and games into content collections (no visible change).
2. **Typography.** Trying Fraunces headlines (SOFT 100) with melt during transitions, crisp at rest; `?type=sans` compares. He hasn't decided. He also liked Dia's headline face: **Exposure** by 205TF (paid; trial available; its exposure setting can be animated). `type-goo.html` holds the other free candidates.
3. **Workweek in Built:** bring it back around tangible product features when he's ready.
4. **Built:**
   - Proposed but not built: rebuild one signature interaction per project as live code (Ribbon's offer dial, Chaotic's comment pins, the Moonfallen HUD). Figma source files, if they exist, would make this faster.
   - Also not built: cell-division transitions between chapters and a liquid "bead strand" for chapter progress.
5. **Now copy and words:** tune the note, the toasts and which words do something by feel. More game candidates spellable from the name: catnip (letters chase the pointer), crab, captain, airbag, baking, print (tap the scattered letters in name order), grin. Difficulty of every game is unjudged by a person: bots catch all of tag in ~1.3s, hit 7–11 of 11 in tank and 8–12 of 15 in trap with perfect aim.
7. **Color:** decide between the colored pages and `?palette=bw`.
6. **Production video:** compress the originals (the Chaotic reel is 22 MB); the light copies are in `media/`.
8. **Every word a game (Patrick, 2026-11-23): built in round 22.** All 27 Now words are games when spelled by hand; the gags remain for attract mode. Open: difficulty was tuned against bots only (a bot topped out brick, beat atari 3–0, caught all 15 in bang; king fell in 3s before it was slowed), so it needs his hands on iPhone and desktop. The original matrix:
   - rain: umbrella, keep the letters dry for 15s. banana: letters toss up, swipe to slice. brick: letters swing overhead, tap to drop, tallest tower. panic: tap on the breath to calm the word (rhythm). train: hop one letter across the tracks between trains. paint: cover as much of the name as you can in 9s, scored in percent. nap: tiptoe the pointer across without waking anyone (stealth). big: extreme zoom on a letter, name it as early as you can. ink: tap the spreading pools before the page goes black. prank: page flips and controls reverse; tap the letters in name order. trick: shell game, follow the letter under the cups. king: balance the crown on a wobbling k. art: spot three differences between two framings. bargain: price drops, stop it as low as you dare before it sells. pink: trace the zigzag through the word, scored on accuracy. nag: close the subscribe popups before they fill the screen. atari: Pong, first to three. grain: hold to pour sand into each letter, don't spill. bang: the blast hangs in slow motion, pull letters out before time catches up.
   - Swears (crap, prick, prat) stay the swear jar unless he says otherwise; the 647 plain words keep hopping.

## 8. Decision log (condensed)

1. **v1 `signal.html`:** dark UI, flow field, four streams. Rejected: the look, the abstract background, and the "station" framing. The dock and stream behavior were kept.
2. **v2:** each stream gets its own color world, plus kinetic type, the bloom page switch, and dive transitions.
3. **Thinking:** line-by-line reader rejected as presentation-like, replaced by the field. Index was later moved first and made the default.
4. **Dock:** the progress bars on the tabs were removed. Labels were centered. The gooey dock was liked, so the liquid was extended to the tab highlight, the droplets, Open and toasts. Submenus became icon droplets (an earlier pill tray read as flush/off-center).
5. **Built:** the static card deck was called boring. It became recordings plus reshaping frames; baked-in phone mockups were replaced with a drawn phone; boards were cut apart; scrubbing was added and then removed at his request.
6. **Colors:** apricot rejected for Now, so lilac is the default; clay for Built; lime kept ("surprising green"). The C-to-cycle Now colors were removed in round 14 because letters now spell.
7. **Playing library:**
   - Notched spines: rejected.
   - Liquid bubbles: rejected.
   - Bars: current version. He asked for something like the original bar graph but more striking and interactive.
8. **Newsletter:**
   - A droplet under Playing: rejected.
   - A persistent dock droplet: superseded.
   - Fifth nav tab: his call, current version.
9. **Round 14 (2026-11-06):**
   - **Now:** rotating statements called uninteresting; replaced with the fifteen letters. `?returning`, `LAST_SHIPPED`, `buildNow()` and the "Building the Builder Stack" statement went with them.
   - **Thinking:** Timeline removed ("the index option alludes to a timeline anyway").
   - **Built:** Workweek moved out for now.
   - **Header:** "last shipped" replaced with the question-and-answer easter egg.
   - **Type:** Fraunces and melt-in-motion added to try.
10. **Round 15 (2026-11-09):**
   - **Now:** paint called the best interaction; five game words added (tag, gnat, brain, ping, pinata). The list at lower left now unlocks with the Konami code instead of showing at once.
   - **Header:** clock removed ("what does it add?").
   - **Actions:** the dock's Open button removed; Read moved under Built's stepper, Play onto the game preview.
   - **Color:** `?palette=bw` added to compare; default unchanged.
11. **Round 16 (2026-11-09):** round 15 committed (`cb5020b`) on "I like this direction." Three more games (racing, tank, trap), each a mechanic the first five didn't have: reaction time, aim and launch, drawing a loop.
12. **Round 17 (2026-11-10):** games wait on a start card (he'd been losing before reading the hint). ping became a breaker, racing a dodge, trap got ~25% more ink and a slower phone herd. Swears (crap, prick, prat) drop into a swear jar that keeps a running total (`pb-jar`). Dock tabs became line icons (hand, bulb, hammer, gamepad, envelope; `ICONS`) that play on hover; the open page's tab turns into its word. Landing on Now, the hand waves in the pill, then becomes "Hello". Tried his illustrated avatar for Now first: too small to read at tab size. Open: "patrick" as a recorded clip of him (needs footage), tokens with a payoff for clearing every game, more games.
13. **Round 18 (2026-11-10), phone feedback:** rack splits into two airy rows on phones (`rackLayout`, `rackY0`). Safari gets a one-blob stretch for the dock pill (`noGoo`; its two-blob goo showed as two boxes). Tab icons fade as a whole (solid strokes). Phones: Thinking is index only; Playing stacks arcade over library in one scrolling column (tap, not touch-down, takes over the arcade). `theme-color` follows `--bg`. Headless WebKit hides the named dock during page view transitions; real Safari unverified.
14. **Round 19 (2026-11-16):** iOS 26 Safari ignores `theme-color` and tints its bars from fixed elements at the screen edges (else the body background), so two 2px fixed strips (`.edge`, `edgeHold`) keep the old page colour until the bloom reaches them. Questions popover freezes its colours on open (the room behind kept repainting them) and Another blooms the next question in on the next colour pair (`ASKP`). Phone Thinking index scrolls (`ixY`) and fades under the header. Playing: no "playing itself" hint or library caption; "Currently playing" is one game with a face and a verdict for the rating (`VIBES`); title "654 games in my library, 428 finished."; library is now one square per game, a block per console, biggest first, solid = finished (`#units`, `fitUnits`). Pill fix confirmed on his iPhone.
15. **Round 20 (2026-11-16):** the liquid smiley rating read wrong to him; five pixel hearts replace it. Console taps were only a byline ("98 of 142 done"); now they open Guess my favorite, which is the showcase and the visitor game in one, and reuses the questions popover's bloom and colour pairs (`PAIRS`, `qbloom` hoisted for both). The arcade started the run under the zoom-in transition, so you crashed before seeing it; it now waits on a ready card like the Now games. On phones the takeover had only ever filled the top ~370px (the column's fixed arcade height and its fade mask clipped it); fixed. Popovers tuck the page's sub-view droplets back into the dock. Thinking's dot sizes (word count) and the moving pulse (9-second auto tour) were explained, not changed: offered to make phone dots uniform and stop the tour there.
16. **Round 21 (2026-11-16):** no favorite marker in the chart (he didn't want the cream square); the key says "Tap/Click a console to guess my favorite" instead. Ready copy is his: "Fly through the gaps by clicking or tapping Space." (phones: "…by tapping."). Droplet icons redrawn in the Thinking droplets' dots-and-thin-lines weight (the D-pad was a solid blob, ~2x their ink): Arcade is four face-button dots in a diamond (he picked it over controller, handheld, ball-through-gap and play; the joystick read as old-school analog), Library is the unit chart in miniature (stacks of 4, 3, 2 squares). All five droplets now sit at 10–18% ink coverage. He's sending real favorites per console for `FAVS`.
17. **Round 22 (2026-11-23):** "Build them all." The 19 gag words each got a game (`GAMES`, `HOW`); spelling one by hand opens its start card, attract mode still plays the gag. Shared helpers: `lineUp`, `put` (direct control), `toRack`, `offstage`, `wpath`/`glyph` (an outline at any weight, for art and big), `txt`, `nameRows`. Smoke test drove every game on phone (390×664, touch) and desktop (1440×900) to its end message with no page errors. Committed with round 23 (cba56e1). Undo: `cp public/prototypes/_backup/signal-2.pre-r22.html public/prototypes/signal-2.html`.
18. **Round 23 (2026-11-23):** Patrick played them all. Rebuilt banana (crescent, slice between letters), paint (timed coloring book, winnable), trick (abstract circles), nag (realistic popups with small ways out); reworked rain (one growing nimble cloud, gusts), king (velocity-based push, no clamp; sim + bot hold it 30s), art (busier scene, four differences), bang (real-time burst, then slow motion). Tuned train (+30% speed), nap (wakes more easily), big (starts at 3.5× instead of 7×), ink (ramp lasts ~40s at human pace, was much faster). Real-life touches he asked for: rain gusts, bargain "N people are looking at this / Only 1 left", panic "Breathe in / out", paint "outside the lines". A screenshot review then fixed: paint outlines without seams, paint kept off the HUD, a bigger word row clear of the name; trick circles separated by a gap and a "Got it." / "It was this one." reveal; banana fits a phone; nag never shows the same popup twice and places new ones where they cover least; panic and bang rings no longer cut flat; umbrella handle clear of the name; bigger phone paintings and phone k; king HUD "N of 30 seconds"; bargain line more readable. Committed as cba56e1. Undo: `cp public/prototypes/_backup/signal-2.pre-r23.html public/prototypes/signal-2.html`.
19. **Round 24 (2026-11-24):** Built: the caption sits ~100px in from the right on desktop; the per-screen pips are gone; under the summary sit "Details" (was "Read") and previous/next project arrows with "N of 3". The arrows add an offset to the shared clock (`OFF.built`), so the screens keep their pace from the new project's first screen. Ribbon's three-phone board (`cashapp.webp`) is out of the sequence. Thinking: the corner directions are hidden. Library: the current game shows its cover beside the title. Newsletter: no "A newsletter" eyebrow; kinetic words get .14em of right padding so a glyph's overhang (the g of Pressing) isn't clipped. FAVS are his. Trial palette `?palette=sherbet` (pastels with deep inks; Hello mint #c6f1dd/#0d3b2b, Thinking lilac #e4d6ff/#2a1458, Built butter #ffe27a/#3a2a00, Playing pink #ffc8e6/#4b0b34, Newsletter sky #c4e4ff/#0b2545); Playing's and Newsletter's hard-coded colors now go through `--pi`/`--pb`/`--pir`/`--nb`/`--nf`, so a palette can repaint them. Other options proposed but not built: Arcade (dark neon), Riso (saturated brights), Duotone (deep shade + tint). Undo: `cp public/prototypes/_backup/signal-2.pre-r24.html public/prototypes/signal-2.html` (or `.pre-r24b.html` to keep round 24 but drop Sherbet).
20. **Round 25 (2026-11-24):** Game results (Hello) keep the plain toast but stay up for their reading time (3.8–7.5s, 2.2s + 75ms a character) instead of 2s; other toasts are unchanged. (An animated version, with words rising one by one, a jelly drop and a burst on New best, was tried and turned down: he liked the original.) Guess my favorite: a correct call is a card stunt. A field of library squares flips over in a wave from the answer you picked (each card flashes as it turns); the stage clears; the squares in a pixel heart (the Currently playing heart, 8×7) turn over again, beat twice and step back to ~22% before the title rolls in at the beat + 0.25s. Canvas `#fav .stunt`, `cheer()`/`stopCheer()`; skipped under reduced motion. Answer and Close buttons in the popover now have solid fills. On phones the headline melt's blur scales with font size (×fs/100, min .4), so small headlines don't shred. Undo: `cp public/prototypes/_backup/signal-2.pre-r25.html public/prototypes/signal-2.html` (`.pre-r25b.html` holds the animated toast).
