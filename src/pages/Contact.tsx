
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-healthDarkBlue">
                {t("contact.title")}
              </h1>
              <p className="text-lg text-gray-600">
                {t("contact.subtitle")}
              </p>
            </div>

            <div className="max-w-lg mx-auto">
              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-healthDarkBlue">{t("contact.getInTouch")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-healthTeal/10 rounded-lg">
                        <Mail className="h-5 w-5 text-healthTeal" />
                      </div>
                      <div>
                        <p className="font-medium">{t("contact.email")}</p>
                        <p className="text-gray-600">infoprojectshams@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-healthTeal/10 rounded-lg">
                        <MapPin className="h-5 w-5 text-healthTeal" />
                      </div>
                      <div>
                        <p className="font-medium">{t("contact.location")}</p>
                        <p className="text-gray-600">{t("contact.toronto")}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-healthTeal/10 rounded-lg">
                        <Instagram className="h-5 w-5 text-healthTeal" />
                      </div>
                      <div>
                        <p className="font-medium">Instagram</p>
                        <a 
                          href="https://www.instagram.com/projectshams/" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-healthTeal transition-colors"
                        >
                          @projectshams
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
