import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalligraphyBackground from "@/components/CalligraphyBackground";
import LandmarksGenerator from "@/components/LandmarksGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  FlaskConical, 
  Mail, 
  Calendar,
  MapPin,
  ExternalLink,
  FileText,
  BookOpen,
  Monitor,
  Phone,
  Users,
  Heart,
  Brain,
  Baby,
  Stethoscope,
  FileDown,
  Video
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Resources = () => {
  const { language, t } = useLanguage();

  const researchOpportunities = [
    {
      researcher: "Dr. Ahmed Hassan",
      position: "Principal Investigator",
      institution: "University of Toronto",
      project: "Cultural Competency in Mental Health Treatment",
      description: "Seeking undergraduate and graduate students to assist with qualitative research on culturally responsive mental health interventions for Arab communities.",
      requirements: "Psychology, Public Health, or related field. Arabic language skills preferred.",
      contact: "a.hassan@research.utoronto.ca",
      deadline: "March 30, 2024",
      type: "Mental Health Research"
    },
    {
      researcher: "Dr. Layla Mahmoud",
      position: "Assistant Professor",
      institution: "McMaster University",
      project: "Cardiovascular Health in Middle Eastern Populations",
      description: "Research opportunity focusing on dietary patterns and cardiovascular outcomes in Middle Eastern immigrant communities.",
      requirements: "Nutrition, Epidemiology, or Health Sciences background. Experience with data analysis preferred.",
      contact: "mahmoud@mcmaster.ca",
      deadline: "April 15, 2024",
      type: "Cardiovascular Research"
    },
    {
      researcher: "Dr. Omar Al-Rashid",
      position: "Associate Professor",
      institution: "University of British Columbia",
      project: "Healthcare Access Barriers in Arab Communities",
      description: "Mixed-methods study examining barriers to healthcare access among Arab immigrants in Vancouver.",
      requirements: "Social Sciences, Health Policy, or Community Health background. Bilingual preferred.",
      contact: "o.alrashid@ubc.ca",
      deadline: "May 1, 2024",
      type: "Health Policy Research"
    }
  ];

  const resourceCategories = [
    {
      title: "Mental Health Resources",
      icon: <Brain className="h-8 w-8 text-white" />,
      color: "bg-healthTeal",
      resources: [
        {
          title: "Cultural Considerations in Mental Health Treatment",
          description: "Guidelines for providing culturally responsive mental health care to Arab and Middle Eastern patients.",
          type: "PDF Guide",
          link: "/resources/mental-health-guide.pdf"
        },
        {
          title: "Depression Screening Tools in Arabic",
          description: "Validated depression screening questionnaires translated into Arabic with cultural adaptations.",
          type: "Assessment Tool",
          link: "/resources/depression-screening-arabic"
        },
        {
          title: "Trauma-Informed Care for Refugees",
          description: "Best practices for providing trauma-informed mental health services to refugee populations.",
          type: "Training Module",
          link: "/resources/trauma-informed-care"
        }
      ]
    },
    {
      title: "Cardiovascular Health",
      icon: <Heart className="h-8 w-8 text-white" />,
      color: "bg-healthRed",
      resources: [
        {
          title: "Hypertension Management in Middle Eastern Populations",
          description: "Evidence-based guidelines for managing hypertension considering genetic and dietary factors.",
          type: "Clinical Guide",
          link: "/resources/hypertension-guide"
        },
        {
          title: "Diabetes Prevention Materials",
          description: "Patient education materials in multiple languages about diabetes prevention and management.",
          type: "Patient Education",
          link: "/resources/diabetes-prevention"
        },
        {
          title: "Cardiac Risk Assessment Tools",
          description: "Population-specific cardiac risk calculators and assessment tools.",
          type: "Clinical Tool",
          link: "/resources/cardiac-risk-tools"
        }
      ]
    },
    {
      title: "Women's Health",
      icon: <Users className="h-8 w-8 text-white" />,
      color: "bg-healthPurple",
      resources: [
        {
          title: "Culturally Sensitive Prenatal Care",
          description: "Guidelines for providing prenatal care that respects cultural practices and beliefs.",
          type: "Clinical Guide",
          link: "/resources/prenatal-care-guide"
        },
        {
          title: "Family Planning Resources",
          description: "Educational materials about family planning options that consider religious and cultural values.",
          type: "Patient Education",
          link: "/resources/family-planning"
        },
        {
          title: "Maternal Health Screening",
          description: "Screening tools and protocols for maternal health in Middle Eastern populations.",
          type: "Screening Tool",
          link: "/resources/maternal-screening"
        }
      ]
    },
    {
      title: "Pediatric Care",
      icon: <Baby className="h-8 w-8 text-white" />,
      color: "bg-healthGold",
      resources: [
        {
          title: "Childhood Immunization Guidelines",
          description: "Vaccination schedules and guidelines adapted for Middle Eastern families.",
          type: "Clinical Guide",
          link: "/resources/immunization-guidelines"
        },
        {
          title: "Growth Charts for Middle Eastern Children",
          description: "Population-specific growth charts and developmental milestones.",
          type: "Assessment Tool",
          link: "/resources/growth-charts"
        },
        {
          title: "Adolescent Health Resources",
          description: "Resources for addressing adolescent health issues in Middle Eastern families.",
          type: "Clinical Resource",
          link: "/resources/adolescent-health"
        }
      ]
    },
    {
      title: "Research Tools",
      icon: <FlaskConical className="h-8 w-8 text-white" />,
      color: "bg-healthDarkBlue",
      resources: [
        {
          title: "Community Health Survey Templates",
          description: "Validated survey instruments for community health research in Middle Eastern populations.",
          type: "Research Tool",
          link: "/resources/survey-templates"
        },
        {
          title: "Data Collection Protocols",
          description: "Standardized protocols for collecting health data in Middle Eastern communities.",
          type: "Protocol",
          link: "/resources/data-protocols"
        },
        {
          title: "Statistical Analysis Guides",
          description: "Guidelines for analyzing health data from Middle Eastern populations.",
          type: "Analysis Guide",
          link: "/resources/analysis-guides"
        }
      ]
    },
    {
      title: "Training Materials",
      icon: <Monitor className="h-8 w-8 text-white" />,
      color: "bg-gray-600",
      resources: [
        {
          title: "Cultural Competency Training",
          description: "Comprehensive training modules on providing culturally competent care.",
          type: "Training Course",
          link: "/resources/cultural-competency-training"
        },
        {
          title: "Language Interpretation Guidelines",
          description: "Best practices for working with medical interpreters and language services.",
          type: "Guidelines",
          link: "/resources/interpretation-guidelines"
        },
        {
          title: "Webinar Recordings",
          description: "Library of recorded webinars on various health topics relevant to Middle Eastern communities.",
          type: "Video Library",
          link: "/webinars"
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray relative">
      <CalligraphyBackground />
      <LandmarksGenerator />
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-10 pointer-events-none"></div>
      
      <Header />
      
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-healthDarkBlue mb-8 text-center">
              {language === 'ar' ? 'موارد البحث' : 'Research Resources'}
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto mb-16 text-gray-600">
              {language === 'ar' ? 
                'أدوات وموارد لدعم الرعاية الصحية المتجاوبة ثقافياً والبحث المجتمعي' : 
                'Tools and resources to support culturally responsive healthcare and community-centered research'}
            </p>
          </div>
        </section>


        {/* Research Opportunities Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <GraduationCap className="h-12 w-12 text-healthTeal mr-3" />
                <FlaskConical className="h-12 w-12 text-healthTeal" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-4">
                {language === 'ar' ? 'البحث' : 'Research'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'ar' ? 
                  'البحث قريباً' :
                  'Research coming soon'}
              </p>
            </div>

            <div className="grid gap-8 max-w-5xl mx-auto">
              {researchOpportunities.map((opportunity, index) => (
                <Card key={index} className="shadow-md border-l-4 border-l-healthTeal">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <CardTitle className="text-xl text-healthDarkBlue mb-2">
                          {opportunity.project}
                        </CardTitle>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {opportunity.institution}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Deadline: {opportunity.deadline}
                          </span>
                        </div>
                      </div>
                      <div className="bg-healthTeal/10 text-healthTeal px-3 py-1 rounded-full text-sm font-medium">
                        {opportunity.type}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold text-healthDarkBlue mb-2">
                        {opportunity.researcher} - {opportunity.position}
                      </h4>
                      <p className="text-gray-700 mb-3">{opportunity.description}</p>
                      <div className="mb-3">
                        <span className="font-medium text-gray-900">Requirements: </span>
                        <span className="text-gray-600">{opportunity.requirements}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        className="bg-healthTeal hover:bg-healthTeal/80 text-white flex items-center"
                        onClick={() => window.location.href = `mailto:${opportunity.contact}?subject=Research Opportunity Inquiry - ${opportunity.project}`}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-healthTeal text-healthTeal hover:bg-healthTeal hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Are you a researcher looking to recruit students for your projects?
              </p>
              <Button 
                variant="outline" 
                className="border-healthTeal text-healthTeal hover:bg-healthTeal hover:text-white"
                onClick={() => window.location.href = '/post-opportunity'}
              >
                Post Your Opportunity
              </Button>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
