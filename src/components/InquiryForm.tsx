
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FunctionsHttpError } from "@supabase/supabase-js";
import DOMPurify from 'dompurify';

const InquiryForm = () => {
  const { t, language } = useLanguage();
  const isAr = language === "ar";
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateInput = (value: string, maxLength: number = 500) => {
    return value.length <= maxLength && DOMPurify.sanitize(value.trim()) === value.trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const maxLength = name === 'message' ? 2000 : 200;

    if (value.length <= maxLength) {
      setFormData({
        ...formData,
        [name]: DOMPurify.sanitize(value)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const validations = [
      { field: 'name', value: formData.name, maxLength: 100 },
      { field: 'email', value: formData.email, maxLength: 100 },
      { field: 'subject', value: formData.subject, maxLength: 200 },
      { field: 'message', value: formData.message, maxLength: 2000 }
    ];

    for (const validation of validations) {
      if (!validation.value.trim() || !validateInput(validation.value, validation.maxLength)) {
        toast({
          title: "Invalid input",
          description: `Please check your ${validation.field} field.`,
          variant: "destructive"
        });
        return;
      }
    }

    setIsSubmitting(true);

    const sanitizedData = {
      name: DOMPurify.sanitize(formData.name.trim()),
      email: DOMPurify.sanitize(formData.email.trim()),
      subject: DOMPurify.sanitize(formData.subject.trim()),
      message: DOMPurify.sanitize(formData.message.trim())
    };

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: sanitizedData,
      });
      if (error) {
        const details =
          error instanceof FunctionsHttpError ? await error.context.text() : error.message;
        console.error("send-contact-email failed:", details);
        toast({
          title: isAr ? "لم يتم الإرسال" : "Could not send",
          description: isAr
            ? "حدث خطأ. يمكنك مراسلتنا على infoprojectshams@gmail.com."
            : "Something went wrong. You can email us at infoprojectshams@gmail.com.",
          variant: "destructive",
        });
        return;
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      toast({
        title: "Message sent!",
        description: "Thank you for your inquiry! We will get back to you soon."
      });
    } catch (err) {
      console.error("send-contact-email failed:", err);
      toast({
        title: isAr ? "لم يتم الإرسال" : "Could not send",
        description: isAr
          ? "حدث خطأ. يمكنك مراسلتنا على infoprojectshams@gmail.com."
          : "Something went wrong. You can email us at infoprojectshams@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">{t("contact.inquiryForm")}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t("contact.name")} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t("contact.email")} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
                maxLength={100}
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              {t("contact.subject")} *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
              maxLength={200}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              {t("contact.message")} *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent resize-vertical"
              maxLength={2000}
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-healthTeal hover:bg-healthTeal/80 text-white px-8 py-3"
            >
              {isSubmitting ? t("contact.sending") : t("contact.send")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InquiryForm;
