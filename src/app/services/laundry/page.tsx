import { Metadata } from "next";
import Script from "next/script";
import LaundryPageClient from "./_components/laundry-page-client";

const laundryServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Laundry and Dry Cleaning Services",
  "description": "Professional laundry and dry cleaning services in Abuja including wash & fold, ironing, and special garment care with convenient pickup and delivery.",
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
  "serviceType": "Laundry Service",
  "areaServed": {
    "@type": "City",
    "name": "Abuja"
  }
};

export const metadata: Metadata = {
  title: "Laundry and Dry Cleaning Services in Nigeria | Serenity",
  description:
    "Convenient laundry and dry cleaning services in Nigeria by Serenity. We handle wash & fold, ironing, and special garment care with pickup and delivery.",
  keywords: [
    "laundry services Nigeria",
    "dry cleaning Nigeria",
    "wash and fold",
    "ironing services",
    "garment care Nigeria",
  ],
  openGraph: {
    title: "Laundry and Dry Cleaning Services in Nigeria | Serenity",
    description:
      "Convenient laundry and dry cleaning services in Nigeria by Serenity. We handle wash & fold, ironing, and special garment care with pickup and delivery.",
    url: "https://www.serenity.ng/services/laundry",
    siteName: "Serenity",
    images: [
      {
        url: "https://www.serenity.ng/og-image-laundry.jpg", // Assuming a specific OG image for laundry
        width: 1200,
        height: 630,
        alt: "Laundry and Dry Cleaning Services in Nigeria",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laundry and Dry Cleaning Services in Nigeria | Serenity",
    description:
      "Convenient laundry and dry cleaning services in Nigeria by Serenity. We handle wash & fold, ironing, and special garment care with pickup and delivery.",
    images: ["https://www.serenity.ng/twitter-image-laundry.jpg"], // Assuming a specific Twitter image for laundry
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.serenity.ng/services/laundry",
  },
};

type Props = {};

const LaundryPage = (props: Props) => {
  return (
    <>
      <Script
        id="laundry-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(laundryServiceSchema) }}
      />
      <LaundryPageClient />
    </>
  );
};

export default LaundryPage;
