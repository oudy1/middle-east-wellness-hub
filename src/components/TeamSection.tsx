import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import teamData from "../../content/team.json";

interface TeamMember {
  name: string;
  roleEn: string;
  roleAr: string;
  specializationEn: string;
  specializationAr: string;
  tags?: string[];
}

const TeamSection = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const renderPersonCard = (person: TeamMember, index: number) => (
    <Card key={index} className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className={`text-healthDarkBlue text-lg md:text-xl leading-tight ${isAr ? 'text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
          {person.name}
        </CardTitle>
        <p className={`text-healthTeal font-medium text-sm md:text-base ${isAr ? 'text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
          {isAr ? person.roleAr : person.roleEn}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <p className={`text-gray-600 text-sm md:text-base leading-relaxed ${isAr ? 'text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
          {isAr ? person.specializationAr : person.specializationEn}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-12 md:py-16 bg-healthLightGray">
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-healthDarkBlue ${isAr ? 'font-cairo' : ''}`}>
          {isAr ? 'فريقنا' : 'Our Team'}
        </h2>
        
        <div className="mb-8 md:mb-12">
          <h3 className={`text-xl sm:text-2xl font-semibold mb-4 md:mb-6 text-healthDarkBlue ${isAr ? 'text-right font-cairo' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
            {isAr ? 'الأطباء المنتسبون' : 'Affiliated Physicians'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {teamData.affiliatedPhysicians.map((person, index) => renderPersonCard(person, index))}
          </div>
        </div>

        <div>
          <h3 className={`text-xl sm:text-2xl font-semibold mb-4 md:mb-6 text-healthDarkBlue ${isAr ? 'text-right font-cairo' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
            {isAr ? 'فريق المشروع' : 'Project Team'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {teamData.projectTeam.map((person, index) => renderPersonCard(person, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
