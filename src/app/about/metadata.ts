import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Serenity | Trusted Cleaning, Laundry & Home Services in Nigeria",
  description: "Learn about Serenity, Nigeria's trusted provider of cleaning, laundry, and home repair services. Discover our mission, values, and commitment to quality home care.",
  keywords: [
    "about Serenity", "about cleaning company", "trusted cleaning services", "about home cleaning", "about laundry services", "about repair services", "cleaning company Nigeria", "professional cleaners", "Serenity team", "Serenity mission", "Serenity values", "why choose Serenity", "best cleaning company Nigeria"
  ],
  openGraph: {
    title: "About Serenity | Trusted Cleaning, Laundry & Home Services in Nigeria",
    description: "Learn about Serenity, Nigeria's trusted provider of cleaning, laundry, and home repair services. Discover our mission, values, and commitment to quality home care.",
    url: "https://www.serenity.ng/about",
    siteName: "Serenity",
    images: [
      {
        url: "https://www.serenity.ng/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Serenity Cleaning Company",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Serenity | Trusted Cleaning, Laundry & Home Services in Nigeria",
    description: "Learn about Serenity, Nigeria's trusted provider of cleaning, laundry, and home repair services. Discover our mission, values, and commitment to quality home care.",
    images: ["https://www.serenity.ng/og-image.jpg"], // Using fallback image
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.serenity.ng/about",
  },
};