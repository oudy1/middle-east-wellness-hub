import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TopicOfTheWeekSection = () => {
  const { t, language } = useLanguage();

  // Sample Instagram posts data - replace with actual content
  const weeklyTopics = [
    {
      id: 1,
      titleEn: "Understanding Hypertension",
      titleAr: "فهم ارتفاع ضغط الدم",
      imageUrl: "/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png", // Using existing uploaded image as placeholder
      instagramUrl: "https://www.instagram.com/p/DN81EEuDwUV/",
      descriptionEn: "Learn about blood pressure management and healthy lifestyle choices",
      descriptionAr: "تعلم عن إدارة ضغط الدم وخيارات نمط الحياة الصحي"
    },
    {
      id: 2,
      titleEn: "Diabetes Prevention Tips",
      titleAr: "نصائح الوقاية من السكري",
      imageUrl: "/lovable-uploads/c96ab6e9-e7cb-4ed6-a0db-a332b5d2c2f8.png", // Using existing uploaded image as placeholder
      instagramUrl: "https://www.instagram.com/p/DN81ia5j_nj/",
      descriptionEn: "Essential tips for preventing and managing diabetes effectively",
      descriptionAr: "نصائح أساسية للوقاية من السكري وإدارته بفعالية"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {language === 'ar' ? 'موضوع الأسبوع' : 'Topic of the Week'}
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'تابعنا على إنستغرام للمزيد من المحتوى التعليمي الصحي (المحتوى بالعربية والإنجليزية)'
              : 'Follow us on Instagram for more health education content (Arabic & English content)'
            }
          </p>
          
          {/* Instagram Follow Button */}
          <Button 
            variant="outline" 
            size="lg"
            className="mb-8 bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0 hover:from-pink-600 hover:to-orange-600"
            onClick={() => window.open('https://www.instagram.com/projectshams/', '_blank')}
          >
            <Instagram className="w-5 h-5 mr-2" />
            {language === 'ar' ? 'تابعنا على إنستغرام' : 'Follow us on Instagram'}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {weeklyTopics.map((topic) => (
            <Card 
              key={topic.id} 
              className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-primary/20"
              onClick={() => window.open(topic.instagramUrl, '_blank')}
            >
              <div className="relative">
                <img 
                  src={topic.imageUrl} 
                  alt={language === 'ar' ? topic.titleAr : topic.titleEn}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Instagram className="w-5 h-5 text-pink-500" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {language === 'ar' ? topic.titleAr : topic.titleEn}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {language === 'ar' ? topic.descriptionAr : topic.descriptionEn}
                </p>
                <div className="flex items-center text-sm text-primary font-medium">
                  {language === 'ar' ? 'اقرأ المزيد على إنستغرام' : 'Read more on Instagram'}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {language === 'ar' 
              ? 'هل لديك موضوع تريد أن نغطيه؟'
              : 'Have a topic you want us to cover?'
            }
          </p>
          <Button variant="secondary" size="lg">
            {language === 'ar' ? 'اقترح موضوعاً' : 'Suggest a Topic'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopicOfTheWeekSection;