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
import DrawerDialog from "@/app/_components/drawer-dialog";
import CleaningServiceForm from "@/app/_components/forms/cleaning";

type Props = {
  cleaningType: string;
};

const PRICING_DATA = {
  oneTime: {
    selfcon: 25000,
    oneBedroomFlat: 35000,
    twoBedroomFlat: 40000,
    threeBedroomFlat: 55000,
    fourBedroomFlat: 65000,
    fiveBedroomFlat: 75000,
    mansion: 100000,
  },
  deep: {
    flat: {
      oneTime: [
        { rooms: 1, price: 50000 },
        { rooms: 2, price: 70000 },
        { rooms: 3, price: 110000 },
        { rooms: 4, price: 120000 },
        { rooms: 5, price: 140000 },
      ],
    },
  },
};

const CleaningCalculator = ({ cleaningType }: Props) => {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState<Cleaning[]>(cleaning);
  const [frequency, setFrequency] = useState("Once A Week");
  const [isOneTime, setIsOneTime] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buildingType, setBuildingType] = useState<"flat" | "duplex">("flat");
  const [cleaningHouse, setCleaningHouse] = useState<"detailed" | "deep">(
    "detailed"
  );
  const [time, setTime] = useState("8am - 12pm");

  const calculateTotal = () => {
    const rooms = services.find((s) => s.title === "Bedrooms")?.quantity || 0;
    if (rooms === 0) return 0;

    let basePrice = 0;

    // Determine base price based on selected cleaning type
    if (cleaningType === "deep") {
      // For deep cleaning, use one-time pricing
      if (rooms === 1) basePrice = PRICING_DATA.oneTime.selfcon;
      else if (rooms === 2) basePrice = PRICING_DATA.oneTime.oneBedroomFlat;
      else if (rooms === 3) basePrice = PRICING_DATA.oneTime.twoBedroomFlat;
      else if (rooms === 4) basePrice = PRICING_DATA.oneTime.threeBedroomFlat;
      else if (rooms === 5) basePrice = PRICING_DATA.oneTime.fourBedroomFlat;
      else if (rooms > 5) basePrice = PRICING_DATA.oneTime.mansion;
    } else {
      // For detailed cleaning, use the detailed pricing
      const detailedPrice = PRICING_DATA.deep.flat.oneTime.find(
        (p) => p.rooms === rooms
      );
      basePrice = detailedPrice ? detailedPrice.price : 0;
    }

    // Apply multipliers for frequency if not deep cleaning
    if (cleaningType !== "deep") {
      switch (frequency) {
        case "Twice A Week":
          basePrice *= 2; // Multiply by 2
          break;
        case "Three Times A Week":
          basePrice *= 3; // Multiply by 3
          break;
        default:
          // No multiplier for "Once A Week"
          break;
      }
    }

    return basePrice;
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
    <div className="pt-[123px] lg:pt-0 relative z-30">
      <aside
        className="pt-20 relative z-20 mx-auto max-w-[885px]"
        id="select-rooms"
      >
        <h1 className=" font-league-spartan font-medium text-[36px] text-center my-[35px]">
          Select your home type
        </h1>
        <div className="flex gap-4 justify-between pt-6 my-20 lg:my-[100px] font-league-spartan text-xl lg:text-[30px]">
          <Button
            onClick={() => setBuildingType("flat")}
            className={cn(
              "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white lg:p-[40px] lg:px-[60px]",
              buildingType === "flat"
                ? "border-primary border-2 bg-[#D4D1FC80] dark:bg-primary text-primary dark:text-white"
                : "bg-white dark:bg-[#4E4848] text-[#4E4848]  dark:text-white "
            )}
          >
            Flat / Bungalow
          </Button>

          <Button
            onClick={() => setBuildingType("duplex")}
            className={cn(
              "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white lg:p-[40px] lg:px-[60px]",
              buildingType === "duplex"
                ? "border-primary border-2 bg-[#D4D1FC80] dark:bg-primary text-primary dark:text-white"
                : "bg-white dark:bg-[#4E4848] text-[#4E4848]  dark:text-white "
            )}
          >
            Duplex / Terrace
          </Button>
        </div>
        {cleaningType === "Housekeeping" ? (
          <div className="flex gap-4 justify-between pt-6 my-20 lg:my-[100px] font-league-spartan text-xl lg:text-[30px]">
            <Button
              onClick={() => setCleaningHouse("detailed")}
              className={cn(
                "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white lg:p-[40px] lg:px-[60px]",
                cleaningHouse === "detailed"
                  ? "border-primary border-2 bg-[#D4D1FC80] dark:bg-primary text-primary dark:text-white"
                  : "bg-white dark:bg-[#4E4848] text-[#4E4848]  dark:text-white "
              )}
            >
              Detailed Cleaning
            </Button>

            <Button
              onClick={() => setCleaningHouse("deep")}
              className={cn(
                "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white  lg:p-[40px] lg:px-[60px]",
                cleaningHouse === "deep"
                  ? "border-primary border-2 bg-[#D4D1FC80] dark:bg-primary text-primary dark:text-white"
                  : "bg-white dark:bg-[#4E4848] text-[#4E4848]  dark:text-white "
              )}
            >
              Deep Cleaning
            </Button>
          </div>
        ) : null}

        {cleaningType === "Housekeeping" ? (
          <section>
            <div className="space-y-[35px]">
              {services.map((service) => (
                <div
                  className={cn(
                    "flex gap-2 justify-between items-center px-4 py-2 bg-[#F5F5F5] dark:bg-secondary rounded-[10px] p-4 dark:text-black",
                    service.quantity > 0 ? "border-2 border-primary" : ""
                  )}
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
                    <p className=" font-medium font-inter">
                      {service.quantity}
                    </p>
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
                  onCheckedChange={(checked) =>
                    setIsOneTime(checked as boolean)
                  }
                />
                <label
                  htmlFor="one-time"
                  className="text-sm lg:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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

            <div className="flex justify-between gap-3 items-center font-league-spartan font-medium text-2xl md:text-[36px] mt-20">
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
              <h1 className="text-2xl md:text-[36px] font-league-spartan font-medium">
                Select Frequency
              </h1>

              {cleaningHouse !== "deep" && (
                <div className="flex gap-2 justify-start pt-6 max-w-[calc(100vw-30px)] overflow-x-auto">
                  <Button
                    onClick={() => setFrequency("Three Times A Week")}
                    className={cn(
                      "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white text-[#4E4848] hover:bg-white/80",
                      frequency === "Three Times A Week"
                        ? "border-primary border-2"
                        : ""
                    )}
                  >
                    Three Times a Week
                  </Button>

                  <Button
                    onClick={() => setFrequency("Twice A Week")}
                    className={cn(
                      "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white text-[#4E4848] hover:bg-white/80",
                      frequency === "Twice A Week"
                        ? "border-primary border-2"
                        : ""
                    )}
                  >
                    Twice a Week
                  </Button>
                  <Button
                    onClick={() => setFrequency("Once A Week")}
                    className={cn(
                      "border border-[#4E4848] rounded-[10px] text-sm md:text-xl bg-white text-[#4E4848] hover:bg-white/80",
                      frequency === "Once A Week"
                        ? "border-primary border-2"
                        : ""
                    )}
                  >
                    Once a Week
                  </Button>
                </div>
              )}
            </div>
            <div className="pt-20">
              <h1 className="text-2xl md:text-[36px] font-league-spartan font-medium">
                Select Building Type
              </h1>
            </div>
            <div className="pt-20">
              <h1 className=" text-2xl md:text-[36px] font-league-spartan font-medium">
                Cleaning Time
              </h1>

              <div className="flex gap-2 justify-start pt-6">
                <Button
                  onClick={() => setTime("8am - 12pm")}
                  className={cn(
                    "border border-[#4E4848] rounded-[10px] text-sm bg-white text-[#4E4848] hover:bg-white/90",
                    time === "8am - 12pm" && "border-primary"
                  )}
                >
                  8am - 12pm
                </Button>
                <Button
                  onClick={() => setTime("12am - 4pm")}
                  className={cn(
                    "border border-[#4E4848] rounded-[10px] text-sm bg-white text-[#4E4848] hover:bg-white/90",
                    time === "12pm - 4pm" && "border-primary"
                  )}
                >
                  12am - 4pm
                </Button>
              </div>
            </div>
          </section>
        ) : (
          <section>
            <p>
              You can proceed to scheduling, as price will be discussed upon
              inspection of property. Thank you.
            </p>
          </section>
        )}

        <div className="my-20 w-full flex justify-center">
          <Button
            onClick={() => setOpen(!open)}
            className=" button-grad text-white w-full max-w-[350px] gap-4 px-12"
          >
            Schedule Cleaning
            <FaArrowRight />
          </Button>
        </div>
        <DrawerDialog open={open} onOpenChange={setOpen}>
          <div className="mt-6">
            <CleaningServiceForm
              frequency={frequency}
              total={total}
              buildingType={buildingType}
              cleaningType={cleaningHouse}
              time={time}
            />
          </div>
        </DrawerDialog>
      </aside>
    </div>
  );
};

export default CleaningCalculator;
