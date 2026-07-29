// Resource Finder searchable destinations
// Add new resources by editing this single list

export interface SearchableResource {
  id: string;
  title_en: string;
  title_ar: string;
  keywords_en: string[];
  keywords_ar: string[];
  url: string;
  category: 'topics' | 'services' | 'research' | 'healthcare' | 'events' | 'forms';
  anchor?: string;
  isExternal?: boolean;
}

export const searchableResources: SearchableResource[] = [
  // Topics
  {
    id: 'mental-health',
    title_en: 'Mental Health',
    title_ar: 'الصحة النفسية',
    keywords_en: ['mental', 'health', 'depression', 'anxiety', 'stress', 'therapy', 'counseling', 'psychology', 'psychiatry'],
    keywords_ar: ['نفسية', 'صحة', 'اكتئاب', 'قلق', 'توتر', 'علاج', 'استشارة', 'نفسي'],
    url: '/services',
    category: 'topics',
    anchor: 'mental-health'
  },
  {
    id: 'womens-health',
    title_en: "Women's Health",
    title_ar: 'صحة المرأة',
    keywords_en: ['women', 'woman', 'female', 'pregnancy', 'maternal', 'breast', 'gynecology', 'menstrual', 'reproductive'],
    keywords_ar: ['مرأة', 'نساء', 'حمل', 'أمومة', 'ثدي', 'نسائية', 'دورة', 'إنجاب'],
    url: '/services',
    category: 'topics',
    anchor: 'womens-health'
  },
  {
    id: 'diabetes',
    title_en: 'Diabetes',
    title_ar: 'السكري',
    keywords_en: ['diabetes', 'diabetic', 'blood sugar', 'glucose', 'insulin', 'type 1', 'type 2', 'A1C'],
    keywords_ar: ['سكري', 'سكر', 'دم', 'جلوكوز', 'أنسولين'],
    url: '/services#diabetes-education',
    category: 'topics'
  },
  {
    id: 'vaccines',
    title_en: 'Vaccines',
    title_ar: 'اللقاحات',
    keywords_en: ['vaccine', 'vaccination', 'immunization', 'flu shot', 'COVID', 'booster', 'shots'],
    keywords_ar: ['لقاح', 'تطعيم', 'تحصين', 'إنفلونزا', 'كوفيد', 'جرعة'],
    url: '/services#vaccines-immunization',
    category: 'topics'
  },
  {
    id: 'smoking-cessation',
    title_en: 'Smoking Cessation',
    title_ar: 'الإقلاع عن التدخين',
    keywords_en: ['smoking', 'quit', 'tobacco', 'nicotine', 'cigarette', 'vaping', 'cessation', 'stop smoking'],
    keywords_ar: ['تدخين', 'إقلاع', 'تبغ', 'نيكوتين', 'سجائر', 'سيجارة'],
    url: '/services',
    category: 'topics',
    anchor: 'smoking'
  },
  {
    id: 'patient-rights',
    title_en: 'Patient Rights',
    title_ar: 'حقوق المريض',
    keywords_en: ['rights', 'ohip', 'insurance', 'coverage', 'advocacy', 'ontario health', 'athome'],
    keywords_ar: ['حقوق', 'المريض', 'تأمين', 'أوهيب'],
    url: '/services#patient-rights',
    category: 'services'
  },
  {
    id: 'newcomer-navigation',
    title_en: 'Newcomer System Navigation',
    title_ar: 'دليل النظام الصحي للقادمين الجدد',
    keywords_en: ['newcomer', 'immigrant', 'refugee', 'new to Canada', 'navigation', 'system', 'healthcare system', 'OHIP', 'health card', 'IFHP'],
    keywords_ar: ['قادم جديد', 'مهاجر', 'لاجئ', 'كندا', 'نظام', 'صحي', 'بطاقة صحية'],
    url: '/services#community-services',
    category: 'topics'
  },

  // Healthcare Workers
  {
    id: 'find-healthcare-workers',
    title_en: 'Find Healthcare Workers',
    title_ar: 'ابحث عن مقدمي الرعاية الصحية',
    keywords_en: ['doctor', 'physician', 'family doctor', 'therapist', 'clinic', 'Arabic doctor', 'healthcare worker', 'nurse', 'specialist', 'dentist', 'find', 'search'],
    keywords_ar: ['طبيب', 'دكتور', 'عيادة', 'معالج', 'طبيب عائلة', 'طبيب عربي', 'ممرض', 'أخصائي', 'طبيب أسنان', 'بحث'],
    url: '/find-healthcare-workers',
    category: 'healthcare'
  },
  {
    id: 'family-physician',
    title_en: 'Family Physician Directory',
    title_ar: 'دليل أطباء العائلة',
    keywords_en: ['family physician', 'family doctor', 'GP', 'general practitioner', 'primary care', 'kitchener', 'toronto', 'ottawa', 'mississauga', 'london', 'city'],
    keywords_ar: ['طبيب عائلة', 'طبيب عام', 'رعاية أولية', 'مدينة'],
    url: '/find-healthcare-workers#family-physicians',
    category: 'healthcare'
  },

  // Research
  {
    id: 'research',
    title_en: 'Research',
    title_ar: 'الأبحاث',
    keywords_en: ['research', 'study', 'RA', 'research assistant', 'clinical trial', 'survey', 'participate', 'academic'],
    keywords_ar: ['بحث', 'أبحاث', 'دراسة', 'مساعد بحث', 'تجربة سريرية', 'استبيان', 'مشاركة', 'أكاديمي'],
    url: '/research',
    category: 'research',
    anchor: 'research'
  },

  // Events
  {
    id: 'events-recordings',
    title_en: 'Events and Recordings',
    title_ar: 'الفعاليات والتسجيلات',
    keywords_en: ['event', 'events', 'webinar', 'recording', 'workshop', 'seminar', 'lecture', 'video', 'watch'],
    keywords_ar: ['فعالية', 'فعاليات', 'ندوة', 'تسجيل', 'ورشة', 'محاضرة', 'فيديو', 'مشاهدة'],
    url: '/recordings',
    category: 'events'
  },

  // Forms
  {
    id: 'contact',
    title_en: 'Contact SHAMS',
    title_ar: 'تواصل مع شمس',
    keywords_en: ['contact', 'email', 'message', 'reach out', 'get in touch', 'question', 'inquiry'],
    keywords_ar: ['تواصل', 'بريد', 'رسالة', 'اتصال', 'سؤال', 'استفسار'],
    url: '/contact',
    category: 'forms'
  },
  {
    id: 'volunteer',
    title_en: 'Volunteer',
    title_ar: 'التطوع',
    keywords_en: ['volunteer', 'volunteering', 'help', 'join', 'contribute', 'get involved'],
    keywords_ar: ['تطوع', 'مساعدة', 'انضمام', 'مشاركة'],
    url: '/volunteer',
    category: 'forms'
  },
  {
    id: 'suggest-topic',
    title_en: 'Suggest a Topic',
    title_ar: 'اقترح موضوعاً',
    keywords_en: ['suggest', 'topic', 'request', 'idea', 'suggestion'],
    keywords_ar: ['اقتراح', 'موضوع', 'طلب', 'فكرة'],
    url: '/services#topic-request',
    category: 'forms'
  },

  // Services
  {
    id: 'services',
    title_en: 'Community Services',
    title_ar: 'خدمات المجتمع',
    keywords_en: ['services', 'community', 'support', 'help', 'resources', 'programs'],
    keywords_ar: ['خدمات', 'مجتمع', 'دعم', 'مساعدة', 'موارد', 'برامج'],
    url: '/services',
    category: 'services'
  },
  {
    id: 'clinical-tools',
    title_en: 'Clinical Tools and Templates',
    title_ar: 'الأدوات والقوالب السريرية',
    keywords_en: ['clinical', 'tools', 'templates', 'point of care', 'medical student', 'resident', 'physician', 'EHR', 'dotphrase'],
    keywords_ar: ['سريري', 'أدوات', 'قوالب', 'طالب طب', 'مقيم', 'طبيب'],
    url: '/services#clinical-tools',
    category: 'services'
  },
  {
    id: 'about',
    title_en: 'About SHAMS',
    title_ar: 'عن شمس',
    keywords_en: ['about', 'who', 'mission', 'vision', 'team', 'organization', 'non-profit'],
    keywords_ar: ['عن', 'من', 'رسالة', 'رؤية', 'فريق', 'منظمة', 'غير ربحية'],
    url: '/about',
    category: 'services'
  }
];

// Popular searches for quick access chips
export const popularSearches = [
  { id: 'mental-health', label_en: 'Mental Health', label_ar: 'الصحة النفسية' },
  { id: 'womens-health', label_en: "Women's Health", label_ar: 'صحة المرأة' },
  { id: 'diabetes', label_en: 'Diabetes', label_ar: 'السكري' },
  { id: 'vaccines', label_en: 'Vaccines', label_ar: 'اللقاحات' },
  { id: 'smoking-cessation', label_en: 'Smoking', label_ar: 'التدخين' },
  { id: 'newcomer-navigation', label_en: 'Newcomer Navigation', label_ar: 'دليل القادمين الجدد' }
];

// Category labels for grouping
export const categoryLabels = {
  topics: { en: 'Topics', ar: 'المواضيع' },
  services: { en: 'Services', ar: 'الخدمات' },
  research: { en: 'Research', ar: 'الأبحاث' },
  healthcare: { en: 'Healthcare Workers', ar: 'مقدمو الرعاية' },
  events: { en: 'Events', ar: 'الفعاليات' },
  forms: { en: 'Forms', ar: 'النماذج' }
};

// Synonym map for smarter matching
const SYNONYMS: Record<string, string[]> = {
  doctor: ['physician', 'gp', 'clinician', 'family doctor'],
  therapist: ['counselor', 'counsellor', 'psychologist', 'psychiatrist'],
  heart: ['cardio', 'cardiac', 'cardiovascular', 'ekg', 'ecg'],
  mental: ['anxiety', 'depression', 'stress', 'psychology'],
  webinar: ['recording', 'video', 'seminar', 'workshop'],
  study: ['research', 'trial', 'survey'],
  opportunity: ['volunteer', 'role', 'opportunities'],
  refugee: ['newcomer', 'immigrant', 'ifhp'],
  rights: ['ohip', 'insurance', 'coverage'],
};

function editDist(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const dp: number[] = Array(b.length + 1).fill(0).map((_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i - 1;
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : Math.min(prev, dp[j], dp[j - 1]) + 1;
      prev = tmp;
    }
  }
  return dp[b.length];
}

function expandQuery(q: string): string[] {
  const tokens = q.toLowerCase().split(/\s+/).filter(t => t.length > 1);
  const out = new Set<string>(tokens);
  for (const t of tokens) {
    for (const [key, syns] of Object.entries(SYNONYMS)) {
      if (t === key || syns.includes(t)) {
        out.add(key);
        syns.forEach(s => out.add(s));
      }
    }
  }
  return Array.from(out);
}

// Search function with synonym + fuzzy support
export function searchResources(query: string, language: 'en' | 'ar'): SearchableResource[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const tokens = expandQuery(normalizedQuery);

  return searchableResources.filter(resource => {
    const title = (language === 'ar' ? resource.title_ar : resource.title_en).toLowerCase();
    const allKeywords = [...resource.keywords_en, ...resource.keywords_ar].map(k => k.toLowerCase());

    // Direct substring match on title or keywords
    if (title.includes(normalizedQuery)) return true;
    if (allKeywords.some(k => k.includes(normalizedQuery) || normalizedQuery.includes(k))) return true;

    // Token / synonym match
    for (const t of tokens) {
      if (title.includes(t)) return true;
      if (allKeywords.some(k => k.includes(t))) return true;
      // Fuzzy match for typos on longer tokens
      if (t.length > 4 && allKeywords.some(k => k.length > 3 && editDist(t, k) <= 1)) return true;
    }
    return false;
  });
}

// Get resource by ID (for popular searches)
export function getResourceById(id: string): SearchableResource | undefined {
  return searchableResources.find(r => r.id === id);
}
