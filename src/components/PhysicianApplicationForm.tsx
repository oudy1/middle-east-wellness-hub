
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UserCheck, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import DOMPurify from "dompurify";

const PhysicianApplicationForm = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    signUpForNews: false,
    phone: "",
    specialty: "",
    hospitalAffiliation: "",
    experience: "",
    languagesSpoken: "",
    culturalBackground: "",
    availability: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const specialtyOptions = [
    { value: "family-medicine", labelKey: "physicianForm.specialty.familyMedicine" },
    { value: "internal-medicine", labelKey: "physicianForm.specialty.internalMedicine" },
    { value: "cardiology", labelKey: "physicianForm.specialty.cardiology" },
    { value: "endocrinology", labelKey: "physicianForm.specialty.endocrinology" },
    { value: "psychiatry", labelKey: "physicianForm.specialty.psychiatry" },
    { value: "psychology", labelKey: "physicianForm.specialty.psychology" },
    { value: "pediatrics", labelKey: "physicianForm.specialty.pediatrics" },
    { value: "obstetrics-gynecology", labelKey: "physicianForm.specialty.obgyn" },
    { value: "neurology", labelKey: "physicianForm.specialty.neurology" },
    { value: "dermatology", labelKey: "physicianForm.specialty.dermatology" },
    { value: "orthopedic-surgery", labelKey: "physicianForm.specialty.orthopedicSurgery" },
    { value: "general-surgery", labelKey: "physicianForm.specialty.generalSurgery" },
    { value: "emergency-medicine", labelKey: "physicianForm.specialty.emergencyMedicine" },
    { value: "radiology", labelKey: "physicianForm.specialty.radiology" },
    { value: "anesthesiology", labelKey: "physicianForm.specialty.anesthesiology" },
    { value: "oncology", labelKey: "physicianForm.specialty.oncology" },
    { value: "gastroenterology", labelKey: "physicianForm.specialty.gastroenterology" },
    { value: "pulmonology", labelKey: "physicianForm.specialty.pulmonology" },
    { value: "nephrology", labelKey: "physicianForm.specialty.nephrology" },
    { value: "ophthalmology", labelKey: "physicianForm.specialty.ophthalmology" },
    { value: "otolaryngology", labelKey: "physicianForm.specialty.ent" },
    { value: "urology", labelKey: "physicianForm.specialty.urology" },
    { value: "pathology", labelKey: "physicianForm.specialty.pathology" },
    { value: "physical-medicine", labelKey: "physicianForm.specialty.physicalMedicine" },
    { value: "other", labelKey: "physicianForm.specialty.other" },
  ];

  const experienceOptions = [
    { value: "0-2", labelKey: "physicianForm.exp.0-2" },
    { value: "3-5", labelKey: "physicianForm.exp.3-5" },
    { value: "6-10", labelKey: "physicianForm.exp.6-10" },
    { value: "11-15", labelKey: "physicianForm.exp.11-15" },
    { value: "15+", labelKey: "physicianForm.exp.15plus" },
  ];

  const validateInput = (value: string, maxLength: number = 200) => {
    return (
      value.length <= maxLength &&
      DOMPurify.sanitize(value.trim()) === value.trim()
    );
  };

  const handleInputChange = (
    name: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === "string" ? DOMPurify.sanitize(value) : value,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      handleInputChange(name, checked);
    } else {
      const maxLength =
        name === "culturalBackground" ||
        name === "availability" ||
        name === "message"
          ? 1000
          : 200;
      if (value.length <= maxLength) {
        handleInputChange(name, value);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "specialty",
      "hospitalAffiliation",
      "experience",
      "languagesSpoken",
      "availability",
      "message",
    ];
    for (const field of requiredFields) {
      const value = formData[field as keyof typeof formData] as string;
      if (
        !value ||
        !validateInput(
          value,
          field === "culturalBackground" ||
            field === "availability" ||
            field === "message"
            ? 1000
            : 200
        )
      ) {
        toast({
          title: t("form.invalidInput"),
          description: t("form.invalidInputDesc"),
          variant: "destructive",
        });
        return;
      }
    }
    setIsSubmitting(true);
    try {
      const payload = { ...formData, form: "physicianApplication" };

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      signUpForNews: false,
      phone: "",
      specialty: "",
      hospitalAffiliation: "",
      experience: "",
      languagesSpoken: "",
      culturalBackground: "",
      availability: "",
      message: "",
    });
        toast({
        title: t("form.submittingTitle"),
        description: t("form.submittingDesc"),
      });
      await fetch(
        "https://script.google.com/macros/s/AKfycbzxUiC1xIfECzNeVmuUsxJapZWHNJ0Gz5XJSMJFz0YpRKfZqQhDcUu4pZlRVrL4vXDg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: t("physicianForm.successTitle"),
        description: t("physicianForm.successDesc"),
      });
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: t("form.submissionFailed"),
        description: t("physicianForm.failureDesc"),
        variant: "destructive",
      });
    }

  };

  if (submitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-healthTeal mb-4" />
          <h2 className="text-2xl font-bold text-healthDarkBlue mb-3 text-center">{t("physicianForm.thankYou")}</h2>
          <p className="text-lg text-gray-700 text-center mb-6">{t("physicianForm.reviewNote")}</p>
          <Button onClick={() => setSubmitted(false)} className="bg-healthTeal hover:bg-healthTeal/80 text-white px-6 py-2 text-base w-full sm:w-auto">
            {t("physicianForm.submitAnother")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center px-4 md:px-6">
        <div className="flex justify-center mb-3 md:mb-4">
          <UserCheck className="h-10 w-10 md:h-12 md:w-12 text-healthTeal" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-bold text-healthDarkBlue leading-tight">
          {t("physicianForm.title")}
        </CardTitle>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          {t("physicianForm.subtitle")}
        </p>
      </CardHeader>
      <CardContent className="p-4 md:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Name Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2 text-start">
                  {t("contact.firstName")} *
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2 text-start">
                  {t("contact.lastName")} *
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2 text-start">
                {t("contact.email")} *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                dir="ltr"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full text-start"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2 text-start">
                {t("form.phone")}
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                dir="ltr"
                value={formData.phone}
                onChange={handleChange}
                className="w-full text-start"
              />
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="signUpForNews"
              name="signUpForNews"
              checked={formData.signUpForNews}
              onCheckedChange={(checked) => handleInputChange("signUpForNews", checked as boolean)}
              className="h-4 w-4 text-healthTeal focus:ring-healthTeal border-gray-300 rounded"
            />
            <label htmlFor="signUpForNews" className="text-sm text-gray-700">
              {t("form.newsletter")}
            </label>
          </div>

          {/* Medical Specialty */}
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2 text-start">
              {t("physicianForm.specialty")} *
            </label>
            <Select
              value={formData.specialty}
              onValueChange={(value) => handleInputChange("specialty", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder={t("form.selectOption")} />
              </SelectTrigger>
              <SelectContent>
                {specialtyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hospital/Clinic Affiliation */}
          <div>
            <label htmlFor="hospitalAffiliation" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2 text-start">
              {t("physicianForm.hospitalAffiliation")} *
            </label>
            <Input
              id="hospitalAffiliation"
              name="hospitalAffiliation"
              value={formData.hospitalAffiliation}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          {/* Years of Experience */}
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2 text-start">
              {t("physicianForm.experience")} *
            </label>
            <Select
              value={formData.experience}
              onValueChange={(value) => handleInputChange("experience", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder={t("form.selectOption")} />
              </SelectTrigger>
              <SelectContent>
                {experienceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Languages Spoken */}
          <div>
            <label htmlFor="languagesSpoken" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2 text-start">
              {t("physicianForm.languagesSpoken")} *
            </label>
            <Input
              id="languagesSpoken"
              name="languagesSpoken"
              value={formData.languagesSpoken}
              onChange={handleChange}
              placeholder={t("physicianForm.languagesPlaceholder")}
              required
              className="w-full"
            />
          </div>

          {/* Cultural Background */}
          <div>
            <label htmlFor="culturalBackground" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2 text-start">
              {t("physicianForm.culturalBackground")}
            </label>
            <Textarea
              id="culturalBackground"
              name="culturalBackground"
              value={formData.culturalBackground}
              onChange={handleChange}
              placeholder={t("physicianForm.culturalPlaceholder")}
              className="w-full min-h-[100px]"
            />
          </div>

          {/* Availability */}
          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2 text-start">
              {t("physicianForm.availability")} *
            </label>
            <Textarea
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder={t("physicianForm.availabilityPlaceholder")}
              required
              className="w-full min-h-[80px]"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2 text-start">
              {t("physicianForm.message")} *
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder={t("physicianForm.messagePlaceholder")}
              className="w-full min-h-[100px]"
            />
          </div>

          <div className="text-center pt-4 md:pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-healthTeal hover:bg-healthTeal/80 text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg w-full sm:w-auto"
            >
              {isSubmitting ? t("physicianForm.submitting") : t("physicianForm.submit")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PhysicianApplicationForm;
