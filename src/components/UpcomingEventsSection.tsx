
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const UpcomingEventsSection = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <section className="py-12 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <Card className="overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className={`p-5 md:p-6 ${isArabic ? 'font-cairo' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
              <div className="text-center space-y-3">
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  {isArabic ? 'تسجيل ندوة' : 'Recorded Webinar'}
                </Badge>
                
                <h3 className="text-lg md:text-xl font-bold text-foreground">
                  {isArabic ? 'شاهد تسجيل الندوة' : 'Watch the Webinar Recording'}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {isArabic 
                    ? 'من الشرق إلى الغرب: التغذية والسكري بعد الهجرة' 
                    : 'East to West: Nutrition & Diabetes Post-Immigration'}
                </p>

                <Button 
                  size="default"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm mt-2"
                  onClick={() => navigate('/webinars')}
                >
                  <Play className={`w-4 h-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                  {isArabic ? 'شاهد الآن' : 'Watch Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
