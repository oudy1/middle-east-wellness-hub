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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  const [rawTotal, setRawTotal] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

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
    const PAGE = 1000;
    let from = 0;
    const all: VoteRow[] = [];
    let serverTotal: number | null = null;
    // First request: also fetch exact count.
    while (true) {
      const query = supabase
        .from("faq_votes")
        .select("id, faq_id, vote, language, session_id, created_at", {
          count: from === 0 ? "exact" : undefined,
        })
        .order("created_at", { ascending: false })
        .range(from, from + PAGE - 1);
      const { data, error, count } = await query;
      if (error) {
        setLoading(false);
        toast({
          title: "Failed to load votes",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      if (from === 0 && typeof count === "number") serverTotal = count;
      const batch = (data ?? []) as VoteRow[];
      all.push(...batch);
      if (batch.length < PAGE) break;
      from += PAGE;
      // Safety cap to avoid runaway loops.
      if (from > 50000) break;
    }
    setRows(all);
    setRawTotal(serverTotal ?? all.length);
    setPage(1);
    setLoading(false);
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

  // Reset to first page whenever filters or page size change.
  useEffect(() => {
    setPage(1);
  }, [search, langFilter, startDate, endDate, pageSize]);

  const [granularity, setGranularity] = useState<"day" | "week">("day");
  const [trendFaqId, setTrendFaqId] = useState<string>("all");

  // FAQ ids present in the loaded vote data, with friendly labels.
  const availableFaqIds = useMemo(() => {
    const ids = new Set<string>();
    for (const r of rows) ids.add(r.faq_id);
    return Array.from(ids)
      .map((id) => {
        const q = faqMap.get(id);
        const label = q?.en ?? id;
        return { id, label: label.length > 80 ? label.slice(0, 77) + "..." : label };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [rows, faqMap]);

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
      if (trendFaqId !== "all" && r.faq_id !== trendFaqId) continue;
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
  }, [rows, dateFilter, langFilter, granularity, trendFaqId]);

  const [smoothing, setSmoothing] = useState<0 | 3 | 7>(0);

  const smoothedTrendData = useMemo(() => {
    if (smoothing === 0 || trendData.length === 0) return trendData;
    const keys = ["en_up", "en_down", "ar_up", "ar_down"] as const;
    const window = smoothing;
    return trendData.map((_, i) => {
      const start = Math.max(0, i - window + 1);
      const slice = trendData.slice(start, i + 1);
      const out: Record<string, number | string> = { date: trendData[i].date };
      for (const k of keys) {
        const sum = slice.reduce((acc, r) => acc + (r[k] as number), 0);
        out[k] = +(sum / slice.length).toFixed(2);
      }
      return out as typeof trendData[number];
    });
  }, [trendData, smoothing]);

  const [chartMode, setChartMode] = useState<"counts" | "percent">("counts");

  // Percentage series: helpful / (helpful+not helpful) * 100, with trailing window
  // matching the smoothing setting so the ratio is stable on low-volume days.
  const percentTrendData = useMemo(() => {
    if (trendData.length === 0) return [] as Array<{
      date: string;
      en_pct: number | null;
      en_total: number;
      ar_pct: number | null;
      ar_total: number;
    }>;
    const window = smoothing === 0 ? 1 : smoothing;
    return trendData.map((_, i) => {
      const start = Math.max(0, i - window + 1);
      const slice = trendData.slice(start, i + 1);
      const sum = (k: "en_up" | "en_down" | "ar_up" | "ar_down") =>
        slice.reduce((acc, r) => acc + (r[k] as number), 0);
      const enUp = sum("en_up");
      const enDown = sum("en_down");
      const arUp = sum("ar_up");
      const arDown = sum("ar_down");
      const enTotal = enUp + enDown;
      const arTotal = arUp + arDown;
      return {
        date: trendData[i].date,
        en_pct: enTotal ? +((enUp / enTotal) * 100).toFixed(1) : null,
        en_total: enTotal,
        ar_pct: arTotal ? +((arUp / arTotal) * 100).toFixed(1) : null,
        ar_total: arTotal,
      };
    });
  }, [trendData, smoothing]);





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
            <div className="flex items-center gap-2 flex-wrap">
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
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Smoothing</span>
                {([0, 3, 7] as const).map((s) => (
                  <Button
                    key={s}
                    variant={smoothing === s ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSmoothing(s)}
                  >
                    {s === 0 ? "None" : `MA-${s}`}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {(["counts", "percent"] as const).map((m) => (
                  <Button
                    key={m}
                    variant={chartMode === m ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartMode(m)}
                  >
                    {m === "counts" ? "Counts" : "Helpful %"}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-64">
            {(chartMode === "counts" ? smoothedTrendData : percentTrendData).length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                No votes in the selected range.
              </div>
            ) : chartMode === "counts" ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={smoothedTrendData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={11} />
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
                      <Line type="monotone" dataKey="en_up" name="EN helpful" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="en_down" name="EN not helpful" stroke="hsl(var(--primary))" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                    </>
                  )}
                  {(langFilter === "all" || langFilter === "ar") && (
                    <>
                      <Line type="monotone" dataKey="ar_up" name="AR helpful" stroke="hsl(var(--accent-foreground))" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="ar_down" name="AR not helpful" stroke="hsl(var(--accent-foreground))" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={percentTrendData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
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
                    formatter={(value: number | null) =>
                      value === null ? ["No votes", ""] : [`${value}%`, ""]
                    }
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {(langFilter === "all" || langFilter === "en") && (
                    <Line
                      type="monotone"
                      dataKey="en_pct"
                      name="EN helpful %"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                      connectNulls
                    />
                  )}
                  {(langFilter === "all" || langFilter === "ar") && (
                    <Line
                      type="monotone"
                      dataKey="ar_pct"
                      name="AR helpful %"
                      stroke="hsl(var(--accent-foreground))"
                      strokeWidth={2}
                      dot={false}
                      connectNulls
                    />
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
            {aggregates.length} row{aggregates.length === 1 ? "" : "s"} · {rawTotal.toLocaleString()} total vote{rawTotal === 1 ? "" : "s"}
          </span>
        </section>

        <PaginatedAggregatesTable
          aggregates={aggregates}
          rows={rows}
          dateFilter={dateFilter}
          loading={loading}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
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

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const PaginatedAggregatesTable = ({
  aggregates,
  rows,
  dateFilter,
  loading,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: {
  aggregates: Aggregate[];
  rows: VoteRow[];
  dateFilter: (r: VoteRow) => boolean;
  loading: boolean;
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (n: number) => void;
}) => {
  const total = aggregates.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, total);
  const slice = aggregates.slice(startIdx, endIdx);

  const [details, setDetails] = useState<Aggregate | null>(null);

  const detailVotes = useMemo(() => {
    if (!details) return [];
    return rows
      .filter(
        (r) =>
          r.faq_id === details.faq_id &&
          (r.language ?? "en") === details.language &&
          dateFilter(r)
      )
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 100);
  }, [details, rows, dateFilter]);

  return (
    <section className="border border-border rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>FAQ</TableHead>
              <TableHead className="w-16">Lang</TableHead>
              <TableHead className="text-right w-20">Helpful</TableHead>
              <TableHead className="text-right w-24">Not helpful</TableHead>
              <TableHead className="text-right w-20">Total</TableHead>
              <TableHead className="text-right w-20">Helpful %</TableHead>
              <TableHead className="text-right w-24">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {total === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  {loading ? "Loading..." : "No votes yet."}
                </TableCell>
              </TableRow>
            ) : (
              slice.map((a) => (
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
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setDetails(a)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!details} onOpenChange={(o) => !o && setDetails(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-base">
              {details ? (details.language === "ar" ? details.questionAr : details.questionEn) : ""}
            </DialogTitle>
            <DialogDescription className="text-xs font-mono">
              {details ? `${details.faq_id} · ${details.language.toUpperCase()}` : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="text-xs text-muted-foreground">
            Showing the {detailVotes.length} most recent vote{detailVotes.length === 1 ? "" : "s"} (max 100) within the current date range.
          </div>
          <div className="border border-border rounded-md overflow-x-auto max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-40">Date</TableHead>
                  <TableHead className="w-20">Vote</TableHead>
                  <TableHead>Session ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detailVotes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                      No individual votes to show.
                    </TableCell>
                  </TableRow>
                ) : (
                  detailVotes.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell className="text-xs whitespace-nowrap">
                        {new Date(v.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            v.vote === "up"
                              ? "text-primary text-xs font-medium"
                              : "text-muted-foreground text-xs"
                          }
                        >
                          {v.vote === "up" ? "Helpful" : "Not helpful"}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs font-mono break-all">
                        {v.session_id ?? <span className="text-muted-foreground italic">unavailable</span>}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-card px-3 py-2 text-xs">
        <div className="text-muted-foreground">
          {total === 0
            ? "0 results"
            : `Showing ${startIdx + 1}–${endIdx} of ${total}`}
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1 text-muted-foreground">
            Rows
            <select
              className="h-8 rounded-md border border-input bg-background px-1 text-xs"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Prev
          </Button>
          <span className="text-muted-foreground">
            Page {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdminFaqVotes;
