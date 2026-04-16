
import React, { useState } from 'react';
import Header from "@/components/Header";
import WebinarSlidesViewer from "@/components/WebinarSlidesViewer";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Mail, Globe, FileText, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TopicRequestForm from "@/components/TopicRequestForm";
import webinarsData from "../../content/webinars.json";

const Webinars = () => {
  const { language, t } = useLanguage();
  const [webinarLang, setWebinarLang] = useState<'en' | 'ar'>('en');

  const webinars = webinarsData;

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
            
            {/* Women's Health Slides Viewer */}
            <WebinarSlidesViewer />

            {/* Webinar Cards */}
            {webinars.map((webinar) => (
              <div key={webinar.id} className="max-w-5xl mx-auto mb-16">
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
                    {/* YouTube Embed - only show if youtubeId exists */}
                    {webinar.youtubeId ? (
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${webinar.youtubeId}`}
                          title={webinar.en.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : null}

                    {/* Webinar Details */}
                    <div className={`p-8 ${webinarLang === 'ar' ? 'text-right font-cairo' : 'text-left'}`} dir={webinarLang === 'ar' ? 'rtl' : 'ltr'}>
                      <h2 className="text-3xl font-bold text-healthDarkBlue mb-4">
                        {webinar[webinarLang].title}
                      </h2>

                      {/* Date & Time (if available) */}
                      {webinar.date && (
                        <div className={`flex items-center gap-2 text-muted-foreground mb-6 ${webinarLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                          <Calendar className="h-5 w-5" />
                          <span className="font-semibold">{webinar.date}</span>
                        </div>
                      )}

                      {/* Tags */}
                      <div className={`flex flex-wrap gap-2 mb-6 ${webinarLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                        {webinar.tags.map((tag) => (
                          <Badge key={tag} className="bg-healthTeal text-white">{tag}</Badge>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line" style={{ maxWidth: '65ch', lineHeight: '1.6' }}>
                        {webinar[webinarLang].description}
                      </p>

                      {/* Speakers */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-healthDarkBlue mb-3">
                          {webinarLang === 'ar' ? 'المتحدثون' : 'Speakers'}
                        </h3>
                        <ul className={`space-y-2 ${webinarLang === 'ar' ? 'text-right' : 'text-left'}`}>
                          {webinar[webinarLang].speakers.map((speaker, idx) => (
                            <li key={idx} className="text-muted-foreground flex items-start gap-2">
                              <span className="text-healthTeal">•</span>
                              <span>{speaker}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className={`flex flex-wrap gap-2 mb-8 ${webinarLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                        {webinar.youtubeId && (
                          <Button 
                            className="bg-healthDarkBlue hover:bg-healthDarkBlue/90 text-white"
                            onClick={() => window.open(`https://youtu.be/${webinar.youtubeId}`, '_blank')}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            {webinar[webinarLang].watchButton}
                          </Button>
                        )}
                        {(webinar as any).slidesUrl && (
                          <a href={(webinar as any).slidesUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="gap-1.5">
                              <FileText className="h-4 w-4" />
                              {webinarLang === 'ar' ? 'عرض الشرائح' : 'View Slides'}
                            </Button>
                          </a>
                        )}
                        {(webinar as any).resourcesUrl && (
                          <a href={(webinar as any).resourcesUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="gap-1.5">
                              <ExternalLink className="h-4 w-4" />
                              {webinarLang === 'ar' ? 'عرض الموارد' : 'View Resources'}
                            </Button>
                          </a>
                        )}
                      </div>

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
            ))}
            
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
