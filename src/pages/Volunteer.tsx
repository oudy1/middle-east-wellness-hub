import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScOQ9BciASkaPC6PogtbdeN1NvnuUDJpdjh9Uqtexcwjf-waw/viewform";

const Volunteer = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const content = {
    en: {
      title: "Volunteer Application",
      fallbackText: "If the form doesn't load, you can open it in a new tab:",
      fallbackButton: "Open the form in a new tab",
      loading: "Loading application form...",
    },
    ar: {
      title: "طلب التطوع",
      fallbackText: "إذا لم يتم تحميل النموذج، يمكنك فتحه في نافذة جديدة:",
      fallbackButton: "افتح النموذج في نافذة جديدة",
      loading: "جارٍ تحميل نموذج الطلب...",
    },
  };

  const t = isArabic ? content.ar : content.en;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow" dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Header Section */}
        <section className="bg-healthDarkBlue text-white py-8 md:py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {t.title}
            </h1>
          </div>
        </section>

        {/* Fallback Button */}
        <section className="py-4 md:py-6 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className={`flex flex-col sm:flex-row items-center gap-3 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
              <p className="text-muted-foreground text-sm">
                {t.fallbackText}
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t.fallbackButton}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Embedded Google Form */}
        <section className="py-6 md:py-8">
          <div className="container mx-auto px-4">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
              <iframe
                src={GOOGLE_FORM_URL}
                title={t.title}
                className="w-full border-0"
                style={{
                  minHeight: '900px',
                  height: 'calc(100vh - 300px)',
                }}
                loading="lazy"
              >
                {t.loading}
              </iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Volunteer;
