import { Card } from "@/components/ui/card";
import { Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import womensHealthEn from "@/assets/womens-health-en.png";
import womensHealthAr from "@/assets/womens-health-ar.png";

const TopicOfTheWeekSection = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const topic = {
    titleEn: "Women's Health",
    titleAr: "صحة المرأة",
    subtitleEn: "This week's focus highlights women's health issues, including visible and invisible conditions, access to care, and culturally relevant health experiences within Middle Eastern and North African societies in Canada.",
    subtitleAr: "يسلّط موضوع هذا الأسبوع الضوء على صحة المرأة، بما في ذلك الحالات الظاهرة وغير الظاهرة، وإمكانية الوصول إلى الرعاية الصحية، والتجارب الصحية ذات الصلة الثقافية داخل المجتمعات الشرق أوسطية وشمال أفريقيا في كندا.",
    altEn: "Women's Health — SHAMS weekly topic featuring a woman in hijab with floral design",
    altAr: "صحة المرأة — موضوع الأسبوع من شمس يظهر امرأة محجبة مع تصميم الأزهار",
    instagramUrl: "https://www.instagram.com/p/DTlmPHtD_fD/"
  };

  const handleCardClick = () => {
    window.open(topic.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-foreground ${isArabic ? 'font-cairo' : ''}`}>
            {isArabic ? 'موضوع الأسبوع' : 'Weekly Topic'}
          </h2>
        </div>

        {/* Topic Card */}
        <div className="max-w-xl mx-auto mb-12">
          <Card 
            className="overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={handleCardClick}
            role="link"
            tabIndex={0}
            aria-label={isArabic ? topic.altAr : topic.altEn}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCardClick();
              }
            }}
          >
            {/* Square Image Container */}
            <div className="relative aspect-square w-full overflow-hidden">
              <img 
                src={isArabic ? womensHealthAr : womensHealthEn}
                alt={isArabic ? topic.altAr : topic.altEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            
            {/* Text Content */}
            <div className={`p-4 md:p-6 bg-card ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
              <h3 className={`text-xl md:text-2xl font-semibold text-foreground mb-2 ${isArabic ? 'font-cairo' : ''}`}>
                {isArabic ? topic.titleAr : topic.titleEn}
              </h3>
              <p className={`text-sm md:text-base text-muted-foreground leading-relaxed ${isArabic ? 'font-cairo' : ''}`}>
                {isArabic ? topic.subtitleAr : topic.subtitleEn}
              </p>
            </div>
          </Card>
        </div>

        {/* Instagram CTA Button */}
        <div className="text-center">
          <button 
            className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-md hover:shadow-lg px-6 py-3 rounded-md font-medium ${isArabic ? 'flex-row-reverse' : ''}`}
            onClick={() => window.open(topic.instagramUrl, '_blank', 'noopener,noreferrer')}
          >
            <Instagram className="w-5 h-5" />
            {isArabic ? 'تعرّفوا أكثر على إنستغرام' : 'Learn More on Instagram'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopicOfTheWeekSection;
