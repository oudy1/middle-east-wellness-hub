import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Globe, DollarSign, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import eventPosterEn from "@/assets/east-to-west-webinar.jpg";
import eventPosterAr from "@/assets/east-to-west-webinar-ar.jpg";

const UpcomingEventsSection = () => {
  const { language } = useLanguage();

  const eventData = {
    titleEn: "East to West: Nutrition and Diabetes Post-Immigration",
    titleAr: "من الشرق إلى الغرب: التغذية والسكري بعد الهجرة",
    date: "Nov 26",
    timeEn: "7:00 PM EST",
    timeAr: "7:00 مساءً بتوقيت شرق كندا",
    speakersEn: "Dr. Muhammad Z. Shrayyef, Endocrinologist • Hiba Al-Masri, Registered Dietitian",
    speakersAr: "الدكتور محمد ز. شريّف، طبيب الغدد الصماء • هبة المصري، أخصائية تغذية مسجلة",
    descEn: "A friendly session on eating well and managing diabetes after moving to Canada. Practical tips and Q&A for you and your family.",
    descAr: "جلسة ودّية حول التغذية الجيدة وإدارة السكري بعد الهجرة إلى كندا. نصائح عملية وأسئلة وأجوبة لك ولعائلتك.",
    registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSco8Gp1Oy7nGm-nPqtlqZ1dS9K997_Y-YIquy5HYTsBVFlFhA/viewform?usp=header"
  };

  const isArabic = language === 'ar';
  const currentPoster = isArabic ? eventPosterAr : eventPosterEn;

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-foreground ${isArabic ? 'font-cairo' : ''}`}>
            {isArabic ? 'الفعالية القادمة لمشروع شمس' : 'Upcoming SHAMS Event'}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2 border-border/50 shadow-lg">
            {/* Event Poster - Auto-switches based on language */}
            <div className="flex justify-center bg-muted/20 p-6 md:p-8">
              <img 
                src={currentPoster} 
                alt={isArabic ? 'ملصق فعالية شمس' : 'SHAMS event poster'}
                className="w-full max-w-[420px] md:max-w-[480px] lg:max-w-[600px] h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </div>

            <CardContent className={`p-6 md:p-8 ${isArabic ? 'font-cairo' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
              {/* Event Content - Auto-switches based on language */}
              <div className="space-y-5 mb-6">
                <h3 className="text-2xl font-bold text-foreground">
                  {isArabic ? eventData.titleAr : eventData.titleEn}
                </h3>
                
                <div className={`flex flex-wrap gap-4 text-muted-foreground ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{eventData.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{isArabic ? eventData.timeAr : eventData.timeEn}</span>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-muted-foreground">
                  {isArabic ? eventData.descAr : eventData.descEn}
                </p>

                <p className="text-sm text-muted-foreground italic">
                  <strong>{isArabic ? 'المتحدثون:' : 'Speakers:'}</strong> {isArabic ? eventData.speakersAr : eventData.speakersEn}
                </p>
              </div>

              {/* Single Sign Up Button */}
              <div className="mb-6">
                <Button 
                  size="lg"
                  className="w-full bg-[#F36F21] hover:bg-[#D85E15] text-white shadow-md"
                  onClick={() => window.open(eventData.registrationUrl, '_blank', 'noopener')}
                >
                  {isArabic ? 'التسجيل' : 'Sign Up'}
                  <ExternalLink className={`w-4 h-4 ${isArabic ? 'mr-2' : 'ml-2'}`} />
                </Button>
              </div>

              {/* Quick Facts Pills */}
              <div className={`flex flex-wrap justify-center gap-3 pt-4 border-t border-border/50 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <DollarSign className={`w-4 h-4 ${isArabic ? 'ml-1' : 'mr-1'}`} />
                  {isArabic ? 'مجاني' : 'Free'}
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <Globe className={`w-4 h-4 ${isArabic ? 'ml-1' : 'mr-1'}`} />
                  {isArabic ? 'افتراضي' : 'Online'}
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  {isArabic ? 'ثنائي اللغة' : 'Bilingual'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;

