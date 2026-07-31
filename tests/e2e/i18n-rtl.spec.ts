import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * i18n / RTL regression suite.
 *
 * Verifies that switching English -> Arabic:
 *  - translates every header label, dropdown item, drawer link, and search UI
 *    string (no English leaks),
 *  - flips containers to dir="rtl",
 *  - never clips text (scrollWidth vs clientWidth) or pushes menus outside the
 *    viewport / causes horizontal page overflow.
 */

const AR = {
  home: "الرئيسية",
  about: "عن المبادرة",
  contact: "اتصل بنا",
  services: "الخدمات",
  research: "البحث",
  education: "التعليم",
  findWorkers: "ابحث عن العاملين في الرعاية الصحية",
  menu: "القائمة",
  searchPlaceholder: "ابحث عن الموارد",
  popularSearches: "عمليات بحث شائعة",
  noResults: "لا يوجد تطابق واضح حالياً",
  diabetes: "السكري",
};

const DROPDOWN_GROUPS = [AR.services, AR.research, AR.education, AR.findWorkers];

/** Latin words that legitimately appear inside Arabic UI (brand, acronyms). */
const ALLOWED_LATIN = ["SHAMS", "PDF", "MEDLINEPLUS", "COVID"];

/** Visible text containing Latin words (>= 3 letters) outside the allowlist. */
async function englishLeaks(scope: Locator): Promise<string[]> {
  const texts = await scope
    .locator("a, button, span, p, [role='menuitem']")
    .allTextContents();
  const leaks = new Set<string>();
  for (const raw of texts) {
    const words = raw.match(/[A-Za-z][A-Za-z'-]{2,}/g) ?? [];
    for (const w of words) {
      if (!ALLOWED_LATIN.some((ok) => w.toUpperCase().startsWith(ok))) {
        leaks.add(raw.trim().slice(0, 80));
        break;
      }
    }
  }
  return [...leaks];
}

/** Elements whose text overflows their box (cut off), excluding .truncate. */
async function clippedText(scope: Locator): Promise<string[]> {
  return scope
    .locator("a, button, span, p, [role='menuitem']")
    .evaluateAll((els) =>
      els
        .filter((el) => {
          const s = window.getComputedStyle(el);
          if (s.display === "none" || s.visibility === "hidden") return false;
          if (el.closest(".truncate")) return false; // intentional ellipsis
          if (el.closest(".sr-only")) return false; // visually hidden a11y text
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return false; // not rendered
          if (!(el.textContent ?? "").trim()) return false;
          return el.scrollWidth > el.clientWidth + 2;
        })
        .map((el) => (el.textContent ?? "").trim().slice(0, 80))
        .slice(0, 10)
    );
}

async function expectNoHorizontalPageOverflow(page: Page) {
  const { scrollWidth, innerWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(
    scrollWidth,
    "page must not scroll horizontally"
  ).toBeLessThanOrEqual(innerWidth + 1);
}

async function expectWithinViewportX(locator: Locator, page: Page) {
  const box = await locator.boundingBox();
  expect(box, "element should have a layout box").not.toBeNull();
  const vw = page.viewportSize()!.width;
  expect(box!.x, "element starts off-screen (left)").toBeGreaterThanOrEqual(-1);
  expect(
    box!.x + box!.width,
    "element is cut off at the viewport edge"
  ).toBeLessThanOrEqual(vw + 1);
}

// ---------------------------------------------------------------------------
// Desktop
// ---------------------------------------------------------------------------

test.describe("Arabic RTL — desktop", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("button", { name: "Select language", exact: true })
      .click();
    await page.getByRole("button", { name: "العربية" }).click();
  });

  test("header flips to RTL with fully Arabic labels and no clipping", async ({
    page,
  }) => {
    await expect(page.locator("header")).toHaveAttribute("dir", "rtl");

    const nav = page.getByRole("navigation", { name: "Primary" });
    for (const label of [
      AR.home,
      AR.about,
      AR.contact,
      AR.services,
      AR.research,
      AR.education,
      AR.findWorkers,
    ]) {
      await expect(nav.getByText(label).first()).toBeVisible();
    }

    expect(await englishLeaks(nav)).toEqual([]);
    expect(await clippedText(nav)).toEqual([]);
    await expectNoHorizontalPageOverflow(page);
  });

  test("every desktop dropdown opens fully translated and inside the viewport", async ({
    page,
  }) => {
    const nav = page.getByRole("navigation", { name: "Primary" });

    for (const trigger of DROPDOWN_GROUPS) {
      await nav.getByRole("button", { name: trigger }).click();
      const menu = page.getByRole("menu");
      await expect(menu).toBeVisible();
      // Direction is inherited from the RTL header, not set via a dir attr.
      await expect(menu).toHaveCSS("direction", "rtl");

      const items = menu.getByRole("menuitem");
      expect(await items.count()).toBeGreaterThan(0);

      expect(await englishLeaks(menu)).toEqual([]);
      expect(await clippedText(menu)).toEqual([]);
      await expectWithinViewportX(menu, page);

      await page.keyboard.press("Escape");
      await expect(menu).toBeHidden();
    }

    await expectNoHorizontalPageOverflow(page);
  });

  test("desktop search overlay is Arabic, RTL, and unclipped", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "بحث", exact: true }).click();

    const input = page.getByPlaceholder(new RegExp(AR.searchPlaceholder));
    await expect(input).toBeVisible();

    // The input sits inside an RTL container.
    const dir = await input.evaluate(
      (el) => el.closest("[dir]")?.getAttribute("dir") ?? ""
    );
    expect(dir).toBe("rtl");

    // Popular searches panel renders in Arabic on focus.
    await input.click();
    await expect(page.getByText(AR.popularSearches)).toBeVisible();

    // Arabic keyword search returns Arabic suggestions without clipping.
    await input.fill("سكري");
    await expect(
      page.getByRole("button", { name: AR.diabetes }).first()
    ).toBeVisible();
    const resultsPanel = page
      .locator("div[dir='rtl']")
      .filter({ hasText: AR.diabetes })
      .last();
    expect(await englishLeaks(resultsPanel)).toEqual([]);
    expect(await clippedText(resultsPanel)).toEqual([]);
    await expectWithinViewportX(resultsPanel, page);

    // No-results state is Arabic too.
    await input.fill("zzzzqq");
    await expect(page.getByText(AR.noResults)).toBeVisible();

    await expectNoHorizontalPageOverflow(page);
  });

  test("switching back to English restores LTR and English labels", async ({
    page,
  }) => {
    await page
      .getByRole("button", { name: "اختيار اللغة", exact: true })
      .click();
    await page.getByRole("button", { name: "English" }).click();

    await expect(page.locator("header")).toHaveAttribute("dir", "ltr");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("button", { name: "Services" })).toBeVisible();

    // No Arabic should linger anywhere in the desktop nav.
    const navText = await nav.textContent();
    expect(navText).not.toMatch(/[؀-ۿ]/);
  });
});

