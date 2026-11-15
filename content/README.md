# Editing SHAMS content

Content lives in these files and every page reads it from here. Enter each item once.

## Events (`events.json`)
One record per event. Fields:
- `status`: `draft`, `pending_review`, `approved`, `published` or `archived`. Only `published` is shown.
- `dateIso` (Toronto date, `YYYY-MM-DD`), optional `startUtc` / `endUtc` (calendar times, `YYYYMMDDTHHMMSSZ`).
- `en` / `ar`: `title`, `date`, `time`, `place`. Arabic is required before publishing (a test checks it).
- `posters`: poster keys listed in `POSTERS` in `src/lib/events.ts` (upload the file as an asset, add the key once).
- `registrationUrl`: shown only while the event is upcoming.
- `detailsPath`: the page section with the full details.
- After the event: set `heldConfirmed: true` once SHAMS confirms it happened, add `recordingId` (an id in `webinars.json` with a `youtubeId`) and/or `recapUrl`. Until then the site says "Registration closed", never "Completed".
- Keep old events in the file (set `archived` to stop promoting them) so history is preserved.

## Recordings (`webinars.json`)
`status`, `youtubeId`, `en` / `ar` title, description, speakers, button text. Link to an event with `eventId`; the date then comes from the event.

## Research studies (`studies.json`)
`status` plus English and Arabic title and summary. Real recruitment status labels need SHAMS confirmation.

Run `bunx vitest run` after any change: it fails on missing Arabic, unknown posters, broken recording links or invalid statuses.
