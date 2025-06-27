import { Metadata } from "next";
import AboutPageClient from "./_components/about-page-client";

export const metadata: Metadata = {
  title: "About Serenity | Nigeria's Trusted Home Services",
  description:
    "Learn about Serenity, Nigeria's trusted provider of cleaning, laundry, and home repair. Discover our mission, values, and commitment to quality home care.",
  keywords: [
    "about Serenity",
    "about cleaning company",
    "trusted cleaning services",
    "about home cleaning",
    "about laundry services",
    "about repair services",
    "cleaning company Nigeria",
    "professional cleaners",
    "Serenity team",
    "Serenity mission",
    "Serenity values",
    "why choose Serenity",
    "best cleaning company Nigeria",
  ],
  openGraph: {
    title: "About Serenity | Nigeria's Trusted Home Services",
    description:
      "Learn about Serenity, Nigeria's trusted provider of cleaning, laundry, and home repair. Discover our mission, values, and commitment to quality home care.",
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
    title: "About Serenity | Nigeria's Trusted Home Services",
    description:
      "Learn about Serenity, Nigeria's trusted provider of cleaning, laundry, and home repair. Discover our mission, values, and commitment to quality home care.",
    images: ["https://www.serenity.ng/og-image.jpg"], // Using fallback image
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.serenity.ng/about",
  },
};

type Props = {};

const AboutPage = (props: Props) => {
  return <AboutPageClient />;
};

export default AboutPage;
