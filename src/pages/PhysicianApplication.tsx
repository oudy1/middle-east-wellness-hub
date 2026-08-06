
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhysicianApplicationForm from "@/components/PhysicianApplicationForm";
import { useLanguage } from "@/contexts/LanguageContext";

const benefitKeys = [
  { id: 1, titleKey: "physicianApply.benefit1Title", descKey: "physicianApply.benefit1Desc" },
  { id: 2, titleKey: "physicianApply.benefit2Title", descKey: "physicianApply.benefit2Desc" },
  { id: 3, titleKey: "physicianApply.benefit3Title", descKey: "physicianApply.benefit3Desc" },
];

const PhysicianApplication = () => {
  const { language, t } = useLanguage();
  const isRTL = language === "ar" || language === "fa" || language === "ku";

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray" dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section className="bg-healthDarkBlue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("physicianApply.heroTitle")}
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {t("physicianApply.heroDescription")}
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-healthDarkBlue">
              {t("physicianApply.benefitsTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {benefitKeys.map((benefit) => (
                <div key={benefit.id} className="text-center">
                  <div className="bg-healthTeal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-healthTeal">{benefit.id}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-healthDarkBlue">
                    {t(benefit.titleKey)}
                  </h3>
                  <p className="text-gray-600">
                    {t(benefit.descKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <PhysicianApplicationForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PhysicianApplication;
