import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalligraphyBackground from "@/components/CalligraphyBackground";
import LandmarksGenerator from "@/components/LandmarksGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Search
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Resources = () => {
  const { language, t } = useLanguage();

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

            {/* Mount Sinai Hospital Research Opportunity */}
            <div className="mb-12">
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-blue-200 hover:border-blue-400">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Stethoscope className="h-8 w-8 text-white" />
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
                      {language === 'ar' ? 'فرصة بحثية' : 'RESEARCH OPPORTUNITY'}
                    </h3>
                  </div>
                  <p className="text-white/95 text-center text-lg font-semibold">
                    {language === 'ar' 
                      ? 'مساعد بحث متطوع – مستشفى ماونت سايناي (طب الأطفال)'
                      : 'Volunteer Research Assistant – Mount Sinai Hospital (Paediatrics)'}
                  </p>
                  <p className="text-white/80 text-center mt-1">
                    {language === 'ar'
                      ? 'الدكتور عادل محمد | قسم طب الأطفال'
                      : 'Dr. Adel Mohamed | Department of Paediatrics'}
                  </p>
                </div>
                
                <CardContent className="p-6 md:p-8">
                  {/* Description */}
                  <div className={`mb-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? (
                      <p className="text-gray-700 leading-relaxed mb-4">
                        نبحث عن مساعد بحث متطوع يتمتع بالحماس والانتباه للتفاصيل للمساعدة في مشاريع بحثية مستمرة مع الدكتور عادل محمد في قسم طب الأطفال بمستشفى ماونت سايناي.
                        توفر هذه الفرصة تجربة عملية في البحث السريري وفرصة ممتازة للطلاب أو الخريجين الجدد المهتمين بالرعاية الصحية أو الطب أو البحث العلمي.
                      </p>
                    ) : (
                      <p className="text-gray-700 leading-relaxed mb-4">
                        We are seeking a motivated and detail-oriented Volunteer Research Assistant to support ongoing research projects for Dr. Adel Mohamed at the Department of Paediatrics, Mount Sinai Hospital.
                        This position offers hands-on experience in patient-based research and is an excellent opportunity for students or recent graduates interested in healthcare, medicine, or clinical research.
                      </p>
                    )}
                  </div>

                  {/* Responsibilities */}
                  <div className="mb-6">
                    <h4 className={`text-xl font-semibold text-blue-600 mb-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' ? 'المسؤوليات:' : 'Responsibilities:'}
                    </h4>
                    <ul className={`space-y-3 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' ? (
                        <>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>المشاركة شخصياً في الأنشطة البحثية اليومية</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>المساعدة في توظيف المرضى، بما في ذلك الاقتراب من المشاركين المؤهلين والتواصل معهم تحت الإشراف</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>دعم جمع البيانات من خلال مراجعة ملفات المرضى وتسجيل المعلومات السريرية والاحتفاظ بسجلات البحث</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>المساعدة في تخزين وتنظيم الفحوصات، والتأكد من تسمية الملفات وأرشفتها بشكل صحيح وفقاً لبروتوكولات الدراسة</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>فحص المرضى المؤهلين بناءً على معايير الإدراج/الاستبعاد</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>التعاون بشكل وثيق مع فريق البحث لضمان إجراء الدراسة بشكل أخلاقي ودقيق</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>Participate in person in daily research activities</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>Assist with patient recruitment, including approaching and engaging eligible participants under supervision</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>Support data collection by reviewing patient charts, recording clinical information, and maintaining research logs</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>Assist with scan storage and organization, ensuring files are properly labeled and archived according to study protocols</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>Screen eligible patients based on inclusion/exclusion criteria</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>Collaborate closely with the research team to ensure ethical and accurate study conduct</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center space-y-4 mt-8">
                    <a 
                      href="https://form.jotform.com/252638048316257" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all animate-fade-in">
                        <FileText className="h-5 w-5 mr-2" />
                        {language === 'ar' 
                          ? 'قدّم الآن / Submit Application'
                          : 'Submit Application'}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </a>
                    
                    <p className={`text-sm text-gray-600 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {language === 'ar' 
                        ? 'يمكنك أيضاً مراسلتنا على إنستغرام للمزيد من التفاصيل'
                        : 'You can also DM us on Instagram for more details'}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        #ClinicalResearch
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        #Healthcare
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        #VolunteerOpportunity
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        #MountSinaiHospital
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Menna Komeiha */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-healthTeal/20 hover:border-healthTeal/40">
                  <div className="bg-gradient-to-br from-healthTeal/10 to-healthTeal/5 p-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-healthTeal to-healthTeal/70 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <GraduationCap className="h-16 w-16 text-white" />
                    </div>
                    <h3 className={`text-2xl font-bold text-healthDarkBlue text-center mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'منة قميحة' : 'Menna Komeiha'}
                    </h3>
                    <p className="text-center text-healthTeal font-semibold mb-1">
                      {language === 'ar' ? 'باحثة' : 'Researcher'}
                    </p>
                    <p className="text-center text-gray-600 text-sm">
                      {language === 'ar' ? 'بحث المساواة الصحية' : 'Health Equity Research'}
                    </p>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className={`space-y-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <div>
                        <h4 className="font-semibold text-healthDarkBlue mb-2">
                          {language === 'ar' ? '📧 البريد الإلكتروني:' : '📧 Email:'}
                        </h4>
                        <a href="mailto:komeiham@mcmaster.ca" className="text-healthTeal hover:underline break-all">
                          komeiham@mcmaster.ca
                        </a>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            {language === 'ar' ? 'الخبرة' : 'Experience'}
                          </p>
                          <p className="font-semibold text-healthDarkBlue">
                            {language === 'ar' ? '٤ سنوات' : '4 years'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            {language === 'ar' ? 'اللغات' : 'Languages'}
                          </p>
                          <p className="font-semibold text-healthDarkBlue">
                            {language === 'ar' ? 'العربية، الإنجليزية' : 'Arabic, English'}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          {language === 'ar' ? 'المؤهلات:' : 'Credentials:'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-healthTeal/10 text-healthTeal rounded-full text-sm font-medium">BDS</span>
                          <span className="px-3 py-1 bg-healthTeal/10 text-healthTeal rounded-full text-sm font-medium">GDip</span>
                          <span className="px-3 py-1 bg-healthTeal/10 text-healthTeal rounded-full text-sm font-medium">MSc</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-healthDarkBlue mb-2">
                          {language === 'ar' ? 'نبذة عنها:' : 'About:'}
                        </h4>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {language === 'ar'
                            ? 'منة قميحة باحثة في المساواة الصحية ولديها خلفية في طب الأسنان والعلوم الصحية التطبيقية والصحة العالمية. يركز بحثها على الصحة الرقمية، والرعاية التي تركز على المريض، وتعزيز المساواة الصحية من خلال معالجة المحددات الاجتماعية للصحة. تطبق الأساليب النوعية والكمية لإنتاج أدلة تفيد السياسات والممارسات.'
                            : 'Menna Komeiha is a health equity researcher with a background in dentistry, applied health science, and global health. Her research focuses on digital health, patient-centered care, and advancing health equity through tackling the social determinants of health. She applies both qualitative and quantitative methods to generate evidence that informs policy and practice.'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mahmoud El-Maklizi */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-healthPurple/20 hover:border-healthPurple/40">
                  <div className="bg-gradient-to-br from-healthPurple/10 to-healthPurple/5 p-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-healthPurple to-healthPurple/70 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <FlaskConical className="h-16 w-16 text-white" />
                    </div>
                    <h3 className={`text-2xl font-bold text-healthDarkBlue text-center mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'محمود المقلزي' : 'Mahmoud El-Maklizi'}
                    </h3>
                    <p className="text-center text-healthPurple font-semibold mb-1">
                      {language === 'ar' ? 'باحث ما بعد الدكتوراه' : 'Postdoctoral Research Fellow'}
                    </p>
                    <p className="text-center text-gray-600 text-sm">
                      {language === 'ar' 
                        ? 'معهد أبحاث مستشفى تورونتو العام (TGHRI), UHN' 
                        : 'Toronto General Hospital Research Institute (TGHRI), UHN'}
                    </p>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className={`space-y-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <div>
                        <h4 className="font-semibold text-healthDarkBlue mb-2">
                          {language === 'ar' ? '🏛️ الانتماء:' : '🏛️ Affiliation:'}
                        </h4>
                        <p className="text-gray-700 text-sm">
                          {language === 'ar'
                            ? 'جامعة تورنتو / شبكة الصحة الجامعية'
                            : 'University of Toronto / University Health Network'}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-healthDarkBlue mb-2">
                          {language === 'ar' ? '📍 الموقع:' : '📍 Location:'}
                        </h4>
                        <p className="text-gray-700 text-sm">
                          {language === 'ar' ? 'تورونتو، أونتاريو، كندا' : 'Toronto, Ontario, Canada'}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-healthDarkBlue mb-2">
                          {language === 'ar' ? 'نبذة عنه:' : 'About:'}
                        </h4>
                        <p className="text-gray-700 leading-relaxed text-sm mb-3">
                          {language === 'ar'
                            ? 'محمود المقلزي هو باحث ما بعد الدكتوراه في مختبر كلينت روبنز في معهد أبحاث مستشفى تورونتو العام. يستكشف عمله تطوير وتنظيم ووظيفة الخلايا البلازمية التنظيمية، حيث يجمع بين البحث الجزيئي التفصيلي والإرشاد لطلاب الدراسات العليا. إنه شغوف بترجمة أبحاث علم المناعة إلى تطبيقات ذات معنى تحسن رعاية المرضى.'
                            : "Mahmoud El-Maklizi is a Postdoctoral Research Fellow in Clint Robbins' Lab at the Toronto General Hospital Research Institute. His work explores the development, regulation, and function of regulatory plasma cells, combining detailed molecular research with mentorship for graduate students. He is passionate about translating immunology research into meaningful applications that improve patient care."}
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm italic">
                          {language === 'ar'
                            ? 'بعيدًا عن العلم، محمود فنان يرسم باستخدام القلم الرصاص والفحم والحبر. يعزو قيمه العائلية القريبة لتشكيل نهجه التعاوني في المختبر وأسلوب إرشاده.'
                            : 'Beyond science, Mahmoud is an artist who paints using pencil, charcoal, and ink. He credits his close family values for shaping his collaborative approach in the lab and his mentorship style.'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dr. Delaney Glass */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-healthDarkBlue/20 hover:border-healthDarkBlue/40">
                  <div className="bg-gradient-to-br from-healthDarkBlue/10 to-healthDarkBlue/5 p-6">
                    <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-healthDarkBlue/20">
                      <img 
                        src="/lovable-uploads/delaney-glass.jpg" 
                        alt="Dr. Delaney Glass"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className={`text-2xl font-bold text-healthDarkBlue text-center mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'د. ديلاني غلاس' : 'Dr. Delaney Glass'}
                    </h3>
                    <p className="text-center text-healthDarkBlue font-semibold mb-1">
                      {language === 'ar' ? 'أستاذ مساعد' : 'Assistant Professor'}
                    </p>
                    <p className="text-center text-gray-600 text-sm">
                      {language === 'ar' 
                        ? 'جامعة تورنتو - حرم سانت جورج' 
                        : 'University of Toronto – St. George Campus'}
                    </p>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className={`space-y-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <div>
                        <h4 className="font-semibold text-healthDarkBlue mb-2">
                          {language === 'ar' ? '📧 البريد الإلكتروني:' : '📧 Email:'}
                        </h4>
                        <a href="mailto:delaney.glass@utoronto.ca" className="text-healthTeal hover:underline break-all">
                          delaney.glass@utoronto.ca
                        </a>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-healthDarkBlue mb-2">
                          {language === 'ar' ? '🔬 مجالات الدراسة:' : '🔬 Fields of Study:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-healthDarkBlue/10 text-healthDarkBlue rounded-full text-xs font-medium">
                            {language === 'ar' ? 'الأنثروبولوجيا التطورية' : 'Evolutionary Anthropology'}
                          </span>
                          <span className="px-3 py-1 bg-healthDarkBlue/10 text-healthDarkBlue rounded-full text-xs font-medium">
                            {language === 'ar' ? 'الأنثروبولوجيا الطبية' : 'Medical Anthropology'}
                          </span>
                          <span className="px-3 py-1 bg-healthDarkBlue/10 text-healthDarkBlue rounded-full text-xs font-medium">
                            {language === 'ar' ? 'الصحة العامة' : 'Public Health'}
                          </span>
                          <span className="px-3 py-1 bg-healthDarkBlue/10 text-healthDarkBlue rounded-full text-xs font-medium">
                            {language === 'ar' ? 'علم الأحياء البشرية' : 'Human Biology'}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-healthDarkBlue mb-2">
                          {language === 'ar' ? '🌍 مجالات الاهتمام:' : '🌍 Areas of Interest:'}
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {language === 'ar'
                            ? 'صحة ورفاهية الأطفال والمراهقين، علم الغدد الصماء العصبية النفسية، الأنثروبولوجيا البيولوجية الثقافية، الشتات العربي، النزوح، الصراع، عدم المساواة الاجتماعية، والمرونة'
                            : 'Child and adolescent health and well-being, psychoneuroendocrinology, biocultural anthropology, Arab diaspora, displacement, conflict, social inequality, and resilience'}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-healthDarkBlue mb-2">
                          {language === 'ar' ? '📍 المناطق البحثية:' : '📍 Research Regions:'}
                        </h4>
                        <p className="text-gray-700 text-sm">
                          {language === 'ar' ? 'الأردن، كندا' : 'Jordan, Canada'}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-healthDarkBlue mb-2">
                          {language === 'ar' ? 'نبذة عنها:' : 'About:'}
                        </h4>
                        <p className="text-gray-700 leading-relaxed text-sm mb-3">
                          {language === 'ar'
                            ? 'الدكتورة ديلاني غلاس هي عالمة أنثروبولوجيا بيولوجية ثقافية وعالمة أحياء بشرية ذات طرق بحث مختلطة تعمل بشكل أساسي مع المجتمعات العربية في أمريكا الشمالية والأردن. يستكشف بحثها الدوافع البيولوجية الثقافية والعواقب الصحية للمحن المبكرة في الحياة وعدم المساواة الاجتماعية على نمو الطفل والمراهق، والتطور البلوغي، والصحة النفسية. تدمج أطر من الأنثروبولوجيا الطبية وعلم الأحياء التطوري والبحوث الصحية النوعية لفهم أفضل لكيفية تشكيل السياق والثقافة للنتائج الصحية.'
                            : 'Dr. Delaney Glass is a mixed-methods biocultural anthropologist and human biologist working primarily with Arab communities in North America and Jordan. Her research explores the biocultural drivers and health consequences of early life adversity and social inequalities on child and adolescent growth, pubertal development, and mental health. She integrates frameworks from medical anthropology, evolutionary biology, and qualitative health research to better understand how context and culture shape health outcomes.'}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-healthDarkBlue mb-2">
                          {language === 'ar' ? '🎓 التعليم:' : '🎓 Education:'}
                        </h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <div className="flex items-start gap-2">
                            <span className="text-healthDarkBlue">•</span>
                            <span>
                              {language === 'ar' 
                                ? 'دكتوراه، الأنثروبولوجيا البيولوجية – جامعة واشنطن'
                                : 'PhD, Biological Anthropology – University of Washington'}
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-healthDarkBlue">•</span>
                            <span>
                              {language === 'ar' 
                                ? 'ماجستير في الصحة العامة، علم الأوبئة (صحة الأم والطفل) – جامعة واشنطن (2023)'
                                : 'MPH, Epidemiology (Maternal & Child Health) – University of Washington (2023)'}
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-healthDarkBlue">•</span>
                            <span>
                              {language === 'ar' 
                                ? 'ماجستير، الأنثروبولوجيا البيولوجية – جامعة واشنطن (2020)'
                                : 'MA, Biological Anthropology – University of Washington (2020)'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* View All Researchers Button */}
              <div className="text-center mt-10">
                <Button 
                  variant="outline" 
                  className="border-2 border-healthTeal text-healthTeal hover:bg-healthTeal hover:text-white transition-all duration-300"
                  disabled
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'عرض جميع الباحثين (قريبًا)' : 'View All Researchers (Coming Soon)'}
                </Button>
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