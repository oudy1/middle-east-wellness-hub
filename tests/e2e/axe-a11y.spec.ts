import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Automated Axe accessibility scans for:
 *  - the landing page in its default state
 *  - the landing page after activating the skip-to-content link
 *
 * We tag the scans with WCAG 2.0/2.1 A & AA rules, which matches the
 * project's stated baseline. Failures print the affected nodes so a
 * regression is easy to locate.
 */

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

const SKIP_SELECTOR = 'a[href="#main-content"]';

function formatViolations(violations: Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"]) {
  return violations
    .map((v) => {
      const nodes = v.nodes
        .slice(0, 3)
        .map((n) => `      - ${n.target.join(" ")}`)
        .join("\n");
      return `  • [${v.id}] ${v.help} (${v.impact ?? "n/a"})\n    ${v.helpUrl}\n${nodes}`;
    })
    .join("\n\n");
}

async function runAxe(page: Page, label: string) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  if (results.violations.length > 0) {
    // eslint-disable-next-line no-console
    console.log(`\nAxe violations on ${label}:\n${formatViolations(results.violations)}\n`);
  }
  return results;
}

test.describe("Axe a11y scans", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    // Settle async UI (chat widget, lazy sections) before scanning.
    await page.waitForTimeout(600);
  });

  test("landing page has no WCAG A/AA violations", async ({ page }) => {
    const results = await runAxe(page, "landing page (default)");
    expect(results.violations).toEqual([]);
  });

  test("landing page sections (header, main, footer) scan clean individually", async ({ page }) => {
    for (const selector of ["header", "main#main-content", "footer"]) {
      const locator = page.locator(selector).first();
      await expect(locator).toBeVisible();

      const results = await new AxeBuilder({ page })
        .include(selector)
        .withTags(WCAG_TAGS)
        .analyze();

      if (results.violations.length > 0) {
        // eslint-disable-next-line no-console
        console.log(`\nAxe violations in ${selector}:\n${formatViolations(results.violations)}\n`);
      }
      expect(results.violations, `violations in ${selector}`).toEqual([]);
    }
  });

  test("skip-to-content flow scans clean before and after activation", async ({ page }) => {
    // Before: link present but visually hidden.
    const beforeResults = await runAxe(page, "landing page (pre skip-link focus)");
    expect(beforeResults.violations).toEqual([]);

    // Focus + activate the skip link.
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur?.());
    await page.keyboard.press("Tab");
    await expect(page.locator(SKIP_SELECTOR).first()).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main-content$/);

    const afterResults = await runAxe(page, "landing page (post skip-link activation)");
    expect(afterResults.violations).toEqual([]);
  });
});
