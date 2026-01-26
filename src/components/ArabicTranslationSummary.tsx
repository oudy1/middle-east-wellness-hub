import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, Users, FileText, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ArabicTranslationSummary = () => {
  const { language, setLanguage, t } = useLanguage();

  const translationFeatures = [
    {
      icon: <Globe className="h-6 w-6 text-healthTeal" />,
      title: {
        en: "Complete Arabic Translation",
        ar: "الترجمة العربية الكاملة"
      },
      description: {
        en: "Over 1500+ translation keys covering all website content in Modern Standard Arabic (MSA)",
        ar: "أكثر من 1500 مفتاح ترجمة يغطي جميع محتوى الموقع باللغة العربية الفصحى المعاصرة"
      }
    },
    {
      icon: <Users className="h-6 w-6 text-healthTeal" />,
      title: {
        en: "Culturally Responsive Content",
        ar: "محتوى متجاوب ثقافياً"
      },
      description: {
        en: "All health terminology and content adapted for Middle Eastern societies with cultural sensitivity",
        ar: "جميع المصطلحات الصحية والمحتوى مُكيف لمجتمعات الشرق الأوسط مع الحساسية الثقافية"
      }
    },
    {
      icon: <FileText className="h-6 w-6 text-healthTeal" />,
      title: {
        en: "Professional Typography",
        ar: "طباعة احترافية"
      },
      description: {
        en: "Optimized Arabic fonts (Cairo, Noto Sans Arabic, Amiri) with proper RTL layout and spacing",
        ar: "خطوط عربية محسّنة (القاهرة، نوتو سانس العربية، أميري) مع تخطيط من اليمين لليسار والتباعد المناسب"
      }
    },
    {
      icon: <Heart className="h-6 w-6 text-healthTeal" />,
      title: {
        en: "Community-Friendly Language",
        ar: "لغة ودودة للمجتمع"
      },
      description: {
        en: "Simple, accessible Arabic wording suitable for both healthcare professionals and community members",
        ar: "صياغة عربية بسيطة ومفهومة مناسبة لكل من المهنيين الصحيين وأفراد المجتمع"
      }
    }
  ];

  const supportedSections = [
    "الرئيسية (Home)", "عن المبادرة (About)", "الخدمات (Services)", 
    "البحث (Research)", "الأمراض (Diseases)", "ورش العمل (Workshops)", 
    "دليل الأطباء (Physician Directory)", "اتصل بنا (Contact)", 
    "ادعمنا (Support Us)", "الموارد (Resources)"
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-healthLightGray via-white to-healthLightGray">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-healthTeal border-healthTeal">
              <Globe className="mr-2 h-4 w-4" />
              Multilingual Platform / منصة متعددة اللغات
            </Badge>
            <h2 className="text-4xl font-bold mb-4 text-healthDarkBlue">
              {language === 'ar' ? 'الترجمة العربية الشاملة' : 'Complete Arabic Translation Implementation'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'تطبيق شامل للترجمة العربية مع دعم كامل للكتابة من اليمين إلى اليسار وتصميم متجاوب ثقافياً'
                : 'Comprehensive Arabic translation implementation with full RTL support and culturally responsive design'
              }
            </p>
          </div>

          {/* Language Toggle Demo */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Globe className="mr-2 h-6 w-6 text-healthTeal" />
                {language === 'ar' ? 'تبديل اللغة' : 'Language Toggle'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                <Button 
                  variant={language === 'en' ? 'default' : 'outline'}
                  onClick={() => setLanguage('en')}
                  className="bg-healthTeal hover:bg-teal-700"
                >
                  English 🇺🇸
                </Button>
                <Button 
                  variant={language === 'ar' ? 'default' : 'outline'}
                  onClick={() => setLanguage('ar')}
                  className="bg-healthTeal hover:bg-teal-700"
                >
                  العربية 🇸🇦
                </Button>
              </div>
              <p className="text-center mt-4 text-sm text-gray-600">
                {language === 'ar' 
                  ? 'انقر على الأزرار أعلاه لتبديل اللغة ومشاهدة الترجمة الفورية'
                  : 'Click the buttons above to switch languages and see instant translation'
                }
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {translationFeatures.map((feature, index) => (
              <Card key={index} className="border-l-4 border-l-healthTeal">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-healthDarkBlue">
                        {language === 'ar' ? feature.title.ar : feature.title.en}
                      </h3>
                      <p className="text-gray-600">
                        {language === 'ar' ? feature.description.ar : feature.description.en}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Supported Sections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {language === 'ar' ? 'الأقسام المترجمة' : 'Translated Sections'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {supportedSections.map((section, index) => (
                  <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{section}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-healthLightGray rounded-lg">
                <p className="text-center text-sm text-gray-700">
                  {language === 'ar' 
                    ? '✨ جميع النصوص والمحتوى مترجم ومُحسَّن للثقافة العربية والمجتمعات الشرق أوسطية'
                    : '✨ All text and content professionally translated and culturally optimized for Arabic and Middle Eastern societies'
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Technical Implementation */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'التنفيذ التقني' : 'Technical Implementation'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-healthDarkBlue">
                    {language === 'ar' ? 'الميزات المطبقة:' : 'Implemented Features:'}
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>✅ {language === 'ar' ? 'دعم RTL كامل' : 'Full RTL Support'}</li>
                    <li>✅ {language === 'ar' ? 'خطوط عربية محسّنة' : 'Optimized Arabic Fonts'}</li>
                    <li>✅ {language === 'ar' ? 'تصميم متجاوب ثقافياً' : 'Culturally Responsive Design'}</li>
                    <li>✅ {language === 'ar' ? 'ترجمة فورية' : 'Instant Translation'}</li>
                    <li>✅ {language === 'ar' ? 'مصطلحات طبية دقيقة' : 'Accurate Medical Terminology'}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-healthDarkBlue">
                    {language === 'ar' ? 'التقنيات المستخدمة:' : 'Technologies Used:'}
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• React Context API</li>
                    <li>• Tailwind CSS RTL</li>
                    <li>• Google Fonts (Arabic)</li>
                    <li>• TypeScript</li>
                    <li>• Responsive Design</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ArabicTranslationSummary;