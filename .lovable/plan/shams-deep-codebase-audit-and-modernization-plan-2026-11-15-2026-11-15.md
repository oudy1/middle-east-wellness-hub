# SHAMS Deep Codebase Audit and Modernization Plan (2026-11-15)

Evidence came from reading the source, the live database rules and earlier test runs. Nothing was changed.

## 1. Architecture inventory (actual paths)
- Stack: React 18 + Vite + TypeScript, react-router-dom, TanStack Query, Radix/shadcn (`src/components/ui`), cmdk, Embla, i18next/react-i18next, zod, react-hook-form, Leaflet. Tests: vitest (17 files, 292 tests), Playwright + axe (`tests/e2e/`, 11 specs).
- Entry/router: `src/main.tsx`, `src/App.tsx` (36 routes, all except the homepage lazy-loaded with `lazyWithRetry`).
- Navigation: `src/components/Header.tsx` (desktop dropdowns, mobile drawer, search), `content/navigation.json`, `Footer.tsx`.
- Homepage: `src/pages/Index.tsx` plus sections (`HeroSection`, `NewcomerWorkshopFeature`, `MentalHealthConventionSection`, `PastWebinarFeature`, `MentorshipHighlight`, ...), lower ones in `LazySection`.
- Pages: Services/Resources (`Services.tsx`, `Resources.tsx`, `services/HelpNavigator.tsx`), Research (`Research.tsx`, `SHAMSResearchPortfolio.tsx`, `StudyCard.tsx`, `content/studies.json`), Programs (`Programs.tsx`, `Mentorship.tsx`), Directory (`Directory.tsx`, `FindHealthcareWorkers.tsx`, `PhysicianDirectory.tsx`, `FamilyPhysician*.tsx`), Team (`About.tsx` + `content/team.json`, `src/lib/team.ts`), Webinars/Events (`Webinars.tsx`, `content/events.json`, `content/webinars.json`, `src/lib/events.ts`).
- Chatbot: `src/components/chat/*`, `src/hooks/useChatSession.ts`, `src/lib/chatInstantAnswers.ts`, `knowledgeIndex.ts`, `chatbotRoutes.ts` + `content/chatbot-routes.json`, `approvedExternalLinks.ts`; server `supabase/functions/shams-chat/index.ts`.
- Search: `src/lib/searchText.ts`, `siteSearch.ts`, `resourceFinderData.ts`, `components/ResourceFinder/*`.
- Translations: `src/i18n/index.ts`, `content/translations/*.json`, `contexts` LanguageContext.
- Backend: 13 migrations, 3 functions (`shams-chat`, `send-contact-email`, `volunteer-sheet`), no storage buckets, SQL test `supabase/tests/healthcare_worker_approval.sql`.
- SEO: `SEOHead.tsx`, `public/sitemap.xml`, `public/robots.txt`, `.ics` files.

## 2. Findings

