
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Webinars = () => {
  const { language, t } = useLanguage();
  
  const webinarsData = [
    {
      title: language === 'en' ? 
        "Understanding Diabetes in Middle Eastern Populations" : 
        "فهم مرض السكري في مجتمعات الشرق الأوسط",
      presenter: language === 'en' ? "Dr. Sarah Mahmoud" : "د. سارة محمود",
      date: language === 'en' ? "April 15, 2025" : "١٥ أبريل ٢٠٢٥",
      duration: language === 'en' ? "45 minutes" : "٤٥ دقيقة",
      description: language === 'en' ? 
        "An in-depth look at diabetes prevalence, risk factors, and management strategies specific to Middle Eastern communities." : 
        "نظرة متعمقة في انتشار مرض السكري وعوامل الخطر واستراتيجيات الإدارة الخاصة بمجتمعات الشرق الأوسط."
    },
    {
      title: language === 'en' ? 
        "Mental Health Awareness: Breaking Cultural Stigmas" : 
        "الوعي بالصحة النفسية: كسر وصمة العار الثقافية",
      presenter: language === 'en' ? "Dr. Amir Hassan" : "د. أمير حسن",
      date: language === 'en' ? "March 22, 2025" : "٢٢ مارس ٢٠٢٥",
      duration: language === 'en' ? "60 minutes" : "٦٠ دقيقة",
      description: language === 'en' ? 
        "Addressing mental health challenges in Middle Eastern communities and strategies for breaking down cultural barriers to care." : 
        "معالجة تحديات الصحة النفسية في مجتمعات الشرق الأوسط واستراتيجيات لكسر الحواجز الثقافية للرعاية."
    },
    {
      title: language === 'en' ? 
        "Cardiovascular Health: Prevention Strategies" : 
        "صحة القلب والأوعية الدموية: استراتيجيات الوقاية",
      presenter: language === 'en' ? "Dr. Leila Nassar" : "د. ليلى نصار",
      date: language === 'en' ? "February 10, 2025" : "١٠ فبراير ٢٠٢٥",
      duration: language === 'en' ? "50 minutes" : "٥٠ دقيقة",
      description: language === 'en' ? 
        "Essential information about heart health with culturally relevant dietary and lifestyle recommendations." : 
        "معلومات أساسية عن صحة القلب مع توصيات غذائية ونمط حياة مناسبة ثقافياً."
    },
    {
      title: language === 'en' ? 
        "Women's Health: Cultural Considerations in Care" : 
        "صحة المرأة: اعتبارات ثقافية في الرعاية",
      presenter: language === 'en' ? "Dr. Fatima Al-Zahrani" : "د. فاطمة الزهراني",
      date: language === 'en' ? "January 18, 2025" : "١٨ يناير ٢٠٢٥",
      duration: language === 'en' ? "55 minutes" : "٥٥ دقيقة",
      description: language === 'en' ? 
        "Exploring women's health topics with sensitivity to cultural contexts and traditions." : 
        "استكشاف مواضيع صحة المرأة مع مراعاة للسياقات الثقافية والتقاليد."
    }
  ];

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {webinarsData.map((webinar, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md">
                  <div className="bg-healthDarkBlue p-6 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{webinar.title}</h3>
                    <Button variant="outline" size="icon" className="rounded-full bg-white hover:bg-healthTeal hover:text-white">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-healthTeal/10 text-healthTeal px-3 py-1 rounded-full text-sm">
                        {webinar.presenter}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {webinar.date}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {webinar.duration}
                      </span>
                    </div>
                    <p className="text-gray-600">{webinar.description}</p>
                    <Button variant="link" className="p-0 mt-4 text-healthTeal hover:text-healthDarkBlue">
                      {t("webinars.watchNow")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t("webinars.requestTitle")}</h2>
              <p className="mb-6">
                {t("webinars.requestDesc")}
              </p>
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
