import { accent, curvy, side } from "@/assets/images";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <main className="flex flex-col lg:flex-row items-center lg:justify-between max-w-full overflow-x-hidden">
      <aside>
        <article className="md:max-w-[500px] lg:max-w-[513px] text-center lg:text-left">
          <h1 className=" font-inter font-semibold text-4xl md:text-5xl xl:text-[72px]">
            Your{" "}
            <div className="relative inline-flex">
              <p className=" text-primary">home</p>
              <Image
                src={accent}
                alt="Accent"
                height={38}
                width={34}
                className="absolute -top-4 -right-8"
              />
            </div>{" "}
            <br />
            deserves spa days too!
          </h1>
          <p className="text-lg lg:text-xl xl:text-2xl font-league-spartan mt-7 lg:mt-9 dark:text-muted-foreground max-w-[80%] mx-auto lg:mx-0">
            Enjoy professional home care service at your convenience ensuring a
            clean and comfortable living space.{" "}
          </p>
        </article>

        <div className="mt-[35px] w-fit mx-auto lg:mx-0">
          <Button className=" button-grad">Get Started</Button>
        </div>
      </aside>

      <aside className="relative -mt-8 md:mt-10 lg:mt-0">
        <Image
          src={side}
          alt="Illustration of household items and cleaning products"
          height={0}
          width={0}
          sizes="100vw"
          className="w-full h-[618px] max-w-[726px] object-contain relative z-10"
        />
        <Image
          src={curvy}
          alt="Decorative background curve"
          height={0}
          width={0}
          sizes="100vw"
          className="w-full h-[618px]  object-contain absolute bottom-2 -right-12 z-0"
        />
      </aside>
    </main>
  );
};

export default HeroSection;
