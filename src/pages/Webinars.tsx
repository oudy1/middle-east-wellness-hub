
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Mail, Instagram, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TopicRequestForm from "@/components/TopicRequestForm";

const Webinars = () => {
  const { language, t } = useLanguage();
  const [webinarLang, setWebinarLang] = useState<'en' | 'ar'>('en');

  const webinarData = {
    en: {
      title: "East to West: Nutrition & Diabetes Post-Immigration",
      description: "Immigrating to a new country brings major changes to food habits, lifestyle, stress, and overall health. This webinar explores how Middle Eastern and Arab families can navigate diabetes management and healthy nutrition after settling in Canada. The session includes practical, culturally relevant tips with a Q&A segment.",
      speakers: [
        "Dr. Muhammad Z. Shrayyef, Endocrinologist, Assistant Professor of Clinical Medicine — University of Toronto",
        "Hiba Al-Masri, Registered Dietitian"
      ],
      watchButton: "Watch Webinar"
    },
    ar: {
      title: "من الشرق إلى الغرب: التغذية والسكري بعد الهجرة",
      description: "تغيّر الهجرة العادات الغذائية، مستوى الضغط، والبيئة الصحية. تقدم هذه الندوة شرحًا بسيطًا وعمليًا لإدارة السكري والتغذية الصحية بعد الانتقال إلى كندا، مع نصائح مناسبة للعائلات العربية والشرق أوسطية وفقرة للأسئلة والأجوبة.",
      speakers: [
        "الدكتور محمد شريّف — استشاري الغدد الصماء، أستاذ مساعد بجامعة تورونتو",
        "هيبا المصري — أخصائية تغذية مسجّلة"
      ],
      watchButton: "شاهد الندوة"
    }
  };

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
            
            {/* Featured Webinar */}
            <div className="max-w-5xl mx-auto mb-16">
              <Card className="overflow-hidden border-none shadow-lg">
                {/* Language Toggle */}
                <div className="bg-healthDarkBlue p-4 flex justify-center gap-2">
                  <Button
                    variant={webinarLang === 'en' ? 'default' : 'ghost'}
                    onClick={() => setWebinarLang('en')}
                    className={webinarLang === 'en' ? 'bg-healthGold text-healthDarkBlue hover:bg-healthGold/90' : 'text-white hover:bg-white/10'}
                  >
                    English
                  </Button>
                  <Button
                    variant={webinarLang === 'ar' ? 'default' : 'ghost'}
                    onClick={() => setWebinarLang('ar')}
                    className={webinarLang === 'ar' ? 'bg-healthGold text-healthDarkBlue hover:bg-healthGold/90' : 'text-white hover:bg-white/10'}
                  >
                    العربية
                  </Button>
                </div>

                <CardContent className="p-0">
                  {/* YouTube Embed */}
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/veBBeJx_3HI"
                      title="East to West: Nutrition & Diabetes Post-Immigration"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Webinar Details */}
                  <div className={`p-8 ${webinarLang === 'ar' ? 'text-right font-cairo' : 'text-left'}`} dir={webinarLang === 'ar' ? 'rtl' : 'ltr'}>
                    <h2 className="text-3xl font-bold text-healthDarkBlue mb-4">
                      {webinarData[webinarLang].title}
                    </h2>

                    {/* Date & Time */}
                    <div className={`flex items-center gap-2 text-gray-600 mb-6 ${webinarLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Calendar className="h-5 w-5" />
                      <span className="font-semibold">November 26, 2025 — 7:00 PM EST</span>
                    </div>

                    {/* Tags */}
                    <div className={`flex flex-wrap gap-2 mb-6 ${webinarLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Badge className="bg-healthTeal text-white">Diabetes</Badge>
                      <Badge className="bg-healthTeal text-white">Nutrition</Badge>
                      <Badge className="bg-healthTeal text-white">Immigration</Badge>
                      <Badge className="bg-healthTeal text-white">Newcomer Health</Badge>
                      <Badge className="bg-healthTeal text-white">Middle Eastern Societies</Badge>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-6" style={{ maxWidth: '65ch', lineHeight: '1.6' }}>
                      {webinarData[webinarLang].description}
                    </p>

                    {/* Speakers */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-healthDarkBlue mb-3">
                        {webinarLang === 'ar' ? 'المتحدثون' : 'Speakers'}
                      </h3>
                      <ul className={`space-y-2 ${webinarLang === 'ar' ? 'text-right' : 'text-left'}`}>
                        {webinarData[webinarLang].speakers.map((speaker, idx) => (
                          <li key={idx} className="text-gray-700 flex items-start gap-2">
                            <span className="text-healthTeal">•</span>
                            <span>{speaker}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Watch Button */}
                    <Button 
                      className="bg-healthDarkBlue hover:bg-healthDarkBlue/90 text-white mb-8"
                      onClick={() => window.open('https://youtu.be/veBBeJx_3HI', '_blank')}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {webinarData[webinarLang].watchButton}
                    </Button>

                    {/* Contact Info */}
                    <div className="border-t pt-6 mt-6">
                      <h4 className="text-lg font-semibold text-healthDarkBlue mb-4">
                        {webinarLang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                      </h4>
                      <div className={`space-y-3 ${webinarLang === 'ar' ? 'text-right' : 'text-left'}`}>
                        <a 
                          href="https://www.projectshams.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 text-healthTeal hover:underline ${webinarLang === 'ar' ? 'flex-row-reverse' : ''}`}
                        >
                          <Globe className="h-4 w-4" />
                          <span>www.projectshams.com</span>
                        </a>
                        <a 
                          href="https://instagram.com/projectshams" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 text-healthTeal hover:underline ${webinarLang === 'ar' ? 'flex-row-reverse' : ''}`}
                        >
                          <Instagram className="h-4 w-4" />
                          <span>@projectshams</span>
                        </a>
                        <a 
                          href="mailto:infoprojectshams@gmail.com"
                          className={`flex items-center gap-2 text-healthTeal hover:underline ${webinarLang === 'ar' ? 'flex-row-reverse' : ''}`}
                        >
                          <Mail className="h-4 w-4" />
                          <span>infoprojectshams@gmail.com</span>
                        </a>
                      </div>
                    </div>
                  </div>
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Webinars;
