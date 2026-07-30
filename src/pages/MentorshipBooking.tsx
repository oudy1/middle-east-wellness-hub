import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { GraduationCap, Stethoscope, Pill, Smile, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const MentorshipBooking = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    mentorshipType: "",
    currentLevel: "",
    interests: [] as string[],
    goals: "",
    availability: "",
    additionalInfo: ""
  });

  const mentorshipTypes = [
    {
      value: "md",
      label: t("mentorshipBooking.type.md.label"),
      description: t("mentorshipBooking.type.md.desc"),
      icon: <Stethoscope className="h-6 w-6" />
    },
    {
      value: "pharmacy",
      label: t("mentorshipBooking.type.pharmacy.label"),
      description: t("mentorshipBooking.type.pharmacy.desc"),
      icon: <Pill className="h-6 w-6" />
    },
    {
      value: "dentistry",
      label: t("mentorshipBooking.type.dentistry.label"),
      description: t("mentorshipBooking.type.dentistry.desc"),
      icon: <Smile className="h-6 w-6" />
    },
    {
      value: "general",
      label: t("mentorshipBooking.type.general.label"),
      description: t("mentorshipBooking.type.general.desc"),
      icon: <Info className="h-6 w-6" />
    }
  ];

  const currentLevels = [
    { value: "High School Student", labelKey: "mentorshipBooking.level.highSchool" },
    { value: "Undergraduate Student", labelKey: "mentorshipBooking.level.undergraduate" },
    { value: "Graduate Student", labelKey: "mentorshipBooking.level.graduate" },
    { value: "Recent Graduate", labelKey: "mentorshipBooking.level.recentGraduate" },
    { value: "Career Changer", labelKey: "mentorshipBooking.level.careerChanger" },
    { value: "Healthcare Professional", labelKey: "mentorshipBooking.level.healthcareProfessional" }
  ];

  const interestOptions = [
    { value: "Application Process", labelKey: "mentorshipBooking.interest.applicationProcess" },
    { value: "Interview Preparation", labelKey: "mentorshipBooking.interest.interviewPrep" },
    { value: "Research Opportunities", labelKey: "mentorshipBooking.interest.researchOpportunities" },
    { value: "Clinical Experience", labelKey: "mentorshipBooking.interest.clinicalExperience" },
    { value: "Networking", labelKey: "mentorshipBooking.interest.networking" },
    { value: "Work-Life Balance", labelKey: "mentorshipBooking.interest.workLifeBalance" },
    { value: "Cultural Considerations", labelKey: "mentorshipBooking.interest.culturalConsiderations" },
    { value: "Financial Planning", labelKey: "mentorshipBooking.interest.financialPlanning" }
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i !== interest)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.mentorshipType) {
      toast.error(t("form.requiredFieldsError"));
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Mentorship booking submitted:", formData);
    toast.success(t("mentorshipBooking.successToast"));

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      mentorshipType: "",
      currentLevel: "",
      interests: [],
      goals: "",
      availability: "",
      additionalInfo: ""
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section className="bg-healthDarkBlue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <GraduationCap className="h-16 w-16 text-healthTealLight mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t("mentorshipBooking.heroTitle")}
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                {t("mentorshipBooking.heroSubtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-healthDarkBlue text-start">{t("mentorshipBooking.personalInfo")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">{t("contact.firstName")} *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">{t("contact.lastName")} *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">{t("contact.email")} *</Label>
                      <Input
                        id="email"
                        type="email"
                        dir="ltr"
                        className="text-start"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t("form.phone")}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        dir="ltr"
                        className="text-start"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mentorship Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-healthDarkBlue text-start">{t("mentorshipBooking.typeTitle")} *</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.mentorshipType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, mentorshipType: value }))}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mentorshipTypes.map((type) => (
                        <div key={type.value} className="flex items-start gap-3 border rounded-lg p-4 hover:bg-gray-50">
                          <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                          <Label htmlFor={type.value} className="flex-grow cursor-pointer text-start">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="text-healthTeal">
                                {type.icon}
                              </div>
                              <span className="font-semibold">{type.label}</span>
                            </div>
                            <p className="text-sm text-gray-600">{type.description}</p>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Current Level */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-healthDarkBlue text-start">{t("mentorshipBooking.currentLevel")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.currentLevel}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, currentLevel: value }))}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {currentLevels.map((level) => (
                        <div key={level.value} className="flex items-center gap-2">
                          <RadioGroupItem value={level.value} id={level.value} />
                          <Label htmlFor={level.value} className="cursor-pointer text-start">{t(level.labelKey)}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Areas of Interest */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-healthDarkBlue text-start">{t("mentorshipBooking.interestsTitle")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {interestOptions.map((interest) => (
                      <div key={interest.value} className="flex items-center gap-2">
                        <Checkbox
                          id={interest.value}
                          checked={formData.interests.includes(interest.value)}
                          onCheckedChange={(checked) => handleInterestChange(interest.value, checked as boolean)}
                        />
                        <Label htmlFor={interest.value} className="cursor-pointer text-start">{t(interest.labelKey)}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Goals and Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-healthDarkBlue text-start">{t("mentorshipBooking.additionalInfoTitle")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="goals">{t("mentorshipBooking.goals")} *</Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                      placeholder={t("mentorshipBooking.goalsPlaceholder")}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability">{t("mentorshipBooking.availability")}</Label>
                    <Textarea
                      id="availability"
                      value={formData.availability}
                      onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                      placeholder={t("mentorshipBooking.availabilityPlaceholder")}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="additionalInfo">{t("mentorshipBooking.additionalField")}</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                      placeholder={t("mentorshipBooking.additionalPlaceholder")}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-healthTeal hover:bg-healthTeal/90 text-white px-8 py-3 text-lg"
                >
                  {t("mentorshipBooking.submit")}
                </Button>
                <p className="text-sm text-gray-600 mt-4">
                  {t("mentorshipBooking.requiredNote")}
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MentorshipBooking;
