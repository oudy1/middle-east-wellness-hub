import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import DOMPurify from "dompurify";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  newsletter: false,
  phone: "",
  institution: "",
  projectTitle: "",
  projectDescription: "",
  preferredBackground: "",
  deadline: "",
  isPaid: "",
  studyWebsite: "",
};

const PostOpportunityForm = () => {
  const { t, language } = useLanguage();
  const isAr = language === "ar";
  const [formData, setFormData] = useState({ ...emptyForm });
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const validateInput = (value: string, maxLength: number = 200) => {
    return (
      value.length <= maxLength &&
      DOMPurify.sanitize(value.trim()) === value.trim()
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "institution",
      "projectTitle",
      "projectDescription",
      "isPaid",
    ];
    for (const field of requiredFields) {
      const value = formData[field as keyof typeof formData] as string;
      if (
        !value ||
        (typeof value === "string" &&
          !validateInput(value, field === "projectDescription" ? 2000 : 200))
      ) {
        toast({
          title: t("form.invalidInput"),
          description: t("form.invalidInputDesc"),
          variant: "destructive",
        });
        return;
      }
    }

    if (formData.projectDescription.trim().length < 10) {
      toast({
        title: t("form.invalidInput"),
        description: t("form.invalidInputDesc"),
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("opportunities").insert({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        institution: formData.institution.trim(),
        project_title: formData.projectTitle.trim(),
        project_description: formData.projectDescription.trim(),
        preferred_background: formData.preferredBackground.trim() || null,
        deadline: formData.deadline || null,
        is_paid: formData.isPaid || null,
        study_website: formData.studyWebsite.trim() || null,
        newsletter: formData.newsletter,
        language,
        status: "pending",
      });

      if (error) throw error;

      setFormData({ ...emptyForm });
      toast({
        title: t("opportunityForm.successTitle"),
        description: t("opportunityForm.successDesc"),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit opportunity:", error);
      toast({
        title: t("form.submissionFailed"),
        description: t("opportunityForm.failureDesc"),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      const maxLength = name === "projectDescription" ? 2000 : 200;
      if (value.length <= maxLength) {
        setFormData((prev) => ({
          ...prev,
          [name]: DOMPurify.sanitize(value),
        }));
      }
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className={`w-full max-w-4xl mx-auto ${isAr ? "font-cairo" : ""}`}>
      {submitted ? (
        <CardContent className="flex flex-col items-center justify-center py-16">
          <h2 className="text-3xl font-bold text-healthDarkBlue mb-4 text-center">
            {t("opportunityForm.thankYou")}
          </h2>
          <p className="text-lg text-gray-700 text-center">
            {isAr
              ? "سيراجع فريق شمس الفرصة قبل نشرها على صفحة الفرص البحثية."
              : "The SHAMS team will review your opportunity before it appears on the Research Opportunities page."}
          </p>
        </CardContent>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-healthDarkBlue">
              {t("opportunityForm.title")}
            </CardTitle>
            <p className="text-center text-gray-600 mt-4">
              {t("opportunityForm.subtitle")}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-start block">
                  {t("opportunityForm.name")} <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder={t("contact.firstName")}
                  />
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder={t("contact.lastName")}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium text-start block">
                  {t("contact.email")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  dir="ltr"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t("opportunityForm.emailPlaceholder")}
                  className="text-start"
                />
              </div>

              {/* Newsletter */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, newsletter: checked as boolean }))
                  }
                />
                <Label htmlFor="newsletter" className="text-sm">
                  {t("form.newsletter")}
                </Label>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium text-start block">
                  {t("form.phone")}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  dir="ltr"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("opportunityForm.phonePlaceholder")}
                  className="text-start"
                />
              </div>

              {/* Institution */}
              <div className="space-y-2">
                <Label htmlFor="institution" className="text-base font-medium text-start block">
                  {t("opportunityForm.institution")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                  placeholder={t("opportunityForm.institutionPlaceholder")}
                />
              </div>

              {/* Project title */}
              <div className="space-y-2">
                <Label htmlFor="projectTitle" className="text-base font-medium text-start block">
                  {t("opportunityForm.projectTitle")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="projectTitle"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  required
                  placeholder={t("opportunityForm.projectTitlePlaceholder")}
                />
              </div>

              {/* Project description */}
              <div className="space-y-2">
                <Label
                  htmlFor="projectDescription"
                  className="text-base font-medium text-start block"
                >
                  {t("opportunityForm.projectDescription")} <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  required
                  placeholder={t("opportunityForm.projectDescriptionPlaceholder")}
                  rows={4}
                />
              </div>

              {/* Preferred background */}
              <div className="space-y-2">
                <Label
                  htmlFor="preferredBackground"
                  className="text-base font-medium text-start block"
                >
                  {t("opportunityForm.preferredBackground")}
                </Label>
                <Input
                  id="preferredBackground"
                  name="preferredBackground"
                  value={formData.preferredBackground}
                  onChange={handleChange}
                  placeholder={t("opportunityForm.preferredBackgroundPlaceholder")}
                />
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-base font-medium text-start block">
                  {t("opportunityForm.deadline")}
                </Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="text-start"
                />
              </div>

              {/* Paid */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-start block">
                  {t("opportunityForm.isPaid")} <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.isPaid}
                  onValueChange={(value) => handleSelectChange("isPaid", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("form.selectOption")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">{t("opportunityForm.paid.yes")}</SelectItem>
                    <SelectItem value="no">{t("opportunityForm.paid.no")}</SelectItem>
                    <SelectItem value="stipend">{t("opportunityForm.paid.stipend")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Study website */}
              <div className="space-y-2">
                <Label htmlFor="studyWebsite" className="text-base font-medium text-start block">
                  {t("opportunityForm.studyWebsite")}
                </Label>
                <Input
                  id="studyWebsite"
                  name="studyWebsite"
                  value={formData.studyWebsite}
                  onChange={handleChange}
                  placeholder={t("opportunityForm.studyWebsitePlaceholder")}
                />
              </div>

              <p className="text-sm text-muted-foreground">
                {isAr
                  ? "يراجع فريق شمس كل فرصة قبل نشرها على الموقع."
                  : "The SHAMS team reviews every opportunity before it is published on the site."}
              </p>

              <Button
                type="submit"
                disabled={saving}
                className="w-full bg-healthTeal hover:bg-healthTeal/90 text-white py-3 text-lg min-h-[44px]"
              >
                {saving
                  ? isAr
                    ? "جارٍ الإرسال..."
                    : "Submitting..."
                  : t("opportunityForm.submit")}
              </Button>
            </form>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default PostOpportunityForm;
