"use client";

import React, { useState } from "react";
import Script from "next/script";
import HeroSection from "./_components/hero-section-laundry";
import LaundryOptions from "./_components/laundry-options";
import ClothPrices from "./_components/cloth-pricing";
import ClothContainer from "./_components/cloth-container";

type Props = {};

const LaundryPage = (props: Props) => {
  const [selectedService, setSelectedService] = useState({
    count: 0,
    title: "Washed and Folded",
  });

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
    </div>
  );
};

export default LaundryPage;
