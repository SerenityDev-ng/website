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
import { Upload, FileUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function EmploymentForm() {
  const [referenceCount, setReferenceCount] = useState(1);

  const addReference = () => {
    setReferenceCount((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Employment Application</CardTitle>
          <CardDescription>
            Fill the form below accurately, indicating your potentials and
            suitability to job applying for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-8">
            {/* Name Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                Name <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input placeholder="First Name" required />
                  <Label className="text-xs text-muted-foreground">
                    First Name
                  </Label>
                </div>
                <div className="space-y-2">
                  <Input placeholder="Last Name" required />
                  <Label className="text-xs text-muted-foreground">
                    Last Name
                  </Label>
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                Phone Number <span className="text-red-500">*</span>
              </h3>
              <Input placeholder="(000) 000-0000" required />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Email</h3>
              <Input type="email" placeholder="ex: myname@example.com" />
              <p className="text-xs text-muted-foreground">
                example@example.com
              </p>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                Address <span className="text-red-500">*</span>
              </h3>
              <Input placeholder="Street Address" required />
              <Label className="text-xs text-muted-foreground">
                Street Address
              </Label>

              <Input placeholder="Street Address Line 2" />
              <Label className="text-xs text-muted-foreground">
                Street Address Line 2
              </Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input placeholder="City" required />
                  <Label className="text-xs text-muted-foreground">City</Label>
                </div>
                <div className="space-y-2">
                  <Input placeholder="State / Province" required />
                  <Label className="text-xs text-muted-foreground">
                    State / Province
                  </Label>
                </div>
              </div>
            </div>

            {/* Referral */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                How were you referred to us?{" "}
                <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="referral" />
                  <label
                    htmlFor="referral"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Referral
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="instagram" />
                  <label
                    htmlFor="instagram"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Instagram
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="facebook" />
                  <label
                    htmlFor="facebook"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Facebook
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="twitter" />
                  <label
                    htmlFor="twitter"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Twitter
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="linkedin" />
                  <label
                    htmlFor="linkedin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    LinkedIn
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="other" />
                  <label
                    htmlFor="other"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Other (please specify)
                  </label>
                </div>
                <Input
                  placeholder="Please specify"
                  className="col-span-1 sm:col-span-2"
                />
              </div>
            </div>

            {/* Resume Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Resume and Files</h3>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center space-y-2">
                <div className="bg-primary-50 p-2 rounded-full">
                  <FileUp className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium">Upload a File</h4>
                <p className="text-sm text-muted-foreground text-center">
                  Drag and drop files here
                </p>
                <Button variant="outline" className="mt-2">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                Cover Letter <span className="text-red-500">*</span>
              </h3>
              <Textarea
                placeholder="Write your cover letter here..."
                className="min-h-[200px]"
                required
              />
            </div>

            {/* References */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  References <span className="text-red-500">*</span>
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addReference}
                  className="text-sm"
                >
                  Add Reference
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                At least one reference is required
              </p>

              {Array.from({ length: referenceCount }).map((_, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <h4 className="font-medium">Reference {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`ref-name-${index}`}>
                        Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`ref-name-${index}`}
                        placeholder="Full Name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`ref-title-${index}`}>
                        Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`ref-title-${index}`}
                        placeholder="Job Title"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`ref-email-${index}`}>
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`ref-email-${index}`}
                        type="email"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`ref-phone-${index}`}>
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`ref-phone-${index}`}
                        placeholder="Phone Number"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ref-relationship-${index}`}>
                      Relationship <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`ref-relationship-${index}`}
                      placeholder="e.g. Manager, Colleague, etc."
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Training and Certifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Training and Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="certification-title">Title</Label>
                  <Input
                    id="certification-title"
                    placeholder="Certification Title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certification-date">Date</Label>
                  <Input id="certification-date" type="date" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
