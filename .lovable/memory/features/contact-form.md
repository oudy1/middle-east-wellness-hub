---
name: Contact Form
description: Real on-site contact form on /contact that emails infoprojectshams@gmail.com via Resend
type: feature
---

The user overrode the earlier "no internal submission forms" rule for the Contact page only.

- `src/components/ContactForm.tsx` — bilingual EN/AR form (name, email, subject, message), zod validation, RTL + font-cairo, 44px touch targets, success state with "send another".
- Calls edge function `send-contact-email`, which sends through the Resend connector gateway to infoprojectshams@gmail.com with the visitor's address as reply-to.
- Sender is `onboarding@resend.dev` until a SHAMS domain is verified in Resend. Verify projectshams.com and switch the `from` address for reliable delivery.
- Other forms elsewhere on the site still use external Google Forms or mailto links.
