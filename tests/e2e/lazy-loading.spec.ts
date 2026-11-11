import { test, expect } from "@playwright/test";

// Phones should only download what they need: other pages, lower homepage
// sections and the chat window load on demand, without breaking anything.
test.use({ viewport: { width: 390, height: 844 } });

test("homepage holds back lower sections until the visitor scrolls", async ({ page }) => {
  const scripts: string[] = [];
  page.on("request", (r) => r.resourceType() === "script" && scripts.push(r.url()));
  await page.goto("/");
  await expect(page.locator("#main-content")).toBeVisible();
  await page.waitForTimeout(1500);
  expect(scripts.some((u) => /PartnersSection/.test(u))).toBe(false);
  expect(scripts.some((u) => /pages\/Services|Services\.tsx/.test(u))).toBe(false);

  for (let i = 0; i < 30; i++) {
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(150);
  }
  await expect(page.locator("[data-lazy-section]")).toHaveCount(0);
  expect(scripts.some((u) => /PartnersSection/.test(u))).toBe(true);
});

test("chat window opens on first tap", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /open chat/i }).click();
  await expect(page.getByRole("textbox").last()).toBeVisible();
});

test("section links on other pages still jump to their section", async ({ page }) => {
  await page.goto("/services#diabetes-education");
  await expect(page.locator("#diabetes-education")).toBeInViewport({ timeout: 5000 });
  await page.goto("/recordings#webinar-know-your-rights");
  await expect(page.locator("#webinar-know-your-rights")).toBeInViewport({ timeout: 5000 });
});

test("menu links open other pages without a full reload", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => ((window as any).__noReload = true));
  await page.goto("/");
  await page.evaluate(() => ((window as any).__noReload = true));
  await page.locator("footer").getByRole("link", { name: /privacy/i }).first().click();
  await expect(page).toHaveURL(/\/privacy/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => (window as any).__noReload)).toBe(true);
});
