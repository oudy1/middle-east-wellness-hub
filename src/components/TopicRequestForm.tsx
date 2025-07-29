
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import DOMPurify from 'dompurify';

const TopicRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    description: ''
  });
  const { toast } = useToast();

  const validateInput = (value: string, maxLength: number = 200) => {
    return value.length <= maxLength && DOMPurify.sanitize(value.trim()) === value.trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const validations = [
      { field: 'name', value: formData.name, maxLength: 100 },
      { field: 'email', value: formData.email, maxLength: 100 },
      { field: 'topic', value: formData.topic, maxLength: 200 },
      { field: 'description', value: formData.description, maxLength: 1000 }
    ];
    
    for (const validation of validations) {
      if (validation.field !== 'description' && (!validation.value || !validateInput(validation.value, validation.maxLength))) {
        toast({
          title: "Invalid input",
          description: `Please check the ${validation.field} field.`,
          variant: "destructive"
        });
        return;
      }
      if (validation.field === 'description' && validation.value && !validateInput(validation.value, validation.maxLength)) {
        toast({
          title: "Invalid input",
          description: "Description is too long or contains invalid characters.",
          variant: "destructive"
        });
        return;
      }
    }
    
    toast({
      title: "Topic Request Submitted",
      description: "Thank you for your suggestion! We'll consider your topic for future webinars.",
    });
    
    setFormData({
      name: '',
      email: '',
      topic: '',
      description: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const maxLength = name === 'description' ? 1000 : name === 'topic' ? 200 : 100;
    
    if (value.length <= maxLength) {
      setFormData({
        ...formData,
        [name]: DOMPurify.sanitize(value)
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-healthDarkBlue">
          Request a Webinar Topic
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="topic">Proposed Topic</Label>
            <Input
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              placeholder="What health topic would you like us to cover?"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us more about why this topic is important to you and your community..."
              rows={4}
            />
          </div>
          
          <Button type="submit" className="w-full bg-healthTeal hover:bg-healthTeal/90 text-white">
            Submit Topic Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TopicRequestForm;
