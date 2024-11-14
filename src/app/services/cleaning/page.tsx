"use client";

import { Button } from "@/components/ui/button";
import { laundry_side, vaccum_cleaning } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CleaningCalculator from "./calculator";
import { cn } from "@/lib/utils";

type Props = {};

const CleaningPage = (props: Props) => {
  const [cleaningType, setCleaningType] = useState<string>("Housekeeping");
  const cleaningServices = [
    {
      title: "Housekeeping",
      description:
        "We offer thorough housekeeping service that includes sweeping, mopping, disinfecting, cobweb removal, floor and wall cleaning, dishwashing, and garbage disposal—leaving your home spotless.",
      image: "/first.png",
    },
    {
      title: "Post-construction cleaning",
      description:
        "Get every deep cleaning features, every surface dusted and polished, detailed fixture cleaning window and glass cleaning, paint spill removal and more, leaving no corner untouched!",
      image: "/second.png",
    },
    {
      title: "Janitorial cleaning",
      description:
        "It's the little things that keep a space looking great. Our janitorial team goes above and beyond to make sure your space is spotless and ready for a new day",
      image: "/third.png",
    },
    {
      title: "Fumigation",
      description:
        "Say goodbye to pests for good. Our fumigation service tackles unwanted guests at the source, creating a safe, pest-free environment for your home or business.",
      image: "/fourth.png",
    },
  ];

  return (
    <main className="relative">
      <div className="pt-[123px] lg:pt-0">
        <main className="flex flex-col lg:flex-row items-center lg:justify-between">
          <aside className="relative z-10">
            <article className="md:max-w-[500px] lg:max-w-[513px] text-center lg:text-left">
              <h1 className=" font-inter font-semibold text-4xl md:text-5xl xl:text-[72px]">
                Cleaning...ugh, let&apos;s fix that.
              </h1>
              <p className="text-lg lg:text-2xl xl:text-3xl font-league-spartan mt-7 lg:mt-9 max-w-[80%] lg:max-w-none mx-auto text-[#2d2929] dark:text-muted-foreground">
                Because life is too short for boring chores.
              </p>
            </article>

            <div className="mt-[35px] w-fit mx-auto lg:mx-0">
              <Link href={"/services/cleaning#select-rooms"}>
                <Button className=" button-grad">Schedule Cleaning</Button>
              </Link>
            </div>
          </aside>

          <aside className="relative -mt-5 md:mt-10 lg:mt-0 ">
            <Image
              src={vaccum_cleaning}
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
              className="w-fit h-[618px]  object-contain fixed -top-16 right-0 z-0  opacity-20 lg:opacity-100"
            />
          </aside>
        </main>
        <h1 className="relative text-2xl font-league-spartan font-medium lg:text-[55px] dark:text-primary text-black text-center py-8 pb-[131px]">
          Cleaning Service Options
        </h1>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 justify-center max-w-[885px] mx-auto">
          {cleaningServices.map((service, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-lg shadow-md max-w-[400px]",
                cleaningType === service.title && "border-primary border-2"
              )}
              onClick={() => setCleaningType(service.title)}
            >
              <Image
                src={service.image}
                alt={`${service.title} - Serenity Cleaning`}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[220px] object-cover"
              />
              <h2 className="text-lg font-league-spartan font-medium text-primary pt-5 px-4">
                {service.title}
              </h2>
              <p className="text-sm text-gray-500 pt-5 pb-14 px-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div>
          <CleaningCalculator cleaningType={cleaningType} />
        </div>
      </div>
    </main>
  );
};

export default CleaningPage;
