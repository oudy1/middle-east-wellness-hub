import { test, expect, Page } from "@playwright/test";

// The Services dropdown trigger is a <button> with text "Services" inside the
// primary nav. We scope to the primary <nav aria-label="Primary"> to avoid the
// mobile drawer and other matches.
const primaryNav = (page: Page) => page.getByRole("navigation", { name: "Primary" });
const servicesTrigger = (page: Page) =>
  primaryNav(page).getByRole("button", { name: /^Services/ });
const servicesMenu = (page: Page) => page.getByRole("menu").first();

test.describe("Desktop header dropdowns", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(primaryNav(page)).toBeVisible();
  });

  test("opens on hover and exposes aria-expanded", async ({ page }) => {
    const trigger = servicesTrigger(page);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.hover();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(servicesMenu(page)).toBeVisible();
  });

  test("opens on click", async ({ page }) => {
    const trigger = servicesTrigger(page);
    // Move pointer away first so we test pure click, not hover.
    await page.mouse.move(0, 0);
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(servicesMenu(page)).toBeVisible();
  });

  test("stays open while moving from trigger into the menu panel", async ({ page }) => {
    const trigger = servicesTrigger(page);
    await trigger.hover();
    const menu = servicesMenu(page);
    await expect(menu).toBeVisible();

    // Move into the menu panel via its bounding box center.
    const box = await menu.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2, { steps: 10 });

    // Wait past the close delay (300ms) and confirm it is still open.
    await page.waitForTimeout(500);
    await expect(menu).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  test("closes after delay when pointer leaves trigger and menu", async ({ page }) => {
    const trigger = servicesTrigger(page);
    await trigger.hover();
    await expect(servicesMenu(page)).toBeVisible();

    // Move pointer far away from trigger and menu.
    await page.mouse.move(10, 10);

    // Should still be visible immediately (within the delay window)...
    // ...and closed after the 300ms delay.
    await expect(servicesMenu(page)).toBeHidden({ timeout: 1500 });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("closes when a menu link is selected", async ({ page }) => {
    const trigger = servicesTrigger(page);
    await trigger.hover();
    const menu = servicesMenu(page);
    await expect(menu).toBeVisible();

    await menu.getByRole("menuitem").first().click();
    await expect(servicesMenu(page)).toBeHidden();
  });

  test("closes on outside click", async ({ page }) => {
    const trigger = servicesTrigger(page);
    await trigger.click();
    await expect(servicesMenu(page)).toBeVisible();

    // Click on the page body away from the header.
    await page.mouse.click(640, 600);
    await expect(servicesMenu(page)).toBeHidden();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("closes when Escape is pressed", async ({ page }) => {
    const trigger = servicesTrigger(page);
    await trigger.click();
    await expect(servicesMenu(page)).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(servicesMenu(page)).toBeHidden();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
