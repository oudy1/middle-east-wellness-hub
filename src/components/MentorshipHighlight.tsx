import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, ExternalLink, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import posterAsset from "@/assets/mentorship-poster.jpg.asset.json";

const MENTOR_FORM = "https://forms.gle/dCyMfPQH8DRSxsxb8";
const MENTEE_FORM = "https://forms.gle/3Xw71e2Y3Hhqn7gF9";
const LINKTREE = "https://linktr.ee/ProjectSHAMS";

const MentorshipHighlight = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const isRTL = isAr || language === "fa" || language === "ku";

  const title = isAr ? "برنامج الإرشاد من شمس" : "SHAMS Mentorship Program";
  const subtitle = isAr
    ? "تمكين قادة الرعاية الصحية المستقبليين من منطقة الشرق الأوسط وشمال أفريقيا"
    : "Empowering future MENA healthcare leaders";
  const desc = isAr
    ? "يربط برنامج الإرشاد من شمس الطلاب والمهنيين في بداية مسيرتهم من خلفيات الشرق الأوسط وشمال أفريقيا بمهنيي الرعاية الصحية في جميع أنحاء كندا للحصول على التوجيه والإرشاد والدعم المهني."
    : "The SHAMS Mentorship Program connects students and early-career individuals from Middle Eastern and North African backgrounds with healthcare professionals across Canada for guidance, mentorship, and career support.";

  return (
    <section className={`py-12 bg-background relative z-10 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src={posterAsset.url}
              alt={title}
              loading="lazy"
              className="rounded-xl shadow-lg max-w-full w-full sm:max-w-sm h-auto object-contain"
            />
          </div>
          <div className="order-2 md:order-1">
            <Badge variant="secondary" className="mb-3">
              {isAr ? "برنامج" : "Program"}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{title}</h2>
            <p className="text-lg text-muted-foreground mb-6">{subtitle}</p>
            <p className="text-muted-foreground mb-6 leading-relaxed">{desc}</p>
            <div className="flex flex-wrap gap-3">
              <a href={MENTOR_FORM} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2">
                  <Users className="h-4 w-4" /> {isAr ? "كن مرشداً" : "Become a Mentor"}
                </Button>
              </a>
              <a href={MENTEE_FORM} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2">
                  <GraduationCap className="h-4 w-4" /> {isAr ? "كن مستفيداً من الإرشاد" : "Become a Mentee"}
                </Button>
              </a>
              <Link to="/programs/mentorship">
                <Button size="lg" variant="ghost" className="gap-2">
                  {isAr ? "اعرف المزيد" : "Learn more"} <ExternalLink size={14} />
                </Button>
              </Link>
            </div>
            <a
              href={LINKTREE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-4"
            >
              <LinkIcon className="h-3 w-3" /> {isAr ? "جميع روابط شمس" : "All SHAMS Links"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorshipHighlight;
