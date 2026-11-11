import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";
import { FileUp, Loader2, RefreshCw } from "lucide-react";
import { parseCsv } from "@/lib/parseCsv";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "shams-volunteer-sheet-url";

type SheetData = {
  title: string;
  sheet: string;
  headers: string[];
  rows: string[][];
  total: number;
  source?: "sheet" | "csv";
};

const MAX_CSV_BYTES = 5 * 1024 * 1024;

const AdminVolunteers = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [authChecking, setAuthChecking] = useState(true);
  const [sheetUrl, setSheetUrl] = useState(
    () => localStorage.getItem(STORAGE_KEY) ?? "https://docs.google.com/spreadsheets/d/1H_ExntnVop3lTt2FTmY6_dX4HP1O1s9ejKfN3ObJwhU/edit",
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
    linkHint: isAr
      ? "استخدم جدول الردود المرتبط من تبويب الردود في نموذج Google، وليس رابط النموذج نفسه."
      : "Use the response spreadsheet linked from your Google Form’s Responses tab, not the form link.",
    noRows: isAr ? "لا توجد ردود بعد." : "No responses yet.",
    total: isAr ? "إجمالي الردود" : "Total responses",
    loadFailed: isAr ? "تعذر تحميل الردود" : "Could not load responses",
    csvLabel: isAr ? "أو افتح ملف CSV مُصدَّر" : "Or open a CSV export",
    csvButton: isAr ? "اختر ملف CSV" : "Choose CSV file",
    csvHint: isAr
      ? "في Google Sheets: ملف ثم تنزيل ثم قيم مفصولة بفواصل (CSV). يُقرأ الملف على هذا الجهاز فقط ولا يُرفع إلى الموقع، ويختفي عند إغلاق الصفحة."
      : "In Google Sheets: File, then Download, then Comma-separated values (.csv). The file is read on this device only, is not uploaded to the website, and disappears when you close the page.",
    csvFailed: isAr ? "تعذر قراءة الملف" : "Could not read the file",
    csvNotCsv: isAr ? "اختر ملفًا بصيغة CSV." : "Please choose a .csv file.",
    csvTooBig: isAr ? "الملف أكبر من 5 ميغابايت." : "The file is larger than 5 MB.",
    csvEmpty: isAr ? "لم نجد عناوين أعمدة في الملف." : "No column headers were found in the file.",
    fromCsv: isAr ? "من ملف" : "From file",
    fromSheet: isAr ? "من جدول Google" : "From Google Sheet",
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

  const handleCsvFile = async (file: File | undefined) => {
    if (!file) return;
    const fail = (description: string) =>
      toast({ title: t.csvFailed, description, variant: "destructive" });
    if (!/\.csv$/i.test(file.name) && file.type !== "text/csv") return fail(t.csvNotCsv);
    if (file.size > MAX_CSV_BYTES) return fail(t.csvTooBig);
    try {
      const { headers, rows } = parseCsv(await file.text());
      if (headers.length === 0) return fail(t.csvEmpty);
      setSearch("");
      setData({
        title: file.name,
        sheet: file.name,
        headers,
        rows,
        total: rows.length,
        source: "csv",
      });
    } catch {
      fail(t.csvEmpty);
    }
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
      <SEOHead noIndex title={t.title} description={t.title} />
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
            <p className="mt-1 text-sm text-muted-foreground">{t.linkHint}</p>
          </div>
          <Button onClick={handleLoad} disabled={loading} className="min-h-11">
            {loading ? t.loading : t.load}
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="mb-1 text-sm font-medium">{t.csvLabel}</p>
            <p className="text-sm text-muted-foreground">{t.csvHint}</p>
          </div>
          <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-within:ring-2 focus-within:ring-ring">
            <FileUp className="h-4 w-4" aria-hidden="true" />
            {t.csvButton}
            <input
              type="file"
              accept=".csv,text/csv"
              className="sr-only"
              onChange={(e) => {
                handleCsvFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
        </CardContent>
      </Card>

      {!data && !loading && (
        <p className="text-muted-foreground">{t.empty}</p>
      )}

      {data && (
        <>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {data.source === "csv" ? `${t.fromCsv}: ${data.title}` : t.fromSheet}
              {" · "}
              {t.total}: {data.total}
            </p>
            <div className="flex gap-2">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.search}
                className="min-h-11 sm:w-64"
              />
              {data.source !== "csv" && (
              <Button
                variant="outline"
                onClick={() => load(sheetUrl)}
                disabled={loading}
                className="min-h-11"
                aria-label={t.refresh}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
              )}
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
