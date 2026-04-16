import { Card } from "@/components/ui/card";
import { Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import stressEn from "@/assets/stress-mental-health-en.png";
import stressAr from "@/assets/stress-mental-health-ar.png";
import weeklyTopics from "../../content/weekly-topics.json";

// Image map for dynamic resolution
const imageMap: Record<string, string> = {
  "/src/assets/stress-mental-health-en.png": stressEn,
  "/src/assets/stress-mental-health-ar.png": stressAr,
};

const TopicOfTheWeekSection = () => {
  const { language, t } = useLanguage();
  const isArabic = language === 'ar';
  const isRTL = language === 'ar' || language === 'ku' || language === 'fa';

  const topic = weeklyTopics.find(tp => tp.active) || weeklyTopics[0];
  const imageSrc = imageMap[isArabic ? topic.imageAr : topic.imageEn] || stressEn;

  const handleCardClick = () => {
    window.open(topic.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-foreground ${isRTL ? 'font-cairo' : ''}`}>
            {t("weeklyTopic.title")}
          </h2>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <Card 
            className="overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={handleCardClick}
            role="link"
            tabIndex={0}
            aria-label={isArabic ? topic.altAr : topic.altEn}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleCardClick();
            }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img 
                src={imageSrc}
                alt={isArabic ? topic.altAr : topic.altEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className={`p-4 md:p-6 bg-card ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
              <h3 className={`text-xl md:text-2xl font-semibold text-foreground mb-2 ${isRTL ? 'font-cairo' : ''}`}>
                {isArabic ? topic.titleAr : topic.titleEn}
              </h3>
              <p className={`text-sm md:text-base text-muted-foreground leading-relaxed ${isRTL ? 'font-cairo' : ''}`}>
                {isArabic ? topic.subtitleAr : topic.subtitleEn}
              </p>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <button 
            className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-md hover:shadow-lg px-6 py-3 rounded-md font-medium ${isRTL ? 'flex-row-reverse' : ''}`}
            onClick={() => window.open(topic.instagramUrl, '_blank', 'noopener,noreferrer')}
          >
            <Instagram className="w-5 h-5" />
            {t("weeklyTopic.learnMoreInstagram")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopicOfTheWeekSection;
