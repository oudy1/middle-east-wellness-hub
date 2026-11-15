# Browser and regression test pass (no feature changes)

## What I will do
1. Run all existing automated checks (327) and all browser tests (27+) on the current preview.
2. Write one new test-only browser script (kept outside the site code, in a temp folder) that walks the 7 journeys on desktop (1280px) and phone (375px), in English and Arabic:
   1. Nov 19 workshop: find it on the homepage, confirm Register Now opens https://forms.gle/ipEVd8Np1tDy1GVD7 (the form is not filled in or sent).
   2. Know Your Rights: open the recording and confirm the video player loads.
   3. Search "diabetes" / "السكري" and confirm Arabic diabetes resources come up and open the right section.
   4. Family physicians by city (for example Toronto): results page and filters.
   5. Chatbot: ask a few questions with a stand-in for the AI (no real AI cost, no messages stored) and click each button to the correct page and section.
   6. Mentorship: mentor and mentee buttons open the approved Google Forms (not filled in).
   7. Research: open an opportunity or study card and its link.
   For each one: correct result, link, page, scroll position, button working, no console errors, phone layout, right language, no sideways scrolling.
3. Also check header dropdowns, the mobile drawer, posters, webinar and program links, RTL alignment and missing translations.
4. Screenshot anything that looks wrong.

## Output
A report in your Files with the table: Test | Expected | Actual | Pass/Fail | Evidence | Recommended fix, separating confirmed failures from tests I couldn't complete. Screenshots attached for real visual issues.

## Not done
No site changes, no fixes (only recommended), no real forms, listings or messages, nothing published.
Known limit: Google Forms and YouTube are outside the site; I can confirm the link and player load, but outside pages may block automated browsers.
