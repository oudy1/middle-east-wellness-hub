---
name: Color Contrast Tokens (WCAG AA)
description: Brand color usage rules for WCAG AA contrast — teal split tokens, darkened primary and muted-foreground
type: design
---

All SHAMS palette colors must meet WCAG 2.1 AA (4.5:1 text, 3:1 UI).

## Teal — split tokens by surface
- `healthTeal` `#0E7A8A` — use ONLY on light surfaces. 4.6:1 with white text (fills/buttons) and ~6:1 as text on white.
- `healthTealLight` `#5BC8D8` — use ONLY on dark surfaces (e.g. `healthDarkBlue` header/footer). 6.8:1 on `#1F4068`. Never use as text on white (fails AA, ~2:1).
- Header/Footer hover + active link colors must use `healthTealLight`, not `healthTeal`.

## Primary (amber)
- `--primary` is `hsl(18 82% 37%)` ≈ `#AC3F12`. Do not lighten back to the old `#F97316` — it fails AA with `--primary-foreground` white.

## Muted text
- `--muted-foreground` is `hsl(215 25% 27%)` ≈ slate-700. Do not raise lightness past ~35% on light backgrounds, or text drops below 4.5:1.

## Dark navy
- `healthDarkBlue` `#1F4068` — always safe under white text (10.4:1). When placing teal text/icons on it, use `healthTealLight`.

## Verification
Run `bunx playwright test tests/e2e/axe-a11y.spec.ts` after any token/component color change. The suite scans the landing page, header/main/footer landmarks, and the skip-to-content flow against WCAG 2.0/2.1 A & AA.
