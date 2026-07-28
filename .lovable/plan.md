
# Translation System Audit & Fix

Goal: Every user-visible string translates when switching EN ↔ AR, with correct RTL, consistent terminology, and a clear fallback for missing keys. No redesign.

## Approach

Fix in **priority tiers**, ship each tier as a discrete pass so you can review before moving on. This avoids one massive change and keeps risk low.

---

## Tier 1 — Foundation (safe, immediate)

1. **Standardize glossary**: add a `glossary.*` namespace to `content/translations/en.json` and `ar.json` with your exact required translations (Home → الرئيسية, About → من نحن, Learn More → اعرف المزيد, Submit → إرسال, etc. — all 25 terms you listed). Any component using these labels will read from the glossary so wording stays identical everywhere.
2. **Fix the missing-key fallback** in `src/contexts/LanguageContext.tsx`:
   - When `language === "ar"` and a key resolves to English (or is missing), return `المحتوى قيد الترجمة` instead of leaking the raw key/English.
   - In dev only, `console.warn` the missing key and log to a `window.__missingI18n` set so we can enumerate gaps.
3. **RTL font/direction sanity**: verify `<html dir>` and `font-cairo` toggling still works; confirm no hardcoded `text-left`/`ml-*`/`mr-*` in header, drawer, footer, chatbot (replace with `text-start`/`ms-*`/`me-*` where they break RTL).

## Tier 2 — Untranslated files

Convert these 4 pages/forms (the only ones with zero i18n hookup) to use `useLanguage` + `t()`:
- `src/pages/Resources.tsx`
- `src/pages/MentorshipBooking.tsx`
- `src/pages/PostOpportunity.tsx`
- `src/components/PhysicianApplicationForm.tsx`, `PostOpportunityForm.tsx`, `TopicRequestForm.tsx` (form labels, placeholders, errors, success toasts)

Skip admin-only surfaces (`AdminLogin`, `MetricsDebug*`) — not public.

## Tier 3 — Leak sweep across translated files

Automated scan + manual fix in the 54 files that already use `useLanguage`:
- Ripgrep for JSX text nodes and common attributes (`placeholder=`, `aria-label=`, `title=`, `alt=`) containing English letters that are NOT wrapped in `t()` or a `language === "ar" ? ... : ...` ternary.
- Fix by either: (a) adding a key to `en.json`/`ar.json` and swapping to `t("…")`, or (b) extending the inline ternary if it's already bilingual but missing one branch.
- Priority order matches your QA checklist: Home → Header/dropdowns → Mobile drawer → Services/Resources → Research → Recordings → Healthcare Workers → Chatbot → Footer.

## Tier 4 — Dynamic content sources

Content JSON files (`content/faq.json`, `glossary.json`, `navigation.json`, `studies.json`, `webinars.json`) and data modules (`src/lib/physicianData.ts`, `resourceFinderData.ts`, `studyData.ts`): verify each item has both `titleEn/titleAr` (or equivalent) fields and that the consuming component picks the right one based on `language`. Where an AR field is empty, render the fallback string instead of leaking English.

## Tier 5 — QA pass

Run a scripted Playwright pass that:
1. Loads each route from your checklist in AR mode.
2. Confirms `dir="rtl"` and font-cairo present.
3. Extracts visible text and flags any Latin-only substrings longer than N chars that aren't in a whitelist (emails, URLs, brand names like SHAMS/MedlinePlus/HealthLinkBC, medical acronyms).
4. Opens each header dropdown + mobile drawer + chatbot; screenshots for visual confirmation of no overflow/cutoff.
5. Reports a per-page diff of remaining English leaks.

## Deliverables per tier

- Tier 1–2: code changes + updated JSON files.
- Tier 3: PR-style summary listing every key added and every string replaced.
- Tier 4: table of dynamic content files with AR coverage status.
- Tier 5: Playwright report saved to `/tmp/browser/i18n-audit/report.md` with screenshots.

## Technical notes

- Fallback string constant `MISSING_AR = "المحتوى قيد الترجمة"` exported from `LanguageContext` so anything (including data files) can use it consistently.
- Keep names, emails, URLs, `SHAMS`, `MedlinePlus`, `HealthLinkBC`, ICD/CPT codes in English in both modes — whitelist these in the QA scanner.
- No visual redesign: RTL fixes stay limited to logical properties (`ms-*`, `me-*`, `text-start`, `text-end`), no layout restructure.
- `content/translations/{ku,fa,tr}.json` are out of scope for this pass unless you say otherwise; fallback rule still applies to them so they won't regress.

## Rough size

~30–60 new translation keys, ~15–25 files touched in Tier 3, ~5 files in Tier 2. Tier 5 is the honest verification — expect a second small cleanup pass after the report.

**Please confirm you want me to proceed tier-by-tier (I'll ship Tier 1+2 first, then pause for review), or if you want everything in one pass.**
