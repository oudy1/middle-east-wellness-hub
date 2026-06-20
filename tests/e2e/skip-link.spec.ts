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

    // Before focus: rendered off-screen (translate-y-16) and fully transparent.
    const hiddenState = await link.evaluate((el) => {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return { opacity: Number(cs.opacity), bottom: rect.bottom };
    });
    expect(hiddenState.opacity).toBe(0);
    expect(hiddenState.bottom).toBeLessThanOrEqual(0);

    await focusSkipLink(page);
    await expect(link).toBeFocused();

    // Let the slide/fade transition finish.
    await page.waitForTimeout(500);

    const visibleState = await link.evaluate((el) => {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        opacity: Number(cs.opacity),
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
    });
    expect(visibleState.opacity).toBeGreaterThan(0.9);
    expect(visibleState.top).toBeGreaterThanOrEqual(0);
    expect(visibleState.width).toBeGreaterThan(40);
    expect(visibleState.height).toBeGreaterThan(20);
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

    // motion-reduce:transition-none should disable transitions (transition-property: none).
    await focusSkipLink(page);
    const transitionProperty = await link.evaluate(
      (el) => getComputedStyle(el).transitionProperty,
    );
    expect(transitionProperty).toBe("none");

    // Link is immediately visible (no animation in progress) and usable.
    const state = await link.evaluate((el) => {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return { opacity: Number(cs.opacity), top: rect.top, width: rect.width, height: rect.height };
    });
    expect(state.opacity).toBeGreaterThan(0.9);
    expect(state.top).toBeGreaterThanOrEqual(0);
    expect(state.width).toBeGreaterThan(40);
    expect(state.height).toBeGreaterThan(20);

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main-content$/);

    await context.close();
  });
});
