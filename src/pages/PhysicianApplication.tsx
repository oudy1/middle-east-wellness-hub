
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhysicianApplicationForm from "@/components/PhysicianApplicationForm";
import { useLanguage } from "@/contexts/LanguageContext";

const PhysicianApplication = () => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-healthDarkBlue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Physician Network
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Partner with SHAMS to provide culturally competent healthcare to Middle Eastern communities. 
              Together, we can bridge the gap between healthcare providers and the communities we serve.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-healthDarkBlue">
              Why Join Our Network?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="bg-healthTeal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-healthTeal">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-healthDarkBlue">Professional Development</h3>
                <p className="text-gray-600">
                  Access to continuing education, cultural competency training, and research opportunities.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-healthTeal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-healthTeal">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-healthDarkBlue">Community Impact</h3>
                <p className="text-gray-600">
                  Make a meaningful difference in the health outcomes of underserved Middle Eastern populations.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-healthTeal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-healthTeal">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-healthDarkBlue">Network Growth</h3>
                <p className="text-gray-600">
                  Connect with like-minded healthcare professionals and expand your referral network.
                </p>
              </div>
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
