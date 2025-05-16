
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16 md:py-24 bg-healthLightGray">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-healthDarkBlue mb-6">{t("notFound.title")}</h1>
          <p className="text-2xl text-gray-600 mb-8">{t("notFound.subtitle")}</p>
          <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
            {t("notFound.description")}
          </p>
          <Button asChild className="bg-healthTeal hover:bg-teal-600">
            <a href="/">{t("notFound.returnHome")}</a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
