import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const ArabicChatPrompt = () => {
  const { language } = useLanguage();

  if (language !== "ar") return null;

  const openChat = () => {
    window.dispatchEvent(new CustomEvent("shams-open-chat"));
  };

  return (
    <section className="py-10 bg-healthTeal/5 border-y border-healthTeal/20" dir="rtl">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground font-cairo mb-3">
          اسأل شمس بالعربية
        </h2>
        <p className="text-muted-foreground font-cairo max-w-xl mx-auto mb-6">
          مساعدنا الذكي يجيب على أسئلتك بالعربية حول خدماتنا، الموارد الصحية، والبرامج المتاحة.
        </p>
        <Button
          onClick={openChat}
          className="bg-healthTeal hover:bg-healthTeal/90 text-white font-cairo min-h-[44px]"
        >
          <MessageCircle className="ml-2 h-5 w-5" />
          ابدأ المحادثة بالعربية
        </Button>
      </div>
    </section>
  );
};

export default ArabicChatPrompt;
