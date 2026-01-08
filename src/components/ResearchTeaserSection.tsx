import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, GraduationCap, DollarSign, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import youthEducationFlyer from "@/assets/youth-education-study.jpg";

const ResearchTeaserSection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-white relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <GraduationCap className="h-10 w-10 text-healthTeal mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue">
            {language === 'ar' ? 'فرص البحث' : 'Research Studies'}
          </h2>
        </div>

        {/* Youth Education & Human Rights Study */}
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-healthPurple p-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Users className="h-6 w-6 text-white" />
              <h3 className={`text-2xl md:text-3xl font-bold text-white text-center ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' 
                  ? 'شارك في دراسة بحثية: الشباب والتعليم وحقوق الإنسان في أونتاريو'
                  : 'Participate in a Research Study: Youth, Education, and Human Rights in Ontario'}
              </h3>
            </div>
            <p className={`text-white/90 text-center ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' 
                ? 'دراسة تستكشف كيف تشكل تجارب المدرسة الثانوية فهم الشباب لحقوق الإنسان'
                : 'Exploring how high school experiences shape young people\'s understanding of human rights'}
            </p>
          </div>
          
          <div className={`p-8 ${language === 'ar' ? 'text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {/* Flyer Thumbnail */}
            <div className="mb-6">
              <a 
                href="https://bit.ly/488lp3w" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block mx-auto w-full max-w-sm"
                aria-label={language === 'ar' 
                  ? 'ملصق دراسة بحثية حول الشباب والتعليم وحقوق الإنسان في أونتاريو'
                  : 'Research study flyer about youth, education, and human rights in Ontario'}
              >
                <img 
                  src={youthEducationFlyer}
                  alt={language === 'ar' 
                    ? 'ملصق دراسة بحثية حول الشباب والتعليم وحقوق الإنسان في أونتاريو'
                    : 'Research study flyer about youth, education, and human rights in Ontario'}
                  className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  loading="lazy"
                />
              </a>
            </div>

            {/* Study Overview */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-healthDarkBlue mb-2">
                {language === 'ar' ? 'نظرة عامة على الدراسة' : 'Study Overview'}
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {language === 'ar' 
                  ? 'تستكشف هذه الدراسة كيف تشكل تجارب المدرسة الثانوية فهم الشباب لحقوق الإنسان في أونتاريو، كندا. تتضمن المشاركة مقابلة واحدة عبر الإنترنت مع تعويض مالي.'
                  : 'This study explores how high school experiences shape young people\'s understanding of human rights in Ontario, Canada. Participation involves a one-time online interview and offers compensation for time.'}
              </p>
            </div>

            {/* Who Can Participate */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-healthDarkBlue mb-2">
                {language === 'ar' ? 'من يمكنه المشاركة' : 'Who Can Participate'}
              </h4>
              <ul className={`text-gray-700 space-y-1 ${language === 'ar' ? 'pr-4' : 'pl-4'} list-disc`}>
                <li>{language === 'ar' ? 'الشباب الذين تتراوح أعمارهم بين 18-25 سنة' : 'Young people aged 18–25'}</li>
                <li>{language === 'ar' ? 'أكملوا سنتين على الأقل من المدرسة الثانوية' : 'Completed at least two years of high school'}</li>
                <li>{language === 'ar' ? 'وصلوا إلى كندا خلال السنوات الخمس الماضية' : 'Arrived in Canada within the last five years'}</li>
                <li>{language === 'ar' ? 'من بلد شهد نزاعاً أو أزمة' : 'From a country that has experienced conflict or crisis'}</li>
              </ul>
            </div>

            {/* What to Expect */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-healthDarkBlue mb-2">
                {language === 'ar' ? 'ماذا تتوقع' : 'What to Expect'}
              </h4>
              <ul className={`text-gray-700 space-y-1 ${language === 'ar' ? 'pr-4' : 'pl-4'} list-disc`}>
                <li>{language === 'ar' ? 'مقابلة فردية عبر Zoom' : 'One individual Zoom interview'}</li>
                <li>{language === 'ar' ? 'المدة: 45-60 دقيقة' : 'Duration: 45–60 minutes'}</li>
                <li>{language === 'ar' ? 'لا يتطلب تدريب مسبق' : 'No prior training required'}</li>
                <li>{language === 'ar' ? 'المشاركة طوعية' : 'Participation is voluntary'}</li>
              </ul>
            </div>

            {/* What Participants Receive */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-healthDarkBlue mb-2">
                {language === 'ar' ? 'ما يحصل عليه المشاركون' : 'What Participants Receive'}
              </h4>
              <ul className={`text-gray-700 space-y-1 ${language === 'ar' ? 'pr-4' : 'pl-4'} list-disc`}>
                <li>{language === 'ar' ? 'بطاقة هدايا بقيمة 20 دولار كندي' : '$20 CAD gift card'}</li>
                <li>{language === 'ar' ? 'فرصة للمساهمة في دراسة بحثية للدكتوراه' : 'Opportunity to contribute to a doctoral research study'}</li>
              </ul>
            </div>

            {/* Ethics Approval */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>{language === 'ar' ? 'الموافقة الأخلاقية:' : 'Ethics Approval:'}</strong>{' '}
                {language === 'ar' 
                  ? 'معتمد من مجلس أخلاقيات البحث بجامعة تورنتو - رقم البروتوكول: RIS-47583'
                  : 'Approved by the University of Toronto Research Ethics Board — Protocol Number: RIS-47583'}
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex justify-center">
              <a 
                href="https://bit.ly/488lp3w" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  {language === 'ar' ? 'تعرف على المزيد / سجّل الآن' : 'Learn More / Sign Up'}
                  <ExternalLink className={`h-4 w-4 ${language === 'ar' ? 'mr-2' : 'ml-2'}`} />
                </Button>
              </a>
            </div>
          </div>
        </Card>

        {/* RISE-C Study */}
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 mb-8">
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
                  src="/lovable-uploads/rise-c-flyer.png" 
                  alt={language === 'ar' ? 'ملصق دراسة RISE-C' : 'RISE-C Study Flyer'}
                  className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  loading="lazy"
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
                    loading="lazy"
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
                    loading="lazy"
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
