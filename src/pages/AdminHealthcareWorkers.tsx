import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  ACTION_LABELS,
  LISTING_STATUSES,
  NEXT_STATUSES,
  STATUS_LABELS,
  isDueForReverification,
  type ListingStatus,
} from "@/lib/healthcareDirectory";

type Worker = Tables<"healthcare_workers">;
type Review = Tables<"healthcare_worker_reviews">;
type HistoryRow = Tables<"healthcare_worker_history">;
type Filter = ListingStatus | "all" | "reverify";

const FILTERS: Filter[] = ["pending_review", "needs_correction", "approved", "published", "reverify", "rejected", "archived", "draft", "all"];
const FILTER_LABELS: Record<Filter, string> = { ...STATUS_LABELS, all: "All", reverify: "Due for re-check" };

const EDITABLE = ["clinic_name", "address", "phone", "email", "website", "notes"] as const;
type Editable = (typeof EDITABLE)[number];
const EDIT_LABELS: Record<Editable, string> = {
  clinic_name: "Clinic",
  address: "Address",
  phone: "Phone",
  email: "Public email",
  website: "Website",
  notes: "Public note",
};

const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleString("en-CA", { timeZone: "America/Toronto" }) : "never");

const AdminHealthcareWorkers = () => {
  const navigate = useNavigate();
  const [authChecking, setAuthChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [reviews, setReviews] = useState<Record<string, Review>>({});
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>("pending_review");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<Record<Editable, string>>>({});
  const [history, setHistory] = useState<Record<string, HistoryRow[]>>({});

  const load = async () => {
    setLoading(true);
    const [w, r] = await Promise.all([
      supabase.from("healthcare_workers").select("*").order("created_at", { ascending: false }),
      supabase.from("healthcare_worker_reviews").select("*"),
    ]);
    setLoading(false);
    if (w.error || r.error) {
      toast({ title: "Failed to load listings", description: (w.error ?? r.error)?.message, variant: "destructive" });
      return;
    }
    setWorkers(w.data ?? []);
    setReviews(Object.fromEntries((r.data ?? []).map((x) => [x.worker_id, x])));
  };

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
      setAuthChecking(false);
      setIsAdmin(!!adminRow);
      if (adminRow) void load();
    };
    void init();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/admin/login", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDue = (w: Worker) => w.status === "published" && isDueForReverification(w.last_verified_at, w.needs_reverification);

  const counts = useMemo(() => {
    const c = Object.fromEntries(FILTERS.map((f) => [f, 0])) as Record<Filter, number>;
    c.all = workers.length;
    workers.forEach((w) => {
      c[w.status as ListingStatus] = (c[w.status as ListingStatus] ?? 0) + 1;
      if (isDue(w)) c.reverify += 1;
    });
    return c;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workers]);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return workers.filter((w) => {
      if (filter === "reverify" ? !isDue(w) : filter !== "all" && w.status !== filter) return false;
      if (!term) return true;
      return [w.full_name, w.city, w.provider_type, w.clinic_name, reviews[w.id]?.submitted_by_email]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workers, reviews, filter, search]);

  const saveNote = async (w: Worker) => {
    const note = notes[w.id];
    if (note === undefined || note === (reviews[w.id]?.review_notes ?? "")) return true;
    const { error } = await supabase
      .from("healthcare_worker_reviews")
      .update({ review_notes: note.slice(0, 2000) || null, updated_at: new Date().toISOString() })
      .eq("worker_id", w.id);
    if (error) {
      toast({ title: "Could not save the note", description: error.message, variant: "destructive" });
      return false;
    }
    return true;
  };

  const run = async (w: Worker, change: Partial<Worker>, done: string) => {
    setBusyId(w.id);
    const noteOk = await saveNote(w);
    const { error } = noteOk ? await supabase.from("healthcare_workers").update(change).eq("id", w.id) : { error: null };
    setBusyId(null);
    if (error) {
      const duplicate = (error as { code?: string }).code === "23505";
      toast({
        title: duplicate ? "Already published" : "Update failed",
        description: duplicate
          ? "Another published listing has the same name, city and provider type. Archive one of them first."
          : error.message,
        variant: "destructive",
      });
      return;
    }
    if (noteOk) toast({ title: done });
    setHistory((h) => ({ ...h, [w.id]: undefined as unknown as HistoryRow[] }));
    void load();
  };

  const saveEdits = (w: Worker) => {
    const change: Partial<Worker> = {};
    EDITABLE.forEach((k) => {
      if (draft[k] === undefined) return;
      const v = draft[k]!.trim();
      (change as Record<string, string | null>)[k] = v ? v.slice(0, k === "notes" ? 1000 : 300) : null;
    });
    setEditingId(null);
    setDraft({});
    void run(w, change, "Listing details saved");
  };

  const toggleHistory = async (w: Worker) => {
    if (history[w.id]) {
      setHistory((h) => {
        const n = { ...h };
        delete n[w.id];
        return n;
      });
      return;
    }
    const { data, error } = await supabase
      .from("healthcare_worker_history")
      .select("*")
      .eq("worker_id", w.id)
      .order("changed_at", { ascending: false })
      .limit(50);
    if (error) {
      toast({ title: "Could not load history", description: error.message, variant: "destructive" });
      return;
    }
    setHistory((h) => ({ ...h, [w.id]: data ?? [] }));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  const seo = <SEOHead noIndex title="Directory Listings - SHAMS" description="SHAMS admin directory review" />;

  if (authChecking) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-4 text-center">
        {seo}
        <h1 className="text-xl font-bold text-foreground">Not authorized</h1>
        <p className="text-muted-foreground">This account is not a SHAMS administrator.</p>
        <Button onClick={handleSignOut}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      {seo}
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Directory listings</h1>
            <p className="text-sm text-muted-foreground">
              Only Published listings are visible to the public. Approve keeps a listing hidden until you publish it.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => navigate("/admin/opportunities")}>Opportunities</Button>
            <Button variant="outline" onClick={handleSignOut}>Sign out</Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4" role="group" aria-label="Filter by status">
          {FILTERS.map((f) => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {FILTER_LABELS[f]} ({counts[f] ?? 0})
            </Button>
          ))}
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, city, email"
            aria-label="Search listings"
            className="max-w-xs"
          />
          <Button size="sm" variant="ghost" onClick={() => void load()} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        {visible.length === 0 ? (
          <p className="text-muted-foreground py-10 text-center">No listings here.</p>
        ) : (
          <div className="space-y-4">
            {visible.map((w) => {
              const review = reviews[w.id];
              const status = w.status as ListingStatus;
              const busy = busyId === w.id;
              return (
                <Card key={w.id} data-testid="listing-card">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h2 className="font-semibold text-foreground">{w.full_name}</h2>
                        <p className="text-sm text-muted-foreground">
                          {w.provider_type}
                          {w.specialty ? ` · ${w.specialty}` : ""} · {w.city}, {w.province}
                          {w.languages?.length ? ` · ${w.languages.join(", ")}` : ""}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant={status === "published" ? "default" : status === "rejected" ? "destructive" : "secondary"}>
                          {STATUS_LABELS[status] ?? w.status}
                        </Badge>
                        {isDue(w) && <Badge variant="outline">Due for re-check</Badge>}
                      </div>
                    </div>

                    {editingId === w.id ? (
                      <div className="grid gap-2 sm:grid-cols-2">
                        {EDITABLE.map((k) => (
                          <label key={k} className="text-xs text-muted-foreground space-y-1">
                            <span>{EDIT_LABELS[k]}</span>
                            <Input
                              value={draft[k] ?? w[k] ?? ""}
                              onChange={(e) => setDraft((d) => ({ ...d, [k]: e.target.value }))}
                            />
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-foreground/80 space-y-1">
                        {EDITABLE.filter((k) => w[k]).map((k) => (
                          <p key={k}>
                            <span className="text-muted-foreground">{EDIT_LABELS[k]}:</span> {w[k]}
                          </p>
                        ))}
                      </div>
                    )}

                    {(review?.submitted_by_email || review?.applicant_notes) && (
                      <div className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground space-y-1">
                        <p className="font-medium text-foreground">Private (never shown publicly)</p>
                        {review.submitted_by_email && <p>Applicant email: {review.submitted_by_email}</p>}
                        {review.applicant_notes && <p className="whitespace-pre-wrap">{review.applicant_notes}</p>}
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>
                        Source: {w.source ?? "unknown"} · Submitted {fmt(w.created_at)} · Last verified {fmt(w.last_verified_at)}
                      </p>
                      {review?.reviewed_at && <p>Last status change by an admin: {fmt(review.reviewed_at)}</p>}
                    </div>

                    <Textarea
                      rows={2}
                      placeholder="Internal review notes (private)"
                      aria-label={`Review notes for ${w.full_name}`}
                      value={notes[w.id] ?? review?.review_notes ?? ""}
                      onChange={(e) => setNotes((p) => ({ ...p, [w.id]: e.target.value }))}
                    />

                    <div className="flex flex-wrap gap-2">
                      {NEXT_STATUSES[status]?.map((next) => (
                        <Button
                          key={next}
                          size="sm"
                          variant={next === "published" || next === "approved" ? "default" : next === "rejected" ? "destructive" : "outline"}
                          disabled={busy}
                          onClick={() => void run(w, { status: next }, `Listing: ${STATUS_LABELS[next]}`)}
                        >
                          {ACTION_LABELS[next]}
                        </Button>
                      ))}
                      {status === "published" && (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={busy}
                          onClick={() =>
                            void run(
                              w,
                              { needs_reverification: !w.needs_reverification },
                              w.needs_reverification ? "Marked as re-checked today" : "Flagged for re-check",
                            )
                          }
                        >
                          {w.needs_reverification ? "Mark re-checked today" : "Flag for re-check"}
                        </Button>
                      )}
                      {editingId === w.id ? (
                        <>
                          <Button size="sm" disabled={busy} onClick={() => saveEdits(w)}>Save details</Button>
                          <Button size="sm" variant="ghost" onClick={() => { setEditingId(null); setDraft({}); }}>Cancel</Button>
                        </>
                      ) : (
                        <Button size="sm" variant="ghost" onClick={() => { setEditingId(w.id); setDraft({}); }}>Edit details</Button>
                      )}
                      <Button size="sm" variant="ghost" aria-expanded={!!history[w.id]} onClick={() => void toggleHistory(w)}>
                        {history[w.id] ? "Hide history" : "History"}
                      </Button>
                    </div>

                    {history[w.id] && (
                      <ul className="border-t border-border pt-2 text-xs text-muted-foreground space-y-1">
                        {history[w.id].length === 0 && <li>No changes recorded yet.</li>}
                        {history[w.id].map((h) => (
                          <li key={h.id}>
                            {fmt(h.changed_at)} · {h.action.replace(/_/g, " ")}
                            {h.old_status || h.new_status ? ` · ${h.old_status ?? "-"} → ${h.new_status ?? "-"}` : ""}
                            {h.changed_fields?.length ? ` · ${h.changed_fields.join(", ")}` : ""}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        <p className="mt-8 text-xs text-muted-foreground">Statuses: {LISTING_STATUSES.map((s) => STATUS_LABELS[s]).join(" · ")}</p>
      </main>
    </div>
  );
};

export default AdminHealthcareWorkers;
