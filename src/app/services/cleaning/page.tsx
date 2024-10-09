"use client";

import { cleaning_man, laundry_side, vaccum_cleaning } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Cleaning, cleaning } from "@/lib/laundry";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Props = {};

const houseTypes = [
  {
    type: "Selfcon",
    rooms: 1,
    toilets: 1,
    livingRooms: 0,
    monthlyPrice: 25000,
    oneTimePrice: 10000,
  },
  {
    type: "1 bedroom flat",
    rooms: 1,
    toilets: 1,
    livingRooms: 1,
    monthlyPrice: 30000,
    oneTimePrice: 15000,
  },
  {
    type: "2 bedrooms flat",
    rooms: 2,
    toilets: 1,
    livingRooms: 1,
    monthlyPrice: 35000,
    oneTimePrice: 20000,
  },
  {
    type: "3 bedrooms flat",
    rooms: 3,
    toilets: 1,
    livingRooms: 1,
    monthlyPrice: 50000,
    oneTimePrice: 25000,
  },
  {
    type: "4 bedrooms flat",
    rooms: 4,
    toilets: 1,
    livingRooms: 1,
    monthlyPrice: 55000,
    oneTimePrice: 25000,
  },
  {
    type: "5 bedrooms flat",
    rooms: 5,
    toilets: 1,
    livingRooms: 1,
    monthlyPrice: 70000,
    oneTimePrice: 30000,
  },
  {
    type: "Mansion or Two floor buildings",
    rooms: 6,
    toilets: 2,
    livingRooms: 2,
    monthlyPrice: 100000,
    oneTimePrice: 50000,
  },
];

