
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DOMPurify from 'dompurify';

const PhysicianApplicationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    signUpForNews: false,
    phone: '',
    specialty: '',
    hospitalAffiliation: '',
    experience: '',
    languagesSpoken: '',
    culturalBackground: '',
    availability: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateInput = (value: string, maxLength: number = 200) => {
    return value.length <= maxLength && DOMPurify.sanitize(value.trim()) === value.trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      const maxLength = name === 'culturalBackground' || name === 'availability' || name === 'message' ? 1000 : 200;
      if (value.length <= maxLength) {
        setFormData({
          ...formData,
          [name]: DOMPurify.sanitize(value)
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'specialty', 'hospitalAffiliation', 'experience', 'languagesSpoken', 'availability', 'message'];
    for (const field of requiredFields) {
      const value = formData[field as keyof typeof formData] as string;
      if (!value || !validateInput(value, field.includes('Background') || field.includes('availability') || field === 'message' ? 1000 : 200)) {
        toast({
          title: "Invalid input",
          description: `Please check the ${field} field.`,
          variant: "destructive"
        });
        return;
      }
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Application submitted!",
        description: "Thank you for your application. We will review it and contact you soon."
      });
    }, 2000);
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 md:p-8 text-center">
          <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-healthTeal mx-auto mb-3 md:mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-healthDarkBlue leading-tight">Application Submitted Successfully!</h2>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm sm:text-base leading-relaxed">
            Thank you for your interest in joining our network. We will review your application and contact you within 5-7 business days.
          </p>
          <Button 
            onClick={() => setSubmitted(false)}
            className="bg-healthTeal hover:bg-healthTeal/80 text-white px-6 py-2 text-sm sm:text-base w-full sm:w-auto"
          >
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
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
            />
          </div>

          {/* Newsletter Signup */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="signUpForNews"
              name="signUpForNews"
              checked={formData.signUpForNews}
              onChange={handleChange}
              className="h-4 w-4 text-healthTeal focus:ring-healthTeal border-gray-300 rounded"
            />
            <label htmlFor="signUpForNews" className="text-sm text-gray-700">
              Sign up for news and updates
            </label>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
            />
          </div>

          {/* Medical Specialty */}
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Medical Specialty *
            </label>
            <select
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
            >
              <option value="">Select an option</option>
              <option value="family-medicine">Family Medicine</option>
              <option value="internal-medicine">Internal Medicine</option>
              <option value="cardiology">Cardiology</option>
              <option value="endocrinology">Endocrinology</option>
              <option value="psychiatry">Psychiatry</option>
              <option value="psychology">Psychology</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="obstetrics-gynecology">Obstetrics & Gynecology</option>
              <option value="neurology">Neurology</option>
              <option value="dermatology">Dermatology</option>
              <option value="orthopedic-surgery">Orthopedic Surgery</option>
              <option value="general-surgery">General Surgery</option>
              <option value="emergency-medicine">Emergency Medicine</option>
              <option value="radiology">Radiology</option>
              <option value="anesthesiology">Anesthesiology</option>
              <option value="oncology">Oncology</option>
              <option value="gastroenterology">Gastroenterology</option>
              <option value="pulmonology">Pulmonology</option>
              <option value="nephrology">Nephrology</option>
              <option value="ophthalmology">Ophthalmology</option>
              <option value="otolaryngology">Otolaryngology (ENT)</option>
              <option value="urology">Urology</option>
              <option value="pathology">Pathology</option>
              <option value="physical-medicine">Physical Medicine & Rehabilitation</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Hospital/Clinic Affiliation */}
          <div>
            <label htmlFor="hospitalAffiliation" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Hospital/Clinic Affiliation *
            </label>
            <input
              type="text"
              id="hospitalAffiliation"
              name="hospitalAffiliation"
              value={formData.hospitalAffiliation}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
            />
          </div>
          
          {/* Years of Experience */}
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Years of Experience *
            </label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
            >
              <option value="">Select an option</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="11-15">11-15 years</option>
              <option value="15+">15+ years</option>
            </select>
          </div>

          {/* Languages Spoken */}
          <div>
            <label htmlFor="languagesSpoken" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Languages Spoken (besides English) *
            </label>
            <input
              type="text"
              id="languagesSpoken"
              name="languagesSpoken"
              value={formData.languagesSpoken}
              onChange={handleChange}
              placeholder="e.g., Arabic, Persian, Kurdish, Turkish"
              required
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
            />
          </div>
          
          {/* Cultural Background */}
          <div>
            <label htmlFor="culturalBackground" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Cultural Background and Experience with Middle Eastern Communities
            </label>
            <textarea
              id="culturalBackground"
              name="culturalBackground"
              rows={4}
              value={formData.culturalBackground}
              onChange={handleChange}
              placeholder="Please describe your cultural background and experience working with Middle Eastern communities"
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent resize-vertical"
            />
          </div>

          {/* Availability */}
          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Availability for SHAMS Activities *
            </label>
            <textarea
              id="availability"
              name="availability"
              rows={3}
              value={formData.availability}
              onChange={handleChange}
              placeholder="Please describe your availability for webinars, community events, research etc"
              required
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent resize-vertical"
            />
          </div>
          
          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Please tell us about yourself and why you're interested in joining our network"
              className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent resize-vertical"
            />
          </div>

          <div className="text-center pt-4 md:pt-6">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-healthTeal hover:bg-healthTeal/80 text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg w-full sm:w-auto"
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PhysicianApplicationForm;
