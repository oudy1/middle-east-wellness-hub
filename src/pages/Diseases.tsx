
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Brain, Wind, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Diseases = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  
  const diseasesData = [
    {
      title: t("disease.diabetes"),
      description: t("disease.diabetesDesc"),
      icon: <Activity className="h-10 w-10 text-white" />,
      color: "bg-[hsl(184,100%,29%)]",
      hoverColor: "hover:shadow-[0_8px_30px_rgb(0,140,149,0.3)]",
      borderColor: "border-[hsl(184,100%,29%)]",
      textColor: "text-[hsl(184,100%,29%)]",
      link: "/services#diabetes-education",
      iconAlt: "Blood glucose icon for diabetes"
    },
    {
      title: t("disease.heartDisease"),
      description: t("disease.heartDiseaseDesc"),
      icon: <Heart className="h-10 w-10 text-white" />,
      color: "bg-[hsl(358,69%,43%)]",
      hoverColor: "hover:shadow-[0_8px_30px_rgb(178,31,36,0.3)]",
      borderColor: "border-[hsl(358,69%,43%)]",
      textColor: "text-[hsl(358,69%,43%)]",
      link: "/services#cardio-health",
      iconAlt: "Heart icon for heart disease"
    },
    {
      title: t("disease.mentalHealth"),
      description: t("disease.mentalHealthDesc"),
      icon: <Brain className="h-10 w-10 text-white" />,
      color: "bg-[hsl(220,13%,48%)]",
      hoverColor: "hover:shadow-[0_8px_30px_rgb(107,114,128,0.3)]",
      borderColor: "border-[hsl(220,13%,48%)]",
      textColor: "text-[hsl(220,13%,48%)]",
      link: "/services#cardio-health",
      iconAlt: "Brain icon for mental health"
    },
    {
      title: t("disease.respiratory"),
      description: t("disease.respiratoryDesc"),
      icon: <Wind className="h-10 w-10 text-white" />,
      color: "bg-[hsl(206,44%,30%)]",
      hoverColor: "hover:shadow-[0_8px_30px_rgb(42,82,110,0.3)]",
      borderColor: "border-[hsl(206,44%,30%)]",
      textColor: "text-[hsl(206,44%,30%)]",
      link: "/services#cardio-health",
      iconAlt: "Wind icon for respiratory diseases"
    }
  ];

  return (
    <div className={`flex flex-col min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{t("diseases.title")}</h1>
              <p className="text-lg text-muted-foreground">
                {t("diseases.subtitle")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {diseasesData.map((disease, index) => (
                <Card 
                  key={index} 
                  className={`overflow-hidden border-none shadow-lg transition-all duration-300 hover:-translate-y-1 ${disease.hoverColor} h-full flex flex-col`}
                >
                  <div className={`${disease.color} p-8`}>
                    <div className="flex justify-center items-center" role="img" aria-label={disease.iconAlt}>
                      {disease.icon}
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <h3 className={`text-2xl font-bold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {disease.title}
                    </h3>
                    <p className={`text-muted-foreground mb-6 leading-relaxed flex-grow ${isRTL ? 'text-right' : 'text-left'}`}>
                      {disease.description}
                    </p>
                    
                    <Link to={disease.link} className="w-full">
                      <Button 
                        variant="outline" 
                        className={`w-full ${disease.borderColor} ${disease.textColor} hover:bg-opacity-10 transition-all duration-200 font-semibold border-2`}
                      >
                        {t("diseases.viewResources")}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h2 className={`text-3xl font-bold mb-4 text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                {t("diseases.contextTitle")}
              </h2>
              <p className={`mb-6 text-muted-foreground leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {t("diseases.contextDescription")}
              </p>
              <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-secondary rounded-lg gap-4">
                <div className={`mb-4 md:mb-0 ${isRTL ? 'md:ml-6 text-right' : 'md:mr-6 text-left'} flex-grow`}>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {t("diseases.personalizedTitle")}
                  </h3>
                  <p className="text-muted-foreground">{t("diseases.personalizedDescription")}</p>
                </div>
                <Link to="/physician-directory">
                  <Button className="bg-[hsl(184,100%,29%)] hover:bg-[hsl(184,100%,25%)] text-white whitespace-nowrap">
                    {t("diseases.contactSpecialist")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Diseases;
