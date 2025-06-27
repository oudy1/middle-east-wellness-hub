
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
import { GraduationCap, Stethoscope, Pill, Tooth, Info } from "lucide-react";

const MentorshipBooking = () => {
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
      label: "Medical Doctor (MD)",
      description: "Guidance for medical school applications, medical training, and physician career paths",
      icon: <Stethoscope className="h-6 w-6" />
    },
    {
      value: "pharmacy",
      label: "Pharmacy",
      description: "Support for pharmacy school, pharmaceutical career development, and clinical pharmacy",
      icon: <Pill className="h-6 w-6" />
    },
    {
      value: "dentistry",
      label: "Dentistry",
      description: "Mentorship for dental school preparation and dental practice careers",
      icon: <Tooth className="h-6 w-6" />
    },
    {
      value: "general",
      label: "General Health Information",
      description: "Basic health literacy, healthcare navigation, and community health resources",
      icon: <Info className="h-6 w-6" />
    }
  ];

  const currentLevels = [
    "High School Student",
    "Undergraduate Student",
    "Graduate Student",
    "Recent Graduate",
    "Career Changer",
    "Healthcare Professional"
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
      toast.error("Please fill in all required fields");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Mentorship booking submitted:", formData);
    toast.success("Your mentorship request has been submitted! We'll be in touch soon.");
    
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
    <div className="flex flex-col min-h-screen bg-healthLightGray">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-healthDarkBlue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <GraduationCap className="h-16 w-16 text-healthTeal mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Book a Mentorship Session
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Connect with experienced professionals who understand your cultural background 
                and can guide you through your healthcare career journey.
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
                  <CardTitle className="text-healthDarkBlue">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
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
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
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
                  <CardTitle className="text-healthDarkBlue">Type of Mentorship *</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.mentorshipType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, mentorshipType: value }))}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mentorshipTypes.map((type) => (
                        <div key={type.value} className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
                          <RadioGroupItem value={type.value} id={type.value} />
                          <Label htmlFor={type.value} className="flex-grow cursor-pointer">
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
                  <CardTitle className="text-healthDarkBlue">Current Education/Career Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.currentLevel}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, currentLevel: value }))}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {currentLevels.map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <RadioGroupItem value={level} id={level} />
                          <Label htmlFor={level} className="cursor-pointer">{level}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Areas of Interest */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-healthDarkBlue">Areas of Interest</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Application Process",
                      "Interview Preparation",
                      "Research Opportunities",
                      "Clinical Experience",
                      "Networking",
                      "Work-Life Balance",
                      "Cultural Considerations",
                      "Financial Planning"
                    ].map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                        />
                        <Label htmlFor={interest} className="cursor-pointer">{interest}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Goals and Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-healthDarkBlue">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="goals">What are your main goals for this mentorship? *</Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                      placeholder="Please describe what you hope to achieve through mentorship..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability">Preferred meeting times/availability</Label>
                    <Textarea
                      id="availability"
                      value={formData.availability}
                      onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                      placeholder="e.g., Weekday evenings, weekend mornings, specific time zones..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="additionalInfo">Any additional information you'd like to share</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                      placeholder="Background, specific challenges, preferred communication style, etc."
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
                  Submit Mentorship Request
                </Button>
                <p className="text-sm text-gray-600 mt-4">
                  * Required fields. We'll review your request and match you with an appropriate mentor within 5-7 business days.
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
