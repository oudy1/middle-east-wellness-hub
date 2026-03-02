
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOHead from "@/components/SEOHead";

const programs = [
  {
    title: "IFHP – Interim Federal Health Program",
    summary: "Free counselling for eligible refugee claimants. Multilingual and culturally sensitive support.",
    link: "https://blcc.ca/interim-federal-health-program-ifhp",
  },
  {
    title: "VQRP – Victim Quick Response Program",
    summary: "Short-term, immediate counselling support after violence, crime, or traumatic events.",
    link: "https://blcc.ca/victim-quick-response-program-vqrp",
  },
  {
    title: "Newcomer Mental Wellness Program",
    summary: "Free short-term counselling for newcomers and immigrants to support settlement stress and adjustment.",
    link: "https://blcc.ca/newcomer-mental-wellness-program",
  },
  {
    title: "LDEEP – Empowerment Employment Project",
    summary: "Free counselling sessions to support job readiness, confidence, and coping during career transitions.",
    link: "https://blcc.ca/empowerment-employment-project",
  },
];

const Programs = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar' || language === 'fa' || language === 'ku';

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <SEOHead
        title="Programs – SHAMS"
        description="Free and funded mental health support options through trusted partners like Better Life Counselling Centre."
      />
      <Header />
      <main className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Programs</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Free and funded mental health support options through trusted partners.
          </p>
        </section>

        {/* Program Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {programs.map((program) => (
            <Card key={program.title} className="flex flex-col justify-between border border-border">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2 text-xs">
                  Partner Program (External)
                </Badge>
                <CardTitle className="text-xl">{program.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 flex-1 justify-between">
                <p className="text-muted-foreground">{program.summary}</p>
                <a href={program.link} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2 w-full sm:w-auto">
                    Learn more <ExternalLink size={14} />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Callout */}
        <section className="rounded-lg border border-border bg-muted/50 p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-3">Need help choosing a program?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            If you are not sure what fits, contact SHAMS and we can point you to the right option.
          </p>
          <Link to="/contact">
            <Button size="lg">Contact SHAMS</Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Programs;
