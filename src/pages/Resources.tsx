import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalligraphyBackground from "@/components/CalligraphyBackground";
import LandmarksGenerator from "@/components/LandmarksGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  FlaskConical, 
  Mail, 
  Calendar,
  MapPin,
  ExternalLink,
  FileText,
  BookOpen,
  Monitor,
  Phone,
  Users,
  Heart,
  Brain,
  Baby,
  Stethoscope,
  FileDown,
  Video,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  DollarSign,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { studies } from "@/lib/studyData";
import StudyCard from "@/components/StudyCard";
import SawaFlyerCarousel from "@/components/SawaFlyerCarousel";

const Resources = () => {
  const { language, t } = useLanguage();
  const [expandedResearcher, setExpandedResearcher] = useState<string | null>(null);
  const [activeStudyDetail, setActiveStudyDetail] = useState<string | null>(null);

  const toggleResearcher = (id: string) => {
    setExpandedResearcher(expandedResearcher === id ? null : id);
  };

  const isAr = language === 'ar';

  const getLocalizedResourceCategories = () => [
    {
      title: isAr ? "موارد الصحة النفسية" : "Mental Health Resources",
      icon: <Brain className="h-8 w-8 text-white" />,
      color: "bg-healthTeal",
      resources: [
        {
          title: isAr ? "الاعتبارات الثقافية في علاج الصحة النفسية" : "Cultural Considerations in Mental Health Treatment",
          description: isAr ? "إرشادات لتقديم رعاية الصحة النفسية المتجاوبة ثقافياً للمرضى العرب والشرق أوسطيين." : "Guidelines for providing culturally responsive mental health care to Arab and Middle Eastern patients.",
          type: isAr ? "بحث علمي" : "Research Paper",
          link: "https://www.researchgate.net/publication/312841477_Mental_Health_of_Arab_Americans_Cultural_Considerations_for_Excellence_of_Care"
        },
        {
          title: isAr ? "أدوات فحص الاكتئاب باللغة العربية" : "Depression Screening Tools in Arabic",
          description: isAr ? "استبيانات فحص الاكتئاب المعتمدة والمترجمة إلى العربية مع التكيف الثقافي." : "Validated depression screening questionnaires translated into Arabic with cultural adaptations.",
          type: isAr ? "أداة تقييم" : "Assessment Tool",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10194937/"
        },
        {
          title: isAr ? "الرعاية المطلعة على الصدمات للاجئين" : "Trauma-Informed Care for Refugees",
          description: isAr ? "أفضل الممارسات لتقديم خدمات الصحة النفسية المطلعة على الصدمات لسكان اللاجئين." : "Best practices for providing trauma-informed mental health services to refugee populations.",
          type: isAr ? "بحث علمي" : "Research Paper",
          link: "/resources/trauma-informed-care"
        }
      ]
    },
    {
      title: isAr ? "صحة المرأة" : "Women's Health",
      icon: <Users className="h-8 w-8 text-white" />,
      color: "bg-healthPurple",
      resources: [
        {
          title: isAr ? "صحة القلب للنساء" : "Heart Health for Women",
          description: isAr ? "معلومات وموارد شاملة حول صحة المرأة بعدة لغات بما في ذلك العربية." : "Comprehensive women's health information and resources in multiple languages including Arabic.",
          type: isAr ? "دليل صحي" : "Health Guide",
          link: "https://medlineplus.gov/languages/womenshealth.html#Arabic"
        },
        {
          title: isAr ? "دليل الغذاء للحمل والسكري" : "Pregnancy and Diabetes Food Guide",
          description: isAr ? "إرشادات غذائية لإدارة السكري أثناء الحمل مع الاعتبارات الغذائية الثقافية." : "Nutritional guidelines for managing diabetes during pregnancy with cultural dietary considerations.",
          type: isAr ? "دليل غذائي" : "Food Guide",
          link: "https://phc.eduhealth.ca/en/viewer?file=%2fmedia%2fVCH%2fFL%2fFL.860.D531.AR.pdf#phrase=false&pagemode=bookmarks"
        }
      ]
    },
  ];

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
          <p className="text-xs text-muted-foreground text-center mt-2">English Poster</p>
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
        <a href="https://dreamdeferred-egyptian-canadian.weebly.com/" target="_blank" rel="noopener noreferrer">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <ExternalLink className={`h-4 w-4 ${isAr ? 'ml-2' : 'mr-2'}`} />
            {isAr ? 'للمزيد من المعلومات أو للمشاركة' : 'Learn More or Participate'}
          </Button>
        </a>
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
        <a href="https://uwo.eu.qualtrics.com/jfe/form/SV_a8BHB591h11CmUe" target="_blank" rel="noopener noreferrer">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <ExternalLink className={`h-4 w-4 ${isAr ? 'ml-2' : 'mr-2'}`} />
            {isAr ? 'ابدأ استبيان التأهيل' : 'Take Pre-Screening'}
          </Button>
        </a>
        <a href="/lovable-uploads/rise-c-flyer.pdf" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <FileDown className={`h-4 w-4 ${isAr ? 'ml-2' : 'mr-2'}`} />
            {isAr ? 'تنزيل الملصق' : 'Download Flyer'}
          </Button>
        </a>
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
        <a href="https://bit.ly/488lp3w" target="_blank" rel="noopener noreferrer">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isAr ? 'تعرف على المزيد / سجّل الآن' : 'Learn More / Sign Up'}
            <ExternalLink className={`h-4 w-4 ${isAr ? 'mr-2' : 'ml-2'}`} />
          </Button>
        </a>
      </div>
    </div>
  );

  const activeStudy = studies.find(s => s.id === activeStudyDetail);

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray relative">
      <CalligraphyBackground />
      <LandmarksGenerator />
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-10 pointer-events-none"></div>
      
      <Header />
      
      <main className="flex-grow relative z-10">
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

        {/* Research Studies - Compact Grid */}
        <section className="py-12 bg-white">
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

            {/* Post opportunity + coming soon */}
            <div className="text-center py-8 mt-8">
              <Search className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-1">{t("resources.opportunitiesComingSoon")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("resources.opportunitiesDescription")}</p>
              <Link to="/post-opportunity">
                <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  {t("resources.postOpportunity")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Researchers Associated with SHAMS Section */}
        <section className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
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
              {/* Dr. Jesus (Jesse) Chavarria */}
              <ResearcherCard
                nameEn="Jesus (Jesse) Chavarria, PhD"
                nameAr="د. خيسوس (جيسي) تشافارّيا"
                roleEn="Assistant Professor, Clinical Psychology"
                roleAr="أستاذ مساعد، علم النفس السريري"
                orgEn="Western University"
                orgAr="جامعة ويسترن"
                bioEn="Studies risk factors and mechanisms contributing to substance use disorders. Uses clinical and quantitative methods to identify targets for intervention."
                bioAr="يدرس العوامل والآليات التي تسهم في اضطرابات تعاطي المواد. يستخدم أساليب سريرية وكمّية لتحديد أهداف للتدخل."
                email="jchavarr@uwo.ca"
                locationEn="London, Ontario, Canada"
                locationAr="لندن، أونتاريو، كندا"
                tags={isAr ? ['تعاطي المواد', 'الإدمان', 'آليات الخطر'] : ['Substance Use', 'Addiction', 'Risk Mechanisms']}
                id="chavarria"
                expandedResearcher={expandedResearcher}
                toggleResearcher={toggleResearcher}
                colorAccent="healthTeal"
                icon={<GraduationCap className="h-10 w-10 text-white" />}
                expandedContent={
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">{isAr ? '🏛️ الانتماءات:' : '🏛️ Affiliations:'}</p>
                    <p className="text-xs text-muted-foreground">{isAr ? 'قسم علم النفس، جامعة ويسترن' : 'Department of Psychology, Western University'}</p>
                    <p className="text-xs text-muted-foreground">{isAr ? 'معهد أبحاث سياسات الصحة النفسية، CAMH' : 'Institute for Mental Health Policy Research, CAMH'}</p>
                  </div>
                }
                isAr={isAr}
              />

              {/* Menna Komeiha */}
              <ResearcherCard
                nameEn="Menna Komeiha"
                nameAr="منة قميحة"
                roleEn="Researcher"
                roleAr="باحثة"
                orgEn="Health Equity Research"
                orgAr="بحث المساواة الصحية"
                bioEn="Health equity researcher specializing in dentistry and applied health sciences. Focuses on digital health and patient-centered care."
                bioAr="باحثة في المساواة الصحية متخصصة في طب الأسنان والعلوم الصحية التطبيقية."
                email="komeiham@mcmaster.ca"
                tags={[]}
                id="menna"
                expandedResearcher={expandedResearcher}
                toggleResearcher={toggleResearcher}
                colorAccent="healthTeal"
                icon={<FlaskConical className="h-10 w-10 text-white" />}
                expandedContent={
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div><p className="text-xs text-muted-foreground">{isAr ? 'الخبرة' : 'Experience'}</p><p className="text-xs font-semibold">{isAr ? '٤ سنوات' : '4 years'}</p></div>
                      <div><p className="text-xs text-muted-foreground">{isAr ? 'اللغات' : 'Languages'}</p><p className="text-xs font-semibold">{isAr ? 'العربية، الإنجليزية' : 'Arabic, English'}</p></div>
                    </div>
                  </div>
                }
                isAr={isAr}
              />

              {/* Mahmoud El-Maklizi */}
              <ResearcherCard
                nameEn="Mahmoud El-Maklizi"
                nameAr="محمود المقلزي"
                roleEn="Postdoctoral Fellow"
                roleAr="باحث ما بعد الدكتوراه"
                orgEn="TGHRI, UHN"
                orgAr="TGHRI, UHN"
                bioEn="Researcher at Toronto General Hospital Research Institute specializing in immunology. Studies regulatory plasma cells."
                bioAr="باحث في معهد أبحاث مستشفى تورونتو العام متخصص في علم المناعة."
                email={undefined}
                locationEn="Toronto, Ontario"
                locationAr="تورونتو، أونتاريو"
                tags={[]}
                id="mahmoud"
                expandedResearcher={expandedResearcher}
                toggleResearcher={toggleResearcher}
                colorAccent="healthPurple"
                icon={<FlaskConical className="h-10 w-10 text-white" />}
                isAr={isAr}
              />

              {/* Dr. Delaney Glass */}
              <ResearcherCard
                nameEn="Dr. Delaney Glass"
                nameAr="د. ديلاني غلاس"
                roleEn="Assistant Professor"
                roleAr="أستاذ مساعد"
                orgEn="University of Toronto"
                orgAr="جامعة تورنتو"
                bioEn="Medical and biocultural anthropologist specializing in adolescent health and Arab diaspora."
                bioAr="عالمة أنثروبولوجيا طبية وبيولوجية متخصصة في صحة المراهقين والشتات العربي."
                email="delaney.glass@utoronto.ca"
                tags={isAr ? ['الأنثروبولوجيا', 'الصحة العامة'] : ['Anthropology', 'Public Health']}
                id="delaney"
                expandedResearcher={expandedResearcher}
                toggleResearcher={toggleResearcher}
                colorAccent="healthDarkBlue"
                icon={<GraduationCap className="h-10 w-10 text-white" />}
                isAr={isAr}
              />

              {/* Dr. Emine Fidan Elcioglu */}
              <ResearcherCard
                nameEn="Dr. Emine Fidan Elcioglu"
                nameAr="د. إمين فيدان إلسيوغلو"
                roleEn="Associate Professor"
                roleAr="أستاذ مشارك"
                orgEn="Sociology, U of T"
                orgAr="علم الاجتماع، جامعة تورنتو"
                bioEn="Sociology professor specializing in immigration politics, race, and ethnicity studies."
                bioAr="أستاذ علم الاجتماع متخصص في سياسات الهجرة ودراسات العرق والإثنية."
                email={undefined}
                tags={[]}
                id="emine"
                expandedResearcher={expandedResearcher}
                toggleResearcher={toggleResearcher}
                colorAccent="healthTeal"
                icon={<GraduationCap className="h-10 w-10 text-white" />}
                isAr={isAr}
              />

              {/* Dr. Rania Salem */}
              <ResearcherCard
                nameEn="Dr. Rania Salem"
                nameAr="د. رانيا سالم"
                roleEn="Associate Professor"
                roleAr="أستاذ مشارك"
                orgEn="Sociology, U of T"
                orgAr="علم الاجتماع، جامعة تورنتو"
                bioEn="Sociology professor specializing in families, gender, and Middle East studies."
                bioAr="أستاذ علم الاجتماع متخصص في الأسرة والنوع الاجتماعي ودراسات الشرق الأوسط."
                email={undefined}
                tags={isAr ? ['الأسرة', 'النوع الاجتماعي', 'الشرق الأوسط'] : ['Families', 'Gender', 'Middle East']}
                id="rania"
                expandedResearcher={expandedResearcher}
                toggleResearcher={toggleResearcher}
                colorAccent="healthPurple"
                icon={<GraduationCap className="h-10 w-10 text-white" />}
                isAr={isAr}
              />

              {/* Jason Chung */}
              <ResearcherCard
                nameEn="Jason Chung, M.Sc."
                nameAr="جيسون تشانغ"
                roleEn="PhD Candidate"
                roleAr="طالب دكتوراه"
                orgEn="Clinical Science & Psychopathology"
                orgAr="علم النفس الإكلينيكي وعِلم الاعتلال النفسي"
                bioEn="Self-injury, substance use, suicide, and eating pathology, especially among racialized and LGBTQ+ populations."
                bioAr="إيذاء النفس، تعاطي المواد، الانتحار، واضطرابات الأكل، مع التركيز على الفئات المُهمَّشة."
                email="jchun264@uwo.ca"
                tags={isAr ? ['الصحة النفسية', 'المساواة'] : ['Mental Health', 'Equity']}
                id="jason"
                expandedResearcher={expandedResearcher}
                toggleResearcher={toggleResearcher}
                colorAccent="healthDarkBlue"
                icon={<Brain className="h-10 w-10 text-white" />}
                isAr={isAr}
              />
            </div>
          </div>
        </section>

        {/* Publications & Knowledge Hub */}
        <section className="py-12 bg-white">
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

        {/* CME & Clinician Training */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">{t("resources.cmeTraining")}</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-center mb-6">{t("resources.cmeDescription")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <GraduationCap className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-3">{t("resources.sinaiHealth")}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t("resources.sinaiDescription")}</p>
                <a href="https://www.sinaihealth.ca/education-and-training/continuing-education" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <ExternalLink className="h-4 w-4 mr-2" />{t("resources.accessTraining")}
                  </Button>
                </a>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <GraduationCap className="h-10 w-10 text-destructive mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-3">{t("resources.calgaryCME")}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t("resources.calgaryDescription")}</p>
                <a href="https://cumming.ucalgary.ca/cme/about/strategy" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                    <ExternalLink className="h-4 w-4 mr-2" />{t("resources.viewPrograms")}
                  </Button>
                </a>
              </Card>
            </div>
          </div>
        </section>

        {/* Clinical Tools and Templates */}
        <section id="clinical-tools" className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
              {isAr ? 'الأدوات والقوالب السريرية' : 'Clinical Tools and Templates'}
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-center mb-6">
              {isAr 
                ? 'موارد عملية لطلاب الطب والمقيمين والأطباء لدعم سير العمل السريري.'
                : 'Practical resources for medical students, residents, and physicians to support clinical workflow.'}
            </p>
            <div className="max-w-2xl mx-auto">
              <Card className="hover:shadow-xl transition-shadow border-2 border-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">{isAr ? 'قوالب' : 'Templates'}</Badge>
                    <Badge variant="secondary" className="text-xs bg-foreground/10 text-foreground">{isAr ? 'المرضى الداخليين' : 'Inpatient'}</Badge>
                  </div>
                  <CardTitle className={`text-foreground text-base flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <FileText className="h-4 w-4 text-primary" />
                    {isAr ? 'قوالب نقطة الرعاية' : 'Point-of-Care Templates'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className={`text-muted-foreground mb-3 text-sm ${isAr ? 'text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
                    {isAr 
                      ? 'قوالب للمشاكل السريرية الشائعة تشمل قوائم القبول، نماذج جمع التاريخ المرضي، التشخيص التفريقي، وعبارات التقييم والخطة.'
                      : 'Templates for common clinical problems including admission checklists, HPI intakes, differentials, and A&P dotphrases.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 mb-2">
                    <a href="https://www.pointofcaremedicine.com/templates" target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 w-full text-sm">
                        <ExternalLink className="h-4 w-4" />{isAr ? 'افتح القوالب' : 'Open templates'}
                      </Button>
                    </a>
                  </div>
                  <p className={`text-xs text-muted-foreground ${isAr ? 'text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
                    {isAr ? 'SHAMS ليست منتسبة لهذا الموقع.' : 'SHAMS is not affiliated with this website.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Research Resources Section */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">{t("resources.researchResourcesTitle")}</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-center mb-3">{t("resources.comprehensiveResources")}</p>
            <p className="text-sm text-primary text-center font-semibold mb-8">{t("resources.moreToCome")}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {getLocalizedResourceCategories().map((category, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                  <div className={`${category.color} p-4 text-center`}>
                    <div className="flex justify-center mb-2">{category.icon}</div>
                    <h3 className="text-lg font-bold text-white">{category.title}</h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {category.resources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="border-l-2 border-l-primary pl-3">
                          <h4 className="font-semibold text-foreground text-sm mb-1">{resource.title}</h4>
                          <p className="text-xs text-muted-foreground mb-1">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{resource.type}</span>
                            <a href={resource.link} target="_blank" rel="noopener noreferrer">
                              <Button variant="link" size="sm" className="text-primary p-0 text-xs">
                                <ExternalLink className="h-3 w-3 mr-1" />{t("resources.access")}
                              </Button>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Removed old study detail dialog - now handled inline above */}
    </div>
  );
};

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
  email, locationEn, locationAr, tags, id, expandedResearcher, toggleResearcher,
  colorAccent, icon, expandedContent, isAr
}: ResearcherCardProps) => {
  const s = accentStyles[colorAccent] || accentStyles.healthTeal;
  return (
  <Card className={`shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border ${s.border} ${s.borderHover} flex flex-col h-full`}>
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

export default Resources;
