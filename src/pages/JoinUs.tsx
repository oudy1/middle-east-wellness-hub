import React from 'react';
import { Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, ExternalLink, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScOQ9BciASkaPC6PogtbdeN1NvnuUDJpdjh9Uqtexcwjf-waw/viewform";

const JoinUs = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const content = {
    en: {
      heroTitle: "Join Our Mission",
      heroDescription: "Help us improve healthcare access and advocacy for Middle Eastern and North African communities. Together, we can create meaningful change and build a more inclusive healthcare system.",
      ctaTitle: "Volunteer with SHAMS",
      ctaLine1: "Fill out our volunteer application. It takes 2 to 3 minutes.",
      ctaLine2: "After you submit, our team will follow up by email.",
      primaryButton: "Apply to Volunteer",
      secondaryButton: "Contact us",
    },
    ar: {
      heroTitle: "انضم إلى مهمتنا",
      heroDescription: "ساعدنا في تحسين الوصول إلى الرعاية الصحية والمناصرة لمجتمعات الشرق الأوسط وشمال أفريقيا. معاً، يمكننا إحداث تغيير هادف وبناء نظام صحي أكثر شمولاً.",
      ctaTitle: "تطوع مع SHAMS",
      ctaLine1: "عبئ نموذج التطوع. يأخذ حوالي 2 إلى 3 دقائق.",
      ctaLine2: "بعد الإرسال، سيتواصل معك فريقنا عبر البريد الإلكتروني.",
      primaryButton: "قدم للتطوع",
      secondaryButton: "تواصل معنا",
    },
  };

  const t = isArabic ? content.ar : content.en;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow" dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Hero Section */}
        <section className="bg-healthDarkBlue text-white py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <Users className="h-14 w-14 md:h-16 md:w-16 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto px-2 leading-relaxed opacity-90">
              {t.heroDescription}
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
                    {t.ctaTitle}
                  </h2>
                  <p className="text-muted-foreground mb-2">
                    {t.ctaLine1}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {t.ctaLine2}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-healthTeal hover:bg-healthTeal/90 text-white gap-2"
                    >
                      <Link to="/volunteer">
                        <ExternalLink className="h-4 w-4" />
                        {t.primaryButton}
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
                        {t.secondaryButton}
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
