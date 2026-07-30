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
import { Upload } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import DOMPurify from "dompurify";

const PostOpportunityForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    form: "postOpportunity",
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
    fileData: "",
    fileName: "",
    fileType: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const toBase64 = (
    file: File,
  ): Promise<{ base64: string; type: string; name: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        const [metadata, base64] = result.split(",");
        resolve({
          base64,
          type: file.type,
          name: file.name,
        });
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const validateInput = (value: string, maxLength: number = 200) => {
    return (
      value.length <= maxLength &&
      DOMPurify.sanitize(value.trim()) === value.trim()
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "institution",
      "projectTitle",
      "projectDescription",
      "deadline",
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

    try {
      if (file) {
        const { base64, name, type } = await toBase64(file);
        formData.fileData = base64;
        formData.fileName = name;
        formData.fileType = type;
      }

      const payload = { ...formData};
          setFormData({
      form: "postOpportunity",
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
      fileData: "",
      fileName: "",
      fileType: "",
    });
    setFile(null);
        toast({
        title: t("form.submittingTitle"),
        description: t("form.submittingDesc"),
      });
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzxUiC1xIfECzNeVmuUsxJapZWHNJ0Gz5XJSMJFz0YpRKfZqQhDcUu4pZlRVrL4vXDg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      toast({
        title: t("opportunityForm.successTitle"),
        description: t("opportunityForm.successDesc"),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit:", error);
      toast({
        title: t("form.submissionFailed"),
        description: t("opportunityForm.failureDesc"),
        variant: "destructive",
      });
    }
  }


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (!selectedFile) {
      setFile(null);
      return;
    }
    if (selectedFile.size >= 10 * 1024 * 1024) {
      toast({
        title: t("form.submissionFailed"),
        description: t("opportunityForm.fileTooBigToast"),
        variant: "destructive",
      });
    }
    setFile(selectedFile);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
            {submitted ? (
        <CardContent className="flex flex-col items-center justify-center py-16">
          <h2 className="text-3xl font-bold text-healthDarkBlue mb-4 text-center">{t("opportunityForm.thankYou")}</h2>
          <p className="text-lg text-gray-700 text-center">{t("opportunityForm.backSoon")}</p>
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
          {/* Name Section */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-start block">
              {t("opportunityForm.name")} <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder={t("contact.firstName")}
                />
              </div>
              <div>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder={t("contact.lastName")}
                />
              </div>
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

          {/* Newsletter Signup */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  newsletter: checked as boolean,
                }))
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

          {/* Project Title */}
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

          {/* Project Description */}
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

          {/* Preferred Background */}
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
              {t("opportunityForm.deadline")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="text-start"
            />
          </div>

          {/* Is Paid */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-start block">
              {t("opportunityForm.isPaid")}{" "}
              <span className="text-red-500">*</span>
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
                <SelectItem value="yes">
                  {t("opportunityForm.paid.yes")}
                </SelectItem>
                <SelectItem value="no">
                  {t("opportunityForm.paid.no")}
                </SelectItem>
                <SelectItem value="stipend">
                  {t("opportunityForm.paid.stipend")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file" className="text-base font-medium text-start block">
              {t("opportunityForm.fileUpload")}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="cursor-pointer"
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            {file && file.size <= 10 * 1024 * 1024 && (
              <p className="text-sm text-green-600">{t("opportunityForm.fileSelected")}: {file.name}</p>
            )}
            {file && file.size >= 10 * 1024 * 1024 && (
              <p className="text-sm text-red-600">
                {file.name}: {t("opportunityForm.fileTooBig")}
              </p>
            )}
          </div>

          {/* Study Website */}
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

          <Button
            type="submit"
            className="w-full bg-healthTeal hover:bg-healthTeal/90 text-white py-3 text-lg"
          >
            {t("opportunityForm.submit")}
          </Button>
        </form>
      </CardContent>
      </>
      )}
    </Card>
  );
};

export default PostOpportunityForm;
