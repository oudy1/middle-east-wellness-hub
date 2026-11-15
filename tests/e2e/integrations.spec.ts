import { test, expect } from "@playwright/test";

// Outside services (YouTube, the database, email) are replaced so these checks
// never depend on the network and never send anything.

test.describe("Recordings page video player", () => {
  test("loads YouTube only after the visitor presses play, from the privacy-friendly address", async ({ page }) => {
    await page.route(/i\.ytimg\.com/, (r) => r.fulfill({ status: 404 }));
    await page.route(/youtube-nocookie\.com/, (r) => r.fulfill({ status: 200, contentType: "text/html", body: "<p>player</p>" }));
    await page.goto("/recordings#webinar-know-your-rights");
    const card = page.locator("#webinar-know-your-rights");
    await expect(card.getByRole("button", { name: /Play video: Know Your Rights/ })).toBeVisible();
    await expect(page.locator('iframe[src*="youtube.com/embed"]')).toHaveCount(0);
    await expect(card.locator("iframe")).toHaveCount(0);
    // Fallback link works even if the player is blocked.
    await expect(card.getByRole("link", { name: /Watch it on YouTube/ })).toHaveAttribute("href", "https://www.youtube.com/watch?v=_n4qjMmzMGw");
    await card.getByRole("button", { name: /Play video/ }).click();
    await expect(card.locator('iframe[src^="https://www.youtube-nocookie.com/embed/_n4qjMmzMGw"]')).toHaveCount(1);
  });

  test("shows the Know Your Rights date from the shared event record", async ({ page }) => {
    await page.route(/i\.ytimg\.com/, (r) => r.fulfill({ status: 404 }));
    await page.goto("/recordings#webinar-know-your-rights");
    await expect(page.locator("#webinar-know-your-rights").getByText("October 21, 2026")).toBeVisible();
  });
});

test.describe("Research opportunities", () => {
  test("a database failure shows a message and Try again, not an empty list", async ({ page }) => {
    let fail = true;
    await page.route("**/rest/v1/opportunities**", (r) =>
      fail ? r.fulfill({ status: 500, contentType: "application/json", body: '{"message":"down"}' }) : r.fulfill({ status: 200, contentType: "application/json", body: "[]" })
    );
    await page.goto("/research");
    const alert = page.getByRole("alert").filter({ hasText: "couldn't load research opportunities" });
    await alert.scrollIntoViewIfNeeded();
    await expect(alert).toBeVisible();
    await expect(page.getByText("No research opportunities are posted right now")).toHaveCount(0);
    fail = false;
    await alert.getByRole("button", { name: "Try again" }).click();
    await expect(page.getByText("No research opportunities are posted right now")).toBeVisible();
  });
});

test.describe("Webinar topic request", () => {
  const SERVICE = "**/functions/v1/send-contact-email**";

  test("saves the request through the email service and thanks the visitor, without opening their email app", async ({ page }) => {
    let sent: Record<string, unknown> | null = null;
    await page.route(SERVICE, (r) => {
      sent = JSON.parse(r.request().postData() ?? "{}");
      return r.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' });
    });
    await page.goto("/recordings#topic-request");
    const form = page.locator("#topic-request");
    await form.getByLabel("Name").fill("Test Visitor");
    await form.getByLabel("Email").fill("visitor@example.com");
    await form.getByLabel("Proposed Topic").fill("Sleep and shift work");
    await form.getByRole("button", { name: "Send Topic Request" }).click();
    await expect(page.getByText("Thank you, we received your suggestion")).toBeVisible();
    await expect(form.getByRole("link", { name: "Email us instead" })).toHaveCount(0);
    await expect.poll(() => sent).toMatchObject({
      kind: "topic_request",
      topic: "Sleep and shift work",
      language: "en",
    });
  });

  test("if sending fails, it says so and offers the email fallback", async ({ page }) => {
    await page.route(SERVICE, (r) => r.fulfill({ status: 500, contentType: "application/json", body: '{"message":"down"}' }));
    await page.goto("/recordings#topic-request");
    const form = page.locator("#topic-request");
    await form.getByLabel("Name").fill("Test Visitor");
    await form.getByLabel("Email").fill("visitor@example.com");
    await form.getByLabel("Proposed Topic").fill("Sleep and shift work");
    await form.getByRole("button", { name: "Send Topic Request" }).click();
    const alert = form.getByRole("alert");
    await expect(alert).toBeVisible();
    await expect(page.getByText("Thank you, we received your suggestion")).toHaveCount(0);
    await expect(alert.getByRole("link", { name: "Email us instead" })).toHaveAttribute("href", /^mailto:infoprojectshams@gmail\.com/);
  });
});
