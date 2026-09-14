import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type Status = "pending" | "approved" | "rejected";

type Row = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  institution: string;
  project_title: string;
  project_description: string;
  preferred_background: string | null;
  deadline: string | null;
  is_paid: string | null;
  study_website: string | null;
  newsletter: boolean;
  language: string | null;
  status: string;
  review_notes: string | null;
  reviewed_at: string | null;
  created_at: string;
};

const STATUSES: Array<Status | "all"> = ["pending", "approved", "rejected", "all"];

const AdminOpportunities = () => {
  const navigate = useNavigate();
  const [authChecking, setAuthChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Status | "all">("pending");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast({
        title: "Failed to load opportunities",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setRows((data ?? []) as Row[]);
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
      if (!adminRow) {
        setIsAdmin(false);
        return;
      }
      setIsAdmin(true);
      void load();
    };
    void init();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/admin/login", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const counts = useMemo(() => {
    const c = { pending: 0, approved: 0, rejected: 0, all: rows.length };
    rows.forEach((r) => {
      if (r.status === "pending" || r.status === "approved" || r.status === "rejected") {
        c[r.status] += 1;
      }
    });
    return c;
  }, [rows]);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!term) return true;
      return [r.project_title, r.institution, r.email, `${r.first_name} ${r.last_name}`]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [rows, filter, search]);

  const setStatus = async (row: Row, status: Status) => {
    setBusyId(row.id);
    const { data: sessionData } = await supabase.auth.getSession();
    const { error } = await supabase
      .from("opportunities")
      .update({
        status,
        review_notes: notes[row.id] ?? row.review_notes ?? null,
        reviewed_by: sessionData.session?.user.id ?? null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", row.id);
    setBusyId(null);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `Opportunity ${status}` });
    void load();
  };

  const remove = async (row: Row) => {
    setBusyId(row.id);
    const { error } = await supabase.from("opportunities").delete().eq("id", row.id);
    setBusyId(null);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Opportunity deleted" });
    void load();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

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
        <SEOHead title="Opportunity Inbox - SHAMS" description="SHAMS admin opportunity inbox" />
        <h1 className="text-xl font-bold text-foreground">Not authorized</h1>
        <p className="text-muted-foreground">
          This account is not a SHAMS administrator.
        </p>
        <Button onClick={handleSignOut}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <SEOHead title="Opportunity Inbox - SHAMS" description="SHAMS admin opportunity inbox" />
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Opportunity inbox</h1>
            <p className="text-sm text-muted-foreground">
              Approve a submission to publish it on the Research Opportunities page.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/admin/faq-votes")}>
              FAQ analytics
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {STATUSES.map((s) => (
            <Button
              key={s}
              size="sm"
              variant={filter === s ? "default" : "outline"}
              onClick={() => setFilter(s)}
            >
              {s} ({counts[s]})
            </Button>
          ))}
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, institution, email"
            className="max-w-xs"
          />
          <Button size="sm" variant="ghost" onClick={() => void load()} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        {visible.length === 0 ? (
          <p className="text-muted-foreground py-10 text-center">No submissions here yet.</p>
        ) : (
          <div className="space-y-4">
            {visible.map((row) => (
              <Card key={row.id}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h2 className="font-semibold text-foreground">{row.project_title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {row.institution} · {row.first_name} {row.last_name} · {row.email}
                        {row.phone ? ` · ${row.phone}` : ""}
                      </p>
                    </div>
                    <Badge
                      variant={
                        row.status === "approved"
                          ? "default"
                          : row.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {row.status}
                    </Badge>
                  </div>

                  <p className="text-sm whitespace-pre-wrap text-foreground/80">
                    {row.project_description}
                  </p>

                  <div className="text-xs text-muted-foreground space-y-1">
                    {row.preferred_background && <p>Background: {row.preferred_background}</p>}
                    {row.deadline && <p>Deadline: {row.deadline}</p>}
                    {row.is_paid && <p>Compensation: {row.is_paid}</p>}
                    {row.study_website && <p>Website: {row.study_website}</p>}
                    <p>
                      Submitted {new Date(row.created_at).toLocaleString()} · language{" "}
                      {row.language ?? "en"} · newsletter {row.newsletter ? "yes" : "no"}
                    </p>
                    {row.reviewed_at && (
                      <p>Reviewed {new Date(row.reviewed_at).toLocaleString()}</p>
                    )}
                  </div>

                  <Textarea
                    rows={2}
                    placeholder="Internal review notes (optional)"
                    value={notes[row.id] ?? row.review_notes ?? ""}
                    onChange={(e) => setNotes((p) => ({ ...p, [row.id]: e.target.value }))}
                  />

                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      disabled={busyId === row.id || row.status === "approved"}
                      onClick={() => void setStatus(row, "approved")}
                    >
                      Approve and publish
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={busyId === row.id || row.status === "rejected"}
                      onClick={() => void setStatus(row, "rejected")}
                    >
                      Reject
                    </Button>
                    {row.status !== "pending" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={busyId === row.id}
                        onClick={() => void setStatus(row, "pending")}
                      >
                        Move back to pending
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={busyId === row.id}
                      onClick={() => void remove(row)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminOpportunities;
