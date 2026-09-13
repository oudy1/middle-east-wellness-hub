import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { Loader2, CheckCircle } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(2000),
});

const ContactForm = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const isRTL = language === "ar" || language === "ku" || language === "fa";
  const { toast } = useToast();

  const L = {
    title: isAr ? "أرسل لنا رسالة" : "Send us a message",
    name: isAr ? "الاسم" : "Name",
    namePh: isAr ? "اسمك الكامل" : "Your full name",
    email: isAr ? "البريد الإلكتروني" : "Email",
    subject: isAr ? "الموضوع" : "Subject",
    subjectPh: isAr ? "عن ماذا تسأل؟" : "What is this about?",
    message: isAr ? "الرسالة" : "Message",
    messagePh: isAr ? "اكتب رسالتك هنا..." : "Write your message here...",
    send: isAr ? "إرسال الرسالة" : "Send message",
    sending: isAr ? "جارٍ الإرسال..." : "Sending...",
    invalidTitle: isAr ? "تحقق من الحقول" : "Check the form",
    invalidBody: isAr
      ? "يرجى إدخال اسم وبريد إلكتروني صحيح وموضوع ورسالة."
      : "Please enter a name, a valid email, a subject and a message.",
    successTitle: isAr ? "تم إرسال رسالتك" : "Message sent",
    successBody: isAr
      ? "شكرًا لتواصلك مع شمس. سنعود إليك قريبًا."
      : "Thanks for reaching out to SHAMS. We will get back to you soon.",
    errorTitle: isAr ? "لم يتم الإرسال" : "Could not send",
    errorBody: isAr
      ? "حدث خطأ أثناء الإرسال. يمكنك مراسلتنا مباشرة على infoprojectshams@gmail.com."
      : "Something went wrong. You can email us directly at infoprojectshams@gmail.com.",
    sentAgain: isAr ? "إرسال رسالة أخرى" : "Send another message",
  };

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(formData);
    if (!parsed.success) {
      toast({ title: L.invalidTitle, description: L.invalidBody, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: parsed.data,
      });
      if (error) {
        const details =
          error instanceof FunctionsHttpError ? await error.context.text() : error.message;
        console.error("send-contact-email failed:", details);
        toast({ title: L.errorTitle, description: L.errorBody, variant: "destructive" });
        return;
      }
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSent(true);
      toast({ title: L.successTitle, description: L.successBody });
    } catch (err) {
      console.error("send-contact-email failed:", err);
      toast({ title: L.errorTitle, description: L.errorBody, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`shadow-lg ${isRTL ? "font-cairo" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader>
        <CardTitle className="text-2xl text-healthDarkBlue">{L.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {sent ? (
          <div className="flex flex-col items-center text-center py-8">
            <CheckCircle className="h-10 w-10 text-healthTeal mb-3" />
            <p className="font-medium text-healthDarkBlue mb-1">{L.successTitle}</p>
            <p className="text-sm text-gray-600 mb-5">{L.successBody}</p>
            <Button variant="outline" onClick={() => setSent(false)} className="min-h-[44px]">
              {L.sentAgain}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">{L.name}</Label>
                <Input
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={L.namePh}
                  maxLength={100}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">{L.email}</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  dir="ltr"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  maxLength={255}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-subject">{L.subject}</Label>
              <Input
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={L.subjectPh}
                maxLength={200}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message">{L.message}</Label>
              <Textarea
                id="contact-message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder={L.messagePh}
                maxLength={2000}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[44px] bg-healthTeal hover:bg-healthTeal/90 text-white"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {L.sending}
                </span>
              ) : (
                L.send
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactForm;
