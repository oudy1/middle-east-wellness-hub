import { test, expect } from "@playwright/test";

// Homepage workshop card: poster order follows the language, Register Now goes
// straight to the current form, and the enlarged poster view also offers it.
// Runs before November 20, 2026 (Toronto); after that the card hides itself.

const FORM = "https://forms.gle/ipEVd8Np1tDy1GVD7";
test.use({ viewport: { width: 390, height: 844 } });
test.skip(new Date().toLocaleDateString("en-CA", { timeZone: "America/Toronto" }) > "2026-11-19", "workshop has passed");

test("English: English poster first, register and enlarged view work", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("section[aria-labelledby=newcomer-workshop-heading]");
  await expect(card.getByRole("heading", { name: "Upcoming SHAMS Workshop" })).toBeVisible();
  await expect(card.locator("img").first()).toHaveAttribute("alt", /^English poster/);
  await expect(card.getByRole("link", { name: /Register Now/ })).toHaveAttribute("href", FORM);
  await expect(card.getByRole("link", { name: /Learn More/ })).toHaveAttribute("href", "/programs#newcomer-initiative");

  await card.getByRole("button", { name: "Next poster" }).click();
  await expect(card.getByRole("button", { name: "Poster 2" })).toHaveAttribute("aria-current", "true");

  await card.getByRole("button", { name: /Open larger poster/ }).nth(1).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("link", { name: /Register Now/ })).toHaveAttribute("href", FORM);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("Arabic: Arabic poster first with Arabic labels", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.setItem("shams-language", "ar"));
  await page.goto("/");
  const card = page.locator("section[aria-labelledby=newcomer-workshop-heading]");
  await expect(card.getByRole("heading", { name: "ورشة شمس القادمة" })).toBeVisible();
  await expect(card.locator("img").first()).toHaveAttribute("alt", /^الملصق العربي/);
  await expect(card.getByRole("link", { name: /سجّل الآن/ })).toHaveAttribute("href", FORM);
  await expect(card.getByRole("link", { name: /اعرف المزيد/ })).toBeVisible();
});
