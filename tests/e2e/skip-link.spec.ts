import { test, expect, type Page } from "@playwright/test";

/**
 * Skip-to-content link checks (English / LTR).
 *
 * Verifies:
 *  - The link is the first focusable element and is visually hidden by default.
 *  - When focused, it becomes visible, aligned to the left of the viewport,
 *    and points to #main-content.
 *  - Activating it moves focus / scroll to <main id="main-content">.
 *  - prefers-reduced-motion: reduce disables the slide/fade transition.
 */

const SKIP_SELECTOR = 'a[href="#main-content"]';

async function focusSkipLink(page: Page) {
  // Reset focus to the document, then Tab once — the skip link must be first.
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur?.());
  await page.keyboard.press("Tab");
}

test.describe("Skip to content link (English LTR)", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("is hidden until focused, then becomes visible", async ({ page }) => {
    const link = page.locator(SKIP_SELECTOR).first();
    await expect(link).toHaveCount(1);

    // sr-only: zero-sized before focus
    const hiddenBox = await link.boundingBox();
    expect(hiddenBox?.width ?? 0).toBeLessThanOrEqual(1);
    expect(hiddenBox?.height ?? 0).toBeLessThanOrEqual(1);

    await focusSkipLink(page);
    await expect(link).toBeFocused();

    // Allow the slide/fade transition to complete.
    await page.waitForTimeout(400);

    const visibleBox = await link.boundingBox();
    expect(visibleBox, "skip link should have a layout box once focused").not.toBeNull();
    expect(visibleBox!.width).toBeGreaterThan(40);
    expect(visibleBox!.height).toBeGreaterThan(20);

    // Opacity must animate from 0 -> 1 (or be 1 immediately with reduced motion).
    const opacity = await link.evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeGreaterThan(0.9);
  });

  test("is correctly aligned to the left in LTR", async ({ page }) => {
    await focusSkipLink(page);
    await page.waitForTimeout(400);

    const link = page.locator(SKIP_SELECTOR).first();
    const box = await link.boundingBox();
    expect(box).not.toBeNull();

    const viewport = page.viewportSize()!;
    // Anchored near the left edge (Tailwind left-2 => 8px), well left of center.
    expect(box!.x).toBeLessThan(viewport.width / 2);
    expect(box!.x).toBeLessThanOrEqual(24);

    const dir = await link.getAttribute("dir");
    expect(dir).toBe("ltr");

    const textAlign = await link.evaluate((el) => getComputedStyle(el).textAlign);
    expect(["left", "start"]).toContain(textAlign);
  });

  test("activating it lands focus on #main-content", async ({ page }) => {
    await focusSkipLink(page);
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/#main-content$/);

    const main = page.locator("#main-content");
    await expect(main).toBeVisible();

    // The hash navigation should bring main into view at/near the top.
    const top = await main.evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeLessThan(200);
  });

  test("respects prefers-reduced-motion during navigation", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const link = page.locator(SKIP_SELECTOR).first();

    // motion-reduce:transition-none should zero out transition-duration.
    await focusSkipLink(page);
    const duration = await link.evaluate((el) => getComputedStyle(el).transitionDuration);
    const durations = duration.split(",").map((d) => parseFloat(d.trim()));
    for (const d of durations) {
      expect(d).toBe(0);
    }

    // Link still becomes visible immediately and is usable.
    const box = await link.boundingBox();
    expect(box!.width).toBeGreaterThan(40);
    expect(box!.height).toBeGreaterThan(20);

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main-content$/);

    await context.close();
  });
});
