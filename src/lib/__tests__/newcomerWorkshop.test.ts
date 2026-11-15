import { describe, it, expect, vi, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import {
  NEWCOMER_WORKSHOP,
  NEWCOMER_WORKSHOP_GOOGLE_CALENDAR_URL,
  buildNewcomerWorkshopIcs,
  isNewcomerWorkshopUpcoming,
  newcomerWorkshopStatus,
} from "../newcomerWorkshop";
import { searchKnowledge } from "../knowledgeIndex";

afterEach(() => vi.useRealTimers());

describe("November 19 newcomer workshop record", () => {
  it("uses the latest official registration form", () => {
    expect(NEWCOMER_WORKSHOP.registerUrl).toBe("https://forms.gle/ipEVd8Np1tDy1GVD7");
  });

  it("never reuses the older registration link", () => {
    const files = [
      "src/lib/newcomerWorkshop.ts",
      "src/lib/knowledgeIndex.ts",
      "src/components/NewcomerWorkshopFeature.tsx",
      "src/components/NewcomerInitiativeCard.tsx",
      "supabase/functions/shams-chat/index.ts",
      "public/newcomer-workshop-2026-11-19.ics",
    ];
    for (const f of files) expect(readFileSync(f, "utf8"), f).not.toContain("cfQVzbssWp2fTJdo7");
  });

  it("is upcoming through 11:59 PM Toronto time on November 19, 2026", () => {
    expect(isNewcomerWorkshopUpcoming(new Date("2026-11-20T04:59:00Z"))).toBe(true);
  });

  it("is completed from November 20, 2026 in Toronto", () => {
    expect(newcomerWorkshopStatus(new Date("2026-11-20T05:00:00Z"))).toBe("completed");
  });

  it("puts 3:00 to 5:00 PM Toronto time (EST) in the calendar entry", () => {
    expect(NEWCOMER_WORKSHOP.startUtc).toBe("20261119T200000Z");
    expect(NEWCOMER_WORKSHOP.endUtc).toBe("20261119T220000Z");
    expect(NEWCOMER_WORKSHOP_GOOGLE_CALENDAR_URL).toContain("dates=20261119T200000Z/20261119T220000Z");
  });

  it("calendar file on the site matches the shared record", () => {
    const file = readFileSync("public/newcomer-workshop-2026-11-19.ics", "utf8");
    expect(file).toBe(buildNewcomerWorkshopIcs());
    expect(file).toContain("707 Dundas Street West\\, Toronto");
    expect(file).toContain("URL:https://forms.gle/ipEVd8Np1tDy1GVD7");
  });
});

describe("newcomer workshop is found by search and the chatbot", () => {
  const queries = [
    "Newcomer workshop", "Refugee healthcare", "Healthcare coverage", "OHIP", "IFHP", "Health card",
    "Scadding Court", "Toronto workshop", "Newcomer health navigation",
    "Do you have an upcoming newcomer workshop?", "Where is the November 19 workshop?",
    "Is the newcomer event free?", "How do I register?",
    "ورشة الوافدين الجدد", "التأمين الصحي في أونتاريو", "الرعاية الصحية في كندا",
    "هل لديكم ورشة للوافدين الجدد؟", "كيف أسجل في ورشة الرعاية الصحية؟",
  ];
  for (const q of queries) {
    it(`"${q}" finds it before the event`, () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-11-15T15:00:00Z"));
      const lang = /[\u0600-\u06FF]/.test(q) ? "ar" : "en";
      const ids = searchKnowledge(q, lang, 5).map((r) => r.item.id);
      expect(ids).toContain("newcomer-workshop");
    });
  }
});
