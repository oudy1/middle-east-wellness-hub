
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import CalligraphyBackground from "@/components/CalligraphyBackground";
import LandmarksGenerator from "@/components/LandmarksGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  FlaskConical, 
  Mail, 
  MapPin,
  ExternalLink,
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  FileDown,
  Phone,
  Users,
  CheckCircle2,
  DollarSign,
  Brain
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { studies } from "@/lib/studyData";
import { RESEARCHERS, type ResearcherDetail } from "@/lib/researchers";
import { useHashScroll } from "@/hooks/useHashScroll";

import StudyCard from "@/components/StudyCard";
import SawaFlyerCarousel from "@/components/SawaFlyerCarousel";
import SHAMSResearchPortfolio from "@/components/SHAMSResearchPortfolio";
import ResearchOpportunitiesList from "@/components/ResearchOpportunitiesList";

// Color maps for Tailwind JIT safety
const accentStyles: Record<string, { border: string; borderHover: string; gradFrom: string; gradTo: string; circle: string; circleGrad: string; text: string; tagBg: string; }> = {
  healthTeal: {
    border: 'border-healthTeal/20', borderHover: 'hover:border-healthTeal/40',
    gradFrom: 'from-healthTeal/10', gradTo: 'to-healthTeal/5',
    circle: 'from-healthTeal', circleGrad: 'to-healthTeal/70',
    text: 'text-healthTeal', tagBg: 'bg-healthTeal/10',
  },
  healthPurple: {
    border: 'border-healthPurple/20', borderHover: 'hover:border-healthPurple/40',
    gradFrom: 'from-healthPurple/10', gradTo: 'to-healthPurple/5',
    circle: 'from-healthPurple', circleGrad: 'to-healthPurple/70',
    text: 'text-healthPurple', tagBg: 'bg-healthPurple/10',
  },
  healthDarkBlue: {
    border: 'border-healthDarkBlue/20', borderHover: 'hover:border-healthDarkBlue/40',
    gradFrom: 'from-healthDarkBlue/10', gradTo: 'to-healthDarkBlue/5',
    circle: 'from-healthDarkBlue', circleGrad: 'to-healthDarkBlue/70',
    text: 'text-healthDarkBlue', tagBg: 'bg-healthDarkBlue/10',
  },
};

const RESEARCHER_ICONS = { graduation: GraduationCap, flask: FlaskConical, brain: Brain } as const;

