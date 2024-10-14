"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import WashedIroned from "./washed-ironed";
import IronedOnly from "./ironed-only";
import ClothPrices from "./cloth-pricing";
import { useMediaQuery } from "@/hooks/media-query";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

type Props = {
  setSelectedService: React.Dispatch<
    React.SetStateAction<{ count: number; title: string }>
  >;
  selectedService: { count: number; title: string };
};

const ClothContainer = ({ setSelectedService, selectedService }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const titles = [
    {
      count: 0,
      title: "Washed and Folded",
    },
    {
      count: 1,
      title: "Washed and Ironed",
    },
    {
      count: 2,
      title: "Iron Only",
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setSelectedService((prev) => ({
        ...prev,
        count: api.selectedScrollSnap(),
      }));
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, setSelectedService]);

  useEffect(() => {
    if (api && selectedService.count !== api.selectedScrollSnap()) {
      api.scrollTo(selectedService.count);
    }
  }, [api, selectedService.count]);

  if (isDesktop)
    return (
      <Tabs
        defaultValue="Washed and Folded"
        onValueChange={(value) =>
          setSelectedService({ ...selectedService, title: value })
        }
        value={selectedService.title}
      >
        <TabsList>
          <TabsTrigger value="Washed and Folded">Washed and Folded</TabsTrigger>
          <TabsTrigger value="Washed and Ironed">Washed and Ironed</TabsTrigger>
          <TabsTrigger value="Iron Only">Iron Only</TabsTrigger>
        </TabsList>
        <TabsContent value="Washed and Folded" className="mt-10">
          <ClothPrices />
        </TabsContent>
        <TabsContent value="Washed and Ironed" className="mt-10">
          <WashedIroned />
        </TabsContent>
        <TabsContent value="Iron Only" className="mt-10">
          <IronedOnly />
        </TabsContent>
      </Tabs>
    );

  return (
    <main className="">
      <div className="flex items-center gap-2 my-5">
        {titles.map((title) => (
          <Button
            key={title.count}
            className={`${
              selectedService.count === title.count
                ? "button-tab hover:bg-primary"
                : "bg-white text-[#4E4848]"
            }`}
            onClick={() =>
              setSelectedService({ count: title.count, title: title.title })
            }
          >
            {title.title}
          </Button>
        ))}
      </div>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          <CarouselItem>
            <ClothPrices />
          </CarouselItem>
          <CarouselItem>
            <WashedIroned />
          </CarouselItem>
          <CarouselItem>
            <IronedOnly />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </main>
  );
};

export default ClothContainer;
