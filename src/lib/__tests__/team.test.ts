import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { TEAM_MEMBERS, LEADERSHIP, AFFILIATED_PHYSICIANS, filterTeam } from "@/lib/team";
import { searchKnowledge } from "@/lib/knowledgeIndex";

// Approved roster from the November 2026 team brief.
const ROSTER = [
  "Adeeb Mokamel", "Hasan Sheather", "Karim Salhab", "Mahmoud Noweir", "Mariam Ihab Abdallah", "Marta Mhanna",
  "Mohammad Sururi", "Mousa Sururi", "Mumtaz Hajjo Alrifai", "Omair Bohio", "Saif Arabiat", "Sarah Durrani",
  "Sofia Sarwary", "Talia Deratani", "Yara Hassan", "Yasameen Ihsan", "Haneen Al Jayashy", "Zohra Ahmadzai",
  "Barekah Vistro", "Anum Mudassar", "Abdullah Al-Azzawi", "Tala Seifi", "Fatima Sharif-Zada", "Hanin Gamour",
  "Zeina Issa", "Housam Alamour", "Mohammad Almhissen", "Leen Dahlan",
];
const names = (list: { name: string }[]) => list.map((m) => m.name).sort();

describe("public SHAMS team", () => {
  it("is exactly the 28 approved people, each once", () => {
    expect(TEAM_MEMBERS).toHaveLength(28);
    expect(names(TEAM_MEMBERS)).toEqual([...ROSTER].sort());
  });

  it("labels the founder, project manager, mentorship lead and five team leads, nobody else", () => {
    const titles = Object.fromEntries(LEADERSHIP.map((m) => [m.name, m.title?.en]));
    expect(titles).toEqual({
      "Mahmoud Noweir": "Founder, SHAMS",
      "Sofia Sarwary": "Project Manager",
      "Yasameen Ihsan": "Mentorship Program Lead",
      "Mousa Sururi": "Research Team Lead",
      "Saif Arabiat": "Outreach Team Lead",
      "Marta Mhanna": "Social Media Research Team Lead",
      "Zeina Issa": "Social Media Content Creation Team Lead",
      "Haneen Al Jayashy": "Events Team Lead",
    });
  });

  it("lists Sofia Sarwary right after the founder and keeps her on the Research team", () => {
    expect(LEADERSHIP.slice(0, 2).map((m) => m.name)).toEqual(["Mahmoud Noweir", "Sofia Sarwary"]);
    expect(TEAM_MEMBERS.find((m) => m.name === "Sofia Sarwary")?.teams).toEqual(["research"]);
  });

  it("puts each team's members in its filter, lead first", () => {
    expect(names(filterTeam("research", ""))).toEqual(
      ["Mousa Sururi", "Hasan Sheather", "Abdullah Al-Azzawi", "Sofia Sarwary", "Marta Mhanna", "Karim Salhab", "Adeeb Mokamel", "Mumtaz Hajjo Alrifai", "Talia Deratani"].sort()
    );
    expect(names(filterTeam("outreach", ""))).toEqual(
      ["Saif Arabiat", "Hasan Sheather", "Mohammad Sururi", "Sarah Durrani", "Omair Bohio", "Tala Seifi", "Fatima Sharif-Zada", "Housam Alamour"].sort()
    );
    expect(names(filterTeam("social-media-research", ""))).toEqual(
      ["Marta Mhanna", "Hasan Sheather", "Mohammad Sururi", "Karim Salhab", "Leen Dahlan"].sort()
    );
    expect(names(filterTeam("content-creation", ""))).toEqual(
      ["Zeina Issa", "Mariam Ihab Abdallah", "Yara Hassan", "Marta Mhanna", "Hasan Sheather", "Mohammad Sururi", "Karim Salhab", "Anum Mudassar", "Mohammad Almhissen"].sort()
    );
    expect(names(filterTeam("events", ""))).toEqual(
      ["Haneen Al Jayashy", "Adeeb Mokamel", "Mumtaz Hajjo Alrifai", "Yara Hassan", "Mohammad Almhissen", "Leen Dahlan"].sort()
    );
    expect(filterTeam("events", "")[0].name).toBe("Haneen Al Jayashy");
  });

  it("shows Hasan Sheather once with all four teams", () => {
    const hasan = TEAM_MEMBERS.filter((m) => m.name === "Hasan Sheather");
    expect(hasan).toHaveLength(1);
    expect(hasan[0].teams).toEqual(["research", "outreach", "social-media-research", "content-creation"]);
  });

  it("keeps Mohammad and Mousa Sururi, and Haneen and Hanin, as separate people", () => {
    expect(names(filterTeam("all", "sururi"))).toEqual(["Mohammad Sururi", "Mousa Sururi"]);
    expect(filterTeam("all", "haneen").map((m) => m.name)).toEqual(["Haneen Al Jayashy"]);
    expect(filterTeam("all", "hanin").map((m) => m.name)).toEqual(["Hanin Gamour"]);
  });

  it("finds members by Arabic team name", () => {
    expect(filterTeam("all", "الفعاليات")).toHaveLength(6);
  });

  it("no longer lists former members", () => {
    for (const former of ["Amr Al Masri", "Darah Freije", "Alanoud", "Lodi Sinanios", "Riad Sankari"]) {
      expect(filterTeam("all", former)).toHaveLength(0);
    }
  });

  it("keeps Dr. Raed Hawa as an affiliated physician, outside the team", () => {
    expect(AFFILIATED_PHYSICIANS.map((p) => p.name)).toEqual(["Dr. Raed Hawa"]);
    expect(TEAM_MEMBERS.some((m) => /hawa/i.test(m.name))).toBe(false);
  });

  it("publishes no phone numbers or email addresses", () => {
    const raw = readFileSync("content/team.json", "utf8");
    expect(raw).not.toMatch(/@/);
    expect(raw).not.toMatch(/\d{3}[\s.-]?\d{3}[\s.-]?\d{4}/);
  });

  it("lets site search and the chatbot find a team member", () => {
    expect(searchKnowledge("Zeina Issa")[0].item.url).toBe("/about#team");
  });
});
