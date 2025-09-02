import {
  cleaning,
  iron_cloth,
  laundry_fold,
  laundry_iron,
  repair,
} from "@/assets/images";
import React from "react";
import LaundryCard from "./laundry-card";
import { useGetLaundryServices } from "@/hooks/useBookLaundry";

type Props = {
  setSelectedService: React.Dispatch<
    React.SetStateAction<{ count: number; title: string }>
  >;
  selectedService: { count: number; title: string };
};

const LaundryOptions = ({ setSelectedService, selectedService }: Props) => {
  const { data: laundryServicesData, isLoading, error } = useGetLaundryServices();

  // Map service types to images and descriptions
  const getServiceConfig = (serviceType: string) => {
    switch (serviceType) {
      case "WASHED_FOLDED":
        return {
          image: laundry_fold,
          heading: "Washed and Folded",
          title: "Your dirty laundry picked up, washed, neatly folded and delivered in 48 hours."
        };
      case "WASHED_IRONED":
        return {
          image: iron_cloth,
          heading: "Washed and Ironed",
          title: "Your dirty laundry picked up, washed, ironed and delivered in 48 hours."
        };
      case "IRONED":
        return {
          image: laundry_iron,
          heading: "Iron Only",
          title: "Your clean laundry picked up, ironed and delivered in 48 hours."
        };
      default:
        return {
          image: laundry_fold,
          heading: serviceType,
          title: "Professional laundry service delivered in 48 hours."
        };
    }
  };

  // Get unique service types from backend data
  const uniqueServiceTypes = laundryServicesData?.data
    ? Array.from(new Set(laundryServicesData.data.map(service => service.laundry_type)))
    : [];

  const theServices = uniqueServiceTypes.map((serviceType, index) => {
    const config = getServiceConfig(serviceType);
    return {
      id: index + 1,
      ...config
    };
  });

  // Fallback to default services if no backend data
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

  const servicesToRender = theServices.length > 0 ? theServices : defaultServices;
  return (
    <main>
      <h1 className=" font-league-spartan font-medium text-[36px] lg:text-5xl text-center lg:text-left">
        Laundry Service Options
      </h1>
      <p className="text-lg lg:text-2xl mt-4 text-center lg:text-left max-w-[320px] lg:max-w-[520px] mx-auto lg:mx-0 dark:text-muted-foreground">
        Select your choice of laundry, how do you want your laundry done?
      </p>

      <div className="mt-[70px] flex flex-wrap justify-start gap-4">
        {isLoading && (
          <div className="w-full text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading services...</p>
          </div>
        )}
        
        {error && (
          <div className="w-full bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
            <p className="text-yellow-700 dark:text-yellow-400">
              Unable to load services from server. Showing default options.
            </p>
          </div>
        )}
        
        {!isLoading && servicesToRender.map((service, i) => (
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
    </main>
  );
};

export default LaundryOptions;
