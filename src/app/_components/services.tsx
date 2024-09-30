import { cleaning, iron_cloth, repair } from "@/assets/images";
import React from "react";
import ServiceCard from "./service-card";

type Props = {};

const Services = (props: Props) => {
  const theServices = [
    {
      id: 1,
      image: cleaning,
      title:
        "Leave the dusting, scrubbing, and vacuuming to us! Our cleaning pros ensure every corner of your home is sparkling clean.",
    },
    {
      id: 2,
      image: iron_cloth,
      title:
        "Say goodbye to laundry day blues! We offer quick, efficient laundry and ironing services tailored to your schedule.",
    },
    {
      id: 3,
      image: repair,
      title:
        "Got a leaky faucet or an electrical issue? Our certified technicians are on call to fix your home maintenance problems.",
    },
  ];
  return (
    <main>
      <h1 className=" font-league-spartan font-medium text-[36px]">
        Our Services
      </h1>

      <div className="mt-[70px] flex flex-wrap justify-center gap-4">
        {theServices.map((service) => (
          <ServiceCard
            key={service.id}
            image={service.image}
            title={service.title}
          />
        ))}
      </div>
    </main>
  );
};

export default Services;
