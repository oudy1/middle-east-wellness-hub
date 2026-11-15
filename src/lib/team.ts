// One source for the public SHAMS team (content/team.json): the About page,
// site search and chatbot knowledge all read from here.
import data from "../../content/team.json";
import { normalizeText } from "./searchText";

export type TeamId = "research" | "outreach" | "social-media-research" | "content-creation" | "events";
type Lang = "en" | "ar";

export interface Team {
  id: TeamId;
  short_en: string;
  short_ar: string;
  label_en: string;
  label_ar: string;
  lead: string;
}

export interface TeamMember {
  name: string;
  teams: TeamId[];
  /** Founder or confirmed team-lead title, if any. */
  title?: { en: string; ar: string };
  isFounder: boolean;
  leads?: TeamId;
}

export const TEAMS = data.teams as Team[];
const TEAM_BY_ID = Object.fromEntries(TEAMS.map((t) => [t.id, t])) as Record<TeamId, Team>;
const LEAD_TITLES = data.leadTitles as Record<string, { en: string; ar: string }>;

export const TEAM_MEMBERS: TeamMember[] = data.members.map((m) => {
  const isFounder = m.name === data.founder.name;
  const leads = TEAMS.find((t) => t.lead === m.name)?.id;
  const title = isFounder
    ? { en: data.founder.title_en, ar: data.founder.title_ar }
    : LEAD_TITLES[m.name];
  return { name: m.name, teams: m.teams as TeamId[], title, isFounder, leads };
});

export const AFFILIATED_PHYSICIANS = data.affiliatedPhysicians;

export const teamById = (id: TeamId) => TEAM_BY_ID[id];
export const teamLabel = (id: TeamId, lang: Lang, short = true) =>
  short ? TEAM_BY_ID[id][lang === "ar" ? "short_ar" : "short_en"] : TEAM_BY_ID[id][lang === "ar" ? "label_ar" : "label_en"];

/** Founder first, then team leads in team order, then everyone else A to Z. */
function rank(m: TeamMember): number {
  if (m.isFounder) return -1;
  if (m.leads) return TEAMS.findIndex((t) => t.id === m.leads);
  return TEAMS.length;
}
const byRank = (a: TeamMember, b: TeamMember) => rank(a) - rank(b) || a.name.localeCompare(b.name);

export const LEADERSHIP: TeamMember[] = TEAM_MEMBERS.filter((m) => m.title).sort(byRank);

export function initials(name: string): string {
  const parts = name.split(/[\s-]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/**
 * Members of one team (lead pinned first) or everyone, narrowed by a search over
 * names and team labels in both languages. Each word must start a word in the card.
 */
export function filterTeam(team: TeamId | "all", query: string): TeamMember[] {
  const words = normalizeText(query).split(" ").filter(Boolean);
  const list = TEAM_MEMBERS.filter((m) => team === "all" || m.teams.includes(team));
  const leadFirst = (a: TeamMember, b: TeamMember) => {
    if (team === "all") return byRank(a, b);
    const la = a.leads === team ? 0 : 1;
    const lb = b.leads === team ? 0 : 1;
    return la - lb || a.name.localeCompare(b.name);
  };
  return list
    .filter((m) => {
      if (!words.length) return true;
      const hay = normalizeText(
        [
          m.name,
          m.title?.en ?? "",
          m.title?.ar ?? "",
          ...m.teams.flatMap((id) => [teamLabel(id, "en"), teamLabel(id, "ar"), teamLabel(id, "en", false), teamLabel(id, "ar", false)]),
        ].join(" ")
      ).split(" ");
      return words.every((w) => hay.some((h) => h.startsWith(w)));
    })
    .sort(leadFirst);
}

/** Plain summary for site search and the chatbot, built from the same data. */
export function teamSummary(lang: Lang): string {
  const leads = TEAMS.map((t) => `${teamLabel(t.id, lang, false)}: ${t.lead}`).join(lang === "ar" ? "، " : "; ");
  return lang === "ar"
    ? `يضم فريق شمس ${TEAM_MEMBERS.length} عضوًا. المؤسس: ${data.founder.name}. قادة الفرق: ${leads}.`
    : `The SHAMS team has ${TEAM_MEMBERS.length} members. Founder: ${data.founder.name}. Team leads: ${leads}.`;
}
