import { laundry_side, washing_machine } from "@/assets/images";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div>
      <main className="flex flex-col lg:flex-row items-center lg:justify-between">
        <aside className="relative z-10">
          <article className="md:max-w-[500px] lg:max-w-[513px] text-center lg:text-left">
            <h1 className=" font-inter font-semibold text-4xl md:text-5xl xl:text-[72px]">
              Laundry day? let us handle it!
            </h1>
            <p className=" text-lg lg:text-2xl xl:text-3xl font-league-spartan mt-7 lg:mt-9 max-w-[80%] lg:max-w-none mx-auto">
              Dirty laundry; picked up, cleaned and delivered in 48 hours or
              less.
            </p>
          </article>

          <div className="mt-[35px] w-fit mx-auto lg:mx-0">
            <Button className=" button-grad">Schedule Pickup</Button>
          </div>
        </aside>

        <aside className="relative -mt-16 md:mt-10 lg:mt-0">
          <Image
            src={washing_machine}
            alt="Side"
            height={0}
            width={0}
            sizes="100vw"
            className="w-full h-[618px] max-w-[726px] object-contain relative z-10"
          />
          <Image
            src={laundry_side}
            alt="Side"
            height={0}
            width={0}
            sizes="100vw"
            className="w-fit h-[618px]  object-contain fixed -top-16 right-0 z-0 opacity-20 lg:opacity-100"
          />
        </aside>
      </main>
    </div>
  );
};

export default HeroSection;
