import Image from "next/image";
import HeroSection from "./_components/hero-section";
import Numbers from "./_components/numbers";
import Services from "./_components/services";
import AboutUs from "./_components/about-us";
import FAQ from "./_components/faq";

export default function Home() {
  return (
    <main className="pb-5 ">
      <div className="mt-[128px]">
        <HeroSection />
      </div>
      {/* <div className="mt-12 md:mt-[130px]">
        <Numbers />
      </div> */}
      <div className="mt-40">
        <Services />
      </div>
      <div className=" my-[158px] ">
        <AboutUs />
      </div>
      <FAQ />
    </main>
  );
}
