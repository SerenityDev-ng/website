"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  image: StaticImageData;
  title: string;
  heading: string;
  setSelectedService: React.Dispatch<React.SetStateAction<string>>;
  selectedService: string;
};

const LaundryCard = ({
  image,
  title,
  heading,
  setSelectedService,
  selectedService,
}: Props) => {
  return (
    <main
      onClick={() => setSelectedService(heading)}
      className={cn(
        "border border-[#C0B8B8] rounded-[10px] max-w-[391px] h-[509px] overflow-hidden  backdrop-blur-md bg-white/40 dark:bg-secondary hover:border-primary",
        selectedService === heading && "border-primary border-2"
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
  );
};

export default LaundryCard;
