"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  childrenWashedIroned,
  extraLaundryServices,
  extraLaundryWashedOnly,
  menLaundryWashedIroned,
  womenWashedIroned,
} from "@/lib/laundry";
import { useLaundryService } from "@/hooks/store/laundry";
import { useGetLaundryServices } from "@/hooks/useBookLaundry";
import { getServicesForType } from "@/lib/laundry-mapper";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const ClothPrices = () => {
  // Use the Zustand store instead of local state
  const { 
    menServices, 
    womenServices, 
    childrenServices, 
    extraServices, 
    total,
    setMenServices, 
    setWomenServices, 
    setChildrenServices, 
    setExtraServices,
    updateMenService,
    updateWomenService,
    updateChildrenService,
    updateExtraService
  } = useLaundryService();
  
  // Fetch backend data for WASHED_FOLDED services
  const { data: laundryServicesData, isLoading } = useGetLaundryServices({
    laundry_type: 'WASHED_FOLDED'
  });
  
  // Initialize store with data on component mount
  useEffect(() => {
    if (laundryServicesData?.data && laundryServicesData.data.length > 0) {
      // Use backend data if available
      const mappedServices = getServicesForType(laundryServicesData.data, 'WASHED_FOLDED');
      setMenServices(mappedServices.men.length > 0 ? mappedServices.men : menLaundryWashedIroned);
      setWomenServices(mappedServices.women.length > 0 ? mappedServices.women : womenWashedIroned);
      setChildrenServices(mappedServices.children.length > 0 ? mappedServices.children : childrenWashedIroned);
      setExtraServices(mappedServices.extra.length > 0 ? mappedServices.extra : extraLaundryWashedOnly);
    } else {
      // Fallback to hardcoded data
      setMenServices(menLaundryWashedIroned);
      setWomenServices(womenWashedIroned);
      setChildrenServices(childrenWashedIroned);
      setExtraServices(extraLaundryWashedOnly);
    }
  }, [laundryServicesData, setMenServices, setWomenServices, setChildrenServices, setExtraServices]);

  const incrementQuantity = (id: number) => {
    const service = menServices.find(s => s.id === id);
    if (service) {
      updateMenService(id, service.quantity + 1);
    }
  };

  const decrementQuantity = (id: number) => {
    const service = menServices.find(s => s.id === id);
    if (service && service.quantity > 0) {
      updateMenService(id, service.quantity - 1);
    }
  };

  const incrementWomenQuantity = (id: number) => {
    const service = womenServices.find(s => s.id === id);
    if (service) {
      updateWomenService(id, service.quantity + 1);
    }
  };
  
  const decrementWomenQuantity = (id: number) => {
    const service = womenServices.find(s => s.id === id);
    if (service && service.quantity > 0) {
      updateWomenService(id, service.quantity - 1);
    }
  };

  const incrementChildrenQuantity = (id: number) => {
    const service = childrenServices.find(s => s.id === id);
    if (service) {
      updateChildrenService(id, service.quantity + 1);
    }
  };
  
  const decrementChildrenQuantity = (id: number) => {
    const service = childrenServices.find(s => s.id === id);
    if (service && service.quantity > 0) {
      updateChildrenService(id, service.quantity - 1);
    }
  };

  const incrementExtraQuantity = (id: number) => {
    const service = extraServices.find(s => s.id === id);
    if (service) {
      updateExtraService(id, service.quantity + 1);
    }
  };
  
  const decrementExtraQuantity = (id: number) => {
    const service = extraServices.find(s => s.id === id);
    if (service && service.quantity > 0) {
      updateExtraService(id, service.quantity - 1);
    }
  };

  // Total is now calculated by the store

  return (
    <div>
      <h1 className=" font-league-spartan font-medium text-[36px]">
        Select your clothes
      </h1>

      <Tabs defaultValue="men">
        <TabsList>
          <TabsTrigger value="men">Men</TabsTrigger>
          <TabsTrigger value="women">Women</TabsTrigger>
          <TabsTrigger value="children">Children</TabsTrigger>
        </TabsList>
        <TabsContent value="men" className="">
          <div className=" backdrop-blur-md bg-white/40 dark:bg-transparent rounded-lg ">
            <div className=" button-grad flex gap-2 justify-between p-4 rounded-[10px] my-[35px] text-white">
              <div>Wears</div>
              <div>Price</div>
              <div className="opacity-0">.</div>
            </div>

            <div className="space-y-[35px]">
              {menServices?.map((laundry) => (
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
              {extraServices?.map((laundry) => (
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
              <p>&#8358;{total}</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="women" className="">
          <div className=" backdrop-blur-md bg-white/40 dark:bg-transparent rounded-lg ">
            <div className=" button-grad flex gap-2 justify-between p-4 rounded-[10px] my-[35px] text-white">
              <div>Wears</div>
              <div>Price</div>
              <div className="opacity-0">.</div>
            </div>

            <div className="space-y-[35px]">
              {womenServices?.map((laundry) => (
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
                      onClick={() => decrementWomenQuantity(laundry.id)}
                      className="font-semibold text-xl bg-secondary text-black hover:bg-secondary dark:bg-gray-600 dark:text-white"
                    >
                      -
                    </Button>
                    <p className=" font-medium font-inter">
                      {laundry.quantity}
                    </p>
                    <Button
                      onClick={() => incrementWomenQuantity(laundry.id)}
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
              {extraServices?.map((laundry) => (
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
              <p>&#8358;{total}</p>
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
        <TabsContent value="children" className="">
          <div className=" backdrop-blur-md bg-white/40 dark:bg-transparent rounded-lg ">
            <div className=" button-grad flex gap-2 justify-between p-4 rounded-[10px] my-[35px] text-white">
              <div>Wears</div>
              <div>Price</div>
              <div className="opacity-0">.</div>
            </div>

            <div className="space-y-[35px]">
              {childrenServices?.map((laundry) => (
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
                      onClick={() => decrementChildrenQuantity(laundry.id)}
                      className="font-semibold text-xl bg-secondary text-black hover:bg-secondary dark:bg-gray-600 dark:text-white"
                    >
                      -
                    </Button>
                    <p className=" font-medium font-inter">
                      {laundry.quantity}
                    </p>
                    <Button
                      onClick={() => incrementChildrenQuantity(laundry.id)}
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
              {extraServices?.map((laundry) => (
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
              <p>&#8358;{total}</p>
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
