import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gift Serenity Services | Cleaning & Laundry in Nigeria",
  description: "Gift your loved ones professional cleaning, laundry, and home care services in Nigeria with Serenity. The perfect thoughtful gift for any occasion.",
  keywords: [
    "gift cleaning services", "gift laundry services", "gift home care", "gift Serenity", "gifting cleaning Nigeria", "gifting laundry Nigeria", "gifting home services", "gift a cleaner", "gift a laundry", "gift a repair", "gift for home", "gift for family Nigeria", "gift for friends Nigeria"
  ],
  openGraph: {
    title: "Gift Serenity Services | Cleaning & Laundry in Nigeria",
    description: "Gift your loved ones professional cleaning, laundry, and home care services in Nigeria with Serenity. The perfect thoughtful gift for any occasion.",
    url: "https://www.serenity.ng/gifting",
    siteName: "Serenity",
    images: [
      {
        url: "https://www.serenity.ng/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gift Cleaning Services Nigeria",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gift Serenity Services | Cleaning & Laundry in Nigeria",
    description: "Gift your loved ones professional cleaning, laundry, and home care services in Nigeria with Serenity. The perfect thoughtful gift for any occasion.",
    images: ["https://www.serenity.ng/og-image.jpg"], // Using fallback image
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.serenity.ng/gifting",
  },
};