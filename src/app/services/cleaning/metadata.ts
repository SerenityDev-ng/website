import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Cleaning Services in Nigeria | Serenity",
  description: "Book top-rated home & office cleaning in Nigeria with Serenity. We offer housekeeping, deep cleaning, post-construction, janitorial, and fumigation services.",
  keywords: [
    "cleaning services Nigeria", "home cleaning", "office cleaning", "deep cleaning", "housekeeping", "janitorial services", "fumigation Nigeria"
  ],
  openGraph: {
    title: "Professional Cleaning Services in Nigeria | Serenity",
    description: "Book top-rated home & office cleaning in Nigeria with Serenity. We offer housekeeping, deep cleaning, post-construction, janitorial, and fumigation services.",
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
    description: "Book top-rated home & office cleaning in Nigeria with Serenity. We offer housekeeping, deep cleaning, post-construction, janitorial, and fumigation services.",
    images: ["https://www.serenity.ng/twitter-image-cleaning.jpg"], // Assuming a specific Twitter image for cleaning
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.serenity.ng/services/cleaning",
  },
};