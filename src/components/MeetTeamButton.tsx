
import { Button } from "@/components/ui/button";
import { UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const MeetTeamButton = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <Button 
            asChild
            className="bg-healthRed hover:bg-red-700 text-white px-8 py-6 text-lg flex items-center shadow-lg hover:shadow-xl transition-all"
          >
            <Link to="/about">
              <UsersRound className="mr-2 h-6 w-6" />
              {t("team.meetOurTeam")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MeetTeamButton;
