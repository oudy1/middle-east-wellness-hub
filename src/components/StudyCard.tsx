import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { StudyData } from "@/lib/studyData";

interface StudyCardProps {
  study: StudyData;
  onViewDetail?: (id: string) => void;
}

const StudyCard = ({ study, onViewDetail }: StudyCardProps) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const thumb = isAr && study.flyerThumbAr ? study.flyerThumbAr : study.flyerThumb;

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-border/50">
      {/* Thumbnail */}
      {thumb && (
        <div className="bg-muted/30 p-3 flex justify-center">
          <img
            src={thumb}
            alt={isAr ? study.titleAr : study.titleEn}
            className="h-40 w-auto object-contain rounded"
            loading="lazy"
          />
        </div>
      )}

      <div className={`p-4 flex flex-col flex-grow ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {study.tags.map((tag, i) => (
            <Badge key={i} className={`${tag.color} text-[10px] px-1.5 py-0.5 border-0 font-medium`}>
              {isAr ? tag.labelAr : tag.labelEn}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-foreground mb-1.5 leading-snug">
          {isAr ? study.titleAr : study.titleEn}
        </h3>

        {/* Summary */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-grow">
          {isAr ? study.summaryAr : study.summaryEn}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {onViewDetail && study.detailComponent && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-primary text-primary hover:bg-primary/10"
              onClick={() => onViewDetail(study.id)}
            >
              {isAr ? 'عرض التفاصيل' : 'View Details'}
            </Button>
          )}
          <a href={study.linkUrl} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
              {isAr ? study.linkLabelAr : study.linkLabelEn}
              <ExternalLink className={`h-3 w-3 ${isAr ? 'mr-1' : 'ml-1'}`} />
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
};

export default StudyCard;
