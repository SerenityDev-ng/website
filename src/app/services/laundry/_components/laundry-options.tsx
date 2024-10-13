import {
  cleaning,
  iron_cloth,
  laundry_fold,
  laundry_iron,
  repair,
} from "@/assets/images";
import React from "react";
import LaundryCard from "./laundry-card";

type Props = {
  setSelectedService: React.Dispatch<
    React.SetStateAction<{ count: number; title: string }>
  >;
  selectedService: { count: number; title: string };
};

const LaundryOptions = ({ setSelectedService, selectedService }: Props) => {
  const theServices = [
    {
      id: 1,
      image: laundry_fold,
      heading: "Washed and Folded",
      title:
        "Your dirty laundry picked up, washed, neatly folded and delivered in 48 hours. ",
    },
    {
      id: 2,
      image: iron_cloth,
      heading: "Washed and Ironed",
      title:
        "Your dirty laundry picked up, washed, ironed and delivered in 48 hours. ",
    },
    {
      id: 3,
      image: laundry_iron,
      heading: "Iron Only",
      title:
        "Your dirty laundry picked up, washed, ironed and delivered in 48 hours. ",
    },
  ];
  return (
    <main>
      <h1 className=" font-league-spartan font-medium text-[36px] lg:text-5xl text-center lg:text-left">
        Laundry Service Options
      </h1>
      <p className="text-lg lg:text-2xl mt-4 text-center lg:text-left max-w-[320px] lg:max-w-[520px] mx-auto lg:mx-0 dark:text-muted-foreground">
        Select your choice of laundry, how do you want your laundry done?
      </p>

      <div className="mt-[70px] flex flex-wrap justify-start gap-4">
        {theServices.map((service, i) => (
          <LaundryCard
            key={service.id}
            image={service.image}
            heading={service.heading}
            title={service.title}
            setSelectedService={setSelectedService}
            selectedService={selectedService}
            index={i}
          />
        ))}
      </div>
    </main>
  );
};

export default LaundryOptions;
