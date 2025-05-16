
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Brain, Wind, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Diseases = () => {
  const { t } = useLanguage();
  
  const diseasesData = [
    {
      title: t("disease.diabetes"),
      description: t("disease.diabetesDesc"),
      icon: <Activity className="h-10 w-10 text-white" />,
      color: "bg-healthTeal"
    },
    {
      title: t("disease.heartDisease"),
      description: t("disease.heartDiseaseDesc"),
      icon: <Heart className="h-10 w-10 text-white" />,
      color: "bg-healthRed"
    },
    {
      title: t("disease.mentalHealth"),
      description: t("disease.mentalHealthDesc"),
      icon: <Brain className="h-10 w-10 text-white" />,
      color: "bg-gray-400"
    },
    {
      title: t("disease.respiratory"),
      description: t("disease.respiratoryDesc"),
      icon: <Wind className="h-10 w-10 text-white" />,
      color: "bg-healthDarkBlue"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray">
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("diseases.title")}</h1>
              <p className="text-lg text-gray-600">
                {t("diseases.subtitle")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {diseasesData.map((disease, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md">
                  <div className={`${disease.color} p-6`}>
                    <div className="flex justify-center">
                      {disease.icon}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">{disease.title}</h3>
                    <p className="text-gray-600 mb-4">{disease.description}</p>
                    <Button variant="link" className="p-0 text-healthTeal hover:text-healthDarkBlue">
                      {t("diseases.learnMore")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t("diseases.contextTitle")}</h2>
              <p className="mb-6">
                {t("diseases.contextDescription")}
              </p>
              <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-healthLightGray rounded-lg">
                <div className="mb-4 md:mb-0 md:mr-6">
                  <h3 className="text-xl font-semibold mb-2">{t("diseases.personalizedTitle")}</h3>
                  <p>{t("diseases.personalizedDescription")}</p>
                </div>
                <Button className="bg-healthTeal hover:bg-teal-700 text-white">
                  {t("diseases.contactSpecialist")}
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

export default Diseases;
