import { useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  AFFILIATED_PHYSICIANS,
  LEADERSHIP,
  TEAMS,
  TEAM_MEMBERS,
  TeamId,
  TeamMember,
  filterTeam,
  initials,
  teamLabel,
} from "@/lib/team";

type Filter = TeamId | "all";

const Avatar = ({ name, size = "md" }: { name: string; size?: "md" | "lg" }) => (
  <span
    aria-hidden="true"
    className={`flex shrink-0 items-center justify-center rounded-full bg-healthTeal/15 font-semibold text-healthDarkBlue ring-1 ring-healthTeal/30 ${
      size === "lg" ? "h-14 w-14 text-lg" : "h-11 w-11 text-sm"
    }`}
  >
    {initials(name)}
  </span>
);

const TeamSection = () => {
  const { language, t } = useLanguage();
  const lang = language === "ar" ? "ar" : "en";
  const isAr = lang === "ar";
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const searchId = useId();
  const results = useMemo(() => filterTeam(filter, query), [filter, query]);

  const tags = (m: TeamMember) =>
    m.teams.length ? m.teams.map((id) => teamLabel(id, lang)) : m.title ? [] : [t("team.shamsTeam")];

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: t("team.allMembers"), count: TEAM_MEMBERS.length },
    ...TEAMS.map((tm) => ({
      id: tm.id as Filter,
      label: teamLabel(tm.id, lang),
      count: TEAM_MEMBERS.filter((m) => m.teams.includes(tm.id)).length,
    })),
  ];

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      dir={isAr ? "rtl" : "ltr"}
      className={`py-10 md:py-14 bg-healthLightGray ${isAr ? "font-cairo" : ""}`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 id="team-heading" className="text-2xl sm:text-3xl font-bold text-center text-healthDarkBlue">
          {t("team.meetHeading")}
        </h2>
        <p className="mt-2 mb-8 text-center text-muted-foreground max-w-2xl mx-auto">{t("team.intro")}</p>

        {/* Founder and Leadership */}
        <h3 className="text-lg sm:text-xl font-semibold text-healthDarkBlue mb-3">{t("team.leadership")}</h3>
        <ul className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-3 mb-10" data-testid="team-leadership">
          {LEADERSHIP.map((m) => (
            <li
              key={m.name}
              className={`flex items-center gap-3 rounded-lg border bg-card p-3 shadow-sm ${
                m.isFounder ? "border-healthTeal min-[400px]:col-span-2 lg:col-span-3 sm:p-4" : "border-border"
              }`}
            >
              <Avatar name={m.name} size={m.isFounder ? "lg" : "md"} />
              <div className="min-w-0">
                <p className={`font-semibold text-healthDarkBlue leading-tight ${m.isFounder ? "text-lg" : ""}`}>
                  <bdi>{m.name}</bdi>
                </p>
                <p className="text-sm text-healthTeal font-medium leading-snug">{m.title?.[lang]}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Team directory */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-3">
          <h3 className="text-lg sm:text-xl font-semibold text-healthDarkBlue">{t("team.membersHeading")}</h3>
          <div className="relative w-full sm:w-72">
            <label htmlFor={searchId} className="sr-only">
              {t("team.searchLabel")}
            </label>
            <Search
              aria-hidden="true"
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isAr ? "right-3" : "left-3"}`}
            />
            <Input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("team.searchPlaceholder")}
              className={`h-11 bg-card ${isAr ? "pr-9 pl-10" : "pl-9 pr-10"}`}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t("team.clearSearch")}
                className={`absolute top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-healthDarkBlue ${isAr ? "left-1" : "right-1"}`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <div role="group" aria-label={t("team.filterLabel")} className="flex flex-wrap gap-2 mb-3">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={`min-h-[44px] rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-healthTeal focus-visible:ring-offset-2 ${
                  active
                    ? "bg-healthDarkBlue border-healthDarkBlue text-primary-foreground"
                    : "bg-card border-border text-healthDarkBlue hover:border-healthTeal"
                }`}
              >
                {f.label} <span className={active ? "opacity-80" : "text-muted-foreground"}>({f.count})</span>
              </button>
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground mb-3" aria-live="polite" data-testid="team-count">
          {t("team.memberCount", { count: results.length })}
        </p>

        {results.length === 0 ? (
          <p className="rounded-lg border border-dashed bg-card p-6 text-center text-muted-foreground">{t("team.noResults")}</p>
        ) : (
          <ul className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" data-testid="team-directory">
            {results.map((m) => (
              <li key={m.name} data-testid="team-card" className="flex gap-3 rounded-lg border border-border bg-card p-3 shadow-sm">
                <Avatar name={m.name} />
                <div className="min-w-0">
                  <p className="font-semibold text-healthDarkBlue leading-tight">
                    <bdi>{m.name}</bdi>
                  </p>
                  {m.title && <p className="text-xs text-healthTeal font-medium mt-0.5 leading-snug">{m.title[lang]}</p>}
                  {tags(m).length > 0 && (
                    <ul className="mt-1.5 flex flex-wrap gap-1" aria-label={t("team.title")}>
                      {tags(m).map((tag) => (
                        <li key={tag} className="rounded bg-healthLightGray px-1.5 py-0.5 text-xs text-healthDarkBlue">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Affiliated Physicians (external, separate from the internal team) */}
        <h3 className="text-lg sm:text-xl font-semibold text-healthDarkBlue mt-10 mb-3">{t("team.affiliatedPhysicians")}</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" data-testid="affiliated-physicians">
          {AFFILIATED_PHYSICIANS.map((p) => (
            <li key={p.name} className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <p className="font-semibold text-healthDarkBlue">
                <bdi>{p.name}</bdi>
              </p>
              <p className="text-sm text-healthTeal font-medium">{isAr ? p.role_ar : p.role_en}</p>
              <p className="text-sm text-muted-foreground mt-1">{isAr ? p.specialization_ar : p.specialization_en}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TeamSection;
