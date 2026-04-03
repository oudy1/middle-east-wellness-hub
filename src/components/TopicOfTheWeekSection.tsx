import { Card } from "@/components/ui/card";
import { Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import stressEn from "@/assets/stress-mental-health-en.png";
import stressAr from "@/assets/stress-mental-health-ar.png";

const TopicOfTheWeekSection = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const topic = {
    titleEn: "Stress & Mental Health During Exams",
    titleAr: "التوتر والصحة النفسية خلال فترة الامتحانات",
    subtitleEn: "This week's focus highlights stress management and mental health support for students during exam periods, with tips and resources relevant to Middle Eastern and North African communities in Canada.",
    subtitleAr: "يسلّط موضوع هذا الأسبوع الضوء على إدارة التوتر ودعم الصحة النفسية للطلاب خلال فترة الامتحانات، مع نصائح وموارد ذات صلة بالمجتمعات الشرق أوسطية وشمال أفريقيا في كندا.",
    altEn: "Stress & Mental Health During Exams - SHAMS weekly topic",
    altAr: "التوتر والصحة النفسية خلال فترة الامتحانات - موضوع الأسبوع من شمس",
    instagramUrl: "https://www.instagram.com/p/DWrkD5-GInT/"
  };

  const handleCardClick = () => {
    window.open(topic.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-foreground ${isArabic ? 'font-cairo' : ''}`}>
            {isArabic ? 'موضوع الأسبوع' : 'Weekly Topic'}
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
              if (e.key === 'Enter' || e.key === ' ') {
                handleCardClick();
              }
            }}
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <img 
                src={isArabic ? stressAr : stressEn}
                alt={isArabic ? topic.altAr : topic.altEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            
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
