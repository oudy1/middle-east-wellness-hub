
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Webinars = () => {
  const { language, t } = useLanguage();
  
  const webinarsData = [
    {
      title: language === 'en' ? 
        "Understanding Diabetes in Middle Eastern Populations" : 
        language === 'ar' ? 
        "فهم مرض السكري في مجتمعات الشرق الأوسط" :
        language === 'ku' ?
        "تێگەیشتن لە نەخۆشی شەکرە لە دانیشتووانی ناوەڕاست" :
        language === 'fa' ?
        "درک دیابت در جمعیت خاورمیانه" :
        "Orta Doğu Nüfusunda Diyabeti Anlama",
      presenter: language === 'en' ? "Dr. Sarah Mahmoud" : 
        language === 'ar' ? "د. سارة محمود" :
        language === 'ku' ? "د. سارە محمود" :
        language === 'fa' ? "دکتر سارا محمود" :
        "Dr. Sarah Mahmoud",
      date: language === 'en' ? "April 15, 2025" : 
        language === 'ar' ? "١٥ أبريل ٢٠٢٥" :
        language === 'ku' ? "١٥ی نیسانی ٢٠٢٥" :
        language === 'fa' ? "۱۵ آوریل ۲۰۲۵" :
        "15 Nisan 2025",
      duration: language === 'en' ? "45 minutes" : 
        language === 'ar' ? "٤٥ دقيقة" :
        language === 'ku' ? "٤٥ خولەک" :
        language === 'fa' ? "۴۵ دقیقه" :
        "45 dakika",
      description: language === 'en' ? 
        "An in-depth look at diabetes prevalence, risk factors, and management strategies specific to Middle Eastern communities." : 
        language === 'ar' ?
        "نظرة متعمقة في انتشار مرض السكري وعوامل الخطر واستراتيجيات الإدارة الخاصة بمجتمعات الشرق الأوسط." :
        language === 'ku' ?
        "تەماشایەکی قووڵ لە بڵاوبوونەوەی نەخۆشی شەکرە، هۆکارەکانی مەترسی، و ستراتیژییەکانی بەڕێوەبردنی تایبەت بە کۆمەڵگاکانی ناوەڕاست." :
        language === 'fa' ?
        "نگاهی عمیق به شیوع دیابت، عوامل خطر و استراتژی های مدیریت مخصوص جوامع خاورمیانه." :
        "Orta Doğu toplumlarına özgü diyabet yaygınlığı, risk faktörleri ve yönetim stratejilerine derinlemesine bakış."
    },
    {
      title: language === 'en' ? 
        "Mental Health Awareness: Breaking Cultural Stigmas" : 
        language === 'ar' ?
        "الوعي بالصحة النفسية: كسر وصمة العار الثقافية" :
        language === 'ku' ?
        "هۆشیاری تەندروستی دەروونی: شکاندنی شەرمەزاری کولتووری" :
        language === 'fa' ?
        "آگاهی سلامت روان: شکستن انگ فرهنگی" :
        "Ruh Sağlığı Farkındalığı: Kültürel Damgaları Kırma",
      presenter: language === 'en' ? "Dr. Amir Hassan" : 
        language === 'ar' ? "د. أمير حسن" :
        language === 'ku' ? "د. ئەمیر حەسەن" :
        language === 'fa' ? "دکتر امیر حسن" :
        "Dr. Amir Hassan",
      date: language === 'en' ? "March 22, 2025" : 
        language === 'ar' ? "٢٢ مارس ٢٠٢٥" :
        language === 'ku' ? "٢٢ی ئازاری ٢٠٢٥" :
        language === 'fa' ? "۲۲ مارس ۲۰۲۵" :
        "22 Mart 2025",
      duration: language === 'en' ? "60 minutes" : 
        language === 'ar' ? "٦٠ دقيقة" :
        language === 'ku' ? "٦٠ خولەک" :
        language === 'fa' ? "۶۰ دقیقه" :
        "60 dakika",
      description: language === 'en' ? 
        "Addressing mental health challenges in Middle Eastern communities and strategies for breaking down cultural barriers to care." : 
        language === 'ar' ?
        "معالجة تحديات الصحة النفسية في مجتمعات الشرق الأوسط واستراتيجيات لكسر الحواجز الثقافية للرعاية." :
        language === 'ku' ?
        "چارەسەرکردنی ئاستەنگەکانی تەندروستی دەروونی لە کۆمەڵگاکانی ناوەڕاست و ستراتیژییەکان بۆ شکاندنی کۆسپەکانی کولتووری بۆ چاودێری." :
        language === 'fa' ?
        "پرداختن به چالش های سلامت روان در جوامع خاورمیانه و استراتژی هایی برای شکستن موانع فرهنگی مراقبت." :
        "Orta Doğu toplumlarında ruh sağlığı zorluklarını ele alma ve bakım için kültürel engelleri kırma stratejileri."
    },
    {
      title: language === 'en' ? 
        "Cardiovascular Health: Prevention Strategies" : 
        language === 'ar' ?
        "صحة القلب والأوعية الدموية: استراتيجيات الوقاية" :
        language === 'ku' ?
        "تەندروستی دڵ و خوێنبەرەکان: ستراتیژییەکانی پێشگیری" :
        language === 'fa' ?
        "سلامت قلب و عروق: استراتژی های پیشگیری" :
        "Kardiyovasküler Sağlık: Önleme Stratejileri",
      presenter: language === 'en' ? "Dr. Leila Nassar" : 
        language === 'ar' ? "د. ليلى نصار" :
        language === 'ku' ? "د. لەیلا نەساری" :
        language === 'fa' ? "دکتر لیلا نصار" :
        "Dr. Leila Nassar",
      date: language === 'en' ? "February 10, 2025" : 
        language === 'ar' ? "١٠ فبراير ٢٠٢٥" :
        language === 'ku' ? "١٠ی شوباتی ٢٠٢٥" :
        language === 'fa' ? "۱۰ فوریه ۲۰۲۵" :
        "10 Şubat 2025",
      duration: language === 'en' ? "50 minutes" : 
        language === 'ar' ? "٥٠ دقيقة" :
        language === 'ku' ? "٥٠ خولەک" :
        language === 'fa' ? "۵۰ دقیقه" :
        "50 dakika",
      description: language === 'en' ? 
        "Essential information about heart health with culturally relevant dietary and lifestyle recommendations." : 
        language === 'ar' ?
        "معلومات أساسية عن صحة القلب مع توصيات غذائية ونمط حياة مناسبة ثقافياً." :
        language === 'ku' ?
        "زانیاری بنەڕەتی دەربارەی تەندروستی دڵ لەگەڵ پێشنیارەکانی خۆراک و ژیانی گونجاو لە کولتوور." :
        language === 'fa' ?
        "اطلاعات ضروری در مورد سلامت قلب با توصیه های رژیم غذایی و سبک زندگی مرتبط با فرهنگ." :
        "Kültürel açıdan uygun beslenme ve yaşam tarzı önerileriyle kalp sağlığı hakkında temel bilgiler."
    },
    {
      title: language === 'en' ? 
        "Women's Health: Cultural Considerations in Care" : 
        language === 'ar' ?
        "صحة المرأة: اعتبارات ثقافية في الرعاية" :
        language === 'ku' ?
        "تەندروستی ژنان: لەبەرچاوگرتنەکانی کولتووری لە چاودێریدا" :
        language === 'fa' ?
        "سلامت زنان: ملاحظات فرهنگی در مراقبت" :
        "Kadın Sağlığı: Bakımda Kültürel Değerlendirmeler",
      presenter: language === 'en' ? "Dr. Fatima Al-Zahrani" : 
        language === 'ar' ? "د. فاطمة الزهراني" :
        language === 'ku' ? "د. فاتیمە الزەهرانی" :
        language === 'fa' ? "دکتر فاطمه الزهرانی" :
        "Dr. Fatima Al-Zahrani",
      date: language === 'en' ? "January 18, 2025" : 
        language === 'ar' ? "١٨ يناير ٢٠٢٥" :
        language === 'ku' ? "١٨ی کانوونی دووەمی ٢٠٢٥" :
        language === 'fa' ? "۱۸ ژانویه ۲۰۲۵" :
        "18 Ocak 2025",
      duration: language === 'en' ? "55 minutes" : 
        language === 'ar' ? "٥٥ دقيقة" :
        language === 'ku' ? "٥٥ خولەک" :
        language === 'fa' ? "۵۵ دقیقه" :
        "55 dakika",
      description: language === 'en' ? 
        "Exploring women's health topics with sensitivity to cultural contexts and traditions." : 
        language === 'ar' ?
        "استكشاف مواضيع صحة المرأة مع مراعاة للسياقات الثقافية والتقاليد." :
        language === 'ku' ?
        "گەڕان لە بابەتەکانی تەندروستی ژنان لەگەڵ هەستیاری بۆ پێوەندی کولتووری و نەریتەکان." :
        language === 'fa' ?
        "کاوش موضوعات سلامت زنان با حساسیت نسبت به زمینه ها و سنت های فرهنگی." :
        "Kültürel bağlamlara ve geleneklere duyarlılıkla kadın sağlığı konularını keşfetme."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray">
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("webinars.title")}</h1>
              <p className="text-lg text-gray-600">
                {t("webinars.subtitle")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {webinarsData.map((webinar, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md relative">
                  <div className="bg-healthDarkBlue p-6 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{webinar.title}</h3>
                    <Button variant="outline" size="icon" className="rounded-full bg-white hover:bg-gray-100 cursor-not-allowed opacity-50" disabled>
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-healthGold text-healthDarkBlue">
                    Coming Soon
                  </Badge>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-healthTeal/10 text-healthTeal px-3 py-1 rounded-full text-sm">
                        {webinar.presenter}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {webinar.date}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {webinar.duration}
                      </span>
                    </div>
                    <p className="text-gray-600">{webinar.description}</p>
                    <Button variant="link" className="p-0 mt-4 text-gray-400 cursor-not-allowed" disabled>
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{t("webinars.requestTitle")}</h2>
              <p className="mb-6">
                {t("webinars.requestDesc")}
              </p>
              <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-healthLightGray rounded-lg">
                <div className="mb-4 md:mb-0 md:mr-6">
                  <h3 className="text-xl font-semibold mb-2">{t("webinars.upcomingTitle")}</h3>
                  <p>{t("webinars.upcomingDesc")}</p>
                </div>
                <Button className="bg-healthTeal hover:bg-teal-700 text-white">
                  {t("webinars.viewSchedule")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Webinars;
