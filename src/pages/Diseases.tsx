
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Brain, Lungs, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const diseasesData = [
  {
    title: "Diabetes",
    description: "Diabetes is a chronic condition that affects how your body processes blood sugar. Learn about risk factors in Middle Eastern populations, symptoms, management strategies, and cultural considerations for treatment.",
    icon: <Activity className="h-10 w-10 text-white" />,
    color: "bg-healthTeal"
  },
  {
    title: "Heart Disease",
    description: "Heart disease is a leading cause of mortality worldwide. Discover specific risk factors in Middle Eastern communities, prevention strategies, early warning signs, and culturally appropriate interventions.",
    icon: <Heart className="h-10 w-10 text-white" />,
    color: "bg-healthRed"
  },
  {
    title: "Mental Health Conditions",
    description: "Mental health conditions affect millions globally but are often stigmatized in many communities. Explore common mental health challenges, cultural perspectives, and resources for support.",
    icon: <Brain className="h-10 w-10 text-white" />,
    color: "bg-gray-400"
  },
  {
    title: "Respiratory Diseases",
    description: "Respiratory diseases like asthma and COPD can significantly impact quality of life. Learn about prevalence in Middle Eastern populations, environmental factors, and management approaches.",
    icon: <Lungs className="h-10 w-10 text-white" />,
    color: "bg-healthDarkBlue"
  }
];

const Diseases = () => {
  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray">
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Common Diseases</h1>
              <p className="text-lg text-gray-600">
                Educational resources about common health conditions affecting Middle Eastern communities, with culturally relevant information and support.
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
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Understanding Cultural Context</h2>
              <p className="mb-6">
                Health conditions can present differently across populations and may be influenced by genetic, environmental, and cultural factors. Our resources are designed to provide information that is relevant to Middle Eastern communities while acknowledging the diversity within these populations.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-healthLightGray rounded-lg">
                <div className="mb-4 md:mb-0 md:mr-6">
                  <h3 className="text-xl font-semibold mb-2">Looking for personalized guidance?</h3>
                  <p>Contact our team of healthcare professionals for culturally sensitive support.</p>
                </div>
                <Button className="bg-healthTeal hover:bg-teal-700 text-white">
                  Contact a Specialist
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
