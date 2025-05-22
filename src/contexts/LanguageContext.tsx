import React, { createContext, useState, useContext, ReactNode } from "react";

type LanguageContextType = {
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
  t: (key: string) => string;
};

const translations = {
  // Header translations
  "header.home": {
    en: "Home",
    ar: "الرئيسية"
  },
  "header.aboutUs": {
    en: "About Us",
    ar: "عن المبادرة"
  },
  "header.forCommunity": {
    en: "For the Community",
    ar: "للمجتمع"
  },
  "header.forClinicians": {
    en: "For Clinicians/Researchers",
    ar: "للأطباء/الباحثين"
  },
  "header.diseases": {
    en: "Diseases",
    ar: "الأمراض"
  },
  "header.contact": {
    en: "Contact",
    ar: "اتصل بنا"
  },
  "header.webinars": {
    en: "Recorded Webinars",
    ar: "ندوات مسجلة"
  },
  
  // Hero Section
  "hero.organizationName": {
    en: "SHAMS",
    ar: "شمس"
  },
  "hero.tagline": {
    en: "Supporting Health & Advocacy for Middle Eastern Societies",
    ar: "دعم الصحة والدفاع عن مجتمعات الشرق الأوسط"
  },
  "hero.title": {
    en: "Advancing Middle Eastern Healthcare",
    ar: "تطوير الرعاية الصحية في الشرق الأوسط"
  },
  "hero.subtitle": {
    en: "Our mission is to improve healthcare access, research, and outcomes for communities across the Middle East through innovative solutions and education.",
    ar: "مهمتنا هي تحسين الوصول إلى الرعاية الصحية والبحث والنتائج للمجتمعات في جميع أنحاء الشرق الأوسط من خلال الحلول المبتكرة والتعليم."
  },
  "hero.learnMore": {
    en: "Learn About Our Mission",
    ar: "تعرف على مهمتنا"
  },
  "hero.support": {
    en: "Support Our Work",
    ar: "ادعم عملنا"
  },
  
  // Mission Section
  "mission.title": {
    en: "Our Mission",
    ar: "مهمتنا"
  },
  
  // Team translations
  "team.meetOurTeam": {
    en: "Meet Our Team",
    ar: "تعرّف على فريقنا"
  },
  "team.title": {
    en: "Our Team",
    ar: "فريقنا"
  },
  "team.subtitle": {
    en: "Meet the dedicated professionals working to bridge healthcare gaps for Middle Eastern communities.",
    ar: "تعرف على المتخصصين المتفانين الذين يعملون على سد فجوات الرعاية الصحية لمجتمعات الشرق الأوسط."
  },
  "team.comingSoon": {
    en: "Team members profile content coming soon.",
    ar: "محتوى ملفات أعضاء الفريق قريبًا."
  },
  
  // Resources Section
  "resources.title": {
    en: "Community Resources",
    ar: "موارد المجتمع"
  },
  "resources.subtitle": {
    en: "Explore our collection of resources to support healthcare advancement and research in Middle Eastern communities.",
    ar: "استكشف مجموعتنا من الموارد لدعم تقدم الرعاية الصحية والبحث في مجتمعات الشرق الأوسط."
  },
  "resources.researchPlatform": {
    en: "Research Platform",
    ar: "منصة البحث"
  },
  "resources.researchPlatformDesc": {
    en: "Access our platform supporting high-quality research in healthcare across the Middle East.",
    ar: "الوصول إلى منصتنا التي تدعم البحث عالي الجودة في مجال الرعاية الصحية في جميع أنحاء الشرق الأوسط."
  },
  "resources.educationalMaterials": {
    en: "Educational Materials",
    ar: "المواد التعليمية"
  },
  "resources.educationalMaterialsDesc": {
    en: "Explore educational resources about health innovations and treatments specific to Middle Eastern populations.",
    ar: "استكشف الموارد التعليمية حول الابتكارات الصحية والعلاجات الخاصة بسكان الشرق الأ��سط."
  },
  "resources.newsletterArchive": {
    en: "Newsletter Archive",
    ar: "أرشيف النشرة الإخبارية"
  },
  "resources.newsletterArchiveDesc": {
    en: "Browse our newsletter archive to stay informed of the latest news and events from our health community.",
    ar: "تصفح أرشيف نشرتنا الإخبارية للبقاء على اطلاع بأحدث الأخبار والأحداث من مجتمعنا الصحي."
  },
  "resources.webinarLibrary": {
    en: "Webinar Library",
    ar: "مكتبة الندوات عبر الإنترنت"
  },
  "resources.webinarLibraryDesc": {
    en: "Access our library of past webinars on important health topics relevant to Middle Eastern communities.",
    ar: "الوصول إلى مكتبتنا من الندوات السابقة حول مواضيع صحية مهمة ذات صلة بمجتمعات الشرق الأوسط."
  },
  "resources.accessResource": {
    en: "Access Resource",
    ar: "الوصول إلى المورد"
  },
  
  // Partners Section
  "partners.title": {
    en: "Our Partners",
    ar: "شركاؤنا"
  },
  "partners.subtitle": {
    en: "We collaborate with leading organizations to advance healthcare in Middle Eastern communities",
    ar: "نتعاون مع المنظمات الرائدة لتطوير الرعاية الصحية في مجتمعات الشرق الأوسط"
  },
  "partners.regionalHealth": {
    en: "Regional Health Foundation",
    ar: "مؤسسة الصحة الإقليمية"
  },
  "partners.regionalHealthDesc": {
    en: "Supporting healthcare initiatives across the Middle East",
    ar: "دعم المبادرات الصحية في جميع أنحاء الشرق الأوسط"
  },
  "partners.globalMedical": {
    en: "Global Medical Research",
    ar: "البحوث الطبية العالمية"
  },
  "partners.globalMedicalDesc": {
    en: "Advancing medical research in underserved populations",
    ar: "تطوير البحوث الطبية في المجتمعات المحرومة من الخدمات"
  },
  "partners.healthAccess": {
    en: "Health Access Network",
    ar: "شبكة الوصول إلى الرعاية الصحية"
  },
  "partners.healthAccessDesc": {
    en: "Improving healthcare access for communities in need",
    ar: "تحسين الوصول إلى الرعاية الصحية للمجتمعات المحتاجة"
  },
  "partners.culturalAlliance": {
    en: "Cultural Health Alliance",
    ar: "تحالف الصحة الثقافية"
  },
  "partners.culturalAllianceDesc": {
    en: "Promoting culturally responsive healthcare practices",
    ar: "تعزيز ممارسات الرعاية الصحية المستجيبة ثقافيًا"
  },
  "partners.medicalSociety": {
    en: "Middle Eastern Medical Society",
    ar: "الجمعية الطبية للشرق الأوسط"
  },
  "partners.medicalSocietyDesc": {
    en: "Professional association for healthcare providers",
    ar: "الرابطة المهنية لمقدمي الرعاية الصحية"
  },
  
  // Impact Section
  "impact.title": {
    en: "Our Impact",
    ar: "تأثيرنا"
  },
  "impact.subtitle": {
    en: "Making a difference in healthcare access and outcomes for Middle Eastern communities",
    ar: "إحداث فرق في الوصول إلى الرعاية الصحية والنتائج لمجتمعات الشرق الأوسط"
  },
  "impact.communityMembers": {
    en: "Community members reached through health initiatives",
    ar: "أعضاء المجتمع الذين تم الوصول إليهم من خلال المبادرات الصحية"
  },
  "impact.partnerOrganizations": {
    en: "Partner organizations across the Middle East and Canada",
    ar: "المنظمات الشريكة في جميع أنحاء الشرق الأوسط وكندا"
  },
  "impact.researchStudies": {
    en: "Research studies published on Middle Eastern healthcare",
    ar: "الدراسات البحثية المنشورة حول الرعاية الصحية في الشرق الأوسط"
  },
  "impact.upcomingInitiative": {
    en: "Upcoming Initiative",
    ar: "المبادرة القادمة"
  },
  "impact.upcomingInitiativeDesc": {
    en: "Regional health assessment program launching in collaboration with local communities",
    ar: "برنامج تقييم الصحة الإقليمي الذي يتم إطلاقه بالتعاون مع المجتمعات المحلية"
  },
  "impact.startingDate": {
    en: "Starting July 2025",
    ar: "يبدأ في يوليو 2025"
  },
  "impact.whatsNew": {
    en: "What's New",
    ar: "ما الجديد"
  },
  "impact.whatsNewDesc": {
    en: "New research grant secured to study healthcare access disparities in rural areas",
    ar: "تم تأمين منحة بحثية جديدة لدراسة التفاوتات في الوصول إلى الرعاية الصحية في المناطق الريفية"
  },
  "impact.whatsNewDate": {
    en: "May 2025",
    ar: "مايو 2025"
  },
  "impact.learnMore": {
    en: "Learn More About Our Impact",
    ar: "تعرف على المزيد حول تأثيرنا"
  },
  
  // Stats Section
  "stats.title": {
    en: "Our Impact in Numbers",
    ar: "تأثيرنا بالأرقام"
  },
  "stats.researchProjects": {
    en: "Research Projects",
    ar: "المشاريع البحثية"
  },
  "stats.partnerHospitals": {
    en: "Partner Hospitals",
    ar: "المستشفيات الشريكة"
  },
  "stats.patientsServed": {
    en: "Patients Served",
    ar: "المرضى الذين تم خدمتهم"
  },
  "stats.countries": {
    en: "Countries",
    ar: "الدول"
  },
  
  // Newsletter Section
  "newsletter.title": {
    en: "Subscribe to Our Newsletter",
    ar: "اشترك في نشرتنا الإخبارية"
  },
  "newsletter.subtitle": {
    en: "Stay updated with the latest health research, events, and resources",
    ar: "ابق على اطلاع بأحدث الأبحاث الصحية والفعاليات والموارد"
  },
  "newsletter.placeholder": {
    en: "Your email address",
    ar: "عنوان بريدك الإلكتروني"
  },
  "newsletter.subscribing": {
    en: "Subscribing...",
    ar: "جاري الاشتراك..."
  },
  "newsletter.button": {
    en: "Subscribe",
    ar: "اشترك"
  },
  "newsletter.successTitle": {
    en: "Success!",
    ar: "تم بنجاح!"
  },
  "newsletter.successDescription": {
    en: "Thank you for subscribing to our newsletter.",
    ar: "شكرًا لاشتراكك في نشرتنا الإخبارية."
  },
  
  // Upcoming Events Section
  "events.title": {
    en: "Upcoming Events",
    ar: "الفعاليات القادمة"
  },
  "events.subtitle": {
    en: "Join us at our upcoming events and be part of our community",
    ar: "انضم إلينا في فعالياتنا القادمة وكن جزءًا من مجتمعنا"
  },
  "events.viewAll": {
    en: "View All Events",
    ar: "عرض جميع الفعاليات"
  },
  "events.healthcareSymposium": {
    en: "Healthcare Symposium",
    ar: "ندوة الرعاية الصحية"
  },
  "events.healthcareSymposiumDesc": {
    en: "Join leading healthcare professionals to discuss innovations in Middle Eastern healthcare practices.",
    ar: "انضم إلى متخصصي الرعاية الصحية الرائدين لمناقشة الابتكارات في ممارسات الرعاية الصحية في الشرق الأوسط."
  },
  "events.communityWorkshop": {
    en: "Community Health Workshop",
    ar: "ورشة عمل الصحة المجتمعية"
  },
  "events.communityWorkshopDesc": {
    en: "Learn about cultural competency in healthcare delivery for Middle Eastern communities.",
    ar: "تعرف على الكفاءة الثقافية في تقديم الرعاية الصحية للمجتمعات في الشرق الأوسط."
  },
  "events.researchDay": {
    en: "Research Presentation Day",
    ar: "يوم عرض الأبحاث"
  },
  "events.researchDayDesc": {
    en: "Showcase of ongoing research projects focused on healthcare challenges in the Middle East.",
    ar: "عرض لمشاريع البحث الجارية التي تركز على تحديات الرعاية الصحية في الشرق الأوسط."
  },
  "events.date": {
    en: "Date",
    ar: "التاريخ"
  },
  "events.location": {
    en: "Location",
    ar: "الموقع"
  },
  "events.virtual": {
    en: "Virtual Event",
    ar: "فعالية افتراضية"
  },
  "events.toronto": {
    en: "Toronto, Canada",
    ar: "تورنتو، كندا"
  },
  "events.ottawa": {
    en: "Ottawa Convention Center",
    ar: "مركز أوتاوا للمؤتمرات"
  },
  "events.register": {
    en: "Register Now",
    ar: "سجل الآن"
  },
  
  // Footer
  "footer.title": {
    en: "SHAMS",
    ar: "شمس"
  },
  "footer.subtitle": {
    en: "Supporting Health & Advocacy for Middle Eastern Societies",
    ar: "دعم الصحة والدفاع عن مجتمعات الشرق الأوسط"
  },
  "footer.description": {
    en: "Dedicated to improving healthcare access and outcomes for communities across the Middle East.",
    ar: "مكرسة لتحسين الوصول إلى الرعاية الصحية والنتائج للمجتمعات في جميع أنحاء الشرق الأوسط."
  },
  "footer.quickLinks": {
    en: "Quick Links",
    ar: "روابط سريعة"
  },
  "footer.resources": {
    en: "Resources",
    ar: "الموارد"
  },
  "footer.research": {
    en: "Research",
    ar: "البحث"
  },
  "footer.publications": {
    en: "Publications",
    ar: "المنشورات"
  },
  "footer.webinars": {
    en: "Webinars",
    ar: "الندوات عبر الإنترنت"
  },
  "footer.newsletter": {
    en: "Newsletter",
    ar: "النشرة الإخبارية"
  },
  "footer.faq": {
    en: "FAQ",
    ar: "الأسئلة المتكررة"
  },
  "footer.contactUs": {
    en: "Contact Us",
    ar: "اتصل بنا"
  },
  "footer.address1": {
    en: "123 Healthcare Avenue",
    ar: "١٢٣ شارع الرعاية الصحية"
  },
  "footer.address2": {
    en: "Dubai, UAE",
    ar: "دبي، الإمارات العربية المتحدة"
  },
  "footer.email": {
    en: "Email: info@mehealthinitiative.org",
    ar: "البريد الإلكتروني: info@mehealthinitiative.org"
  },
  "footer.phone": {
    en: "Phone: +971 4 123 4567",
    ar: "الهاتف: +٩٧١ ٤ ١٢٣ ٤٥٦٧"
  },
  "footer.copyright": {
    en: "Middle Eastern Health Initiative. All rights reserved.",
    ar: "مبادرة الصحة في الشرق الأوسط. جميع الحقوق محفوظة."
  },
  "footer.privacy": {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية"
  },
  "footer.terms": {
    en: "Terms of Service",
    ar: "شروط الخدمة"
  },
  "footer.cookies": {
    en: "Cookie Policy",
    ar: "سياسة ملفات تعريف الارتباط"
  },
  
  // Diseases Page
  "diseases.title": {
    en: "Common Diseases",
    ar: "الأمراض الشائعة"
  },
  "diseases.subtitle": {
    en: "Educational resources about common health conditions affecting Middle Eastern communities, with culturally relevant information and support.",
    ar: "موارد تعليمية حول الحالات الصحية الشائعة التي تؤثر على مجتمعات الشرق الأوسط، مع معلومات ودعم ملائم ثقافيًا."
  },
  "diseases.learnMore": {
    en: "Learn More",
    ar: "اقرأ المزيد"
  },
  "diseases.contextTitle": {
    en: "Understanding Cultural Context",
    ar: "فهم السياق الثقافي"
  },
  "diseases.contextDescription": {
    en: "Health conditions can present differently across populations and may be influenced by genetic, environmental, and cultural factors. Our resources are designed to provide information that is relevant to Middle Eastern communities while acknowledging the diversity within these populations.",
    ar: "يمكن أن تظهر الحالات الصحية بشكل مختلف عبر السكان وقد تتأثر بالعوامل الوراثية والبيئية والثقافية. تم تصميم مواردنا لتوفير معلومات ذات صلة بمجتمعات الشرق الأوسط مع الاعتراف بالتنوع داخل هذه المجتمعات."
  },
  "diseases.personalizedTitle": {
    en: "Looking for personalized guidance?",
    ar: "هل تبحث عن إرشادات شخصية؟"
  },
  "diseases.personalizedDescription": {
    en: "Contact our team of healthcare professionals for culturally sensitive support.",
    ar: "اتصل بفريقنا من متخصصي الرعاية الصحية للحصول على دعم مراعي للثقافة."
  },
  "diseases.contactSpecialist": {
    en: "Contact a Specialist",
    ar: "تواصل مع متخصص"
  },
  
  // Disease Names
  "disease.diabetes": {
    en: "Diabetes",
    ar: "مرض السكري"
  },
  "disease.diabetesDesc": {
    en: "Diabetes is a chronic condition that affects how your body processes blood sugar. Learn about risk factors in Middle Eastern populations, symptoms, management strategies, and cultural considerations for treatment.",
    ar: "مرض السكري هو حالة مزمنة تؤثر على كيفية معالجة جسمك للسكر في الدم. تعرف على عوامل الخطر في مجتمعات الشرق الأوسط، والأعراض، واستراتيجيات الإدارة، والاعتبارات الثقافية للعلاج."
  },
  "disease.heartDisease": {
    en: "Heart Disease",
    ar: "أمراض القلب"
  },
  "disease.heartDiseaseDesc": {
    en: "Heart disease is a leading cause of mortality worldwide. Discover specific risk factors in Middle Eastern communities, prevention strategies, early warning signs, and culturally appropriate interventions.",
    ar: "أمراض القلب هي سبب رئيسي للوفيات في جميع أنحاء العالم. اكتشف عوامل الخطر المحددة في مجتمعات الشرق الأوسط، واستراتيجيات الوقاية، وعلامات التحذير المبكرة، والتدخلات الملائمة ثقافيًا."
  },
  "disease.mentalHealth": {
    en: "Mental Health Conditions",
    ar: "حالات الصحة النفسية"
  },
  "disease.mentalHealthDesc": {
    en: "Mental health conditions affect millions globally but are often stigmatized in many communities. Explore common mental health challenges, cultural perspectives, and resources for support.",
    ar: "تؤثر حالات الصحة النفسية على الملايين على مستوى العالم ولكنها غالبًا ما تكون موصومة في العديد من المجتمعات. استكشف تحديات الصحة النفسية الشائعة، والمنظورات الثقافية، وموارد الدعم."
  },
  "disease.respiratory": {
    en: "Respiratory Diseases",
    ar: "أمراض الجهاز التنفسي"
  },
  "disease.respiratoryDesc": {
    en: "Respiratory diseases like asthma and COPD can significantly impact quality of life. Learn about prevalence in Middle Eastern populations, environmental factors, and management approaches.",
    ar: "يمكن أن تؤثر أمراض الجهاز التنفسي مثل الربو ومرض الانسداد الرئوي المزمن بشكل كبير على جودة الحياة. تعرف على انتشارها في مجتمعات الشرق الأوسط، والعوامل البيئية، ونهج الإدارة."
  },
  
  // Webinars Page
  "webinars.title": {
    en: "Recorded Webinars",
    ar: "ندوات مسجلة"
  },
  "webinars.subtitle": {
    en: "Access our library of educational webinars featuring expert insights on health topics relevant to Middle Eastern communities.",
    ar: "الوصول إلى مكتبتنا من الندوات التعليمية التي تتضمن رؤى خبراء حول مواضيع صحية ذات صلة بمجتمعات الشرق الأوسط."
  },
  "webinars.watchNow": {
    en: "Watch Now",
    ar: "شاهد الآن"
  },
  "webinars.requestTitle": {
    en: "Request a Topic",
    ar: "اقترح موضوعًا"
  },
  "webinars.requestDesc": {
    en: "Is there a health topic you'd like us to cover in a future webinar? Let us know, and our medical experts will consider it for upcoming sessions.",
    ar: "هل هناك موضوع صحي ترغب في أن نغطيه في ندوة مستقبلية؟ أخبرنا، وسينظر خبراؤنا الطبيون في ذلك للجلسات القادمة."
  },
  "webinars.upcomingTitle": {
    en: "Upcoming Live Webinars",
    ar: "الندوات الحية القادمة"
  },
  "webinars.upcomingDesc": {
    en: "Join our next live session for interactive Q&A with health experts.",
    ar: "انضم إلى جلستنا المباشرة القادمة للأسئلة والأجوبة التفاعلية مع خبراء الصحة."
  },
  "webinars.viewSchedule": {
    en: "View Schedule",
    ar: "عرض الجدول الزمني"
  },
  
  // 404 Page
  "notFound.title": {
    en: "404",
    ar: "404"
  },
  "notFound.subtitle": {
    en: "Oops! Page not found",
    ar: "عذراً! الصفحة غير موجودة"
  },
  "notFound.description": {
    en: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
    ar: "قد تكون الصفحة التي تبحث عنها قد تمت إزالتها، أو تغير اسمها، أو أنها غير متوفرة مؤقتًا."
  },
  "notFound.returnHome": {
    en: "Return to Home",
    ar: "العودة إلى الصفحة الرئيسية"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === "ar" ? "rtl" : "ltr"} className={language === "ar" ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
