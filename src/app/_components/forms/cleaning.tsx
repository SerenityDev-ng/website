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

type CleaningServiceFormProps = {
  frequency: string;
  total: number;
  buildingType: "flat" | "duplex";
  cleaningType: "detailed" | "deep";
  time: string;
};

export default function CleaningServiceForm({
  frequency,
  total,
  buildingType,
  cleaningType,
  time,
}: CleaningServiceFormProps) {
  const user = useAuthStore((store) => store.user);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.user.email ?? "",
    name: `${user?.user?.first_name} ${user?.user?.last_name}` ?? "",
    location: user?.profile?.address?.address ?? "",
    house: buildingType,
    serviceType: "cleaning",
    cleaningType,
    laundryType: "",
    price: total,
    frequency,
    time,
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const emailHtml = await render(<CleaningServiceEmail {...formData} />);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formData.email,
          subject: "Cleaning Service Booking Confirmation",
          html: emailHtml,
        }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        toast.success("Your service has been booked");
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
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cleaning type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="detailed">Detailed cleaning</SelectItem>
                  <SelectItem value="deep">Deep cleaning</SelectItem>
                  <SelectItem value="post-construction">
                    Post-construction cleaning
                  </SelectItem>
                  <SelectItem value="janitorial">Janitorial</SelectItem>
                  <SelectItem value="fumigation">Fumigation</SelectItem>
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
