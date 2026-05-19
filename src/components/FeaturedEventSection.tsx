import { Calendar, MapPin, Utensils, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import eventPoster from "@/assets/arabs-in-healthcare-event.png";

const REGISTER_URL =
  "https://www.zeffy.com/en-CA/ticketing/arabs-in-healthcare-networking-event";

const FeaturedEventSection = () => {
  const { language } = useLanguage();
  const isRTL = language === "ar" || language === "ku" || language === "fa";
  const isAr = language === "ar";

  const title = isAr
    ? "لقاء العرب في الرعاية الصحية"
    : "Arabs in Healthcare Networking Event";

  const description = isAr
    ? "انضموا إلى مشروع شمس في لقاء حضوري يجمع العاملين في المجال الصحي من العرب والشرق أوسطيين، من أطباء وممرضين وأطباء أسنان وصيادلة وأخصائيي تغذية ومعالجين ومقيمين وغيرهم من العاملين في الرعاية الصحية."
    : "Join SHAMS for an in-person networking event bringing together Arab and Middle Eastern healthcare professionals, including physicians, nurses, dentists, pharmacists, dietitians, therapists, residents, and other healthcare workers.";

  const dateLabel = isAr ? "الأربعاء، 3 يونيو" : "Wednesday, June 3";
  const location = "2578 Bristol Circle, Unit 4, Oakville, ON L6H 6T7";
  const food = isAr ? "الطعام والمشروبات متوفرة" : "Food & drinks included";
  const limited = isAr ? "التذاكر محدودة" : "Tickets are limited";
  const cta = isAr ? "التسجيل هنا" : "Register Here";
  const badge = isAr ? "فعالية قادمة" : "Upcoming Event";

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div
          className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
            isRTL ? "font-cairo" : ""
          }`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="order-1 md:order-1 flex justify-center">
            <img
              src={eventPoster}
              alt={title}
              className="w-full max-w-xs md:max-w-sm h-auto rounded-2xl shadow-xl border border-border/50"
            />
          </div>

          <div className="order-2 md:order-2 space-y-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-healthGold/20 text-healthDarkBlue rounded-full">
              {badge}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {title}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {description}
            </p>

            <ul className="space-y-2 text-sm md:text-base text-foreground">
              <li className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{dateLabel}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{location}</span>
              </li>
              <li className="flex items-start gap-2">
                <Utensils className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{food}</span>
              </li>
              <li className="flex items-start gap-2">
                <Ticket className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{limited}</span>
              </li>
            </ul>

            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="bg-healthRed hover:bg-red-700 text-white shadow-md"
              >
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cta}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventSection;
