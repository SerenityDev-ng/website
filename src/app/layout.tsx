import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { serenity_logo } from "@/assets/images";
import ReactQueryWrapper from "@/hooks/react-query-wrapper";

export const metadata: Metadata = {
  title: "Cleaning Services, Carpet Cleaning, Office & Home Cleaning in Nigeria | Serenity",
  description:
    "Serenity offers professional cleaning services in Nigeria: carpet cleaning, office cleaning, house cleaning, laundry, gutter cleaning, air duct cleaning, and more. Book trusted cleaners near you for residential, commercial, and specialty cleaning needs.",
  keywords: [
    // Main Keywords (Short & Broad)
    "carpet cleaner", "steam cleaner", "cleaning services", "carpet cleaning", "ultrasonic cleaner", "cleaners near me", "dry cleaning near me", "upholstery cleaner", "gutter cleaning", "washing machine cleaner", "self cleaning litter box", "laundry service near me", "microfiber cloth", "dryer vent cleaning", "cleaning services near me", "car cleaning kit", "carpet cleaning near me", "air duct cleaning", "house cleaning", "house cleaning services", "dry cleaning", "oven cleaner", "mold removal", "grout cleaner", "pressure washing", "best carpet cleaner", "duct cleaning", "window cleaning", "drain cleaning", "house cleaning services near me", "cleaning supplies", "house cleaners near me", "gutter cleaning near me", "cleaning products", "swedish death cleaning", "home cleaning services", "home cleaning", "office cleaning", "carpet cleaners near me", "pressure washing near me", "commercial cleaning", "cleaning company", "floor scrubber", "spring cleaning", "commercial cleaning services", "rug cleaning", "septic tank cleaning", "roof cleaning", "car cleaning near me", "air duct cleaning near me", "carpet cleaning services", "janitorial services", "upholstery cleaning", "house cleaning near me", "solar panel cleaning", "window cleaning near me", "duct cleaning near me", "car cleaning", "cleaning tools", "bathroom cleaning",
    // Long Tail Keywords
    "office cleaning services", "floor cleaning machine", "dryer vent cleaning near me", "rug cleaning near me", "home cleaning services near me", "power washing near me", "deep cleaning services", "professional carpet cleaning", "maid service near me", "drain cleaning near me", "dryer vent cleaning kit", "professional cleaning services", "roof cleaning near me", "cleaning company near me", "cleaning washing machine", "post construction cleaning", "mold remediation near me", "bathroom cleaning services", "sofa cleaning services", "septic tank cleaning near me",
    // Commercial Intent Keywords
    "office cleaning", "commercial cleaning", "commercial cleaning services", "janitorial services", "office cleaning services", "commercial carpet cleaning", "office cleaning supplies near me", "janitorial cleaning", "commercial cleaning company", "commercial cleaners", "commercial cleaning near me", "janitorial cleaning services", "commercial cleaning services near me", "commercial carpet cleaning services", "office cleaning companies", "business cleaning services", "medical office cleaning", "commercial kitchen cleaning", "commercial disinfectant cleaning services", "commercial cleaning and sanitizing services",
    // Informational Intent Keywords
    "what is dry cleaning", "how does dry cleaning work", "how to start a cleaning business", "is duct cleaning a waste of money", "how long does dry cleaning take", "what licenses are needed to start a cleaning business", "how much does dry cleaning cost", "what is commercial cleaning", "what is the best homemade window cleaning solution", "how much is dry cleaning", "what is cleaning", "how much does gutter cleaning cost", "how to start cleaning business", "what is the best homemade carpet cleaning solution for machines", "what is the difference between cleaning and sanitizing", "how much does duct cleaning cost", "how to start your own cleaning business", "how does self cleaning oven work", "how much does carpet cleaning cost", "how much does air duct cleaning cost"
  ],
  openGraph: {
    title: "Cleaning Services, Carpet Cleaning, Office & Home Cleaning in Nigeria | Serenity",
    description:
      "Book professional cleaning, carpet cleaning, office cleaning, and laundry services in Nigeria with Serenity. Trusted cleaners for homes and businesses.",
    url: "https://www.serenity.ng/",
    siteName: "Serenity",
    images: [
      {
        url: "https://www.serenity.ng/og-image.jpg", // Replace with your actual image URL
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
    title: "Cleaning Services, Carpet Cleaning, Office & Home Cleaning in Nigeria | Serenity",
    description:
      "Book professional cleaning, carpet cleaning, office cleaning, and laundry services in Nigeria with Serenity. Trusted cleaners for homes and businesses.",
    images: [serenity_logo], // Replace with your actual image URL
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.serenity.ng/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="max-w-full overflow-x-hidden w-full">
      <body className="antialiased ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryWrapper>
            <Navbar />

            <main className="relative">
              <div className="max-w-screen-xl mx-auto px-5 md:px-8 xl:px-5 dark:text-white font-inter">
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