// ---------------------------------------------------------------------------
// Mobile
// ---------------------------------------------------------------------------

test.describe("Arabic RTL — mobile drawer & search", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("button", { name: "Open menu", exact: true })
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    // Switch language from inside the drawer footer.
    await dialog.getByRole("button", { name: "العربية" }).click();
  });

  test("drawer is RTL, fully translated, and nothing is cut off", async ({
    page,
  }) => {
    const dialog = page.getByRole("dialog");
    await expect(dialog).toHaveAttribute("dir", "rtl");
    await expect(dialog.getByText(AR.menu).first()).toBeVisible();

    const nav = dialog.getByRole("navigation", { name: "Mobile primary" });

    // Expand every collapsible section.
    for (const group of DROPDOWN_GROUPS) {
      await nav.getByRole("button", { name: group }).click();
    }

    // All top-level links + all expanded children are present.
    const links = nav.getByRole("link");
    expect(await links.count()).toBeGreaterThanOrEqual(15);
    await expect(nav.getByRole("link", { name: AR.home })).toBeVisible();
    await expect(nav.getByRole("link", { name: AR.contact })).toBeVisible();

    // No English labels remain in the drawer navigation.
    expect(await englishLeaks(nav)).toEqual([]);

    // No link text is clipped.
    expect(await clippedText(nav)).toEqual([]);

    // Every link stays inside the drawer horizontally (no cut-off in RTL).
    const drawerBox = (await dialog.boundingBox())!;
    for (const link of await links.all()) {
      const b = await link.boundingBox();
      expect(b, "link should have a layout box").not.toBeNull();
      expect(b!.x).toBeGreaterThanOrEqual(drawerBox.x - 1);
      expect(b!.x + b!.width).toBeLessThanOrEqual(
        drawerBox.x + drawerBox.width + 1
      );
    }

    await expectNoHorizontalPageOverflow(page);

    // Drawer closes via the Arabic-labelled close button.
    await dialog
      .getByRole("button", { name: "إغلاق القائمة", exact: true })
      .click();
    await expect(dialog).toBeHidden();
  });

  test("mobile search modal is Arabic, RTL, and unclipped", async ({
    page,
  }) => {
    // Close the drawer (opened in beforeEach) to reach the search button.
    const drawer = page.getByRole("dialog");
    await drawer
      .getByRole("button", { name: "إغلاق القائمة", exact: true })
      .click();
    await expect(drawer).toBeHidden();

    await page
      .getByRole("button", { name: "البحث عن الموارد", exact: true })
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("dir", "rtl");
    await expect(dialog.getByText("البحث عن الموارد")).toBeVisible();

    const input = dialog.getByPlaceholder(new RegExp(AR.searchPlaceholder));
    await expect(input).toBeVisible();

    // Popular searches show in Arabic.
    await input.click();
    await expect(dialog.getByText(AR.popularSearches)).toBeVisible();

    // Arabic keyword search works and stays inside the viewport.
    await input.fill("سكري");
    await expect(
      dialog.getByRole("button", { name: AR.diabetes }).first()
    ).toBeVisible();
    expect(await clippedText(dialog)).toEqual([]);
    await expectWithinViewportX(dialog, page);

    // No-results state is Arabic.
    await input.fill("zzzzqq");
    await expect(dialog.getByText(AR.noResults)).toBeVisible();

    await expectNoHorizontalPageOverflow(page);
  });
});