/** "Read more" content for a researcher, drawn from content/researchers.json. */
const ResearcherDetails = ({ details, accent, isAr }: { details: ResearcherDetail[]; accent: string; isAr: boolean }) => {
  const s = accentStyles[accent] || accentStyles.healthTeal;
  return (
    <div className="space-y-2">
      {details.map((d, i) => {
        if (d.type === "text" || d.type === "note") {
          return <p key={i} className={`text-xs text-muted-foreground ${d.type === "note" ? "italic" : ""}`}>{isAr ? d.ar : d.en}</p>;
        }
        if (d.type === "list") {
          return (
            <ul key={i} className="space-y-1 text-xs text-muted-foreground">
              {(isAr ? d.ar : d.en).map((item) => (
                <li key={item} className="flex items-start gap-1.5"><span className="text-primary">•</span><span>{item}</span></li>
              ))}
            </ul>
          );
        }
        if (d.type === "chips") {
          return (
            <div key={i} className="flex flex-wrap gap-1">
              {(isAr ? d.ar : d.en).map((item) => (
                <span key={item} className={`px-1.5 py-0.5 ${s.tagBg} ${s.text} rounded-full text-[10px]`}>{item}</span>
              ))}
            </div>
          );
        }
        return (
          <div key={i} className="grid grid-cols-2 gap-2">
            {d.items.map((f) => (
              <div key={f.label_en}>
                <p className="text-xs text-muted-foreground">{isAr ? f.label_ar : f.label_en}</p>
                <p className="text-xs font-semibold">{isAr ? f.value_ar : f.value_en}</p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

// Reusable Researcher Card Component
interface ResearcherCardProps {
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  orgEn: string;
  orgAr: string;
  bioEn: string;
  bioAr: string;
  email?: string;
  locationEn?: string;
  locationAr?: string;
  tags: string[];
  links?: { labelEn: string; labelAr: string; href: string }[];
  id: string;
  expandedResearcher: string | null;
  toggleResearcher: (id: string) => void;
  colorAccent: string;
  icon: React.ReactNode;
  expandedContent?: React.ReactNode;
  isAr: boolean;
}

const ResearcherCard = ({
  nameEn, nameAr, roleEn, roleAr, orgEn, orgAr, bioEn, bioAr,
  email, locationEn, locationAr, tags, links, id, expandedResearcher, toggleResearcher,
  colorAccent, icon, expandedContent, isAr
}: ResearcherCardProps) => {
  const s = accentStyles[colorAccent] || accentStyles.healthTeal;
  return (
  <Card className={`shadow-md card-interactive overflow-hidden border ${s.border} ${s.borderHover} flex flex-col h-full`}>
    <div className={`bg-gradient-to-br ${s.gradFrom} ${s.gradTo} p-5 text-center`}>
      <div className={`w-20 h-20 bg-gradient-to-br ${s.circle} ${s.circleGrad} rounded-full mx-auto mb-2 flex items-center justify-center`}>
        {icon}
      </div>
      <h3 className={`text-base font-bold text-foreground mb-0.5 ${isAr ? 'font-arabic' : ''}`}>
        {isAr ? nameAr : nameEn}
      </h3>
      <p className={`text-xs ${s.text} font-semibold`}>{isAr ? roleAr : roleEn}</p>
      <p className="text-[10px] text-muted-foreground">{isAr ? orgAr : orgEn}</p>
    </div>
    
    <CardContent className="p-3 flex-grow flex flex-col">
      <div className={`space-y-2 ${isAr ? 'text-right' : 'text-left'} flex-grow`} dir={isAr ? 'rtl' : 'ltr'}>
        <p className="text-xs text-muted-foreground leading-relaxed">{isAr ? bioAr : bioEn}</p>
        
        {locationEn && (
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <MapPin className={`h-3 w-3 ${s.text}`} />
            <span>{isAr ? locationAr : locationEn}</span>
          </div>
        )}

        {email && (
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Mail className={`h-3 w-3 ${s.text}`} />
            <a href={`mailto:${email}`} className="text-primary hover:underline truncate">{email}</a>
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, idx) => (
              <span key={idx} className={`px-1.5 py-0.5 ${s.tagBg} ${s.text} rounded-full text-[10px]`}>{tag}</span>
            ))}
          </div>
        )}

        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border ${s.border} ${s.text} text-[10px] font-medium hover:bg-muted transition-colors`}
              >
                <ExternalLink className="h-3 w-3" />
                {isAr ? link.labelAr : link.labelEn}
              </a>
            ))}
          </div>
        )}

        {expandedResearcher === id && expandedContent && (
          <div className="pt-2 border-t border-border space-y-2 animate-fade-in">
            {expandedContent}
          </div>
        )}
      </div>
      
      {expandedContent && (
        <button
          onClick={() => toggleResearcher(id)}
          className={`mt-2 flex items-center gap-1 text-xs ${s.text} hover:text-foreground transition-colors font-medium self-start`}
        >
          {expandedResearcher === id ? (
            <>{isAr ? 'إخفاء' : 'Show Less'}<ChevronUp className="h-3 w-3" /></>
          ) : (
            <>{isAr ? 'المزيد' : 'Read More'}<ChevronDown className="h-3 w-3" /></>
          )}
        </button>
      )}
    </CardContent>
  </Card>
  );
};

const Research = () => {
  const { language, t } = useLanguage();
  const [expandedResearcher, setExpandedResearcher] = useState<string | null>(null);
  const [activeStudyDetail, setActiveStudyDetail] = useState<string | null>(null);
  

  // Accessible smooth-scroll + focus + SR announcement on hash navigation.
  useHashScroll();


  const toggleResearcher = (id: string) => {
    setExpandedResearcher(expandedResearcher === id ? null : id);
  };

  const isAr = language === 'ar';

  // Detail dialog content renderers
  const renderStudyDetail = (studyId: string) => {
    switch (studyId) {
      case 'dream-deferred':
        return <DreamDeferredDetail />;
      case 'rise-c':
        return <RiseCDetail />;
      case 'sawa':
        return <SawaDetail />;
      case 'youth-education':
        return <YouthEducationDetail />;
      default:
        return null;
    }
  };

  const DreamDeferredDetail = () => (
    <div className={`space-y-6 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="grid md:grid-cols-2 gap-4">
        <a href="/lovable-uploads/projectshams-flyer-1.5gen-oct8.pdf" target="_blank" rel="noopener noreferrer" className="block">
          <img src="/lovable-uploads/dream-deferred-flyer-en.png" alt="Canadian Dream Deferred Study Flyer" className="w-full max-w-xs mx-auto rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer" loading="lazy" />
          <p className="text-xs text-muted-foreground text-center mt-2">{isAr ? 'الملصق الإنجليزي' : 'English Poster'}</p>
        </a>
        <a href="/lovable-uploads/ar-projectshams-flyer-1.5gen-oct8.pdf" target="_blank" rel="noopener noreferrer" className="block">
          <img src="/lovable-uploads/dream-deferred-flyer-ar.png" alt="ملصق دراسة الحلم الكندي المؤجل" className="w-full max-w-xs mx-auto rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer" loading="lazy" />
          <p className="text-xs text-muted-foreground text-center mt-2">{isAr ? 'الملصق العربي' : 'Arabic Poster'}</p>
        </a>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {isAr
          ? 'دراسة من جامعة تورنتو بقيادة الدكتورة رانيا سالم والدكتورة أمينة فيدان الشويغلو تبحث في كيفية فهم الكنديين من أصول مصرية لمرحلة النضج وكيف يعيشونها في ظل التحديات الاقتصادية والثقافية والعوائق المؤسسية.'
          : 'This University of Toronto study, led by Dr. Rania Salem and Dr. Emine Fidan Elcioglu, explores how Egyptian Canadians in the Greater Toronto Area experience and define adulthood in the face of economic pressures, cultural change, and systemic barriers.'}
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-2 border-primary/30">
          <CardHeader className="bg-primary/5 py-3 px-4">
            <CardTitle className="text-sm">{isAr ? 'المجموعة الأولى: الجيل 1.5' : 'Group 1: 1.5-Generation'}</CardTitle>
          </CardHeader>
          <CardContent className="pt-3 px-4">
            <ul className="space-y-1 text-xs text-muted-foreground">
              {(isAr
                ? ['مولود في مصر', 'انتقل إلى كندا بين سن 5 و 15', '18 سنة أو أكبر حالياً', 'مواطن كندي أو مقيم دائم', 'يعيش في منطقة تورنتو الكبرى']
                : ['Born in Egypt', 'Moved to Canada between ages 5-15', 'Currently 18+', 'Canadian citizen or permanent resident', 'Living in the Greater Toronto Area']
              ).map((item, i) => (
                <li key={i} className="flex items-start gap-1.5"><span className="text-primary">✓</span><span>{item}</span></li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-2 border-secondary/30">
          <CardHeader className="bg-secondary/5 py-3 px-4">
            <CardTitle className="text-sm">{isAr ? 'المجموعة الثانية: الآباء المهاجرون' : 'Group 2: First-Gen Parents'}</CardTitle>
          </CardHeader>
          <CardContent className="pt-3 px-4">
            <ul className="space-y-1 text-xs text-muted-foreground">
              {(isAr
                ? ['ربيت طفلاً واحداً على الأقل', 'الطفل مولود في مصر', 'هاجر إلى كندا بين سن 5 و 15']
                : ['Raised at least one child', 'Child was born in Egypt', 'Immigrated to Canada between ages 5-15']
              ).map((item, i) => (
                <li key={i} className="flex items-start gap-1.5"><span className="text-healthPurple">✓</span><span>{item}</span></li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <a href="https://dreamdeferred-egyptian-canadian.weebly.com/" target="_blank" rel="noopener noreferrer">
            <ExternalLink className={`h-4 w-4 ${isAr ? 'ml-2' : 'mr-2'}`} />
            {isAr ? 'للمزيد من المعلومات أو للمشاركة' : 'Learn More or Participate'}
          </a>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center italic">
        {isAr ? 'شمس تدعم عملية التوظيف لهذه الدراسة بالشراكة مع جامعة تورنتو.' : 'SHAMS is supporting recruitment for this study in partnership with the University of Toronto.'}
      </p>
    </div>
  );

  const RiseCDetail = () => (
    <div className={`space-y-6 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="grid md:grid-cols-2 gap-6">
        <a href="/lovable-uploads/rise-c-flyer.pdf" target="_blank" rel="noopener noreferrer" className="block">
          <img src="/lovable-uploads/rise-c-flyer.png" alt={isAr ? 'ملصق دراسة RISE-C' : 'RISE-C Study Flyer'} className="w-full max-w-xs mx-auto rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer" loading="lazy" />
        </a>
        <div>
          <h4 className="text-base font-bold text-foreground mb-2">{isAr ? 'نظرة عامة' : 'Overview'}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isAr
              ? 'RISE-C هي دراسة مدفوعة للأشخاص الملوّنين في كندا. تدرس التجارب اليومية والسلامة وجودة الحياة من خلال مقابلة آمنة عبر الإنترنت وأسئلة قصيرة يومية لمدة نحو أسبوعين.'
              : 'RISE-C is a paid research study for people of colour in Canada. The study looks at daily experiences, safety, and wellbeing through one secure online interview and brief daily check-ins for about two weeks.'}
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          {isAr ? 'من يمكنه الانضمام' : 'Who Can Join'}
        </h4>
        <ul className="space-y-1 text-xs text-muted-foreground">
          {(isAr
            ? ['العمر 16 سنة أو أكثر', 'من الأشخاص الملوّنين ويقيم في كندا', 'يتحدث الإنجليزية وقادر على إعطاء الموافقة', 'لديه هاتف ذكي ورقم كندي', 'يستطيع حضور مقابلة تأسيسية عبر زووم']
            : ['16 years or older', 'Person of colour living in Canada', 'Fluent in English and able to consent', 'Has a smartphone with a Canadian number', 'Can attend a baseline Zoom visit']
          ).map((item, i) => (
            <li key={i} className="flex items-start gap-1.5"><span className="text-primary">✓</span><span>{item}</span></li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <a href="https://uwo.eu.qualtrics.com/jfe/form/SV_a8BHB591h11CmUe" target="_blank" rel="noopener noreferrer">
            <ExternalLink className={`h-4 w-4 ${isAr ? 'ml-2' : 'mr-2'}`} />
            {isAr ? 'ابدأ استبيان التأهيل' : 'Take Pre-Screening'}
          </a>
        </Button>
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
          <a href="/lovable-uploads/rise-c-flyer.pdf" target="_blank" rel="noopener noreferrer">
            <FileDown className={`h-4 w-4 ${isAr ? 'ml-2' : 'mr-2'}`} />
            {isAr ? 'تنزيل الملصق' : 'Download Flyer'}
          </a>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        {isAr ? 'للاستفسار: rise-c.study@uwo.ca' : 'For questions: rise-c.study@uwo.ca'}
      </p>
      <p className="text-xs text-muted-foreground text-center italic">
        {isAr
          ? 'التوظيف جارٍ حتى الوصول إلى حجم العينة المطلوب أو حتى أكتوبر 2027.'
          : 'Recruitment ongoing until sample size is reached or until October 2027.'}
      </p>
    </div>
  );

  const SawaDetail = () => (
    <div className={`space-y-6 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded-lg text-center">
        <p className="text-xs text-amber-700 italic">
          {isAr ? 'هذه فرصة بحثية مجتمعية خارجية — ليست دراسة يديرها مشروع شمس.' : 'This is an external community research opportunity — not a SHAMS-run study.'}
        </p>
      </div>
      <SawaFlyerCarousel />
      <p className="text-sm text-muted-foreground leading-relaxed">
        {isAr
          ? 'تستكشف هذه الدراسة البحثية المستمرة التجارب الاجتماعية والرفاهية والصحة للمراهقين العرب في منطقة تورنتو الكبرى على مدار الزمن.'
          : 'This ongoing research study explores the social experiences, wellbeing, and health of Arab adolescents in the Greater Toronto Area over time.'}
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            {isAr ? 'من يمكنه المشاركة' : 'Who Can Participate'}
          </h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {(isAr
              ? ['الشباب بين 9 و16 سنة', 'يعرّفون أنفسهم كعرب', 'يعيشون في منطقة تورنتو الكبرى', 'انتقلوا إلى كندا أو والداهم انتقلوا']
              : ['Youth ages 9-16', 'Identify as Arab', 'Live in the Greater Toronto Area', 'Moved to Canada or have parents who moved']
            ).map((item, i) => (
              <li key={i} className="flex items-start gap-1.5"><span className="text-primary">✓</span><span>{item}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground mb-2">{isAr ? 'ماذا تتضمن المشاركة' : 'What Participation Involves'}</h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {(isAr
              ? ['استبيانات', 'متابعات قصيرة عبر الرسائل النصية', 'ارتداء جهاز مراقبة نبضات القلب', 'تعويض يصل إلى 125 دولاراً']
              : ['Surveys', 'Short text/email check-ins', 'Wearing a Polar H10 heart monitor', 'Compensation up to $125']
            ).map((item, i) => (
              <li key={i} className="flex items-start gap-1.5"><span className="text-healthPurple">•</span><span>{item}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-3 bg-muted/50 rounded-lg">
        <h4 className="text-xs font-bold text-foreground mb-1">{isAr ? 'معلومات الاتصال' : 'Contact Information'}</h4>
        <div className="flex flex-col sm:flex-row gap-2 text-xs text-muted-foreground">
          <a href="mailto:sawastudy.anthro@utoronto.ca" className="flex items-center gap-1 text-primary hover:underline">
            <Mail className="h-3 w-3" /> sawastudy.anthro@utoronto.ca
          </a>
          <a href="tel:+12894019910" className="flex items-center gap-1 text-primary hover:underline">
            <Phone className="h-3 w-3" /> +1 289 401 9910
          </a>
        </div>
      </div>
    </div>
  );

  const YouthEducationDetail = () => (
    <div className={`space-y-6 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {isAr
          ? 'تستكشف هذه الدراسة كيف تشكل تجارب المدرسة الثانوية فهم الشباب لحقوق الإنسان في أونتاريو، كندا. تتضمن المشاركة مقابلة واحدة عبر الإنترنت مع تعويض مالي.'
          : 'This study explores how high school experiences shape young people\'s understanding of human rights in Ontario, Canada. Participation involves a one-time online interview and offers compensation for time.'}
      </p>
      <div>
        <h4 className="text-sm font-bold text-foreground mb-2">{isAr ? 'من يمكنه المشاركة' : 'Who Can Participate'}</h4>
        <ul className="space-y-1 text-xs text-muted-foreground">
          {(isAr
            ? ['الشباب الذين تتراوح أعمارهم بين 18-25 سنة', 'أكملوا سنتين على الأقل من المدرسة الثانوية', 'وصلوا إلى كندا خلال السنوات الخمس الماضية', 'من بلد شهد نزاعاً أو أزمة']
            : ['Young people aged 18-25', 'Completed at least two years of high school', 'Arrived in Canada within the last five years', 'From a country that has experienced conflict or crisis']
          ).map((item, i) => (
            <li key={i} className="flex items-start gap-1.5"><span className="text-primary">✓</span><span>{item}</span></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-bold text-foreground mb-2">{isAr ? 'ماذا تتوقع' : 'What to Expect'}</h4>
        <ul className="space-y-1 text-xs text-muted-foreground">
          {(isAr
            ? ['مقابلة فردية عبر Zoom (45-60 دقيقة)', 'بطاقة هدايا بقيمة 20 دولار كندي', 'المشاركة طوعية']
            : ['One individual Zoom interview (45-60 minutes)', '$20 CAD gift card', 'Participation is voluntary']
          ).map((item, i) => (
            <li key={i} className="flex items-start gap-1.5"><span className="text-healthPurple">•</span><span>{item}</span></li>
          ))}
        </ul>
      </div>
      <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
        <strong>{isAr ? 'الموافقة الأخلاقية:' : 'Ethics Approval:'}</strong>{' '}
        {isAr
          ? 'معتمد من مجلس أخلاقيات البحث بجامعة تورنتو — رقم البروتوكول: RIS-47583'
          : 'Approved by the University of Toronto Research Ethics Board — Protocol Number: RIS-47583'}
      </div>
      <div className="flex justify-center">
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <a href="https://bit.ly/488lp3w" target="_blank" rel="noopener noreferrer">
            {isAr ? 'تعرف على المزيد / سجّل الآن' : 'Learn More / Sign Up'}
            <ExternalLink className={`h-4 w-4 ${isAr ? 'mr-2' : 'ml-2'}`} />
          </a>
        </Button>
      </div>
    </div>
  );

  const activeStudy = studies.find(s => s.id === activeStudyDetail);

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray relative">
      <SEOHead
        lang={language === "ar" ? "ar" : "en"}
        path="/research"
        title="Research Studies, Opportunities, and Affiliates | SHAMS"
        description="Browse SHAMS research studies, affiliated researchers, student opportunities, conference presentations, and community-based research focused on MENA health in Canada."
        titleAr="دراسات وفرص بحثية وباحثون منتسبون | شمس"
        descriptionAr="استكشف دراسات شمس البحثية، الباحثين المنتسبين، فرص الطلاب، عروض المؤتمرات، والبحوث المجتمعية التي تركز على صحة الشرق الأوسط وشمال أفريقيا في كندا."
      />
      <CalligraphyBackground />
      <LandmarksGenerator />
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-10 pointer-events-none"></div>
      
      <Header />
      
      <main id="main-content" className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
              {t("resources.researchResourcesTitle")}
            </h1>
            <p className="text-lg text-center max-w-3xl mx-auto mb-8 text-muted-foreground">
              {t("resources.researchDescription")}
            </p>
          </div>
        </section>

        {/* SHAMS Research Portfolio */}
        <section id="portfolio" className="scroll-mt-24">
          <SHAMSResearchPortfolio />
        </section>

        {/* Research Studies - Compact Grid */}
        <section id="studies" className="py-12 bg-white scroll-mt-24">

          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-2 gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {isAr ? 'الدراسات البحثية النشطة' : 'Active Research Studies'}
              </h2>
            </div>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto text-sm">
              {isAr
                ? 'شمس تدعم عملية التوظيف لهذه الدراسات بالشراكة مع مؤسسات بحثية'
                : 'SHAMS supports recruitment for these studies in partnership with research institutions'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {studies.map((study) => (
                <StudyCard
                  key={study.id}
                  study={study}
                  onViewDetail={(id) => setActiveStudyDetail(id)}
                />
              ))}
            </div>

            {/* Study Detail Dialog */}
            <Dialog open={!!activeStudyDetail} onOpenChange={(open) => { if (!open) setActiveStudyDetail(null); }}>
              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogTitle className="text-xl font-bold text-foreground text-center">
                  {activeStudy ? (isAr ? activeStudy.titleAr : activeStudy.titleEn) : ''}
                </DialogTitle>
                {activeStudyDetail && renderStudyDetail(activeStudyDetail)}
              </DialogContent>
            </Dialog>

            {/* Approved community opportunities */}
            <div id="opportunities" className="py-8 mt-8 scroll-mt-24">
              <ResearchOpportunitiesList />
            </div>
          </div>
        </section>

        {/* Researchers Associated with SHAMS Section */}
        <section id="researchers" className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-3 gap-2">
                <FlaskConical className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {isAr ? 'الباحثون المتعاونون مع مشروع شمس' : 'Researchers Associated with SHAMS'}
                </h2>
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                {isAr 
                  ? 'باحثون رئيسيون يتعاونون مع مشروع شمس أو منتسبون إليه'
                  : 'Key researchers collaborating with or affiliated with SHAMS'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
              {RESEARCHERS.map((r) => (
                <ResearcherCard
                  key={r.id}
                  nameEn={r.name_en} nameAr={r.name_ar} roleEn={r.role_en} roleAr={r.role_ar}
                  orgEn={r.org_en} orgAr={r.org_ar} bioEn={r.bio_en} bioAr={r.bio_ar}
                  email={r.email} locationEn={r.location_en} locationAr={r.location_ar}
                  tags={isAr ? r.tags_ar : r.tags_en}
                  links={r.links?.map((l) => ({ labelEn: l.label_en, labelAr: l.label_ar, href: l.href }))}
                  id={r.id} expandedResearcher={expandedResearcher} toggleResearcher={toggleResearcher}
                  colorAccent={r.accent}
                  icon={(() => { const Icon = RESEARCHER_ICONS[r.icon]; return <Icon className="h-10 w-10 text-white" />; })()}
                  expandedContent={r.details?.length ? <ResearcherDetails details={r.details} accent={r.accent} isAr={isAr} /> : undefined}
                  isAr={isAr}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Publications & Knowledge Hub */}
        <section id="publications" className="py-12 bg-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">{t("resources.publicationsHub")}</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-center mb-6">{t("resources.publicationsDescription")}</p>
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-1">{t("resources.knowledgeHubComingSoon")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("resources.knowledgeHubDescription")}</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Research;
