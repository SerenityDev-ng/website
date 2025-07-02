"use client";

import React, { useState, useRef, useEffect } from "react";
import Script from "next/script";
import HeroSection from "./hero-section-laundry";
import LaundryOptions from "./laundry-options";
import ClothPrices from "./cloth-pricing";
import ClothContainer from "./cloth-container";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaArrowRight } from "react-icons/fa";
import axios from "@/lib/axios-instance";
import { useLaundryService } from "@/hooks/store/laundry";

type Props = {};

const LaundryPageClient = (props: Props) => {
  const [selectedService, setSelectedService] = useState({
    count: 0,
    title: "Washed and Folded",
  });

  // References to calculator components
  const clothPricesRef = useRef<any>(null);
  const washedIronedRef = useRef<any>(null);
  const ironedOnlyRef = useRef<any>(null);

  // Order summary state
  const [orderSummary, setOrderSummary] = useState<{
    mensItems?: { [key: string]: number };
    womensItems?: { [key: string]: number };
    childrensItems?: { [key: string]: number };
    extraItems?: { [key: string]: number };
    totalAmount: number;
  }>({ totalAmount: 0 });

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    pickupDate: "",
    pickupTime: "",
    specialInstructions: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Function to get the current order summary from the calculator components
  const getOrderSummary = () => {
    // Get current state from the Zustand store
    const { menServices, womenServices, childrenServices, extraServices, total } = useLaundryService.getState();
    
    // Convert array of items to object with name:quantity format for items with quantity > 0
    const mensItems = menServices.reduce((acc, item) => {
      if (item.quantity > 0) {
        acc[item.name] = item.quantity;
      }
      return acc;
    }, {} as { [key: string]: number });
    
    const womensItems = womenServices.reduce((acc, item) => {
      if (item.quantity > 0) {
        acc[item.name] = item.quantity;
      }
      return acc;
    }, {} as { [key: string]: number });
    
    const childrensItems = childrenServices.reduce((acc, item) => {
      if (item.quantity > 0) {
        acc[item.name] = item.quantity;
      }
      return acc;
    }, {} as { [key: string]: number });
    
    const extraItems = extraServices.reduce((acc, item) => {
      if (item.quantity > 0) {
        acc[item.name] = item.quantity;
      }
      return acc;
    }, {} as { [key: string]: number });
    
    return {
      mensItems,
      womensItems,
      childrensItems,
      extraItems,
      totalAmount: total,
    };
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update order summary when form is shown
  useEffect(() => {
    if (showForm) {
      const summary = getOrderSummary();
      setOrderSummary(summary);
    }
  }, [showForm]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Get the latest order summary
      const currentOrderSummary = getOrderSummary();
      setOrderSummary(currentOrderSummary);

      // Send the form data to the API
      const response = await fetch("/api/laundry-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selectedService: {
            title: selectedService.title,
          },
          orderSummary: currentOrderSummary,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit order");
      }

      setSubmitStatus("success");
      toast.success("Your laundry order has been submitted successfully!");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        pickupDate: "",
        pickupTime: "",
        specialInstructions: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit your order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Laundry Services",
    description:
      "Professional laundry services by Serenity in Nigeria. We offer washing, ironing, and folding for various clothing items, providing convenient and quality fabric care.",
    provider: {
      "@type": "Organization",
      name: "Serenity",
      logo: {
        "@type": "ImageObject",
        url: "https://www.serenity.ng/logo.svg",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    serviceType: "LaundryService",
    url: "https://www.serenity.ng/services/laundry",
  };

  return (
    <div className="pt-[120px] pb-[200px]">
      <Script
        id="json-ld-service-laundry"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <HeroSection />

      <div className="relative z-10">
        <LaundryOptions
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      </div>
      <div className="pt-[120px] relative z-20" id="calculator">
        <ClothContainer
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      </div>

      {/* Order Form Button */}
      <div className="mt-10 w-full flex justify-center">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="button-grad text-white w-full max-w-[350px] gap-4 px-12"
        >
          {showForm ? "Hide Order Form" : "Complete Your Order"}
          <FaArrowRight />
        </Button>
      </div>

      {/* Laundry Order Form */}
      {showForm && (
        <div className="mt-10 max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-league-spartan font-semibold text-center mb-8 text-gray-800 dark:text-white">
            Laundry Order Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                Pickup Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                required
              />
            </div>

            {/* Pickup Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                  Pickup Date
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                  Preferred Pickup Time
                </label>
                <input
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              />
            </div>

            {/* Selected Service Summary */}

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="button-grad text-white w-full max-w-[350px] gap-4 px-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Order"}
                <FaArrowRight />
              </Button>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="p-4 bg-green-50 text-green-700 rounded-md text-center">
                Your laundry order has been submitted successfully! We&apos;ll
                contact you to confirm pickup.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md text-center">
                There was an error submitting your order. Please try again.
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default LaundryPageClient;
