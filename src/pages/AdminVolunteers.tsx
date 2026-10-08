import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";
import { Loader2, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "shams-volunteer-sheet-url";

type SheetData = {
  title: string;
  sheet: string;
  headers: string[];
  rows: string[][];
  total: number;
};

const AdminVolunteers = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [authChecking, setAuthChecking] = useState(true);
  const [sheetUrl, setSheetUrl] = useState(
    () => localStorage.getItem(STORAGE_KEY) ?? "",
  );
  const [data, setData] = useState<SheetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const t = {
    title: isAr ? "طلبات التطوع" : "Volunteer sign-ups",
    sheetLinkLabel: isAr ? "رابط جدول الردود" : "Responses sheet link",
    sheetLinkPlaceholder: "https://docs.google.com/spreadsheets/d/...",
    load: isAr ? "تحميل الردود" : "Load responses",
    loading: isAr ? "جارٍ التحميل..." : "Loading...",
    refresh: isAr ? "تحديث" : "Refresh",
    search: isAr ? "بحث في الردود..." : "Search responses...",
    empty: isAr
      ? "الصق رابط جدول الردود ثم اضغط تحميل الردود."
      : "Paste your responses sheet link, then press Load responses.",
    noRows: isAr ? "لا توجد ردود بعد." : "No responses yet.",
    total: isAr ? "إجمالي الردود" : "Total responses",
    loadFailed: isAr ? "تعذر تحميل الردود" : "Could not load responses",
  };

  const load = useCallback(
    async (url: string) => {
      if (!url.trim()) return;
      setLoading(true);
      const { data: result, error } = await supabase.functions.invoke(
        "volunteer-sheet",
        { body: { sheetUrl: url.trim() } },
      );
      setLoading(false);
      if (error || result?.error) {
        toast({
          title: t.loadFailed,
          description: result?.error ?? error?.message,
          variant: "destructive",
        });
        return;
      }
      setData(result as SheetData);
    },
    [t.loadFailed],
  );

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
        navigate("/admin/login", { replace: true });
        return;
      }
      setAuthChecking(false);
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) load(saved);
    };
    init();
  }, [navigate, load]);

  const handleLoad = () => {
    localStorage.setItem(STORAGE_KEY, sheetUrl.trim());
    load(sheetUrl);
  };

  const filteredRows = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    if (!q) return data.rows;
    return data.rows.filter((row) =>
      row.some((cell) => String(cell).toLowerCase().includes(q)),
    );
  }, [data, search]);

  if (authChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10" dir={isAr ? "rtl" : "ltr"}>
      <SEOHead title={t.title} description={t.title} noindex />
      <h1 className="mb-6 text-2xl font-bold">{t.title}</h1>

      <Card className="mb-6">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="sheet-url" className="mb-1 block text-sm font-medium">
              {t.sheetLinkLabel}
            </label>
            <Input
              id="sheet-url"
              dir="ltr"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              placeholder={t.sheetLinkPlaceholder}
              className="min-h-11"
            />
          </div>
          <Button onClick={handleLoad} disabled={loading} className="min-h-11">
            {loading ? t.loading : t.load}
          </Button>
        </CardContent>
      </Card>

      {!data && !loading && (
        <p className="text-muted-foreground">{t.empty}</p>
      )}

      {data && (
        <>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {t.total}: {data.total}
            </p>
            <div className="flex gap-2">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.search}
                className="min-h-11 sm:w-64"
              />
              <Button
                variant="outline"
                onClick={() => load(sheetUrl)}
                disabled={loading}
                className="min-h-11"
                aria-label={t.refresh}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>

          {filteredRows.length === 0 ? (
            <p className="text-muted-foreground">{t.noRows}</p>
          ) : (
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    {data.headers.map((h, i) => (
                      <th
                        key={i}
                        className="whitespace-nowrap px-3 py-2 text-start font-medium"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row, ri) => (
                    <tr key={ri} className="border-b last:border-0">
                      {data.headers.map((_, ci) => (
                        <td key={ci} className="px-3 py-2 align-top">
                          {row[ci] ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminVolunteers;
