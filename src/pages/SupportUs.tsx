import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalligraphyBackground from "@/components/CalligraphyBackground";
import LandmarksGenerator from "@/components/LandmarksGenerator";
import InquiryForm from "@/components/InquiryForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar,
  DollarSign,
  Handshake,
  Users,
  Heart
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SupportUs = () => {
  const { language } = useLanguage();

  const supportOptions = [
    {
      title: "Sponsor an Event",
      description: "Support our educational webinars, community health workshops, and networking events that bring together healthcare professionals and community members.",
      icon: <Calendar className="h-12 w-12 text-healthTeal" />,
      color: "bg-healthTeal/10"
    },
    {
      title: "Fund Our Initiatives",
      description: "Help us develop new research programs, educational resources, and community outreach initiatives that address health disparities in Middle Eastern communities.",
      icon: <DollarSign className="h-12 w-12 text-healthRed" />,
      color: "bg-healthRed/10"
    },
    {
      title: "Collaborate on Projects",
      description: "Partner with us on research studies, policy advocacy, or community health programs that align with your organization's mission and values.",
      icon: <Handshake className="h-12 w-12 text-healthGold" />,
      color: "bg-healthGold/10"
    },
    {
      title: "Volunteer Your Services",
      description: "Share your expertise as a healthcare professional, researcher, or community leader to help us achieve our mission of improving health outcomes.",
      icon: <Users className="h-12 w-12 text-healthPurple" />,
      color: "bg-healthPurple/10"
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
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-healthTeal" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-healthDarkBlue mb-8">
              {language === 'ar' ? 'ادعمنا' : 'Support Us'}
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-12 text-gray-600">
              {language === 'ar' ? 
                'انضم إلينا في مهمتنا لتحسين النتائج الصحية للمجتمعات الشرق أوسطية والعربية في كندا' : 
                'Join us in our mission to improve health outcomes for Middle Eastern and Arab communities in Canada'}
            </p>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-4 text-center">
              Ways to Support SHAMS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
              There are many ways you can contribute to our mission and make a meaningful impact on community health
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
              {supportOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className={`${option.color} rounded-full p-6 w-fit mx-auto mb-4`}>
                      {option.icon}
                    </div>
                    <CardTitle className="text-xl text-healthDarkBlue">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
import SupportUs from "@/pages/SupportUs";

        {/* Contact Form Section */}
        <section className="py-16 bg-healthLightGray">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-6">
                Let's Work Together
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Please connect with us using the form below; we'll respond promptly. Thank you for your interest in supporting SHAMS—we look forward to working together towards a brighter future!
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <InquiryForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SupportUs;