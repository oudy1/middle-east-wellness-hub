
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Calendar, 
  Users, 
  MapPin, 
  MessageCircle, 
  ExternalLink,
  Phone,
  Mail,
  UserCheck,
  UserPlus,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import sickKidsLogo from "@/assets/sickkids-logo.svg";

const Services = () => {
  const { t, language } = useLanguage();
  
  // Determine text direction
  const isRTL = language === 'ar' || language === 'ku' || language === 'fa';

  const communityResources = [
    {
      title: "Mental Health Support Groups",
      description: "Connect with others who understand your cultural background and mental health journey.",
      link: "/mental-health-support",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Cultural Navigation Resources",
      description: "Tools and guides to help navigate healthcare systems while maintaining cultural identity.",
      link: "/cultural-navigation",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      title: "Language Interpretation Services",
      description: "Find qualified medical interpreters who understand Middle Eastern languages and cultures.",
      link: "/interpretation-services",
      icon: <MessageCircle className="h-6 w-6" />
    },
    {
      title: "Health Education Materials",
      description: "Culturally appropriate health education resources in Arabic, Farsi, and other languages.",
      link: "/health-education",
      icon: <BookOpen className="h-6 w-6" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray" dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      <main className="flex-grow">
        {/* Hero Section - Centered */}
        <section className="bg-healthDarkBlue text-white py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight ${language === 'ar' ? 'font-cairo' : ''}`}>
              {language === 'ar' ? 'الخدمات المجتمعية' : 'Community Services'}
            </h1>
            <p className={`text-lg sm:text-xl mb-6 md:mb-8 max-w-3xl mx-auto px-2 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {language === 'ar' ? 
                'دعم تطوير الرعاية الصحية والبحوث للمجتمعات الشرق أوسطية.' : 
                'Supporting healthcare advancement and research for Middle Eastern communities.'
              }
            </p>
          </div>
        </section>


        {/* Physician Network CTA */}
        <section className="py-12 bg-healthTeal/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <UserPlus className="h-12 w-12 text-healthTeal mx-auto mb-4" />
              <h2 className={`text-2xl font-bold text-healthDarkBlue mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {language === 'ar' ? 'مقدم الرعاية الصحية' : 'Healthcare Provider'}
              </h2>
              <p className={`text-gray-600 mb-6 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {language === 'ar' ? 
                  'انضم إلى شبكتنا من مقدمي الرعاية الصحية المتخصصين في خدمة المجتمعات الشرق أوسطية.' : 
                  'Join our network of healthcare providers dedicated to serving Middle Eastern communities.'
                }
              </p>
              <Link to="/physician-application">
                <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 mx-auto text-lg md:text-xl px-8 md:px-12 py-3 md:py-4">
                  <UserPlus className="h-6 w-6" />
                  {language === 'ar' ? 'تقديم طلب للانضمام للشبكة' : 'Apply to Join Network'}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Apply to Join Us Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <Users className="h-12 w-12 text-healthTeal mx-auto mb-4" />
              <h2 className={`text-2xl font-bold text-healthDarkBlue mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {language === 'ar' ? 'انضم إلى فريقنا' : 'Join Our Team'}
              </h2>
              <p className={`text-gray-600 mb-6 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {language === 'ar' ? 
                  'كن جزءاً من مهمتنا لتحسين الوصول إلى الرعاية الصحية للمجتمعات الشرق أوسطية.' : 
                  'Become part of our mission to improve healthcare access for Middle Eastern communities.'
                }
              </p>
              <a 
                href="https://docs.google.com/forms/d/17O_p-Malu1ei9M6ItZZ85zRjEX7Pff3Kq6yuk0B89hE/edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-healthDarkBlue hover:bg-healthDarkBlue/90 text-white flex items-center gap-2 mx-auto text-lg md:text-xl px-8 md:px-12 py-3 md:py-4">
                  <Users className="h-6 w-6" />
                  {language === 'ar' ? 'تقديم طلب للانضمام إلينا' : 'Apply to Join Us'}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Educational Materials */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-center text-healthDarkBlue ${language === 'ar' ? 'font-cairo' : ''}`}>
              {language === 'ar' ? 'المواد التعليمية' : 'Educational Materials'}
            </h2>
            <p className={`text-lg sm:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-center px-2 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {language === 'ar' ? 
                'الوصول إلى موارد التعليم الصحي والأدلة ذات الصلة الثقافية.' : 
                'Access culturally relevant health education resources and guides.'
              }
            </p>
            <div id="educational-materials" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Alone in Canada Guide */}
              <Card className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-healthTeal/10 flex items-center justify-center p-4">
                  <img 
                    src="/public/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png" 
                    alt="Alone in Canada Guide" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-healthDarkBlue text-lg leading-tight ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 
                      'وحيد في كندا: ٢١ طريقة لتجعلها أفضل | Alone in Canada: 21 Ways to Make It Better' : 
                      'Alone in Canada: 21 Ways to Make It Better | وحيد في كندا: ٢١ طريقة لتجعلها أفضل'
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className={`text-gray-600 mb-4 text-sm leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 
                      'نصائح حقيقية من مهاجرين جدد حول التأقلم مع الحياة في كندا. يشمل بناء الصداقات وفهم الثقافة الكندية ونصائح الصحة النفسية.' : 
                      'Real advice from newcomers on adapting to life in Canada. Covers making friends, cultural norms, holidays, and mental wellness tips especially useful for newcomers.'
                    }
                  </p>
                  {language !== 'ar' && (
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">
                      نصائح حقيقية من مهاجرين جدد حول التأقلم مع الحياة في كندا. يشمل بناء الصداقات وفهم الثقافة الكندية ونصائح الصحة النفسية.
                    </p>
                  )}
                  <p className={`text-xs text-gray-500 mb-4 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 
                      'المصدر: CAMH – مركز الإدمان والصحة النفسية' : 
                      'Source: CAMH – Centre for Addiction and Mental Health'
                    }
                  </p>
                  <a 
                    href="https://www.camh.ca/-/media/files/mi-index-other-languages/english-alone-in-canada.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 w-full">
                      <BookOpen className="h-4 w-4" />
                      {language === 'ar' ? 'تنزيل PDF' : 'Download PDF'}
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Arabic-English Medical Terminology Guide */}
              <Card className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-healthTeal/10 flex items-center justify-center p-4">
                  <img 
                    src="/lovable-uploads/46453847-1b06-4288-b707-464176e53351.png" 
                    alt="Arabic-English Medical Terminology Guide" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-healthDarkBlue text-lg leading-tight ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 
                      'دليل المصطلحات الطبية العربية-الإنجليزية | Arabic-English Medical Terminology Guide' : 
                      'Arabic-English Medical Terminology Guide | دليل المصطلحات الطبية'
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className={`text-gray-600 mb-4 text-sm leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 
                      'ترجمات واضحة للمصطلحات الطبية الأساسية من الإنجليزية إلى العربية، مما يساعد في تحسين التواصل بين مقدمي الرعاية الصحية والمرضى الناطقين بالعربية.' : 
                      'Clear translations of essential medical terms from English to Arabic, helping support communication between healthcare providers and Arabic-speaking patients.'
                    }
                  </p>
                  {language !== 'ar' && (
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">
                      ترجمات واضحة للمصطلحات الطبية الأساسية من الإنجليزية إلى العربية، مما يساعد في تحسين التواصل بين مقدمي الرعاية الصحية والمرضى الناطقين بالعربية.
                    </p>
                  )}
                  <p className={`text-xs text-gray-500 mb-4 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 
                      'المصدر: مُقتبس بامتنان من مركز جامعة أوريغون الصحي' : 
                      'Source: Adapted with gratitude from the University of Oregon Health Center'
                    }
                  </p>
                  <a 
                    href="https://health.uoregon.edu/sites/default/files/Translation-Arabic.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 w-full">
                      <BookOpen className="h-4 w-4" />
                      {language === 'ar' ? 'تنزيل PDF' : 'Download PDF'}
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* AboutKidsHealth Arabic Resource */}
              <Card className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-white flex items-center justify-center p-6">
                  <img src={sickKidsLogo} alt="SickKids Hospital Logo" className="h-20 w-auto object-contain" />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-healthDarkBlue text-lg leading-tight ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 
                      'معلومات صحية باللغة العربية – موقع AboutKidsHealth' : 
                      'Health Information in Arabic – AboutKidsHealth'
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className={`text-gray-600 mb-4 text-sm leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 
                      'اكتشف معلومات موثوقة حول الأدوية والحالات الصحية والعلاجات — متوفرة الآن باللغة العربية عبر موقع AboutKidsHealth التابع لمستشفى الأطفال SickKids.' : 
                      'Explore trusted, evidence-based information about medications, health conditions, and treatments — now available in Arabic through AboutKidsHealth (SickKids Hospital).'
                    }
                  </p>
                  {language !== 'ar' && (
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">
                      اكتشف معلومات موثوقة حول الأدوية والحالات الصحية والعلاجات — متوفرة الآن باللغة العربية عبر موقع AboutKidsHealth التابع لمستشفى الأطفال SickKids.
                    </p>
                  )}
                  <p className={`text-xs text-gray-500 mb-4 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 
                      'المصدر: مستشفى الأطفال المرضى (SickKids)' : 
                      'Source: The Hospital for Sick Children (SickKids)'
                    }
                  </p>
                  <a 
                    href="https://www.aboutkidshealth.ca/ar/health-information-in-arabic/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 w-full">
                      <ExternalLink className="h-4 w-4" />
                      {language === 'ar' ? 'زيارة الموقع' : 'Visit Website'}
                    </Button>
                  </a>
                </CardContent>
              </Card>
              
            </div>
          </div>
        </section>

        {/* Health Resources - Breast Cancer Awareness */}
        <section className="py-12 md:py-16 bg-pink-50/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-pink-500 fill-pink-500" />
              <h2 className={`text-2xl sm:text-3xl font-bold text-healthDarkBlue ${language === 'ar' ? 'font-cairo' : ''}`}>
                {language === 'ar' ? '🩺 العناية بسرطان الثدي (بالعربية)' : '🩺 Breast Cancer Awareness (Arabic Resources)'}
              </h2>
            </div>
            <p className={`text-base sm:text-lg mb-8 max-w-3xl mx-auto text-center px-2 leading-relaxed text-gray-700 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {language === 'ar' ? 
                'نقدم لك هنا مجموعة من الكتيبات التوعوية حول الوقاية من السرطان، وفحوصات الكشف المبكر، والعناية بعد التشخيص. جميع المواد متوفرة باللغة العربية ويمكن تحميلها مباشرة.' : 
                'We provide a collection of educational booklets about cancer prevention, early detection screenings, and post-diagnosis care. All materials are available in Arabic and can be downloaded directly.'
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Resource 1: تقليل خطر الإصابة بالسرطان */}
              <Card className="hover:shadow-lg transition-shadow border-pink-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-healthDarkBlue text-lg leading-tight text-right font-cairo" dir="rtl">
                    تقليل خطر الإصابة بالسرطان
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">
                    دليل من الجمعية الأمريكية للسرطان حول كيفية تقليل خطر الإصابة بالسرطان من خلال نمط حياة صحي.
                  </p>
                  <p className="text-xs text-gray-500 mb-4 text-right" dir="rtl">
                    المصدر مذكور في الكتيب
                  </p>
                  <a 
                    href="/lovable-uploads/help-reduce-cancer-risk.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-2 w-full">
                      <BookOpen className="h-4 w-4" />
                      <span className="font-cairo">تحميل الكتيب</span>
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Resource 2: بعد تشخيص سرطان الثدي */}
              <Card className="hover:shadow-lg transition-shadow border-pink-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-healthDarkBlue text-lg leading-tight text-right font-cairo" dir="rtl">
                    بعد تشخيص سرطان الثدي
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">
                    كتيب شامل من الجمعية الأمريكية للسرطان يشرح ما يمكن توقعه بعد التشخيص والعلاجات الممكنة.
                  </p>
                  <p className="text-xs text-gray-500 mb-4 text-right" dir="rtl">
                    المصدر مذكور في الكتيب
                  </p>
                  <a 
                    href="/lovable-uploads/after-a-breast-cancer-diagnosis.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-2 w-full">
                      <BookOpen className="h-4 w-4" />
                      <span className="font-cairo">تحميل الكتيب</span>
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Resource 3: احصل على اختباراتك */}
              <Card className="hover:shadow-lg transition-shadow border-pink-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-healthDarkBlue text-lg leading-tight text-right font-cairo" dir="rtl">
                    احصل على اختباراتك!
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">
                    كتيب حول أهمية فحوصات السرطان الموصى بها حسب العمر، بما في ذلك فحص الثدي.
                  </p>
                  <p className="text-xs text-gray-500 mb-4 text-right" dir="rtl">
                    المصدر مذكور في الكتيب
                  </p>
                  <a 
                    href="/lovable-uploads/get-your-tests.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-2 w-full">
                      <BookOpen className="h-4 w-4" />
                      <span className="font-cairo">تحميل الكتيب</span>
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Resource 4: برنامج نوفا سكوشا للكشف المبكر عن الثدي */}
              <Card className="hover:shadow-lg transition-shadow border-pink-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-healthDarkBlue text-lg leading-tight text-right font-cairo" dir="rtl">
                    برنامج نوفا سكوشا للكشف المبكر عن الثدي
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">
                    تعليمات من برنامج نوفا سكوشا حول فحص الماموغرام ومتى يُنصح به للنساء.
                  </p>
                  <p className="text-xs text-gray-500 mb-4 text-right" dir="rtl">
                    المصدر مذكور في الكتيب
                  </p>
                  <a 
                    href="/lovable-uploads/NSBSP-ProviderTearPad-Arabic.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-2 w-full">
                      <BookOpen className="h-4 w-4" />
                      <span className="font-cairo">تحميل الكتيب</span>
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
            
            <p className="text-sm text-gray-600 text-center mt-8 px-4 leading-relaxed text-right font-cairo" dir="rtl">
              تم جمع هذه الموارد من مواقع رسمية مثل الجمعية الأمريكية للسرطان وبرنامج نوفا سكوشا للكشف المبكر عن الثدي.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
