import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import breastCancerImage from "@/assets/breast-cancer-awareness.png";

const TopicOfTheWeekSection = () => {
  const { t, language } = useLanguage();

  // Breast Cancer Awareness Month Feature
  const weeklyTopic = {
    titleEn: "Breast Cancer Awareness Month",
    titleAr: "شهر التوعية بسرطان الثدي",
    imageUrl: breastCancerImage,
    descriptionEn: "October is Breast Cancer Awareness Month — a time to share reliable information, encourage early screening, and support those affected in our community. SHAMS now offers free Arabic educational booklets on prevention, early testing, and post-diagnosis care. Visit our Health Resources section below to download these materials directly and share them with your loved ones.",
    descriptionAr: "شهر أكتوبر هو شهر التوعية بسرطان الثدي — فرصة لنشر المعلومات الموثوقة، وتشجيع الفحص المبكر، ودعم كل من تأثر بهذه التجربة في مجتمعنا. يقدم مشروع شمس الآن كتيبات توعوية مجانية باللغة العربية حول الوقاية، والفحوصات المبكرة، والعناية بعد التشخيص. يمكنك زيارة قسم الموارد الصحية في الأسفل لتحميل الكتيبات ومشاركتها مع من تحب.",
    collaborationEn: "In collaboration with the American Cancer Society and the Nova Scotia Breast Screening Program.",
    collaborationAr: "بالتعاون مع الجمعية الأمريكية للسرطان وبرنامج نوفا سكوشا للكشف المبكر عن الثدي."
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header with Pink Ribbon Icon */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {language === 'ar' ? 'موضوع الأسبوع: شهر التوعية بسرطان الثدي' : 'Weekly Topic: Breast Cancer Awareness Month'}
            </h2>
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
          </div>
        </div>

        {/* Featured Topic Card with Pink Accent */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="overflow-hidden border-2 border-pink-200 bg-gradient-to-br from-pink-50/50 to-white">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative">
                <img 
                  src={weeklyTopic.imageUrl} 
                  alt={language === 'ar' ? weeklyTopic.titleAr : weeklyTopic.titleEn}
                  className="w-full h-full object-cover min-h-[300px]"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-pink-500 text-white rounded-full px-4 py-2 font-semibold shadow-lg">
                    {language === 'ar' ? 'أكتوبر' : 'October'}
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <CardContent className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {language === 'ar' ? weeklyTopic.titleAr : weeklyTopic.titleEn}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {language === 'ar' ? weeklyTopic.descriptionAr : weeklyTopic.descriptionEn}
                </p>
                
                {/* Action Button */}
                <Link to="/services">
                  <Button 
                    size="lg"
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white border-0"
                  >
                    {language === 'ar' ? 'عرض الموارد بالعربية' : 'View Arabic Resources'}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                {/* Collaboration Note */}
                <p className="text-sm text-muted-foreground mt-6 italic">
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
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0 hover:from-pink-600 hover:to-orange-600"
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