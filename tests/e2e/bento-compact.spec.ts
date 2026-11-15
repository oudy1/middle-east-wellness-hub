import { test, expect } from "@playwright/test";

const KEYS = ["resources", "newcomer_initiative", "healthcare_workers", "mentorship", "research", "recordings"];

for (const lang of ["en", "ar"] as const) {
  test(`homepage topic cards stay compact on phones (${lang})`, async ({ page }) => {
    const width = 390;
    await page.setViewportSize({ width, height: 844 });
    await page.addInitScript((l) => localStorage.setItem("shams-language", l), lang);
    await page.goto("/");

    const section = page.locator("[aria-labelledby='help-grid-title']");
    for (let y = 0; y < 25 && !(await section.count()); y++) {
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(200);
    }
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();

    for (const key of KEYS) {
      const card = page.locator(`[data-bento-key="${key}"]`);
      await expect(card).toBeVisible();
      const box = await card.boundingBox();
      // touch target: never below 44px
      expect(box!.height).toBeGreaterThanOrEqual(44);
      // compact: a phone shows several cards at once
      expect(box!.height).toBeLessThanOrEqual(120);
      expect(box!.width).toBeLessThanOrEqual(width);
    }

    const sectionBox = await section.boundingBox();
    // six cards plus heading fit inside about one phone screen and a half
    expect(sectionBox!.height).toBeLessThanOrEqual(900);

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(width);
  });
}
