# Frontend modernization and resource discovery (focused batch)

## What is already done (from the last rounds, tested)
- Header menus: no gap closing, keyboard arrows/Escape, mobile drawer, overview links, Arabic fit at 1024px.
- Cards: shared card style and hover feedback on events, webinars, programs, resources, research and directory.
- Posters: Embla sliders with full posters (no cropping), tap to enlarge, swipe, 44px arrows, keyboard, language order, reduced motion.
- "How Can We Help You?" guide on Services, linked only to verified pages.
These stay as they are. I will re-run their tests rather than rebuild them.

## New in this batch
1. **Quick entry points on the homepage search.** A compact row of six buttons under the existing search box: Newcomer health, Arabic health information, Family doctors, Research opportunities, Programs, Webinar recordings. Each opens an existing verified page. English and Arabic, 44px tall, they wrap neatly on phones.
2. **Webinar recordings in the "How Can We Help You?" guide.** Add a seventh choice, "Watch a recording", that links to the Recordings page and the Know Your Rights recording.
3. **Check and fix pass.** Click through the header menus, cards and posters at phone and desktop size in English and Arabic. Fix only what is actually broken, and list each fix.

No new add-ons, no data, sign-up link or AI changes, nothing published.

## Technical details
- `src/lib/helpNavigator.ts`: add a `recordings` category with route keys from `content/chatbot-routes.json`. Add `QUICK_ENTRIES` (six route keys) so the homepage row and the guide share one list.
- `src/components/ResourceFinder/*`: render `QUICK_ENTRIES` as `Button asChild` links under the input.
- Tests: extend `helpNavigator.test.ts` (every quick entry resolves to a listed route) and `help-navigator.spec.ts` (click each quick entry in EN and AR). Re-run header, poster, lazy-loading and axe specs, plus a 375px no-sideways-scroll check.
