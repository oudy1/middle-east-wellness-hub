
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TopicRequestForm from "@/components/TopicRequestForm";

const Webinars = () => {
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray">
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("webinars.title")}</h1>
              <p className="text-lg text-gray-600">
                {t("webinars.subtitle")}
              </p>
            </div>
            
            {/* Coming Soon Section */}
            <div className="text-center mb-12">
              <Card className="overflow-hidden border-none shadow-md relative max-w-md mx-auto">
                <div className="bg-healthDarkBlue p-8 flex flex-col items-center justify-center">
                  <Play className="h-16 w-16 text-white mb-4 opacity-50" />
                  <h3 className="text-2xl font-bold text-white mb-2">Webinars</h3>
                  <Badge className="bg-healthGold text-healthDarkBlue text-lg px-4 py-2">
                    Coming Soon
                  </Badge>
                </div>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600 text-lg">
                    We're preparing amazing webinars for our community. Stay tuned for updates!
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Topic Request Section */}
            <div className="bg-white p-8 rounded-lg shadow-md mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-healthDarkBlue">
                {t("webinars.requestTitle")}
              </h2>
              <p className="mb-8 text-center text-gray-600">
                {t("webinars.requestDesc")}
              </p>
              <TopicRequestForm />
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-healthLightGray rounded-lg">
                <div className="mb-4 md:mb-0 md:mr-6">
                  <h3 className="text-xl font-semibold mb-2">{t("webinars.upcomingTitle")}</h3>
                  <p>{t("webinars.upcomingDesc")}</p>
                </div>
                <Button className="bg-healthTeal hover:bg-teal-700 text-white">
                  {t("webinars.viewSchedule")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Webinars;
