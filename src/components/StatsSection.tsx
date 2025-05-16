
import { useLanguage } from "@/contexts/LanguageContext";

const StatsSection = () => {
  const { t } = useLanguage();
  
  const stats = [
    { value: "50+", label: t("stats.researchProjects") },
    { value: "25", label: t("stats.partnerHospitals") },
    { value: "10k+", label: t("stats.patientsServed") },
    { value: "5", label: t("stats.countries") }
  ];

  return (
    <section className="py-16 bg-healthDarkBlue text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-15"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-healthDarkBlue/90 via-healthDarkBlue to-healthDarkBlue/90"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t("stats.title")}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 relative">
              {/* Arabic calligraphy styling behind each stat */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <span className="font-arabic text-6xl text-healthGold">
                  {["الصحة", "الطب", "الرعاية", "العافية"][index % 4]}
                </span>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-healthGold mb-2 relative z-10">{stat.value}</div>
              <div className="text-lg text-healthLightGray relative z-10">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
