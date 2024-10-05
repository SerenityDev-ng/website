"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { extraLaundryServices, laundryServices } from "@/lib/laundry";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {};

const ClothPrices = (props: Props) => {
  const [services, setServices] = useState(laundryServices);
  const [extraService, setExtraServices] = useState(extraLaundryServices);

  const incrementQuantity = (id: number) => {
    const updatedServices = services.map((service) => {
      if (service.id === id) {
        return { ...service, quantity: service.quantity + 1 };
      }
      return service;
    });
    setServices(updatedServices);
  };

  const decrementQuantity = (id: number) => {
    const updatedServices = services.map((service) => {
      if (service.id === id && service.quantity > 0) {
        return { ...service, quantity: service.quantity - 1 };
      }
      return service;
    });
    setServices(updatedServices);
  };
  const incrementExtraQuantity = (id: number) => {
    const updatedServices = extraService.map((service) => {
      if (service.id === id) {
        return { ...service, quantity: service.quantity + 1 };
      }
      return service;
    });
    setExtraServices(updatedServices);
  };

  const decrementExtraQuantity = (id: number) => {
    const updatedServices = extraService.map((service) => {
      if (service.id === id && service.quantity > 0) {
        return { ...service, quantity: service.quantity - 1 };
      }
      return service;
    });
    setExtraServices(updatedServices);
  };

  const totalService = services.reduce(
    (acc, service) => acc + service.price * service.quantity,
    0
  );
  const totalExtraService = extraService.reduce(
    (acc, service) => acc + service.price * service.quantity,
    0
  );

  const totalMale = totalService + totalExtraService;

  return (
    <div>
      <h1 className=" font-league-spartan font-medium text-[36px]">
        Select your clothes
      </h1>

      <Tabs defaultValue="men">
        <TabsList>
          <TabsTrigger value="men">Men</TabsTrigger>
          <TabsTrigger value="women">Women</TabsTrigger>
        </TabsList>
        <TabsContent value="men" className="">
          <div className=" backdrop-blur-md bg-white/40 dark:bg-transparent rounded-lg ">
            <div className=" button-grad flex gap-2 justify-between p-4 rounded-[10px] my-[35px] text-white">
              <div>Wears</div>
              <div>Price</div>
              <div className="opacity-0">.</div>
            </div>

            <div className="space-y-[35px]">
              {services?.map((laundry) => (
                <div
                  className="flex gap-2 justify-between items-center px-4 py-2 bg-[#F5F5F5] rounded-[10px] p-4 dark:bg-secondary dark:text-black"
                  key={laundry.id}
                >
                  <div className="min-w-[100px] max-w-[100px]">
                    {laundry.name}
                  </div>
                  <div>
                    &#8358;{laundry.price}
                    {laundry.quantity > 0 && (
                      <p className="text-sm text-gray-600 pt-1">
                        ( &#8358;{`${laundry.price * laundry.quantity}`})
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4 items-center">
                    <Button
                      onClick={() => decrementQuantity(laundry.id)}
                      className="font-semibold text-xl bg-secondary text-black hover:bg-secondary dark:bg-gray-600 dark:text-white"
                    >
                      -
                    </Button>
                    <p className=" font-medium font-inter">
                      {laundry.quantity}
                    </p>
                    <Button
                      onClick={() => incrementQuantity(laundry.id)}
                      className="text-xl font-semibold text-white hover:bg-primary"
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-[35px] pt-[35px]">
              <h1 className=" font-league-spartan font-medium text-[36px]">
                Extra Items
              </h1>
              {extraService?.map((laundry) => (
                <div
                  className="flex gap-2 justify-between items-center px-4 py-2 bg-[#F5F5F5] rounded-[10px] p-4 dark:bg-secondary dark:text-black"
                  key={laundry.id}
                >
                  <div className="min-w-[100px] max-w-[100px]">
                    {laundry.name}
                  </div>
                  <div>
                    &#8358;{laundry.price}
                    {laundry.quantity > 0 && (
                      <p className="text-sm text-gray-600 pt-1">
                        ( &#8358;{`${laundry.price * laundry.quantity}`})
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4 items-center">
                    <Button
                      onClick={() => decrementExtraQuantity(laundry.id)}
                      className="font-semibold text-xl bg-secondary text-black hover:bg-secondary dark:bg-gray-600 dark:text-white"
                    >
                      -
                    </Button>
                    <p className=" font-medium font-inter">
                      {laundry.quantity}
                    </p>
                    <Button
                      onClick={() => incrementExtraQuantity(laundry.id)}
                      className="text-xl font-semibold text-white hover:bg-primary"
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-[120px] flex items-center justify-between font-medium font-league-spartan text-[36px] px-4">
              <h1>Total Order</h1>
              <p>&#8358;{totalMale}</p>
            </div>

            <div className=" pt-20 w-full flex justify-center">
              <Link
                href="https://calendly.com/serenityvimo/30min"
                target="__blank"
              >
                <Button className=" button-grad text-white w-full max-w-[350px] gap-4 px-12">
                  Schedule Pickup
                  <FaArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClothPrices;
