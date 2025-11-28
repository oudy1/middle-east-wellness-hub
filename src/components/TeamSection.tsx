import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const TeamSection = () => {
  const { language } = useLanguage();
  const [openModal, setOpenModal] = useState<string | null>(null);
  
  const affiliatedPhysicians = [
    {
      name: "Dr. Raed Hawa",
      role: {
        en: "Affiliated Physician",
        ar: "طبيب منتسب"
      },
      specialization: {
        en: "Consultation liaison psychiatry, sleep medicine and obesity medicine",
        ar: "الطب النفسي الاستشاري، طب النوم وطب السمنة"
      }
    }
  ];

  const researchers = [
    {
      id: "jason-chung",
      name: "Jason Chung, M.Sc., PhD Candidate",
      affiliation: {
        en: "Western University",
        ar: "جامعة ويسترن"
      },
      title: {
        en: "PhD Candidate, Clinical Science & Psychopathology",
        ar: "طالب دكتوراه في علم النفس الإكلينيكي وعِلم الاعتلال النفسي"
      },
      focusShort: {
        en: "Self-injury, substance use, suicide, and eating pathology—especially among racialized and LGBTQ+ populations",
        ar: "إيذاء النفس، تعاطي المواد، الانتحار، واضطرابات الأكل—مع التركيز على الفئات المُهمَّشة و+LGBTQ"
      },
      focusFull: {
        en: "Identifying factors that maintain and increase high-risk behaviors (self-injury, substance use, suicide, and eating pathology), with particular focus on marginalized and LGBTQ+ populations",
        ar: "تحديد العوامل التي تُبقي السلوكيات عالية الخطورة وتزيدها (إيذاء النفس، تعاطي المواد، الانتحار، واضطرابات الأكل)، مع التركيز على الفئات المُهمَّشة و+LGBTQ"
      },
      email: "jchun264@uwo.ca",
      tags: {
        en: ["Mental Health", "High-Risk Behaviors", "Equity"],
        ar: ["الصحة النفسية", "سلوكيات عالية الخطورة", "المساواة"]
      }
    }
  ];

  const projectTeam = [
    {
      name: "Mahmoud Noweir",
      role: {
        en: "Team Member",
        ar: "عضو الفريق"
      },
      specialization: {
        en: "Founder and strategic leadership",
        ar: "المؤسس والقيادة الاستراتيجية"
      }
    },
    {
      name: "Amr Al Masri",
      role: {
        en: "Team Member",
        ar: "عضو الفريق"
      },
      specialization: {
        en: "Events",
        ar: "الفعاليات"
      }
    },
    {
      name: "Mohamed Salem",
      role: {
        en: "Team Member",
        ar: "عضو الفريق"
      },
      specialization: {
        en: "Research and publication",
        ar: "البحث والنشر"
      }
    },
    {
      name: "Qamar Al Farsi",
      role: {
        en: "Team Member",
        ar: "عضو الفريق"
      },
      specialization: {
        en: "Community partnerships and engagement co-lead",
        ar: "قائد مشارك للشراكات المجتمعية والمشاركة"
      }
    },
    {
      name: "Lodi Sinanios",
      role: {
        en: "Team Member",
        ar: "عضو الفريق"
      },
      specialization: {
        en: "Technology and digital initiatives",
        ar: "التكنولوجيا والمبادرات الرقمية"
      }
    },
    {
      name: "Mousa El-Sururi",
      role: {
        en: "Team Member",
        ar: "عضو الفريق"
      },
      specialization: {
        en: "Community partnerships and engagement and research",
        ar: "الشراكات المجتمعية والمشاركة والبحث"
      }
    },
    {
      name: "Sarah Durani",
      role: {
        en: "Team Member",
        ar: "عضو الفريق"
      },
      specialization: {
        en: "Research and community engagement",
        ar: "البحث والمشاركة المجتمعية"
      }
    },
    {
      name: "Riad Sankari",
      role: {
        en: "Team Member",
        ar: "عضو الفريق"
      },
      specialization: {
        en: "Healthcare advocacy and outreach",
        ar: "الدعوة الصحية والتوعية"
      }
    },
    {
      name: "Saif Arabiat",
      role: {
        en: "Team Member",
        ar: "عضو الفريق"
      },
      specialization: {
        en: "Digital health and innovation",
        ar: "الصحة الرقمية والابتكار"
      }
    }
  ];

  const renderPersonCard = (person, index) => (
    <Card key={index} className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className={`text-healthDarkBlue text-lg md:text-xl leading-tight ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {person.name}
        </CardTitle>
        <p className={`text-healthTeal font-medium text-sm md:text-base ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {typeof person.role === 'object' ? person.role[language] : person.role}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <p className={`text-gray-600 text-sm md:text-base leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {typeof person.specialization === 'object' ? person.specialization[language] : person.specialization}
        </p>
      </CardContent>
    </Card>
  );

  const renderResearcherCard = (researcher) => (
    <Dialog key={researcher.id} open={openModal === researcher.id} onOpenChange={(open) => setOpenModal(open ? researcher.id : null)}>
      <DialogTrigger asChild>
        <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]">
          <CardContent className="p-4 md:p-5">
            <div className="flex flex-col items-center text-center space-y-3">
              <Avatar className="h-16 w-16 md:h-20 md:w-20">
                <AvatarFallback className="bg-healthTeal text-white text-xl font-semibold">
                  {researcher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1 w-full">
                <h3 className={`text-healthDarkBlue font-semibold text-base md:text-lg leading-tight ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  {language === 'ar' ? researcher.name.split(',')[0].trim() : researcher.name}
                </h3>
                <p className={`text-healthTeal text-xs md:text-sm font-medium ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  {researcher.affiliation[language]}
                </p>
              </div>

              <p className={`text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-2 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {researcher.title[language]}
              </p>

              <div className={`flex flex-wrap gap-1.5 justify-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                {researcher.tags[language].map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className={`text-2xl text-healthDarkBlue ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {language === 'ar' ? researcher.name.split(',')[0].trim() : researcher.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div>
            <h4 className={`font-semibold text-healthTeal mb-2 ${language === 'ar' ? 'text-right' : ''}`}>
              {language === 'ar' ? 'المسمّى الوظيفي' : 'Title'}
            </h4>
            <p className={`text-gray-700 ${language === 'ar' ? 'text-right' : ''}`}>
              {researcher.title[language]}
            </p>
          </div>

          <div>
            <h4 className={`font-semibold text-healthTeal mb-2 ${language === 'ar' ? 'text-right' : ''}`}>
              {language === 'ar' ? 'الاهتمامات البحثية' : 'Research Focus'}
            </h4>
            <p className={`text-gray-700 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`}>
              {researcher.focusFull[language]}
            </p>
          </div>

          <div>
            <h4 className={`font-semibold text-healthTeal mb-2 ${language === 'ar' ? 'text-right' : ''}`}>
              {language === 'ar' ? 'الوسوم' : 'Tags'}
            </h4>
            <div className={`flex flex-wrap gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              {researcher.tags[language].map((tag, idx) => (
                <Badge key={idx} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className={`font-semibold text-healthTeal mb-2 ${language === 'ar' ? 'text-right' : ''}`}>
              {language === 'ar' ? 'التواصل' : 'Contact'}
            </h4>
            <a 
              href={`mailto:${researcher.email}`}
              className={`flex items-center gap-2 text-healthDarkBlue hover:text-healthTeal transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm">{researcher.email}</span>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <section className="py-12 md:py-16 bg-healthLightGray">
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-healthDarkBlue ${language === 'ar' ? 'font-cairo' : ''}`}>
          {language === 'ar' ? 'فريقنا' : 'Our Team'}
        </h2>
        
        {/* Affiliated Physicians */}
        <div className="mb-8 md:mb-12">
          <h3 className={`text-xl sm:text-2xl font-semibold mb-4 md:mb-6 text-healthDarkBlue ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {language === 'ar' ? 'الأطباء المنتسبون' : 'Affiliated Physicians'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {affiliatedPhysicians.map((person, index) => renderPersonCard(person, index))}
          </div>
        </div>

        {/* Researchers Associated with SHAMS */}
        <div className="mb-8 md:mb-12">
          <h3 className={`text-xl sm:text-2xl font-semibold mb-4 md:mb-6 text-healthDarkBlue ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {language === 'ar' ? 'الباحثون المنتسبون لشمس' : 'Researchers Associated with SHAMS'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {researchers.map((researcher) => renderResearcherCard(researcher))}
          </div>
        </div>

        {/* Project Team Committee */}
        <div>
          <h3 className={`text-xl sm:text-2xl font-semibold mb-4 md:mb-6 text-healthDarkBlue ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {language === 'ar' ? 'فريق المشروع' : 'Project Team'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projectTeam.map((person, index) => renderPersonCard(person, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
