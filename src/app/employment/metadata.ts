import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Serenity | Join Our Team in Nigeria",
  description: "Explore job opportunities at Serenity. We're looking for passionate individuals to join our cleaning, laundry, and home services team in Nigeria.",
  keywords: [
    "careers", "jobs", "employment", "Serenity careers", "home services jobs Nigeria"
  ],
  openGraph: {
    title: "Careers at Serenity | Join Our Team in Nigeria",
    description: "Explore job opportunities at Serenity. We're looking for passionate individuals to join our cleaning, laundry, and home services team in Nigeria.",
    url: "https://www.serenity.ng/employment",
    siteName: "Serenity",
    images: [
      {
        url: "https://www.serenity.ng/og-image.jpg", // Assuming a default OG image
        width: 1200,
        height: 630,
        alt: "Careers at Serenity",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Serenity | Join Our Team in Nigeria",
    description: "Explore job opportunities at Serenity. We're looking for passionate individuals to join our cleaning, laundry, and home services team in Nigeria.",
    images: ["https://www.serenity.ng/twitter-image.jpg"], // Assuming a default Twitter image
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.serenity.ng/employment",
  },
};
