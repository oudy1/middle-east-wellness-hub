import { test, expect, Page, Route } from "@playwright/test";

// Real navigation checks for the SHAMS assistant. The AI service is replaced
// by a fake one, so these tests never cost anything and can check exactly
// what happens with good, invented, expired or failed answers.

const NOW_BEFORE = new Date("2026-11-15T15:00:00Z"); // before the Nov 19 workshop
const NOW_AFTER = new Date("2026-11-20T15:00:00Z");

type Fake = { calls: { body: any }[]; reply: (route: Route) => Promise<void> };

function sse(text: string) {
  return `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\ndata: [DONE]\n\n`;
}

async function setup(page: Page, opts: { lang?: "en" | "ar"; now?: Date } = {}): Promise<Fake> {
  await page.clock.setFixedTime(opts.now ?? NOW_BEFORE);
  const fake: Fake = {
    calls: [],
    reply: (route) => route.fulfill({ status: 200, contentType: "text/event-stream", body: sse("OK") }),
  };
  await page.route("**/functions/v1/shams-chat", async (route) => {
    if (route.request().method() === "OPTIONS") return route.fulfill({ status: 200 });
    fake.calls.push({ body: route.request().postDataJSON() });
    await fake.reply(route);
  });
  await page.goto("/");
  await page.evaluate((l) => localStorage.setItem("shams-language", l), opts.lang ?? "en");
  await page.goto("/");
  const ar = opts.lang === "ar";
  await page.getByRole("button", { name: ar ? "افتح المحادثة" : "Open chat" }).click();
  return fake;
}

async function ask(page: Page, text: string, ar = false) {
  const box = page.getByRole("textbox", { name: ar ? "اكتب رسالتك..." : "Type your message..." });
  await box.fill(text);
  await box.press("Enter");
}

