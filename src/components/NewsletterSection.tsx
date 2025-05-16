
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t("newsletter.successTitle"),
        description: t("newsletter.successDescription"),
      });
      setEmail('');
    }, 1000);
  };
  
  return (
    <section className="py-16 md:py-20 bg-healthPurple relative">
      <div className="absolute inset-0 bg-landmarks-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">{t("newsletter.title")}</h2>
          <p className="text-lg mb-8 text-healthLightGray">
            {t("newsletter.subtitle")}
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder={t("newsletter.placeholder")}
              required
              className="bg-white flex-grow py-6 px-4 border-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              type="submit" 
              className="bg-healthRed hover:bg-red-700 text-white py-6"
              disabled={isLoading}
            >
              {isLoading ? t("newsletter.subscribing") : t("newsletter.button")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
