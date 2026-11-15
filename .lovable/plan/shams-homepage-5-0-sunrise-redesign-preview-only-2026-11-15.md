# SHAMS Homepage 5.0: Sunrise Redesign (preview only)

Homepage only, plus the small shared pieces it needs. Existing content, the Nov 19 registration link, posters, partner logos, logo, both languages, search, chat and event logic stay as they are. Nothing gets published without your approval.

## Conflicts with your saved rules (I'll follow the saved rule unless you say otherwise)
- The brief says "communities". Your rule says MENA "societies", so the new text will say "societies".
- The brief's title uses long dashes. Your rule bans them, so the new text won't have any.
- "Spacious" vs your "compact layouts" rule: I'll keep sections tight, with no full-screen blocks.
- Animation: the site has no animation library. I'll use CSS + SVG plus a small scroll helper, and add no new library (no Motion or GSAP).

## New homepage order
1. **Sunrise hero**: text and the two buttons ("Explore Health Resources" goes to /resources, "Discover SHAMS" goes to /about). An SVG sun rises once in about 0.8s with soft rays, on a cream-to-peach-to-gold background. No loader, and the logo is untouched. On phones the text comes first and the sun sits behind it.
2. **Featured event (Nov 19 workshop)**: the current event card restyled. Details sit on one side and the bilingual poster carousel on the other, and tapping a poster enlarges it. The registration and "after the date" rules stay the same.
3. **"What can SHAMS help you with?" grid**: six whole-card links in mixed sizes (Resources, Newcomer support, Find healthcare workers, Mentorship, Research, Webinars). Cards lift gently on hover and show a clear focus ring. On phones they stack.
4. **"From Questions to Clarity" journey**: three steps (Understand, Find Support, Connect and Grow) along a gold path that draws itself as you scroll, with a moving marker and a background that shifts from cream to gold to soft blue. Nothing pins or traps scrolling. Phones get three simple steps. With reduced motion, everything shows complete and static.
5. **Learn with SHAMS**: one swipeable row made from the current recording and webinar cards (Know Your Rights, Women's Health and others). No duplicates, no autoplay, and videos load only when played. Ends with a "View All Recordings" link.
6. **Weekly topic**: cleaner card that shows the right poster for each language, with the source link. No new topic is invented.
7. **Past event**: one small card for the Mental Health Convention with a "Watch Recap" link to the Instagram reel, with no large embed.
8. Remaining sections (research teaser, news, team, partners, newsletter) keep their content in the new card style.

Sections this would replace or merge (each repeats something above): WhatIsSHAMS/WhatWeDo/Mission (into the hero and grid), FeaturedWebinarBanner + ResearchWebinarCarousel + PastWebinarFeature (into Learn with SHAMS), UpcomingEventsSection (already covered by the featured event), and the ResourceFinder "Start here" links (into the grid; the search box stays). No pages or links get removed from the site.

## Colors and type
Palette tokens: cream, sunrise orange, soft gold, deep blue, dark teal, peach. Matched to the logo and added to the shared color settings, so no one-off colors. Current fonts stay, with Cairo for Arabic.

Small extras: a thin orange scroll-progress line at the top, and gentle fade-ins as sections appear. No cursor effects, particles or 3D.

## Header
Light polish only: compact height, logo size checked. Dropdowns, search, language menu and the phone menu keep working as now.

## Checks
- All new text in English and Arabic, with Arabic laid out right to left. Carousels swipe the right way in Arabic.
- Existing tests plus a new browser test: the grid links all go to real pages, the journey content shows with reduced motion, there's no sideways scroll on phones, and the register link is unchanged.
- Screenshots of desktop and phone in both languages for you to review.

## Technical details
- New: `src/components/home/SunriseHero.tsx`, `HelpBentoGrid.tsx`, `JourneySection.tsx` (IntersectionObserver plus scroll progress drives the SVG `stroke-dashoffset`, rAF-throttled, off when `prefers-reduced-motion` or `<md`), `LearnWithShams.tsx` (Embla, `direction: rtl` for Arabic), `ScrollProgress.tsx`.
- Grid links use route keys from `content/chatbot-routes.json`, and a test fails on any unknown key.
- Event data stays in `src/lib/events.ts`, recordings in `content/webinars.json`, and lazy loading keeps `LazySection`/`lazyWithRetry`. The hero stays eager for fast first paint.
- Tokens go in `src/index.css` + `tailwind.config.ts` (HSL). New strings go in `content/translations/*.json`.
