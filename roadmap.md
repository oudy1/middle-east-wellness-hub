- [x] Build the admin-only volunteer response table and secure sheet reader.
- [x] Register `/admin/volunteers` without exposing the private page in the sitemap.
- [x] Recording of Know Your Rights webinar on homepage + recordings page.
- [ ] Volunteer sheet: both linked Google accounts (Mahmoud's, Noweir's) still get 403; reader tries both. Waiting on user to share the sheet with one of them, or connect the true owner account. Also needs at least one admin in app_admins to open the page.
- [x] Batch 1: Programs convention turned into a recap (no sign-up).
- [x] Batch 1: spam guard (hidden trap, fill-time check, 5 per 10 min per visitor) on all forms that send email.
- [x] Batch 1: email errors no longer show provider details to visitors.
- [x] Batch 1: Join Our Team button points to /volunteer.
- [ ] User action: close the old Mental Health Convention Google Form in Google Forms.
- [x] Batch 1: admins via allowlist (default: infoprojectshams@gmail.com) + create-account on admin sign-in.
- [x] Batch 2: Scadding Court workshop card (text only, no partner logo, hides after Nov 19).
- [x] Batch 2: Newcomer and Refugee Health Education Initiative card on Programs.
- [x] Batch 2: BLCC dead links -> BLCC homepage; remove Persram dead link.
- [x] Batch 2: Weekly Topic renamed Featured Health Topic; news replaced with 2026 SHAMS updates.
- [x] Batch 2: newsletter replaced with Follow us on Instagram.
- [x] Batch 2: bilingual Privacy & Terms page; fix footer links.
- [x] Batch 2: "societies" sweep + official name in hero/footer; inquiry success message translated; hide expired opportunities.
- [x] Admin sign-up no longer needed: admin area removed at user request.
- [x] Fixed admin sign-in loop (admin list rule checked itself, so every admin page said Not authorized); added forgot-password + /reset-password.
- [ ] User review: Privacy page wording; newcomer initiative description. (Scadding Court workshop details + partner branding confirmed by the Nov 15 brief.)
- [x] Audit S1-S4: own title/description/canonical on 9 pages (EN+AR); 404 + admin pages hidden from search; sitemap cleaned (+find-healthcare-workers, physicians/apply, post-opportunity; -resources, -webinars); robots blocks /admin; English recordings heading "Webinars and Recordings" (Arabic kept as-is per user).
- [x] Hide ku/fa/tr until fully translated (menu offers only complete languages; saved hidden choice falls back to English).
- [x] Load pages on demand for phones (pages, lower homepage sections, chat window).
- [ ] Next audit item: homepage length/reorder (needs design approval).
- [x] AI Assistant audit (brief 2.0): report written; safe fixes done (OHIP FAQ, chat reset on close, Research Opportunities menu, 6 dead search anchors, ranked search, workshop/newcomer/directory/provider/researcher knowledge, webinar anchors, new greeting, tests).
- [x] AI Assistant: chatbot server update deployed (approved): synced links, provider/researcher forms, shorter answers, 3 safety replies, past convention, official sources, 20s timeout, no error leaks. 29/29 questions pass.
- [x] AI Assistant (Batch 3): New conversation button, merged search list, grouped search results.
- [x] Volunteer list: CSV export fallback on /admin/volunteers (read on the device only, not stored).
- [x] Modernization brief: researched the 19 readable GitHub projects; report in Files.
- [x] Modernization brief items 20-26: received in the Phase 2 brief and researched.
- [x] Translations moved to i18next (plural forms, missing-translation checks); Support Us page translated to Arabic; EN/AR pages re-tested.
- [x] Modernization: chatbot New conversation, Stop, Try again; one shared search list with Arabic spelling + typo tolerance, grouped/highlighted results, arrow keys.

