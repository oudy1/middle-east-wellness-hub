import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Row = { id: string; name: string; email: string; topic: string; description: string | null; language: string; created_at: string };

const AdminTopicRequests = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [state, setState] = useState<"checking" | "denied" | "ready">("checking");
  const [rows, setRows] = useState<Row[]>([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) return navigate("/admin/login", { replace: true });
      const { data: adminRow } = await supabase.from("app_admins").select("user_id").eq("user_id", s.session.user.id).maybeSingle();
      if (!adminRow) return setState("denied");
      setState("ready");
      const { data, error } = await supabase.from("webinar_topic_requests").select("*").order("created_at", { ascending: false });
      if (error) setLoadError(true);
      setRows((data ?? []) as Row[]);
    })();
  }, [navigate]);

  const t = {
    title: isAr ? "اقتراحات مواضيع الندوات" : "Webinar topic requests",
    denied: isAr ? "هذه الصفحة لمسؤولي شمس فقط." : "This page is for SHAMS admins only.",
    empty: isAr ? "لا توجد اقتراحات بعد." : "No requests yet.",
    error: isAr ? "تعذّر تحميل الاقتراحات." : "Could not load requests.",
    reply: isAr ? "رد عبر البريد" : "Reply by email",
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl" dir={isAr ? "rtl" : "ltr"}>
      <SEOHead title={t.title} description={t.title} noIndex />
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/opportunities")}>{isAr ? "الفرص" : "Opportunities"}</Button>
          <Button variant="outline" onClick={() => navigate("/admin/healthcare-workers")}>{isAr ? "مقدمو الرعاية" : "Healthcare workers"}</Button>
        </div>
      </div>
      {state === "checking" && <Loader2 className="h-6 w-6 animate-spin" aria-label="Loading" />}
      {state === "denied" && <p>{t.denied}</p>}
      {state === "ready" && (loadError ? <p>{t.error}</p> : rows.length === 0 ? <p className="text-muted-foreground">{t.empty}</p> : (
        <ul className="space-y-3" data-testid="topic-requests">
          {rows.map((r) => (
            <li key={r.id}>
              <Card><CardContent className="p-4 space-y-1">
                <p className="font-semibold text-foreground">{r.topic}</p>
                {r.description && <p className="text-sm whitespace-pre-wrap">{r.description}</p>}
                <p className="text-sm text-muted-foreground">
                  {r.name} · <a className="underline" href={`mailto:${r.email}`} dir="ltr">{r.email}</a> · {r.language === "ar" ? "العربية" : "English"} · {new Date(r.created_at).toLocaleString(isAr ? "ar" : "en-CA", { timeZone: "America/Toronto" })}
                </p>
              </CardContent></Card>
            </li>
          ))}
        </ul>
      ))}
    </main>
  );
};

export default AdminTopicRequests;
