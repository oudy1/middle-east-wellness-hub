---
name: CMS-like Content Layer
description: JSON content files under /content/ for CMS-ready architecture
type: feature
---

## Phase 1 (Done)
- `content/translations/{en,ar,ku,fa,tr}.json` — 260 keys per language, imported by LanguageContext
- `content/webinars.json` — 3 webinars with bilingual content, imported by Webinars page
- `content/studies.json` — 4 studies with bilingual content, imported by studyData.ts

## Phase 2 (Done)
- `content/team.json` — affiliatedPhysicians + projectTeam, imported by TeamSection.tsx
- `content/researchers.json` — 8 researchers with bilingual bios, imported by Research.tsx
- `content/weekly-topics.json` — weekly topic entries with image refs, imported by TopicOfTheWeekSection.tsx
- `content/programs.json` — 4 partner programs, imported by Programs.tsx

## Phase 3 (Planned)
Content files:
- `content/glossary.json`
- `content/faq.json`
- `content/site-settings.json`
- `content/navigation.json`
- `content/resources.json`
- `content/chatbot-routes.json`
- `content/healthcare-workers.json` (seed file for DB, not runtime)

Asset reorganization:
- `/public/logo/shams-logo.png`
- `/public/og/og-image.png`
- `/public/favicons/*`
- `/public/posters/*`
- `/public/slides/*`
- `/public/pdfs/*`
- `/public/images/*`

Web manifest & SEO:
- `robots.txt` (exists)
- `sitemap.xml`
- `manifest.webmanifest`
