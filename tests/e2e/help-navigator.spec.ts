import { test, expect } from "@playwright/test";

// "How Can We Help You?" guide on the Services page: picking a choice shows
// a short list of next steps, and a real click lands on the right section.

test.use({ viewport: { width: 390, height: 844 } });

test("new to Canada shows the newcomer steps and opens patient rights", async ({ page }) => {
  await page.goto("/services");
  const guide = page.locator("#how-can-we-help");
  await expect(guide.getByRole("heading", { name: "How Can We Help You?" })).toBeVisible();

  const choice = guide.getByRole("button", { name: "I am new to Canada" });
  await choice.click();
  await expect(choice).toHaveAttribute("aria-pressed", "true");

  const results = guide.locator("#how-can-we-help-results");
  await expect(results.getByRole("link", { name: /Understanding OHIP/ })).toHaveAttribute("href", /ontario\.ca/);
  await expect(results.getByRole("link", { name: /Understanding IFHP/ })).toHaveAttribute("href", /canada\.ca/);
  await expect(results.getByRole("link", { name: /Finding a family doctor/ })).toBeVisible();
  await expect(results.getByRole("link", { name: /Newcomer health education workshops/ })).toBeVisible();

  await results.getByRole("link", { name: /Your patient rights/ }).click();
  await expect(page).toHaveURL(/\/services#patient-rights$/);
});

test("guide works in Arabic and opens the right page", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.setItem("shams-language", "ar"));
  await page.goto("/services");
  const guide = page.locator("#how-can-we-help");
  await expect(guide.getByRole("heading", { name: "كيف يمكننا مساعدتك؟" })).toBeVisible();

  await guide.getByRole("button", { name: "أبحث عن مقدم رعاية صحية" }).click();
  await guide.getByRole("link", { name: /ابحث عن مقدمي الرعاية الصحية/ }).click();
  await expect(page).toHaveURL(/\/find-healthcare-workers$/);
});
