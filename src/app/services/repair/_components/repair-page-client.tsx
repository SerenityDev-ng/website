"use client";

import {
  book_carpenter,
  book_electrician,
  book_mason,
  book_painter,
  book_plumber,
  laundry_side,
  repair_man,
} from "@/assets/images";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import Script from "next/script";
import { BsExclamation } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

type Props = {};

interface Service {
  id: number;
  image: StaticImageData;
  title: string;
  text: string;
  price: number;
}

const RepairPageClient = (props: Props) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    streetAddress2: "",
    city: "",
    state: "",
    postalCode: "",
    description: "",
    files: [] as File[],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        files: Array.from(e.target.files || []),
      }));
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];

    setIsUploadingImages(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not a valid image file`);
          continue;
        }

        // Initialize progress for this file
        const fileId = `${file.name}-${Date.now()}`;
        setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }));

        // Create form data for upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "serenityweb");
        formData.append("folder", "repair-requests");

        // Upload to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/duojjwk8l/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        uploadedUrls.push(data.secure_url);

        // Update progress to 100% for this file
        setUploadProgress((prev) => ({ ...prev, [fileId]: 100 }));
      }

      if (uploadedUrls.length > 0) {
        toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
      }

      return uploadedUrls;
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image(s)");
      throw error;
    } finally {
      setIsUploadingImages(false);
      setUploadProgress({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      // First, upload images to Cloudinary if any
      let imageUrls: string[] = [];
      if (formData.files.length > 0) {
        toast.info("Uploading images...");
        imageUrls = await uploadImagesToCloudinary(formData.files);
      }

      // Prepare form data for API
      const submitData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        streetAddress: formData.streetAddress,
        streetAddress2: formData.streetAddress2,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        description: formData.description,
        selectedService: selectedService,
        imageUrls: imageUrls,
      };

      const response = await fetch("/api/repair-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        throw new Error("Invalid response from server");
      }

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage(
          "Your quote request has been submitted successfully! We'll contact you within 24 hours."
        );
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          streetAddress: "",
          streetAddress2: "",
          city: "",
          state: "",
          postalCode: "",
          description: "",
          files: [],
        });
      } else {
        setSubmitStatus("error");
        setSubmitMessage(
          result.error || "Failed to submit quote request. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        "An error occurred while submitting your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const repairServices = [
    {
      id: 1,
      image: book_electrician,
      title: "Book Electrician",
      text: "Power problems? Book an electrician and get back to bright and beautiful.",
      price: 4000,
    },
    {
      id: 2,
      image: book_plumber,
      title: "Book Plumber",
      text: "Leaky faucet? Book a plumber today and let us handle the drips!",
      price: 7000,
    },
    {
      id: 3,
      image: book_carpenter,
      title: "Book Carpenter",
      text: "From repairs to renovations, we've got the tools",
      price: 6000,
    },
    {
      id: 4,
      image: book_painter,
      title: "Book Painter",
      text: "Let's add some color to your world! Schedule a painter for expert finishing",
      price: 9000,
    },
    {
      id: 5,
      image: book_mason,
      title: "Book Mason",
      text: "Solid work starts with a skilled mason! Book yours today!",
      price: 12000,
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Home Repair Services",
    description:
      "Reliable home repair services from Serenity in Nigeria. We connect you with certified technicians for electrical, plumbing, carpentry, painting, and masonry repairs.",
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
    serviceType: "HomeRepair",
    url: "https://www.serenity.ng/services/repair",
  };

  return (
    <div className="py-10 lg:pt-0 ">
      <Script
        id="json-ld-service-repair"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main className="flex flex-col lg:flex-row items-center lg:justify-between">
        <aside className="relative">
          <article className="md:max-w-[500px] lg:max-w-[513px] text-center lg:text-left">
            <h1 className=" font-inter font-semibold text-4xl md:text-5xl xl:text-[72px]">
              Repairs you can rely on any day.
            </h1>
            <p className="text-lg lg:text-3xl font-league-spartan mt-7 lg:mt-9 max-w-[80%] lg:max-w-none mx-auto text-[#4E4848] dark:text-muted-foreground">
              Quality repairs at your finger tip.
            </p>
          </article>

          <div className="mt-[35px] w-fit mx-auto lg:mx-0">
            <Link href={"/services/repair#select-service"}>
              <Button className=" button-grad">Schedule Repairs</Button>
            </Link>
          </div>
        </aside>

        <aside className="relative -mt-16 md:mt-10 lg:mt-0 ">
          <Image
            src={repair_man}
            alt="Side"
            height={0}
            width={0}
            sizes="100vw"
            className="w-full h-[618px] max-w-[726px] object-contain relative z-10"
          />
          <Image
            src={laundry_side}
            alt="Side"
            height={0}
            width={0}
            sizes="100vw"
            className="w-fit h-[618px]  object-contain fixed -top-16 right-0 z-0 opacity-20 lg:opacity-100"
          />
        </aside>
      </main>

      <aside className="mt-[120px] relative z-20">
        <h1 className="font-league-spartan font-medium text-4xl lg:text-[55px]">
          Schedule Repair Service
        </h1>

        <p className=" text-[#4E4848] font-inter text-lg py-3 w-full max-w-[420px] dark:text-muted-foreground">
          Ready to tackle those home repairs? We understand that your home is
          your sanctuary, that why our dedicated team is here to help—ensuring
          your space is not only functional but a true reflection of your style!
        </p>
      </aside>

      <aside className="mt-20 relative z-20" id="select-service">
        <h1 className=" font-league-spartan font-medium text-center text-4xl lg:text-[55px]">
          Select Repair Service Option
        </h1>

        <div className="flex flex-wrap gap-5 mt-20 justify-center lg:justify-start">
          {repairServices.map((service, i) => (
            <div
              onClick={() => setSelectedService(service)}
              key={service.id}
              className={cn(
                "max-w-[391px] cursor-pointer h-[509px] rounded-[10px] border border-[#C0B8B8] overflow-hidden backdrop-blur-md bg-white/40 duration-300 dark:!bg-background",
                selectedService?.title === service.title
                  ? "border-primary border-2"
                  : "",
                "dark:!bg-secondary"
              )}
            >
              <Image
                src={service.image}
                alt={service.title}
                height={0}
                width={0}
                className="w-full h-[262px]"
              />
              <h1 className=" font-league-spartan font-medium py-3 text-2xl px-2 dark:text-black">
                {service.title}
              </h1>
              <p className=" text-[#4E4848] px-2">{service.text}</p>
            </div>
          ))}
        </div>
      </aside>

      <aside className="mt-20 relative z-20">
        <div className="px-6">
          <div className="border border-[#12121980] dark:border-secondary flex gap-3 items-center w-fit mx-auto rounded-full p-2 ">
            <div className=" bg-secondary p-1 rounded-full">
              <BsExclamation className="text-primary" size={43} />
            </div>
            <p>
              We will provide your service 24 hours after receiving your order.{" "}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-3 text-2xl max-w-[80%] mx-auto font-league-spartan mt-9">
          <p>Total</p>

          <p>&#8358;{selectedService?.price ?? 0}</p>
        </div>

        <div className=" my-24 w-full flex justify-center">
          <Button
            onClick={() => {
              const formSection = document.getElementById("quote-form");
              if (formSection) {
                formSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className=" button-grad text-white w-full max-w-[350px] gap-4 px-12"
          >
            Request Quote
            <FaArrowRight />
          </Button>
        </div>
      </aside>

      {/* Quote Request Form Section */}
      <aside className="mt-20 relative z-20" id="quote-form">
        <div className="max-w-4xl mx-auto bg-white dark:bg-secondary rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-league-spartan font-semibold text-center mb-8 text-gray-800 dark:text-white">
            Handyman Quote Request Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Name
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder=""
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-gray-600 dark:text-white"
                    required
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    First Name
                  </span>
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder=""
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-gray-600 dark:text-white"
                    required
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    Last Name
                  </span>
                </div>
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder=""
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-gray-600 dark:text-white"
                  required
                />
                <span className="text-xs text-gray-500 mt-1 block">
                  example@example.com
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder=""
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-gray-600 dark:text-white"
                  required
                />
                <span className="text-xs text-gray-500 mt-1 block">
                  Please enter a valid phone number.
                </span>
              </div>
            </div>

            {/* Address Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Address
              </label>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder=""
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-gray-600 dark:text-white"
                    required
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    Street Address
                  </span>
                </div>

                <div>
                  <input
                    type="text"
                    name="streetAddress2"
                    value={formData.streetAddress2}
                    onChange={handleInputChange}
                    placeholder=""
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-gray-600 dark:text-white"
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    Street Address Line 2
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder=""
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-gray-600 dark:text-white"
                      required
                    />
                    <span className="text-xs text-gray-500 mt-1 block">
                      City
                    </span>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder=""
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-gray-600 dark:text-white"
                      required
                    />
                    <span className="text-xs text-gray-500 mt-1 block">
                      State / Province
                    </span>
                  </div>
                </div>

                <div className="max-w-md">
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder=""
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-gray-600 dark:text-white"
                    required
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    Postal / Zip Code
                  </span>
                </div>
              </div>
            </div>

            {/* Pictures Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Pictures (If Any)
              </label>
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Browse Images
                  </p>
                  <p className="text-sm text-gray-500">
                    Drag and drop image files here (JPG, PNG, GIF)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileChange}
                    disabled={isUploadingImages}
                  />
                </div>
              </div>

              {/* Upload Progress */}
              {isUploadingImages && Object.keys(uploadProgress).length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Uploading images...
                  </p>
                  {Object.entries(uploadProgress).map(([fileId, progress]) => (
                    <div
                      key={fileId}
                      className="bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                    >
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              )}

              {formData.files.length > 0 && !isUploadingImages && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Selected images: {formData.files.length}
                  </p>
                  <div className="space-y-1">
                    {formData.files.map((file, index) => (
                      <p
                        key={index}
                        className="text-xs text-gray-500 flex items-center"
                      >
                        <span className="mr-2">🖼️</span>
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Describe Your Request
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                placeholder="Please describe the repair work needed, including any specific details about the problem..."
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-background dark:border-gray-600 dark:text-white resize-vertical"
                required
              ></textarea>
            </div>

            {/* Selected Service Display */}
            {selectedService && (
              <div className="bg-gray-50 dark:bg-background p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                  Selected Service:
                </h3>
                <div className="flex items-center gap-4">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.title}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {selectedService.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedService.text}
                    </p>
                    <p className="text-lg font-semibold text-primary">
                      ₦{selectedService.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                Following table will be filled by the responsible:
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-300 mt-2">
                Our team will review your request and provide a detailed quote
                within 24 hours. We&apos;ll contact you using the information
                provided above.
              </p>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      {submitMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">
                      {submitMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                disabled={isSubmitting || isUploadingImages}
                className="button-grad text-white px-12 py-3 text-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isUploadingImages ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading Images...
                  </>
                ) : isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Quote Request
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </aside>
    </div>
  );
};

export default RepairPageClient;
