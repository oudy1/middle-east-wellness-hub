import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

        <Card className="max-w-6xl mx-auto overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover-scale">
          <div className="grid md:grid-cols-2 gap-0">
            {/* English Version */}
            <div className="p-8 bg-gradient-to-br from-healthTeal/5 to-white border-r border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="/lovable-uploads/dream-deferred-flyer.jpg" 
                  alt="Canadian Dream Deferred Study"
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h3 className="text-xl font-bold text-healthDarkBlue mb-2">
                    New Study: The Canadian Dream Deferred
                  </h3>
                </div>
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
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="/lovable-uploads/dream-deferred-flyer.jpg" 
                  alt="دراسة الحلم الكندي المؤجل"
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h3 className="text-xl font-bold text-healthDarkBlue mb-2">
                    دراسة جديدة: الحلم الكندي المؤجل
                  </h3>
                </div>
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
