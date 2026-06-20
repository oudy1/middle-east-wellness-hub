## Plan: Home/End Keyboard Shortcuts for MedlinePlus Cards

### What
Extend the existing keyboard navigation in the MedlinePlus card grid so pressing **Home** jumps to the first visible card and **End** jumps to the last visible card. The focus behavior should match the existing arrow-key implementation: `preventScroll: true` on `focus()`, then `scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })`.

### Where
- `src/pages/Services.tsx` — inside the existing `useEffect` that handles card keyboard navigation (~lines 196–251).

### How
1. In the `onKeyDown` listener inside the `useEffect`, add `Home` and `End` to the allowed keys alongside the existing arrow keys.
2. When `Home` is pressed and the active element is a MedlinePlus card (`cards.findIndex`), focus `cards[0]` with the same smooth-scroll behavior.
3. When `End` is pressed, focus `cards[cards.length - 1]` with the same smooth-scroll behavior.
4. Keep the cleanup logic unchanged; re-run on `[activeFilter, language, searchQuery]` so the shortcuts adapt to the current filtered card set.

### Why not questions
- The scope is narrow and the pattern is already established in the codebase.
- No UI, layout, or structural changes are involved.
- The desired behavior (`focus + smooth scroll`) is explicitly specified.
