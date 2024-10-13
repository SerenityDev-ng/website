import {
  cleaning,
  gifting_cleaning,
  iron_cloth,
  repair,
} from "@/assets/images";
import React from "react";
import ServiceCard from "./service-card";

type Props = {};

const SelectService = (props: Props) => {
  const theServices = [
    {
      id: 1,
      image: gifting_cleaning,
      title:
        "Leave the dusting, scrubbing, and vacuuming to us! Our cleaning pros ensure every corner of your home is sparkling clean.",
      href: "/services/cleaning",
      text: "Book Housekeeping",
    },
    {
      id: 2,
      image: iron_cloth,
      title:
        "Say goodbye to laundry day blues! We offer quick, efficient laundry and ironing services tailored to your schedule.",
      href: "/services/laundry",
      text: "Book Laundry",
    },
    {
      id: 3,
      image: repair,
      title:
        "Got a leaky faucet or an electrical issue? Our certified technicians are on call to fix your home maintenance problems.",
      href: "/services/repair",
      text: "Book Repair",
    },
  ];
  return (
    <main>
      <p className="text-center text-5xl lg:text-[55px] py-[87px]">
        Select a service
      </p>
      <h1 className=" font-league-spartan font-medium text-[36px] text-center lg:text-left">
        Our Services
      </h1>

      <div className="mt-[70px] flex flex-wrap justify-center lg:justify-start  gap-4">
        {theServices.map((service) => (
          <ServiceCard
            image={service.image}
            title={service.title}
            key={service.id}
            buttonText={service.text}
          />
        ))}
      </div>
    </main>
  );
};

export default SelectService;
