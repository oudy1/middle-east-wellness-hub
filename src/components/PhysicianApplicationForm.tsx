
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Upload, CheckCircle } from "lucide-react";

const PhysicianApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    medicalLicense: '',
    specialty: '',
    hospitalAffiliation: '',
    experience: '',
    languagesSpoken: '',
    culturalBackground: '',
    availability: '',
    motivation: '',
    references: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('Physician application submitted:', formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-healthTeal mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-healthDarkBlue">Application Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in joining our network. We will review your application and contact you within 5-7 business days.
          </p>
          <Button 
            onClick={() => setSubmitted(false)}
            className="bg-healthTeal hover:bg-healthTeal/80 text-white"
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <UserCheck className="h-12 w-12 text-healthTeal" />
        </div>
        <CardTitle className="text-3xl font-bold text-healthDarkBlue">
          Join Our Physician Network
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Help us provide culturally competent healthcare to Middle Eastern communities
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-healthDarkBlue border-b pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-healthDarkBlue border-b pb-2">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="medicalLicense" className="block text-sm font-medium text-gray-700 mb-2">
                  Medical License Number *
                </label>
                <input
                  type="text"
                  id="medicalLicense"
                  name="medicalLicense"
                  value={formData.medicalLicense}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Specialty *
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
                >
                  <option value="">Select Specialty</option>
                  <option value="family-medicine">Family Medicine</option>
                  <option value="internal-medicine">Internal Medicine</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="endocrinology">Endocrinology</option>
                  <option value="psychiatry">Psychiatry</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="obstetrics-gynecology">Obstetrics & Gynecology</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="hospitalAffiliation" className="block text-sm font-medium text-gray-700 mb-2">
                Hospital/Clinic Affiliation *
              </label>
              <input
                type="text"
                id="hospitalAffiliation"
                name="hospitalAffiliation"
                value={formData.hospitalAffiliation}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience *
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
              >
                <option value="">Select Experience</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="11-15">11-15 years</option>
                <option value="15+">15+ years</option>
              </select>
            </div>
          </div>

          {/* Cultural Competency */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-healthDarkBlue border-b pb-2">Cultural Competency</h3>
            <div>
              <label htmlFor="languagesSpoken" className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="culturalBackground" className="block text-sm font-medium text-gray-700 mb-2">
                Cultural Background & Experience with Middle Eastern Communities
              </label>
              <textarea
                id="culturalBackground"
                name="culturalBackground"
                rows={4}
                value={formData.culturalBackground}
                onChange={handleChange}
                placeholder="Please describe your cultural background and experience working with Middle Eastern communities"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent resize-vertical"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-healthDarkBlue border-b pb-2">Additional Information</h3>
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                Availability for SHAMS Activities
              </label>
              <textarea
                id="availability"
                name="availability"
                rows={3}
                value={formData.availability}
                onChange={handleChange}
                placeholder="Please describe your availability for webinars, community events, research collaboration, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent resize-vertical"
              />
            </div>
            
            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                Why do you want to join SHAMS? *
              </label>
              <textarea
                id="motivation"
                name="motivation"
                rows={4}
                value={formData.motivation}
                onChange={handleChange}
                required
                placeholder="Please explain your motivation for joining our network and how you can contribute to our mission"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent resize-vertical"
              />
            </div>
            
            <div>
              <label htmlFor="references" className="block text-sm font-medium text-gray-700 mb-2">
                Professional References
              </label>
              <textarea
                id="references"
                name="references"
                rows={3}
                value={formData.references}
                onChange={handleChange}
                placeholder="Please provide 2-3 professional references (name, title, contact information)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healthTeal focus:border-transparent resize-vertical"
              />
            </div>
          </div>

          <div className="text-center pt-6">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-healthTeal hover:bg-healthTeal/80 text-white px-8 py-3 text-lg"
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
