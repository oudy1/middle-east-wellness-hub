import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, ExternalLink, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const JoinUs = () => {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar' || language === 'fa' || language === 'ku';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main id="main-content" className="flex-grow" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Hero Section */}
        <section className="bg-healthDarkBlue text-white py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <Users className="h-14 w-14 md:h-16 md:w-16 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              {t("joinUs.heroTitle")}
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto px-2 leading-relaxed opacity-90">
              {t("joinUs.heroDescription")}
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <Card className="border-2 border-healthTeal/20 shadow-lg">
                <CardContent className="p-6 md:p-8 text-center">
                  <Heart className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-4 text-healthTeal" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    {t("joinUs.ctaTitle")}
                  </h2>
                  <p className="text-muted-foreground mb-2">
                    {t("joinUs.ctaLine1")}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {t("joinUs.ctaLine2")}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-healthTeal hover:bg-healthTeal/90 text-white gap-2"
                    >
                      <Link to="/volunteer">
                        <ExternalLink className="h-4 w-4" />
                        {t("joinUs.primaryButton")}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="gap-2"
                    >
                      <Link to="/contact">
                        <Mail className="h-4 w-4" />
                        {t("joinUs.secondaryButton")}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JoinUs;
