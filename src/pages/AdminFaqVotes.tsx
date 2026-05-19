import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";
import faqData from "../../content/faq.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type VoteRow = {
  id: string;
  faq_id: string;
  vote: string;
  language: string | null;
  session_id: string | null;
  created_at: string;
};

type Aggregate = {
  faq_id: string;
  questionEn: string;
  questionAr: string;
  language: string;
  up: number;
  down: number;
  total: number;
  helpfulPct: number;
};

const AdminFaqVotes = () => {
  const navigate = useNavigate();
  const [authChecking, setAuthChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rows, setRows] = useState<VoteRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState<"all" | "en" | "ar">("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      if (!session) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const { data: adminRow } = await supabase
        .from("app_admins")
        .select("user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (!adminRow) {
        setAuthChecking(false);
        setIsAdmin(false);
        return;
      }
      setIsAdmin(true);
      setAuthChecking(false);
      void loadVotes();
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/admin/login", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadVotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("faq_votes")
      .select("id, faq_id, vote, language, session_id, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    setLoading(false);
    if (error) {
      toast({ title: "Failed to load votes", description: error.message, variant: "destructive" });
      return;
    }
    setRows((data ?? []) as VoteRow[]);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  const faqMap = useMemo(() => {
    const map = new Map<string, { en: string; ar: string }>();
    (faqData as Array<{ id: string; questionEn: string; questionAr: string }>).forEach((f) => {
      map.set(f.id, { en: f.questionEn, ar: f.questionAr });
    });
    return map;
  }, []);

  const dateFilter = useMemo(() => {
    const startMs = startDate ? new Date(startDate + "T00:00:00").getTime() : null;
    const endMs = endDate ? new Date(endDate + "T23:59:59.999").getTime() : null;
    return (r: VoteRow) => {
      const t = new Date(r.created_at).getTime();
      if (startMs !== null && t < startMs) return false;
      if (endMs !== null && t > endMs) return false;
      return true;
    };
  }, [startDate, endDate]);

  const aggregates = useMemo<Aggregate[]>(() => {
    const filtered = rows.filter(
      (r) =>
        (langFilter === "all" || (r.language ?? "en") === langFilter) &&
        dateFilter(r)
    );
    const buckets = new Map<string, Aggregate>();
    for (const r of filtered) {
      const lang = r.language ?? "en";
      const key = `${r.faq_id}::${lang}`;
      const q = faqMap.get(r.faq_id) ?? { en: r.faq_id, ar: r.faq_id };
      const existing =
        buckets.get(key) ??
        ({
          faq_id: r.faq_id,
          questionEn: q.en,
          questionAr: q.ar,
          language: lang,
          up: 0,
          down: 0,
          total: 0,
          helpfulPct: 0,
        } as Aggregate);
      if (r.vote === "up") existing.up += 1;
      else if (r.vote === "down") existing.down += 1;
      existing.total = existing.up + existing.down;
      existing.helpfulPct = existing.total ? Math.round((existing.up / existing.total) * 100) : 0;
      buckets.set(key, existing);
    }
    const list = Array.from(buckets.values()).sort((a, b) => b.total - a.total);
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (a) =>
        a.faq_id.toLowerCase().includes(q) ||
        a.questionEn.toLowerCase().includes(q) ||
        a.questionAr.toLowerCase().includes(q)
    );
  }, [rows, langFilter, search, faqMap, dateFilter]);

  const totals = useMemo(() => {
    let up = 0;
    let down = 0;
    for (const r of rows) {
      if (langFilter !== "all" && (r.language ?? "en") !== langFilter) continue;
      if (!dateFilter(r)) continue;
      if (r.vote === "up") up++;
      else if (r.vote === "down") down++;
    }
    const total = up + down;
    return { up, down, total, helpfulPct: total ? Math.round((up / total) * 100) : 0 };
  }, [rows, langFilter, dateFilter]);

  const [granularity, setGranularity] = useState<"day" | "week">("day");

  const trendData = useMemo(() => {
    const bucketKey = (iso: string) => {
      const d = new Date(iso);
      if (granularity === "week") {
        // ISO-ish week start (Monday)
        const day = d.getUTCDay();
        const diff = (day + 6) % 7;
        d.setUTCDate(d.getUTCDate() - diff);
      }
      return d.toISOString().slice(0, 10);
    };

    const buckets = new Map<
      string,
      { date: string; en_up: number; en_down: number; ar_up: number; ar_down: number }
    >();

    for (const r of rows) {
      if (!dateFilter(r)) continue;
      const lang = (r.language ?? "en") === "ar" ? "ar" : "en";
      if (langFilter !== "all" && langFilter !== lang) continue;
      const key = bucketKey(r.created_at);
      const existing =
        buckets.get(key) ??
        { date: key, en_up: 0, en_down: 0, ar_up: 0, ar_down: 0 };
      const field = `${lang}_${r.vote === "up" ? "up" : "down"}` as
        | "en_up"
        | "en_down"
        | "ar_up"
        | "ar_down";
      if (r.vote === "up" || r.vote === "down") existing[field] += 1;
      buckets.set(key, existing);
    }
    return Array.from(buckets.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [rows, dateFilter, langFilter, granularity]);


  const exportCsv = () => {
    const header = ["faq_id", "language", "question_en", "question_ar", "up", "down", "total", "helpful_pct"];
    const lines = [header.join(",")];
    for (const a of aggregates) {
      const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
      lines.push(
        [a.faq_id, a.language, esc(a.questionEn), esc(a.questionAr), a.up, a.down, a.total, a.helpfulPct].join(",")
      );
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `faq-votes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (authChecking) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background text-muted-foreground">
        Checking access...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-background gap-4 px-4 text-center">
        <h1 className="text-xl font-bold text-foreground">Access denied</h1>
        <p className="text-sm text-muted-foreground max-w-md">
          Your account is signed in but is not authorized as a SHAMS administrator.
        </p>
        <Button variant="outline" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <SEOHead title="FAQ Vote Analytics - SHAMS Admin" description="Admin analytics for FAQ feedback" />
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-foreground">FAQ Vote Analytics</h1>
            <p className="text-xs text-muted-foreground">Helpfulness feedback per FAQ and language</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={loadVotes} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button variant="outline" size="sm" onClick={exportCsv} disabled={aggregates.length === 0}>
              Export CSV
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total votes" value={totals.total} />
          <StatCard label="Helpful" value={totals.up} accent="text-primary" />
          <StatCard label="Not helpful" value={totals.down} accent="text-muted-foreground" />
          <StatCard label="Helpful %" value={`${totals.helpfulPct}%`} />
        </section>

        <section className="border border-border rounded-md bg-card p-4">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Helpful vs Not helpful over time</h2>
              <p className="text-xs text-muted-foreground">
                {langFilter === "all"
                  ? "Per language (EN and AR), respects date and search filters above"
                  : `Language: ${langFilter.toUpperCase()}`}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {(["day", "week"] as const).map((g) => (
                <Button
                  key={g}
                  variant={granularity === g ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGranularity(g)}
                >
                  {g === "day" ? "Daily" : "Weekly"}
                </Button>
              ))}
            </div>
          </div>
          <div className="w-full h-64">
            {trendData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                No votes in the selected range.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                  />
                  <YAxis
                    allowDecimals={false}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 6,
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {(langFilter === "all" || langFilter === "en") && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="en_up"
                        name="EN helpful"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="en_down"
                        name="EN not helpful"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        dot={false}
                      />
                    </>
                  )}
                  {(langFilter === "all" || langFilter === "ar") && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="ar_up"
                        name="AR helpful"
                        stroke="hsl(var(--accent-foreground))"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="ar_down"
                        name="AR not helpful"
                        stroke="hsl(var(--accent-foreground))"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        dot={false}
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>



        <section className="flex flex-wrap items-center gap-2">
          <Input
            placeholder="Search by FAQ id or question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center gap-1">
            {(["all", "en", "ar"] as const).map((l) => (
              <Button
                key={l}
                variant={langFilter === l ? "default" : "outline"}
                size="sm"
                onClick={() => setLangFilter(l)}
              >
                {l === "all" ? "All" : l.toUpperCase()}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="text-xs text-muted-foreground flex items-center gap-1">
              From
              <Input
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-9 w-auto"
              />
            </label>
            <label className="text-xs text-muted-foreground flex items-center gap-1">
              To
              <Input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-9 w-auto"
              />
            </label>
            {(startDate || endDate) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                }}
              >
                Clear
              </Button>
            )}
          </div>
          <span className="text-xs text-muted-foreground ml-auto">
            {aggregates.length} row{aggregates.length === 1 ? "" : "s"}
          </span>
        </section>

        <section className="border border-border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>FAQ</TableHead>
                <TableHead className="w-16">Lang</TableHead>
                <TableHead className="text-right w-20">Helpful</TableHead>
                <TableHead className="text-right w-24">Not helpful</TableHead>
                <TableHead className="text-right w-20">Total</TableHead>
                <TableHead className="text-right w-20">Helpful %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aggregates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    {loading ? "Loading..." : "No votes yet."}
                  </TableCell>
                </TableRow>
              ) : (
                aggregates.map((a) => (
                  <TableRow key={`${a.faq_id}-${a.language}`}>
                    <TableCell>
                      <div className="font-medium text-sm text-foreground">
                        {a.language === "ar" ? a.questionAr : a.questionEn}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">{a.faq_id}</div>
                    </TableCell>
                    <TableCell className="uppercase text-xs">{a.language}</TableCell>
                    <TableCell className="text-right text-primary font-medium">{a.up}</TableCell>
                    <TableCell className="text-right">{a.down}</TableCell>
                    <TableCell className="text-right font-medium">{a.total}</TableCell>
                    <TableCell className="text-right">{a.helpfulPct}%</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </section>
      </main>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: string;
}) => (
  <div className="border border-border rounded-md p-3 bg-card">
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className={`text-2xl font-bold ${accent ?? "text-foreground"}`}>{value}</div>
  </div>
);

export default AdminFaqVotes;
