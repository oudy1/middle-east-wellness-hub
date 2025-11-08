import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Globe, DollarSign, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import eventPoster from "@/assets/east-to-west-webinar.jpg";

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

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            {language === 'ar' ? 'الفعالية القادمة لمشروع شمس' : 'Upcoming SHAMS Event'}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2 border-border/50 shadow-lg">
            {/* Event Poster */}
            <div className="flex justify-center bg-muted/20 p-6 md:p-8">
              <img 
                src={eventPoster} 
                alt="SHAMS event poster"
                className="w-full max-w-[420px] md:max-w-[520px] lg:max-w-[620px] h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </div>

            <CardContent className="p-6 md:p-8">
              {/* Bilingual Tabs */}
              <Tabs defaultValue={language === 'ar' ? 'arabic' : 'english'} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="arabic">العربية</TabsTrigger>
                </TabsList>

                {/* English Content */}
                <TabsContent value="english" className="space-y-5">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      {eventData.titleEn}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{eventData.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{eventData.timeEn}</span>
                      </div>
                    </div>

                    <p className="text-base leading-relaxed mb-3 text-muted-foreground">
                      {eventData.descEn}
                    </p>

                    <p className="text-sm text-muted-foreground italic">
                      <strong>Speakers:</strong> {eventData.speakersEn}
                    </p>
                  </div>
                </TabsContent>

                {/* Arabic Content */}
                <TabsContent value="arabic" className="space-y-5" dir="rtl">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground font-cairo">
                      {eventData.titleAr}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-muted-foreground font-cairo">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{eventData.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{eventData.timeAr}</span>
                      </div>
                    </div>

                    <p className="text-base leading-relaxed mb-3 text-muted-foreground font-cairo">
                      {eventData.descAr}
                    </p>

                    <p className="text-sm text-muted-foreground italic font-cairo">
                      <strong>المتحدثون:</strong> {eventData.speakersAr}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Sign Up Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-6">
                <Button 
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => window.open(eventData.registrationUrl, '_blank', 'noopener')}
                >
                  {language === 'ar' ? 'التسجيل' : 'Sign Up'}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open(eventData.registrationUrl, '_blank', 'noopener')}
                >
                  {language === 'ar' ? 'سجل الآن' : 'Register Now'}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Quick Facts Pills */}
              <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-border/50">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {language === 'ar' ? 'مجاني' : 'Free'}
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <Globe className="w-4 h-4 mr-1" />
                  {language === 'ar' ? 'افتراضي' : 'Online'}
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  {language === 'ar' ? 'ثنائي اللغة' : 'Bilingual'}
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

