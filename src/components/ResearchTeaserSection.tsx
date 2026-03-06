import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { studies } from "@/lib/studyData";
import StudyCard from "@/components/StudyCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ResearchTeaserSection = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className="py-16 md:py-20 bg-white relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-3">
          <GraduationCap className="h-8 w-8 text-primary mr-2" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {isAr ? 'فرص البحث' : 'Research Studies'}
          </h2>
        </div>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          {isAr
            ? 'شمس تدعم عملية التوظيف لهذه الدراسات بالشراكة مع مؤسسات بحثية'
            : 'SHAMS supports recruitment for these studies in partnership with research institutions'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-8">
          {studies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/resources">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              {isAr ? 'عرض جميع الدراسات والموارد' : 'View All Studies & Resources'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResearchTeaserSection;
