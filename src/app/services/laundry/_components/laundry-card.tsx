"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import type { LaundryType } from "@/hooks/useBookLaundry";

type Props = {
  image: StaticImageData;
  title: string;
  heading: string;
  setSelectedService: React.Dispatch<
    React.SetStateAction<{ count: number; title: string }>
  >;
  selectedService: { count: number; title: string };
  index: number;
};

const LaundryCard = ({
  image,
  title,
  heading,
  setSelectedService,
  selectedService,
  index,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Map heading to LaundryType
  const getFilterType = (heading: string): LaundryType | undefined => {
    switch (heading) {
      case "Washed and Folded":
        return "WASHED_FOLDED";
      case "Washed and Ironed":
        return "WASHED_IRONED";
      case "Iron Only":
        return "IRONED";
      default:
        return undefined;
    }
  };
  
  const handleCardClick = () => {
    // Set local state for visual feedback
    setSelectedService({ count: index, title: heading });
    
    // Update URL parameters for filtering
    const filterType = getFilterType(heading);
    const params = new URLSearchParams(searchParams.toString());
    
    if (filterType) {
      params.set('filter', filterType);
    } else {
      params.delete('filter');
    }
    
    // Navigate to calculator section with filter
    router.push(`/services/laundry?${params.toString()}#calculator`);
  };
  
  return (
    <div>
      <main
        onClick={handleCardClick}
        className={cn(
          "border border-[#C0B8B8] rounded-[10px] max-w-[391px] h-[509px] overflow-hidden  backdrop-blur-md bg-white/40 dark:bg-secondary hover:border-primary cursor-pointer",
          selectedService.title === heading && "border-primary border-2"
        )}
      >
        <Image
          src={image}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className="h-[262px] w-full object-contain -mt-4"
        />
        <div className="p-5 py-8 text-[#4E4848]">
          <p className="text-lg md:text-2xl font-league-spartan font-medium">
            {heading}
          </p>
          <p className=" text-[#4E4848] font-inter mt-2">{title}</p>
        </div>
      </main>
    </div>
  );
};

export default LaundryCard;
