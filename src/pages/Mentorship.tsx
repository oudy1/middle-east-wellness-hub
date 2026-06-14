import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, GraduationCap, Users, Mail, Instagram, Globe, Link as LinkIcon, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/SEOHead";
import posterAsset from "@/assets/mentorship-poster.jpg.asset.json";

const MENTOR_FORM = "https://forms.gle/dCyMfPQH8DRSxsxb8";
const MENTEE_FORM = "https://forms.gle/3Xw71e2Y3Hhqn7gF9";
const LINKTREE = "https://linktr.ee/ProjectSHAMS";

const Mentorship = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const isRTL = isAr || language === "fa" || language === "ku";

  const c = isAr
    ? {
        title: "برنامج الإرشاد من شمس",
        subtitle: "تمكين قادة الرعاية الصحية المستقبليين من منطقة الشرق الأوسط وشمال أفريقيا",
        overviewTitle: "عن برنامج الإرشاد من شمس",
        overview:
          "برنامج الإرشاد من شمس هو مبادرة مجتمعية تربط الطلاب والمهنيين في بداية مسيرتهم من خلفيات الشرق الأوسط وشمال أفريقيا بمهنيي الرعاية الصحية في جميع أنحاء كندا. يهدف البرنامج إلى زيادة الوصول إلى الإرشاد والتوجيه والتمثيل وفرص التطور المهني، مع مساعدة المشاركين على التنقل في المسارات التعليمية والمهنية في مجال الرعاية الصحية. من خلال علاقات هادفة فردية ومجموعات صغيرة، تسعى شمس لبناء شبكة دعم تمكّن قادة الرعاية الصحية المستقبليين وتقوّي مجتمع الرعاية الصحية في منطقة الشرق الأوسط وشمال أفريقيا.",
        goalsTitle: "أهداف البرنامج",
        goals: [
          "زيادة فرص الإرشاد لطلاب منطقة الشرق الأوسط وشمال أفريقيا",
          "تحسين التمثيل في مهن الرعاية الصحية",
          "تقديم التوجيه حول المسارات التعليمية والمهنية",
          "مساعدة الطلاب على بناء الثقة والشبكات المهنية",
          "تعزيز الدعم المجتمعي وتبادل المعرفة",
          "بناء علاقات بين المهنيين وقادة الرعاية الصحية المستقبليين",
        ],
        menteeTitle: "كن مستفيداً من الإرشاد",
        menteeIntro: "نرحب بـ:",
        menteeWho: [
          "طلاب المدارس الثانوية",
          "طلاب الكليات",
          "طلاب الجامعات",
          "الخريجين الجدد",
          "الأفراد الذين يستكشفون مهن الرعاية الصحية",
        ],
        fieldsTitle: "المجالات قد تشمل:",
        fields: [
          "الطب",
          "التمريض",
          "طب الأسنان",
          "الصيدلة",
          "العلاج الطبيعي",
          "العلاج الوظيفي",
          "علم النفس",
          "الصحة العامة",
          "العمل الاجتماعي",
          "البحث",
          "المهن الصحية المساعدة",
          "إدارة الرعاية الصحية",
        ],
        noExp: "لا تشترط الخبرة السابقة.",
        applyMentee: "قدّم كمستفيد من الإرشاد",
        mentorTitle: "كن مرشداً",
        mentorIntro: "نرحب بـ:",
        mentorWho: [
          "مهنيي الرعاية الصحية الممارسين",
          "الأطباء",
          "أطباء الإقامة",
          "طلاب الطب",
          "طلاب الدراسات العليا",
          "الممرضين",
          "أطباء الأسنان",
          "الصيادلة",
          "المعالجين",
          "الباحثين",
          "المهنيين الصحيين المساعدين",
          "قادة وإداريي الرعاية الصحية",
        ],
        mentorNote: "يجب أن يكون المرشدون ملتزمين بدعم الطلاب من خلال التوجيه والتشجيع والرؤية المهنية.",
        applyMentor: "قدّم كمرشد",
        helpTitle: "ما يمكن للمرشدين المساعدة فيه",
        help: [
          "استكشاف المهن",
          "اختيار البرامج والمدارس",
          "طلبات الجامعة",
          "طلبات الدراسات العليا",
          "طلبات كلية الطب",
          "فرص البحث",
          "بناء الشبكات المهنية",
          "التحضير للمقابلات",
          "مراجعة السيرة الذاتية",
          "التوازن بين العمل والحياة",
          "التطور المهني",
          "التغلب على التحديات كطالب أو مهني من منطقة الشرق الأوسط وشمال أفريقيا",
        ],
        structureTitle: "هيكل البرنامج",
        matchedBy: "يتم المطابقة بناءً على:",
        match: ["الاهتمامات المهنية", "الأهداف التعليمية", "الخلفية المهنية", "مجالات الخبرة", "التوفر"],
        includes: "قد يشمل البرنامج:",
        includesList: [
          "إرشاد فردي",
          "اجتماعات افتراضية",
          "فرص تواصل جماعية",
          "ورش تطوير مهني",
          "فعاليات مجتمع شمس",
          "ندوات تعليمية",
        ],
        expectTitle: "التوقعات",
        menteesExp: "المستفيدون",
        mentorsExp: "المرشدون",
        menteeExp: [
          "الاحترام والمهنية",
          "حضور الاجتماعات المجدولة",
          "الاستعداد بأسئلة وأهداف",
          "تحمل مسؤولية التعلم والنمو",
          "التواصل المستمر مع المرشدين",
        ],
        mentorExp: [
          "تقديم التوجيه والتشجيع",
          "الحفاظ على المهنية والسرية",
          "دعم المستفيدين باحترام",
          "مشاركة المعرفة والخبرات",
          "التواصل المستمر مع المستفيدين",
        ],
        whyTitle: "لماذا الإرشاد مهم",
        why: "كثير من الطلاب لديهم الموهبة والدافع لمتابعة مهن الرعاية الصحية ولكنهم قد يفتقرون إلى الشبكات المهنية أو القدوات أو التوجيه. يساعد الإرشاد في سد هذه الفجوة. من خلال ربط المهنيين ذوي الخبرة بالطلاب، تساعد شمس في إنشاء قادة رعاية صحية مستقبليين أكثر وعياً وثقة وترابطاً مع تعزيز الدعم داخل شبكات الرعاية الصحية في منطقة الشرق الأوسط وشمال أفريقيا.",
        applyToday: "قدّم الآن",
        questions: "أسئلة؟ راسلنا عبر البريد الإلكتروني:",
        allLinks: "جميع روابط شمس",
        contact: "تواصل معنا",
      }
    : {
        title: "SHAMS Mentorship Program",
        subtitle: "Empowering future MENA healthcare leaders",
        overviewTitle: "About the SHAMS Mentorship Program",
        overview:
          "The SHAMS Mentorship Program is a community-driven initiative designed to connect students and early-career individuals from Middle Eastern and North African backgrounds with healthcare professionals across Canada. The program aims to increase access to mentorship, guidance, representation, and professional development opportunities while helping participants navigate educational and career pathways in healthcare. Through meaningful one-on-one and small-group connections, SHAMS seeks to build a supportive network that empowers future healthcare leaders and strengthens the MENA healthcare community.",
        goalsTitle: "Program Goals",
        goals: [
          "Increase access to mentorship opportunities for MENA students",
          "Improve representation within healthcare professions",
          "Provide guidance on educational and career pathways",
          "Help students build confidence and professional networks",
          "Foster community support and knowledge sharing",
          "Build relationships between professionals and future healthcare leaders",
        ],
        menteeTitle: "Become a Mentee",
        menteeIntro: "We welcome:",
        menteeWho: [
          "High school students",
          "College students",
          "University students",
          "Recent graduates",
          "Individuals exploring healthcare careers",
        ],
        fieldsTitle: "Fields may include:",
        fields: [
          "Medicine",
          "Nursing",
          "Dentistry",
          "Pharmacy",
          "Physiotherapy",
          "Occupational Therapy",
          "Psychology",
          "Public Health",
          "Social Work",
          "Research",
          "Allied Health Professions",
          "Healthcare Administration",
        ],
        noExp: "No prior experience is required.",
        applyMentee: "Apply as a Mentee",
        mentorTitle: "Become a Mentor",
        mentorIntro: "We welcome:",
        mentorWho: [
          "Practicing healthcare professionals",
          "Physicians",
          "Residents",
          "Medical students",
          "Graduate students",
          "Nurses",
          "Dentists",
          "Pharmacists",
          "Therapists",
          "Researchers",
          "Allied health professionals",
          "Healthcare leaders and administrators",
        ],
        mentorNote:
          "Mentors should be committed to supporting students through guidance, encouragement, and professional insight.",
        applyMentor: "Apply as a Mentor",
        helpTitle: "What Mentors Can Help With",
        help: [
          "Career exploration",
          "Choosing programs and schools",
          "University applications",
          "Graduate school applications",
          "Medical school applications",
          "Research opportunities",
          "Professional networking",
          "Interview preparation",
          "Resume and CV feedback",
          "Work-life balance",
          "Professional development",
          "Navigating challenges as a MENA student or healthcare professional",
        ],
        structureTitle: "Program Structure",
        matchedBy: "Participants will be matched based on:",
        match: [
          "Career interests",
          "Educational goals",
          "Professional background",
          "Areas of expertise",
          "Availability",
        ],
        includes: "The program may include:",
        includesList: [
          "One-on-one mentorship",
          "Virtual meetings",
          "Group networking opportunities",
          "Professional development workshops",
          "SHAMS community events",
          "Educational webinars",
        ],
        expectTitle: "Expectations",
        menteesExp: "Mentees",
        mentorsExp: "Mentors",
        menteeExp: [
          "Be respectful and professional",
          "Attend scheduled meetings",
          "Come prepared with questions and goals",
          "Take ownership of learning and growth",
          "Communicate consistently with mentors",
        ],
        mentorExp: [
          "Provide guidance and encouragement",
          "Maintain professionalism and confidentiality",
          "Support mentees respectfully",
          "Share knowledge and experiences",
          "Communicate consistently with mentees",
        ],
        whyTitle: "Why Mentorship Matters",
        why: "Many students have the talent and motivation to pursue healthcare careers but may lack access to professional networks, role models, or guidance. Mentorship helps bridge that gap. By connecting experienced professionals with students, SHAMS helps create more informed, confident, and connected future healthcare leaders while strengthening support within MENA healthcare networks.",
        applyToday: "Apply Today",
        questions: "Questions? Email:",
        allLinks: "All SHAMS Links",
        contact: "Contact Us",
      };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead
        lang={isAr ? "ar" : "en"}
        path="/programs/mentorship"
        title="SHAMS Mentorship Program | Empowering Future MENA Healthcare Leaders"
        description="The SHAMS Mentorship Program connects MENA students and early-career individuals with healthcare professionals across Canada for guidance, mentorship, and career support."
        titleAr="برنامج الإرشاد من شمس | تمكين قادة الرعاية الصحية المستقبليين"
        descriptionAr="يربط برنامج الإرشاد من شمس الطلاب والمهنيين في بداية مسيرتهم من خلفيات الشرق الأوسط وشمال أفريقيا بمهنيي الرعاية الصحية في جميع أنحاء كندا."
      />
      <Header />
      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Hero */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="order-2 md:order-1">
            <Badge variant="secondary" className="mb-3">
              <Sparkles className="h-3 w-3 mr-1" /> {isAr ? "برنامج جديد" : "Program"}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{c.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{c.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <a href={MENTOR_FORM} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2">
                  <Users className="h-4 w-4" /> {isAr ? "كن مرشداً" : "Become a Mentor"}
                </Button>
              </a>
              <a href={MENTEE_FORM} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2">
                  <GraduationCap className="h-4 w-4" /> {isAr ? "كن مستفيداً من الإرشاد" : "Become a Mentee"}
                </Button>
              </a>
            </div>
            <a
              href={LINKTREE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-4"
            >
              <LinkIcon className="h-3 w-3" /> {c.allLinks}
            </a>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src={posterAsset.url}
              alt={c.title}
              className="rounded-xl shadow-lg max-w-full w-full sm:max-w-sm h-auto object-contain"
              loading="eager"
            />
          </div>
        </section>

        {/* Overview */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>{c.overviewTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{c.overview}</p>
            </CardContent>
          </Card>
        </section>

        {/* Goals */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">{c.goalsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.goals.map((g) => (
              <Card key={g} className="p-4">
                <p className="text-sm text-foreground">{g}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Mentee + Mentor */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" /> {c.menteeTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm font-medium">{c.menteeIntro}</p>
              <ul className="list-disc ps-5 text-sm text-muted-foreground space-y-1">
                {c.menteeWho.map((w) => <li key={w}>{w}</li>)}
              </ul>
              <p className="text-sm font-medium">{c.fieldsTitle}</p>
              <div className="flex flex-wrap gap-2">
                {c.fields.map((f) => (
                  <Badge key={f} variant="secondary">{f}</Badge>
                ))}
              </div>
              <p className="text-sm font-semibold text-primary">{c.noExp}</p>
              <a href={MENTEE_FORM} target="_blank" rel="noopener noreferrer">
                <Button className="w-full gap-2">
                  {c.applyMentee} <ExternalLink size={14} />
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> {c.mentorTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm font-medium">{c.mentorIntro}</p>
              <ul className="list-disc ps-5 text-sm text-muted-foreground space-y-1">
                {c.mentorWho.map((w) => <li key={w}>{w}</li>)}
              </ul>
              <p className="text-sm text-muted-foreground italic">{c.mentorNote}</p>
              <a href={MENTOR_FORM} target="_blank" rel="noopener noreferrer">
                <Button className="w-full gap-2">
                  {c.applyMentor} <ExternalLink size={14} />
                </Button>
              </a>
            </CardContent>
          </Card>
        </section>

        {/* Help with */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">{c.helpTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {c.help.map((h) => (
              <div key={h} className="flex items-start gap-2 p-3 rounded-md bg-muted/40">
                <span className="text-primary mt-0.5">✓</span>
                <span className="text-sm text-foreground">{h}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Structure */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>{c.structureTitle}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium mb-2">{c.matchedBy}</p>
                <ul className="list-disc ps-5 text-sm text-muted-foreground space-y-1">
                  {c.match.map((m) => <li key={m}>{m}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">{c.includes}</p>
                <ul className="list-disc ps-5 text-sm text-muted-foreground space-y-1">
                  {c.includesList.map((m) => <li key={m}>{m}</li>)}
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Expectations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">{c.expectTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-lg">{c.menteesExp}</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc ps-5 text-sm text-muted-foreground space-y-1">
                  {c.menteeExp.map((e) => <li key={e}>{e}</li>)}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">{c.mentorsExp}</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc ps-5 text-sm text-muted-foreground space-y-1">
                  {c.mentorExp.map((e) => <li key={e}>{e}</li>)}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why */}
        <section className="mb-12">
          <Card className="bg-muted/40 border-border">
            <CardHeader><CardTitle>{c.whyTitle}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{c.why}</p>
            </CardContent>
          </Card>
        </section>

        {/* Final CTA */}
        <section className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/10 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">{c.applyToday}</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <a href={MENTOR_FORM} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <Users className="h-4 w-4" /> {isAr ? "كن مرشداً" : "Become a Mentor"}
              </Button>
            </a>
            <a href={MENTEE_FORM} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                <GraduationCap className="h-4 w-4" /> {isAr ? "كن مستفيداً من الإرشاد" : "Become a Mentee"}
              </Button>
            </a>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {c.questions}{" "}
            <a href="mailto:infoprojectshams@gmail.com" className="text-primary hover:underline">
              infoprojectshams@gmail.com
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mt-4">
            <a href="https://www.projectshams.com" className="inline-flex items-center gap-1 hover:text-primary">
              <Globe className="h-3 w-3" /> projectshams.com
            </a>
            <a href="https://www.instagram.com/projectshams/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary">
              <Instagram className="h-3 w-3" /> @projectshams
            </a>
            <a href={LINKTREE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary">
              <LinkIcon className="h-3 w-3" /> Linktree
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Mentorship;
