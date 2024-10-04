"use client";

import { cleaning_man, laundry_side, vaccum_cleaning } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { cleaning } from "@/lib/laundry";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

type Props = {};

const CleaningPage = (props: Props) => {
  const [services, setServices] = useState(cleaning);
  const [frequency, setFrequency] = useState("Once A Week");

  const incrementExtraQuantity = (id: number) => {
    const updatedServices = services.map((service) => {
      if (service.id === id) {
        return { ...service, quantity: service.quantity + 1 };
      }
      return service;
    });
    setServices(updatedServices);
  };

  const decrementExtraQuantity = (id: number) => {
    const updatedServices = services.map((service) => {
      if (service.id === id && service.quantity > 0) {
        return { ...service, quantity: service.quantity - 1 };
      }
      return service;
    });
    setServices(updatedServices);
  };

  const totalService = services.reduce(
    (acc, service) => acc + service.price * service.quantity,
    0 || 0
  );

  const total =
    frequency === "Once A Week"
      ? totalService
      : frequency === "Twice A Week"
      ? totalService * 2
      : totalService * 3;
  return (
    <div className="pt-[123px] lg:pt-0">
      <main className="flex flex-col lg:flex-row items-center lg:justify-between">
        <aside className="relative z-10">
          <article className="md:max-w-[500px] lg:max-w-[513px] text-center lg:text-left">
            <h1 className=" font-inter font-semibold text-4xl md:text-5xl xl:text-[72px]">
              Cleaning...ugh, let&apos;s fix that.
            </h1>
            <p className="text-2xl xl:text-3xl font-league-spartan mt-7 lg:mt-9 max-w-[80%] lg:max-w-none mx-auto text-[#2d2929]">
              Because life is too short for boring chores.
            </p>
          </article>

          <div className="mt-[35px] w-fit mx-auto lg:mx-0">
            <Button className=" button-grad">Schedule Cleaning</Button>
          </div>
        </aside>

        <aside className="relative -mt-16 md:mt-10 lg:mt-0 ">
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

      <aside className="flex flex-col items-center lg:flex-row gap-10 lg:gap-4 lg:justify-between lg:items-center relative z-20">
        <div className=" max-w-[658px]">
          <h1 className=" font-league-spartan font-medium mb-8 text-2xl lg:text-[55px] text-center lg:text-left">
            Schedule HouseKeeping
          </h1>
          <p className=" font-inter text-[#4E4848 lg:text-2xl text-center lg:text-left">
            We offer thorough housekeeping service that includes sweeping,
            mopping, disinfecting, wiping surfaces, cobweb removal, floor and
            wall cleaning, cabinet care, dishwashing, and garbage
            disposal—leaving your home spotless
          </p>
        </div>
        <div>
          <Image
            src={cleaning_man}
            alt="Side"
            height={0}
            width={0}
            sizes="100vw"
            className="w-full max-w-[548px] h-[322px]  object-contain"
          />
        </div>
      </aside>

      <aside className="pt-20 relative z-20">
        <h1 className=" font-league-spartan font-medium text-[36px] text-center my-[35px]">
          Select your home type
        </h1>

        <div className="space-y-[35px]">
          {services.map((service) => (
            <div
              className="flex gap-2 justify-between items-center px-4 py-2 bg-[#F5F5F5] rounded-[10px] p-4"
              key={service.id}
            >
              <div className="min-w-[200px] max-w-[200px] font-league-spartan font-medium text-2xl">
                {service.title}
              </div>

              <div className="flex gap-4 items-center">
                <Button
                  onClick={() => decrementExtraQuantity(service.id)}
                  className="font-semibold text-xl bg-secondary text-black hover:bg-secondary"
                >
                  -
                </Button>
                <p className=" font-medium font-inter">{service.quantity}</p>
                <Button
                  onClick={() => incrementExtraQuantity(service.id)}
                  className="text-xl font-semibold text-white hover:bg-primary"
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-3 items-center font-league-spartan font-medium text-[36px] mt-20">
          <h1>Total Rooms</h1>
          <p>&#8358;{total}</p>
        </div>

        <div className="pt-20">
          <h1 className="text-[36px] font-league-spartan font-medium">
            Select Frequency
          </h1>

          <div className="flex gap-2 justify-start pt-6">
            <Button
              onClick={() => setFrequency("Once A Week")}
              className={cn(
                "border border-[#4E4848] rounded-[10px] text-xl bg-white text-[#4E4848]",
                frequency === "Once A Week" ? "border-primary border-2" : ""
              )}
            >
              Once A Week
            </Button>
            <Button
              onClick={() => setFrequency("Twice A Week")}
              className={cn(
                "border border-[#4E4848] rounded-[10px] text-xl bg-white text-[#4E4848]",
                frequency === "Twice A Week" ? "border-primary border-2" : ""
              )}
            >
              Twice A Week
            </Button>
            <Button
              onClick={() => setFrequency("Three Times A Week")}
              className={cn(
                "border border-[#4E4848] rounded-[10px] text-xl bg-white text-[#4E4848]",
                frequency === "Three Times A Week"
                  ? "border-primary border-2"
                  : ""
              )}
            >
              Three Times A Week
            </Button>
          </div>
        </div>
        <div className="pt-20">
          <h1 className="text-[36px] font-league-spartan font-medium">
            Cleaning Time
          </h1>

          <div className="flex gap-2 justify-start pt-6">
            <Button
              className={cn(
                "border border-[#4E4848] rounded-[10px] text-xl bg-white text-[#4E4848]"
              )}
            >
              8AM - 12PM
            </Button>
            <Button
              className={cn(
                "border border-[#4E4848] rounded-[10px] text-xl bg-white text-[#4E4848]"
              )}
            >
              12PM - 4PM
            </Button>
          </div>
        </div>

        <div className="my-20 mx-auto w-fit">
          <Button className=" button-grad">Schedule Cleaning</Button>
        </div>
      </aside>
    </div>
  );
};

export default CleaningPage;
