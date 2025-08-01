
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UserCheck, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DOMPurify from "dompurify";

const PhysicianApplicationForm = () => {
  const { toast } = useToast();
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
          title: "Invalid input",
          description: `Please check the ${field.replace(/([A-Z])/g, " $1").toLowerCase()} field.`,
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
        title: "Submitting your application...",
        description: "Please wait while we process your submission.",
      });
      await fetch(
        "https://script.google.com/macros/s/AKfycbxmJPoaFGLDM0oSIgN-prop6IHaZm3_qQ7Y3jDHEk7pIFoKYpu_2G65qKrvClpj9McVWw/exec",
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
        title: "Application Submitted!",
        description:
          "Thank you for your application. We will review it and contact you soon.",
      });
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Try again later.",
        variant: "destructive",
      });
    }
    
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-healthTeal mb-4" />
          <h2 className="text-2xl font-bold text-healthDarkBlue mb-3 text-center">Thank you for submitting your application!</h2>
          <p className="text-lg text-gray-700 text-center mb-6">We will review your application and contact you within 5-7 business days.</p>
          <Button onClick={() => setSubmitted(false)} className="bg-healthTeal hover:bg-healthTeal/80 text-white px-6 py-2 text-base w-full sm:w-auto">
            Submit Another Application
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
          Join Our Physician Network
        </CardTitle>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Help us provide culturally competent healthcare to Middle Eastern communities
        </p>
      </CardHeader>
      <CardContent className="p-4 md:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Name Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  First Name *
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
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Last Name *
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                Email *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
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
              Sign up for news and updates
            </label>
          </div>

          {/* Medical Specialty */}
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Medical Specialty *
            </label>
            <Select
              value={formData.specialty}
              onValueChange={(value) => handleInputChange("specialty", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="family-medicine">Family Medicine</SelectItem>
                <SelectItem value="internal-medicine">Internal Medicine</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="endocrinology">Endocrinology</SelectItem>
                <SelectItem value="psychiatry">Psychiatry</SelectItem>
                <SelectItem value="psychology">Psychology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                <SelectItem value="obstetrics-gynecology">Obstetrics & Gynecology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
                <SelectItem value="orthopedic-surgery">Orthopedic Surgery</SelectItem>
                <SelectItem value="general-surgery">General Surgery</SelectItem>
                <SelectItem value="emergency-medicine">Emergency Medicine</SelectItem>
                <SelectItem value="radiology">Radiology</SelectItem>
                <SelectItem value="anesthesiology">Anesthesiology</SelectItem>
                <SelectItem value="oncology">Oncology</SelectItem>
                <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                <SelectItem value="pulmonology">Pulmonology</SelectItem>
                <SelectItem value="nephrology">Nephrology</SelectItem>
                <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                <SelectItem value="otolaryngology">Otolaryngology (ENT)</SelectItem>
                <SelectItem value="urology">Urology</SelectItem>
                <SelectItem value="pathology">Pathology</SelectItem>
                <SelectItem value="physical-medicine">Physical Medicine & Rehabilitation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hospital/Clinic Affiliation */}
          <div>
            <label htmlFor="hospitalAffiliation" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Hospital/Clinic Affiliation *
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
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Years of Experience *
            </label>
            <Select
              value={formData.experience}
              onValueChange={(value) => handleInputChange("experience", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="11-15">11-15 years</SelectItem>
                <SelectItem value="15+">15+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Languages Spoken */}
          <div>
            <label htmlFor="languagesSpoken" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Languages Spoken (besides English) *
            </label>
            <Input
              id="languagesSpoken"
              name="languagesSpoken"
              value={formData.languagesSpoken}
              onChange={handleChange}
              placeholder="e.g., Arabic, Persian, Kurdish, Turkish"
              required
              className="w-full"
            />
          </div>

          {/* Cultural Background */}
          <div>
            <label htmlFor="culturalBackground" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Cultural Background and Experience with Middle Eastern Communities
            </label>
            <Textarea
              id="culturalBackground"
              name="culturalBackground"
              value={formData.culturalBackground}
              onChange={handleChange}
              placeholder="Please describe your cultural background and experience working with Middle Eastern communities"
              className="w-full min-h-[100px]"
            />
          </div>

          {/* Availability */}
          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Availability for SHAMS Activities *
            </label>
            <Textarea
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="Please describe your availability for webinars, community events, research etc"
              required
              className="w-full min-h-[80px]"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Please tell us about yourself and why you're interested in joining our network"
              className="w-full min-h-[100px]"
            />
          </div>

          <div className="text-center pt-4 md:pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-healthTeal hover:bg-healthTeal/80 text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg w-full sm:w-auto"
            >
              {isSubmitting ? "Submitting Application..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PhysicianApplicationForm;
