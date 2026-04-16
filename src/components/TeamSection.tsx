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
      },
      tags: ["Leadership"]
    },
    {
      name: "Sofia Sarwary",
      role: {
        en: "Project Manager",
        ar: "مدير المشروع"
      },
      specialization: {
        en: "Project Management",
        ar: "إدارة المشروع"
      },
      tags: ["Project Management"]
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
      },
      tags: ["Events"]
    },
    {
      name: "Hassan Sheather",
      role: {
        en: "Research & Outreach",
        ar: "البحث والتواصل"
      },
      specialization: {
        en: "Research and community outreach",
        ar: "البحث والتواصل المجتمعي"
      },
      tags: ["Research", "Outreach"]
    },
    {
      name: "Darah Freije",
      role: {
        en: "Outreach",
        ar: "التواصل المجتمعي"
      },
      specialization: {
        en: "Community outreach",
        ar: "التواصل المجتمعي"
      },
      tags: ["Outreach"]
    },
    {
      name: "Abdullah Azzawi",
      role: {
        en: "Research & Educational Materials",
        ar: "البحث والمواد التعليمية"
      },
      specialization: {
        en: "Research and educational content development",
        ar: "البحث وتطوير المحتوى التعليمي"
      },
      tags: ["Research", "Education"]
    },
    {
      name: "Alanoud",
      role: {
        en: "Graphic Designer",
        ar: "مصممة جرافيك"
      },
      specialization: {
        en: "Visual design and branding",
        ar: "التصميم البصري والهوية"
      },
      tags: ["Design"]
    },
    {
      name: "Karim Sahlab",
      role: {
        en: "Research & Social Media",
        ar: "البحث ووسائل التواصل الاجتماعي"
      },
      specialization: {
        en: "Research and social media management",
        ar: "البحث وإدارة وسائل التواصل الاجتماعي"
      },
      tags: ["Research", "Social Media"]
    },
    {
      name: "Marta Mhanna",
      role: {
        en: "Research & Social Media",
        ar: "البحث ووسائل التواصل الاجتماعي"
      },
      specialization: {
        en: "Research and social media management",
        ar: "البحث وإدارة وسائل التواصل الاجتماعي"
      },
      tags: ["Research", "Social Media"]
    },
    {
      name: "Mariam Ihab",
      role: {
        en: "Videography",
        ar: "التصوير الفيديو"
      },
      specialization: {
        en: "Video production and content creation",
        ar: "إنتاج الفيديو وإنشاء المحتوى"
      },
      tags: ["Social Media", "Design"]
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
      },
      tags: ["Technology"]
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
      },
      tags: ["Outreach", "Research"]
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
      },
      tags: ["Research", "Outreach"]
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
      },
      tags: ["Outreach"]
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
      },
      tags: ["Technology"]
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {projectTeam.map((person, index) => renderPersonCard(person, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
