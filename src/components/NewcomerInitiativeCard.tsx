import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ExternalLink, HeartHandshake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { NEWCOMER_WORKSHOP, isNewcomerWorkshopUpcoming } from "@/lib/newcomerWorkshop";

const NewcomerInitiativeCard = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const isRTL = language === "ar" || language === "ku" || language === "fa";
  const w = isAr ? NEWCOMER_WORKSHOP.ar : NEWCOMER_WORKSHOP.en;
  const upcoming = isNewcomerWorkshopUpcoming();

  return (
    <Card
      className={`border-2 border-healthTeal/30 bg-gradient-to-br from-healthTeal/5 to-background ${isRTL ? "font-cairo" : ""}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <CardHeader>
        <Badge className="w-fit mb-2 text-xs">{isAr ? "مبادرة من شمس" : "SHAMS Initiative"}</Badge>
        <CardTitle className="text-2xl flex items-center gap-2">
          <HeartHandshake className="h-6 w-6 text-healthTeal shrink-0" aria-hidden="true" />
          {isAr ? "مبادرة التثقيف الصحي للقادمين الجدد واللاجئين" : "Newcomer and Refugee Health Education Initiative"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {isAr
            ? "تساعد شمس القادمين الجدد واللاجئين على فهم نظام الرعاية الصحية في كندا: التغطية الصحية (OHIP وIFHP)، وإيجاد طبيب أسرة، وحقوق المرضى، والموارد المتاحة باللغة العربية، من خلال ورش مجتمعية مجانية."
            : "SHAMS helps newcomers and refugees understand the Canadian healthcare system: health coverage (OHIP and IFHP), finding a family doctor, patient rights and resources in Arabic, through free community workshops."}
        </p>

        {upcoming && (
          <div className="rounded-lg border border-border bg-card p-4 space-y-3">
            <p className="text-sm font-semibold text-healthDarkBlue">
              {isAr ? "الورشة القادمة: " : "Next workshop: "}
              {w.title}
            </p>
            <p className="text-sm text-muted-foreground">{w.summary}</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2"><Calendar className="h-4 w-4 mt-0.5 text-healthTeal shrink-0" aria-hidden="true" />{w.date}</li>
              <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 text-healthTeal shrink-0" aria-hidden="true" />{w.time}</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-healthTeal shrink-0" aria-hidden="true" />{w.place}</li>
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {upcoming && (
            <Button asChild className="min-h-[44px]">
              <a href={NEWCOMER_WORKSHOP.registerUrl} target="_blank" rel="noopener noreferrer">
                {isAr ? "سجّل في الورشة" : "Register for the Workshop"}
                <ExternalLink className="h-4 w-4 ms-2" aria-hidden="true" />
              </a>
            </Button>
          )}
          <Button asChild variant="outline" className="min-h-[44px]">
            <Link to="/contact?topic=general#contact-form">
              {isAr ? "اسأل عن المبادرة" : "Ask About This Initiative"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewcomerInitiativeCard;
