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
  Video,
  Plus,
  Search
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Resources = () => {
  const { language, t } = useLanguage();

  const getLocalizedResourceCategories = () => [
    {
      title: language === 'ar' ? "موارد الصحة النفسية" : "Mental Health Resources",
      icon: <Brain className="h-8 w-8 text-white" />,
      color: "bg-healthTeal",
      resources: [
        {
          title: language === 'ar' ? "الاعتبارات الثقافية في علاج الصحة النفسية" : "Cultural Considerations in Mental Health Treatment",
          description: language === 'ar' ? "إرشادات لتقديم رعاية الصحة النفسية المتجاوبة ثقافياً للمرضى العرب والشرق أوسطيين." : "Guidelines for providing culturally responsive mental health care to Arab and Middle Eastern patients.",
          type: language === 'ar' ? "بحث علمي" : "Research Paper",
          link: "https://www.researchgate.net/publication/312841477_Mental_Health_of_Arab_Americans_Cultural_Considerations_for_Excellence_of_Care"
        },
        {
          title: language === 'ar' ? "أدوات فحص الاكتئاب باللغة العربية" : "Depression Screening Tools in Arabic",
          description: language === 'ar' ? "استبيانات فحص الاكتئاب المعتمدة والمترجمة إلى العربية مع التكيف الثقافي." : "Validated depression screening questionnaires translated into Arabic with cultural adaptations.",
          type: language === 'ar' ? "أداة تقييم" : "Assessment Tool",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10194937/"
        },
        {
          title: language === 'ar' ? "الرعاية المطلعة على الصدمات للاجئين" : "Trauma-Informed Care for Refugees",
          description: language === 'ar' ? "أفضل الممارسات لتقديم خدمات الصحة النفسية المطلعة على الصدمات لسكان اللاجئين." : "Best practices for providing trauma-informed mental health services to refugee populations.",
          type: language === 'ar' ? "بحث علمي" : "Research Paper",
          link: "/resources/trauma-informed-care"
        }
      ]
    },
    {
      title: language === 'ar' ? "صحة المرأة" : "Women's Health",
      icon: <Users className="h-8 w-8 text-white" />,
      color: "bg-healthPurple",
      resources: [
        {
          title: language === 'ar' ? "صحة القلب للنساء" : "Heart Health for Women",
          description: language === 'ar' ? "معلومات وموارد شاملة حول صحة المرأة بعدة لغات بما في ذلك العربية." : "Comprehensive women's health information and resources in multiple languages including Arabic.",
          type: language === 'ar' ? "دليل صحي" : "Health Guide",
          link: "https://medlineplus.gov/languages/womenshealth.html#Arabic"
        },
        {
          title: language === 'ar' ? "دليل الغذاء للحمل والسكري" : "Pregnancy and Diabetes Food Guide",
          description: language === 'ar' ? "إرشادات غذائية لإدارة السكري أثناء الحمل مع الاعتبارات الغذائية الثقافية." : "Nutritional guidelines for managing diabetes during pregnancy with cultural dietary considerations.",
          type: language === 'ar' ? "دليل غذائي" : "Food Guide",
          link: "https://phc.eduhealth.ca/en/viewer?file=%2fmedia%2fVCH%2fFL%2fFL.860.D531.AR.pdf#phrase=false&pagemode=bookmarks"
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

        {/* Research Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <GraduationCap className="h-12 w-12 text-healthTeal mr-3" />
                <FlaskConical className="h-12 w-12 text-healthTeal" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-4">
                {language === 'ar' ? 'البحث' : 'Research Coming Soon'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'ar' ? 
                  'البحث قريباً' :
                  'We\'re developing new research initiatives focused on improving healthcare outcomes for Middle Eastern and Arab communities in Canada.'}
              </p>
            </div>

            <div className="text-center py-12">
              <Search className="h-16 w-16 text-healthTeal mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Research Opportunities Coming Soon</h3>
              <p className="text-gray-600 mb-6">We're developing new research initiatives. Check back soon for opportunities to contribute to important health research.</p>
            </div>

            <div className="text-center mb-12">
              <Link to="/post-opportunity">
                <Button className="bg-healthRed hover:bg-healthRed/90 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Post Your Opportunity
                </Button>
              </Link>
            </div>

            {/* Publications & Knowledge Hub */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-4 text-center">Publications & Knowledge Hub</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-8">
                Research and publications relevant to health issues in the Middle Eastern diaspora
              </p>
              
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-healthTeal mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Knowledge Hub Coming Soon</h3>
                <p className="text-gray-600 mb-6">We're curating a comprehensive collection of publications and research findings. Check back soon for valuable insights and evidence-based resources.</p>
              </div>
            </div>

            {/* CME & Clinician Training */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-4 text-center">CME & Clinician Training</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-8">
                Continuing medical education and training opportunities for culturally competent care
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
                  <GraduationCap className="h-12 w-12 text-healthTeal mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Sinai Health Training</h3>
                  <p className="text-gray-600 mb-6">Continuing education programs focused on culturally responsive healthcare delivery.</p>
                  <a 
                    href="https://www.sinaihealth.ca/education-and-training/continuing-education" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Access Training
                    </Button>
                  </a>
                </Card>
                
                <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
                  <GraduationCap className="h-12 w-12 text-healthRed mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Calgary CME</h3>
                  <p className="text-gray-600 mb-6">Continuing Medical Education programs from the University of Calgary.</p>
                  <a 
                    href="https://cumming.ucalgary.ca/cme/about/strategy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="bg-healthRed hover:bg-healthRed/90 text-white">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Programs
                    </Button>
                  </a>
                </Card>
              </div>
            </div>

          </div>
        </section>

        {/* Research Resources Section */}
        <section className="py-16 md:py-24 bg-healthLightGray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-4 text-center">Research Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-8">
              Comprehensive resources categorized by specialty to support your research and clinical practice
            </p>
            <p className="text-lg text-healthTeal text-center font-semibold mb-12">More to come!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getLocalizedResourceCategories().map((category, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className={`${category.color} p-6 text-center`}>
                    <div className="flex justify-center mb-3">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {category.resources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="border-l-3 border-l-healthTeal pl-4">
                          <h4 className="font-semibold text-healthDarkBlue mb-2">{resource.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{resource.type}</span>
                            <a 
                              href={resource.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-block"
                            >
                              <Button variant="link" size="sm" className="text-healthTeal p-0">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Access
                              </Button>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;