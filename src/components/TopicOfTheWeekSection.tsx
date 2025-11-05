import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import movemberImage from "@/assets/movember-awareness.png";

const TopicOfTheWeekSection = () => {
  const { t, language } = useLanguage();

  // Movember - Men's Health Awareness Month Feature
  const weeklyTopic = {
    titleEn: "Movember: Men's Health Awareness Month",
    titleAr: "شهر التوعية بصحة الرجال (موفمبر)",
    imageUrl: movemberImage,
    descriptionEn: "November marks Movember, a month dedicated to raising awareness about men's health — including prostate cancer, testicular cancer, and mental health. Explore our Arabic educational materials to learn about men's health, wellness, and emotional wellbeing from trusted medical sources.",
    descriptionAr: "شهر نوفمبر هو موفمبر، شهر التوعية بصحة الرجال — بما في ذلك سرطان البروستاتا والخصية والصحة النفسية. تصفّح موادنا التعليمية باللغة العربية للتعرف على صحة الرجال وجودة الحياة النفسية من مصادر طبية موثوقة.",
    collaborationEn: "In collaboration with community health partners and Arabic-language medical education initiatives.",
    collaborationAr: "بالتعاون مع شركائنا في التوعية الصحية ومبادرات التثقيف الطبي باللغة العربية."
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header with Movember Icon */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="w-8 h-8 text-[#4E342E]" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {language === 'ar' ? 'موضوع الأسبوع: شهر التوعية بصحة الرجال' : 'Weekly Topic: Movember — Men\'s Health Awareness'}
            </h2>
            <User className="w-8 h-8 text-[#4E342E]" />
          </div>
        </div>

        {/* Featured Topic Card with Brown Accent */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="overflow-hidden border-2 border-[#795548]/30 bg-gradient-to-br from-amber-50/50 to-white hover:shadow-xl transition-shadow duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative">
                <img 
                  src={weeklyTopic.imageUrl} 
                  alt={language === 'ar' ? weeklyTopic.titleAr : weeklyTopic.titleEn}
                  className="w-full h-full object-cover min-h-[300px]"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-[#4E342E] text-white rounded-full px-4 py-2 font-semibold shadow-lg">
                    {language === 'ar' ? 'نوفمبر' : 'November'}
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <CardContent className={`p-8 flex flex-col justify-center ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <h3 className={`text-2xl font-bold mb-4 text-[#4E342E] ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? 'موفمبر: شهر التوعية بصحة الرجال' : 'Movember: Men\'s Health Awareness Month'}
                </h3>
                <p className={`text-muted-foreground mb-6 leading-relaxed ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' 
                    ? 'يهدف هذا الشهر إلى نشر الوعي حول سرطان البروستاتا والخصية، والصحة النفسية للرجال. تصفّح موادنا التعليمية باللغة العربية للتعرف على صحة الرجال وجودة الحياة النفسية من مصادر طبية موثوقة.'
                    : 'Raising awareness about prostate and testicular cancer, and men\'s mental health. Explore our Arabic educational materials to learn about men\'s health, wellness, and emotional wellbeing from trusted medical sources.'}
                </p>
                
                {/* Action Button */}
                <Link to="/services#mental-health-arabic">
                  <Button 
                    size="lg"
                    className="w-full bg-[#4E342E] hover:bg-[#795548] text-white border-0 transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    {language === 'ar' ? 'عرض المواد التعليمية بالعربية' : 'View Arabic Men\'s Health Resources'}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                {/* Collaboration Note */}
                <p className={`text-sm text-muted-foreground mt-6 italic ${language === 'ar' ? 'font-cairo text-right' : 'text-left'}`}>
                  {language === 'ar' ? weeklyTopic.collaborationAr : weeklyTopic.collaborationEn}
                </p>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Instagram Follow Section */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            {language === 'ar' 
              ? 'تابعنا على إنستغرام للمزيد من المحتوى التعليمي الصحي'
              : 'Follow us on Instagram for more health education content'
            }
          </p>
          
          <Button 
            variant="outline" 
            size="lg"
            className="bg-gradient-to-r from-[#4E342E] to-[#795548] text-white border-0 hover:from-[#3E2723] hover:to-[#6D4C41] transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={() => window.open('https://www.instagram.com/projectshams/', '_blank')}
          >
            <Instagram className="w-5 h-5 mr-2" />
            {language === 'ar' ? 'تابعنا على إنستغرام' : 'Follow us on Instagram'}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopicOfTheWeekSection;