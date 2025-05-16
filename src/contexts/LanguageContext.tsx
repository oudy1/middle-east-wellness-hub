
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
  "header.about": {
    en: "About",
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
  
  // Resources Section
  "resources.title": {
    en: "Community Resources",
    ar: "موارد المجتمع"
  },
  "resources.subtitle": {
    en: "Explore our collection of resources to support healthcare advancement and research in Middle Eastern communities.",
    ar: "استكشف مجموعتنا من الموارد لدعم تقدم الرعاية الصحية والبحث في مجتمعات الشرق الأوسط."
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
  "newsletter.button": {
    en: "Subscribe",
    ar: "اشترك"
  },
  
  // Team Page
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