test.describe("instant answers (no AI call)", () => {
  test("family doctor by city opens that city's directory", async ({ page }) => {
    const fake = await setup(page);
    await ask(page, "family doctor in Kitchener");
    await expect(page.getByTestId("chat-sources").last()).toContainText("Healthcare worker directory");
    await page.getByRole("button", { name: "Search Kitchener" }).click();
    await expect(page).toHaveURL(/\/find-healthcare-workers\?city=Kitchener&province=ON&specialty=Family%20Physician/);
    await expect(page.getByRole("textbox", { name: "Type your message..." })).toBeHidden();
    await expect(page.locator("#city")).toHaveValue("Kitchener");
    expect(fake.calls).toHaveLength(0);
  });

  test("Arabic: asks for the city, then opens it", async ({ page }) => {
    const fake = await setup(page, { lang: "ar" });
    await ask(page, "وين ألاقي دكتور؟", true);
    await expect(page.getByText("في أي مدينة أنت؟")).toBeVisible();
    await ask(page, "كيتشنر", true);
    await page.getByRole("button", { name: "ابحث في Kitchener" }).click();
    await expect(page).toHaveURL(/city=Kitchener&province=ON/);
    expect(fake.calls).toHaveLength(0);
  });

  test("Arabic dialect: mentorship", async ({ page }) => {
    await setup(page, { lang: "ar" });
    await ask(page, "عايز مرشد في المجال الطبي", true);
    await page.getByRole("button", { name: "برنامج الإرشاد" }).click();
    await expect(page).toHaveURL(/\/programs\/mentorship$/);
  });

  test("patient rights lands on the patient rights section", async ({ page }) => {
    await setup(page);
    await ask(page, "What are my rights as a patient?");
    await page.getByRole("button", { name: "Patient rights", exact: true }).click();
    await expect(page).toHaveURL(/\/services#patient-rights$/);
    await expect(page.locator("#patient-rights")).toBeVisible();
  });

  test("Know Your Rights recording lands on the recording", async ({ page }) => {
    await setup(page);
    await ask(page, "Know Your Rights recording");
    await page.getByRole("button", { name: "Watch the recording" }).click();
    await expect(page).toHaveURL(/\/recordings#webinar-know-your-rights$/);
    await expect(page.locator("#webinar-know-your-rights")).toBeVisible();
  });

  test("research participation", async ({ page }) => {
    await setup(page);
    await ask(page, "Show me research studies I can join");
    await page.getByRole("button", { name: "Research opportunities" }).click();
    await expect(page).toHaveURL(/\/research#opportunities$/);
  });

  test("crisis message gets 911/988 without the AI", async ({ page, context }) => {
    const fake = await setup(page);
    await ask(page, "I want to end my life");
    await expect(page.getByText(/call 911/).first()).toBeVisible();
    const popup = context.waitForEvent("page");
    await page.getByRole("button", { name: /988 Suicide Crisis Helpline/ }).click();
    expect((await popup).url()).toMatch(/^https:\/\/988\.ca/);
    expect(fake.calls).toHaveLength(0);
  });
});

test.describe("November 19 newcomer workshop", () => {
  test("before the day: Register opens the official form", async ({ page, context }) => {
    await setup(page, { now: NOW_BEFORE });
    await ask(page, "November 19 workshop");
    const popup = context.waitForEvent("page");
    await page.getByRole("button", { name: /^Register/ }).click();
    expect((await popup).url()).toContain("forms.gle/ipEVd8Np1tDy1GVD7");
  });

  test("after the day: no registration button", async ({ page }) => {
    await setup(page, { now: NOW_AFTER });
    await ask(page, "November 19 workshop");
    await expect(page.getByText(/registration is closed/)).toBeVisible();
    await expect(page.getByRole("button", { name: /^Register/ })).toHaveCount(0);
  });
});

test.describe("AI answers", () => {
  test("invented, unapproved and extra links are made safe", async ({ page }) => {
    const fake = await setup(page);
    fake.reply = (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body: sse(
          "Here are some options.\n[Bad section](/services#made-up)\n[Evil site](https://evil.example/x)\n[Old form](https://forms.gle/XgzS5fjHRYmHN2k16)\n[Research](/research#opportunities)\n[Third](/faq)"
        ),
      });
    await ask(page, "Tell me about SHAMS research publications from last year");
    await expect(page.getByText("Here are some options.")).toBeVisible();
    // Grounding context from the site was sent with the question.
    expect(fake.calls).toHaveLength(1);
    expect(Array.isArray(fake.calls[0].body.context)).toBe(true);
    // Only two action buttons; outside and expired links are plain words.
    await expect(page.getByRole("button", { name: "Bad section" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Research" , exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: /Evil site/ })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /Old form/ })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Third" })).toHaveCount(0);
    // The invented section falls back to its real parent page.
    await page.getByRole("button", { name: "Bad section" }).click();
    await expect(page).toHaveURL(/\/services$/);
  });

  test("failed AI request shows verified pages and Try again works", async ({ page }) => {
    const fake = await setup(page);
    fake.reply = (route) =>
      route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "x" }) });
    await ask(page, "Tell me about the SHAMS mental health convention recap");
    await expect(page.getByText("I couldn't reach the assistant right now.")).toBeVisible();
    await expect(page.getByRole("alert")).toContainText("Something went wrong");

    fake.reply = (route) =>
      route.fulfill({ status: 200, contentType: "text/event-stream", body: sse("The convention took place on July 18, 2026.") });
    await page.getByRole("button", { name: "Try again" }).click();
    await expect(page.getByText("The convention took place on July 18, 2026.")).toBeVisible();
    await expect(page.getByText("I couldn't reach the assistant right now.")).toHaveCount(0);
    // The fallback note is never sent to the AI as part of the conversation.
    const last = fake.calls[fake.calls.length - 1].body.messages;
    expect(last.map((m: { content: string }) => m.content).join(" ")).not.toContain("couldn't reach");
  });

  test("a fallback page from a failed request is a working link", async ({ page }) => {
    const fake = await setup(page);
    fake.reply = (route) => route.abort("failed");
    await ask(page, "Tell me about the SHAMS mental health convention recap");
    const fallback = page.getByTestId("chat-sources").last();
    await expect(fallback).toBeVisible();
    await page.getByRole("button", { name: /Convention/i }).first().click();
    await expect(page).toHaveURL(/\/programs#mental-health-convention$/);
  });
});
