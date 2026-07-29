## SHAMS Assistant & Search Upgrade Plan

This is a large upgrade. I'll ship it in ordered phases so you can review after each. Each phase is self-contained and testable.

### Phase 1 — Unified Content Index (foundation)
Build a single searchable knowledge layer the chatbot and search bar both consume.

- Add `content/chatbot-routes.json` with the approved route map from your spec.
- Add `content/chatbot-suggestions.json` (quick replies EN/AR + follow-up prompts).
- Add `src/lib/knowledgeIndex.ts` that aggregates existing JSON (`studies.json`, `webinars.json`, `programs.json`, `researchers.json`, `faq.json`, MedlinePlus items, healthcare workers, family physicians, patient rights anchors, community services) into one normalized array:
  ```ts
  { id, title_en, title_ar, description_en, description_ar, category, tags[], keywords[], language, url, source, type }
  ```
- Keep sources file-based (no new DB tables) — matches your CMS-lite pattern in `content/`.

### Phase 2 — Smart Search Bar
Upgrade `ResourceFinder` to use the unified index.

- Replace `resourceFinderData.ts` scoring with a fuzzy + synonym + Arabic-aware matcher (typo tolerance via lightweight Levenshtein, synonym map for medical terms, city matching).
- Grouped results: Resources / Programs / Studies / Webinars / Healthcare Workers / Pages.
- Result cards: title, short description, category chip, Arabic badge when applicable, "View" button.
- Header stays as compact search icon → overlay (existing pattern preserved).
- Empty state: "No results found" + contact CTA.

### Phase 3 — Chatbot Retrieval + Personality
Rewire `supabase/functions/shams-chat` for content-grounded answers.

- Client sends user query + language; edge function performs local retrieval over a static bundled snapshot of the knowledge index (bundled at deploy) and injects top 5 matches into the system prompt as grounding context.
- New system prompt: warm, short, culturally respectful; enforces approved-route linking only; single-question follow-ups; medical safety escalation; fallback to `infoprojectshams@gmail.com`.
- Model: keep `google/gemini-3.6-flash` (fast, bilingual, multimodal) via Lovable AI Gateway. No OpenAI key needed — Lovable AI covers it and keeps the key server-side per your spec.
- Rate limiting: simple per-session-id token bucket in the edge function (in-memory + short-lived, ~20 msgs/min).
- Fallback: on model failure, return the deterministic "safest next step is to contact SHAMS" message with contact email.

### Phase 4 — Chat UI polish
- New default greeting (EN/AR) matching your spec.
- Quick-reply buttons rendered from `chatbot-suggestions.json` (6 EN, 6 AR).
- Response rendering: markdown links + action button chips parsed from a lightweight `[[action:route|Label]]` convention the model emits.
- Reset on reopen already in place (`useChatSession` starts fresh) — verify + document.
- Mobile: ensure chat window uses `100dvh` safe-area, bubble avoids bottom nav, quick replies wrap.

### Phase 5 — QA
- Manual pass through your 11 test queries.
- Playwright smoke test: greeting appears, quick reply click sends message, Arabic toggle flips RTL, search overlay opens/closes, grouped results render.
- Confirm no broken routes (all bot links validated against `chatbot-routes.json`).

### Technical notes
- No new database tables — content stays in `content/*.json`, matching existing architecture.
- Semantic search is done via keyword+synonym+fuzzy scoring locally, not embeddings, to keep it fast, offline, and free. If you later want true embeddings I can add pgvector in a follow-up.
- Approved-route enforcement: edge function post-processes model output and strips/rewrites any link not in the route map.
- Bilingual: all new strings routed through `LanguageContext`; missing content shows `المحتوى قيد الترجمة`.

### Out of scope (won't touch)
- Website visual redesign
- Existing pages beyond wiring anchors already listed in the route map
- Auth, admin dashboards, DB migrations

Approve and I'll start with Phase 1.
