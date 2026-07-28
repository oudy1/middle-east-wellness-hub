
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import DOMPurify from 'dompurify';
import { useLanguage } from "@/contexts/LanguageContext";

const TopicRequestForm = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const isRTL = language === "ar" || language === "ku" || language === "fa";

  const L = {
    title: isAr ? "اقترح موضوعًا للندوة" : "Request a Webinar Topic",
    name: isAr ? "الاسم" : "Name",
    namePh: isAr ? "اسمك الكامل" : "Your full name",
    email: isAr ? "البريد الإلكتروني" : "Email",
    emailPh: isAr ? "your.email@example.com" : "your.email@example.com",
    topic: isAr ? "الموضوع المقترح" : "Proposed Topic",
    topicPh: isAr ? "ما الموضوع الصحي الذي تودّ تناوله؟" : "What health topic would you like us to cover?",
    description: isAr ? "الوصف (اختياري)" : "Description (Optional)",
    descPh: isAr
      ? "أخبرنا لماذا هذا الموضوع مهم لك ولمجتمعك..."
      : "Tell us more about why this topic is important to you and your community...",
    submit: isAr ? "إرسال الاقتراح" : "Submit Topic Request",
    thanksTitle: isAr ? "شكرًا على اقتراحك!" : "Thank you for your topic request!",
    thanksBody: isAr
      ? "سنأخذ اقتراحك بعين الاعتبار في الندوات والفعاليات القادمة."
      : "We'll consider your suggestion for future webinars and events.",
    another: isAr ? "إرسال اقتراح آخر" : "Submit Another Request",
    invalidTitle: isAr ? "إدخال غير صالح" : "Invalid input",
    invalidField: (f: string) =>
      isAr ? `يرجى التحقق من حقل ${f}.` : `Please check the ${f} field.`,
    descTooLong: isAr
      ? "الوصف طويل جدًا أو يحتوي على رموز غير مسموح بها."
      : "Description is too long or contains invalid characters.",
    successTitle: isAr ? "تم إرسال الاقتراح" : "Topic Request Submitted",
    successBody: isAr
      ? "شكرًا على اقتراحك! سنأخذه بعين الاعتبار للندوات القادمة."
      : "Thank you for your suggestion! We'll consider your topic for future webinars.",
    fieldLabels: {
      name: isAr ? "الاسم" : "name",
      email: isAr ? "البريد الإلكتروني" : "email",
      topic: isAr ? "الموضوع" : "topic",
      description: isAr ? "الوصف" : "description",
    } as Record<string, string>,
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const validateInput = (value: string, maxLength: number = 200) => {
    return value.length <= maxLength && DOMPurify.sanitize(value.trim()) === value.trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validations = [
      { field: 'name', value: formData.name, maxLength: 100 },
      { field: 'email', value: formData.email, maxLength: 100 },
      { field: 'topic', value: formData.topic, maxLength: 200 },
      { field: 'description', value: formData.description, maxLength: 1000 }
    ];
    for (const v of validations) {
      if (v.field !== 'description' && (!v.value || !validateInput(v.value, v.maxLength))) {
        toast({
          title: L.invalidTitle,
          description: L.invalidField(L.fieldLabels[v.field] || v.field),
          variant: "destructive"
        });
        return;
      }
      if (v.field === 'description' && v.value && !validateInput(v.value, v.maxLength)) {
        toast({ title: L.invalidTitle, description: L.descTooLong, variant: "destructive" });
        return;
      }
    }

    setFormData({ name: '', email: '', topic: '', description: '' });
    setSubmitted(true);
    toast({ title: L.successTitle, description: L.successBody });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const maxLength = name === 'description' ? 1000 : name === 'topic' ? 200 : 100;
    if (value.length <= maxLength) {
      setFormData({ ...formData, [name]: DOMPurify.sanitize(value) });
    }
  };

  if (submitted) {
    return (
      <Card className={`w-full max-w-2xl mx-auto ${isRTL ? "font-cairo" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-healthTeal mb-4" />
          <h2 className="text-2xl font-bold text-healthDarkBlue mb-3 text-center">{L.thanksTitle}</h2>
          <p className="text-lg text-gray-700 text-center mb-6">{L.thanksBody}</p>
          <Button onClick={() => setSubmitted(false)} className="bg-healthTeal hover:bg-healthTeal/80 text-white px-6 py-2 text-base w-full sm:w-auto">
            {L.another}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-2xl mx-auto ${isRTL ? "font-cairo" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-healthDarkBlue">
          {L.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{L.name}</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder={L.namePh} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{L.email}</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder={L.emailPh} dir="ltr" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">{L.topic}</Label>
            <Input id="topic" name="topic" value={formData.topic} onChange={handleChange} required placeholder={L.topicPh} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{L.description}</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder={L.descPh} rows={4} />
          </div>

          <Button type="submit" className="w-full bg-healthTeal hover:bg-healthTeal/90 text-white">
            {L.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TopicRequestForm;
