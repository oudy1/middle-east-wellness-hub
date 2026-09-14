import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, CalendarDays, ExternalLink, Loader2, Plus, Users } from "lucide-react";

type Opportunity = {
  id: string;
  institution: string;
  project_title: string;
  project_description: string;
  preferred_background: string | null;
  deadline: string | null;
  is_paid: string | null;
  study_website: string | null;
  email: string;
  created_at: string;
};

const ResearchOpportunitiesList = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [items, setItems] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data, error } = await supabase
        .from("opportunities")
        .select(
          "id, institution, project_title, project_description, preferred_background, deadline, is_paid, study_website, email, created_at",
        )
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(30);
      if (!active) return;
      if (error) console.error("Failed to load opportunities:", error);
      setItems((data ?? []) as Opportunity[]);
      setLoading(false);
    };
    void load();
    return () => {
      active = false;
    };
  }, []);

  const paidLabel = (value: string | null) => {
    if (value === "yes") return isAr ? "مدفوعة" : "Paid";
    if (value === "stipend") return isAr ? "مكافأة جزئية" : "Stipend";
    if (value === "no") return isAr ? "تطوعية" : "Volunteer";
    return null;
  };

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat(isAr ? "ar" : "en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(value));

  return (
    <div className={isAr ? "font-cairo" : ""} dir={isAr ? "rtl" : "ltr"}>
      {loading ? (
        <div className="flex justify-center py-8 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center mb-6">
          {isAr
            ? "لا توجد فرص بحثية منشورة حالياً. تحقق مرة أخرى قريباً."
            : "No research opportunities are posted right now. Please check back soon."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-8 text-start">
          {items.map((item) => (
            <Card key={item.id} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-semibold text-foreground leading-snug">
                    {item.project_title}
                  </h4>
                  {paidLabel(item.is_paid) && (
                    <Badge variant="secondary" className="shrink-0">
                      {paidLabel(item.is_paid)}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4 shrink-0" />
                  {item.institution}
                </p>
                <p className="text-sm text-foreground/80 whitespace-pre-wrap">
                  {item.project_description}
                </p>
                {item.preferred_background && (
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4 shrink-0" />
                    {item.preferred_background}
                  </p>
                )}
                {item.deadline && (
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 shrink-0" />
                    {isAr ? "آخر موعد للتقديم: " : "Apply by: "}
                    {formatDate(item.deadline)}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 pt-1">
                  <a href={`mailto:${item.email}?subject=${encodeURIComponent(item.project_title)}`}>
                    <Button size="sm" variant="outline" className="min-h-[44px]">
                      {isAr ? "تواصل مع الباحث" : "Contact researcher"}
                    </Button>
                  </a>
                  {item.study_website && (
                    <a
                      href={item.study_website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="ghost" className="min-h-[44px]">
                        {isAr ? "موقع الدراسة" : "Study website"}
                        <ExternalLink className="h-4 w-4 ms-2" />
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center">
        <Link to="/post-opportunity">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground min-h-[44px]">
            <Plus className="h-4 w-4 me-2" />
            {isAr ? "أرسل فرصة" : "Submit an Opportunity"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ResearchOpportunitiesList;
