
import React, { createContext, useState, useContext, ReactNode } from "react";

type LanguageContextType = {
  language: "en" | "ar" | "ku" | "fa" | "tr";
  setLanguage: (lang: "en" | "ar" | "ku" | "fa" | "tr") => void;
  t: (key: string) => string;
};

const translations = {
  // Header translations
  "header.home": {
    en: "Home",
    ar: "الرئيسية",
    ku: "ماڵەوە",
    fa: "خانه",
    tr: "Ana Sayfa"
  },
  "header.aboutUs": {
    en: "About Us",
    ar: "عن المبادرة",
    ku: "دەربارەمان",
    fa: "درباره ما",
    tr: "Hakkımızda"
  },
  "header.forCommunity": {
    en: "Services and Programs",
    ar: "الخدمات والبرامج",
    ku: "خزمەتگوزاری و بەرنامەکان",
    fa: "خدمات و برنامه ها",
    tr: "Hizmetler ve Programlar"
  },
  "header.forClinicians": {
    en: "Research",
    ar: "البحث",
    ku: "توێژینەوە",
    fa: "تحقیقات",
    tr: "Araştırma"
  },
  "header.diseases": {
    en: "Diseases",
    ar: "الأمراض",
    ku: "نەخۆشییەکان",
    fa: "بیماری ها",
    tr: "Hastalıklar"
  },
  "header.contact": {
    en: "Contact",
    ar: "اتصل بنا",
    ku: "پەیوەندی",
    fa: "تماس",
    tr: "İletişim"
  },
  "header.webinars": {
    en: "Workshops and Resources",
    ar: "ورش العمل والموارد",
    ku: "وۆرکشۆپ و سەرچاوەکان",
    fa: "کارگاه ها و منابع",
    tr: "Atölyeler ve Kaynaklar"
  },
  "header.physicianDirectory": {
    en: "Find a Physician",
    ar: "ابحث عن طبيب",
    ku: "دۆکتۆر بدۆزەرەوە",
    fa: "پزشک پیدا کنید",
    tr: "Doktor Bul"
  },
  "header.education": {
    en: "Education",
    ar: "التعليم",
    ku: "پەروەردە",
    fa: "آموزش",
    tr: "Eğitim"
  },
  "header.contactUs": {
    en: "Contact Us",
    ar: "اتصل بنا",
    ku: "پەیوەندیمان پێوە بکەن",
    fa: "با ما تماس بگیرید",
    tr: "Bizimle İletişime Geçin"
  },
  "header.supportUs": {
    en: "Support Us",
    ar: "ادعمنا",
    ku: "پاڵپشتیمان بکەن",
    fa: "از ما حمایت کنید",
    tr: "Bizi Destekleyin"
  },
  "header.findPhysician": {
    en: "Find Physician",
    ar: "ابحث عن طبيب",
    ku: "دۆکتۆر بدۆزەرەوە",
    fa: "پزشک پیدا کنید",
    tr: "Doktor Bul"
  },
  "header.familyPhysician": {
    en: "Family Physician",
    ar: "طبيب الأسرة",
    ku: "دۆکتۆری خێزان",
    fa: "پزشک خانواده",
    tr: "Aile Hekimi"
  },
  
  // Hero Section
  "hero.organizationName": {
    en: "SHAMS",
    ar: "شمس",
    ku: "شەمس",
    fa: "شمس",
    tr: "ŞEMS"
  },
  "hero.tagline": {
    en: "Supporting Health & Advocacy for Middle Eastern Societies",
    ar: "دعم الصحة والدفاع عن مجتمعات الشرق الأوسط",
    ku: "پاڵپشتی تەندروستی و پارێزگاری بۆ کۆمەڵگای ناوەڕاست",
    fa: "حمایت از سلامت و حمایت از جوامع خاورمیانه",
    tr: "Orta Doğu Toplumları için Sağlık Desteği ve Savunuculuk"
  },
  "hero.title": {
    en: "Advancing Middle Eastern Healthcare",
    ar: "تطوير الرعاية الصحية في الشرق الأوسط",
    ku: "پێشخستنی چاودێری تەندروستی ناوەڕاست",
    fa: "پیشرفت مراقبت های بهداشتی خاورمیانه",
    tr: "Orta Doğu Sağlık Hizmetlerini Geliştirme"
  },
  "hero.subtitle": {
    en: "Our mission is to improve healthcare access, research, and outcomes for communities across the Middle East through innovative solutions and education.",
    ar: "مهمتنا هي تحسين الوصول إلى الرعاية الصحية والبحث والنتائج للمجتمعات في جميع أنحاء الشرق الأوسط من خلال الحلول المبتكرة والتعليم.",
    ku: "ئامانجمان باشترکردنی دەستگەیشتن بە چاودێری تەندروستی، توێژینەوە و ئەنجامەکانە بۆ کۆمەڵگاکانی ناوەڕاست لە ڕێگای چارەسەری داهێنەرانە و پەروەردەوە.",
    fa: "مأموریت ما بهبود دسترسی به مراقبت های بهداشتی، تحقیقات و نتایج برای جوامع سراسر خاورمیانه از طریق راه حل های نوآورانه و آموزش است.",
    tr: "Misyonumuz, yenilikçi çözümler ve eğitim yoluyla Orta Doğu'daki topluluklar için sağlık hizmetlerine erişimi, araştırmayı ve sonuçları iyileştirmektir."
  },
  "hero.learnMore": {
    en: "Learn About Our Mission",
    ar: "تعرف على مهمتنا",
    ku: "زیاتر بزانە دەربارەی ئامانجمان",
    fa: "درباره مأموریت ما بیاموزید",
    tr: "Misyonumuz Hakkında Bilgi Edinin"
  },
  "hero.support": {
    en: "Support Our Work",
    ar: "ادعم عملنا",
    ku: "پاڵپشتی کارەکانمان بکە",
    fa: "از کار ما حمایت کنید",
    tr: "Çalışmalarımızı Destekleyin"
  },
  
  // Mission Section
  "mission.title": {
    en: "Our Mission",
    ar: "مهمتنا",
    ku: "ئامانجمان",
    fa: "مأموریت ما",
    tr: "Misyonumuz"
  },
  
  // Team translations
  "team.meetOurTeam": {
    en: "Meet Our Team",
    ar: "تعرّف على فريقنا",
    ku: "تیمەکەمان بناسە",
    fa: "تیم ما را بشناسید",
    tr: "Ekibimizi Tanıyın"
  },
  "team.title": {
    en: "Our Team",
    ar: "فريقنا",
    ku: "تیمەکەمان",
    fa: "تیم ما",
    tr: "Ekibimiz"
  },
  "team.subtitle": {
    en: "Meet the dedicated professionals working to bridge healthcare gaps for Middle Eastern communities.",
    ar: "تعرف على المتخصصين المتفانين الذين يعملون على سد فجوات الرعاية الصحية لمجتمعات الشرق الأوسط.",
    ku: "ئەو پسپۆڕە تەرخانکراوانە بناسە کە کار دەکەن بۆ پڕکردنەوەی کەلێنەکانی چاودێری تەندروستی بۆ کۆمەڵگاکانی ناوەڕاست.",
    fa: "متخصصان متعهدی را که برای پر کردن شکاف های مراقبت های بهداشتی برای جوامع خاورمیانه کار می کنند، بشناسید.",
    tr: "Orta Doğu toplulukları için sağlık hizmetleri boşluklarını kapatmak için çalışan özel uzmanları tanıyın."
  },
  "team.comingSoon": {
    en: "Team members profile content coming soon.",
    ar: "محتوى ملفات أعضاء الفريق قريبًا.",
    ku: "ناوەڕۆکی پرۆفایلی ئەندامانی تیم بەزووی دێت.",
    fa: "محتوای پروفایل اعضای تیم به زودی ارائه می شود.",
    tr: "Ekip üyelerinin profil içeriği yakında gelecek."
  },
  
  // Resources Section
  "resources.title": {
    en: "Community Resources",
    ar: "موارد المجتمع",
    ku: "سەرچاوەکانی کۆمەڵگا",
    fa: "منابع جامعه",
    tr: "Topluluk Kaynakları"
  },
  "resources.subtitle": {
    en: "Explore our collection of resources to support healthcare advancement and research in Middle Eastern communities.",
    ar: "استكشف مجموعتنا من الموارد لدعم تقدم الرعاية الصحية والبحث في مجتمعات الشرق الأوسط.",
    ku: "کۆکراوەی سەرچاوەکانمان بگەڕێ بۆ پاڵپشتی پێشکەوتنی چاودێری تەندروستی و توێژینەوە لە کۆمەڵگاکانی ناوەڕاست.",
    fa: "مجموعه منابع ما را برای حمایت از پیشرفت مراقبت های بهداشتی و تحقیقات در جوامع خاورمیانه کاوش کنید.",
    tr: "Orta Doğu toplumlarında sağlık hizmetlerinin gelişimi ve araştırmaları desteklemek için kaynak koleksiyonumuzu keşfedin."
  },
  "resources.researchPlatform": {
    en: "Research Platform",
    ar: "منصة البحث",
    ku: "سەکۆی توێژینەوە",
    fa: "پلت فرم تحقیقات",
    tr: "Araştırma Platformu"
  },
  "resources.researchPlatformDesc": {
    en: "Access our platform supporting high-quality research in healthcare across the Middle East.",
    ar: "الوصول إلى منصتنا التي تدعم البحث عالي الجودة في مجال الرعاية الصحية في جميع أنحاء الشرق الأوسط.",
    ku: "دەستگەیشتن بە سەکۆکەمان کە پاڵپشتی توێژینەوەی کوالیتی بەرز دەکات لە چاودێری تەندروستیدا لە سەرانسەری ناوەڕاست.",
    fa: "به پلت فرم ما که از تحقیقات با کیفیت بالا در مراقبت های بهداشتی در سراسر خاورمیانه پشتیبانی می کند، دسترسی پیدا کنید.",
    tr: "Orta Doğu'da sağlık hizmetlerinde yüksek kaliteli araştırmaları destekleyen platformumuza erişin."
  },
  "resources.educationalMaterials": {
    en: "Educational Materials",
    ar: "المواد التعليمية",
    ku: "ماددە پەروەردەییەکان",
    fa: "مواد آموزشی",
    tr: "Eğitim Materyalleri"
  },
  "resources.educationalMaterialsDesc": {
    en: "Explore educational resources about health innovations and treatments specific to Middle Eastern populations.",
    ar: "استكشف الموارد التعليمية حول الابتكارات الصحية والعلاجات الخاصة بسكان الشرق الأوسط.",
    ku: "سەرچاوە پەروەردەییەکان بگەڕێ دەربارەی داهێنانی تەندروستی و چارەسەرکردنی تایبەت بە دانیشتووانی ناوەڕاست.",
    fa: "منابع آموزشی در مورد نوآوری های سلامت و درمان های مخصوص جمعیت خاورمیانه را کاوش کنید.",
    tr: "Orta Doğu nüfusuna özgü sağlık yenilikleri ve tedavileri hakkında eğitim kaynaklarını keşfedin."
  },
  "resources.newsletterArchive": {
    en: "Newsletter Archive",
    ar: "أرشيف النشرة الإخبارية",
    ku: "ئەرشیفی نامەی هەواڵ",
    fa: "آرشیو خبرنامه",
    tr: "Haber Bülteni Arşivi"
  },
  "resources.newsletterArchiveDesc": {
    en: "Browse our newsletter archive to stay informed of the latest news and events from our health community.",
    ar: "تصفح أرشيف نشرتنا الإخبارية للبقاء على اطلاع بأحدث الأخبار والأحداث من مجتمعنا الصحي.",
    ku: "ئەرشیفی نامەی هەواڵەکەمان بگەڕێ بۆ ئەوەی لە کۆتا هەواڵ و ڕووداوەکانی کۆمەڵگای تەندروستیمان ئاگادار بیت.",
    fa: "آرشیو خبرنامه ما را مرور کنید تا از آخرین اخبار و رویدادهای جامعه سلامت ما مطلع باشید.",
    tr: "Sağlık topluluğumuzdan en son haberler ve etkinliklerden haberdar olmak için haber bülteni arşivimize göz atın."
  },
  "resources.webinarLibrary": {
    en: "Workshop Library",
    ar: "مكتبة ورش العمل",
    ku: "کتێبخانەی وۆرکشۆپ",
    fa: "کتابخانه کارگاه",
    tr: "Atölye Kütüphanesi"
  },
  "resources.webinarLibraryDesc": {
    en: "Access our library of past workshops on important health topics relevant to Middle Eastern communities.",
    ar: "الوصول إلى مكتبتنا من ورش العمل السابقة حول مواضيع صحية مهمة ذات صلة بمجتمعات الشرق الأوسط.",
    ku: "دەستگەیشتن بە کتێبخانەکەمان لە وۆرکشۆپە پێشووەکان دەربارەی بابەتە تەندروستییە گرنگەکان کە پەیوەندییان بە کۆمەڵگاکانی ناوەڕاستەوە هەیە.",
    fa: "به کتابخانه کارگاه های گذشته ما در مورد موضوعات مهم سلامت مرتبط با جوامع خاورمیانه دسترسی پیدا کنید.",
    tr: "Orta Doğu toplumlarıyla ilgili önemli sağlık konularında geçmiş atölyelerimizin kütüphanesine erişin."
  },
  "resources.accessResource": {
    en: "Access Resource",
    ar: "الوصول إلى المورد",
    ku: "دەستگەیشتن بە سەرچاوە",
    fa: "دسترسی به منبع",
    tr: "Kaynağa Erişim"
  },
  
  // Partners Section
  "partners.title": {
    en: "Our Partners",
    ar: "شركاؤنا",
    ku: "هاوبەشەکانمان",
    fa: "شرکای ما",
    tr: "Ortaklarımız"
  },
  "partners.subtitle": {
    en: "We collaborate with leading organizations to advance healthcare in Middle Eastern communities",
    ar: "نتعاون مع المنظمات الرائدة لتطوير الرعاية الصحية في مجتمعات الشرق الأوسط",
    ku: "ئێمە لەگەڵ ڕێکخراوە سەرەکییەکان هاوکاری دەکەین بۆ پێشبردنی چاودێری تەندروستی لە کۆمەڵگاکانی ناوەڕاست",
    fa: "ما با سازمان های پیشرو برای پیشبرد مراقبت های بهداشتی در جوامع خاورمیانه همکاری می کنیم",
    tr: "Orta Doğu toplumlarında sağlık hizmetlerini geliştirmek için önde gelen kuruluşlarla işbirliği yapıyoruz"
  },
  "partners.regionalHealth": {
    en: "Regional Health Foundation",
    ar: "مؤسسة الصحة الإقليمية",
    ku: "بنکەی تەندروستی هەرێمی",
    fa: "بنیاد سلامت منطقه ای",
    tr: "Bölgesel Sağlık Vakfı"
  },
  "partners.regionalHealthDesc": {
    en: "Supporting healthcare initiatives across the Middle East",
    ar: "دعم المبادرات الصحية في جميع أنحاء الشرق الأوسط",
    ku: "پاڵپشتی دەستپێشخەرییەکانی چاودێری تەندروستی لە سەرانسەری ناوەڕاست",
    fa: "حمایت از ابتکارات مراقبت های بهداشتی در سراسر خاورمیانه",
    tr: "Orta Doğu'da sağlık girişimlerini destekleme"
  },
  "partners.globalMedical": {
    en: "Global Medical Research",
    ar: "البحوث الطبية العالمية",
    ku: "توێژینەوەی پزیشکی جیهانی",
    fa: "تحقیقات پزشکی جهانی",
    tr: "Küresel Tıbbi Araştırma"
  },
  "partners.globalMedicalDesc": {
    en: "Advancing medical research in underserved populations",
    ar: "تطوير البحوث الطبية في المجتمعات المحرومة من الخدمات",
    ku: "پێشبردنی توێژینەوەی پزیشکی لە دانیشتووانی بێ خزمەتگوزاری",
    fa: "پیشبرد تحقیقات پزشکی در جمعیت های کم برخوردار",
    tr: "Hizmet alamayan nüfuslarda tıbbi araştırmaları ilerletme"
  },
  "partners.healthAccess": {
    en: "Health Access Network",
    ar: "شبكة الوصول إلى الرعاية الصحية",
    ku: "تۆڕی دەستگەیشتن بە تەندروستی",
    fa: "شبکه دسترسی به سلامت",
    tr: "Sağlık Erişim Ağı"
  },
  "partners.healthAccessDesc": {
    en: "Improving healthcare access for communities in need",
    ar: "تحسين الوصول إلى الرعاية الصحية للمجتمعات المحتاجة",
    ku: "باشترکردنی دەستگەیشتن بە چاودێری تەندروستی بۆ کۆمەڵگا پێویستدارەکان",
    fa: "بهبود دسترسی به مراقبت های بهداشتی برای جوامع نیازمند",
    tr: "İhtiyaç sahibi topluluklar için sağlık hizmetlerine erişimi iyileştirme"
  },
  "partners.culturalAlliance": {
    en: "Cultural Health Alliance",
    ar: "تحالف الصحة الثقافية",
    ku: "هاوپەیمانی تەندروستی کولتووری",
    fa: "اتحادیه سلامت فرهنگی",
    tr: "Kültürel Sağlık İttifakı"
  },
  "partners.culturalAllianceDesc": {
    en: "Promoting culturally responsive healthcare practices",
    ar: "تعزيز ممارسات الرعاية الصحية المستجيبة ثقافيًا",
    ku: "بەرەوپێشبردنی پراکتیکی چاودێری تەندروستی وەڵامدەرەوەی کولتووری",
    fa: "ترویج روش های مراقبت بهداشتی پاسخگو به فرهنگ",
    tr: "Kültürel açıdan duyarlı sağlık hizmetleri uygulamalarını teşvik etme"
  },
  "partners.medicalSociety": {
    en: "Middle Eastern Medical Society",
    ar: "الجمعية الطبية للشرق الأوسط",
    ku: "کۆمەڵەی پزیشکی ناوەڕاست",
    fa: "انجمن پزشکی خاورمیانه",
    tr: "Orta Doğu Tıp Derneği"
  },
  "partners.medicalSocietyDesc": {
    en: "Professional association for healthcare providers",
    ar: "الرابطة المهنية لمقدمي الرعاية الصحية",
    ku: "یەکێتی پیشەیی بۆ دابینکەرانی چاودێری تەندروستی",
    fa: "انجمن حرفه ای ارائه دهندگان مراقبت های بهداشتی",
    tr: "Sağlık hizmeti sağlayıcıları için meslek birliği"
  },
  
  // Impact Section
  "impact.title": {
    en: "Our Impact",
    ar: "تأثيرنا",
    ku: "کاریگەریمان",
    fa: "تأثیر ما",
    tr: "Etkimiz"
  },
  "impact.subtitle": {
    en: "Making a difference in healthcare access and outcomes for Middle Eastern communities",
    ar: "إحداث فرق في الوصول إلى الرعاية الصحية والنتائج لمجتمعات الشرق الأوسط",
    ku: "جیاوازی دروستکردن لە دەستگەیشتن بە چاودێری تەندروستی و ئەنجامەکان بۆ کۆمەڵگاکانی ناوەڕاست",
    fa: "ایجاد تفاوت در دسترسی به مراقبت های بهداشتی و نتایج برای جوامع خاورمیانه",
    tr: "Orta Doğu toplumları için sağlık hizmetlerine erişim ve sonuçlarda fark yaratma"
  },
  "impact.communityMembers": {
    en: "Community members reached through health initiatives",
    ar: "أعضاء المجتمع الذين تم الوصول إليهم من خلال المبادرات الصحية",
    ku: "ئەندامانی کۆمەڵگا کە لە ڕێگای دەستپێشخەرییەکانی تەندروستیەوە گەیشتوونەتە",
    fa: "اعضای جامعه که از طریق ابتکارات سلامت به آنها دسترسی پیدا شده",
    tr: "Sağlık girişimleri aracılığıyla ulaşılan topluluk üyeleri"
  },
  "impact.partnerOrganizations": {
    en: "Partner organizations across the Middle East and Canada",
    ar: "المنظمات الشريكة في جميع أنحاء الشرق الأوسط وكندا",
    ku: "ڕێکخراوە هاوبەشەکان لە سەرانسەری ناوەڕاست و کەنەدا",
    fa: "سازمان های شریک در سراسر خاورمیانه و کانادا",
    tr: "Orta Doğu ve Kanada'daki ortak kuruluşlar"
  },
  "impact.researchStudies": {
    en: "Research studies published on Middle Eastern healthcare",
    ar: "الدراسات البحثية المنشورة حول الرعاية الصحية في الشرق الأوسط",
    ku: "توێژینەوە بڵاوکراوەکان دەربارەی چاودێری تەندروستی ناوەڕاست",
    fa: "مطالعات تحقیقاتی منتشر شده در مورد مراقبت های بهداشتی خاورمیانه",
    tr: "Orta Doğu sağlık hizmetleri üzerine yayınlanan araştırma çalışmaları"
  },
  "impact.upcomingInitiative": {
    en: "Upcoming Initiative",
    ar: "المبادرة القادمة",
    ku: "دەستپێشخەری داهاتوو",
    fa: "ابتکار آینده",
    tr: "Yaklaşan Girişim"
  },
  "impact.upcomingInitiativeDesc": {
    en: "Regional health assessment program launching in collaboration with local communities",
    ar: "برنامج تقييم الصحة الإقليمي الذي يتم إطلاقه بالتعاون مع المجتمعات المحلية",
    ku: "بەرنامەی هەڵسەنگاندنی تەندروستی هەرێمی کە لە هاوکاری لەگەڵ کۆمەڵگا ناوخۆییەکاندا دەستپێدەکرێت",
    fa: "برنامه ارزیابی سلامت منطقه ای که با همکاری جوامع محلی راه اندازی می شود",
    tr: "Yerel topluluklar ile işbirliği içinde başlatılan bölgesel sağlık değerlendirme programı"
  },
  "impact.startingDate": {
    en: "Starting July 2025",
    ar: "يبدأ في يوليو 2025",
    ku: "دەست پێ دەکات لە تەممووزی ٢٠٢٥",
    fa: "شروع در جولای 2025",
    tr: "Temmuz 2025'te başlıyor"
  },
  "impact.whatsNew": {
    en: "What's New",
    ar: "ما الجديد",
    ku: "چی نوێیە",
    fa: "چه چیز جدید",
    tr: "Yenilikler"
  },
  "impact.whatsNewDesc": {
    en: "New research grant secured to study healthcare access disparities in rural areas",
    ar: "تم تأمين منحة بحثية جديدة لدراسة التفاوتات في الوصول إلى الرعاية الصحية في المناطق الريفية",
    ku: "گرانتی توێژینەوەی نوێ دەستەبەرکراوە بۆ لێکۆڵینەوە لە جیاوازییەکانی دەستگەیشتن بە چاودێری تەندروستی لە ناوچە گوندنشینەکاندا",
    fa: "کمک هزینه تحقیقاتی جدید برای مطالعه نابرابری های دسترسی به مراقبت های بهداشتی در مناطق روستایی تأمین شد",
    tr: "Kırsal alanlarda sağlık hizmetlerine erişim eşitsizliklerini incelemek için yeni araştırma hibesi güvence altına alındı"
  },
  "impact.whatsNewDate": {
    en: "May 2025",
    ar: "مايو 2025",
    ku: "ئایاری ٢٠٢٥",
    fa: "می 2025",
    tr: "Mayıs 2025"
  },
  "impact.learnMore": {
    en: "Learn More About Our Impact",
    ar: "تعرف على المزيد حول تأثيرنا",
    ku: "زیاتر بزانە دەربارەی کاریگەریمان",
    fa: "درباره تأثیر ما بیشتر بیاموزید",
    tr: "Etkimiz Hakkında Daha Fazla Bilgi Edinin"
  },
  
  // Stats Section
  "stats.title": {
    en: "Our Impact in Numbers",
    ar: "تأثيرنا بالأرقام",
    ku: "کاریگەریمان بە ژمارە",
    fa: "تأثیر ما در اعداد",
    tr: "Etkimizi Sayılarla"
  },
  "stats.researchProjects": {
    en: "Research Projects",
    ar: "المشاريع البحثية",
    ku: "پڕۆژەکانی توێژینەوە",
    fa: "پروژه های تحقیقاتی",
    tr: "Araştırma Projeleri"
  },
  "stats.partnerHospitals": {
    en: "Partner Hospitals",
    ar: "المستشفيات الشريكة",
    ku: "نەخۆشخانە هاوبەشەکان",
    fa: "بیمارستان های شریک",
    tr: "Ortak Hastaneler"
  },
  "stats.patientsServed": {
    en: "Patients Served",
    ar: "المرضى الذين تم خدمتهم",
    ku: "نەخۆش خزمەتکراوەکان",
    fa: "بیماران خدمت شده",
    tr: "Hizmet Verilen Hastalar"
  },
  "stats.countries": {
    en: "Countries",
    ar: "الدول",
    ku: "وڵاتان",
    fa: "کشورها",
    tr: "Ülkeler"
  },
  
  // Newsletter Section
  "newsletter.title": {
    en: "Subscribe to Our Newsletter",
    ar: "اشترك في نشرتنا الإخبارية",
    ku: "ئابووری نامەی هەواڵەکەمان بکە",
    fa: "در خبرنامه ما مشترک شوید",
    tr: "Haber Bültenimize Abone Olun"
  },
  "newsletter.subtitle": {
    en: "Stay updated with the latest health research, events, and resources",
    ar: "ابق على اطلاع بأحدث الأبحاث الصحية والفعاليات والموارد",
    ku: "لە کۆتا توێژینەوەی تەندروستی، ڕووداو و سەرچاوەکان ئاگادار بە",
    fa: "با آخرین تحقیقات سلامت، رویدادها و منابع به روز بمانید",
    tr: "En son sağlık araştırmaları, etkinlikler ve kaynaklarla güncel kalın"
  },
  "newsletter.placeholder": {
    en: "Your email address",
    ar: "عنوان بريدك الإلكتروني",
    ku: "ناونیشانی ئیمەیڵەکەت",
    fa: "آدرس ایمیل شما",
    tr: "E-posta adresiniz"
  },
  "newsletter.subscribing": {
    en: "Subscribing...",
    ar: "جاري الاشتراك...",
    ku: "ئابووری دەکرێت...",
    fa: "در حال اشتراک...",
    tr: "Abone oluyor..."
  },
  "newsletter.button": {
    en: "Subscribe",
    ar: "اشترك",
    ku: "ئابووری بکە",
    fa: "مشترک شوید",
    tr: "Abone Ol"
  },
  "newsletter.successTitle": {
    en: "Success!",
    ar: "تم بنجاح!",
    ku: "سەرکەوتوو!",
    fa: "موفق!",
    tr: "Başarılı!"
  },
  "newsletter.successDescription": {
    en: "Thank you for subscribing to our newsletter.",
    ar: "شكرًا لاشتراكك في نشرتنا الإخبارية.",
    ku: "سوپاس بۆ ئابووری کردنی نامەی هەواڵەکەمان.",
    fa: "از اشتراک در خبرنامه ما متشکریم.",
    tr: "Haber bültenimize abone olduğunuz için teşekkürler."
  },
  
  // Upcoming Events Section
  "events.title": {
    en: "Upcoming Events",
    ar: "الفعاليات القادمة",
    ku: "ڕووداوەکانی داهاتوو",
    fa: "رویدادهای آینده",
    tr: "Yaklaşan Etkinlikler"
  },
  "events.subtitle": {
    en: "Join us at our upcoming events and be part of our community",
    ar: "انضم إلينا في فعالياتنا القادمة وكن جزءًا من مجتمعنا",
    ku: "لە ڕووداوەکانی داهاتوومان پێوەمان بن و بەشێک بن لە کۆمەڵگاکەمان",
    fa: "در رویدادهای آینده ما به ما بپیوندید و بخشی از جامعه ما باشید",
    tr: "Yaklaşan etkinliklerimize katılın ve topluluğumuzun bir parçası olun"
  },
  "events.viewAll": {
    en: "View All Events",
    ar: "عرض جميع الفعاليات",
    ku: "هەموو ڕووداوەکان ببینە",
    fa: "مشاهده همه رویدادها",
    tr: "Tüm Etkinlikleri Görüntüle"
  },
  "events.healthcareSymposium": {
    en: "Healthcare Symposium",
    ar: "ندوة الرعاية الصحية",
    ku: "سیمپۆزیۆمی چاودێری تەندروستی",
    fa: "سمپوزیوم مراقبت های بهداشتی",
    tr: "Sağlık Hizmetleri Sempozyumu"
  },
  "events.healthcareSymposiumDesc": {
    en: "Join leading healthcare professionals to discuss innovations in Middle Eastern healthcare practices.",
    ar: "انضم إلى متخصصي الرعاية الصحية الرائدين لمناقشة الابتكارات في ممارسات الرعاية الصحية في الشرق الأوسط.",
    ku: "لەگەڵ پسپۆڕانی سەرەکی چاودێری تەندروستی بەشداری بکە بۆ گفتوگۆ دەربارەی داهێنان لە پراکتیکەکانی چاودێری تەندروستی ناوەڕاست.",
    fa: "به متخصصان پیشرو مراقبت های بهداشتی بپیوندید تا در مورد نوآوری های روش های مراقبت بهداشتی خاورمیانه بحث کنید.",
    tr: "Orta Doğu sağlık hizmetleri uygulamalarındaki yenilikleri tartışmak için önde gelen sağlık uzmanlarına katılın."
  },
  "events.communityWorkshop": {
    en: "Community Health Workshop",
    ar: "ورشة عمل الصحة المجتمعية",
    ku: "وۆرکشۆپی تەندروستی کۆمەڵگا",
    fa: "کارگاه سلامت جامعه",
    tr: "Toplum Sağlığı Atölyesi"
  },
  "events.communityWorkshopDesc": {
    en: "Learn about cultural competency in healthcare delivery for Middle Eastern communities.",
    ar: "تعرف على الكفاءة الثقافية في تقديم الرعاية الصحية للمجتمعات في الشرق الأوسط.",
    ku: "فێربە دەربارەی لێهاتووی کولتووری لە گەیاندنی چاودێری تەندروستی بۆ کۆمەڵگاکانی ناوەڕاست.",
    fa: "در مورد شایستگی فرهنگی در ارائه مراقبت های بهداشتی برای جوامع خاورمیانه بیاموزید.",
    tr: "Orta Doğu toplumları için sağlık hizmeti sunumunda kültürel yeterlilik hakkında bilgi edinin."
  },
  "events.researchDay": {
    en: "Research Presentation Day",
    ar: "يوم عرض الأبحاث",
    ku: "ڕۆژی پێشکەشکردنی توێژینەوە",
    fa: "روز ارائه تحقیقات",
    tr: "Araştırma Sunum Günü"
  },
  "events.researchDayDesc": {
    en: "Showcase of ongoing research projects focused on healthcare challenges in the Middle East.",
    ar: "عرض لمشاريع البحث الجارية التي تركز على تحديات الرعاية الصحية في الشرق الأوسط.",
    ku: "پیشاندانی پڕۆژەکانی توێژینەوەی بەردەوام کە سەرنج لەسەر ئاستەنگەکانی چاودێری تەندروستی لە ناوەڕاست دەدەن.",
    fa: "نمایش پروژه های تحقیقاتی در حال انجام متمرکز بر چالش های مراقبت های بهداشتی در خاورمیانه.",
    tr: "Orta Doğu'daki sağlık hizmetleri zorluklarına odaklanan devam eden araştırma projelerinin sergilenmesi."
  },
  "events.date": {
    en: "Date",
    ar: "التاريخ",
    ku: "بەروار",
    fa: "تاریخ",
    tr: "Tarih"
  },
  "events.location": {
    en: "Location",
    ar: "الموقع",
    ku: "شوێن",
    fa: "مکان",
    tr: "Konum"
  },
  "events.virtual": {
    en: "Virtual Event",
    ar: "فعالية افتراضية",
    ku: "ڕووداوی مەجازی",
    fa: "رویداد مجازی",
    tr: "Sanal Etkinlik"
  },
  "events.toronto": {
    en: "Toronto, Canada",
    ar: "تورنتو، كندا",
    ku: "تۆرۆنتۆ، کەنەدا",
    fa: "تورنتو، کانادا",
    tr: "Toronto, Kanada"
  },
  "events.ottawa": {
    en: "Ottawa Convention Center",
    ar: "مركز أوتاوا للمؤتمرات",
    ku: "ناوەندی کۆنفڕانسی ئۆتاوا",
    fa: "مرکز کنوانسیون اتاوا",
    tr: "Ottawa Konvansiyon Merkezi"
  },
  "events.register": {
    en: "Register Now",
    ar: "سجل الآن",
    ku: "ئێستا تۆمار بکە",
    fa: "اکنون ثبت نام کنید",
    tr: "Şimdi Kayıt Olun"
  },
  
  // Footer
  "footer.title": {
    en: "SHAMS",
    ar: "شمس",
    ku: "شەمس",
    fa: "شمس",
    tr: "ŞEMS"
  },
  "footer.subtitle": {
    en: "Supporting Health & Advocacy for Middle Eastern Societies",
    ar: "دعم الصحة والدفاع عن مجتمعات الشرق الأوسط",
    ku: "پاڵپشتی تەندروستی و پارێزگاری بۆ کۆمەڵگای ناوەڕاست",
    fa: "حمایت از سلامت و حمایت از جوامع خاورمیانه",
    tr: "Orta Doğu Toplumları için Sağlık Desteği ve Savunuculuk"
  },
  "footer.description": {
    en: "Dedicated to improving healthcare access and outcomes for communities across the Middle East.",
    ar: "مكرسة لتحسين الوصول إلى الرعاية الصحية والنتائج للمجتمعات في جميع أنحاء الشرق الأوسط.",
    ku: "تەرخانکراوە بۆ باشترکردنی دەستگەیشتن بە چاودێری تەندروستی و ئەنجامەکان بۆ کۆمەڵگاکانی سەرانسەری ناوەڕاست.",
    fa: "اختصاص یافته به بهبود دسترسی به مراقبت های بهداشتی و نتایج برای جوامع سراسر خاورمیانه.",
    tr: "Orta Doğu'daki topluluklar için sağlık hizmetlerine erişimi ve sonuçları iyileştirmeye adanmıştır."
  },
  "footer.quickLinks": {
    en: "Quick Links",
    ar: "روابط سريعة",
    ku: "بەستەری خێرا",
    fa: "پیوندهای سریع",
    tr: "Hızlı Bağlantılar"
  },
  "footer.resources": {
    en: "Resources",
    ar: "الموارد",
    ku: "سەرچاوەکان",
    fa: "منابع",
    tr: "Kaynaklar"
  },
  "footer.research": {
    en: "Research",
    ar: "البحث",
    ku: "توێژینەوە",
    fa: "تحقیقات",
    tr: "Araştırma"
  },
  "footer.publications": {
    en: "Publications",
    ar: "المنشورات",
    ku: "بڵاوکراوەکان",
    fa: "انتشارات",
    tr: "Yayınlar"
  },
  "footer.webinars": {
    en: "Workshops",
    ar: "ورش العمل",
    ku: "وۆرکشۆپەکان",
    fa: "کارگاه ها",
    tr: "Atölyeler"
  },
  "footer.newsletter": {
    en: "Newsletter",
    ar: "النشرة الإخبارية",
    ku: "نامەی هەواڵ",
    fa: "خبرنامه",
    tr: "Haber Bülteni"
  },
  "footer.faq": {
    en: "FAQ",
    ar: "الأسئلة المتكررة",
    ku: "پرسیارە دووبارەکان",
    fa: "سوالات متداول",
    tr: "SSS"
  },
  "footer.contactUs": {
    en: "Contact Us",
    ar: "اتصل بنا",
    ku: "پەیوەندیمان پێوە بکە",
    fa: "با ما تماس بگیرید",
    tr: "Bizimle İletişime Geçin"
  },
  "footer.address1": {
    en: "123 Healthcare Avenue",
    ar: "١٢٣ شارع الرعاية الصحية",
    ku: "١٢٣ شەقامی چاودێری تەندروستی",
    fa: "۱۲۳ خیابان مراقبت های بهداشتی",
    tr: "123 Sağlık Caddesi"
  },
  "footer.address2": {
    en: "Dubai, UAE",
    ar: "دبي، الإمارات العربية المتحدة",
    ku: "دووبەی، میرنشینە یەکگرتووە عەرەبییەکان",
    fa: "دبی، امارات متحده عربی",
    tr: "Dubai, BAE"
  },
  "footer.email": {
    en: "Email: info@mehealthinitiative.org",
    ar: "البريد الإلكتروني: info@mehealthinitiative.org",
    ku: "ئیمەیڵ: info@mehealthinitiative.org",
    fa: "ایمیل: info@mehealthinitiative.org",
    tr: "E-posta: info@mehealthinitiative.org"
  },
  "footer.phone": {
    en: "Phone: +971 4 123 4567",
    ar: "الهاتف: +٩٧١ ٤ ١٢٣ ٤٥٦٧",
    ku: "تەلەفۆن: +٩٧١ ٤ ١٢٣ ٤٥٦٧",
    fa: "تلفن: +۹۷۱ ۴ ۱۲۳ ۴۵۶۷",
    tr: "Telefon: +971 4 123 4567"
  },
  "footer.copyright": {
    en: "Middle Eastern Health Initiative. All rights reserved.",
    ar: "مبادرة الصحة في الشرق الأوسط. جميع الحقوق محفوظة.",
    ku: "دەستپێشخەری تەندروستی ناوەڕاست. هەموو مافەکان پارێزراون.",
    fa: "ابتکار سلامت خاورمیانه. تمام حقوق محفوظ است.",
    tr: "Orta Doğu Sağlık Girişimi. Tüm hakları saklıdır."
  },
  "footer.privacy": {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية",
    ku: "پۆلیسی نهێنی",
    fa: "سیاست حفظ حریم خصوصی",
    tr: "Gizlilik Politikası"
  },
  "footer.terms": {
    en: "Terms of Service",
    ar: "شروط الخدمة",
    ku: "مەرجەکانی خزمەتگوزاری",
    fa: "شرایط خدمات",
    tr: "Hizmet Şartları"
  },
  "footer.cookies": {
    en: "Cookie Policy",
    ar: "سياسة ملفات تعريف الارتباط",
    ku: "پۆلیسی کووکی",
    fa: "سیاست کوکی",
    tr: "Çerez Politikası"
  },
  
  // Diseases Page
  "diseases.title": {
    en: "Common Diseases",
    ar: "الأمراض الشائعة",
    ku: "نەخۆشییە باوەکان",
    fa: "بیماری های شایع",
    tr: "Yaygın Hastalıklar"
  },
  "diseases.subtitle": {
    en: "Educational resources about common health conditions affecting Middle Eastern communities, with culturally relevant information and support.",
    ar: "موارد تعليمية حول الحالات الصحية الشائعة التي تؤثر على مجتمعات الشرق الأوسط، مع معلومات ودعم ملائم ثقافيًا.",
    ku: "سەرچاوە پەروەردەییەکان دەربارەی بارودۆخە تەندروستییە باوەکان کە کاریگەری لەسەر کۆمەڵگاکانی ناوەڕاست دەبن، لەگەڵ زانیاری و پاڵپشتی گونجاو لە کولتوور.",
    fa: "منابع آموزشی در مورد شرایط سلامت شایع که بر جوامع خاورمیانه تأثیر می گذارد، با اطلاعات و پشتیبانی مرتبط با فرهنگ.",
    tr: "Orta Doğu toplumlarını etkileyen yaygın sağlık durumları hakkında kültürel açıdan uygun bilgi ve destek içeren eğitim kaynakları."
  },
  "diseases.learnMore": {
    en: "Learn More",
    ar: "اقرأ المزيد",
    ku: "زیاتر بزانە",
    fa: "بیشتر بدانید",
    tr: "Daha Fazla Bilgi"
  },
  "diseases.contextTitle": {
    en: "Understanding Cultural Context",
    ar: "فهم السياق الثقافي",
    ku: "تێگەیشتن لە پێوەندی کولتووری",
    fa: "درک زمینه فرهنگی",
    tr: "Kültürel Bağlamı Anlama"
  },
  "diseases.contextDescription": {
    en: "Health conditions can present differently across populations and may be influenced by genetic, environmental, and cultural factors. Our resources are designed to provide information that is relevant to Middle Eastern communities while acknowledging the diversity within these populations.",
    ar: "يمكن أن تظهر الحالات الصحية بشكل مختلف عبر السكان وقد تتأثر بالعوامل الوراثية والبيئية والثقافية. تم تصميم مواردنا لتوفير معلومات ذات صلة بمجتمعات الشرق الأوسط مع الاعتراف بالتنوع داخل هذه المجتمعات.",
    ku: "بارودۆخەکانی تەندروستی دەتوانن بە شێوەی جیاواز لە نێو دانیشتوواندا دەربکەون و لەوانەیە کاریگەریان لە هۆکارە جێنی، ژینگەیی و کولتوورییەکانەوە هەبێت. سەرچاوەکانمان دیزاین کراون بۆ دابینکردنی زانیاری کە پەیوەندی بە کۆمەڵگاکانی ناوەڕاستەوە هەیە لە کاتێکدا دان بە جۆراوجۆری لەناو ئەم دانیشتووانەدا دەنێین.",
    fa: "شرایط سلامت می تواند در جمعیت های مختلف متفاوت ظاهر شود و ممکن است تحت تأثیر عوامل ژنتیکی، محیطی و فرهنگی باشد. منابع ما برای ارائه اطلاعاتی که برای جوامع خاورمیانه مرتبط است طراحی شده اند در حالی که تنوع در این جمعیت ها را تصدیق می کنند.",
    tr: "Sağlık durumları popülasyonlar arasında farklı şekillerde ortaya çıkabilir ve genetik, çevresel ve kültürel faktörlerden etkilenebilir. Kaynaklarımız, bu popülasyonlar içindeki çeşitliliği kabul ederken Orta Doğu toplumlarıyla ilgili bilgiler sağlamak üzere tasarlanmıştır."
  },
  "diseases.personalizedTitle": {
    en: "Looking for personalized guidance?",
    ar: "هل تبحث عن إرشادات شخصية؟",
    ku: "بەدوای ڕێنمایی کەسی دەگەڕێیت؟",
    fa: "به دنبال راهنمایی شخصی هستید؟",
    tr: "Kişiselleştirilmiş rehberlik mi arıyorsunuz?"
  },
  "diseases.personalizedDescription": {
    en: "Contact our team of healthcare professionals for culturally sensitive support.",
    ar: "اتصل بفريقنا من متخصصي الرعاية الصحية للحصول على دعم مراعي للثقافة.",
    ku: "پەیوەندی بە تیمی پسپۆڕانی چاودێری تەندروستیمانەوە بکە بۆ پاڵپشتی هەستیار بە کولتوور.",
    fa: "با تیم متخصصان مراقبت های بهداشتی ما برای حمایت حساس به فرهنگ تماس بگیرید.",
    tr: "Kültürel açıdan duyarlı destek için sağlık uzmanlarından oluşan ekibimizle iletişime geçin."
  },
  "diseases.contactSpecialist": {
    en: "Contact a Specialist",
    ar: "تواصل مع متخصص",
    ku: "پەیوەندی بە پسپۆڕێکەوە بکە",
    fa: "با متخصص تماس بگیرید",
    tr: "Uzmanla İletişime Geçin"
  },
  
  // Disease Names
  "disease.diabetes": {
    en: "Diabetes",
    ar: "مرض السكري",
    ku: "نەخۆشی شەکرە",
    fa: "دیابت",
    tr: "Diyabet"
  },
  "disease.diabetesDesc": {
    en: "Diabetes is a chronic condition that affects how your body processes blood sugar. Learn about risk factors in Middle Eastern populations, symptoms, management strategies, and cultural considerations for treatment.",
    ar: "مرض السكري هو حالة مزمنة تؤثر على كيفية معالجة جسمك للسكر في الدم. تعرف على عوامل الخطر في مجتمعات الشرق الأوسط، والأعراض، واستراتيجيات الإدارة، والاعتبارات الثقافية للعلاج.",
    ku: "نەخۆشی شەکرە بارودۆخێکی درێژخایەنە کە کاریگەری لەسەر چۆنیەتی پرۆسەسکردنی شەکری خوێن لە لەشتدا دەبێت. فێربە دەربارەی هۆکارەکانی مەترسی لە دانیشتووانی ناوەڕاست، نیشانەکان، ستراتیژییەکانی بەڕێوەبردن، و لەبەرچاوگرتنەکانی کولتووری بۆ چارەسەرکردن.",
    fa: "دیابت یک بیماری مزمن است که بر نحوه پردازش قند خون در بدن شما تأثیر می گذارد. در مورد عوامل خطر در جمعیت خاورمیانه، علائم، استراتژی های مدیریت و ملاحظات فرهنگی برای درمان بیاموزید.",
    tr: "Diyabet, vücudunuzun kan şekerini nasıl işlediğini etkileyen kronik bir durumdur. Orta Doğu nüfusunda risk faktörleri, belirtiler, yönetim stratejileri ve tedavi için kültürel değerlendirmeler hakkında bilgi edinin."
  },
  "disease.heartDisease": {
    en: "Heart Disease",
    ar: "أمراض القلب",
    ku: "نەخۆشی دڵ",
    fa: "بیماری قلبی",
    tr: "Kalp Hastalığı"
  },
  "disease.heartDiseaseDesc": {
    en: "Heart disease is a leading cause of mortality worldwide. Discover specific risk factors in Middle Eastern communities, prevention strategies, early warning signs, and culturally appropriate interventions.",
    ar: "أمراض القلب هي سبب رئيسي للوفيات في جميع أنحاء العالم. اكتشف عوامل الخطر المحددة في مجتمعات الشرق الأوسط، واستراتيجيات الوقاية، وعلامات التحذير المبكرة، والتدخلات الملائمة ثقافيًا.",
    ku: "نەخۆشی دڵ یەکێکە لە هۆکارە سەرەکییەکانی مردن لە سەرانسەری جیهاندا. دۆزینەوەی هۆکارە تایبەتەکانی مەترسی لە کۆمەڵگاکانی ناوەڕاست، ستراتیژییەکانی پێشگیری، نیشانەکانی ئاگادارکردنەوەی زوو، و دەستێوەردانە گونجاوەکانی کولتووری.",
    fa: "بیماری قلبی یکی از علل اصلی مرگ و میر در سراسر جهان است. عوامل خطر خاص در جوامع خاورمیانه، استراتژی های پیشگیری، علائم هشدار اولیه و مداخلات مناسب فرهنگی را کشف کنید.",
    tr: "Kalp hastalığı dünya çapında önde gelen ölüm nedenlerinden biridir. Orta Doğu toplumlarında özel risk faktörleri, önleme stratejileri, erken uyarı işaretleri ve kültürel açıdan uygun müdahaleleri keşfedin."
  },
  "disease.mentalHealth": {
    en: "Mental Health Conditions",
    ar: "حالات الصحة النفسية",
    ku: "بارودۆخەکانی تەندروستی دەروونی",
    fa: "شرایط سلامت روان",
    tr: "Ruh Sağlığı Durumları"
  },
  "disease.mentalHealthDesc": {
    en: "Mental health conditions affect millions globally but are often stigmatized in many communities. Explore common mental health challenges, cultural perspectives, and resources for support.",
    ar: "تؤثر حالات الصحة النفسية على الملايين على مستوى العالم ولكنها غالبًا ما تكون موصومة في العديد من المجتمعات. استكشف تحديات الصحة النفسية الشائعة، والمنظورات الثقافية، وموارد الدعم.",
    ku: "بارودۆخەکانی تەندروستی دەروونی کاریگەری لەسەر ملیۆنان کەس لە سەرانسەری جیهاندا دەبن بەڵام زۆرجار لە کۆمەڵگای زۆردا دەبنە هۆی شەرمەزاری. ئاستەنگە باوەکانی تەندروستی دەروونی، دیدگاکانی کولتووری، و سەرچاوەکانی پاڵپشتی بگەڕێ.",
    fa: "شرایط سلامت روان بر میلیون ها نفر در سراسر جهان تأثیر می گذارد اما اغلب در بسیاری از جوامع انگ دار می شود. چالش های رایج سلامت روان، دیدگاه های فرهنگی و منابع حمایت را کاوش کنید.",
    tr: "Ruh sağlığı durumları dünya çapında milyonlarca kişiyi etkiler ancak birçok toplumda genellikle damgalanır. Yaygın ruh sağlığı zorluklarını, kültürel bakış açılarını ve destek kaynaklarını keşfedin."
  },
  "disease.respiratory": {
    en: "Respiratory Diseases",
    ar: "أمراض الجهاز التنفسي",
    ku: "نەخۆشییەکانی سیستەمی هەناسەدان",
    fa: "بیماری های تنفسی",
    tr: "Solunum Hastalıkları"
  },
  "disease.respiratoryDesc": {
    en: "Respiratory diseases like asthma and COPD can significantly impact quality of life. Learn about prevalence in Middle Eastern populations, environmental factors, and management approaches.",
    ar: "يمكن أن تؤثر أمراض الجهاز التنفسي مثل الربو ومرض الانسداد الرئوي المزمن بشكل كبير على جودة الحياة. تعرف على انتشارها في مجتمعات الشرق الأوسط، والعوامل البيئية، ونهج الإدارة.",
    ku: "نەخۆشییەکانی سیستەمی هەناسەدان وەک ئەزمە و نەخۆشی کۆسپی ڕاگرتووی درێژخایەن دەتوانن کاریگەری بەرچاو لەسەر کوالیتی ژیان دابنێن. فێربە دەربارەی بڵاوبوونەوە لە دانیشتووانی ناوەڕاست، هۆکارەکانی ژینگەیی، و ڕێبازەکانی بەڕێوەبردن.",
    fa: "بیماری های تنفسی مانند آسم و COPD می توانند به طور قابل توجهی بر کیفیت زندگی تأثیر بگذارند. در مورد شیوع در جمعیت خاورمیانه، عوامل محیطی و رویکردهای مدیریت بیاموزید.",
    tr: "Astım ve KOAH gibi solunum hastalıkları yaşam kalitesini önemli ölçüde etkileyebilir. Orta Doğu nüfusunda yaygınlık, çevresel faktörler ve yönetim yaklaşımları hakkında bilgi edinin."
  },
  
  // Webinars Page
  "webinars.title": {
    en: "Workshops and Resources",
    ar: "ورش العمل والموارد",
    ku: "وۆرکشۆپ و سەرچاوەکان",
    fa: "کارگاه ها و منابع",
    tr: "Atölyeler ve Kaynaklar"
  },
  "webinars.subtitle": {
    en: "Access our library of educational workshops featuring expert insights on health topics relevant to Middle Eastern communities.",
    ar: "الوصول إلى مكتبتنا من ورش العمل التعليمية التي تتضمن رؤى خبراء حول مواضيع صحية ذات صلة بمجتمعات الشرق الأوسط.",
    ku: "دەستگەیشتن بە کتێبخانەکەمان لە وۆرکشۆپە پەروەردەییەکان کە بینینی پسپۆڕان لە بابەتە تەندروستییەکان کە پەیوەندییان بە کۆمەڵگاکانی ناوەڕاستەوە هەیە.",
    fa: "به کتابخانه کارگاه های آموزشی ما که شامل بینش های متخصصان در مورد موضوعات سلامت مرتبط با جوامع خاورمیانه است، دسترسی پیدا کنید.",
    tr: "Orta Doğu toplumlarıyla ilgili sağlık konularında uzman görüşleri içeren eğitim atölyelerinin kütüphanesine erişin."
  },
  "webinars.watchNow": {
    en: "Watch Now",
    ar: "شاهد الآن",
    ku: "ئێستا تەماشا بکە",
    fa: "اکنون تماشا کنید",
    tr: "Şimdi İzle"
  },
  "webinars.requestTitle": {
    en: "Request a Topic",
    ar: "اقترح موضوعًا",
    ku: "داوای بابەتێک بکە",
    fa: "درخواست موضوع",
    tr: "Konu Talep Et"
  },
  "webinars.requestDesc": {
    en: "Is there a health topic you'd like us to cover in a future workshop? Let us know, and our medical experts will consider it for upcoming sessions.",
    ar: "هل هناك موضوع صحي ترغب في أن نغطيه في ورشة عمل مستقبلية؟ أخبرنا، وسينظر خبراؤنا الطبيون في ذلك للجلسات القادمة.",
    ku: "ئایا بابەتێکی تەندروستی هەیە کە حەز دەکەیت لە وۆرکشۆپێکی داهاتوودا باسی بکەین؟ پێمان بڵێ، و پسپۆڕە پزیشکییەکانمان لەبەرچاو دەیگرن بۆ کۆبوونەوەکانی داهاتوو.",
    fa: "آیا موضوع سلامتی وجود دارد که دوست دارید در کارگاه آینده پوشش دهیم؟ به ما بگویید و متخصصان پزشکی ما آن را برای جلسات آینده در نظر خواهند گرفت.",
    tr: "Gelecekteki bir atölyede ele almamızı istediğiniz bir sağlık konusu var mı? Bize bildirin, tıp uzmanlarımız gelecek oturumlarda bunu değerlendirecek."
  },
  "webinars.upcomingTitle": {
    en: "Upcoming Live Workshops",
    ar: "ورش العمل الحية القادمة",
    ku: "وۆرکشۆپە زیندووەکانی داهاتوو",
    fa: "کارگاه های زنده آینده",
    tr: "Yaklaşan Canlı Atölyeler"
  },
  "webinars.upcomingDesc": {
    en: "Join our next live session for interactive Q&A with health experts.",
    ar: "انضم إلى جلستنا الحية القادمة للأسئلة والأجوبة التفاعلية مع خبراء الصحة.",
    ku: "بەشداری کۆبوونەوەی زیندووی داهاتوومان بکە بۆ پرسیار و وەڵامی کارلێکەرانە لەگەڵ پسپۆڕانی تەندروستی.",
    fa: "برای پرسش و پاسخ تعاملی با متخصصان سلامت به جلسه زنده بعدی ما بپیوندید.",
    tr: "Sağlık uzmanlarıyla etkileşimli soru-cevap için bir sonraki canlı oturuma katılın."
  },
  "webinars.viewSchedule": {
    en: "View Schedule",
    ar: "عرض الجدول الزمني",
    ku: "خشتەی کات ببینە",
    fa: "مشاهده برنامه",
    tr: "Programı Görüntüle"
  },
  
  // Services Section
  "services.title": {
    en: "Our Services",
    ar: "خدماتنا",
    ku: "خزمەتگوزارییەکانمان",
    fa: "خدمات ما",
    tr: "Hizmetlerimiz"
  },
  "services.subtitle": {
    en: "We offer a range of services to support healthcare advancement and research in the Middle East.",
    ar: "نقدم مجموعة من الخدمات لدعم تقدم الرعاية الصحية والبحث في الشرق الأوسط.",
    ku: "ئێمە کۆمەڵێک خزمەتگوزاری پێشکەش دەکەین بۆ پاڵپشتی پێشکەوتنی چاودێری تەندروستی و توێژینەوە لە ناوەڕاست.",
    fa: "ما طیف وسیعی از خدمات برای حمایت از پیشرفت مراقبت های بهداشتی و تحقیقات در خاورمیانه ارائه می دهیم.",
    tr: "Orta Doğu'da sağlık hizmetlerinin gelişimi ve araştırmaları desteklemek için bir dizi hizmet sunuyoruz."
  },
  "services.researchPlatform": {
    en: "Research Services Platform",
    ar: "منصة خدمات البحث",
    ku: "سەکۆی خزمەتگوزاری توێژینەوە",
    fa: "پلت فرم خدمات تحقیقاتی",
    tr: "Araştırma Hizmetleri Platformu"
  },
  "services.researchPlatformDesc": {
    en: "A platform to support the development of high-quality research in healthcare across the Middle East.",
    ar: "منصة لدعم تطوير البحوث عالية الجودة في الرعاية الصحية في جميع أنحاء الشرق الأوسط.",
    ku: "سەکۆیەک بۆ پاڵپشتی گەشەپێدانی توێژینەوەی کوالیتی بەرز لە چاودێری تەندروستیدا لە سەرانسەری ناوەڕاست.",
    fa: "پلت فرمی برای حمایت از توسعه تحقیقات با کیفیت بالا در مراقبت های بهداشتی در سراسر خاورمیانه.",
    tr: "Orta Doğu'da sağlık hizmetlerinde yüksek kaliteli araştırma gelişimini destekleyen bir platform."
  },
  "services.ourResearch": {
    en: "Our Research",
    ar: "أبحاثنا",
    ku: "توێژینەوەکانمان",
    fa: "تحقیقات ما",
    tr: "Araştırmalarımız"
  },
  "services.ourResearchDesc": {
    en: "Learn about our research surrounding health innovations and treatments specific to Middle Eastern populations.",
    ar: "تعرف على أبحاثنا حول ابتكارات الصحة والعلاجات الخاصة بسكان الشرق الأوسط.",
    ku: "فێربە دەربارەی توێژینەوەکانمان لە دەوری داهێنانی تەندروستی و چارەسەرکردنی تایبەت بە دانیشتووانی ناوەڕاست.",
    fa: "در مورد تحقیقات ما پیرامون نوآوری های سلامت و درمان های مخصوص جمعیت خاورمیانه بیاموزید.",
    tr: "Orta Doğu nüfusuna özgü sağlık yenilikleri ve tedavileri çevresindeki araştırmalarımız hakkında bilgi edinin."
  },
  "services.newsletter": {
    en: "Newsletter",
    ar: "النشرة الإخبارية",
    ku: "نامەی هەواڵ",
    fa: "خبرنامه",
    tr: "Haber Bülteni"
  },
  "services.newsletterDesc": {
    en: "Stay informed of the latest news and events from our health community and research initiatives.",
    ar: "ابق على اطلاع بأحدث الأخبار والفعاليات من مجتمعنا الصحي ومبادرات البحث.",
    ku: "لە کۆتا هەواڵ و ڕووداوەکانی کۆمەڵگای تەندروستی و دەستپێشخەرییەکانی توێژینەوەمان ئاگادار بە.",
    fa: "از آخرین اخبار و رویدادهای جامعه سلامت و ابتکارات تحقیقاتی ما مطلع باشید.",
    tr: "Sağlık topluluğumuz ve araştırma girişimlerimizden en son haberler ve etkinliklerden haberdar olun."
  },
  "services.webinars": {
    en: "Workshops",
    ar: "ورش العمل",
    ku: "وۆرکشۆپەکان",
    fa: "کارگاه ها",
    tr: "Atölyeler"
  },
  "services.webinarsDesc": {
    en: "Access past workshops and register for upcoming presentations on important health topics.",
    ar: "الوصول إلى ورش العمل السابقة والتسجيل للعروض التقديمية القادمة حول مواضيع صحية مهمة.",
    ku: "دەستگەیشتن بە وۆرکشۆپەکانی پێشوو و تۆمارکردن بۆ پێشکەشکردنەکانی داهاتوو دەربارەی بابەتە تەندروستییە گرنگەکان.",
    fa: "به کارگاه های گذشته دسترسی پیدا کنید و برای ارائه های آینده در مورد موضوعات مهم سلامت ثبت نام کنید.",
    tr: "Geçmiş atölyelere erişin ve önemli sağlık konularında yaklaşan sunumlar için kayıt olun."
  },
  "services.physicianDirectory": {
    en: "Physician Directory",
    ar: "دليل الأطباء",
    ku: "ڕێنمایی پزیشکان",
    fa: "راهنمای پزشکان",
    tr: "Doktor Rehberi"
  },
  "services.physicianDirectoryDesc": {
    en: "Find family physicians in your area with our interactive map directory showing providers by location.",
    ar: "ابحث عن أطباء الأسرة في منطقتك باستخدام دليل الخريطة التفاعلي الذي يعرض مقدمي الخدمات حسب الموقع.",
    ku: "پزیشکانی خێزان لە ناوچەکەتدا بدۆزەرەوە لەگەڵ ڕێنمایی نەخشەی کارلێکەرەکەمان کە دابینکەران بە شوێن پیشان دەدات.",
    fa: "پزشکان خانواده را در منطقه خود با راهنمای نقشه تعاملی ما که ارائه دهندگان را بر اساس موقعیت نشان می دهد، پیدا کنید.",
    tr: "Sağlayıcıları konuma göre gösteren etkileşimli harita rehberimizle bölgenizdeki aile doktorlarını bulun."
  },
  "services.learnMore": {
    en: "Learn More",
    ar: "اقرأ المزيد",
    ku: "زیاتر بزانە",
    fa: "بیشتر بدانید",
    tr: "Daha Fazla Bilgi"
  },
  
  // Physician Directory Page
  "physicians.directoryTitle": {
    en: "Family Physician Directory",
    ar: "دليل أطباء الأسرة",
    ku: "ڕێنمایی پزیشکانی خێزان",
    fa: "راهنمای پزشکان خانواده",
    tr: "Aile Doktoru Rehberi"
  },
  "physicians.searchPlaceholder": {
    en: "Search by name, specialty, or language...",
    ar: "البحث حسب الاسم أو التخصص أو اللغة...",
    ku: "گەڕان بە ناو، پسپۆری، یان زمان...",
    fa: "جستجو بر اساس نام، تخصص یا زبان...",
    tr: "Ad, uzmanlık veya dile göre arama..."
  },
  "physicians.nearMe": {
    en: "Near Me",
    ar: "بالقرب مني",
    ku: "لە نزیکمەوە",
    fa: "نزدیک من",
    tr: "Yakınımda"
  },
  "physicians.usingLocation": {
    en: "Using your location to find nearby physicians",
    ar: "استخدام موقعك للعثور على أطباء قريبين",
    ku: "بەکارهێنانی شوێنی تۆ بۆ دۆزینەوەی پزیشکانی نزیک",
    fa: "استفاده از موقعیت شما برای پیدا کردن پزشکان نزدیک",
    tr: "Yakındaki doktorları bulmak için konumunuz kullanılıyor"
  },
  "physicians.found": {
    en: "Found",
    ar: "تم العثور على",
    ku: "دۆزرایەوە",
    fa: "پیدا شد",
    tr: "Bulundu"
  },
  "physicians.physicians": {
    en: "physicians",
    ar: "طبيب",
    ku: "پزیشک",
    fa: "پزشک",
    tr: "doktor"
  },
  "physicians.languages": {
    en: "Languages",
    ar: "اللغات",
    ku: "زمانەکان",
    fa: "زبان ها",
    tr: "Diller"
  },
  "physicians.accepting": {
    en: "Accepting new patients",
    ar: "يقبل مرضى جدد",
    ku: "نەخۆشی نوێ وەردەگرێت",
    fa: "بیماران جدید می پذیرد",
    tr: "Yeni hasta kabul ediyor"
  },
  "physicians.notAccepting": {
    en: "Not accepting new patients",
    ar: "لا يقبل مرضى جدد",
    ku: "نەخۆشی نوێ وەرناگرێت",
    fa: "بیماران جدید نمی پذیرد",
    tr: "Yeni hasta kabul etmiyor"
  },
  "physicians.distance": {
    en: "Distance",
    ar: "المسافة",
    ku: "دووری",
    fa: "فاصله",
    tr: "Mesafe"
  },
  "physicians.km": {
    en: "km away",
    ar: "كم بعيدا",
    ku: "کم دوور",
    fa: "کیلومتر دور",
    tr: "km uzakta"
  },
  "physicians.noResults": {
    en: "No physicians match your search criteria.",
    ar: "لا يوجد أطباء يطابقون معايير البحث.",
    ku: "هیچ پزیشکێک ناگونجێت لەگەڵ پێوەرەکانی گەڕانت.",
    fa: "هیچ پزشکی با معیارهای جستجوی شما مطابقت ندارد.",
    tr: "Arama kriterlerinizle eşleşen doktor yok."
  },
  "physicians.mapKeyRequired": {
    en: "Map API Key Required",
    ar: "مطلوب مفتاح API للخريطة",
    ku: "کلیلی API ی نەخشە پێویستە",
    fa: "کلید API نقشه مورد نیاز است",
    tr: "Harita API Anahtarı Gerekli"
  },
  "physicians.mapKeyDescription": {
    en: "To view the physician locations on a map, please enter your Mapbox public token.",
    ar: "لعرض مواقع الأطباء على الخريطة، يرجى إدخال رمز Mapbox العام الخاص بك.",
    ku: "بۆ بینینی شوێنەکانی پزیشکان لەسەر نەخشە، تکایە تۆکینی گشتی Mapbox ـت داخڵ بکە.",
    fa: "برای مشاهده مکان پزشکان روی نقشه، لطفاً توکن عمومی Mapbox خود را وارد کنید.",
    tr: "Doktor konumlarını haritada görüntülemek için lütfen Mapbox genel belirtecinizi girin."
  },
  "physicians.mapKeyPlaceholder": {
    en: "Enter your Mapbox public token",
    ar: "أدخل رمز Mapbox العام الخاص بك",
    ku: "تۆکینی گشتی Mapbox ـت داخڵ بکە",
    fa: "توکن عمومی Mapbox خود را وارد کنید",
    tr: "Mapbox genel belirtecinizi girin"
  },
  "physicians.saveKey": {
    en: "Save Key",
    ar: "حفظ المفتاح",
    ku: "کلیل پاشەکەوت بکە",
    fa: "ذخیره کلید",
    tr: "Anahtarı Kaydet"
  },
  "physicians.getKey": {
    en: "Get a Key",
    ar: "الحصول على مفتاح",
    ku: "کلیلێک وەربگرە",
    fa: "دریافت کلید",
    tr: "Anahtar Al"
  },
  "physicians.mapPlaceholder": {
    en: "This is a placeholder map. In a real application, this would display an interactive map with physician locations.",
    ar: "هذه خريطة توضيحية. في التطبيق الفعلي، ستعرض خريطة تفاعلية مع مواقع الأطباء.",
    ku: "ئەمە نەخشەیەکی جێگرەوەیە. لە ئەپلیکەیشنێکی ڕاستیدا، ئەمە نەخشەیەکی کارلێکەرانە پیشان دەدات لەگەڵ شوێنەکانی پزیشکان.",
    fa: "این یک نقشه نگهدار مکان است. در یک برنامه واقعی، این یک نقشه تعاملی با مکان های پزشک نمایش می دهد.",
    tr: "Bu bir yer tutucu haritadır. Gerçek bir uygulamada, bu doktor konumlarıyla etkileşimli bir harita gösterir."
  },
  "physicians.selectPhysician": {
    en: "Select a physician from the list to see details",
    ar: "اختر طبيبًا من القائمة لمشاهدة التفاصيل",
    ku: "پزیشکێک لە لیستەکەوە هەڵبژێرە بۆ بینینی وردەکارییەکان",
    fa: "پزشکی را از فهرست انتخاب کنید تا جزئیات را ببینید",
    tr: "Ayrıntıları görmek için listeden bir doktor seçin"
  },
  
  // 404 Page
  "notFound.title": {
    en: "404",
    ar: "404",
    ku: "404",
    fa: "404",
    tr: "404"
  },
  "notFound.subtitle": {
    en: "Oops! Page not found",
    ar: "عذراً! الصفحة غير موجودة",
    ku: "ببوورە! پەڕە نەدۆزرایەوە",
    fa: "اوه! صفحه پیدا نشد",
    tr: "Ups! Sayfa bulunamadı"
  },
  "notFound.description": {
    en: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
    ar: "قد تكون الصفحة التي تبحث عنها قد تمت إزالتها، أو تغير اسمها، أو أنها غير متوفرة مؤقتًا.",
    ku: "ئەو پەڕەیەی بەدوایدا دەگەڕێیت لەوانەیە لابردرابێت، یان ناوی گۆڕابێت، یان کاتی بەردەست نەبێت.",
    fa: "صفحه ای که به دنبال آن هستید ممکن است حذف شده، نام آن تغییر کرده یا موقتاً در دسترس نباشد.",
    tr: "Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir."
  },
  "notFound.returnHome": {
    en: "Return to Home",
    ar: "العودة إلى الصفحة الرئيسية",
    ku: "گەڕانەوە بۆ ماڵەوە",
    fa: "بازگشت به خانه",
    tr: "Ana Sayfaya Dön"
  },

  // Contact form translations
  "contact.inquiryForm": {
    en: "Send us an Inquiry",
    ar: "أرسل لنا استفسارًا",
    ku: "پرسیارێکمان بۆ بنێرە",
    fa: "استعلام خود را برای ما ارسال کنید",
    tr: "Bize Soru Gönderin"
  },
  "contact.name": {
    en: "Name",
    ar: "الاسم",
    ku: "ناو",
    fa: "نام",
    tr: "İsim"
  },
  "contact.email": {
    en: "Email",
    ar: "البريد الإلكتروني",
    ku: "ئیمەیڵ",
    fa: "ایمیل",
    tr: "E-posta"
  },
  "contact.subject": {
    en: "Subject",
    ar: "الموضوع",
    ku: "بابەت",
    fa: "موضوع",
    tr: "Konu"
  },
  "contact.message": {
    en: "Message",
    ar: "الرسالة",
    ku: "پەیام",
    fa: "پیام",
    tr: "Mesaj"
  },
  "contact.send": {
    en: "Send Message",
    ar: "إرسال الرسالة",
    ku: "پەیام بنێرە",
    fa: "ارسال پیام",
    tr: "Mesaj Gönder"
  },
  "contact.sending": {
    en: "Sending...",
    ar: "جاري الإرسال...",
    ku: "دەنێردرێت...",
    fa: "در حال ارسال...",
    tr: "Gönderiliyor..."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"en" | "ar" | "ku" | "fa" | "tr">("en");

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
