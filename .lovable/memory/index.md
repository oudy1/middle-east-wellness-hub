# Memory: index.md
Updated: just now

# Project Memory

## Core
Bilingual EN/AR: Arabic uses RTL, font-cairo. No em dashes (—). Show 'المحتوى قيد الترجمة' for missing translations.
Identity: Toronto-based. MENA "societies" (never "communities"). Email: infoprojectshams@gmail.com.
Forms: No internal submission forms. Use external Google Forms or mailto: links.
Design: Compact layouts, no oversized elements. No large posters in feeds—use thumbnails + modals. Mobile-first (44px touch targets).
Security: Strict RLS (insert-only for public). Chat history isolated via persistent x-session-id in localStorage.
Chatbot: Warm, short responses, no em dashes. Resets on reopen. Strict crisis routing to 911/988.
Content: CMS-like JSON layer under /content/. Translations, webinars, studies extracted. Phase 2 pending.

## Memories
- [Bilingual RTL Guidelines](mem://style/bilingual-rtl-guidelines) — RTL formatting, Arabic typography, translation fallbacks
- [Security Architecture](mem://technical/security-architecture) — RLS policies, session-id for chat isolation, app_admins
- [Healthcare Directory](mem://features/healthcare-directory) — City-based search filters without external map APIs
- [Volunteer Flow](mem://features/volunteer-flow) — External Google Form integration for volunteers
- [Logo Assets](mem://style/logo-assets) — Primary transparent logo usage, sizing, and placement rules
- [Clinical Tools](mem://features/clinical-tools-section) — Point-of-Care Templates section for medical professionals
- [Mobile Chat UX](mem://style/mobile-chat-ux) — 100dvh safe-area-inset padding and native form submission
- [Chatbot Logic & Persona](mem://features/chatbot-logic-and-persona) — Navigation whitelist, query param pre-filling, bilingual safety footer
- [Chatbot Navigation](mem://technical/chatbot-navigation-logic) — SPA-safe useNavigate transitions and auto-close UX
- [Mission & Identity](mem://about/mission-and-identity) — Non-profit positioning, location, official terminology
- [Clubs Section](mem://features/clubs-section) — Specific logo restrictions for university club cards
- [Patient Rights Section](mem://features/patient-rights-section) — Direct links to Ontario Health atHome EN/AR guidance
- [Partner Programs Page](mem://features/partner-programs-page) — Layout for mental health support initiatives like BLCC
- [Contact Page Design](mem://features/contact-page-design) — Streamlined hub directing users to external contact methods
- [Services Page Structure](mem://features/services-page-structure) — Categorized grid, sticky filter bar, emergency quick-access
- [Research Studies System](mem://features/research-studies-system) — Compact study cards, modal integration, and carousel displays
- [Submission Workflow](mem://features/submission-workflow-redesign) — Direct email-based application processes
- [Affiliated Researchers](mem://features/affiliated-researchers-section) — Standardized bilingual bios and external link styling
- [Research Portfolio](mem://features/research-portfolio) — Two-column abstract toggle and image carousel layouts
- [Weekly Topic Module](mem://features/weekly-topic-module) — Bilingual health themes linked to Instagram content
- [Webinar Highlight](mem://features/webinar-highlight) — YouTube and Google Slides (/pubembed) interactive embeds
- [Layout & Density](mem://style/layout-and-density) — Spacing principles to maintain a cohesive academic aesthetic
- [Content Layer](mem://features/content-layer) — CMS-like JSON architecture, Phase 1 done, Phase 2 planned