| # | Status | Where | Problem | Fix | Risk |
|---|---|---|---|---|---|
| F1 | Confirmed | `PhysicianDirectory.tsx`, `src/lib/physicianData.ts` | Doctors live in two hardcoded lists, separate from the reviewed `healthcare_workers` table. These listings skip the approval workflow and include personal emails (for example Dr. Hawa's). | Keep them, but move them into one reviewed source (option: import as published rows after you confirm consent). Dr. Hawa stays. | Medium |
| F2 | Confirmed | `public/sitemap.xml` | Missing public pages: /webinars, /resources, /terms, /cookies, /family-physician and city pages. | Generate the sitemap from the route list, with a test. | Low |
| F3 | Confirmed | `Programs.tsx`, `Mentorship.tsx`, `MentorshipHighlight.tsx` | The mentor and mentee form links are copied into 3 files. | Move them to one programs record used everywhere. | Low |
| F4 | Confirmed | `Research.tsx` (around line 532) | Affiliated researchers are hardcoded in the page, so search and the chatbot can't see them. | Move to `content/researchers.json`, kept separate from team.json. | Low |
| F5 | Confirmed | `Services.tsx`, `Research.tsx`, `Index.tsx` | Long dashes remain in visitor-facing text (for example the SAWA note), against your no-dash rule. | Replace them once you choose period or comma. | Low |
| F6 | Confirmed | `shams-chat` | The rate limit is kept in memory per server instance, so it resets on cold starts, and visitor IPs are written to logs. | Stop logging IPs (approval needed, this changes the live service). | Low |
| F7 | Not yet tested | External volunteer Google Form (`Volunteer.tsx`) | The brief says it asks for an address, identity background and a CV. That form lives on Google, so I can't read its fields from code. | You or I review it together; suggest dropping the address and identity fields, making the CV optional, and adding consent and retention wording. | Policy |
| F8 | Confirmed, OK | Database rules | Doctor submissions default to `pending_review`; the public sees only `published` rows; review fields are blocked by trigger; admins are granted on the server only; chat/lead tables are admin-read only and receive no public writes; no file storage exists. | Keep. | None |
| F9 | Confirmed, OK | Event facts | The Nov 19 sign-up link, Know Your Rights recording, convention reel and both mentorship links match the brief. The team has 28 members, and Dr. Hawa is listed in the directory. | Keep. | None |
| F10 | Not yet tested | Links | There is no automated check for dead outside links. | Add a link-check script (Lychee pattern, no install). | Low |

No duplicate route maps in navigation: header, search and chatbot already share `content/chatbot-routes.json` (test enforced). Dropdown keyboard and hover issues were fixed and tested last round.

## 3. GitHub-to-SHAMS mapping (only where useful)
- Radix Navigation Menu: Header already uses tested custom menus; no change.
- cmdk / Orama: search already does Arabic normalization, typos, ranking and keyboard use; no new engine.
- Embla: already used in the poster carousels; no change.
- react-i18next: already in use; extend to researchers and programs records.
- promptfoo: reuse its "assert links/language" pattern in `scripts/chatbot-eval.ts`; no install.
- Zod: validate `content/*.json` shapes in tests (`contentRecords.test.ts`).
- Lychee: copy the approach (scan links, report status) as a small bun script; Lychee is Apache/MIT licensed, nothing copied.
- axe-core / Playwright: already covered; add the new pages to the axe test.
- assistant-ui, Vercel AI SDK, React Hook Form, TanStack Query, Supabase: already fine or not needed.

## 4. Priorities
- P0: F1 (unreviewed doctor emails), F7 (form data minimization, your decision).
- P1: F2, F3, F4, F5, F6.
- P2: F10 link checker, content shape tests.
- P3: study status labels (waiting on real statuses), admin event editor (you declined).

## 5. Four small batches
1. Directory privacy (F1). Files: `PhysicianDirectory.tsx`, `physicianData.ts`, `FamilyPhysician*.tsx`. Hide personal emails and show clinic contact only, then later move the lists into the reviewed table. Done when no personal email shows publicly and Dr. Hawa still appears. Low complexity.
2. One record per program and researcher (F3, F4). Add `content/programs.json` and `content/researchers.json` with readers and tests, and connect them to search and the chatbot. Done when changing one link updates every page. Medium complexity.
3. SEO and links (F2, F10). Build the sitemap from routes with a test, and add `scripts/check-links.ts`. Done when every public route is in the sitemap and the link report runs clean. Low complexity.
4. Text and chatbot polish (F5, F6). Replace dashes and remove IP logging. Done when no long dashes remain and logs have no IPs. Low complexity.

## 6. Do not change
Instant chatbot answers and the language rule, the shared route list, search, event records and .ics files, the doctor approval workflow, team.json, poster carousels, header menus, lazy loading, spam guard, admin allowlist, the Nov 19 sign-up link.

## 7. Needs your approval
- F1: publishing existing doctor listings into the database (consent), and whether to hide the personal emails.
- F6: any redeploy of the chatbot service (it goes live immediately).
- F7: changes to the Google Form and privacy wording.
- F5: period or comma for the long dashes.
- Real recruitment statuses of the 4 studies.
- No paid services are proposed.
