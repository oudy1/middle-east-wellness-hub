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
  Syringe,
  Shield,
  Wind
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { useState } from "react";

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
    {
      title: language === 'ar' ? "التطعيمات واللقاحات (مواد باللغة العربية)" : "Vaccines & Immunization (Arabic Resources)",
      icon: <Syringe className="h-8 w-8 text-white" />,
      color: "bg-healthRed",
      resources: [
        {
          title: language === 'ar' ? "HealthLink BC – معلومات حول الحصبة واللقاح" : "HealthLink BC – Infographic on Measles & Vaccine",
          description: language === 'ar' ? "ملخص مبسّط حول الحصبة وأهمية لقاح الحصبة لحماية الأطفال والبالغين." : "Simplified overview of measles and the importance of measles vaccine for protecting children and adults.",
          type: language === 'ar' ? "تحميل الملف" : "Download PDF",
          link: "https://www.healthlinkbc.ca/sites/default/files/documents/hfile14b-a.pdf"
        },
        {
          title: language === 'ar' ? "HealthLink BC – معلومات حول لقاح MMRV" : "HealthLink BC – Info on MMRV Vaccine",
          description: language === 'ar' ? "معلومات حول لقاح الحصبة والنكاف والحصبة الألمانية وجدري الماء (MMRV) وفوائده ومتى يجب إعطاؤه." : "Information about measles, mumps, rubella, and varicella (MMRV) vaccine, its benefits, and when to give it.",
          type: language === 'ar' ? "تحميل الملف" : "Download PDF",
          link: "https://www.healthlinkbc.ca/sites/default/files/documents/hfile14e-A.pdf"
        }
      ]
    },
    {
      title: language === 'ar' ? "السلامة والصحة في الهواء الطلق (مواد باللغة العربية)" : "Safety & Outdoor Health (Arabic Resources)",
      icon: <Shield className="h-8 w-8 text-white" />,
      color: "bg-healthDarkBlue",
      resources: [
        {
          title: language === 'ar' ? "HealthLink BC – المخاطر الصحية في البرية" : "HealthLink BC – Health Risks in the Wilderness",
          description: language === 'ar' ? "إرشادات حول المخاطر الصحية أثناء التواجد في البرية وكيفية تجنب الإصابات والأمراض." : "Guidelines on health risks during wilderness activities and how to avoid injuries and illnesses.",
          type: language === 'ar' ? "تحميل الملف" : "Download PDF",
          link: "https://www.healthlinkbc.ca/sites/default/files/documents/hfile24-A.pdf"
        }
      ]
    },
    {
      title: language === 'ar' ? "الإقلاع عن التدخين وصحة الرئة (مواد باللغة العربية)" : "Smoking Cessation & Lung Health (Arabic Resources)",
      icon: <Wind className="h-8 w-8 text-white" />,
      color: "bg-healthGold",
      resources: [
        {
          title: language === 'ar' ? "HealthLink BC – الإقلاع عن التدخين" : "HealthLink BC – Quitting Smoking",
          description: language === 'ar' ? "نصائح عملية وموارد لمساعدة الأفراد على الإقلاع عن التدخين وتحسين صحة الرئة." : "Practical tips and resources to help individuals quit smoking and improve lung health.",
          type: language === 'ar' ? "تحميل الملف" : "Download PDF",
          link: "https://www.healthlinkbc.ca/sites/default/files/documents/healthfiles/hfile30c-a.pdf"
        }
      ]
    }
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

            {/* Dr. Delaney Glass - Analyst (RA) Opportunity */}
            <div className="mb-12">
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-purple-200 hover:border-purple-400">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <GraduationCap className="h-8 w-8 text-white" />
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
                      {language === 'ar' ? 'فرصة بحثية' : 'RESEARCH OPPORTUNITY'}
                    </h3>
                  </div>
                  <p className="text-white/95 text-center text-lg font-semibold">
                    {language === 'ar' 
                      ? 'محلّل/ـة بيانات (RA) – جامعة تورونتو (د. ديلاني غلاس)'
                      : 'Analyst (RA) – U of T (Dr. Delaney Glass)'}
                  </p>
                  <p className="text-white/80 text-center mt-1">
                    {language === 'ar'
                      ? 'تحليل مختلط الأساليب حول الصحة والمساواة (بيانات الأردن)'
                      : 'Mixed-Methods Health & Inequality Analysis (Jordan dataset)'}
                  </p>
                  <div className="text-center mt-3">
                    <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-bold">
                      {language === 'ar' ? 'قدّم قبل ٢٨ نوفمبر ٢٠٢٥' : 'Apply by Nov 28, 2025'}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6 md:p-8">
                  {/* Summary */}
                  <div className={`mb-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? (
                      <p className="text-gray-700 leading-relaxed mb-4">
                        تبحث الدكتورة ديلاني غلاس عن محلل بيانات (طالب بكالوريوس أو دراسات عليا) في جامعة تورونتو لتحليل البيانات الموجودة من الأردن حول العوامل البنيوية/الهيكلية، والسلامة الاجتماعية، ونتائج الصحة والرفاهية. يتطلب الدور إحصاءات متقدمة في R (EFA/CFA، SEM؛ ميزة إضافية للأطر البايزية والتكرارية). مكافأة لمرة واحدة، وخيار المشاركة في التأليف، والتواصل مع باحثين خارجيين.
                      </p>
                    ) : (
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Dr. Delaney Glass seeks an undergraduate or graduate analyst (RA) at the University of Toronto to analyze existing data from Jordan on infrastructural/structural factors, social safety, and health/well-being outcomes. The role requires advanced statistics in R (EFA/CFA, SEM; bonus for Bayesian and Frequentist frameworks). One-time stipend, co-authorship option, and networking with external scholars.
                      </p>
                    )}
                  </div>

                  {/* Eligibility */}
                  <div className="mb-6">
                    <h4 className={`text-xl font-semibold text-purple-600 mb-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' ? 'متطلبات الأهلية:' : 'Eligibility:'}
                    </h4>
                    <ul className={`space-y-3 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' ? (
                        <>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-500 mt-1">✓</span>
                            <span>طالب في جامعة تورونتو (بكالوريوس أو دراسات عليا)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-500 mt-1">✓</span>
                            <span>إحصاء متقدم + R مطلوب</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-500 mt-1">✓</span>
                            <span>مرتاح مع أو راغب في تعلم EFA/CFA وSEM</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-500 mt-1">✓</span>
                            <span>الخبرة في الأساليب البايزية/التكرارية ميزة إضافية</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-500 mt-1">✓</span>
                            <span>U of T student (undergrad or grad)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-500 mt-1">✓</span>
                            <span>Advanced statistics + R required</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-500 mt-1">✓</span>
                            <span>Comfortable with or willing to learn EFA/CFA and SEM</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-purple-500 mt-1">✓</span>
                            <span>Experience in Bayesian/Frequentist approaches is a plus</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center space-y-4 mt-8">
                    <a 
                      href="https://form.jotform.com/253143939587268" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button className="bg-[#F36F21] hover:bg-[#d96119] text-white text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all animate-fade-in">
                        <FileText className="h-5 w-5 mr-2" />
                        {language === 'ar' 
                          ? 'التقديم / الإرسال'
                          : 'Apply / Submit'}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </a>
                    
                    <p className={`text-sm text-gray-600 max-w-2xl mx-auto ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' 
                        ? 'اختياري: أرسل سيرتك الذاتية + ملاحظة قصيرة عن الاهتمام إلى bliss.anthro@utoronto.ca أو delaney.glass@utoronto.ca'
                        : 'Optional: email CV + short interest note to bliss.anthro@utoronto.ca or delaney.glass@utoronto.ca'}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        #QuantAnalysis
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        #RStats
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        #SEM
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        #EFA
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        #CFA
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        #Bayesian
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        #Jordan
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        #HealthInequality
                      </span>
                    </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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