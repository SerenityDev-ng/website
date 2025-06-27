"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, FileUp, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Reference {
  name: string;
  title: string;
  email: string;
  phone: string;
  relationship: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  referralSources: string[];
  otherReferral: string;
  coverLetter: string;
  references: Reference[];
  certificationTitle: string;
  certificationDate: string;
  resumeFile: File | null;
}

export default function EmploymentForm() {
  const [referenceCount, setReferenceCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    streetAddress: "",
    streetAddress2: "",
    city: "",
    state: "",
    referralSources: [],
    otherReferral: "",
    coverLetter: "",
    references: [
      { name: "", title: "", email: "", phone: "", relationship: "" },
    ],
    certificationTitle: "",
    certificationDate: "",
    resumeFile: null,
  });

  const addReference = () => {
    setReferenceCount((prev) => prev + 1);
    setFormData((prev) => ({
      ...prev,
      references: [
        ...prev.references,
        { name: "", title: "", email: "", phone: "", relationship: "" },
      ],
    }));
  };

  const removeReference = () => {
    if (referenceCount > 1) {
      setReferenceCount(referenceCount - 1);
      setFormData((prev) => ({
        ...prev,
        references: prev.references.slice(0, -1),
      }));
    }
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReferenceChange = (
    index: number,
    field: keyof Reference,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.map((ref, i) =>
        i === index ? { ...ref, [field]: value } : ref
      ),
    }));
  };

  const handleReferralSourceChange = (source: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      referralSources: checked
        ? [...prev.referralSources, source]
        : prev.referralSources.filter((s) => s !== source),
    }));
  };

  const handleResumeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setFormData((prev) => ({ ...prev, resumeFile: file }));
    toast.success("Resume uploaded successfully");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      // Validate required fields
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone
      ) {
        throw new Error("Please fill in all required fields");
      }

      if (!formData.resumeFile) {
        throw new Error("Please upload your resume");
      }

      // Validate references
      const validReferences = formData.references.filter(
        (ref) => ref.name && ref.email && ref.phone && ref.relationship
      );

      if (validReferences.length === 0) {
        throw new Error("Please provide at least one complete reference");
      }

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("phone", formData.phone);
      submitData.append("email", formData.email);
      submitData.append("streetAddress", formData.streetAddress);
      submitData.append("streetAddress2", formData.streetAddress2);
      submitData.append("city", formData.city);
      submitData.append("state", formData.state);
      submitData.append(
        "referralSources",
        JSON.stringify(formData.referralSources)
      );
      submitData.append("otherReferral", formData.otherReferral);
      submitData.append("coverLetter", formData.coverLetter);
      submitData.append("references", JSON.stringify(validReferences));
      submitData.append("certificationTitle", formData.certificationTitle);
      submitData.append("certificationDate", formData.certificationDate);
      submitData.append("resume", formData.resumeFile);

      const response = await fetch("/api/employment", {
        method: "POST",
        body: submitData,
      });

      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setSubmitStatus("success");
      setSubmitMessage(
        "Your employment application has been submitted successfully! We will review your application and contact you soon."
      );
      toast.success("Application submitted successfully!");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        streetAddress: "",
        streetAddress2: "",
        city: "",
        state: "",
        referralSources: [],
        otherReferral: "",
        coverLetter: "",
        references: [
          { name: "", title: "", email: "", phone: "", relationship: "" },
        ],
        certificationTitle: "",
        certificationDate: "",
        resumeFile: null,
      });
      setReferenceCount(1);
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setSubmitStatus("error");
      setSubmitMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600">
            We&apos;re looking for talented individuals to help us grow
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Employment Application
            </CardTitle>
            <CardDescription className="text-center">
              Please fill out all required fields to submit your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit}>
              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <p className="text-green-800">{submitMessage}</p>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800">{submitMessage}</p>
                </div>
              )}
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Input
                      id="streetAddress"
                      placeholder="123 Main Street"
                      value={formData.streetAddress}
                      onChange={(e) =>
                        handleInputChange("streetAddress", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="streetAddress2">
                      Street Address Line 2 (Optional)
                    </Label>
                    <Input
                      id="streetAddress2"
                      placeholder="Apartment, suite, etc."
                      value={formData.streetAddress2}
                      onChange={(e) =>
                        handleInputChange("streetAddress2", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="NY"
                        value={formData.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* How did you hear about us */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  How did you hear about us?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="website"
                      checked={formData.referralSources.includes("Website")}
                      onCheckedChange={(checked) =>
                        handleReferralSourceChange(
                          "Website",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="website">Website</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="social-media"
                      checked={formData.referralSources.includes(
                        "Social Media"
                      )}
                      onCheckedChange={(checked) =>
                        handleReferralSourceChange(
                          "Social Media",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="social-media">Social Media</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="referral"
                      checked={formData.referralSources.includes("Referral")}
                      onCheckedChange={(checked) =>
                        handleReferralSourceChange(
                          "Referral",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="referral">Referral</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="job-board"
                      checked={formData.referralSources.includes("Job Board")}
                      onCheckedChange={(checked) =>
                        handleReferralSourceChange(
                          "Job Board",
                          checked as boolean
                        )
                      }
                    />
                    <Label htmlFor="job-board">Job Board</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="other"
                      checked={formData.referralSources.includes("Other")}
                      onCheckedChange={(checked) =>
                        handleReferralSourceChange("Other", checked as boolean)
                      }
                    />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </div>
                {formData.referralSources.includes("Other") && (
                  <div className="space-y-2">
                    <Label htmlFor="other-specify">Please specify:</Label>
                    <Input
                      id="other-specify"
                      placeholder="Please specify..."
                      value={formData.otherReferral}
                      onChange={(e) =>
                        handleInputChange("otherReferral", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>

              {/* Resume Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Resume Upload *
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        {formData.resumeFile
                          ? formData.resumeFile.name
                          : "Click to upload your resume"}
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        PDF, DOC, or DOCX (max 5MB)
                      </span>
                    </label>
                    <input
                      id="resume-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleResumeUpload}
                      required
                    />
                  </div>
                  {formData.resumeFile && (
                    <div className="mt-2 text-sm text-green-600">
                      ✓ Resume uploaded successfully
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Letter */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Cover Letter
                </h3>
                <Textarea
                  placeholder="Tell us about yourself and why you're interested in this position..."
                  className="min-h-[120px]"
                  value={formData.coverLetter}
                  onChange={(e) =>
                    handleInputChange("coverLetter", e.target.value)
                  }
                />
                <p className="text-sm text-gray-600">
                  Optional: Share your motivation and relevant experience
                </p>
              </div>

              {/* References */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    References *
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addReference}
                    >
                      Add Reference
                    </Button>
                    {referenceCount > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeReference}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>

                {formData.references.map((reference, index) => (
                  <div
                    key={index}
                    className="space-y-4 p-4 border rounded-lg bg-gray-50"
                  >
                    <h4 className="font-medium text-gray-900">
                      Reference {index + 1}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`ref-name-${index}`}>Full Name *</Label>
                        <Input
                          id={`ref-name-${index}`}
                          placeholder="John Doe"
                          value={reference.name}
                          onChange={(e) =>
                            handleReferenceChange(index, "name", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`ref-title-${index}`}>Job Title</Label>
                        <Input
                          id={`ref-title-${index}`}
                          placeholder="Manager"
                          value={reference.title}
                          onChange={(e) =>
                            handleReferenceChange(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`ref-email-${index}`}>Email *</Label>
                        <Input
                          id={`ref-email-${index}`}
                          type="email"
                          placeholder="john.doe@company.com"
                          value={reference.email}
                          onChange={(e) =>
                            handleReferenceChange(
                              index,
                              "email",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`ref-phone-${index}`}>Phone *</Label>
                        <Input
                          id={`ref-phone-${index}`}
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={reference.phone}
                          onChange={(e) =>
                            handleReferenceChange(
                              index,
                              "phone",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`ref-relationship-${index}`}>
                        Relationship *
                      </Label>
                      <Input
                        id={`ref-relationship-${index}`}
                        placeholder="Former supervisor, colleague, etc."
                        value={reference.relationship}
                        onChange={(e) =>
                          handleReferenceChange(
                            index,
                            "relationship",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Training and Certifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Training and Certifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="certification-title">Title</Label>
                    <Input
                      id="certification-title"
                      placeholder="Certification Title"
                      value={formData.certificationTitle}
                      onChange={(e) =>
                        handleInputChange("certificationTitle", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certification-date">Date</Label>
                    <Input
                      id="certification-date"
                      type="date"
                      value={formData.certificationDate}
                      onChange={(e) =>
                        handleInputChange("certificationDate", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
