import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { serenity_logo } from "@/assets/images";
import ReactQueryWrapper from "@/hooks/react-query-wrapper";

export const metadata: Metadata = {
  title: "Serenity | Premium Laundry, Cleaning & Repair Services",
  description:
    "Elevate your lifestyle with Serenity's premium laundry, cleaning, and repair services in Nigeria. Experience convenience, quality, and peace of mind in one seamless platform.",
  keywords: [
    "Serenity",
    "laundry services",
    "cleaning services",
    "repair services",
    "Nigeria",
    "convenience",
    "premium services",
  ],
  openGraph: {
    title: "Serenity | Premium Laundry, Cleaning & Repair Services",
    description:
      "Experience premium laundry, cleaning, and repair services with Serenity. Elevate your lifestyle today!",
    url: "https://www.serenity.ng",
    siteName: "Serenity",
    images: [
      {
        url: "https://serenity.ng/og-image.jpg", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Serenity - Premium Services",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serenity | Premium Laundry, Cleaning & Repair Services",
    description:
      "Experience premium laundry, cleaning, and repair services with Serenity. Elevate your lifestyle today!",
    images: [serenity_logo], // Replace with your actual image URL
  },
  robots: "index, follow",
  alternates: {
    canonical: "./",
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
