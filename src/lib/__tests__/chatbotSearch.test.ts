import { describe, it, expect, vi, afterEach } from "vitest";
import { searchResources, searchableResources } from "../resourceFinderData";
import { searchKnowledge, knowledgeIndex } from "../knowledgeIndex";
import { isApprovedInternalUrl } from "../chatbotRoutes";
import faq from "../../../content/faq.json";

afterEach(() => vi.useRealTimers());

describe("site search ranking", () => {
  it("puts the mentorship program first for 'join SHAMS mentorship'", () => {
    expect(searchResources("join SHAMS mentorship", "en")[0].id).toBe("mentorship");
  });
  it("puts family physicians first for 'family doctor in Kitchener'", () => {
    expect(searchResources("family doctor in Kitchener", "en")[0].id).toBe("family-physician");
  });
  it("puts the Know Your Rights recording first for 'Know Your Rights recording'", () => {
    expect(searchResources("Know Your Rights recording", "en")[0].url).toBe("/recordings#webinar-know-your-rights");
  });
});

describe("every search and chatbot link points to a verified section", () => {
  it("search results only use approved addresses", () => {
    for (const r of searchableResources) {
      if (r.isExternal) continue;
      expect(isApprovedInternalUrl(r.url), r.url).toBe(true);
    }
  });
  it("chatbot knowledge only uses approved addresses", () => {
    for (const item of knowledgeIndex) {
      expect(isApprovedInternalUrl(item.url), item.url).toBe(true);
    }
  });
});

describe("Scadding Court newcomer workshop in chatbot answers", () => {
  it("is recommended before November 19, 2026", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-10T15:00:00Z"));
    const ids = searchKnowledge("refugee healthcare workshop").map((r) => r.item.id);
    expect(ids).toContain("newcomer-workshop");
  });
  it("is no longer recommended after November 19, 2026 in Toronto", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-20T06:00:00Z"));
    const ids = searchKnowledge("refugee healthcare workshop").map((r) => r.item.id);
    expect(ids).not.toContain("newcomer-workshop");
  });
});

describe("OHIP FAQ accuracy", () => {
  it("no longer claims a 3-month OHIP waiting period", () => {
    const entry = (faq as { id: string; answerEn: string; answerAr: string }[]).find(
      (f) => f.id === "newcomer-health-coverage"
    )!;
    expect(entry.answerEn).not.toMatch(/3 months/);
    expect(entry.answerEn).toMatch(/no longer has a waiting period/);
    expect(entry.answerAr).not.toMatch(/3 أشهر/);
  });
});

describe("chatbot server link list matches the site", () => {
  it("lists every approved route in the shams-chat function", async () => {
    const { readFileSync } = await import("node:fs");
    const routes = (await import("../../../content/chatbot-routes.json")).default as Record<string, string>;
    const server = readFileSync("supabase/functions/shams-chat/index.ts", "utf8");
    for (const [key, url] of Object.entries(routes)) {
      expect(server, key).toContain(`${key}: "${url}"`);
    }
  });
  it("sends providers and researchers to their real forms, not the contact form", async () => {
    const { readFileSync } = await import("node:fs");
    const server = readFileSync("supabase/functions/shams-chat/index.ts", "utf8");
    expect(server).toContain("[Join the directory](/physicians/apply)");
    expect(server).toContain("[Submit an opportunity](/post-opportunity)");
    expect(server).not.toContain("error.message");
  });
});

describe("past Mental Health Convention", () => {
  it("is offered as a recap, never as registration", () => {
    const top = searchKnowledge("register for the mental health convention")[0].item;
    expect(top.id).toBe("mental-health-convention-recap");
    expect(top.url).toBe("/programs#mental-health-convention");
  });
});
