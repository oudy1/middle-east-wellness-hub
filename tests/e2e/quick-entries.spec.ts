import { test, expect } from "@playwright/test";

const expected = ["/programs", "/services", "/find-healthcare-workers", "/research", "/programs", "/recordings"];

for (const lang of ["en", "ar"] as const) {
  test(`homepage quick entries open their pages (${lang}, phone)`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.addInitScript((l) => localStorage.setItem("shams-language", l), lang);
    for (let i = 0; i < expected.length; i++) {
      await page.goto("/");
      const links = page.getByTestId("quick-entries").getByRole("link");
      await links.first().scrollIntoViewIfNeeded();
      await expect(links).toHaveCount(6);
      const box = await links.nth(i).boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      await links.nth(i).click();
      await expect(page).toHaveURL(new RegExp(expected[i]));
    }
    const w = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(w).toBeLessThanOrEqual(375);
  });
}
