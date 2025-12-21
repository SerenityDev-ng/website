import Image from "next/image";
import Script from "next/script";
import HeroSection from "./_components/hero-section";
import Numbers from "./_components/numbers";
import Services from "./_components/services";
import AboutUs from "./_components/about-us";
import FAQ from "./_components/faq";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What cleaning services does Serenity offer in Abuja?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Serenity provides full-service cleaning services in Abuja, including home cleaning, office cleaning, deep cleaning, carpet cleaning, pool cleaning, laundry, and minor handyman services. We're your trusted local partner for clean, functional, and serene spaces."
      }
    },
    {
      "@type": "Question",
      "name": "Are your cleaning services affordable in Abuja?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Serenity is known for offering affordable cleaning services in Abuja without compromising on quality. We provide flexible pricing plans for one-time, weekly, or monthly cleaning services that fit your budget and lifestyle."
      }
    },
    {
      "@type": "Question",
      "name": "How do I book Serenity's cleaning services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can easily book your cleaning in Abuja by visiting www.serenity.ng, choosing your service, and selecting a time that works for you. Alternatively, contact us via WhatsApp at 0813 551 8126 or email mail@serenity.ng to schedule your service."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in Serenity's home cleaning services in Abuja?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our residential cleaning in Abuja includes dusting, vacuuming, mopping, bathroom sanitization, kitchen cleaning, trash disposal, and more. You can also add extras like laundry services, carpet shampooing, or deep cleaning for a full refresh."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer deep cleaning services in Abuja?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Our Abuja deep cleaning service is perfect for move-ins, post-renovation cleanups, or seasonal refreshes. We clean behind appliances, sanitize surfaces, remove grime, and target hard-to-reach areas for a sparkling result."
      }
    },
    {
      "@type": "Question",
      "name": "What office cleaning services do you provide in Abuja?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We provide reliable office cleaning services in Abuja, including floor care, dusting, trash removal, restroom cleaning, and general sanitization. Whether you run a small office or a corporate space, we'll keep it clean and professional."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer carpet cleaning services in Abuja?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our carpet cleaning services in Abuja use eco-friendly solutions and professional equipment to remove dirt, stains, and odors from carpets and rugs in homes and offices."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get pool cleaning services in Abuja from Serenity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Serenity offers pool cleaning services in Abuja that cover water testing, vacuuming, surface skimming, and chemical treatment. We help you maintain a clean, safe, and inviting pool."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer maid services near me in Abuja?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! If you're searching for 'maid services near me' or 'house cleaning services near me' in Abuja, Serenity is your go-to provider. Our trained, background-checked cleaners are available in multiple districts within Abuja city."
      }
    },
    {
      "@type": "Question",
      "name": "Why choose Serenity for cleaning services in Abuja?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are 100% focused on Abuja and understand the local lifestyle and client needs. Our cleaners are vetted, trustworthy, and trained for excellence. From homes to offices to pools, we help busy professionals and families live stress-free in clean, peaceful spaces."
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
    </>
  );
}
