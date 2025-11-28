import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const TeamSection = () => {
  const { language } = useLanguage();
  
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
