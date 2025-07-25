import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const PostOpportunityForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    newsletter: false,
    phone: '',
    institution: '',
    projectTitle: '',
    projectDescription: '',
    preferredBackground: '',
    deadline: '',
    isPaid: '',
    studyWebsite: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Research opportunity submitted:', formData);
    if (file) {
      console.log('File uploaded:', file.name);
    }
    toast({
      title: "Research Opportunity Submitted",
      description: "Thank you for sharing your research opportunity! We'll review it and connect you with interested students.",
    });
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      newsletter: false,
      phone: '',
      institution: '',
      projectTitle: '',
      projectDescription: '',
      preferredBackground: '',
      deadline: '',
      isPaid: '',
      studyWebsite: ''
    });
    setFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-healthDarkBlue">
          Share a Research Opportunity
        </CardTitle>
        <p className="text-center text-gray-600 mt-4">
          Are you a researcher looking to recruit students? Submit your research opportunity and connect with motivated Arab and Middle Eastern students across Canada who are eager to get involved.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Section */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Name <span className="text-red-500">*</span></Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                />
              </div>
              <div>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          {/* Newsletter Signup */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, newsletter: checked as boolean }))
              }
            />
            <Label htmlFor="newsletter" className="text-sm">
              Sign up for news and updates
            </Label>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-medium">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
            />
          </div>

          {/* Institution */}
          <div className="space-y-2">
            <Label htmlFor="institution" className="text-base font-medium">
              Institution / Affiliation <span className="text-red-500">*</span>
            </Label>
            <Input
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
              placeholder="University, hospital, or research center"
            />
          </div>

          {/* Project Title */}
          <div className="space-y-2">
            <Label htmlFor="projectTitle" className="text-base font-medium">
              Project Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="projectTitle"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              required
              placeholder="Title of your research project"
            />
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label htmlFor="projectDescription" className="text-base font-medium">
              Project Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              required
              placeholder="A short paragraph about the project and goals"
              rows={4}
            />
          </div>

          {/* Preferred Background */}
          <div className="space-y-2">
            <Label htmlFor="preferredBackground" className="text-base font-medium">
              Preferred Background
            </Label>
            <Input
              id="preferredBackground"
              name="preferredBackground"
              value={formData.preferredBackground}
              onChange={handleChange}
              placeholder='e.g., "Public Health, Psychology, Arabic-speaking preferred"'
            />
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-base font-medium">
              Deadline to Apply <span className="text-red-500">*</span>
            </Label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>

          {/* Is Paid */}
          <div className="space-y-2">
            <Label className="text-base font-medium">
              Is this a paid opportunity? <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.isPaid} 
              onValueChange={(value) => handleSelectChange('isPaid', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes, this is a paid opportunity</SelectItem>
                <SelectItem value="no">No, this is an unpaid/volunteer opportunity</SelectItem>
                <SelectItem value="stipend">Stipend/partial compensation provided</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file" className="text-base font-medium">
              Upload a Flyer or PDF
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="cursor-pointer"
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            {file && (
              <p className="text-sm text-green-600">
                Selected: {file.name}
              </p>
            )}
          </div>

          {/* Study Website */}
          <div className="space-y-2">
            <Label htmlFor="studyWebsite" className="text-base font-medium">
              Study website
            </Label>
            <Input
              id="studyWebsite"
              name="studyWebsite"
              type="url"
              value={formData.studyWebsite}
              onChange={handleChange}
              placeholder="Link the study website if available"
            />
          </div>

          <Button type="submit" className="w-full bg-healthTeal hover:bg-healthTeal/90 text-white py-3 text-lg">
            Submit Research Opportunity
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostOpportunityForm;