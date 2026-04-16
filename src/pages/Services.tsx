
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  ExternalLink,
  Phone,
  Mail,
  UserPlus,
  Heart,
  Activity,
  Brain,
  Syringe,
  Shield,
  Wind,
  Stethoscope,
  FileText,
  AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import sickKidsLogo from "@/assets/sickkids-logo.svg";

type FilterCategory = "all" | "mental-health" | "cancer" | "heart-diabetes" | "vaccines-safety" | "education" | "clinical";

const Services = () => {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  
  const isRTL = language === 'ar' || language === 'ku' || language === 'fa';

  const filters: { id: FilterCategory; en: string; ar: string }[] = [
    { id: "all", en: "All", ar: "الكل" },
    { id: "mental-health", en: "Mental Health", ar: "الصحة النفسية" },
    { id: "cancer", en: "Cancer Prevention", ar: "الوقاية من السرطان" },
    { id: "heart-diabetes", en: "Heart & Diabetes", ar: "القلب والسكري" },
    { id: "vaccines-safety", en: "Vaccines & Safety", ar: "التطعيمات والسلامة" },
    { id: "education", en: "Education & Guides", ar: "التعليم والأدلة" },
    { id: "clinical", en: "Clinical Tools", ar: "أدوات سريرية" },
  ];

  const isVisible = (category: FilterCategory) => activeFilter === "all" || activeFilter === category;

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray" dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-healthDarkBlue text-white py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight ${language === 'ar' ? 'font-cairo' : ''}`}>
              {language === 'ar' ? 'الخدمات المجتمعية' : 'Community Services'}
            </h1>
            <p className={`text-lg sm:text-xl mb-6 md:mb-8 max-w-3xl mx-auto px-2 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {language === 'ar' ? 
                'دعم تطوير الرعاية الصحية والبحوث للمجتمعات الشرق أوسطية.' : 
                'Supporting healthcare advancement and research for Middle Eastern societies.'
              }
            </p>
          </div>
        </section>

        {/* Quick Access - Need Help Quickly? */}
        <section className="py-6 md:py-8 bg-red-50 border-b-2 border-red-200">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
                <h2 className={`text-xl font-bold text-red-800 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? 'هل تحتاج مساعدة سريعة؟' : 'Need Help Quickly?'}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href="tel:911" className="block">
                  <Card className="border-red-200 hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Phone className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <div>
                        <p className={`font-semibold text-red-800 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {language === 'ar' ? 'طوارئ: اتصل 911' : 'Emergency: Call 911'}
                        </p>
                        <p className={`text-xs text-red-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {language === 'ar' ? 'خطر فوري على الحياة' : 'Immediate danger to life'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
                <a href="tel:988" className="block">
                  <Card className="border-red-200 hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Phone className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <div>
                        <p className={`font-semibold text-red-800 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {language === 'ar' ? 'خط الأزمات: اتصل 988' : 'Crisis Line: Call 988'}
                        </p>
                        <p className={`text-xs text-red-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {language === 'ar' ? 'دعم الصحة النفسية على مدار الساعة' : 'Mental health support 24/7'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
                <a href="https://www.camh.ca/" target="_blank" rel="noopener noreferrer" className="block">
                  <Card className="border-red-200 hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-4 flex items-center gap-3">
                      <ExternalLink className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <div>
                        <p className={`font-semibold text-red-800 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {language === 'ar' ? 'مركز CAMH للصحة النفسية' : 'CAMH Mental Health Centre'}
                        </p>
                        <p className={`text-xs text-red-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {language === 'ar' ? 'موارد ومعلومات' : 'Resources & information'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
                <Link to="/contact" className="block">
                  <Card className="border-red-200 hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Mail className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <div>
                        <p className={`font-semibold text-red-800 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {language === 'ar' ? 'تواصل مع SHAMS' : 'Contact SHAMS'}
                        </p>
                        <p className={`text-xs text-red-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {language === 'ar' ? 'نحن هنا للمساعدة' : 'We are here to help'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-6 bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-full text-sm ${
                    activeFilter === filter.id 
                      ? "bg-healthTeal hover:bg-healthTeal/90 text-white" 
                      : "border-healthTeal/30 text-healthDarkBlue hover:bg-healthTeal/10"
                  } ${language === 'ar' ? 'font-cairo' : ''}`}
                >
                  {language === 'ar' ? filter.ar : filter.en}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us CTAs */}
        {isVisible("all") && (
          <>
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
                      'Join our network of healthcare providers dedicated to serving Middle Eastern societies.'
                    }
                  </p>
                  <p className={`text-sm text-gray-500 mb-4 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar'
                      ? 'إذا كنت متخصصاً في الرعاية الصحية وترغب في الانضمام إلى منصة شمس أو التعاون معنا، يرجى مراسلتنا بمعلوماتك.'
                      : 'If you are a healthcare professional interested in being listed on the SHAMS platform or collaborating with us, please email us with your information.'}
                  </p>
                  <a href="mailto:infoprojectshams@gmail.com?subject=Physician%20Listing%20Request%20%E2%80%93%20SHAMS">
                    <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 mx-auto text-lg md:text-xl px-8 md:px-12 py-3 md:py-4">
                      <UserPlus className="h-6 w-6" />
                      {language === 'ar' ? 'انضم إلى شبكة أطباء شمس' : 'Join the SHAMS Physician Network'}
                    </Button>
                  </a>
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
                      'Become part of our mission to improve healthcare access for Middle Eastern societies.'
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
          </>
        )}

        {/* Patient Rights */}
        {isVisible("education") && (
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-healthTeal" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-healthDarkBlue">
                    Patient Rights
                  </h2>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-healthDarkBlue font-cairo" dir="rtl">
                  حقوق المرضى
                </p>
              </div>
              <p className={`text-base sm:text-lg mb-8 max-w-3xl mx-auto text-center px-2 leading-relaxed text-gray-700 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {language === 'ar'
                  ? 'دليل مبسّط لحقوق المريض في أونتاريو، مثل الخصوصية، الموافقة، الاحترام، وكيفية تقديم شكوى أو طلب مساعدة.'
                  : 'A plain-language guide to your rights as a patient in Ontario, including dignity, privacy, consent, and how to speak up.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <Badge variant="secondary" className="w-fit mb-2 text-xs">{language === 'ar' ? 'حقوق المرضى' : 'Patient Rights'}</Badge>
                    <CardTitle className={`text-healthDarkBlue text-lg leading-tight ${language === 'ar' ? 'text-right font-cairo' : ''}`}>
                      {language === 'ar' ? 'حقوقك في النظام الصحي في أونتاريو (إنجليزي)' : "Your Rights in Ontario's Health System"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className={`text-gray-600 mb-4 text-sm leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      {language === 'ar'
                        ? 'ميثاق حقوق المريض ومسؤولياته من Ontario Health atHome.'
                        : 'Patient Bill of Rights and Responsibilities from Ontario Health atHome.'}
                    </p>
                    <a href="https://ontariohealthathome.ca/patient-bill-of-rights-responsibilities/" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 w-full">
                        <ExternalLink className="h-4 w-4" />
                        {language === 'ar' ? 'عرض حقوق المريض (إنجليزي)' : 'View Patient Rights (English)'}
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <Badge variant="secondary" className="w-fit mb-2 text-xs">{language === 'ar' ? 'حقوق المرضى' : 'Patient Rights'}</Badge>
                    <CardTitle className={`text-healthDarkBlue text-lg leading-tight ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      {language === 'ar' ? 'حقوقك في النظام الصحي في أونتاريو (عربي)' : 'Patient Rights (عربي)'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className={`text-gray-600 mb-4 text-sm leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      {language === 'ar'
                        ? 'النسخة العربية من ميثاق حقوق المريض ومسؤولياته.'
                        : 'Arabic translation of the Patient Bill of Rights and Responsibilities.'}
                    </p>
                    <a href="https://www.ontariohealthathome.ca/blobohahprod4cd80afe1b/wp-content/uploads/2023/01/OHaH-Patient-Bill-Rights-Arabic.pdf" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 w-full">
                        <FileText className="h-4 w-4" />
                        {language === 'ar' ? 'عرض النسخة العربية (PDF)' : 'View عربي Version (PDF)'}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Educational Materials */}
        {isVisible("education") && (
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
                    <img src="/public/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png" alt="Alone in Canada Guide" className="max-h-full max-w-full object-contain" />
                  </div>
                  <CardHeader className="pb-3">
                    <Badge variant="secondary" className="w-fit mb-2 text-xs">{language === 'ar' ? 'دليل' : 'Guide'}</Badge>
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
                      {language === 'ar' ? 'المصدر: CAMH – مركز الإدمان والصحة النفسية' : 'Source: CAMH – Centre for Addiction and Mental Health'}
                    </p>
                    <a href="https://www.camh.ca/-/media/files/mi-index-other-languages/english-alone-in-canada.pdf" target="_blank" rel="noopener noreferrer">
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
                    <img src="/lovable-uploads/46453847-1b06-4288-b707-464176e53351.png" alt="Arabic-English Medical Terminology Guide" className="max-h-full max-w-full object-contain" />
                  </div>
                  <CardHeader className="pb-3">
                    <Badge variant="secondary" className="w-fit mb-2 text-xs">{language === 'ar' ? 'مرجع طبي' : 'Medical Reference'}</Badge>
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
                      {language === 'ar' ? 'المصدر: مُقتبس بامتنان من مركز جامعة أوريغون الصحي' : 'Source: Adapted with gratitude from the University of Oregon Health Center'}
                    </p>
                    <a href="https://health.uoregon.edu/sites/default/files/Translation-Arabic.pdf" target="_blank" rel="noopener noreferrer">
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
                    <Badge variant="secondary" className="w-fit mb-2 text-xs">{language === 'ar' ? 'صحة الأطفال' : "Children's Health"}</Badge>
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
                      {language === 'ar' ? 'المصدر: مستشفى الأطفال المرضى (SickKids)' : 'Source: The Hospital for Sick Children (SickKids)'}
                    </p>
                    <a href="https://www.aboutkidshealth.ca/ar/health-information-in-arabic/" target="_blank" rel="noopener noreferrer">
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
        )}

        {/* Breast Cancer Awareness */}
        {isVisible("cancer") && (
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
                {[
                  { title: "تقليل خطر الإصابة بالسرطان", desc: "دليل من الجمعية الأمريكية للسرطان حول كيفية تقليل خطر الإصابة بالسرطان من خلال نمط حياة صحي.", link: "/lovable-uploads/help-reduce-cancer-risk.pdf" },
                  { title: "بعد تشخيص سرطان الثدي", desc: "كتيب شامل من الجمعية الأمريكية للسرطان يشرح ما يمكن توقعه بعد التشخيص والعلاجات الممكنة.", link: "/lovable-uploads/after-a-breast-cancer-diagnosis.pdf" },
                  { title: "احصل على اختباراتك!", desc: "كتيب حول أهمية فحوصات السرطان الموصى بها حسب العمر، بما في ذلك فحص الثدي.", link: "/lovable-uploads/get-your-tests.pdf" },
                  { title: "برنامج نوفا سكوشا للكشف المبكر عن الثدي", desc: "تعليمات من برنامج نوفا سكوشا حول فحص الماموغرام ومتى يُنصح به للنساء.", link: "/lovable-uploads/NSBSP-ProviderTearPad-Arabic.pdf" },
                ].map((resource, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow border-pink-100">
                    <CardHeader className="pb-3">
                      <Badge variant="secondary" className="w-fit mb-2 text-xs bg-pink-100 text-pink-700">
                        {language === 'ar' ? 'وقاية من السرطان' : 'Cancer Prevention'}
                      </Badge>
                      <CardTitle className="text-healthDarkBlue text-lg leading-tight text-right font-cairo" dir="rtl">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">{resource.desc}</p>
                      <p className="text-xs text-gray-500 mb-4 text-right" dir="rtl">المصدر مذكور في الكتيب</p>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-2 w-full">
                          <BookOpen className="h-4 w-4" />
                          <span className="font-cairo">تحميل الكتيب</span>
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center mt-8 px-4 leading-relaxed text-right font-cairo" dir="rtl">
                تم جمع هذه الموارد من مواقع رسمية مثل الجمعية الأمريكية للسرطان وبرنامج نوفا سكوشا للكشف المبكر عن الثدي.
              </p>
            </div>
          </section>
        )}

        {/* Cardiovascular Health */}
        {isVisible("heart-diabetes") && (
          <section id="cardio-health" className="py-12 md:py-16 bg-red-50/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                <h2 className={`text-2xl sm:text-3xl font-bold text-healthDarkBlue ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? '🫀 صحة القلب والأوعية الدموية (إنفوغرافيك بالعربية)' : '🫀 Cardiovascular Health (Arabic Infographics)'}
                </h2>
              </div>
              <p className={`text-base sm:text-lg mb-8 max-w-3xl mx-auto text-center px-2 leading-relaxed text-gray-700 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {language === 'ar' ? 
                  'كتيبات توعوية بالعربية حول صحة القلب والأوعية الدموية، الوقاية من أمراض القلب، وإدارة عوامل الخطر مثل السكري وضغط الدم والكوليسترول.' : 
                  'Arabic-language educational booklets about cardiovascular health, heart disease prevention, and managing risk factors like diabetes, blood pressure, and cholesterol.'
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { title: "داء السكري", desc: "كتيب مبسط باللغة العربية يوضح كيفية الوقاية من داء السكري وإدارته لتحسين صحة القلب.", link: "https://www.cardiosmart.org/docs/default-source/assets/infographic/arabic/diabetes-arabic.pdf?sfvrsn=696e0277_2" },
                  { title: "ضغط الدم", desc: "معلومات أساسية عن ضغط الدم الطبيعي والعوامل التي تساعد على خفضه والوقاية من أمراض القلب.", link: "https://www.cardiosmart.org/docs/default-source/assets/infographic/arabic/blood-pressure-arabic.pdf?sfvrsn=102298b6_2" },
                  { title: "الكوليسترول", desc: "إنفوغرافيك يشرح أهمية التحكم في مستويات الكوليسترول للوقاية من أمراض القلب والشرايين.", link: "https://www.cardiosmart.org/docs/default-source/assets/infographic/arabic/cholesterol-arabic.pdf?sfvrsn=249562a4_1" },
                  { title: "السمنة", desc: "كتيب يسلط الضوء على العلاقة بين السمنة وصحة القلب وكيفية تبني نمط حياة صحي.", link: "https://www.cardiosmart.org/docs/default-source/assets/infographic/obesity-arabic.pdf?sfvrsn=d8ed4121_2" },
                  { title: "السكتة الدماغية", desc: "كتيب توعوي يوضح علامات السكتة الدماغية وطرق الوقاية منها وأهمية التدخل السريع.", link: "https://www.cardiosmart.org/docs/default-source/assets/infographic/arabic/stroke-arabic.pdf?sfvrsn=972de942_2" },
                ].map((resource, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow border-red-100">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 justify-end">
                        <Heart className="h-5 w-5 text-red-500" />
                      </div>
                      <CardTitle className="text-healthDarkBlue text-lg leading-tight text-right font-cairo" dir="rtl">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">{resource.desc}</p>
                      <p className="text-xs text-gray-500 mb-4 text-right" dir="rtl">المصدر: CardioSmart – American College of Cardiology</p>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 w-full">
                          <BookOpen className="h-4 w-4" />
                          <span className="font-cairo">تحميل الكتيب</span>
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center mt-8 px-4 leading-relaxed text-right font-cairo" dir="rtl">
                جميع المواد مقدمة من CardioSmart – American College of Cardiology
              </p>
            </div>
          </section>
        )}

        {/* Diabetes Education */}
        {isVisible("heart-diabetes") && (
          <section id="diabetes-education" className="py-12 md:py-16 bg-teal-50/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Activity className="h-8 w-8 text-healthTeal" />
                <h2 className={`text-2xl sm:text-3xl font-bold text-healthDarkBlue ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? '🩸 التثقيف حول مرض السكري (مواد باللغة العربية)' : '🩸 Diabetes Education (Arabic Resources)'}
                </h2>
              </div>
              <p className={`text-base sm:text-lg mb-8 max-w-3xl mx-auto text-center px-2 leading-relaxed text-gray-700 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {language === 'ar' ? 
                  'مواد تعليمية شاملة بالعربية حول مرض السكري، أعراضه، أنواعه، وكيفية إدارته للوقاية من المضاعفات وتحسين نوعية الحياة.' : 
                  'Comprehensive Arabic educational materials about diabetes, its symptoms, types, and management strategies to prevent complications and improve quality of life.'
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { title: "ما هو مرض السكري؟", desc: "كتيب تعليمي يشرح ما هو مرض السكري، أسبابه، وأنواعه، وكيفية التعامل معه يوميًا.", link: "https://learningaboutdiabetes.org/wp-content/uploads/Whatisdiabetes-AR.pdf" },
                  { title: "متلازمة الأيض", desc: "يوضح هذا الكتيب العلاقة بين متلازمة الأيض وخطر الإصابة بالسكري وأمراض القلب.", link: "https://learningaboutdiabetes.org/wp-content/uploads/MetabolicSyndrome20AR.pdf" },
                  { title: "تعرّف على أعراض السكري", desc: "إنفوغرافيك باللغة العربية يساعد على التعرف على أعراض مرض السكري ومتى يجب مراجعة الطبيب.", link: "https://learningaboutdiabetes.org/wp-content/uploads/Know20The20Symptoms20AR.pdf" },
                ].map((resource, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow border-teal-100">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 justify-end">
                        <Activity className="h-5 w-5 text-healthTeal" />
                      </div>
                      <CardTitle className="text-healthDarkBlue text-lg leading-tight text-right font-cairo" dir="rtl">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">{resource.desc}</p>
                      <p className="text-xs text-gray-500 mb-4 text-right" dir="rtl">المصدر: Learning About Diabetes Organization</p>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-healthTeal hover:bg-teal-700 text-white flex items-center gap-2 w-full">
                          <BookOpen className="h-4 w-4" />
                          <span className="font-cairo">تحميل الكتيب</span>
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center mt-8 px-4 leading-relaxed text-right font-cairo" dir="rtl">
                جميع المواد مقدمة من Learning About Diabetes – مواد تعليمية بالعربية
              </p>
            </div>
          </section>
        )}

        {/* Mental Health & Well-Being */}
        {isVisible("mental-health") && (
          <section id="mental-health-arabic" className="py-12 md:py-16 bg-purple-50/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="h-8 w-8 text-[hsl(220,13%,48%)]" />
                <h2 className={`text-2xl sm:text-3xl font-bold text-healthDarkBlue ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? '🧠 الصحة النفسية وجودة الحياة (مواد باللغة العربية)' : '🧠 Mental Health & Well-Being (Arabic Resources)'}
                </h2>
              </div>
              <p className={`text-base sm:text-lg mb-8 max-w-3xl mx-auto text-center px-2 leading-relaxed text-gray-700 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {language === 'ar' ? 
                  'مواد تعليمية باللغة العربية حول الصحة النفسية والرفاهية، تشمل مواضيع مثل الصدمات النفسية، القلق، ونظافة النوم.' : 
                  'Arabic-language educational materials about mental health and well-being, covering topics like trauma, anxiety, and sleep hygiene.'
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { title: "كل شيء عن الصدمة النفسية", desc: "كتيب يشرح تأثير الصدمات النفسية على الصحة العقلية والجسدية، مع نصائح للتعامل والدعم.", link: "https://mindsmatterpsychiatry.com/wp-content/uploads/2024/08/MMP-All-About-Trauma-arabic.pdf" },
                  { title: "نظافة النوم", desc: "دليل مبسط لتحسين جودة النوم وتبني عادات نوم صحية لتحسين الراحة النفسية والجسدية.", link: "https://mindsmatterpsychiatry.com/wp-content/uploads/2024/08/MMP-Sleep-Hygiene-arabic.pdf" },
                  { title: "القلق", desc: "كتيب توعوي يشرح طبيعة القلق، أسبابه، وأهم استراتيجيات السيطرة عليه بطريقة مبسطة.", link: "https://mindsmatterpsychiatry.com/wp-content/uploads/2024/08/MMP-Anxiety-arabic.pdf" },
                ].map((resource, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow border-purple-100">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 justify-end">
                        <Brain className="h-5 w-5 text-[hsl(220,13%,48%)]" />
                      </div>
                      <CardTitle className="text-healthDarkBlue text-lg leading-tight text-right font-cairo" dir="rtl">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">{resource.desc}</p>
                      <p className="text-xs text-gray-500 mb-4 text-right" dir="rtl">المصدر: Minds Matter Psychiatry – Resources</p>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-[hsl(220,13%,48%)] hover:bg-[hsl(220,13%,40%)] text-white flex items-center gap-2 w-full">
                          <BookOpen className="h-4 w-4" />
                          <span className="font-cairo">تحميل الكتيب</span>
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center mt-8 px-4 leading-relaxed font-cairo" dir="rtl">
                <span className="block mb-2 text-right">
                  المصدر: المواد مقدمة من Minds Matter Psychiatry ({" "}
                  <a href="https://mindsmatterpsychiatry.com/resources/" target="_blank" rel="noopener noreferrer" className="text-[hsl(220,13%,48%)] hover:underline">
                    https://mindsmatterpsychiatry.com/resources/
                  </a>
                  {" "}) ومشتركة لدعم التوعية المجتمعية باللغة العربية.
                </span>
                <span className="block text-center text-gray-500">
                  Sources: All materials are provided by Minds Matter Psychiatry and shared with permission for public education.
                </span>
              </p>
            </div>
          </section>
        )}

        {/* Vaccines & Immunization */}
        {isVisible("vaccines-safety") && (
          <section id="vaccines-immunization" className="py-12 md:py-16 bg-blue-50/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Syringe className="h-8 w-8 text-healthDarkBlue" />
                <h2 className={`text-2xl sm:text-3xl font-bold text-healthDarkBlue ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? '💉 التطعيمات واللقاحات (مواد باللغة العربية)' : '💉 Vaccines & Immunization (Arabic Resources)'}
                </h2>
              </div>
              <p className={`text-base sm:text-lg mb-8 max-w-3xl mx-auto text-center px-2 leading-relaxed text-gray-700 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {language === 'ar' ? 
                  'معلومات موثوقة حول اللقاحات وأهميتها في الوقاية من الأمراض المعدية للأطفال والبالغين.' : 
                  'Trusted information about vaccines and their importance in preventing infectious diseases for children and adults.'
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { title: "HealthLink BC – معلومات حول الحصبة واللقاح", desc: "ملخص مبسّط حول الحصبة وأهمية لقاح الحصبة لحماية الأطفال والبالغين.", link: "https://www.healthlinkbc.ca/sites/default/files/documents/hfile14b-a.pdf" },
                  { title: "HealthLink BC – معلومات حول لقاح MMRV", desc: "معلومات حول لقاح الحصبة والنكاف والحصبة الألمانية وجدري الماء (MMRV) وفوائده ومواعيد إعطائه.", link: "https://www.healthlinkbc.ca/sites/default/files/documents/hfile14e-A.pdf" },
                ].map((resource, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow border-blue-100">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 justify-end">
                        <Syringe className="h-5 w-5 text-healthDarkBlue" />
                      </div>
                      <CardTitle className="text-healthDarkBlue text-lg leading-tight text-right font-cairo" dir="rtl">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">{resource.desc}</p>
                      <p className="text-xs text-gray-500 mb-4 text-right" dir="rtl">المصدر: HealthLinkBC</p>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-healthDarkBlue hover:bg-healthDarkBlue/90 text-white flex items-center gap-2 w-full">
                          <BookOpen className="h-4 w-4" />
                          <span className="font-cairo">تحميل الملف</span>
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center mt-8 px-4 leading-relaxed">
                <span className={`block mb-2 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  {language === 'ar' ? 
                    'المواد مقدمة من HealthLinkBC لدعم الوصول إلى معلومات صحية موثوقة باللغة العربية.' : 
                    'Resources provided by HealthLinkBC to support accessible Arabic health education.'
                  }
                </span>
              </p>
            </div>
          </section>
        )}

        {/* Safety & Outdoor Health */}
        {isVisible("vaccines-safety") && (
          <section id="safety-outdoor-health" className="py-12 md:py-16 bg-green-50/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-green-600" />
                <h2 className={`text-2xl sm:text-3xl font-bold text-healthDarkBlue ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? '🛡️ السلامة والصحة في الهواء الطلق (مواد باللغة العربية)' : '🛡️ Safety & Outdoor Health (Arabic Resources)'}
                </h2>
              </div>
              <p className={`text-base sm:text-lg mb-8 max-w-3xl mx-auto text-center px-2 leading-relaxed text-gray-700 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {language === 'ar' ? 
                  'نصائح وإرشادات حول كيفية الحفاظ على سلامتك وصحتك أثناء التواجد في الطبيعة والهواء الطلق.' : 
                  'Tips and guidelines on how to stay safe and healthy during outdoor and wilderness activities.'
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <Card className="hover:shadow-lg transition-shadow border-green-100">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <CardTitle className="text-healthDarkBlue text-lg leading-tight text-right font-cairo" dir="rtl">
                      HealthLink BC – المخاطر الصحية في البرية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">
                      دليل حول المخاطر الصحية في البرية وكيفية الوقاية من الإصابات والأمراض أثناء التواجد في الهواء الطلق.
                    </p>
                    <p className="text-xs text-gray-500 mb-4 text-right" dir="rtl">المصدر: HealthLinkBC</p>
                    <a href="https://www.healthlinkbc.ca/sites/default/files/documents/hfile24-A.pdf" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 w-full">
                        <BookOpen className="h-4 w-4" />
                        <span className="font-cairo">تحميل الملف</span>
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-gray-600 text-center mt-8 px-4 leading-relaxed">
                <span className={`block mb-2 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  {language === 'ar' ? 
                    'المواد مقدمة من HealthLinkBC لدعم الوصول إلى معلومات صحية موثوقة باللغة العربية.' : 
                    'Resources provided by HealthLinkBC to support accessible Arabic health education.'
                  }
                </span>
              </p>
            </div>
          </section>
        )}

        {/* Smoking Cessation & Lung Health */}
        {isVisible("vaccines-safety") && (
          <section id="smoking-cessation" className="py-12 md:py-16 bg-slate-50/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Wind className="h-8 w-8 text-slate-600" />
                <h2 className={`text-2xl sm:text-3xl font-bold text-healthDarkBlue ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? '🌬️ الإقلاع عن التدخين وصحة الرئة (مواد باللغة العربية)' : '🌬️ Smoking Cessation & Lung Health (Arabic Resources)'}
                </h2>
              </div>
              <p className={`text-base sm:text-lg mb-8 max-w-3xl mx-auto text-center px-2 leading-relaxed text-gray-700 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {language === 'ar' ? 
                  'موارد وأدوات لمساعدتك على الإقلاع عن التدخين وتحسين صحة رئتيك.' : 
                  'Resources and tools to help you quit smoking and improve your lung health.'
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <Card className="hover:shadow-lg transition-shadow border-slate-100">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Wind className="h-5 w-5 text-slate-600" />
                    </div>
                    <CardTitle className="text-healthDarkBlue text-lg leading-tight text-right font-cairo" dir="rtl">
                      HealthLink BC – الإقلاع عن التدخين
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed text-right" dir="rtl">
                      معلومات تساعد على الإقلاع عن التدخين وتحسين صحة الرئة مع نصائح عملية وأدوات دعم.
                    </p>
                    <p className="text-xs text-gray-500 mb-4 text-right" dir="rtl">المصدر: HealthLinkBC</p>
                    <a href="https://www.healthlinkbc.ca/sites/default/files/documents/healthfiles/hfile30c-a.pdf" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-slate-600 hover:bg-slate-700 text-white flex items-center gap-2 w-full">
                        <BookOpen className="h-4 w-4" />
                        <span className="font-cairo">تحميل الملف</span>
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-gray-600 text-center mt-8 px-4 leading-relaxed">
                <span className={`block mb-2 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  {language === 'ar' ? 
                    'المواد مقدمة من HealthLinkBC لدعم الوصول إلى معلومات صحية موثوقة باللغة العربية.' : 
                    'Resources provided by HealthLinkBC to support accessible Arabic health education.'
                  }
                </span>
              </p>
            </div>
          </section>
        )}

        {/* Clinical Tools */}
        {isVisible("clinical") && (
          <section id="clinical-tools" className="py-12 md:py-16 bg-gradient-to-br from-healthDarkBlue/5 to-healthTeal/5">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Stethoscope className="h-8 w-8 text-healthDarkBlue" />
                <h2 className={`text-2xl sm:text-3xl font-bold text-healthDarkBlue ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? 'لطلاب الطب والمقيمين والأطباء' : 'For Medical Students, Residents, and Clinicians'}
                </h2>
              </div>
              <p className={`text-base sm:text-lg mb-8 max-w-3xl mx-auto text-center px-2 leading-relaxed text-gray-700 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {language === 'ar' 
                  ? 'أدوات سريرية وقوالب عملية لدعم سير العمل السريري واتخاذ القرارات المبنية على الأدلة.'
                  : 'Clinical tools and practical templates to support clinical workflow and evidence-based decision-making.'}
              </p>
              
              <div className="max-w-3xl mx-auto">
                <Card className="hover:shadow-xl transition-shadow border-2 border-healthTeal/20">
                  <CardHeader className="pb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs bg-healthTeal/10 text-healthTeal border-healthTeal/20">
                        {language === 'ar' ? 'سير العمل السريري' : 'Clinical workflow'}
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-healthDarkBlue/10 text-healthDarkBlue border-healthDarkBlue/20">
                        {language === 'ar' ? 'المرضى الداخليين' : 'Inpatient'}
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-healthPurple/10 text-healthPurple border-healthPurple/20">
                        {language === 'ar' ? 'قوالب' : 'Templates'}
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        {language === 'ar' ? 'طلاب' : 'Students'}
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        {language === 'ar' ? 'مقيمين' : 'Residents'}
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        {language === 'ar' ? 'أطباء' : 'Physicians'}
                      </Badge>
                    </div>
                    <CardTitle className={`text-healthDarkBlue text-xl leading-tight flex items-center gap-2 ${language === 'ar' ? 'text-right font-cairo flex-row-reverse' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      <FileText className="h-6 w-6 text-healthTeal flex-shrink-0" />
                      {language === 'ar' ? 'قوالب نقطة الرعاية' : 'Point-of-Care Templates'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className={`text-gray-700 mb-4 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      {language === 'ar' 
                        ? 'مجموعة من قوالب نقطة الرعاية للمشاكل السريرية الشائعة. تشمل قوائم القبول، نماذج جمع التاريخ المرضي، النتائج الفحصية الرئيسية، التشخيص التفريقي، وعبارات التقييم والخطة الجاهزة للسجل الطبي الإلكتروني. الهدف هو المرجع السريع عند سرير المريض لتبسيط سير العمل ودعم الرعاية المبنية على الأدلة.'
                        : 'A set of point-of-care templates for common clinical problems. These include admission checklists, HPI intakes, key exam findings, differentials, and Assessment and Plan dotphrases for the EHR. The goal is quick reference at the bedside to help streamline workflow and support evidence-based care.'}
                    </p>
                    <p className={`text-sm text-healthTeal mb-4 font-medium ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      {language === 'ar' 
                        ? 'ملاحظة: التركيز الحالي على قوالب المرضى الداخليين. سيتم إضافة قوالب العيادات الخارجية لاحقاً.'
                        : 'Note: The current focus is inpatient templates. Outpatient templates will be added later.'}
                    </p>
                    
                    <div className={`mb-6 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        {language === 'ar' ? 'الميزات الرئيسية:' : 'Key features:'}
                      </p>
                      <ul className={`text-sm text-gray-600 space-y-1 ${language === 'ar' ? 'mr-4' : 'ml-4'}`}>
                        {[
                          { en: 'Admission checklists', ar: 'قوائم مراجعة القبول' },
                          { en: 'HPI intake templates', ar: 'قوالب جمع التاريخ المرضي' },
                          { en: 'Key exam findings', ar: 'النتائج الفحصية الرئيسية' },
                          { en: 'Differential diagnosis prompts', ar: 'محفزات التشخيص التفريقي' },
                          { en: 'Assessment and Plan dotphrases (EHR ready)', ar: 'عبارات التقييم والخطة (جاهزة للسجل الإلكتروني)' },
                          { en: 'Built for rapid use at the point of care', ar: 'مصممة للاستخدام السريع عند نقطة الرعاية' },
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-healthTeal">•</span>
                            {language === 'ar' ? item.ar : item.en}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                      <a href="https://www.pointofcaremedicine.com/templates" target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 w-full">
                          <ExternalLink className="h-4 w-4" />
                          {language === 'ar' ? 'افتح القوالب' : 'Open templates'}
                        </Button>
                      </a>
                      <Link to="/contact" className="flex-1">
                        <Button variant="outline" className="border-healthDarkBlue text-healthDarkBlue hover:bg-healthDarkBlue/10 flex items-center gap-2 w-full">
                          <Mail className="h-4 w-4" />
                          {language === 'ar' ? 'شارك مورداً مع SHAMS' : 'Share a resource with SHAMS'}
                        </Button>
                      </Link>
                    </div>
                    
                    <div className={`text-xs text-gray-500 space-y-1 pt-3 border-t border-gray-100 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      <p>
                        {language === 'ar' 
                          ? 'تقدم SHAMS روابط لأغراض تعليمية. هذه ليست نصيحة طبية. للقرارات الخاصة بالمريض، اتبع إرشاداتك السريرية المحلية وتحدث مع طبيبك المشرف أو فريق الرعاية.'
                          : 'SHAMS provides links for education. This is not medical advice. For patient-specific decisions, follow your local clinical guidance and speak with your supervising physician or care team.'}
                      </p>
                      <p className="font-medium">
                        {language === 'ar' 
                          ? 'SHAMS ليست منتسبة لهذا الموقع.'
                          : 'SHAMS is not affiliated with this website.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Clinical Resources Section */}
        <section id="resources" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
              {language === 'ar' ? 'التدريب المستمر والأدوات السريرية' : 'CME & Clinical Tools'}
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-center mb-6">
              {language === 'ar' ? 'موارد للأطباء والمقيمين وطلاب الطب' : 'Resources for physicians, residents, and medical students'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-8">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <GraduationCap className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-3">
                  {language === 'ar' ? 'مركز سيناي للتعليم المستمر' : 'Sinai Health CME'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'ar' ? 'برامج التعليم الطبي المستمر من مركز سيناي الصحي.' : 'Continuing medical education programs from Sinai Health.'}
                </p>
                <a href="https://www.sinaihealth.ca/education-and-training/continuing-education" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'الوصول للتدريب' : 'Access Training'}
                  </Button>
                </a>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <GraduationCap className="h-10 w-10 text-destructive mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-3">
                  {language === 'ar' ? 'التعليم الطبي المستمر - كالغاري' : 'Calgary CME'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'ar' ? 'برامج التعليم الطبي المستمر من جامعة كالغاري.' : 'Continuing medical education programs from the University of Calgary.'}
                </p>
                <a href="https://cumming.ucalgary.ca/cme/about/strategy" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'عرض البرامج' : 'View Programs'}
                  </Button>
                </a>
              </Card>
            </div>

            {/* Point-of-Care Templates */}
            <div className="max-w-2xl mx-auto">
              <Card className="hover:shadow-xl transition-shadow border-2 border-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">{language === 'ar' ? 'قوالب' : 'Templates'}</Badge>
                    <Badge variant="secondary" className="text-xs bg-foreground/10 text-foreground">{language === 'ar' ? 'المرضى الداخليين' : 'Inpatient'}</Badge>
                  </div>
                  <CardTitle className={`text-foreground text-base flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <FileText className="h-4 w-4 text-primary" />
                    {language === 'ar' ? 'قوالب نقطة الرعاية' : 'Point-of-Care Templates'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className={`text-muted-foreground mb-3 text-sm ${isRTL ? 'text-right' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    {language === 'ar' 
                      ? 'قوالب للمشاكل السريرية الشائعة تشمل قوائم القبول، نماذج جمع التاريخ المرضي، التشخيص التفريقي، وعبارات التقييم والخطة.'
                      : 'Templates for common clinical problems including admission checklists, HPI intakes, differentials, and A&P dotphrases.'}
                  </p>
                  <a href="https://www.pointofcaremedicine.com/templates" target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 text-sm">
                      <ExternalLink className="h-4 w-4" />{language === 'ar' ? 'افتح القوالب' : 'Open templates'}
                    </Button>
                  </a>
                  <p className={`text-xs text-muted-foreground mt-2 ${isRTL ? 'text-right' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 'SHAMS ليست منتسبة لهذا الموقع.' : 'SHAMS is not affiliated with this website.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <section className="py-8 bg-healthLightGray">
          <div className="container mx-auto px-4">
            <p className={`text-sm text-gray-600 text-center max-w-4xl mx-auto leading-relaxed ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {language === 'ar' ? 
                'جميع الموارد متاحة للجمهور ومشتركة من منظمات طبية موثوقة لدعم التعليم الصحي باللغة العربية.' : 
                'All resources are publicly available and shared from verified medical organizations to support accessible Arabic-language health education.'
              }
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
