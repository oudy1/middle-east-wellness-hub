import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, GraduationCap, Stethoscope } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import mountSinaiImage from "@/assets/mount-sinai-research.png";

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


        {/* Featured: Mount Sinai Hospital Research Opportunity */}
        <Card className="max-w-6xl mx-auto overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 mb-8 border-2 border-blue-200">
          <div className="relative">
            {/* "Now Recruiting" Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-bold shadow-lg animate-fade-in">
                {language === 'ar' ? 'نبحث عن متطوعين' : 'Now Recruiting'}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 md:h-auto">
                <img 
                  src={mountSinaiImage}
                  alt="Mount Sinai Hospital Research"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent" />
              </div>

              {/* Content Section - Bilingual Display */}
              <div className="p-8 bg-gradient-to-br from-blue-50 to-white">
                <div className="flex items-center gap-3 mb-4">
                  <Stethoscope className="h-8 w-8 text-blue-600" />
                  <h3 className={`text-2xl font-bold text-blue-900 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' 
                      ? 'فرصة بحثية جديدة: التطوع في مستشفى ماونت سايناي'
                      : 'New Research Opportunity: Volunteer with Mount Sinai Hospital'}
                  </h3>
                </div>
                
                <p className={`text-gray-700 mb-6 leading-relaxed ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' 
                    ? 'يعلن مشروع شمس عن فرصة بحثية بالتعاون مع الدكتور عادل محمد من قسم طب الأطفال في مستشفى ماونت سايناي. نبحث عن مساعد بحث متطوع مهتم بالبحث الطبي والرعاية الصحية.'
                    : "SHAMS is supporting a new research opportunity with Dr. Adel Mohamed at Mount Sinai Hospital's Department of Paediatrics. We're looking for a motivated Volunteer Research Assistant to gain hands-on experience in clinical research and patient care."}
                </p>
                
                <Link to="/resources">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto transition-all duration-300 hover:shadow-lg hover-scale">
                    {language === 'ar' ? 'عرض التفاصيل والتقديم' : 'Learn More & Apply'}
                    <ExternalLink className={`h-4 w-4 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
                  </Button>
                </Link>
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
                    src="/lovable-uploads/dream-deferred-flyer.jpg" 
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
                    src="/lovable-uploads/dream-deferred-flyer.jpg" 
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
