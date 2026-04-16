import studiesData from "../../content/studies.json";

export interface StudyData {
  id: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  tags: { labelEn: string; labelAr: string; color: string }[];
  linkUrl: string;
  linkLabelEn: string;
  linkLabelAr: string;
  flyerThumb?: string;
  flyerThumbAr?: string;
  contactEmail?: string;
  detailComponent?: string;
}

export const studies: StudyData[] = studiesData as StudyData[];
