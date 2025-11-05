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

        {/* Featured Topic Card with Brown Accent - Full Width Image with Text Overlay */}
        <div className="max-w-5xl mx-auto mb-12">
          <Card className="overflow-hidden border-2 border-[#795548]/30 hover:shadow-xl transition-shadow duration-300">
            <div className="relative min-h-[400px] md:min-h-[450px]">
              {/* Background Image */}
              <img 
                src={weeklyTopic.imageUrl} 
                alt={language === 'ar' ? weeklyTopic.titleAr : weeklyTopic.titleEn}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Gradient Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
              
              {/* November Label */}
              <div className={`absolute top-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-20`}>
                <div className="bg-[#3E2723] text-white rounded-2xl px-4 py-2 font-semibold shadow-lg">
                  {language === 'ar' ? 'نوفمبر' : 'November'}
                </div>
              </div>
              
              {/* Text Content Overlay */}
              <div className={`absolute inset-0 flex items-center ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xl p-8 md:p-12 ${language === 'ar' ? 'md:pr-12 md:pl-4' : 'md:pl-12 md:pr-4'}`}>
                  {/* Semi-transparent Background Behind Text */}
                  <div className={`bg-black/10 backdrop-blur-sm rounded-lg p-6 md:p-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    <h3 className={`text-2xl md:text-4xl font-semibold mb-4 text-white drop-shadow-lg ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {language === 'ar' ? 'موفمبر: شهر التوعية بصحة الرجال' : 'Movember: Men\'s Health Awareness Month'}
                    </h3>
                    <p className={`text-base md:text-lg mb-6 text-white/95 leading-relaxed drop-shadow-md ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {language === 'ar' 
                        ? 'يهدف هذا الشهر إلى زيادة الوعي حول سرطان البروستاتا والخصية، والصحة النفسية للرجال.'
                        : 'Promoting awareness of prostate cancer, testicular cancer, and men\'s mental health.'}
                    </p>
                
                    {/* Action Button */}
                    <Link to="/services#mental-health-arabic" className="block">
                      <Button 
                        size="lg"
                        className="w-full bg-[#4E342E] hover:bg-[#795548] text-white border-0 transition-colors duration-200 shadow-lg hover:shadow-xl"
                      >
                        {language === 'ar' ? 'عرض المواد التعليمية بالعربية' : 'View Arabic Health Resources'}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Collaboration Note Below Banner */}
          <p className={`text-sm text-muted-foreground text-center mt-4 italic px-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {language === 'ar' ? weeklyTopic.collaborationAr : weeklyTopic.collaborationEn}
          </p>
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