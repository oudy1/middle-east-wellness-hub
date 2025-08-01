import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Users, Heart, Mail, Phone, User, Briefcase, MessageCircle } from "lucide-react";

const JoinUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profession: '',
    experience: '',
    interests: [] as string[],
    motivation: '',
    availability: '',
    skills: '',
    languagesSpoken: '',
    previousVolunteer: '',
    references: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const validateInput = (value: string, maxLength: number = 200) => {
    return (
      value.length <= maxLength &&
      value.trim() === value.trim()
    );
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof value === "string" ? value : value,
    }));
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, interest]
        : prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "motivation"];
    for (const field of requiredFields) {
      const value = formData[field as keyof typeof formData] as string;
      if (!value || !validateInput(value, field === "motivation" ? 1000 : 200)) {
        toast({
          title: "Invalid input",
          description: `Please check the ${field.replace(/([A-Z])/g, " $1").toLowerCase()} field.`,
          variant: "destructive",
        });
        return;
      }
    }
    try {
      const payload = { ...formData, form: "joinUs" };
          setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        profession: "",
        experience: "",
        interests: [],
        motivation: "",
        availability: "",
        skills: "",
        languagesSpoken: "",
        previousVolunteer: "",
        references: "",
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
      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description:
          "Thank you for your interest in joining our team. We'll review your application and get back to you soon.",
      });
      // Reset form
  
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Try again later.",
        variant: "destructive",
      });
    }
  };

  const interestAreas = [
    "Healthcare Advocacy",
    "Community Outreach",
    "Event Planning",
    "Translation Services",
    "Mental Health Support",
    "Educational Programs",
    "Research and Data",
    "Digital Marketing",
    "Grant Writing",
    "Legal Support"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-healthDarkBlue text-white py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <Users className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Join Our Mission
            </h1>
            <p className="text-lg sm:text-xl mb-6 md:mb-8 max-w-3xl mx-auto px-2 leading-relaxed">
              Help us improve healthcare access and advocacy for Middle Eastern communities. 
              Together, we can create meaningful change and build a more inclusive healthcare system.
            </p>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-healthDarkBlue flex items-center justify-center gap-2">
                    <Heart className="h-6 w-6 text-healthTeal" />
                    Volunteer Application Form
                  </CardTitle>
                  <p className="text-gray-600">
                    Tell us about yourself and how you'd like to contribute to our mission
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {submitted ? (
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <h2 className="text-2xl font-bold text-healthDarkBlue mb-3 text-center">Thank you for submitting your application!</h2>
                      <p className="text-lg text-gray-700 text-center mb-6">We will review your application and contact you within 2-3 business days.</p>
                      <Button onClick={() => setSubmitted(false)} className="bg-healthTeal hover:bg-healthTeal/80 text-white px-6 py-2 text-base w-full sm:w-auto">
                        Submit Another Application
                      </Button>
                    </CardContent>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-healthDarkBlue flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                              First Name *
                            </label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange("firstName", e.target.value)}
                              required
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                              Last Name *
                            </label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange("lastName", e.target.value)}
                              required
                              className="w-full"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              required
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className="w-full"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="languagesSpoken" className="block text-sm font-medium text-gray-700 mb-2">
                            Languages Spoken
                          </label>
                          <Input
                            id="languagesSpoken"
                            value={formData.languagesSpoken}
                            onChange={(e) => handleInputChange("languagesSpoken", e.target.value)}
                            placeholder="e.g., English, Arabic, Farsi, Kurdish..."
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Professional Background */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-healthDarkBlue flex items-center gap-2">
                          <Briefcase className="h-5 w-5" />
                          Professional Background
                        </h3>

                        <div>
                          <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
                            Current Profession/Field of Study
                          </label>
                          <Input
                            id="profession"
                            value={formData.profession}
                            onChange={(e) => handleInputChange("profession", e.target.value)}
                            placeholder="e.g., Healthcare, Education, Law, Student..."
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                            Relevant Experience
                          </label>
                          <Textarea
                            id="experience"
                            value={formData.experience}
                            onChange={(e) => handleInputChange("experience", e.target.value)}
                            placeholder="Describe any relevant professional or volunteer experience..."
                            className="w-full min-h-[100px]"
                          />
                        </div>

                        <div>
                          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                            Special Skills or Expertise
                          </label>
                          <Textarea
                            id="skills"
                            value={formData.skills}
                            onChange={(e) => handleInputChange("skills", e.target.value)}
                            placeholder="e.g., Medical knowledge, Legal expertise, Public speaking, Social media, Design..."
                            className="w-full min-h-[80px]"
                          />
                        </div>
                      </div>

                      {/* Areas of Interest */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-healthDarkBlue">
                          Areas of Interest
                        </h3>
                        <p className="text-sm text-gray-600">
                          Select all areas where you'd like to contribute (check all that apply):
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {interestAreas.map((interest) => (
                            <div key={interest} className="flex items-center space-x-2">
                              <Checkbox
                                id={interest}
                                checked={formData.interests.includes(interest)}
                                onCheckedChange={(checked) =>
                                  handleInterestChange(interest, checked as boolean)
                                }
                              />
                              <label
                                htmlFor={interest}
                                className="text-sm text-gray-700 cursor-pointer"
                              >
                                {interest}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Motivation and Availability */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-healthDarkBlue flex items-center gap-2">
                          <MessageCircle className="h-5 w-5" />
                          Tell Us More
                        </h3>

                        <div>
                          <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                            Why do you want to join our organization? *
                          </label>
                          <Textarea
                            id="motivation"
                            value={formData.motivation}
                            onChange={(e) => handleInputChange("motivation", e.target.value)}
                            placeholder="Share your motivation for wanting to help Middle Eastern communities and improve healthcare access..."
                            className="w-full min-h-[120px]"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                            Availability and Time Commitment
                          </label>
                          <Textarea
                            id="availability"
                            value={formData.availability}
                            onChange={(e) => handleInputChange("availability", e.target.value)}
                            placeholder="How much time can you commit? What days/times work best for you?"
                            className="w-full min-h-[80px]"
                          />
                        </div>

                        <div>
                          <label htmlFor="previousVolunteer" className="block text-sm font-medium text-gray-700 mb-2">
                            Previous Volunteer Experience
                          </label>
                          <Textarea
                            id="previousVolunteer"
                            value={formData.previousVolunteer}
                            onChange={(e) => handleInputChange("previousVolunteer", e.target.value)}
                            placeholder="Describe any previous volunteer work or community involvement..."
                            className="w-full min-h-[80px]"
                          />
                        </div>

                        <div>
                          <label htmlFor="references" className="block text-sm font-medium text-gray-700 mb-2">
                            References (Optional)
                          </label>
                          <Textarea
                            id="references"
                            value={formData.references}
                            onChange={(e) => handleInputChange("references", e.target.value)}
                            placeholder="Please provide contact information for 1-2 references who can speak to your character and abilities..."
                            className="w-full min-h-[80px]"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="text-center pt-6">
                        <Button
                          type="submit"
                          className="bg-healthTeal hover:bg-healthTeal/90 text-white px-8 py-3 text-lg"
                        >
                          Submit Application
                        </Button>
                        <p className="text-sm text-gray-600 mt-4">
                          Thank you for your interest in joining our team. We'll review your application and contact you within 2-3 business days.
                        </p>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JoinUs;