const CleaningPage = (props: Props) => {
  const [services, setServices] = useState<Cleaning[]>(cleaning);
  const [frequency, setFrequency] = useState("Once A Week");
  const [isOneTime, setIsOneTime] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getHouseType = () => {
    const rooms = services.find((s) => s.title === "Bedrooms")?.quantity || 0;
    const totalRooms = rooms;
    return houseTypes.find((h) => h.rooms === totalRooms) || houseTypes[0];
  };

  const calculateTotal = () => {
    const houseType = getHouseType();
    const basePrice = isOneTime
      ? houseType.oneTimePrice
      : houseType.monthlyPrice;

    const frequencyMultiplier =
      frequency === "Once A Week" ? 1 : frequency === "Twice A Week" ? 2 : 3;

    return basePrice * frequencyMultiplier;
  };

  const updateServicesAndTotal = (updatedServices: typeof services) => {
    setServices(updatedServices);
    // const newTotal = calculateTotal();
    // setTotal(newTotal);
  };

  const incrementExtraQuantity = (id: number, title: string) => {
    // Check if bedrooms are selected when trying to increment other services
    if (title !== "Bedrooms" && !selectedTitles.includes("Bedrooms")) {
      toast.warning("Please select the number of bedrooms first!");
      return;
    }

    const updatedServices = services.map((service) => {
      if (service.id === id) {
        return { ...service, quantity: service.quantity + 1 };
      }
      return service;
    });

    // Update selected titles if not already included
    if (!selectedTitles.includes(title)) {
      setSelectedTitles([...selectedTitles, title]);
    }

    updateServicesAndTotal(updatedServices);
  };

  const decrementExtraQuantity = (id: number, title: string) => {
    const updatedServices = services.map((service) => {
      if (service.id === id && service.quantity > 0) {
        // If quantity will become 0, remove the title from selectedTitles
        if (service.quantity === 1) {
          setSelectedTitles(selectedTitles.filter((t) => t !== title));
        }
        return { ...service, quantity: service.quantity - 1 };
      }
      return service;
    });

    updateServicesAndTotal(updatedServices);
  };

  // Update total when frequency, isOneTime, or services change
  const handleFetch = () => {
    setIsLoading(true);
    const bedroomsService = services.find((s) => s.title === "Bedrooms");
    if (bedroomsService && bedroomsService.quantity > 0) {
      const newTotal = calculateTotal();
      setTotal(newTotal);
    }
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2580);

    return () => clearTimeout(timeout);
  };

  return (
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

      <aside className="flex flex-col items-center lg:flex-row gap-10 lg:gap-4 lg:justify-between lg:items-center relative z-20 mt-32">
        <div className=" max-w-[658px]">
          <h1 className=" font-league-spartan font-medium mb-8 text-4xl lg:text-[55px] text-center lg:text-left">
            Schedule HouseKeeping
          </h1>
          <p className=" font-inter text-[#4E4848 text-lg lg:text-2xl text-center lg:text-left text-muted-foreground">
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

      <aside className="pt-20 relative z-20" id="select-rooms">
        <h1 className=" font-league-spartan font-medium text-[36px] text-center my-[35px]">
          Select your home type
        </h1>

        <div className="space-y-[35px]">
          {services.map((service) => (
            <div
              className="flex gap-2 justify-between items-center px-4 py-2 bg-[#F5F5F5] dark:bg-secondary rounded-[10px] p-4 dark:text-black"
              key={service.id}
            >
              <div className="md:min-w-[200px] md:max-w-[200px] font-league-spartan font-medium text-lg lg:text-2xl ">
                {service.title}
              </div>

              <div className="flex gap-4 items-center">
                <Button
                  onClick={() =>
                    decrementExtraQuantity(service.id, service.title)
                  }
                  className="font-semibold text-xl bg-secondary text-black hover:bg-secondary dark:bg-gray-600 dark:text-white"
                >
                  -
                </Button>
                <p className=" font-medium font-inter">{service.quantity}</p>
                <Button
                  onClick={() =>
                    incrementExtraQuantity(service.id, service.title)
                  }
                  className="text-xl font-semibold text-white hover:bg-primary"
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </div>

        <aside className="flex items-center justify-between gap-5 mt-5">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="one-time"
              checked={isOneTime}
              onCheckedChange={(checked) => setIsOneTime(checked as boolean)}
            />
            <label
              htmlFor="one-time"
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              One-time service (unchecked for monthly subscription)
            </label>
          </div>
          <Button
            className="hover:bg-primary button-grad"
            onClick={handleFetch}
          >
            Calculate
          </Button>
        </aside>

        <div className="flex justify-between gap-3 items-center font-league-spartan font-medium text-[36px] mt-20">
          <h1>Total {isOneTime ? "(one-time)" : "(monthly)"}</h1>
          {isLoading ? (
            <p>
              <Loader2 className="animate-spin dark:text-white" />
            </p>
          ) : (
            <p>&#8358;{total}</p>
          )}
        </div>

        <div className="pt-20">
          <h1 className="text-[36px] font-league-spartan font-medium">
            Select Frequency
          </h1>

          <div className="flex gap-2 justify-start pt-6 max-w-[calc(100vw-30px)] overflow-x-auto">
            <Button
              onClick={() => setFrequency("Three Times A Week")}
              className={cn(
                "border border-[#4E4848] rounded-[10px] text-xl bg-white text-[#4E4848] hover:bg-white/80",
                frequency === "Three Times A Week"
                  ? "border-primary border-2"
                  : ""
              )}
            >
              Three Times A Week
            </Button>

            <Button
              onClick={() => setFrequency("Twice A Week")}
              className={cn(
                "border border-[#4E4848] rounded-[10px] text-xl bg-white text-[#4E4848] hover:bg-white/80",
                frequency === "Twice A Week" ? "border-primary border-2" : ""
              )}
            >
              Twice A Week
            </Button>
            <Button
              onClick={() => setFrequency("Once A Week")}
              className={cn(
                "border border-[#4E4848] rounded-[10px] text-xl bg-white text-[#4E4848] hover:bg-white/80",
                frequency === "Once A Week" ? "border-primary border-2" : ""
              )}
            >
              Once A Week
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
                "border border-[#4E4848] rounded-[10px] text-xl bg-white text-[#4E4848] hover:bg-white/90"
              )}
            >
              8AM - 12PM
            </Button>
            <Button
              className={cn(
                "border border-[#4E4848] rounded-[10px] text-xl bg-white text-[#4E4848] hover:bg-white/90"
              )}
            >
              12PM - 4PM
            </Button>
          </div>
        </div>

        <div className="my-20 w-full flex justify-center">
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

export default CleaningPage;
