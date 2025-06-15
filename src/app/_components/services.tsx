import { cleaning, iron_cloth, repair } from "@/assets/images";
import React from "react";
import ServiceCard from "./service-card";
import Link from "next/link";

type Props = {};

const Services = (props: Props) => {
  const theServices = [
    {
      id: 1,
      image: cleaning,
      title:
        "Leave the dusting, scrubbing, and vacuuming to us! Our cleaning pros ensure every corner of your home is sparkling clean.",
      href: "/services/cleaning",
    },
    {
      id: 2,
      image: iron_cloth,
      title:
        "Say goodbye to laundry day blues! We offer quick, efficient laundry and ironing services tailored to your schedule.",
      href: "/services/laundry",
    },
    {
      id: 3,
      image: repair,
      title:
        "Got a leaky faucet or an electrical issue? Our certified technicians are on call to fix your home maintenance problems.",
      href: "/services/repair",
    },
  ];
  return (
    <main>
      <h2 className=" font-league-spartan font-medium text-[36px] text-center lg:text-left">
        Our Services
      </h2>

      <div className="mt-[70px] flex flex-wrap justify-center md:justify-start gap-4 ">
        {theServices.map((service) => (
          <Link href={service.href} key={service.id}>
            <ServiceCard image={service.image} title={service.title} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Services;
