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

const SawaFlyerButton = ({ language, label, parentSrc, adolescentSrc, parentAlt, adolescentAlt }: {
  language: string; label: string; parentSrc: string; adolescentSrc: string; parentAlt: string; adolescentAlt: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        className="border-healthTeal text-healthTeal hover:bg-healthTeal/10"
        onClick={() => setOpen(true)}
      >
        <FileText className="h-4 w-4 mr-2" />
        {label}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="text-center text-lg font-bold text-healthDarkBlue">{label}</DialogTitle>
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">{language === 'ar' ? 'نشرة الوالدين' : 'Parent Flyer'}</p>
              <img src={parentSrc} alt={parentAlt} className="w-full rounded-lg shadow" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">{language === 'ar' ? 'نشرة المراهقين' : 'Adolescent Flyer'}</p>
              <img src={adolescentSrc} alt={adolescentAlt} className="w-full rounded-lg shadow" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Resources = () => {
  const { language, t } = useLanguage();
  const [expandedResearcher, setExpandedResearcher] = useState<string | null>(null);

  const toggleResearcher = (id: string) => {
    setExpandedResearcher(expandedResearcher === id ? null : id);
  };

  const getLocalizedResourceCategories = () => [
    {
      title: language === 'ar' ? "موارد الصحة النفسية" : "Mental Health Resources",
      icon: <Brain className="h-8 w-8 text-white" />,
      color: "bg-healthTeal",
      resources: [
        {
          title: language === 'ar' ? "الاعتبارات الثقافية في علاج الصحة النفسية" : "Cultural Considerations in Mental Health Treatment",
          description: language === 'ar' ? "إرشادات لتقديم رعاية الصحة النفسية المتجاوبة ثقافياً للمرضى العرب والشرق أوسطيين." : "Guidelines for providing culturally responsive mental health care to Arab and Middle Eastern patients.",
          type: language === 'ar' ? "بحث علمي" : "Research Paper",
          link: "https://www.researchgate.net/publication/312841477_Mental_Health_of_Arab_Americans_Cultural_Considerations_for_Excellence_of_Care"
        },
        {
          title: language === 'ar' ? "أدوات فحص الاكتئاب باللغة العربية" : "Depression Screening Tools in Arabic",
          description: language === 'ar' ? "استبيانات فحص الاكتئاب المعتمدة والمترجمة إلى العربية مع التكيف الثقافي." : "Validated depression screening questionnaires translated into Arabic with cultural adaptations.",
          type: language === 'ar' ? "أداة تقييم" : "Assessment Tool",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10194937/"
        },
        {
          title: language === 'ar' ? "الرعاية المطلعة على الصدمات للاجئين" : "Trauma-Informed Care for Refugees",
          description: language === 'ar' ? "أفضل الممارسات لتقديم خدمات الصحة النفسية المطلعة على الصدمات لسكان اللاجئين." : "Best practices for providing trauma-informed mental health services to refugee populations.",
          type: language === 'ar' ? "بحث علمي" : "Research Paper",
          link: "/resources/trauma-informed-care"
        }
      ]
    },
    {
      title: language === 'ar' ? "صحة المرأة" : "Women's Health",
      icon: <Users className="h-8 w-8 text-white" />,
      color: "bg-healthPurple",
      resources: [
        {
          title: language === 'ar' ? "صحة القلب للنساء" : "Heart Health for Women",
          description: language === 'ar' ? "معلومات وموارد شاملة حول صحة المرأة بعدة لغات بما في ذلك العربية." : "Comprehensive women's health information and resources in multiple languages including Arabic.",
          type: language === 'ar' ? "دليل صحي" : "Health Guide",
          link: "https://medlineplus.gov/languages/womenshealth.html#Arabic"
        },
        {
          title: language === 'ar' ? "دليل الغذاء للحمل والسكري" : "Pregnancy and Diabetes Food Guide",
          description: language === 'ar' ? "إرشادات غذائية لإدارة السكري أثناء الحمل مع الاعتبارات الغذائية الثقافية." : "Nutritional guidelines for managing diabetes during pregnancy with cultural dietary considerations.",
          type: language === 'ar' ? "دليل غذائي" : "Food Guide",
          link: "https://phc.eduhealth.ca/en/viewer?file=%2fmedia%2fVCH%2fFL%2fFL.860.D531.AR.pdf#phrase=false&pagemode=bookmarks"
        }
      ]
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray relative">
      <CalligraphyBackground />
      <LandmarksGenerator />
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-10 pointer-events-none"></div>
      
      <Header />
      
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-healthDarkBlue mb-8 text-center">
              {t("resources.researchResourcesTitle")}
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto mb-16 text-gray-600">
              {t("resources.researchDescription")}
            </p>
          </div>
        </section>
        {/* Research Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {/* SHAMS Research Opportunity - Canadian Dream Deferred */}
            <div className="mb-12">
              <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-healthTeal to-healthPurple p-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
                    {language === 'ar' ? 'الحلم الكندي المؤجل' : 'The Canadian Dream Deferred'}
                  </h3>
                  <p className="text-white/90 text-center mt-2">
                    {language === 'ar' 
                      ? 'كيف يفهم الكنديون من أصول مصرية مرحلة النضج ويحققونها'
                      : 'How Egyptian Canadians Understand and Achieve Adulthood'}
                  </p>
                </div>
                
                <CardContent className="p-6 md:p-8">
                  {/* Bilingual Posters Side-by-Side */}
                  <div className="mb-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* English Poster */}
                      <div className="text-center">
                        <a 
                          href='/lovable-uploads/projectshams-flyer-1.5gen-oct8.pdf'
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img 
                            src="/lovable-uploads/dream-deferred-flyer-en.png" 
                            alt="Canadian Dream Deferred Study Flyer"
                            className="w-full max-w-md mx-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                            style={{ maxWidth: '70%' }}
                          />
                        </a>
                        <p className="text-sm text-gray-600 mt-3 italic">
                          Updated October 2025 — Study Recruitment Poster (UofT x SHAMS)
                        </p>
                      </div>

                      {/* Arabic Poster */}
                      <div className="text-center" dir="rtl">
                        <a 
                          href='/lovable-uploads/ar-projectshams-flyer-1.5gen-oct8.pdf'
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img 
                            src="/lovable-uploads/dream-deferred-flyer-ar.png" 
                            alt="ملصق دراسة الحلم الكندي المؤجل"
                            className="w-full max-w-md mx-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                            style={{ maxWidth: '70%' }}
                          />
                        </a>
                        <p className="text-sm text-gray-600 mt-3 italic">
                          محدث في أكتوبر ٢٠٢٥ — ملصق التوظيف البحثي (جامعة تورنتو × مشروع شمس)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Study Description */}
                  <div className={`mb-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? (
                      <>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          دراسة من جامعة تورنتو بقيادة الدكتورة رانيا سالم والدكتورة أمينة فيدان الشويغلو تبحث في كيفية فهم الكنديين من أصول مصرية لمرحلة النضج وكيف يعيشونها في ظل التحديات الاقتصادية والثقافية والعوائق المؤسسية.
                        </p>
                        <p className="text-healthTeal font-semibold mb-4">
                          مشروع شمس يشارك في دعم عملية التوظيف والمساعدة في الوصول إلى المشاركين.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          This University of Toronto study, led by Dr. Rania Salem and Dr. Emine Fidan Elcioglu, explores how Egyptian Canadians in the Greater Toronto Area experience and define adulthood in the face of economic pressures, cultural change, and systemic barriers.
                        </p>
                        <p className="text-healthTeal font-semibold mb-4">
                          SHAMS is co-piloting recruitment for this study, helping connect interested participants with the research team.
                        </p>
                      </>
                    )}
                  </div>

                  {/* Participant Groups */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Group 1 */}
                    <Card className="border-2 border-healthTeal">
                      <CardHeader className="bg-healthTeal/10">
                        <CardTitle className={`text-lg ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          {language === 'ar' 
                            ? 'المجموعة الأولى: الجيل 1.5 من الكنديين المصريين'
                            : 'Group 1: 1.5-Generation Egyptian Canadians'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className={`space-y-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          {language === 'ar' ? (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-healthTeal">✅</span>
                                <span>مولود في مصر</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-healthTeal">✅</span>
                                <span>انتقل إلى كندا بين سن 5 و 15</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-healthTeal">✅</span>
                                <span>18 سنة أو أكبر حالياً</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-healthTeal">✅</span>
                                <span>مواطن كندي أو مقيم دائم</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-healthTeal">✅</span>
                                <span>يعيش في منطقة تورنتو الكبرى</span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-healthTeal">✅</span>
                                <span>Born in Egypt</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-healthTeal">✅</span>
                                <span>Moved to Canada between ages 5–15</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-healthTeal">✅</span>
                                <span>Currently 18 years of age or older</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-healthTeal">✅</span>
                                <span>Canadian citizen or permanent resident</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-healthTeal">✅</span>
                                <span>Living in the Greater Toronto Area</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Group 2 */}
                    <Card className="border-2 border-healthPurple">
                      <CardHeader className="bg-healthPurple/10">
                        <CardTitle className={`text-lg ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          {language === 'ar' 
                            ? 'المجموعة الثانية: الآباء المهاجرون من الجيل الأول'
                            : 'Group 2: First-Generation Immigrant Parents'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className={`space-y-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          {language === 'ar' ? (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-healthPurple">✅</span>
                                <span>ربيت طفلاً واحداً على الأقل</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-healthPurple">✅</span>
                                <span>الطفل مولود في مصر</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-healthPurple">✅</span>
                                <span>هاجر إلى كندا بين سن 5 و 15 (جيل 1.5)</span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="text-healthPurple">✅</span>
                                <span>Raised at least one child</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-healthPurple">✅</span>
                                <span>Child was born in Egypt</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-healthPurple">✅</span>
                                <span>Immigrated to Canada between ages 5–15 (1.5 generation)</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center space-y-4">
                    <a 
                      href="https://dreamdeferred-egyptian-canadian.weebly.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white text-lg px-8 py-6">
                        <ExternalLink className="h-5 w-5 mr-2" />
                        {language === 'ar' 
                          ? 'للمزيد من المعلومات أو للمشاركة'
                          : 'Learn More or Participate'}
                      </Button>
                    </a>
                    <p className={`text-sm text-gray-600 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' 
                        ? 'للاستفسار: canadiandreamdeferred@gmail.com'
                        : 'For inquiries: canadiandreamdeferred@gmail.com'}
                    </p>
                  </div>

                  {/* SHAMS Partnership Note */}
                  <div className="mt-6 p-4 bg-healthLightGray rounded-lg">
                    <p className={`text-sm text-gray-700 italic ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {language === 'ar'
                        ? 'شمس تدعم عملية التوظيف لهذه الدراسة بالشراكة مع جامعة تورنتو.'
                        : 'SHAMS is supporting recruitment for this study in partnership with the University of Toronto.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RISE-C Study Detail Section */}
            <div className="mb-12">
              <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-healthTeal to-healthPurple p-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
                      {language === 'ar' ? 'دراسة RISE-C' : 'RISE-C Study'}
                    </h3>
                    <Badge className="bg-yellow-500 text-yellow-900 border-yellow-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {language === 'ar' ? 'مدفوعة' : 'Paid'}
                    </Badge>
                  </div>
                  <p className="text-white/90 text-center">
                    {language === 'ar' 
                      ? 'دراسة مدفوعة للأشخاص الملوّنين في كندا'
                      : 'Paid study for people of colour in Canada'}
                  </p>
                </div>
                
                <CardContent className="p-6 md:p-8">
                  {/* Flyer */}
                  <div className="mb-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <a 
                          href='/lovable-uploads/rise-c-flyer.pdf'
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img 
                            src="/lovable-uploads/rise-c-flyer.png" 
                            alt={language === 'ar' ? 'ملصق دراسة RISE-C' : 'RISE-C Study Flyer'}
                            className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                          />
                        </a>
                        <p className="text-sm text-gray-600 mt-3 italic">
                          {language === 'ar' ? 'ملصق الدراسة' : 'Study Flyer'}
                        </p>
                      </div>

                      {/* Study Info */}
                      <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                        <h4 className={`text-xl font-bold text-healthDarkBlue mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {language === 'ar' ? 'نظرة عامة' : 'Overview'}
                        </h4>
                        <p 
                          className={`text-gray-700 mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}
                          style={{ 
                            maxWidth: '65ch', 
                            lineHeight: '1.6',
                            marginLeft: language === 'ar' ? 'auto' : '0',
                            marginRight: language === 'ar' ? '0' : 'auto'
                          }}
                        >
                          {language === 'ar' ? (
                            <>
                              RISE-C هي دراسة <strong className="font-semibold">مدفوعة</strong> للأشخاص الملوّنين في كندا. تدرس التجارب اليومية والسلامة وجودة الحياة من خلال مقابلة آمنة عبر الإنترنت وأسئلة قصيرة يومية لمدة نحو أسبوعين. تُحفظ معلوماتك بسرية، وتتوفر موارد دعم للمشاركين.
                            </>
                          ) : (
                            <>
                              RISE-C is a <strong className="font-semibold">paid</strong> research study for people of colour in Canada. The study looks at daily experiences, safety, and wellbeing through one secure online interview and brief daily check-ins for about two weeks. Your information is confidential, and support resources are provided.
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Who Can Join */}
                  <div className={`mb-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    <h4 className="text-xl font-bold text-healthDarkBlue mb-4 flex items-center gap-2">
                      {language === 'ar' ? (
                        <>
                          <CheckCircle2 className="h-6 w-6 text-healthTeal" />
                          <span>من يمكنه الانضمام</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-6 w-6 text-healthTeal" />
                          <span>Who Can Join</span>
                        </>
                      )}
                    </h4>
                    <ul className="space-y-3">
                      {language === 'ar' ? (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>العمر 16 سنة أو أكثر</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>من الأشخاص الملوّنين ويقيم في كندا</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>يتحدث الإنجليزية وقادر على إعطاء الموافقة</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>لديه هاتف ذكي ورقم كندي لاستبيانات يومية لمدة أسبوعين</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>يستطيع حضور مقابلة تأسيسية عبر زووم مع كاميرا وميكروفون</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>مرّ مؤخراً بأفكار أو اندفاعات تتعلق بإيذاء النفس أو الانتحار أو نوبات الأكل القهري أو القيء المتعمّد أو الشرب القهري مرتبطة بالشعور بالسوء أو التوتر</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>لديه خبرة مع التمييز العنصري أو مؤشرات العنصرية الداخلية</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>16 years or older</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>Person of colour living in Canada</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>Fluent in English and able to consent</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>Has a smartphone with a Canadian number for two-week daily surveys</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>Can attend a baseline Zoom visit with camera and microphone</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>Recently had thoughts or urges related to self-harm, suicide, binge eating, purging, or binge drinking tied to feeling bad or stressed</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthTeal text-xl">✓</span>
                            <span>Has experienced racial discrimination or internalized racism markers</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* What You Will Do */}
                  <div className={`mb-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    <h4 className="text-xl font-bold text-healthDarkBlue mb-4">
                      {language === 'ar' ? 'ما ستفعله' : 'What You Will Do'}
                    </h4>
                    <ul className="space-y-3">
                      {language === 'ar' ? (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-healthPurple">•</span>
                            <span>مقابلة تأسيسية عبر الإنترنت من ساعة إلى ساعتين</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthPurple">•</span>
                            <span>استبيانات حول الصحة النفسية وجودة الحياة</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthPurple">•</span>
                            <span>أسئلة يومية قصيرة عبر التطبيق لمدة نحو أسبوعين</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start gap-2">
                            <span className="text-healthPurple">•</span>
                            <span>1 to 2 hour online baseline interview</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthPurple">•</span>
                            <span>Surveys about mental health and wellbeing</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-healthPurple">•</span>
                            <span>Short app-based daily questions for about two weeks</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Safety and Support */}
                  <div className={`mb-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    <h4 className="text-xl font-bold text-healthDarkBlue mb-4">
                      {language === 'ar' ? 'السلامة والدعم' : 'Safety and Support'}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {language === 'ar' 
                        ? 'يحصل المشارك على قائمة موارد للأزمات قبل تحديد الموعد. يجري الفريق المدرب فحوصات للمخاطر في بداية ونهاية المقابلة التأسيسية باستخدام بروتوكول UWRAP، ويتم إعداد خطة أمان عند الحاجة. التنبيهات التلقائية تؤدي إلى متابعة إذا ظهرت استجابات عالية الخطورة في الاستبيانات اليومية. توجد إجراءات لحفظ السرية وأمن البيانات.'
                        : 'Participants receive crisis resources before scheduling. Trained staff complete risk checks at the start and end of the baseline interview using the UWRAP protocol and create a safety plan when needed. Automated alerts prompt follow-up if high-risk responses appear in daily surveys. Confidentiality and data security procedures are in place.'}
                    </p>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <a 
                        href="https://uwo.eu.qualtrics.com/jfe/form/SV_a8BHB591h11CmUe" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white text-lg px-8 py-6">
                          <ExternalLink className={`h-5 w-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                          {language === 'ar' ? 'ابدأ استبيان التأهيل' : 'Take Pre-Screening'}
                        </Button>
                      </a>
                      
                      <a 
                        href="/lovable-uploads/rise-c-flyer.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="border-healthPurple text-healthPurple hover:bg-healthPurple/10 text-lg px-8 py-6">
                          <FileDown className={`h-5 w-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                          {language === 'ar' ? 'تنزيل الملصق' : 'Download Flyer'}
                        </Button>
                      </a>
                    </div>
                    
                    <p className={`text-sm text-gray-600 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' 
                        ? 'للاستفسار: rise-c.study@uwo.ca'
                        : 'For questions: rise-c.study@uwo.ca'}
                    </p>
                  </div>

                  {/* Study Info Note */}
                  <div className="mt-6 p-4 bg-healthLightGray rounded-lg">
                    <p className={`text-sm text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {language === 'ar'
                        ? 'التوظيف جارٍ حتى الوصول إلى حجم العينة المطلوب أو حتى أكتوبر 2027. الباحث الرئيسي: د. خيسوس شافاريا، دكتوراه | الباحث المشارك: جيسون تشونغ، ماجستير'
                        : 'Recruitment ongoing until sample size is reached or until October 2027. Principal Investigator: Dr. Jesus Chavarria, PhD | Co-Investigator: Jason Chung, MSc'}
                    </p>
                  </div>

                  {/* Footer Note */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 italic">
                      {language === 'ar' 
                        ? 'المواد مقدمة من جامعة ويسترن أونتاريو لدعم الوصول إلى معلومات بحثية موثوقة.'
                        : 'Resources provided by Western University to support accessible research information.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Community Research Spotlight — SAWA Study */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <Badge className="bg-amber-100 text-amber-800 border-amber-300 mb-3">
                  {language === 'ar' ? 'فرصة بحثية مجتمعية' : 'Community Research Opportunity'}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-healthDarkBlue">
                  {language === 'ar' ? 'أضواء على أبحاث المجتمع' : 'Community Research Spotlight'}
                </h2>
              </div>

              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-4xl mx-auto border border-healthTeal/20">
                <div className="bg-gradient-to-r from-healthTeal/80 to-healthDarkBlue/80 p-5">
                  <h3 className="text-xl md:text-2xl font-bold text-white text-center">
                    {language === 'ar' 
                      ? 'دراسة السلامة الاجتماعية ورفاهية المراهقين (سوا)' 
                      : 'Social Safety and Wellbeing Among Adolescents Study (SAWA)'}
                  </h3>
                  <p className="text-white/80 text-center text-sm mt-1">
                    {language === 'ar' 
                      ? 'جامعة تورنتو — قسم الأنثروبولوجيا' 
                      : 'University of Toronto — Department of Anthropology'}
                  </p>
                </div>

                <CardContent className="p-6 md:p-8">
                  {/* SAWA Poster */}
                  <div className="flex justify-center mb-6">
                    <img
                      src={language === 'ar' ? "/lovable-uploads/sawa-flyer-parent-ar.png" : "/lovable-uploads/sawa-flyer-parent-en.png"}
                      alt={language === 'ar' ? "ملصق دراسة سوا" : "SAWA Study Poster"}
                      className="w-full max-w-md rounded-lg shadow-md object-contain"
                    />
                  </div>

                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
                    <p className="text-xs text-amber-700 italic">
                      {language === 'ar'
                        ? 'هذه فرصة بحثية مجتمعية خارجية — ليست دراسة يديرها مشروع شمس.'
                        : 'This is an external community research opportunity — not a SHAMS-run study.'}
                    </p>
                  </div>

                  <p className={`text-gray-700 leading-relaxed mb-6 ${language === 'ar' ? 'text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar'
                      ? 'تستكشف هذه الدراسة البحثية المستمرة التجارب الاجتماعية والرفاهية والصحة للمراهقين العرب في منطقة تورنتو الكبرى على مدار الزمن. تتابع الدراسة المشاركين لمدة تصل إلى 6 أشهر وتهدف إلى فهم أفضل لكيفية تأثير البيئات الاجتماعية على نتائج صحة الشباب.'
                      : 'This ongoing research study explores the social experiences, wellbeing, and health of Arab adolescents in the Greater Toronto Area over time. The study follows participants for up to 6 months and aims to better understand how social environments shape youth health outcomes.'}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Who can participate */}
                    <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      <h4 className="text-lg font-bold text-healthDarkBlue mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5 text-healthTeal" />
                        {language === 'ar' ? 'من يمكنه المشاركة' : 'Who Can Participate'}
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-healthTeal">✓</span>
                          <span>{language === 'ar' ? 'الشباب بين 9 و16 سنة' : 'Youth ages 9–16'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-healthTeal">✓</span>
                          <span>{language === 'ar' ? 'يعرّفون أنفسهم كعرب' : 'Identify as Arab'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-healthTeal">✓</span>
                          <span>{language === 'ar' ? 'يعيشون في منطقة تورنتو الكبرى' : 'Live in the Greater Toronto Area'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-healthTeal">✓</span>
                          <span>{language === 'ar' ? 'انتقلوا إلى كندا أو والداهم انتقلوا إلى كندا' : 'Moved to Canada or have parents who moved to Canada'}</span>
                        </li>
                      </ul>
                    </div>

                    {/* What participation involves */}
                    <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      <h4 className="text-lg font-bold text-healthDarkBlue mb-3">
                        {language === 'ar' ? 'ماذا تتضمن المشاركة' : 'What Participation Involves'}
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-healthPurple">•</span>
                          <span>{language === 'ar' ? 'استبيانات' : 'Surveys'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-healthPurple">•</span>
                          <span>{language === 'ar' ? 'متابعات قصيرة عبر الرسائل النصية أو البريد الإلكتروني' : 'Short text/email check-ins'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-healthPurple">•</span>
                          <span>{language === 'ar' ? 'ارتداء جهاز مراقبة نبضات القلب Polar H10 لبضعة أيام شهرياً' : 'Wearing a Polar H10 heart monitor for a few days per month'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-healthPurple">•</span>
                          <span className="font-semibold">{language === 'ar' ? 'تعويض يصل إلى 125 دولاراً' : 'Compensation up to $125'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className={`mb-6 p-4 bg-healthLightGray rounded-lg ${language === 'ar' ? 'text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    <h4 className="text-sm font-bold text-healthDarkBlue mb-2">
                      {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                    </h4>
                    <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-700">
                      <a href="mailto:sawastudy.anthro@utoronto.ca" className="flex items-center gap-2 text-healthTeal hover:underline">
                        <Mail className="h-4 w-4" />
                        sawastudy.anthro@utoronto.ca
                      </a>
                      <a href="tel:+12894019910" className="flex items-center gap-2 text-healthTeal hover:underline">
                        <Phone className="h-4 w-4" />
                        +1 289 401 9910
                      </a>
                    </div>
                  </div>

                  {/* Flyer Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <SawaFlyerButton
                      language={language}
                      label={language === 'ar' ? 'عرض النشرة بالإنجليزية' : 'View English Flyer'}
                      parentSrc="/lovable-uploads/sawa-flyer-parent-en.png"
                      adolescentSrc="/lovable-uploads/sawa-flyer-adolescent-en.png"
                      parentAlt="SAWA Parent Flyer (English)"
                      adolescentAlt="SAWA Adolescent Flyer (English)"
                    />
                    <SawaFlyerButton
                      language={language}
                      label={language === 'ar' ? 'عرض النشرة بالعربية' : 'View Arabic Flyer'}
                      parentSrc="/lovable-uploads/sawa-flyer-parent-ar.png"
                      adolescentSrc="/lovable-uploads/sawa-flyer-adolescent-ar.png"
                      parentAlt="SAWA Parent Flyer (Arabic)"
                      adolescentAlt="SAWA Adolescent Flyer (Arabic)"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Researchers Associated with SHAMS Section */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center mb-4 gap-3">
                  <FlaskConical className="h-10 w-10 text-healthTeal" />
                  <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue">
                    {language === 'ar' ? 'الباحثون المتعاونون مع مشروع شمس' : 'Researchers Associated with SHAMS'}
                  </h2>
                  <GraduationCap className="h-10 w-10 text-healthTeal" />
                </div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {language === 'ar' 
                    ? 'باحثون رئيسيون يتعاونون مع مشروع شمس أو منتسبون إليه'
                    : 'Key researchers collaborating with or affiliated with SHAMS'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {/* Dr. Jesus (Jesse) Chavarria */}
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-healthTeal/20 hover:border-healthTeal/40 flex flex-col h-full">
                  <div className="bg-gradient-to-br from-healthTeal/10 to-healthTeal/5 p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-healthTeal to-healthTeal/70 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <GraduationCap className="h-12 w-12 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold text-healthDarkBlue mb-1 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'د. خيسوس (جيسي) تشافارّيا' : 'Jesus (Jesse) Chavarria, PhD'}
                    </h3>
                    <p className="text-sm text-healthTeal font-semibold">
                      {language === 'ar' ? 'أستاذ مساعد، علم النفس السريري' : 'Assistant Professor, Clinical Psychology'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {language === 'ar' ? 'جامعة ويسترن' : 'Western University'}
                    </p>
                  </div>
                  
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className={`space-y-3 ${language === 'ar' ? 'text-right' : 'text-left'} flex-grow`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {language === 'ar'
                          ? 'يدرس الدكتور تشافارّيا العوامل والآليات التي تسهم في اضطرابات تعاطي المواد والآثار الضارة المرتبطة بها. يستخدم أساليب سريرية وكمّية لتحديد أهداف للتدخل.'
                          : 'Dr. Chavarria studies risk factors and mechanisms that contribute to substance use disorders and substance-related harms. His work uses clinical and quantitative methods to identify targets for intervention.'}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="h-3 w-3 text-healthTeal" />
                        <span>{language === 'ar' ? 'لندن، أونتاريو، كندا' : 'London, Ontario, Canada'}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Mail className="h-3 w-3 text-healthTeal" />
                        <a href="mailto:jchavarr@uwo.ca" className="text-healthTeal hover:underline truncate">
                          jchavarr@uwo.ca
                        </a>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {(language === 'ar' 
                          ? ['تعاطي المواد', 'الإدمان', 'آليات الخطر', 'تطوير العلاج', 'الفئات المهمشة']
                          : ['Substance Use', 'Addiction', 'Risk Mechanisms', 'Treatment Development', 'Marginalized Populations']
                        ).map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-healthTeal/10 text-healthTeal rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {expandedResearcher === 'chavarria' && (
                        <div className="pt-3 border-t border-gray-200 space-y-3 animate-fade-in">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">{language === 'ar' ? '🏛️ الانتماءات:' : '🏛️ Affiliations:'}</p>
                            <p className="text-sm text-gray-700">
                              {language === 'ar' 
                                ? 'قسم علم النفس، جامعة ويسترن (جامعة أونتاريو الغربية)'
                                : 'Department of Psychology, Western University (University of Western Ontario)'}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                              {language === 'ar'
                                ? 'معهد أبحاث سياسات الصحة النفسية، مركز الإدمان والصحة النفسية (CAMH)'
                                : 'Institute for Mental Health Policy Research, Centre for Addiction and Mental Health (CAMH)'}
                            </p>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {language === 'ar'
                              ? 'يدرس الدكتور تشافارّيا العوامل والآليات التي تسهم في اضطرابات تعاطي المواد والآثار الضارة المرتبطة بها. يستخدم أساليب سريرية وكمّية لتحديد أهداف للتدخل، مع هدف تطوير ونشر علاجات تُقلّل أو تُزيل السلوكيات الإدمانية، خاصة لدى الفئات المهمشة.'
                              : 'Dr. Chavarria studies risk factors and mechanisms that contribute to substance use disorders and substance-related harms. His work uses clinical and quantitative methods to identify targets for intervention. The aim is to develop and disseminate treatments that reduce or eliminate problematic substance use, particularly among marginalized populations.'}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => toggleResearcher('chavarria')}
                      className="mt-3 flex items-center gap-1 text-sm text-healthTeal hover:text-healthDarkBlue transition-colors font-medium self-start"
                    >
                      {expandedResearcher === 'chavarria' ? (
                        <>
                          {language === 'ar' ? 'إخفاء' : 'Show Less'}
                          <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {language === 'ar' ? 'المزيد' : 'Read More'}
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </CardContent>
                </Card>

                {/* Menna Komeiha */}
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-healthTeal/20 hover:border-healthTeal/40 flex flex-col h-full">
                  <div className="bg-gradient-to-br from-healthTeal/10 to-healthTeal/5 p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-healthTeal to-healthTeal/70 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <GraduationCap className="h-12 w-12 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold text-healthDarkBlue mb-1 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'منة قميحة' : 'Menna Komeiha'}
                    </h3>
                    <p className="text-sm text-healthTeal font-semibold">
                      {language === 'ar' ? 'باحثة' : 'Researcher'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {language === 'ar' ? 'بحث المساواة الصحية' : 'Health Equity Research'}
                    </p>
                  </div>
                  
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className={`space-y-3 ${language === 'ar' ? 'text-right' : 'text-left'} flex-grow`}>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {language === 'ar'
                          ? 'باحثة في المساواة الصحية متخصصة في طب الأسنان والعلوم الصحية التطبيقية. تركز على الصحة الرقمية والرعاية التي تركز على المريض.'
                          : 'Health equity researcher specializing in dentistry and applied health sciences. Focuses on digital health and patient-centered care addressing social determinants.'}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Mail className="h-3 w-3 text-healthTeal" />
                        <a href="mailto:komeiham@mcmaster.ca" className="text-healthTeal hover:underline truncate">
                          komeiham@mcmaster.ca
                        </a>
                      </div>

                      {expandedResearcher === 'menna' && (
                        <div className="pt-3 border-t border-gray-200 space-y-3 animate-fade-in">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs text-gray-600">{language === 'ar' ? 'الخبرة' : 'Experience'}</p>
                              <p className="text-sm font-semibold text-healthDarkBlue">{language === 'ar' ? '٤ سنوات' : '4 years'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">{language === 'ar' ? 'اللغات' : 'Languages'}</p>
                              <p className="text-sm font-semibold text-healthDarkBlue">{language === 'ar' ? 'العربية، الإنجليزية' : 'Arabic, English'}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">{language === 'ar' ? 'المؤهلات:' : 'Credentials:'}</p>
                            <div className="flex flex-wrap gap-1">
                              <span className="px-2 py-0.5 bg-healthTeal/10 text-healthTeal rounded-full text-xs">BDS</span>
                              <span className="px-2 py-0.5 bg-healthTeal/10 text-healthTeal rounded-full text-xs">GDip</span>
                              <span className="px-2 py-0.5 bg-healthTeal/10 text-healthTeal rounded-full text-xs">MSc</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {language === 'ar'
                              ? 'منة قميحة باحثة في المساواة الصحية ولديها خلفية في طب الأسنان والعلوم الصحية التطبيقية والصحة العالمية. يركز بحثها على الصحة الرقمية، والرعاية التي تركز على المريض، وتعزيز المساواة الصحية من خلال معالجة المحددات الاجتماعية للصحة. تطبق الأساليب النوعية والكمية لإنتاج أدلة تفيد السياسات والممارسات.'
                              : 'Menna Komeiha is a health equity researcher with a background in dentistry, applied health science, and global health. Her research focuses on digital health, patient-centered care, and advancing health equity through tackling the social determinants of health. She applies both qualitative and quantitative methods to generate evidence that informs policy and practice.'}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => toggleResearcher('menna')}
                      className="mt-3 flex items-center gap-1 text-sm text-healthTeal hover:text-healthDarkBlue transition-colors font-medium self-start"
                    >
                      {expandedResearcher === 'menna' ? (
                        <>
                          {language === 'ar' ? 'إخفاء' : 'Show Less'}
                          <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {language === 'ar' ? 'المزيد' : 'Read More'}
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </CardContent>
                </Card>

                {/* Mahmoud El-Maklizi */}
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-healthPurple/20 hover:border-healthPurple/40 flex flex-col h-full">
                  <div className="bg-gradient-to-br from-healthPurple/10 to-healthPurple/5 p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-healthPurple to-healthPurple/70 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <FlaskConical className="h-12 w-12 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold text-healthDarkBlue mb-1 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'محمود المقلزي' : 'Mahmoud El-Maklizi'}
                    </h3>
                    <p className="text-sm text-healthPurple font-semibold">
                      {language === 'ar' ? 'باحث ما بعد الدكتوراه' : 'Postdoctoral Fellow'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {language === 'ar' ? 'TGHRI, UHN' : 'TGHRI, UHN'}
                    </p>
                  </div>
                  
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className={`space-y-3 ${language === 'ar' ? 'text-right' : 'text-left'} flex-grow`}>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {language === 'ar'
                          ? 'باحث في معهد أبحاث مستشفى تورونتو العام متخصص في علم المناعة. يدرس تطوير وتنظيم الخلايا البلازمية التنظيمية.'
                          : 'Researcher at Toronto General Hospital Research Institute specializing in immunology. Studies development and regulation of regulatory plasma cells.'}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="h-3 w-3 text-healthPurple" />
                        <span>{language === 'ar' ? 'تورونتو، أونتاريو' : 'Toronto, Ontario'}</span>
                      </div>

                      {expandedResearcher === 'mahmoud' && (
                        <div className="pt-3 border-t border-gray-200 space-y-3 animate-fade-in">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">{language === 'ar' ? '🏛️ الانتماء:' : '🏛️ Affiliation:'}</p>
                            <p className="text-sm text-gray-700">
                              {language === 'ar' ? 'جامعة تورنتو / شبكة الصحة الجامعية' : 'University of Toronto / University Health Network'}
                            </p>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {language === 'ar'
                              ? 'محمود المقلزي هو باحث ما بعد الدكتوراه في مختبر كلينت روبنز في معهد أبحاث مستشفى تورونتو العام. يستكشف عمله تطوير وتنظيم ووظيفة الخلايا البلازمية التنظيمية، حيث يجمع بين البحث الجزيئي التفصيلي والإرشاد لطلاب الدراسات العليا. إنه شغوف بترجمة أبحاث علم المناعة إلى تطبيقات ذات معنى تحسن رعاية المرضى.'
                              : "Mahmoud El-Maklizi is a Postdoctoral Research Fellow in Clint Robbins' Lab at the Toronto General Hospital Research Institute. His work explores the development, regulation, and function of regulatory plasma cells, combining detailed molecular research with mentorship for graduate students. He is passionate about translating immunology research into meaningful applications that improve patient care."}
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed italic">
                            {language === 'ar'
                              ? 'بعيدًا عن العلم، محمود فنان يرسم باستخدام القلم الرصاص والفحم والحبر. يعزو قيمه العائلية القريبة لتشكيل نهجه التعاوني في المختبر وأسلوب إرشاده.'
                              : 'Beyond science, Mahmoud is an artist who paints using pencil, charcoal, and ink. He credits his close family values for shaping his collaborative approach in the lab and his mentorship style.'}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => toggleResearcher('mahmoud')}
                      className="mt-3 flex items-center gap-1 text-sm text-healthPurple hover:text-healthDarkBlue transition-colors font-medium self-start"
                    >
                      {expandedResearcher === 'mahmoud' ? (
                        <>
                          {language === 'ar' ? 'إخفاء' : 'Show Less'}
                          <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {language === 'ar' ? 'المزيد' : 'Read More'}
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </CardContent>
                </Card>

                {/* Dr. Delaney Glass */}
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-healthDarkBlue/20 hover:border-healthDarkBlue/40 flex flex-col h-full">
                  <div className="bg-gradient-to-br from-healthDarkBlue/10 to-healthDarkBlue/5 p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-healthDarkBlue to-healthDarkBlue/70 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <GraduationCap className="h-12 w-12 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold text-healthDarkBlue mb-1 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'د. ديلاني غلاس' : 'Dr. Delaney Glass'}
                    </h3>
                    <p className="text-sm text-healthDarkBlue font-semibold">
                      {language === 'ar' ? 'أستاذ مساعد' : 'Assistant Professor'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {language === 'ar' ? 'جامعة تورنتو' : 'University of Toronto'}
                    </p>
                  </div>
                  
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className={`space-y-3 ${language === 'ar' ? 'text-right' : 'text-left'} flex-grow`}>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {language === 'ar'
                          ? 'عالمة أنثروبولوجيا طبية وبيولوجية متخصصة في صحة المراهقين والشتات العربي. تبحث في تأثير الصدمات المبكرة على النمو.'
                          : 'Medical and biocultural anthropologist specializing in adolescent health and Arab diaspora. Examines early life stress impacts on development.'}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Mail className="h-3 w-3 text-healthDarkBlue" />
                        <a href="mailto:delaney.glass@utoronto.ca" className="text-healthTeal hover:underline truncate">
                          delaney.glass@utoronto.ca
                        </a>
                      </div>

                      {expandedResearcher === 'delaney' && (
                        <div className="pt-3 border-t border-gray-200 space-y-3 animate-fade-in">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">{language === 'ar' ? '🔬 مجالات الدراسة:' : '🔬 Fields:'}</p>
                            <div className="flex flex-wrap gap-1">
                              <span className="px-2 py-0.5 bg-healthDarkBlue/10 text-healthDarkBlue rounded-full text-xs">
                                {language === 'ar' ? 'الأنثروبولوجيا' : 'Anthropology'}
                              </span>
                              <span className="px-2 py-0.5 bg-healthDarkBlue/10 text-healthDarkBlue rounded-full text-xs">
                                {language === 'ar' ? 'الصحة العامة' : 'Public Health'}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {language === 'ar'
                              ? 'الدكتورة ديلاني غلاس هي عالمة أنثروبولوجيا بيولوجية ثقافية تعمل بشكل أساسي مع المجتمعات العربية في أمريكا الشمالية والأردن. يستكشف بحثها الدوافع البيولوجية الثقافية والعواقب الصحية للمحن المبكرة في الحياة وعدم المساواة الاجتماعية على نمو الطفل والمراهق، والتطور البلوغي، والصحة النفسية.'
                              : 'Dr. Delaney Glass is a mixed-methods biocultural anthropologist working primarily with Arab communities in North America and Jordan. Her research explores the biocultural drivers and health consequences of early life adversity and social inequalities on child and adolescent growth, pubertal development, and mental health.'}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => toggleResearcher('delaney')}
                      className="mt-3 flex items-center gap-1 text-sm text-healthDarkBlue hover:text-healthTeal transition-colors font-medium self-start"
                    >
                      {expandedResearcher === 'delaney' ? (
                        <>
                          {language === 'ar' ? 'إخفاء' : 'Show Less'}
                          <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {language === 'ar' ? 'المزيد' : 'Read More'}
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </CardContent>
                </Card>

                {/* Dr. Emine Fidan Elcioglu */}
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-healthTeal/20 hover:border-healthTeal/40 flex flex-col h-full">
                  <div className="bg-gradient-to-br from-healthTeal/10 to-healthTeal/5 p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-healthTeal to-healthTeal/70 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <GraduationCap className="h-12 w-12 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold text-healthDarkBlue mb-1 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'د. إمين فيدان إلسيوغلو' : 'Dr. Emine Fidan Elcioglu'}
                    </h3>
                    <p className="text-sm text-healthTeal font-semibold">
                      {language === 'ar' ? 'أستاذ مشارك' : 'Associate Professor'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {language === 'ar' ? 'علم الاجتماع، جامعة تورنتو' : 'Sociology, U of T'}
                    </p>
                  </div>
                  
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className={`space-y-3 ${language === 'ar' ? 'text-right' : 'text-left'} flex-grow`}>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {language === 'ar'
                          ? 'أستاذ علم الاجتماع متخصص في سياسات الهجرة ودراسات العرق والإثنية. يفحص بحثها عدم المساواة والهيمنة والمقاومة.'
                          : 'Sociology professor specializing in immigration politics, race, and ethnicity studies. Examines inequality, domination, and resistance dynamics.'}
                      </p>

                      {expandedResearcher === 'emine' && (
                        <div className="pt-3 border-t border-gray-200 space-y-3 animate-fade-in">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">{language === 'ar' ? '🎓 التعليم:' : '🎓 Education:'}</p>
                            <div className="space-y-1 text-sm text-gray-700">
                              <div className="flex items-start gap-1">
                                <span className="text-healthTeal text-xs">•</span>
                                <span className="text-xs">{language === 'ar' ? 'دكتوراه، UC Berkeley' : 'Ph.D., UC Berkeley'}</span>
                              </div>
                              <div className="flex items-start gap-1">
                                <span className="text-healthTeal text-xs">•</span>
                                <span className="text-xs">{language === 'ar' ? 'بكالوريوس، جامعة شيكاغو' : 'B.A., U of Chicago'}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {language === 'ar'
                              ? 'الدكتورة إمين فيدان إلسيوغلو هي أستاذ مشارك في علم الاجتماع بجامعة تورنتو. يدرس بحثها سياسات الهجرة كنافذة على ديناميكيات أوسع من عدم المساواة والهيمنة والمقاومة. هي مؤلفة كتاب "مقسمون بالجدار: سياسات الهجرة التقدمية والمحافظة على الحدود الأمريكية المكسيكية" (مطبعة جامعة كاليفورنيا، 2020).'
                              : "Dr. Emine Fidan Elcioglu is an Associate Professor of Sociology at the University of Toronto. Her research examines immigration politics as a window into broader dynamics of inequality, domination, and resistance. She is the author of Divided by the Wall: Progressive and Conservative Immigration Politics at the U.S.–Mexico Border (University of California Press, 2020)."}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => toggleResearcher('emine')}
                      className="mt-3 flex items-center gap-1 text-sm text-healthTeal hover:text-healthDarkBlue transition-colors font-medium self-start"
                    >
                      {expandedResearcher === 'emine' ? (
                        <>
                          {language === 'ar' ? 'إخفاء' : 'Show Less'}
                          <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {language === 'ar' ? 'المزيد' : 'Read More'}
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </CardContent>
                </Card>

                {/* Dr. Rania Salem */}
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-healthPurple/20 hover:border-healthPurple/40 flex flex-col h-full">
                  <div className="bg-gradient-to-br from-healthPurple/10 to-healthPurple/5 p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-healthPurple to-healthPurple/70 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <GraduationCap className="h-12 w-12 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold text-healthDarkBlue mb-1 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'د. رانيا سالم' : 'Dr. Rania Salem'}
                    </h3>
                    <p className="text-sm text-healthPurple font-semibold">
                      {language === 'ar' ? 'أستاذ مشارك' : 'Associate Professor'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {language === 'ar' ? 'علم الاجتماع، جامعة تورنتو' : 'Sociology, U of T'}
                    </p>
                  </div>
                  
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className={`space-y-3 ${language === 'ar' ? 'text-right' : 'text-left'} flex-grow`}>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {language === 'ar'
                          ? 'أستاذ علم الاجتماع متخصص في الأسرة والنوع الاجتماعي ودراسات الشرق الأوسط. تبحث في ديناميكيات الزواج والعمل والوكالة.'
                          : 'Sociology professor specializing in families, gender, and Middle East studies. Researches marriage dynamics, work, and women\'s agency.'}
                      </p>

                      {expandedResearcher === 'rania' && (
                        <div className="pt-3 border-t border-gray-200 space-y-3 animate-fade-in">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">{language === 'ar' ? '🔬 مجالات البحث:' : '🔬 Research Areas:'}</p>
                            <div className="flex flex-wrap gap-1">
                              <span className="px-2 py-0.5 bg-healthPurple/10 text-healthPurple rounded-full text-xs">
                                {language === 'ar' ? 'الأسرة' : 'Families'}
                              </span>
                              <span className="px-2 py-0.5 bg-healthPurple/10 text-healthPurple rounded-full text-xs">
                                {language === 'ar' ? 'النوع الاجتماعي' : 'Gender'}
                              </span>
                              <span className="px-2 py-0.5 bg-healthPurple/10 text-healthPurple rounded-full text-xs">
                                {language === 'ar' ? 'الشرق الأوسط' : 'Middle East'}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {language === 'ar'
                              ? 'تقع اهتمامات البروفيسورة سالم التعليمية والبحثية عند تقاطع علم اجتماع الأسرة، ودراسات النوع الاجتماعي، وعلم الاجتماع الاقتصادي، والتنمية الدولية، وعلم السكان الاجتماعي، ودراسات الشرق الأوسط. درست آثار النفقات الزوجية في مصر على توقيت الزواج، وقوة المرأة داخل الزواج، والزيجات السرية.'
                              : "Professor Salem's teaching and research interests lie at the intersection of the sociology of families, gender studies, economic sociology, international development, social demography, and Middle East studies. She has studied the implications of matrimonial expenditures in Egypt for marriage timing, women's power within marriage, and secret marriages."}
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {language === 'ar'
                              ? 'يستخدم مشروعها الحالي مقابلات نوعية مع الأزواج ذوي الدخل المزدوج في مصر لاستكشاف كيف يُفهم ويُعامل المال المماثل ظاهرياً بشكل مختلف بناءً على جنس المكتسب.'
                              : 'Her current project uses qualitative interviews with dual-earning couples in Egypt to explore how seemingly similar monies are understood and treated differently based on the gender of the earner.'}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => toggleResearcher('rania')}
                      className="mt-3 flex items-center gap-1 text-sm text-healthPurple hover:text-healthDarkBlue transition-colors font-medium self-start"
                    >
                      {expandedResearcher === 'rania' ? (
                        <>
                          {language === 'ar' ? 'إخفاء' : 'Show Less'}
                          <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {language === 'ar' ? 'المزيد' : 'Read More'}
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </CardContent>
                </Card>

                {/* Jason Chung */}
                <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-healthDarkBlue/20 hover:border-healthDarkBlue/40 flex flex-col h-full">
                  <div className="bg-gradient-to-br from-healthDarkBlue/10 to-healthDarkBlue/5 p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-healthDarkBlue to-healthDarkBlue/70 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Brain className="h-12 w-12 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold text-healthDarkBlue mb-1 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'جيسون تشانغ' : 'Jason Chung, M.Sc.'}
                    </h3>
                    <p className="text-sm text-healthDarkBlue font-semibold">
                      {language === 'ar' ? 'طالب دكتوراه' : 'PhD Candidate'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {language === 'ar' ? 'علم النفس الإكلينيكي وعِلم الاعتلال النفسي' : 'Clinical Science & Psychopathology'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {language === 'ar' ? 'جامعة ويسترن' : 'Western University'}
                    </p>
                  </div>
                  
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className={`space-y-3 ${language === 'ar' ? 'text-right' : 'text-left'} flex-grow`}>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {language === 'ar'
                          ? 'إيذاء النفس، تعاطي المواد، الانتحار، واضطرابات الأكل—مع التركيز على الفئات المُهمَّشة و+LGBTQ'
                          : 'Self-injury, substance use, suicide, and eating pathology—especially among racialized and LGBTQ+ populations'}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Mail className="h-3 w-3 text-healthDarkBlue" />
                        <a href="mailto:jchun264@uwo.ca" className="text-healthTeal hover:underline truncate">
                          jchun264@uwo.ca
                        </a>
                      </div>

                      {expandedResearcher === 'jason' && (
                        <div className="pt-3 border-t border-gray-200 space-y-3 animate-fade-in">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">{language === 'ar' ? '🔬 التركيز البحثي:' : '🔬 Research Focus:'}</p>
                            <div className="flex flex-wrap gap-1">
                              <span className="px-2 py-0.5 bg-healthDarkBlue/10 text-healthDarkBlue rounded-full text-xs">
                                {language === 'ar' ? 'الصحة النفسية' : 'Mental Health'}
                              </span>
                              <span className="px-2 py-0.5 bg-healthDarkBlue/10 text-healthDarkBlue rounded-full text-xs">
                                {language === 'ar' ? 'سلوكيات عالية الخطورة' : 'High-Risk Behaviors'}
                              </span>
                              <span className="px-2 py-0.5 bg-healthDarkBlue/10 text-healthDarkBlue rounded-full text-xs">
                                {language === 'ar' ? 'المساواة' : 'Equity'}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {language === 'ar'
                              ? 'تحديد العوامل التي تُبقي السلوكيات عالية الخطورة وتزيدها (إيذاء النفس، تعاطي المواد، الانتحار، واضطرابات الأكل)، مع التركيز على الفئات المُهمَّشة و+LGBTQ'
                              : 'Identifying factors that maintain and increase high-risk behaviors (self-injury, substance use, suicide, and eating pathology), with particular focus on marginalized and LGBTQ+ populations'}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => toggleResearcher('jason')}
                      className="mt-3 flex items-center gap-1 text-sm text-healthDarkBlue hover:text-healthTeal transition-colors font-medium self-start"
                    >
                      {expandedResearcher === 'jason' ? (
                        <>
                          {language === 'ar' ? 'إخفاء' : 'Show Less'}
                          <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {language === 'ar' ? 'المزيد' : 'Read More'}
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center py-8">
              <Search className="h-12 w-12 text-healthTeal mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("resources.opportunitiesComingSoon")}</h3>
              <p className="text-gray-600 mb-6">{t("resources.opportunitiesDescription")}</p>
            </div>

            <div className="text-center mb-12">
              <Link to="/post-opportunity">
                <Button className="bg-healthRed hover:bg-healthRed/90 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  {t("resources.postOpportunity")}
                </Button>
              </Link>
            </div>

            {/* Publications & Knowledge Hub */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-4 text-center">{t("resources.publicationsHub")}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-8">
                {t("resources.publicationsDescription")}
              </p>
              
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-healthTeal mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t("resources.knowledgeHubComingSoon")}</h3>
                <p className="text-gray-600 mb-6">{t("resources.knowledgeHubDescription")}</p>
              </div>
            </div>

            {/* CME & Clinician Training */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-4 text-center">{t("resources.cmeTraining")}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-8">
                {t("resources.cmeDescription")}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
                  <GraduationCap className="h-12 w-12 text-healthTeal mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">{t("resources.sinaiHealth")}</h3>
                  <p className="text-gray-600 mb-6">{t("resources.sinaiDescription")}</p>
                  <a 
                    href="https://www.sinaihealth.ca/education-and-training/continuing-education" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t("resources.accessTraining")}
                    </Button>
                  </a>
                </Card>
                
                <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
                  <GraduationCap className="h-12 w-12 text-healthRed mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">{t("resources.calgaryCME")}</h3>
                  <p className="text-gray-600 mb-6">{t("resources.calgaryDescription")}</p>
                  <a 
                    href="https://cumming.ucalgary.ca/cme/about/strategy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="bg-healthRed hover:bg-healthRed/90 text-white">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t("resources.viewPrograms")}
                    </Button>
                  </a>
                </Card>
              </div>
            </div>

          </div>
        </section>

        {/* Clinical Tools and Templates Section */}
        <section id="clinical-tools" className="py-12 md:py-16 bg-gradient-to-br from-healthDarkBlue/5 to-healthTeal/5">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-healthDarkBlue mb-4 text-center">
              {language === 'ar' ? 'الأدوات والقوالب السريرية' : 'Clinical Tools and Templates'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
              {language === 'ar' 
                ? 'موارد عملية لطلاب الطب والمقيمين والأطباء لدعم سير العمل السريري.'
                : 'Practical resources for medical students, residents, and physicians to support clinical workflow.'}
            </p>
            
            <div className="max-w-2xl mx-auto">
              <Card className="hover:shadow-xl transition-shadow border-2 border-healthTeal/20">
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs bg-healthTeal/10 text-healthTeal">
                      {language === 'ar' ? 'قوالب' : 'Templates'}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-healthDarkBlue/10 text-healthDarkBlue">
                      {language === 'ar' ? 'المرضى الداخليين' : 'Inpatient'}
                    </Badge>
                  </div>
                  <CardTitle className={`text-healthDarkBlue text-lg flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <FileText className="h-5 w-5 text-healthTeal" />
                    {language === 'ar' ? 'قوالب نقطة الرعاية' : 'Point-of-Care Templates'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className={`text-gray-600 mb-4 text-sm leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' 
                      ? 'قوالب للمشاكل السريرية الشائعة تشمل قوائم القبول، نماذج جمع التاريخ المرضي، التشخيص التفريقي، وعبارات التقييم والخطة.'
                      : 'Templates for common clinical problems including admission checklists, HPI intakes, differentials, and A&P dotphrases.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    <a 
                      href="https://www.pointofcaremedicine.com/templates"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 w-full text-sm">
                        <ExternalLink className="h-4 w-4" />
                        {language === 'ar' ? 'افتح القوالب' : 'Open templates'}
                      </Button>
                    </a>
                    <Link to="/services#clinical-tools" className="flex-1">
                      <Button variant="outline" className="border-healthTeal text-healthTeal hover:bg-healthTeal/10 flex items-center gap-2 w-full text-sm">
                        {language === 'ar' ? 'عرض التفاصيل' : 'View details'}
                      </Button>
                    </Link>
                  </div>
                  <p className={`text-xs text-gray-500 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' 
                      ? 'SHAMS ليست منتسبة لهذا الموقع.'
                      : 'SHAMS is not affiliated with this website.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Research Resources Section */}
        <section className="py-16 md:py-24 bg-healthLightGray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-4 text-center">{t("resources.researchResourcesTitle")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-8">
              {t("resources.comprehensiveResources")}
            </p>
            <p className="text-lg text-healthTeal text-center font-semibold mb-12">{t("resources.moreToCome")}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getLocalizedResourceCategories().map((category, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className={`${category.color} p-6 text-center`}>
                    <div className="flex justify-center mb-3">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {category.resources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="border-l-3 border-l-healthTeal pl-4">
                          <h4 className="font-semibold text-healthDarkBlue mb-2">{resource.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{resource.type}</span>
                            <a 
                              href={resource.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-block"
                            >
                              <Button variant="link" size="sm" className="text-healthTeal p-0">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                {t("resources.access")}
                              </Button>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                    {(category.title.includes('Arabic Resources') || category.title.includes('مواد باللغة العربية')) && (
                      <div className={`mt-6 pt-4 border-t border-gray-200 text-xs text-gray-600 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        {language === 'ar' 
                          ? 'المواد مقدمة من HealthLinkBC لدعم الوصول إلى معلومات صحية موثوقة باللغة العربية.'
                          : 'Resources provided by HealthLinkBC to support accessible Arabic health education.'}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;