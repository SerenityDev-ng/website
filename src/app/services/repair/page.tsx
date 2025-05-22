"use client";

import {
  book_carpenter,
  book_electrician,
  book_mason,
  book_painter,
  book_plumber,
  laundry_side,
  repair_man,
} from "@/assets/images";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsExclamation } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

type Props = {};

interface Service {
  id: number;
  image: StaticImageData;
  title: string;
  text: string;
  price: number;
}

const RepairPage = (props: Props) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const repairServices = [
    {
      id: 1,
      image: book_electrician,
      title: "Book Electrician",
      text: "Power problems? Book an electrician and get back to bright and beautiful.",
      price: 4000,
    },
    {
      id: 2,
      image: book_plumber,
      title: "Book Plumber",
      text: "Leaky faucet? Book a plumber today and let us handle the drips!",
      price: 7000,
    },
    {
      id: 3,
      image: book_carpenter,
      title: "Book Carpenter",
      text: "From repairs to renovations, we've got the tools",
      price: 6000,
    },
    {
      id: 4,
      image: book_painter,
      title: "Book Painter",
      text: "Let's add some color to your world! Schedule a painter for expert finishing",
      price: 9000,
    },
    {
      id: 5,
      image: book_mason,
      title: "Book Mason",
      text: "Solid work starts with a skilled mason! Book yours today!",
      price: 12000,
    },
  ];

  return (
    <div className="py-10 lg:pt-0 ">
      <main className="flex flex-col lg:flex-row items-center lg:justify-between">
        <aside className="relative">
          <article className="md:max-w-[500px] lg:max-w-[513px] text-center lg:text-left">
            <h1 className=" font-inter font-semibold text-4xl md:text-5xl xl:text-[72px]">
              Repairs you can rely on any day.
            </h1>
            <p className="text-lg lg:text-3xl font-league-spartan mt-7 lg:mt-9 max-w-[80%] lg:max-w-none mx-auto text-[#4E4848] dark:text-muted-foreground">
              Quality repairs at your finger tip.
            </p>
          </article>

          <div className="mt-[35px] w-fit mx-auto lg:mx-0">
            <Link href={"/services/repair#select-service"}>
              <Button className=" button-grad">Schedule Repairs</Button>
            </Link>
          </div>
        </aside>

        <aside className="relative -mt-16 md:mt-10 lg:mt-0 ">
          <Image
            src={repair_man}
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

      <aside className="mt-[120px] relative z-20">
        <h1 className="font-league-spartan font-medium text-4xl lg:text-[55px]">
          Schedule Repair Service
        </h1>

        <p className=" text-[#4E4848] font-inter text-lg py-3 w-full max-w-[420px] dark:text-muted-foreground">
          Ready to tackle those home repairs? We understand that your home is
          your sanctuary, that why our dedicated team is here to help—ensuring
          your space is not only functional but a true reflection of your style!
        </p>
      </aside>

      <aside className="mt-20 relative z-20" id="select-service">
        <h1 className=" font-league-spartan font-medium text-center text-4xl lg:text-[55px]">
          Select Repair Service Option
        </h1>

        <div className="flex flex-wrap gap-5 mt-20 justify-center lg:justify-start">
          {repairServices.map((service, i) => (
            <div
              onClick={() => setSelectedService(service)}
              key={service.id}
              className={cn(
                "max-w-[391px] cursor-pointer h-[509px] rounded-[10px] border border-[#C0B8B8] overflow-hidden backdrop-blur-md bg-white/40 duration-300 dark:!bg-background",
                selectedService?.title === service.title
                  ? "border-primary border-2"
                  : "",
                i % 2 === 0 ? "hover:rotate-12" : "hover:-rotate-12",
                "dark:!bg-secondary"
              )}
            >
              <Image
                src={service.image}
                alt={service.title}
                height={0}
                width={0}
                className="w-full h-[262px]"
              />
              <h1 className=" font-league-spartan font-medium py-3 text-2xl px-2 dark:text-black">
                {service.title}
              </h1>
              <p className=" text-[#4E4848] px-2">{service.text}</p>
            </div>
          ))}
        </div>
      </aside>

      <aside className="mt-20 relative z-20">
        <div className="px-6">
          <div className="border border-[#12121980] dark:border-secondary flex gap-3 items-center w-fit mx-auto rounded-full p-2 ">
            <div className=" bg-secondary p-1 rounded-full">
              <BsExclamation className="text-primary" size={43} />
            </div>
            <p>
              We will provide your service 24 hours after receiving your order.{" "}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-3 text-2xl max-w-[80%] mx-auto font-league-spartan mt-9">
          <p>Total</p>

          <p>&#8358;{selectedService?.price ?? 0}</p>
        </div>

        <div className=" my-24 w-full flex justify-center">
          <Link href="https://calendly.com/serenityvimo/30min" target="__blank">
            <Button className=" button-grad text-white w-full max-w-[350px] gap-4 px-12">
              Schedule Pickup
              <FaArrowRight />
            </Button>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default RepairPage;
