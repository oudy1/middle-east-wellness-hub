import studiesData from "../../content/studies.json";
import { isPublished } from "./contentStatus";

export interface StudyData {
  id: string;
  /** Only "published" studies are shown (see src/lib/contentStatus.ts). */
  status: string;
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

export const studies: StudyData[] = (studiesData as StudyData[]).filter((s) => isPublished(s.status));
