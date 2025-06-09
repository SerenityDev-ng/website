import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="my-16 max-w-3xl mx-auto" id="faq">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What cleaning services does Serenity offer in Abuja?</AccordionTrigger>
          <AccordionContent>
            Serenity provides full-service cleaning services in Abuja, including home cleaning, office cleaning, deep cleaning, carpet cleaning, pool cleaning, laundry, and minor handyman services. We're your trusted local partner for clean, functional, and serene spaces.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Are your cleaning services affordable in Abuja?</AccordionTrigger>
          <AccordionContent>
            Yes. Serenity is known for offering affordable cleaning services in Abuja without compromising on quality. We provide flexible pricing plans for one-time, weekly, or monthly cleaning services that fit your budget and lifestyle.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How do I book Serenity's cleaning services?</AccordionTrigger>
          <AccordionContent>
            You can easily book your cleaning in Abuja by visiting <a href="https://www.serenity.ng" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.serenity.ng</a>, choosing your service, and selecting a time that works for you. Alternatively, contact us via WhatsApp at <a href="https://wa.me/2348135518126" className="text-primary underline">0813 551 8126</a> or email <a href="mailto:mail@serenity.ng" className="text-primary underline">mail@serenity.ng</a> to schedule your service.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>What's included in Serenity's home cleaning services in Abuja?</AccordionTrigger>
          <AccordionContent>
            Our residential cleaning in Abuja includes dusting, vacuuming, mopping, bathroom sanitization, kitchen cleaning, trash disposal, and more. You can also add extras like laundry services, carpet shampooing, or deep cleaning for a full refresh.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Do you offer deep cleaning services in Abuja?</AccordionTrigger>
          <AccordionContent>
            Yes! Our Abuja deep cleaning service is perfect for move-ins, post-renovation cleanups, or seasonal refreshes. We clean behind appliances, sanitize surfaces, remove grime, and target hard-to-reach areas for a sparkling result.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>What office cleaning services do you provide in Abuja?</AccordionTrigger>
          <AccordionContent>
            We provide reliable office cleaning services in Abuja, including floor care, dusting, trash removal, restroom cleaning, and general sanitization. Whether you run a small office or a corporate space, we'll keep it clean and professional.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>Do you offer carpet cleaning services in Abuja?</AccordionTrigger>
          <AccordionContent>
            Yes, our carpet cleaning services in Abuja use eco-friendly solutions and professional equipment to remove dirt, stains, and odors from carpets and rugs in homes and offices.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>Can I get pool cleaning services in Abuja from Serenity?</AccordionTrigger>
          <AccordionContent>
            Absolutely. Serenity offers pool cleaning services in Abuja that cover water testing, vacuuming, surface skimming, and chemical treatment. We help you maintain a clean, safe, and inviting pool.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9">
          <AccordionTrigger>Do you offer maid services near me in Abuja?</AccordionTrigger>
          <AccordionContent>
            Yes! If you're searching for "maid services near me" or "house cleaning services near me" in Abuja, Serenity is your go-to provider. Our trained, background-checked cleaners are available in multiple districts within Abuja city.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-10">
          <AccordionTrigger>Why choose Serenity for cleaning services in Abuja?</AccordionTrigger>
          <AccordionContent>
            We are 100% focused on Abuja and understand the local lifestyle and client needs. Our cleaners are vetted, trustworthy, and trained for excellence. From homes to offices to pools, we help busy professionals and families live stress-free in clean, peaceful spaces.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
} 