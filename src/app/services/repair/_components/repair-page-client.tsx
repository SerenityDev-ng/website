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
import React, { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import Script from "next/script";
import { BsExclamation } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { useBookRepair, type BookRepairPayload } from "@/hooks/useBookRepair";
import { useGetRepairServices } from "@/hooks/useGetRepairServices";
import { useRepairService } from "@/hooks/store/repair";
import { useAuthStore } from "@/hooks/store/user";
import { mapRepairServiceToItem, groupRepairServicesByCategory, getUniqueCategories } from "@/lib/repair-mapper";
import useDebounce from "@/hooks/debounce";

type Props = {};

interface Service {
  id: string | number;
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
    openingTime: "09:00",
    closingTime: "17:00",
  });

  // OpenStreetMap / Nominatim address search state
  const [addressSearch, setAddressSearch] = useState("");
  const debouncedAddress = useDebounce(addressSearch, 400);
  const [addressResults, setAddressResults] = useState<any[]>([]);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [addressSearchError, setAddressSearchError] = useState<string | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<{ latitude: string; longitude: string } | null>(null);
 const [addressConfirmed, setAddressConfirmed] = useState(false);
  const searchAbortRef = useRef<AbortController | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Query OpenStreetMap Nominatim for address suggestions
  useEffect(() => {
    // If the user has confirmed a selection, do not trigger additional searches
    if (addressConfirmed) {
      setIsSearchingAddress(false);
      return;
    }
     if (!debouncedAddress || debouncedAddress.trim().length < 3) {
       setAddressResults([]);
       setAddressSearchError(null);
       return;
     }

    // Abort any in-flight request
    if (searchAbortRef.current) {
      searchAbortRef.current.abort();
    }
    const controller = new AbortController();
    searchAbortRef.current = controller;

    setIsSearchingAddress(true);
    setAddressSearchError(null);

    const base = "https://nominatim.openstreetmap.org/search";
    const params = new URLSearchParams({
      format: "jsonv2",
      q: debouncedAddress,
      addressdetails: "1",
      limit: "5",
      // Including email is recommended by Nominatim for contact; we add if available
      ...(formData.email ? { email: formData.email } : {}),
    });

    fetch(`${base}?${params.toString()}` , {
      method: "GET",
      headers: {
        Accept: "application/json",
        // Browser will automatically attach Referer which Nominatim uses for identification
        "Accept-Language": typeof navigator !== "undefined" ? navigator.language : "en-US",
      },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Nominatim search failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setAddressResults(Array.isArray(data) ? data : []);
      })
      .catch((err: any) => {
        if (err?.name === "AbortError") return;
        console.error("Nominatim search error:", err);
        setAddressSearchError("Failed to fetch address suggestions.");
      })
      .finally(() => setIsSearchingAddress(false));

    return () => {
      controller.abort();
    };
  }, [debouncedAddress, addressConfirmed]);

  const handleSelectAddress = (result: any) => {
    try {
      setAddressConfirmed(true);
      setSelectedCoords({ latitude: String(result?.lat ?? ""), longitude: String(result?.lon ?? "") });

      const addr = (result && result.address) || {};
      const street = [addr.road, addr.house_number].filter(Boolean).join(" ") || result.display_name || "";
      const city = addr.city || addr.town || addr.village || addr.county || "";
      const state = addr.state || "";
      const postcode = addr.postcode || "";

      setFormData((prev) => ({
        ...prev,
        streetAddress: street || prev.streetAddress,
        city: city || prev.city,
        state: state || prev.state,
        postalCode: postcode || prev.postalCode,
      }));

      // Reflect chosen address in the search box and close the suggestions list
      const summary = [street, city, state, postcode].filter(Boolean).join(", ");
      setAddressSearch(summary);
      setAddressResults([]);
      toast.success("Address selected from OpenStreetMap");
    } catch (e) {
      console.error("Failed to apply selected address:", e);
      toast.error("Could not apply selected address");
    }
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

  // Retrieve current user to access saved coordinates/address
  const { user } = useAuthStore();

  // Integrate custom booking hook
  const { mutate: bookRepair, isPending: isBooking } = useBookRepair({
    onSuccess: (res) => {
      toast.success("Repair booking created successfully");
      console.log('Repair booking successful:', res);
      // Clear selected services after successful booking
      clearServices();
      // Optionally, use res.data.payment_url to redirect if needed
      // window.location.href = res.data.payment_url;
    },
    onError: (error) => {
      console.error("Booking error:", error);
      toast.error("Failed to create repair booking");
      setSubmitStatus('error');
      setSubmitMessage('Failed to book repair service. Please try again.');
    },
  });

  // Repair services fetching and state management
  const { data: repairServicesData, isLoading: isLoadingServices, error: servicesError } = useGetRepairServices();
  const {
    selectedServices,
    totalAmount,
    selectedCategory,
    addService,
    removeService,
    toggleService,
    clearServices,
    setSelectedCategory,
    isServiceSelected,
    getSelectedServicesCount
  } = useRepairService();

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

  const handleProceedToQuote = async () => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      // Build payload for booking API using the custom hook
      const primaryServiceId = selectedService?.id ?? (selectedServices.length > 0 ? selectedServices[0].id : "");
      const payload: BookRepairPayload = {
        repair_service: String(primaryServiceId),
        service_time: [{
          opening_time: formData.openingTime,
          closing_time: formData.closingTime,
        }],
        service_address: {
           state: formData.state,
           address: user?.profile?.address?.address ?? "",
           longitude: user?.profile?.address?.longitude ?? "",
           latitude: user?.profile?.address?.latitude ?? "",
         },
        payment_method: "PAYMENT_GATEWAY",
        description: formData.description,
      };

      // Trigger booking mutation
      if (primaryServiceId) {
        bookRepair(payload);
      }

      setSubmitStatus("success");
      setSubmitMessage(
        "Your repair service has been booked successfully!"
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
        openingTime: "09:00",
        closingTime: "17:00",
      });
    } catch (error) {
      console.error("Error booking repair:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        "An error occurred while booking your repair service. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  // Helper function to get appropriate image for service
  const getServiceImage = (category: string) => {
    const categoryLower = category?.toLowerCase();
    if (categoryLower?.includes('electric')) return book_electrician;
    if (categoryLower?.includes('plumb')) return book_plumber;
    if (categoryLower?.includes('carpen')) return book_carpenter;
    if (categoryLower?.includes('paint')) return book_painter;
    if (categoryLower?.includes('mason')) return book_mason;
    return repair_man; // default image
  };

  // Process repair services data from API
  const processedServices = React.useMemo(() => {
    let repairs: Service[] = [];
    
      // Fallback to static services if API data is not available
      
      repairs =  [
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
    if (!repairServicesData?.data) {
      return [];
    }

    // Map API data to component format
      return repairServicesData.data.map((service, index) => {
        const mappedService = mapRepairServiceToItem(service);
        return {
          id: mappedService.id, // Use numeric ID for consistency with Service interface
          image: getServiceImage(service.category),
          title: mappedService.name,
          text: mappedService.description || repairs[index]?.text,
          price: mappedService.price,
        };
      });
  }, [repairServicesData]);

  const repairServices = processedServices;

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

        {isLoadingServices ? (
          <div className="flex justify-center items-center mt-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        ) : servicesError ? (
          <div className="mt-20 text-center">
            <p className="text-red-500 dark:text-red-400">Failed to load repair services. Using default services.</p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-5 mt-20 justify-center lg:justify-start">
          {repairServices.map((service, i) => (
            <div
              onClick={() => {
                setSelectedService(service);
                const repairItem = {
                    id: service.id.toString(),
                    name: service.title,
                    description: service.text,
                    price: service.price,
                    category: "repair",
                    selected: false
                  };
                  toggleService(repairItem);
                const formSection = document.getElementById("quote-form");
                if (formSection) {
                  formSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              key={service.id}
              className={cn(
                "max-w-[391px] cursor-pointer h-[509px] rounded-[10px] border border-[#C0B8B8] overflow-hidden backdrop-blur-md bg-white/40 duration-300 dark:!bg-gray-800",
                selectedService?.title === service.title || isServiceSelected(service.id.toString())
                  ? "border-primary border-2"
                  : "",
                "dark:border-gray-700"
              )}
            >
              <Image
                src={service.image}
                alt={service.title}
                height={0}
                width={0}
                className="w-full h-[262px] object-cover"
              />
              <h1 className=" font-league-spartan font-medium py-3 text-2xl px-2 dark:text-gray-100">
                {service.title}
              </h1>
              <p className=" text-[#4E4848] dark:text-gray-300 px-2">
                {service.text}
              </p>
              <div className="px-2 mt-2">
                <p className="text-lg font-semibold text-primary">
                  ₦{service.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <aside className="mt-20 relative z-20">
        <div className="px-6">
          <div className="border border-[#12121980] dark:border-gray-700 flex gap-3 items-center w-fit mx-auto rounded-full p-2 ">
            <div className=" bg-secondary dark:bg-gray-800 p-1 rounded-full">
              <BsExclamation className="text-primary" size={43} />
            </div>
            <p className="dark:text-gray-200">
              We will provide your service 24 hours after receiving your order.{" "}
            </p>
          </div>
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

      {/* Quote Request Section */}
      {(selectedService || getSelectedServicesCount() > 0) && (
        <aside className="mt-20 relative z-20" id="quote-form">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-league-spartan font-semibold text-center mb-6 text-gray-800 dark:text-white">
              Service Details
            </h2>

            {/* Selected Services Display */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-transparent dark:border-gray-700 mb-6">
              <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-3">
                Selected Service{getSelectedServicesCount() > 1 ? 's' : ''}:
              </h3>
              
              {/* Primary selected service */}
              {selectedService && (
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.title}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      {selectedService.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      {selectedService.text}
                    </p>
                    <p className="text-lg font-semibold text-primary">
                      ₦{selectedService.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Additional selected services from store */}
              {getSelectedServicesCount() > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Total Services: {getSelectedServicesCount()}
                  </p>
                  <p className="text-lg font-semibold text-primary">
                    Total Amount: ₦{totalAmount.toLocaleString()}
                  </p>
                  <button
                    type="button"
                    onClick={clearServices}
                    className="mt-2 text-xs text-red-600 dark:text-red-400 hover:underline"
                  >
                    Clear all selections
                  </button>
                </div>
              )}
            </div>

            {/* Service Details Form */}
            <div className="space-y-6">
              {/* Preferred Service Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">
                  Preferred Service Time
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="time"
                      name="openingTime"
                      value={formData.openingTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                      required
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                      Opening time
                    </span>
                  </div>
                  <div>
                    <input
                      type="time"
                      name="closingTime"
                      value={formData.closingTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                      required
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                      Closing time
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">
                   Describe Your Request
                 </label>
                 <textarea
                   name="description"
                   value={formData.description}
                   onChange={handleInputChange}
                   rows={4}
                   placeholder="Please describe the repair work needed, including any specific details about the problem..."
                   className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 resize-vertical"
                   required
                 ></textarea>
               </div>

               {/* State */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">
                   State
                 </label>
                 <select
                   name="state"
                   value={formData.state}
                   onChange={handleInputChange}
                   className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                   required
                 >
                   <option value="">Select your state</option>
                   <option value="Abuja">Abuja</option>
                   <option value="Abia">Abia</option>
                   <option value="Adamawa">Adamawa</option>
                   <option value="Akwa Ibom">Akwa Ibom</option>
                   <option value="Anambra">Anambra</option>
                   <option value="Bauchi">Bauchi</option>
                   <option value="Bayelsa">Bayelsa</option>
                   <option value="Benue">Benue</option>
                   <option value="Borno">Borno</option>
                   <option value="Cross River">Cross River</option>
                   <option value="Delta">Delta</option>
                   <option value="Ebonyi">Ebonyi</option>
                   <option value="Edo">Edo</option>
                   <option value="Ekiti">Ekiti</option>
                   <option value="Enugu">Enugu</option>
                   <option value="Gombe">Gombe</option>
                   <option value="Imo">Imo</option>
                   <option value="Jigawa">Jigawa</option>
                   <option value="Kaduna">Kaduna</option>
                   <option value="Kano">Kano</option>
                   <option value="Katsina">Katsina</option>
                   <option value="Kebbi">Kebbi</option>
                   <option value="Kogi">Kogi</option>
                   <option value="Kwara">Kwara</option>
                   <option value="Lagos">Lagos</option>
                   <option value="Nasarawa">Nasarawa</option>
                   <option value="Niger">Niger</option>
                   <option value="Ogun">Ogun</option>
                   <option value="Ondo">Ondo</option>
                   <option value="Osun">Osun</option>
                   <option value="Oyo">Oyo</option>
                   <option value="Plateau">Plateau</option>
                   <option value="Rivers">Rivers</option>
                   <option value="Sokoto">Sokoto</option>
                   <option value="Taraba">Taraba</option>
                   <option value="Yobe">Yobe</option>
                   <option value="Zamfara">Zamfara</option>
                 </select>
                 <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                   This will be used for service location
                 </span>
               </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400 dark:text-green-200"
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
                      <p className="text-sm font-medium text-green-800 dark:text-green-50">
                        {submitMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BsExclamation className="h-5 w-5 text-red-400 dark:text-red-200" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800 dark:text-red-50">
                        {submitMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Proceed to Quote Button */}
              <div className="flex justify-center pt-4">
                <Button
                   onClick={handleProceedToQuote}
                   disabled={isSubmitting || !formData.openingTime || !formData.closingTime || !formData.description || !formData.state}
                   className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                 >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Quote
                      <FiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default RepairPageClient;
