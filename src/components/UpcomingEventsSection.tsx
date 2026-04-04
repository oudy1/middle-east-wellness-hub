import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const UpcomingEventsSection = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar' || language === 'ku' || language === 'fa';

  return (
    <section className="py-12 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <Card className="overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className={`p-5 md:p-6 ${isRTL ? 'font-cairo' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="text-center space-y-3">
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  {t("events.recordedWebinar")}
                </Badge>
                
                <h3 className="text-lg md:text-xl font-bold text-foreground">
                  {t("events.watchRecording")}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {t("events.nutritionWebinar")}
                </p>

                <Button 
                  size="default"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm mt-2"
                  onClick={() => navigate('/webinars')}
                >
                  <Play className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t("events.watchNow")}
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
