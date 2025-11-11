import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const ResearchTeaserSection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-white relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <GraduationCap className="h-10 w-10 text-healthTeal mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue">
            {language === 'ar' ? 'فرص البحث' : 'Research Opportunities'}
          </h2>
        </div>


        {/* Featured: Dr. Delaney Glass - Analyst (RA) Opportunity */}
        <Card className="max-w-6xl mx-auto overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 mb-8 border-2 border-purple-200">
          <div className="relative">
            {/* "Apply by Nov 28" Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-bold shadow-lg animate-fade-in">
                {language === 'ar' ? 'قدّم قبل ٢٨ نوفمبر' : 'Apply by Nov 28, 2025'}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Content Section */}
              <div className="p-8 bg-gradient-to-br from-purple-50 to-white">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                  <h3 className={`text-2xl font-bold text-purple-900 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' 
                      ? 'فرصة بحثية: محلّل/ـة بيانات (جامعة تورونتو)'
                      : 'New Research Opportunity: Analyst (RA) – U of T'}
                  </h3>
                </div>
                
                <p className={`text-sm text-purple-700 mb-3 font-semibold ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'ar'
                    ? 'د. ديلاني غلاس | تحليل مختلط الأساليب حول الصحة والمساواة (بيانات الأردن)'
                    : 'Dr. Delaney Glass | Mixed-Methods Health & Inequality Analysis (Jordan dataset)'}
                </p>
                
                <p className={`text-gray-700 mb-6 leading-relaxed ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' 
                    ? 'البحث مع الدكتورة ديلاني غلاس حول العوامل البنيوية/الاجتماعية والسلامة والصحة باستخدام R (تحليل العوامل EFA/CFA والنمذجة البنائية SEM). للطلبة في جامعة تورونتو فقط.'
                    : "Join Dr. Delaney Glass to analyze health, safety, and structural factors using R (EFA/CFA/SEM). U of T students only."}
                </p>
                
                <a 
                  href="https://form.jotform.com/253143939587268" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#F36F21] hover:bg-[#d96119] text-white w-full md:w-auto transition-all duration-300 hover:shadow-lg hover-scale">
                    {language === 'ar' ? 'التقديم / الإرسال' : 'Apply / Submit'}
                    <ExternalLink className={`h-4 w-4 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
                  </Button>
                </a>
              </div>

              {/* Info Section */}
              <div className="p-8 bg-gradient-to-br from-healthTeal/5 to-white border-l border-gray-200">
                <h4 className={`text-lg font-bold text-healthDarkBlue mb-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'متطلبات الأهلية:' : 'Eligibility:'}
                </h4>
                <ul className={`space-y-2 mb-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">✓</span>
                        <span className="text-sm">طالب في جامعة تورونتو (بكالوريوس أو دراسات عليا)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">✓</span>
                        <span className="text-sm">إحصاء متقدم + R مطلوب</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">✓</span>
                        <span className="text-sm">مرتاح مع EFA/CFA وSEM أو راغب في التعلم</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">✓</span>
                        <span className="text-sm">الخبرة في الأساليب البايزية/التكرارية ميزة إضافية</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">✓</span>
                        <span className="text-sm">U of T student (undergrad or grad)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">✓</span>
                        <span className="text-sm">Advanced statistics + R required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">✓</span>
                        <span className="text-sm">Comfortable with or willing to learn EFA/CFA and SEM</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">✓</span>
                        <span className="text-sm">Experience in Bayesian/Frequentist approaches is a plus</span>
                      </li>
                    </>
                  )}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    #QuantAnalysis
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    #RStats
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    #SEM
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    #HealthInequality
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Canadian Dream Deferred Study */}
        <Card className="max-w-6xl mx-auto overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover-scale">
          <div className="grid md:grid-cols-2 gap-0">
            {/* English Version */}
            <div className="p-8 bg-gradient-to-br from-healthTeal/5 to-white border-r border-gray-200">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-healthDarkBlue mb-4 text-center">
                  New Study: The Canadian Dream Deferred
                </h3>
                
                {/* Clickable Poster - English */}
                <a 
                  href="/lovable-uploads/projectshams-flyer-1.5gen-oct8.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block mx-auto"
                >
                  <img 
                    src="/lovable-uploads/dream-deferred-flyer-en.png" 
                    alt="Canadian Dream Deferred Study Flyer"
                    className="w-[65%] mx-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    style={{ marginBottom: '15px' }}
                  />
                </a>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                SHAMS is co-piloting recruitment for a University of Toronto study exploring how Egyptian Canadians experience adulthood, family, and migration. Click below to learn how to participate.
              </p>
              
              <Link to="/resources">
                <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white w-full md:w-auto transition-all duration-300 hover:shadow-lg">
                  Learn More
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Arabic Version */}
            <div className="p-8 bg-gradient-to-br from-healthPurple/5 to-white" dir="rtl">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-healthDarkBlue mb-4 text-center">
                  دراسة جديدة: الحلم الكندي المؤجل
                </h3>
                
                {/* Clickable Poster - Arabic */}
                <a 
                  href="/lovable-uploads/ar-projectshams-flyer-1.5gen-oct8.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block mx-auto"
                >
                  <img 
                    src="/lovable-uploads/dream-deferred-flyer-ar.png" 
                    alt="دراسة الحلم الكندي المؤجل"
                    className="w-[65%] mx-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    style={{ marginBottom: '15px' }}
                  />
                </a>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                يشارك مشروع شمس في دعم دراسة من جامعة تورنتو حول كيفية فهم الكنديين من أصول مصرية لمرحلة النضج وتجاربهم في الهجرة والحياة الأسرية. اضغط أدناه لمعرفة المزيد أو للمشاركة.
              </p>
              
              <Link to="/resources">
                <Button className="bg-healthPurple hover:bg-healthPurple/90 text-white w-full md:w-auto transition-all duration-300 hover:shadow-lg">
                  المزيد من التفاصيل
                  <ExternalLink className="h-4 w-4 mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 italic">
            {language === 'ar' 
              ? 'شمس تدعم عملية التوظيف لهذه الدراسة بالشراكة مع جامعة تورنتو'
              : 'SHAMS is supporting recruitment for this study in partnership with the University of Toronto'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResearchTeaserSection;
