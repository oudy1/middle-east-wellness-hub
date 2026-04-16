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

## Phase 3 (Done)
- `content/navigation.json` — mainNav, footerNav, languages config (reference file, not yet wired into Header)
- `content/glossary.json` — 4 bilingual health terms (OHIP, CAMH, IFHP, 988)
- `content/faq.json` — 5 bilingual FAQ entries (general, healthcare, research)
- `public/sitemap.xml` — 15 pages with priorities
- `public/manifest.webmanifest` — standalone installability manifest
- `public/robots.txt` — updated with sitemap reference

### Asset note
`public/lovable-uploads/` is managed by Lovable and should not be reorganized. Files are referenced by UUID paths across the codebase.
