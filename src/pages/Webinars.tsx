
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const webinarsData = [
  {
    title: "Understanding Diabetes in Middle Eastern Populations",
    presenter: "Dr. Sarah Mahmoud",
    date: "April 15, 2025",
    duration: "45 minutes",
    description: "An in-depth look at diabetes prevalence, risk factors, and management strategies specific to Middle Eastern communities."
  },
  {
    title: "Mental Health Awareness: Breaking Cultural Stigmas",
    presenter: "Dr. Amir Hassan",
    date: "March 22, 2025",
    duration: "60 minutes",
    description: "Addressing mental health challenges in Middle Eastern communities and strategies for breaking down cultural barriers to care."
  },
  {
    title: "Cardiovascular Health: Prevention Strategies",
    presenter: "Dr. Leila Nassar",
    date: "February 10, 2025",
    duration: "50 minutes",
    description: "Essential information about heart health with culturally relevant dietary and lifestyle recommendations."
  },
  {
    title: "Women's Health: Cultural Considerations in Care",
    presenter: "Dr. Fatima Al-Zahrani",
    date: "January 18, 2025",
    duration: "55 minutes",
    description: "Exploring women's health topics with sensitivity to cultural contexts and traditions."
  }
];

const Webinars = () => {
  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray">
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Recorded Webinars</h1>
              <p className="text-lg text-gray-600">
                Access our library of educational webinars featuring expert insights on health topics relevant to Middle Eastern communities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {webinarsData.map((webinar, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md">
                  <div className="bg-healthDarkBlue p-6 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{webinar.title}</h3>
                    <Button variant="outline" size="icon" className="rounded-full bg-white hover:bg-healthTeal hover:text-white">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-healthTeal/10 text-healthTeal px-3 py-1 rounded-full text-sm">
                        {webinar.presenter}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {webinar.date}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {webinar.duration}
                      </span>
                    </div>
                    <p className="text-gray-600">{webinar.description}</p>
                    <Button variant="link" className="p-0 mt-4 text-healthTeal hover:text-healthDarkBlue">
                      Watch Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Request a Topic</h2>
              <p className="mb-6">
                Is there a health topic you'd like us to cover in a future webinar? Let us know, and our medical experts will consider it for upcoming sessions.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-healthLightGray rounded-lg">
                <div className="mb-4 md:mb-0 md:mr-6">
                  <h3 className="text-xl font-semibold mb-2">Upcoming Live Webinars</h3>
                  <p>Join our next live session for interactive Q&A with health experts.</p>
                </div>
                <Button className="bg-healthTeal hover:bg-teal-700 text-white">
                  View Schedule
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

export default Webinars;
