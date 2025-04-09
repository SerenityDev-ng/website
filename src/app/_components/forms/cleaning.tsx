"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CleaningServiceEmail from "./cleaning-mail";
import { render } from "@react-email/render";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/hooks/store/user";
import { VideoUpload } from "@/components/global/video-upload";

type CleaningServiceFormProps = {
  frequency: string;
  total: number;
  buildingType: "flat" | "duplex";
  cleaningHouse: "detailed" | "deep";
  cleaningType: string;
  time: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CleaningServiceForm({
  frequency,
  total,
  buildingType,
  cleaningType,
  cleaningHouse,
  time,
  setOpen,
}: CleaningServiceFormProps) {
  const user = useAuthStore((store) => store.user);
  const [loading, setLoading] = useState(false);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    email: user ? user?.user.email : "",
    name: user ? `${user?.user?.first_name} ${user?.user?.last_name}` : "",
    location: user ? user?.profile?.address?.address : "",
    house: buildingType,
    serviceType: "cleaning",
    cleaningType:
      cleaningType === "Housekeeping" ||
      cleaningType === "Pool Cleaning" ||
      cleaningType === "Deep Cleaning"
        ? cleaningHouse === "detailed"
          ? "Detailed cleaning"
          : "Deep cleaning"
        : cleaningType,
    cleaningHouse,
    laundryType: "",
    price: total,
    frequency,
    time,
    phone: "",
    videoUrls,
  });

  const handleUploadComplete = (urls: string[]) => {
    console.log({ urls });
    setVideoUrls(urls);
    setFormData((prev) => ({ ...prev, videoUrls: urls }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.location)
      return toast.warning("Please fill out all fields");
    setLoading(true);

    // console.log({ formData });
    // return;

    const emailHtml = await render(<CleaningServiceEmail {...formData} />);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_MAIL,
          subject: "Cleaning Service Booking Confirmation",
          html: emailHtml,
        }),
      });

      if (response.ok) {
        toast.success("Your service has been booked", {
          position: "top-center",
        });
      } else {
        console.error("Failed to send email");
      }
      setFormData({
        ...formData,
        name: "",
        email: "",
        location: "",
        serviceType: "",
        laundryType: "",
        price: 0,
      });
      setOpen(false);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Cleaning Service Booking</CardTitle>
        <CardDescription>
          Fill out the form below to book your cleaning service.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Email</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="house">House</Label>
            <Input
              id="house"
              name="house"
              value={formData.house}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label>Service Type</Label>
            <RadioGroup
              onValueChange={handleSelectChange("serviceType")}
              value={formData.serviceType}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cleaning" id="cleaning" />
                <Label htmlFor="cleaning">Cleaning</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="laundry" id="laundry" />
                <Label htmlFor="laundry">Laundry</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="repairs" id="repairs" />
                <Label htmlFor="repairs">Repairs</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.serviceType === "cleaning" && (
            <div className="space-y-2">
              <Label htmlFor="cleaningType">Cleaning Type</Label>
              <Select
                onValueChange={handleSelectChange("cleaningType")}
                value={formData.cleaningType}
                defaultValue={formData.cleaningType}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select cleaning type"
                    defaultValue={formData.cleaningType}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Detailed cleaning">
                    Detailed cleaning
                  </SelectItem>
                  <SelectItem value="Deep cleaning">Deep cleaning</SelectItem>
                  <SelectItem value="Post-construction cleaning">
                    Post-construction cleaning
                  </SelectItem>
                  <SelectItem value="Janitorial">Janitorial</SelectItem>
                  <SelectItem value="Fumigation">Fumigation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {formData.serviceType === "laundry" && (
            <div className="space-y-2">
              <Label htmlFor="laundryType">Laundry Type</Label>
              <Select
                onValueChange={handleSelectChange("laundryType")}
                value={formData.laundryType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select laundry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="washed">Washed only</SelectItem>
                  <SelectItem value="ironed">Ironed only</SelectItem>
                  <SelectItem value="washed-ironed">
                    Washed and Ironed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Input
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select
              onValueChange={handleSelectChange("time")}
              value={formData.time}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8am - 12pm">8:00 AM - 12:00 PM</SelectItem>
                <SelectItem value="12am - 4pm">12:00 PM - 4:00 PM</SelectItem>
              </SelectContent>
            </Select>

            <div>
              <Label htmlFor="frequency">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <VideoUpload
            onUploadComplete={handleUploadComplete}
            folder="course-videos"
            maxVideos={4}
          />

          {videoUrls.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Video URLs:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {videoUrls.map((url, index) => (
                  <li key={index} className="truncate">
                    {url}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full hover:bg-primary"
          onClick={handleSubmit}
        >
          Book Service{" "}
          {loading && <Loader2 className="animate-spin text-white" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
