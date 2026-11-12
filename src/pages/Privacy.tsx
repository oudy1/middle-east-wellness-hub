import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { useHashScroll } from "@/hooks/useHashScroll";
import { Link } from "react-router-dom";

type Section = { id: string; title: string; body: string[] };

const content: Record<"en" | "ar", { title: string; updated: string; intro: string; sections: Section[] }> = {
  en: {
    title: "Privacy, Terms and Cookies",
    updated: "Last updated: November 10, 2026",
    intro:
      "SHAMS (Support for Health Advocacy in Middle Eastern Societies) is a Toronto-based non-profit. This page explains, in plain language, what information this website collects, how we use it, and the terms for using the site.",
    sections: [
      {
        id: "privacy",
        title: "Privacy notice",
        body: [
          "What we collect: only what you choose to send us. This includes your name, email and message when you use our contact, inquiry or mentorship forms; the details you enter when you submit a research opportunity, join the healthcare directory or suggest a provider; and anonymous helpful or not helpful votes on FAQ answers.",
          "Chat assistant: questions you type into the SHAMS chat are sent to an AI service to generate a reply. Please do not share your full name, health card number or other identifying details in the chat. The chat gives general information only and is not medical advice.",
          "How we use it: to answer you, to review submissions before they are published, and to improve our resources. Messages from our forms are delivered to the SHAMS inbox (infoprojectshams@gmail.com). We do not sell or rent your information, and we do not use it for advertising.",
          "What is public: healthcare directory listings and approved research opportunities are shown on the website, because that is their purpose. Everything else stays private and can only be seen by authorized SHAMS administrators.",
          "Google Forms: some sign-ups (volunteering, mentorship, events) use Google Forms. Those forms are covered by Google's own privacy policy.",
          "Your choices: you can ask us to see, correct or delete information you sent us by writing to infoprojectshams@gmail.com.",
        ],
      },
      {
        id: "terms",
        title: "Terms of use",
        body: [
          "Health information on this site is for education only. It does not replace advice from a doctor, nurse or other qualified professional. In an emergency, call 911. For a mental health crisis, call or text 988.",
          "The healthcare directory lists providers as a convenience. New listings appear only after SHAMS reviews them, and being listed does not mean a provider is available or accepting new patients. Always confirm details directly with the provider.",
          "Links to other websites are provided for convenience. SHAMS is not responsible for their content.",
          "Please do not submit false, offensive or promotional content through our forms. We may remove any submission.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies and browser storage",
        body: [
          "This site does not use advertising or tracking cookies.",
          "Your browser stores a few small settings on your own device: your chosen language, a random ID that keeps your chat and FAQ votes separate from other visitors, and display preferences. You can clear them at any time in your browser settings.",
          "Embedded content such as YouTube videos, Instagram posts, Google Slides and the OpenStreetMap map may set their own cookies under those companies' policies. YouTube videos use privacy-enhanced mode.",
        ],
      },
    ],
  },
  ar: {
    title: "الخصوصية والشروط وملفات تعريف الارتباط",
    updated: "آخر تحديث: 10 نوفمبر 2026",
    intro:
      "شمس (دعم المناصرة الصحية في المجتمعات الشرق أوسطية) منظمة غير ربحية مقرها تورونتو. توضّح هذه الصفحة بلغة بسيطة ما المعلومات التي يجمعها هذا الموقع، وكيف نستخدمها، وشروط استخدام الموقع.",
    sections: [
      {
        id: "privacy",
        title: "إشعار الخصوصية",
        body: [
          "ما نجمعه: فقط ما تختار أن ترسله إلينا. ويشمل ذلك اسمك وبريدك الإلكتروني ورسالتك عند استخدام نماذج التواصل أو الاستفسار أو الإرشاد، والتفاصيل التي تدخلها عند تقديم فرصة بحثية أو الانضمام إلى دليل الرعاية الصحية أو اقتراح مقدم رعاية، والتصويت المجهول على إجابات الأسئلة الشائعة.",
          "المساعد الآلي: تُرسل الأسئلة التي تكتبها في محادثة شمس إلى خدمة ذكاء اصطناعي لإنشاء الرد. يرجى عدم مشاركة اسمك الكامل أو رقم بطاقتك الصحية أو أي تفاصيل تعريفية في المحادثة. تقدّم المحادثة معلومات عامة فقط وليست نصيحة طبية.",
          "كيف نستخدمها: للرد عليك، ولمراجعة الطلبات قبل نشرها، ولتحسين مواردنا. تصل الرسائل من نماذجنا إلى بريد شمس (infoprojectshams@gmail.com). لا نبيع معلوماتك ولا نؤجرها، ولا نستخدمها للإعلانات.",
          "ما هو عام: تظهر قوائم دليل الرعاية الصحية والفرص البحثية المعتمدة على الموقع لأن هذا هو الغرض منها. كل ما عدا ذلك يبقى خاصًا ولا يطّلع عليه إلا مسؤولو شمس المخوّلون.",
          "نماذج Google: تستخدم بعض التسجيلات (التطوع والإرشاد والفعاليات) نماذج Google، وتخضع لسياسة الخصوصية الخاصة بشركة Google.",
          "خياراتك: يمكنك أن تطلب منا الاطلاع على المعلومات التي أرسلتها أو تصحيحها أو حذفها بمراسلتنا على infoprojectshams@gmail.com.",
        ],
      },
      {
        id: "terms",
        title: "شروط الاستخدام",
        body: [
          "المعلومات الصحية في هذا الموقع للتثقيف فقط، ولا تغني عن استشارة الطبيب أو الممرض أو أي مختص مؤهل. في حالات الطوارئ اتصل بالرقم 911. وفي أزمات الصحة النفسية اتصل أو أرسل رسالة إلى 988.",
          "يعرض دليل الرعاية الصحية مقدمي الرعاية للتسهيل فقط. لا تظهر القوائم الجديدة إلا بعد أن تراجعها شمس، ووجود مقدم الرعاية في الدليل لا يعني أنه متاح أو يقبل مرضى جددًا. تأكّد دائمًا من التفاصيل مباشرة مع مقدم الرعاية.",
          "الروابط إلى مواقع أخرى مقدّمة للتسهيل، وشمس غير مسؤولة عن محتواها.",
          "يرجى عدم إرسال محتوى كاذب أو مسيء أو ترويجي عبر نماذجنا. يجوز لنا حذف أي طلب.",
        ],
      },
      {
        id: "cookies",
        title: "ملفات تعريف الارتباط والتخزين في المتصفح",
        body: [
          "لا يستخدم هذا الموقع ملفات تعريف ارتباط إعلانية أو للتتبع.",
          "يحفظ متصفحك بعض الإعدادات الصغيرة على جهازك: اللغة التي اخترتها، ورقمًا عشوائيًا يفصل محادثتك وتصويتك عن الزوار الآخرين، وتفضيلات العرض. يمكنك حذفها في أي وقت من إعدادات المتصفح.",
          "قد يضع المحتوى المضمَّن مثل فيديوهات YouTube ومنشورات Instagram وعروض Google والخريطة من OpenStreetMap ملفات تعريف ارتباط خاصة به وفق سياسات تلك الشركات. تُعرض فيديوهات YouTube في وضع الخصوصية المحسّن.",
        ],
      },
    ],
  },
};

const Privacy = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const isRTL = language === "ar" || language === "ku" || language === "fa";
  const c = isAr ? content.ar : content.en;
  useHashScroll();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        lang={isAr ? "ar" : "en"}
        path="/privacy"
        title="Privacy, Terms and Cookies | SHAMS"
        description="How the SHAMS website collects and uses information, the terms for using the site, and how it uses cookies and browser storage."
        titleAr="الخصوصية والشروط وملفات تعريف الارتباط | شمس"
        descriptionAr="كيف يجمع موقع شمس المعلومات ويستخدمها، وشروط استخدام الموقع، وكيفية استخدام ملفات تعريف الارتباط والتخزين في المتصفح."
      />
      <Header />
      <main
        id="main-content"
        className={`max-w-3xl mx-auto px-4 py-12 md:py-16 ${isRTL ? "font-cairo" : ""}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-2">{c.title}</h1>
        <p className="text-sm text-muted-foreground mb-6">{c.updated}</p>
        <p className="text-foreground leading-relaxed mb-6">{c.intro}</p>

        <nav aria-label={isAr ? "أقسام الصفحة" : "On this page"} className="mb-10">
          <ul className="flex flex-wrap gap-2">
            {c.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="inline-flex items-center min-h-[44px] px-4 rounded-full border border-border text-sm text-healthDarkBlue hover:bg-muted">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {c.sections.map((s) => (
          <section key={s.id} id={s.id} className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-healthDarkBlue mb-4">{s.title}</h2>
            <ul className="space-y-3 list-disc ps-5 text-foreground leading-relaxed">
              {s.body.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </section>
        ))}

        <p className="text-sm text-muted-foreground">
          {isAr ? "أسئلة؟ " : "Questions? "}
          <Link to="/contact#contact-form" className="text-primary underline underline-offset-4">
            {isAr ? "تواصل معنا" : "Contact SHAMS"}
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
