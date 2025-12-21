import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { serenity_logo } from "@/assets/images";
import ReactQueryWrapper from "@/hooks/react-query-wrapper";
import Script from "next/script";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "Serenity",
  url: "https://www.serenity.ng",
  logo: "https://www.serenity.ng/logo.svg",
  description: "Professional cleaning, laundry, and home repair services in Abuja, Nigeria. Trusted local experts for residential and commercial needs.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Abuja",
    addressLocality: "Abuja",
    addressRegion: "FCT",
    postalCode: "900001",
    addressCountry: "NG"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "9.0765",
    longitude: "7.3986"
  },
  areaServed: {
    "@type": "City",
    name: "Abuja",
    "@id": "https://en.wikipedia.org/wiki/Abuja"
  },
  priceRange: "$$",
  telephone: "+2348135518126",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+2348135518126",
    contactType: "Customer Service",
    email: "mail@serenity.ng",
    availableLanguage: ["English"]
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "17:00"
    }
  ],
  sameAs: [
    "https://www.instagram.com/serenity.ng_official",
    "https://wa.me/2348135518126",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Serenity",
  url: "https://www.serenity.ng",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.serenity.ng/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  title: {
    default: "Serenity | Cleaning, Laundry & Home Repair in Nigeria",
    template: "%s | Serenity",
  },
  description:
    "Serenity offers professional cleaning, laundry, and home repair services in Nigeria. Book trusted experts for your residential and commercial needs.",
  openGraph: {
    title: "Serenity | Cleaning, Laundry & Home Repair in Nigeria",
    description:
      "Serenity offers professional cleaning, laundry, and home repair services in Nigeria. Book trusted experts for your residential and commercial needs.",
    url: "https://www.serenity.ng/",
    siteName: "Serenity",
    images: [
      {
        url: "https://www.serenity.ng/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Serenity - Cleaning Services in Nigeria",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serenity | Cleaning, Laundry & Home Repair in Nigeria",
    description:
      "Serenity offers professional cleaning, laundry, and home repair services in Nigeria. Book trusted experts for your residential and commercial needs.",
    images: [serenity_logo],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.serenity.ng/",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="max-w-full overflow-x-hidden w-full">
      <head>
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T37ZZQB2BN"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T37ZZQB2BN');
            `,
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryWrapper>
            <Navbar />
            <main className="relative">
              <div className="max-w-screen-xl mx-auto px-5 md:px-8 xl:px-5 font-inter">
                {children}
              </div>
              <Footer />
              <Toaster richColors />
            </main>
          </ReactQueryWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
