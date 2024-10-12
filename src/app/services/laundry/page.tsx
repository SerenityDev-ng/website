"use client";

import React, { useState } from "react";
import HeroSection from "./_components/hero-section-laundry";
import LaundryOptions from "./_components/laundry-options";
import ClothPrices from "./_components/cloth-pricing";
import ClothContainer from "./_components/cloth-container";

type Props = {};

const LaundryPage = (props: Props) => {
  const [selectedService, setSelectedService] = useState("Washed and Folded");
  return (
    <div className="pt-[120px] pb-[200px]">
      <HeroSection />

      <div className="relative z-10">
        <LaundryOptions
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      </div>
      <div className="pt-[120px] relative z-20 ">
        <ClothContainer
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      </div>
    </div>
  );
};

export default LaundryPage;
