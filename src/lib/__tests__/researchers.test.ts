import { describe, it, expect } from "vitest";
import { ALL_RESEARCHERS, RESEARCHERS } from "@/lib/researchers";
import { TEAM_MEMBERS } from "@/lib/team";
import { searchKnowledge } from "@/lib/knowledgeIndex";
import { searchSite } from "@/lib/siteSearch";
import { CONTENT_STATUSES, hasArabic } from "@/lib/contentStatus";

const NAMES = [
  "Dr. Redab Al-Janaideh, PhD", "Jesus (Jesse) Chavarria, PhD", "Menna Komeiha", "Mahmoud El-Maklizi",
  "Dr. Delaney Glass", "Dr. Emine Fidan Elcioglu", "Dr. Rania Salem", "Dr. Ryan Persram", "Jason Chung, M.Sc.",
];

describe("affiliated researchers list", () => {
  it("holds the same nine researchers the Research page showed, in order", () => {
    expect(RESEARCHERS.map((r) => r.name_en)).toEqual(NAMES);
  });

  it("every researcher has a review status, unique id and Arabic name, role and bio", () => {
    expect(new Set(ALL_RESEARCHERS.map((r) => r.id)).size).toBe(ALL_RESEARCHERS.length);
    for (const r of ALL_RESEARCHERS) {
      expect(CONTENT_STATUSES, r.id).toContain(r.status);
      if (r.status !== "published") continue;
      for (const v of [r.name_ar, r.role_ar, r.bio_ar]) expect(hasArabic(v), r.id).toBe(true);
      expect(r.tags_ar.length, r.id).toBe(r.tags_en.length);
    }
  });

  it("stays separate from the SHAMS team", () => {
    const team = new Set(TEAM_MEMBERS.map((m) => m.name));
    for (const r of RESEARCHERS) expect(team.has(r.name_en), r.name_en).toBe(false);
  });

  it.each([
    ["Chavarria", "en", "researcher-chavarria"],
    ["Rania Salem", "en", "researcher-rania"],
    ["Persram", "en", "researcher-persram"],
    ["رداب", "ar", "researcher-redab"],
  ] as const)("the chatbot finds %s", (q, lang, id) => {
    const top = searchKnowledge(q, lang, 3).map((r) => r.item);
    expect(top[0]?.id).toBe(id);
    expect(top[0]?.url).toBe("/research#researchers");
  });

  it("site search lists a researcher by name", () => {
    const hits = searchSite("Delaney Glass", "en").map((r) => r.title_en);
    expect(hits.join(" | ")).toContain("Delaney Glass");
  });
});
