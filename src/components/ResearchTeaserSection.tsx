import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, GraduationCap, DollarSign } from "lucide-react";
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
            {language === 'ar' ? 'فرص البحث' : 'Research Study'}
          </h2>
        </div>

        {/* RISE-C Study */}
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-r from-healthTeal to-healthPurple p-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
                {language === 'ar' ? 'دراسة RISE-C' : 'RISE-C Study'}
              </h3>
              <Badge className="bg-yellow-500 text-yellow-900 border-yellow-600">
                <DollarSign className="h-3 w-3 mr-1" />
                {language === 'ar' ? 'مدفوعة' : 'Paid'}
              </Badge>
            </div>
            <p className="text-white/90 text-center">
              {language === 'ar' 
                ? 'دراسة مدفوعة للأشخاص الملوّنين في كندا'
                : 'Paid study for people of colour in Canada'}
            </p>
          </div>
          
          <div className="p-8">
            {/* Flyer Thumbnail */}
            <div className="mb-6">
              <a 
                href="/lovable-uploads/rise-c-flyer.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block mx-auto w-full max-w-md"
              >
                <img 
                  src="/lovable-uploads/rise-c-flyer.pdf" 
                  alt={language === 'ar' ? 'ملصق دراسة RISE-C' : 'RISE-C Study Flyer'}
                  className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </a>
            </div>

            {/* Study Description */}
            <div className={`mb-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {language === 'ar' 
                  ? 'دراسة مدفوعة للأشخاص الملوّنين في كندا. العمر 16 سنة فأكثر مع هاتف ذكي. مقابلة عبر الإنترنت واستبيانات يومية قصيرة. سرية وأمان.'
                  : 'Paid research study for people of colour in Canada. 16+ with a smartphone. Online interview and brief daily surveys. Confidential and safe.'}
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://uwo.eu.qualtrics.com/jfe/form/SV_a8BHB591h11CmUe" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white w-full sm:w-auto">
                  {language === 'ar' ? 'ابدأ استبيان التأهيل' : 'Take Pre-Screening'}
                  <ExternalLink className={`h-4 w-4 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
                </Button>
              </a>
              
              <Link to="/resources">
                <Button variant="outline" className="w-full sm:w-auto border-healthPurple text-healthPurple hover:bg-healthPurple/10">
                  {language === 'ar' ? 'المزيد من التفاصيل' : 'Learn More'}
                  <ExternalLink className={`h-4 w-4 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Canadian Dream Deferred Study */}
        <Card className="max-w-6xl mx-auto overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover-scale mt-8">
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
              ? 'شمس تدعم عملية التوظيف لهذه الدراسات بالشراكة مع مؤسسات بحثية'
              : 'SHAMS supports recruitment for these studies in partnership with research institutions'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResearchTeaserSection;
