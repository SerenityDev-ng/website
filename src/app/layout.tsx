import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Serenity",
  description:
    "Elevate your lifestyle with Serenity's premium laundry, cleaning, and repair services. Experience convenience, quality, and peace of mind in one seamless platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="max-w-full">
      <body className={` antialiased w-full overflow-x-hidden !max-w-[100vw] `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="max-w-screen-xl mx-auto px-5 md:px-8 xl:px-5 dark:text-white">
            {children}
          </div>
          <Footer />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
