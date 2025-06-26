import { Metadata } from "next";
import RepairPageClient from "./_components/repair-page-client";

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
  return <RepairPageClient />;
};

export default RepairPage;
