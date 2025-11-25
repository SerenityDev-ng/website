import { Metadata } from "next";
import Script from "next/script";
import RepairPageClient from "./_components/repair-page-client";

const repairServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Home Repair and Maintenance Services",
  "description": "Professional home repair services in Abuja including electrical work, plumbing, carpentry, painting, and masonry for all your home maintenance needs.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Serenity",
    "url": "https://www.serenity.ng",
    "telephone": "+2348135518126",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Abuja",
      "addressRegion": "FCT",
      "addressCountry": "NG"
    }
  },
  "serviceType": "Home Repair",
  "areaServed": {
    "@type": "City",
    "name": "Abuja"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Repair Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Electrical Services",
          "description": "Professional electrician services for repairs and installations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Plumbing Services",
          "description": "Expert plumbing repairs and maintenance"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Carpentry Services",
          "description": "Skilled carpentry work for home improvements"
        }
      }
    ]
  }
};

export const metadata: Metadata = {
  title: "Home Repair Services in Nigeria | Serenity",
  description:
    "Reliable home repair services in Nigeria. Serenity offers electricians, plumbers, carpenters, painters, and masons for all your home maintenance needs.",
  keywords: [
    "home repair Nigeria",
    "electrician Nigeria",
    "plumber Nigeria",
    "carpenter Nigeria",
    "painter Nigeria",
    "masonry services",
  ],
  openGraph: {
    title: "Home Repair Services in Nigeria | Serenity",
    description:
      "Reliable home repair services in Nigeria. Serenity offers electricians, plumbers, carpenters, painters, and masons for all your home maintenance needs.",
    url: "https://www.serenity.ng/services/repair",
    siteName: "Serenity",
    images: [
      {
        url: "https://www.serenity.ng/og-image-repair.jpg", // Assuming a specific OG image for repair
        width: 1200,
        height: 630,
        alt: "Home Repair Services in Nigeria",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Repair Services in Nigeria | Serenity",
    description:
      "Reliable home repair services in Nigeria. Serenity offers electricians, plumbers, carpenters, painters, and masons for all your home maintenance needs.",
    images: ["https://www.serenity.ng/twitter-image-repair.jpg"], // Assuming a specific Twitter image for repair
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.serenity.ng/services/repair",
  },
};

type Props = {};

const RepairPage = (props: Props) => {
  return (
    <>
      <Script
        id="repair-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(repairServiceSchema) }}
      />
      <RepairPageClient />
    </>
  );
};

export default RepairPage;
