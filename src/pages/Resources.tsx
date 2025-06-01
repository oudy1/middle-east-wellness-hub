
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
  Phone
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

  const resources = [
    {
      title: "Research Platform",
      description: "Access our comprehensive research database and publication library.",
      icon: <FileText className="h-10 w-10 text-white" />,
      color: "bg-healthTeal",
      link: "/research-platform"
    },
    {
      title: "Educational Materials",
      description: "Download culturally appropriate patient education materials.",
      icon: <BookOpen className="h-10 w-10 text-white" />,
      color: "bg-healthRed",
      link: "/educational-materials"
    },
    {
      title: "Newsletter Archive",
      description: "Browse past newsletters and stay updated with our latest research.",
      icon: <Monitor className="h-10 w-10 text-white" />,
      color: "bg-gray-400",
      link: "/newsletter-archive"
    },
    {
      title: "Webinar Library",
      description: "Access recorded webinars and training sessions for healthcare providers.",
      icon: <Phone className="h-10 w-10 text-white" />,
      color: "bg-healthDarkBlue",
      link: "/webinar-library"
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
              {language === 'ar' ? 'الموارد للأطباء والباحثين' : 'Resources for Clinicians & Researchers'}
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
                {language === 'ar' ? 'فرص البحث للطلاب' : 'Research Opportunities for Students'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'ar' ? 
                  'اكتشف الفرص البحثية مع الأطباء والباحثين الذين يعملون على تحسين الصحة للمجتمعات العربية وشرق الأوسطية' :
                  'Discover research opportunities with clinicians and researchers working to improve health outcomes for Arab and Middle Eastern communities'}
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
                onClick={() => window.location.href = 'mailto:info@shams.org?subject=Post Research Opportunity'}
              >
                Post Your Opportunity
              </Button>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-healthLightGray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-12 text-center">
              {language === 'ar' ? 'الموارد المتاحة' : 'Available Resources'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md">
                  <div className={`${resource.color} p-6`}>
                    <div className="flex justify-center">
                      {resource.icon}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <Button variant="link" className="p-0 text-healthTeal hover:text-healthDarkBlue">
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-healthDarkBlue mb-4">
              {language === 'ar' ? 'مستقبل أكثر إشراقاً لصحة الشرق الأوسط' : 'A Brighter Future for Middle Eastern Health'}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join us in advancing research and healthcare that truly serves Arab and Middle Eastern communities.
            </p>
            <Button 
              className="bg-healthTeal hover:bg-healthTeal/80 text-white px-8 py-3 text-lg"
              onClick={() => window.open('https://example.com/brighter-future', '_blank')}
            >
              Learn More About Our Vision
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
