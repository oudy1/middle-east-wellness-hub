# Webinar topic requests: save each one and email it right away

## Today
The "Suggest a webinar topic" form on the Webinars page only opens the visitor's own email app (a mailto link). Nothing is saved, and if the visitor doesn't press Send, SHAMS never hears about it.

## What changes
1. **Saved:** every request (name, email, topic, details, language, time) is stored in the site's database. Visitors can submit, but nobody can read, edit or delete requests except SHAMS admins.
2. **Emailed right away:** each request is emailed to infoprojectshams@gmail.com the moment it's saved. The email's Reply goes straight to the visitor. It uses the same email service as the Contact form, which you confirmed arrives.
3. **Admin list:** a new "Topic requests" page in the admin area shows all requests, newest first, in English and Arabic.
4. **Visitor experience:** the form shows a clear "Thank you, we received your suggestion" message in English or Arabic. If saving fails, it says so and offers the email link as a backup.
5. **Spam:** the same hidden spam trap and timing check as the Contact form, plus length checks. No submission cap, as you asked before.

Note: your saved rule says the site uses outside forms or email links instead of its own forms. This request replaces that for the topic form only. I'll record the exception.

## Checks
- Send one test request, confirm it's saved and the email is sent, then delete only that test entry.
- Tests: visitors can't read requests; the form shows thanks in EN and AR.

## Technical details
- Migration: `webinar_topic_requests` (id, name, email, topic, description, language, created_at). Grants: anon/authenticated INSERT only, through an RLS policy with length/format checks; admin SELECT via `is_app_admin()`; service_role ALL.
- `send-contact-email`: add `kind: "topic_request"`. After the spam guard, it inserts the row with the service role, then emails via Resend ("[SHAMS Topic Request] ..."). Generic errors only, never provider details. Redeploy (live immediately).
- `TopicRequestForm.tsx`: use `useSpamGuard`, invoke the function, show a success or error state, and keep mailto only as the fallback.
- New `src/pages/AdminTopicRequests.tsx` at `/admin/topic-requests` (admin-guarded like the other admin pages), linked from the admin pages.
- Memory: note the exception to the "no internal forms" rule.
