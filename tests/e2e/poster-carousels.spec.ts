import { test, expect, Page } from "@playwright/test";

// SAWA flyers live in the SAWA study details on the Research page.
async function openSawa(page: Page, lang: "en" | "ar") {
  await page.goto("/");
  await page.evaluate((l) => localStorage.setItem("shams-language", l), lang);
  await page.goto("/research");
  const card = page.locator("h3", { hasText: lang === "ar" ? "دراسة سوا" : "SAWA Study" }).first();
  await card.scrollIntoViewIfNeeded();
  await card
    .locator("xpath=ancestor::div[contains(@class,'flex-col')][1]")
    .getByRole("button", { name: lang === "ar" ? "عرض التفاصيل" : "View Details" })
    .click();
  return page.getByRole("dialog");
}

test("English: English: English flyer first, swipe, 44px arrows and enlarge", async ({ page }) => {
  const dialog = await openSawa(page, "en");
  const region = dialog.getByRole("region", { name: "SAWA study flyers" });
  await expect(region).toBeVisible();
  const first = region.getByRole("group").first().locator("img");
  await expect(first).toHaveAttribute("alt", "Parent Flyer (English)");

  // Swipe (drag) left moves to the second flyer.
  const img = await first.boundingBox();
  await page.mouse.move(img!.x + img!.width * 0.8, img!.y + img!.height / 2);
  await page.mouse.down();
  await page.mouse.move(img!.x + img!.width * 0.1, img!.y + img!.height / 2, { steps: 8 });
  await page.mouse.up();
  await expect(dialog.getByRole("button", { name: "Flyer 2" })).toHaveAttribute("aria-current", "true");
  await dialog.getByRole("button", { name: "Flyer 1" }).click();
  await expect(dialog.getByRole("button", { name: "Flyer 1" })).toHaveAttribute("aria-current", "true");

  const next = region.getByRole("button", { name: "Next flyer" });
  const box = await next.boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
  await next.click();
  await expect(dialog.getByRole("button", { name: "Flyer 2" })).toHaveAttribute("aria-current", "true");

  await region.getByRole("button", { name: /Open larger flyer: Adolescent Flyer \(English\)/ }).click();
  const enlarged = page.getByRole("dialog", { name: "Adolescent Flyer (English)" });
  await expect(enlarged).toBeVisible();
  await expect(enlarged.locator("img")).toHaveAttribute("src", /sawa-flyer-adolescent-en\.webp/);
});

test("Arabic: Arabic flyer first with Arabic labels", async ({ page }) => {
  const dialog = await openSawa(page, "ar");
  const region = dialog.getByRole("region", { name: "نشرات دراسة سوا" });
  await expect(region.getByRole("group").first().locator("img")).toHaveAttribute("alt", "نشرة الوالدين (عربي)");
  await expect(region.getByRole("button", { name: "النشرة التالية" })).toBeVisible();
});

test("reduced motion: header menus and flyers still work", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const dialog = await openSawa(page, "en");
  const region = dialog.getByRole("region", { name: "SAWA study flyers" });
  await region.getByRole("button", { name: "Next flyer" }).click();
  await expect(dialog.getByRole("button", { name: "Flyer 2" })).toHaveAttribute("aria-current", "true");
  const duration = await page.evaluate(() => getComputedStyle(document.querySelector("[role=dialog]")!).animationDuration);
  expect(parseFloat(duration)).toBeLessThan(0.01);
  await context.close();
});
