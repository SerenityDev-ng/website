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
  "@type": "Organization",
  name: "Serenity",
  url: "https://www.serenity.ng",
  logo: "https://www.serenity.ng/logo.svg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+2348135518126",
    contactType: "Customer Service",
    email: "mail@serenity.ng",
  },
  sameAs: [
    "https://www.instagram.com/serenity.ng_official",
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
    default: "Serenity | Cleaning Services, Laundry Services, Office & Home Cleaning in Nigeria",
    template: "%s | Serenity",
  },
  description:
    "Serenity offers professional cleaning services in Nigeria: carpet cleaning, office cleaning, house cleaning, laundry, gutter cleaning, air duct cleaning, and more. Book trusted cleaners near you for residential, commercial, and specialty cleaning needs.",
  openGraph: {
    title: "Serenity | Cleaning Services, Laundry Services, Office & Home Cleaning in Nigeria",
    description:
      "Book professional cleaning, carpet cleaning, office cleaning, and laundry services in Nigeria with Serenity. Trusted cleaners for homes and businesses.",
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
    title: "Serenity |Home Cleaning in Nigeria",
    description:
      "Book professional cleaning, carpet cleaning, office cleaning, and laundry services in Nigeria with Serenity. Trusted cleaners for homes and businesses.",
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
