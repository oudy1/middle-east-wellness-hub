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
  detailComponent?: string; // identifier for which detail to show
}

export const studies: StudyData[] = [
  {
    id: 'dream-deferred',
    titleEn: 'The Canadian Dream Deferred',
    titleAr: 'الحلم الكندي المؤجل',
    summaryEn: 'University of Toronto study exploring how Egyptian Canadians experience and define adulthood in the GTA.',
    summaryAr: 'دراسة من جامعة تورنتو تستكشف كيف يفهم الكنديون من أصول مصرية مرحلة النضج.',
    tags: [
      { labelEn: 'Ongoing', labelAr: 'جارية', color: 'bg-green-100 text-green-800' },
      { labelEn: 'External', labelAr: 'خارجية', color: 'bg-amber-100 text-amber-800' },
    ],
    linkUrl: 'https://dreamdeferred-egyptian-canadian.weebly.com/',
    linkLabelEn: 'Learn More',
    linkLabelAr: 'المزيد',
    flyerThumb: '/lovable-uploads/dream-deferred-flyer-en.png',
    flyerThumbAr: '/lovable-uploads/dream-deferred-flyer-ar.png',
    contactEmail: 'canadiandreamdeferred@gmail.com',
    detailComponent: 'dream-deferred',
  },
  {
    id: 'rise-c',
    titleEn: 'RISE-C Study',
    titleAr: 'دراسة RISE-C',
    summaryEn: 'Paid research study for people of colour in Canada exploring daily experiences, safety, and wellbeing.',
    summaryAr: 'دراسة مدفوعة للأشخاص الملوّنين في كندا حول التجارب اليومية والسلامة والرفاهية.',
    tags: [
      { labelEn: 'Paid', labelAr: 'مدفوعة', color: 'bg-yellow-100 text-yellow-800' },
      { labelEn: 'Mental Health', labelAr: 'صحة نفسية', color: 'bg-purple-100 text-purple-800' },
      { labelEn: 'Ongoing', labelAr: 'جارية', color: 'bg-green-100 text-green-800' },
    ],
    linkUrl: 'https://uwo.eu.qualtrics.com/jfe/form/SV_a8BHB591h11CmUe',
    linkLabelEn: 'Take Pre-Screening',
    linkLabelAr: 'ابدأ استبيان التأهيل',
    flyerThumb: '/lovable-uploads/rise-c-flyer.png',
    contactEmail: 'rise-c.study@uwo.ca',
    detailComponent: 'rise-c',
  },
  {
    id: 'sawa',
    titleEn: 'SAWA Study',
    titleAr: 'دراسة سوا',
    summaryEn: 'Exploring social experiences, wellbeing, and health of Arab adolescents in the Greater Toronto Area.',
    summaryAr: 'تستكشف التجارب الاجتماعية ورفاهية وصحة المراهقين العرب في منطقة تورنتو الكبرى.',
    tags: [
      { labelEn: 'Youth', labelAr: 'شباب', color: 'bg-blue-100 text-blue-800' },
      { labelEn: 'Paid', labelAr: 'مدفوعة', color: 'bg-yellow-100 text-yellow-800' },
      { labelEn: 'External', labelAr: 'خارجية', color: 'bg-amber-100 text-amber-800' },
    ],
    linkUrl: 'mailto:sawastudy.anthro@utoronto.ca',
    linkLabelEn: 'Contact Study Team',
    linkLabelAr: 'تواصل مع فريق الدراسة',
    flyerThumb: '/lovable-uploads/sawa-flyer-parent-en.png',
    flyerThumbAr: '/lovable-uploads/sawa-flyer-parent-ar.png',
    contactEmail: 'sawastudy.anthro@utoronto.ca',
    detailComponent: 'sawa',
  },
  {
    id: 'youth-education',
    titleEn: 'Youth, Education & Human Rights in Ontario',
    titleAr: 'الشباب والتعليم وحقوق الإنسان في أونتاريو',
    summaryEn: 'Exploring how high school experiences shape young people\'s understanding of human rights. Ages 18-25.',
    summaryAr: 'تستكشف كيف تشكل تجارب المدرسة الثانوية فهم الشباب لحقوق الإنسان. الأعمار 18-25.',
    tags: [
      { labelEn: 'Youth', labelAr: 'شباب', color: 'bg-blue-100 text-blue-800' },
      { labelEn: 'Paid', labelAr: 'مدفوعة', color: 'bg-yellow-100 text-yellow-800' },
      { labelEn: 'External', labelAr: 'خارجية', color: 'bg-amber-100 text-amber-800' },
    ],
    linkUrl: 'https://bit.ly/488lp3w',
    linkLabelEn: 'Learn More / Sign Up',
    linkLabelAr: 'تعرف على المزيد / سجّل الآن',
    contactEmail: undefined,
    detailComponent: 'youth-education',
  },
];
