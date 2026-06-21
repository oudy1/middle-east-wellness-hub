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

// Third-party embeds (Instagram, YouTube, Google Slides) ship their own
// a11y issues that we cannot fix from the SHAMS codebase. Exclude their
// iframes from the scan so the suite only reports project-owned regressions.
const THIRD_PARTY_EXCLUDES: string[][] = [
  ["iframe[src*='instagram.com']"],
  ["iframe[src*='youtube.com']"],
  ["iframe[src*='youtube-nocookie.com']"],
  ["iframe[src*='docs.google.com']"],
];

function builder(page: Page) {
  let b = new AxeBuilder({ page }).withTags(WCAG_TAGS);
  for (const sel of THIRD_PARTY_EXCLUDES) b = b.exclude(sel);
  return b;
}

async function runAxe(page: Page, label: string) {
  const results = await builder(page).analyze();
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

      let b = builder(page).include(selector);
      const results = await b.analyze();

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
