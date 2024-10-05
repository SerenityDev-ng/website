import React from "react";
import HeroSection from "./_components/hero-section-laundry";
import LaundryOptions from "./_components/laundry-options";
import ClothPrices from "./_components/cloth-pricing";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="pt-[120px] pb-[200px]">
      <HeroSection />

      <div className="relative z-10">
        <LaundryOptions />
      </div>
      <div className="pt-[120px] relative z-20" id="select-clothes">
        <ClothPrices />
      </div>
    </div>
  );
};

export default page;
