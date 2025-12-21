import { Metadata } from "next";
import Script from "next/script";
import CleaningPageClient from "./_components/cleaning-page-client";

const cleaningServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Professional Cleaning Services",
  "description": "Comprehensive cleaning services in Abuja including home cleaning, office cleaning, deep cleaning, housekeeping, post-construction cleaning, janitorial services, and fumigation.",
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
  "serviceType": "Cleaning Service",
  "areaServed": {
    "@type": "City",
    "name": "Abuja"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Cleaning Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Home Cleaning",
          "description": "Professional residential cleaning services for homes and apartments"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Office Cleaning",
          "description": "Commercial cleaning services for offices and workspaces"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Deep Cleaning",
          "description": "Intensive deep cleaning for move-ins, post-renovation, and seasonal refreshes"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Carpet Cleaning",
          "description": "Professional carpet and rug cleaning with eco-friendly solutions"
        }
      }
    ]
  }
};

export const metadata: Metadata = {
  title: "Professional Cleaning Services in Nigeria | Serenity",
  description:
    "Book top-rated home & office cleaning in Nigeria with Serenity. We offer housekeeping, deep cleaning, post-construction, janitorial, and fumigation services.",
  keywords: [
    "cleaning services Nigeria",
    "home cleaning",
    "office cleaning",
    "deep cleaning",
    "housekeeping",
    "janitorial services",
    "fumigation Nigeria",
  ],
  openGraph: {
    title: "Professional Cleaning Services in Nigeria | Serenity",
    description:
      "Book top-rated home & office cleaning in Nigeria with Serenity. We offer housekeeping, deep cleaning, post-construction, janitorial, and fumigation services.",
    url: "https://www.serenity.ng/services/cleaning",
    siteName: "Serenity",
    images: [
      {
        url: "https://www.serenity.ng/og-image-cleaning.jpg", // Assuming a specific OG image for cleaning
        width: 1200,
        height: 630,
        alt: "Professional Cleaning Services in Nigeria",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Cleaning Services in Nigeria | Serenity",
    description:
      "Book top-rated home & office cleaning in Nigeria with Serenity. We offer housekeeping, deep cleaning, post-construction, janitorial, and fumigation services.",
    images: ["https://www.serenity.ng/twitter-image-cleaning.jpg"], // Assuming a specific Twitter image for cleaning
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.serenity.ng/services/cleaning",
  },
};
type Props = {};

const CleaningPage = (props: Props) => {
  return (
    <>
      <Script
        id="cleaning-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cleaningServiceSchema) }}
      />
      <CleaningPageClient />
    </>
  );
};

export default CleaningPage;
