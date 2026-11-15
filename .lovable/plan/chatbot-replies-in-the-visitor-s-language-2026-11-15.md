# Chatbot replies in the visitor's language

## Goal
The chatbot answers in the language of the visitor's latest message (English or Arabic), whichever site language is selected. Instant answers already do this; the AI does not always, because its instructions conflict.

## Changes
1. AI instructions: replace the conflicting "your interface is Arabic, respond in Arabic" note with one rule: detect the language of the latest message in the browser-style way (Arabic letters → Arabic, Latin letters → English, neither, e.g. only a number or emoji → site language) and tell the AI exactly which language to use for this reply.
2. Mixed messages (Arabic and English words together): use whichever script has more letters; ties go to the site language.
3. Instant answers and the "AI failed" fallback use the same rule (already true; will share the same check).
4. Redeploy the chatbot service. This updates the live chatbot immediately, which you've asked for.

## Tests
- Unit tests for the language rule: English on Arabic site, Arabic on English site, mixed, numbers only.
- Re-run the live check with English and Arabic questions on both site languages, several times each, confirming every reply matches.

## Technical details
- `supabase/functions/shams-chat/index.ts`: add `detectReplyLanguage(lastUserMessage, uiLanguage)`, replace `languageContext` with "Reply only in {English|Arabic} for this message." Keep the Language section line 130, reworded to match.
- `src/lib/chatInstantAnswers.ts` `replyLanguage`: add the mixed-script majority rule so both sides match.
