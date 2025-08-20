
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import DOMPurify from 'dompurify';

const Contact = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    category: "",
    message: ""
  });

  const validateInput = (value: string, maxLength: number = 200) => {
    return value.length <= maxLength && DOMPurify.sanitize(value.trim()) === value.trim();
  };

  const handleInputChange = (field: string, value: string) => {
    const maxLength = field === 'message' ? 2000 : 200;
    if (value.length <= maxLength) {
      setFormData(prev => ({
        ...prev,
        [field]: DOMPurify.sanitize(value)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const validations = [
      { field: 'firstName', value: formData.firstName, maxLength: 100 },
      { field: 'lastName', value: formData.lastName, maxLength: 100 },
      { field: 'email', value: formData.email, maxLength: 100 },
      { field: 'message', value: formData.message, maxLength: 2000 }
    ];
    
    for (const validation of validations) {
      if (!validation.value || !validateInput(validation.value, validation.maxLength)) {
        toast({
          title: "Invalid input",
          description: `Please check your ${validation.field} field.`,
          variant: "destructive"
        });
        return;
      }
    }
    
    if (!formData.category) {
      toast({
        title: "Please select a category",
        description: "Category is required to help us route your message.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message sent!",
      description: "Thank you for your message. We will get back to you soon!"
    });
    
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      category: "",
      message: ""
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-healthDarkBlue">
                {t("contact.title")}
              </h1>
              <p className="text-lg text-gray-600">
                {t("contact.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-healthDarkBlue">{t("contact.sendMessage")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          {t("contact.firstName")} *
                        </label>
                        <Input
                          id="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          {t("contact.lastName")} *
                        </label>
                        <Input
                          id="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.email")} *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.category")} *
                      </label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("contact.selectCategory")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">{t("contact.generalInquiry")}</SelectItem>
                          <SelectItem value="support">{t("contact.supportRequest")}</SelectItem>
                          <SelectItem value="partnership">{t("contact.partnership")}</SelectItem>
                          <SelectItem value="research">{t("contact.research")}</SelectItem>
                          <SelectItem value="community">{t("contact.community")}</SelectItem>
                          <SelectItem value="physician">{t("contact.physician")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.message")} *
                      </label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder={t("contact.messagePlaceholder")}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-healthTeal hover:bg-healthTeal/90 text-white">
                      {t("contact.sendButton")}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-healthDarkBlue">{t("contact.getInTouch")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-healthTeal/10 rounded-lg">
                        <Mail className="h-5 w-5 text-healthTeal" />
                      </div>
                      <div>
                        <p className="font-medium">{t("contact.email")}</p>
                        <p className="text-gray-600">infoprojectshams@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-healthTeal/10 rounded-lg">
                        <MapPin className="h-5 w-5 text-healthTeal" />
                      </div>
                      <div>
                        <p className="font-medium">{t("contact.location")}</p>
                        <p className="text-gray-600">{t("contact.toronto")}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-healthTeal/10 rounded-lg">
                        <Instagram className="h-5 w-5 text-healthTeal" />
                      </div>
                      <div>
                        <p className="font-medium">Instagram</p>
                        <a 
                          href="https://www.instagram.com/projectshams/" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-healthTeal transition-colors"
                        >
                          @projectshams
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
