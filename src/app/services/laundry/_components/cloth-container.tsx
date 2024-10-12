"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import WashedIroned from "./washed-ironed";
import IronedOnly from "./ironed-only";
import ClothPrices from "./cloth-pricing";

type Props = {
  setSelectedService: React.Dispatch<React.SetStateAction<string>>;
  selectedService: string;
};

const ClothContainer = ({ setSelectedService, selectedService }: Props) => {
  return (
    <Tabs
      defaultValue="Washed and Folded"
      onValueChange={(value) => setSelectedService(value)}
      value={selectedService}
    >
      <TabsList>
        <TabsTrigger value="Washed and Folded">Washed and Folded</TabsTrigger>
        <TabsTrigger value="Washed and Ironed">Washed and Ironed</TabsTrigger>
        <TabsTrigger value="Iron Only">Iron Only</TabsTrigger>
      </TabsList>
      <TabsContent value="Washed and Folded">
        <ClothPrices />
      </TabsContent>
      <TabsContent value="Washed and Ironed">
        <WashedIroned />
      </TabsContent>
      <TabsContent value="Iron Only">
        <IronedOnly />
      </TabsContent>
    </Tabs>
  );
};

export default ClothContainer;
