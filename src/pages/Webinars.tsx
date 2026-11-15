
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import WebinarSlidesViewer from "@/components/WebinarSlidesViewer";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Mail, Globe, FileText, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TopicRequestForm from "@/components/TopicRequestForm";
import { useHashScroll } from "@/hooks/useHashScroll";
import YouTubePlayer from "@/components/YouTubePlayer";
import { RECORDINGS } from "@/lib/events";

const Webinars = () => {
  const { language, t } = useLanguage();
  const [webinarLang, setWebinarLang] = useState<'en' | 'ar'>(language === 'ar' ? 'ar' : 'en');
  useEffect(() => {
    setWebinarLang(language === 'ar' ? 'ar' : 'en');
  }, [language]);
  useHashScroll();

  // Published recordings only; dates of event recordings come from content/events.json.
  const webinars = RECORDINGS;

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray">
      <SEOHead
        lang={language === "ar" ? "ar" : "en"}
        path="/recordings"
        title="Webinars and Recordings | SHAMS"
        description="Watch SHAMS webinars on health, research, women's health, diabetes, nutrition, and community education for Middle Eastern and Arab societies in Canada."
        titleAr="الندوات والتسجيلات | شمس"
        descriptionAr="شاهد ندوات شمس حول الصحة، البحث، صحة المرأة، السكري، التغذية، والتثقيف المجتمعي للمجتمعات الشرق أوسطية والعربية في كندا."
      />
      <Header />
      <main id="main-content" className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("webinars.title")}</h1>
              <p className="text-lg text-gray-600">
                {t("webinars.subtitle")}
              </p>
            </div>
            
            {/* Webinar Cards */}
            {webinars.map((webinar) => (
              <div key={webinar.id} id={`webinar-${webinar.id}`} className="max-w-5xl mx-auto mb-16 scroll-mt-24">
                <Card className="overflow-hidden border-none shadow-lg">
                  {/* Language Toggle */}
                  <div className="bg-healthDarkBlue p-4 flex justify-center gap-2" dir="ltr">
                    <Button
                      variant={webinarLang === 'en' ? 'default' : 'ghost'}
                      onClick={() => setWebinarLang('en')}
                      aria-pressed={webinarLang === 'en'}
                      lang="en"
                      className={webinarLang === 'en' ? 'bg-healthGold text-healthDarkBlue hover:bg-healthGold/90' : 'text-white hover:bg-white/10'}
                    >
                      English
                    </Button>
                    <Button
                      variant={webinarLang === 'ar' ? 'default' : 'ghost'}
                      onClick={() => setWebinarLang('ar')}
                      aria-pressed={webinarLang === 'ar'}
                      lang="ar"
                      className={webinarLang === 'ar' ? 'bg-healthGold text-healthDarkBlue hover:bg-healthGold/90' : 'text-white hover:bg-white/10'}
                    >
                      العربية
                    </Button>
                  </div>

                  <CardContent className="p-0">
                    {/* YouTube Embed - only show if youtubeId exists */}
                    {webinar.youtubeId ? (
                      <YouTubePlayer videoId={webinar.youtubeId} title={webinar[webinarLang].title} lang={webinarLang} />
                    ) : webinar.id === "womens-health" ? (
                      <WebinarSlidesViewer embedded />
                    ) : null}

                    {/* Webinar Details */}
                    <div className={`p-8 ${webinarLang === 'ar' ? 'text-right font-cairo' : 'text-left'}`} dir={webinarLang === 'ar' ? 'rtl' : 'ltr'}>
                      <h2 className="text-3xl font-bold text-healthDarkBlue mb-4">
                        {webinar[webinarLang].title}
                      </h2>

                      {/* Date & Time (if available) */}
                      {(webinarLang === 'ar' ? webinar.dateAr ?? webinar.date : webinar.date) && (
                        <div className={`flex items-center gap-2 text-muted-foreground mb-6`}>
                          <Calendar className="h-5 w-5" />
                          <span className="font-semibold">{webinarLang === 'ar' ? webinar.dateAr ?? webinar.date : webinar.date}</span>
                        </div>
                      )}

                      {/* Tags */}
                      <div className={`flex flex-wrap gap-2 mb-6`}>
                        {((webinarLang === 'ar' ? (webinar as any).tagsAr : null) ?? webinar.tags).map((tag: string) => (
                          <Badge key={tag} className="bg-healthTeal text-white">{tag}</Badge>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line" style={{ maxWidth: '65ch', lineHeight: '1.6' }}>
                        {webinar[webinarLang].description}
                      </p>

                      {(webinar[webinarLang] as any).topics && (
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-healthDarkBlue mb-3">
                            {webinarLang === 'ar' ? 'المواضيع' : 'Topics Covered'}
                          </h3>
                          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                            {((webinar[webinarLang] as any).topics as string[]).map((tp) => (
                              <li key={tp} className="text-muted-foreground flex items-start gap-2">
                                <span className="text-healthTeal">•</span>
                                <span>{tp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

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
                      <div className={`flex flex-wrap gap-2 mb-8`}>
                        {webinar.youtubeId && (
                          <Button asChild className="bg-healthDarkBlue hover:bg-healthDarkBlue/90 text-white min-h-[44px]">
                            <a href={`https://www.youtube.com/watch?v=${webinar.youtubeId}`} target="_blank" rel="noopener noreferrer">
                              <Play className="me-2 h-4 w-4" aria-hidden="true" />
                              {webinar[webinarLang].watchButton}
                            </a>
                          </Button>
                        )}
                        {(webinar as any).slidesUrl && (
                          <Button asChild variant="outline" className="gap-1.5">
                            <a href={(webinar as any).slidesUrl} target="_blank" rel="noopener noreferrer">
                              <FileText className="h-4 w-4" />
                              {webinarLang === 'ar' ? 'عرض الشرائح' : 'View Slides'}
                            </a>
                          </Button>
                        )}
                        {(webinar as any).resourcesUrl && (
                          <Button asChild variant="outline" className="gap-1.5">
                            <a href={(webinar as any).resourcesUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                              {webinarLang === 'ar' ? 'عرض الموارد' : 'View Resources'}
                            </a>
                          </Button>
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
                            className={`flex items-center gap-2 text-healthTeal hover:underline`}
                          >
                            <Globe className="h-4 w-4" />
                            <span>www.projectshams.com</span>
                          </a>
                          <a 
                            href="mailto:infoprojectshams@gmail.com"
                            className={`flex items-center gap-2 text-healthTeal hover:underline`}
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
            <div id="topic-request" className="bg-white p-8 rounded-lg shadow-md mb-12 scroll-mt-24 md:scroll-mt-32">
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