## Modernization Phase 2 brief (uploaded Nov 12)
- [x] P0 Batch A: research GitHub refs 20-26 (report only, no new installs unless needed).
- [x] P0 Batch A: doctor listing approval workflow in the database (statuses, admin-only approval, reviewer + history, re-verification flag, no public duplicates, private applicant details).
- [x] P0 Batch A: admin review page for listings; Report incorrect information link + "listing does not guarantee availability" note on directory pages.
- [x] P0 Batch A: tests proving unapproved listings cannot be read or self-published through the public API.
- [ ] Later batches (need go-ahead per brief): guided healthcare navigation, resource finder filters, glossary review status, webinar library filters, programs status, research tracker expiry, Get Involved hub, FAQ, page feedback, homepage reorder, chatbot intent/sources, 60-scenario test suite, privacy-conscious error monitoring.
- [x] Doctor listings are now published by the agent on request (admin area removed).
- [ ] User review: updated directory wording on the Privacy & Terms page (now says listings appear only after review).

## Team and About page brief (uploaded Nov 15)
- [x] Replace public team with approved 28-person roster, subteams, leads, filters, search (EN/AR), Dr. Hawa kept
- [ ] Owner approval of the new About page before publishing (waiting on user)
- [ ] Confirm teams for Yasameen Ihsan, Zohra Ahmadzai, Barekah Vistro, Hanin Gamour (waiting on user)

## Modernization 4.0 brief (uploaded Nov 15)
- [x] Verify earlier search/chatbot/loading features still pass their tests.
- [x] "How Can We Help You?" guided navigator on Services, links only from the approved address list.
- [x] Directory: language filter (from listed languages only).
- [x] Report: GitHub 20 verdicts, audit findings, what was done, next batches.
- [ ] Later batches (need go-ahead): homepage reorder, research status labels, webinar archive search, event calendar, site feedback form, content workflow, 60-scenario tests.

## Nov 19 newcomer workshop brief (uploaded Nov 15)
- [x] Update the existing homepage workshop card (no duplicate): final title, details, new registration form, official EN/AR posters in a slider, enlarged poster view, Learn More, Add to Calendar, Get Directions.
- [x] Programs card shows Upcoming, then Completed (registration closed) after Nov 19; search + chatbot use the same record.
- [x] QR codes checked: both posters use a different short link (J6Jsy...) that opens the same Google Form as the new link.
- [ ] Publishing needs user approval.

## Modernization 5.0 brief (uploaded Nov 15, planning only)
- [x] Plan and assessment written (report in Files); no code changed.
- [ ] Batch 1 (waiting on approval): saved 60-question chatbot test, quick fixes (chat preload error, youtube-nocookie, long dashes if approved; reduced motion done), chat source cards, research study status labels (needs real statuses from user).
- [x] Visual and interaction batch (Nov 15): header menus (keyboard, on-screen, overview links), card style, poster sliders (SAWA, research portfolio, convention), header search panel, phone tap sizes and overflow, reduced motion. Not published.

## AI Assistant smart navigation brief (uploaded Nov 15)
- [x] Instant answers for common questions and safety messages (English, Arabic, dialect, mixed), offline fallback, two-button limit with sources, outside-link allowlist with event expiry, browser + live tests. Not published.
- [ ] Server-side follow-ups waiting on approval (going live immediately when deployed): stop logging visitor IP addresses in the chat function; settle one reply-language rule for English questions on the Arabic site.


## Easier integrations and content brief (uploaded Nov 15)
- [x] One shared event record (Know Your Rights, Convention, Nov 19 workshop) used by homepage, Programs, Recordings, news, chatbot and approved links.
- [x] Review statuses on events, recordings and studies; only published shown; tests flag missing Arabic.
- [x] Lifecycle: after the date "Registration closed" until SHAMS confirms; recordings/recaps replace sign-up buttons.
- [x] Lighter YouTube player with fallback link; research opportunities error + Try again; topic request form now opens email instead of faking success.
- [x] Shared status labels on admin review pages.
- [ ] After Nov 19: confirm the workshop took place, and send any recording or recap link (waiting on user).
- [ ] Real recruitment status of the 4 research studies (waiting on user).
- [x] Removed the whole admin area (sign-in, password reset, all admin pages) at user request.
