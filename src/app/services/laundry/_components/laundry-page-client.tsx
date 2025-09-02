"use client";

import React, { useState, useRef, useEffect } from "react";
import Script from "next/script";
import { useSearchParams, useRouter } from "next/navigation";
import HeroSection from "./hero-section-laundry";
import LaundryOptions from "./laundry-options";
import ClothPrices from "./cloth-pricing";
import ClothContainer from "./cloth-container";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaArrowRight } from "react-icons/fa";
import { useLaundryService } from "@/hooks/store/laundry";
import { useBookLaundry, useGetLaundryServices, type BookLaundryPayload, type LaundryType } from "@/hooks/useBookLaundry";
import { useAuthStore } from "@/hooks/store/user";
import { iron_cloth, laundry_fold, laundry_iron } from "@/assets/images";
import LaundryCard from "./laundry-card";

type Props = {};

const LaundryPageClient = (props: Props) => {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Helper function to update URL filter parameter
  const updateFilterParam = (filterType: LaundryType | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (filterType) {
      params.set('filter', filterType);
    } else {
      params.delete('filter');
    }
    
    router.push(`/services/laundry?${params.toString()}`);
  };
  
  // Helper function to update customer type filter (client-side only)
  const updateCustomerFilterParam = (customerType: 'men' | 'women' | undefined) => {
    setCustomerTypeFilter(customerType);
  };
  
  // Helper function to clear all filters
  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('filter');
    router.push(`/services/laundry?${params.toString()}`);
    setCustomerTypeFilter(undefined);
  };
  
  const [selectedService, setSelectedService] = useState({
    count: 0,
    title: "Washed and Folded",
  });
  
  // Laundry type filter state
  const [laundryTypeFilter, setLaundryTypeFilter] = useState<LaundryType | undefined>(undefined);
  
  // Customer type filter state
  const [customerTypeFilter, setCustomerTypeFilter] = useState<'men' | 'women' | undefined>(undefined);
  
  // Read filter from URL parameters (service type only)
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam && ['WASHED_FOLDED', 'WASHED_IRONED', 'IRONED'].includes(filterParam)) {
      setLaundryTypeFilter(filterParam as LaundryType);
    } else {
      setLaundryTypeFilter(undefined);
    }
  }, [searchParams]);
  
  // State for tracking selected laundry items with quantities
  const [selectedItems, setSelectedItems] = useState<Array<{laundry_id: string; quantity: number}>>([]);
  
  // Function to update quantity for a specific laundry item
  const updateQuantity = (laundryId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      // Remove item if quantity is 0
      setSelectedItems(prev => prev.filter(item => item.laundry_id !== laundryId));
    } else {
      setSelectedItems(prev => {
        const existingItemIndex = prev.findIndex(item => item.laundry_id === laundryId);
        if (existingItemIndex >= 0) {
          // Update existing item
          const updated = [...prev];
          updated[existingItemIndex] = { laundry_id: laundryId, quantity: newQuantity };
          return updated;
        } else {
          // Add new item
          return [...prev, { laundry_id: laundryId, quantity: newQuantity }];
        }
      });
    }
  };
  
  // Function to calculate total price
  const calculateTotal = () => {
    if (!laundryServicesData?.data) return 0;
    
    return selectedItems.reduce((total, selectedItem) => {
      const service = laundryServicesData.data.find(s => s._id === selectedItem.laundry_id);
      return total + (service ? Number(service.price) * selectedItem.quantity : 0);
    }, 0);
  };
  
  const { mutateAsync: bookLaundryAsync, isPending: isBooking } = useBookLaundry();
  
  // Fetch laundry services with optional filtering
  const { 
    data: laundryServicesData, 
    isLoading: isLoadingServices, 
    error: servicesError,
    refetch: refetchServices 
  } = useGetLaundryServices(
    laundryTypeFilter ? { laundry_type: laundryTypeFilter } : undefined
  );
  
  // Client-side filtering for customer type
  const filteredServices = React.useMemo(() => {
    if (!laundryServicesData?.data) return [];
    
    let services = laundryServicesData.data;
    
    // Apply customer type filter
    if (customerTypeFilter) {
      services = services.filter(service => {
        const customerType = service.customer_type.toLowerCase();
        if (customerTypeFilter === 'men') {
          return customerType.includes('men') || customerType.includes('male');
        } else if (customerTypeFilter === 'women') {
          return customerType.includes('women') || customerType.includes('female');
        }
        return true;
      });
    }
    
    return services;
  }, [laundryServicesData, customerTypeFilter]);
 
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

  // Form state (no longer using modal)
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
  
  // Prefill form with user data on component mount
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.user?.first_name || "",
        lastName: user.user?.last_name || "",
        email: user.user?.email || "",
        phone: user.user?.phone_number || "",
        address: user.profile?.address?.address || "",
      }));
    }
  }, [user]);
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



  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      if (selectedItems.length === 0) {
        throw new Error("Please select at least one laundry item to proceed.");
      }

      if (!formData.pickupDate || !formData.pickupTime) {
        throw new Error("Please select pickup date and time.");
      }

      // Pull user profile for coordinates and state
      const user = useAuthStore.getState().user;
      const state = user?.profile?.state || "Lagos";
      const longitude = user?.profile?.address?.longitude
      const latitude = user?.profile?.address?.latitude
      const address = user?.profile?.address?.address || formData.address || "123 Main Street";

      const payload: any = {
        laundry_order: selectedItems,
        laundry_time: [
          {
            opening_time: formData.pickupTime,
            closing_time: formData.pickupTime
          }
        ],
        payment_method: "PAYMENT_GATEWAY",
        order_type: "PICKUP",
        laundry_address: {
          state,
          address,
          longitude,
          latitude,
        },
        
      };

      // Call backend using the booking hook
      const res = await bookLaundryAsync(payload);

      setSubmitStatus("success");
      toast.success("Your laundry booking has been created successfully!");

      // If a payment URL is provided, redirect the user
      const payUrl = res?.data?.payment_url;
      if (payUrl) {
        window.location.href = payUrl;
      }

      // Reset selected items and form after successful submission
      setSelectedItems([]);
      
      // Reset form data but keep user info prefilled
      if (user) {
        setFormData({
          firstName: user.user?.first_name || "",
          lastName: user.user?.last_name || "",
          email: user.user?.email || "",
          phone: user.user?.phone_number || "",
          address: user.profile?.address?.address || "",
          pickupDate: "",
          pickupTime: "",
          specialInstructions: "",
        });
      }
    } catch (error: any) {
      console.error("Error submitting laundry booking:", error);
      setSubmitStatus("error");
      const message = error?.response?.data?.message || error?.message ||
        "Failed to create your booking. Please try again.";
      toast.error(message);
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

  const defaultServices = [
    {
      id: 1,
      image: laundry_fold,
      heading: "Washed and Folded",
      title: "Your dirty laundry picked up, washed, neatly folded and delivered in 48 hours."
    },
    {
      id: 2,
      image: iron_cloth,
      heading: "Washed and Ironed",
      title: "Your dirty laundry picked up, washed, ironed and delivered in 48 hours."
    },
    {
      id: 3,
      image: laundry_iron,
      heading: "Iron Only",
      title: "Your clean laundry picked up, ironed and delivered in 48 hours."
    }
  ];

  return (
    <div className="pt-[120px] pb-[200px]">
      <Script
        id="json-ld-service-laundry"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <HeroSection />

      <div className="flex flex-wrap justify-center gap-4">

      {defaultServices.map((service, i) => (
          <LaundryCard
            key={service.id}
            image={service.image}
            heading={service.heading}
            title={service.title}
            setSelectedService={setSelectedService}
            selectedService={selectedService}
            index={i}
          />
        ))}
      </div>

      {/* Laundry Services Filter */}
      <div className="max-w-6xl mx-auto px-4 py-8 z-30 relative">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-league-spartan font-semibold mb-4 text-gray-800 dark:text-white">
            Browse Laundry Services
          </h2>
          
          
          {/* Filter Controls */}
          <div className="mb-6 space-y-4">
            {/* Service Type Filters */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                Filter by Service Type:
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => updateFilterParam(undefined)}
                  variant={laundryTypeFilter === undefined ? "default" : "outline"}
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  All Services
                </Button>
                <Button
                   onClick={() => updateFilterParam("WASHED_FOLDED")}
                   variant={laundryTypeFilter === "WASHED_FOLDED" ? "default" : "outline"}
                   size="sm"
                   className="text-xs sm:text-sm"
                 >
                   Washed & Folded
                 </Button>
                 <Button
                   onClick={() => updateFilterParam("IRONED")}
                   variant={laundryTypeFilter === "IRONED" ? "default" : "outline"}
                   size="sm"
                   className="text-xs sm:text-sm"
                 >
                   Iron Only
                 </Button>
                 <Button
                   onClick={() => updateFilterParam("WASHED_IRONED")}
                   variant={laundryTypeFilter === "WASHED_IRONED" ? "default" : "outline"}
                   size="sm"
                   className="text-xs sm:text-sm"
                 >
                   Washed & Ironed
                 </Button>
              </div>
            </div>
            
            {/* Customer Type Filters */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                Filter by Customer Type:
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => updateCustomerFilterParam(undefined)}
                  variant={customerTypeFilter === undefined ? "default" : "outline"}
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  All Customers
                </Button>
                <Button
                  onClick={() => updateCustomerFilterParam("men")}
                  variant={customerTypeFilter === "men" ? "default" : "outline"}
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  Men
                </Button>
                <Button
                  onClick={() => updateCustomerFilterParam("women")}
                  variant={customerTypeFilter === "women" ? "default" : "outline"}
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  Women
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                onClick={() => clearAllFilters()}
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
              >
                Clear All Filters
              </Button>
              <Button
                onClick={() => refetchServices()}
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Services Display */}
          {isLoadingServices && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Loading services...</p>
            </div>
          )}

          {servicesError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
              <p className="text-red-700 dark:text-red-400">
                Error loading services: {servicesError.message}
              </p>
            </div>
          )}

          {filteredServices.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                <div className="grid grid-cols-6 gap-4 font-semibold text-gray-700 dark:text-gray-200">
                  <div className="col-span-2">Item</div>
                  <div>Type</div>
                  <div>Customer</div>
                  <div>Price</div>
                  <div className="text-center">Quantity</div>
                </div>
              </div>
              
              {/* Table Body */}
              <div className="divide-y divide-gray-200 dark:divide-gray-600">
                {filteredServices.map((service) => {
                  const currentItem = selectedItems.find(item => item.laundry_id === service._id);
                  const quantity = currentItem?.quantity || 0;
                  
                  return (
                    <div key={service._id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="grid grid-cols-6 gap-4 items-center">
                        <div className="col-span-2">
                          <h3 className="font-medium text-gray-900 dark:text-white !capitalize">
                            {service.wear.replace(/_/g, " ")}
                          </h3>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {service.laundry_type.replace(/_/g, " ")}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {service.customer_type}
                        </div>
                        <div className="font-semibold text-green-600 dark:text-green-400">
                          ₦{service.price}
                        </div>
                        <div className="flex items-center justify-center space-x-3">
                          <Button
                            onClick={() => updateQuantity(service._id, Math.max(0, quantity - 1))}
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full"
                            disabled={quantity === 0}
                          >
                            -
                          </Button>
                          <span className="min-w-[2rem] text-center font-medium">
                            {quantity}
                          </span>
                          <Button
                            onClick={() => updateQuantity(service._id, quantity + 1)}
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 rounded-full"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Total Section */}
              {selectedItems.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Total Items: {selectedItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                    <span className="font-semibold text-lg text-green-600 dark:text-green-400">
                      Total: ₦{calculateTotal()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            laundryServicesData && (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No services found matching the selected filters.
                </p>
                <Button
                  onClick={() => clearAllFilters()}
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )
          )}
          
          {/* Date and Time Selection */}
          {selectedItems.length > 0 && (
            <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Schedule Pickup Time
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
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
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
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
                  rows={3}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  placeholder="Any special instructions for your laundry..."
                />
              </div>
            </div>
          )}
          
          {/* Proceed to Order Button */}
          {selectedItems.length > 0 && formData.pickupDate && formData.pickupTime && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleSubmit}
                className="button-grad text-white px-12 py-4 text-lg gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing Order..." : "Proceed to Order"}
                <FaArrowRight />
              </Button>
            </div>
          )}

          {laundryServicesData && laundryServicesData.data && laundryServicesData.data.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                No services found for the selected filter.
              </p>
            </div>
          )}
        </div>
      </div>

     

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-md text-center max-w-4xl mx-auto">
          Your laundry order has been submitted successfully! We&apos;ll
          contact you to confirm pickup.
        </div>
      )}
      {submitStatus === "error" && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md text-center max-w-4xl mx-auto">
          There was an error submitting your order. Please try again.
        </div>
      )}
    </div>
  );
};

export default LaundryPageClient;
