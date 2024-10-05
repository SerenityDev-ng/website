"use client";

import {
  about_banner,
  about_one,
  about_three,
  about_two,
} from "@/assets/images";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type Props = {};

const AboutPage = (props: Props) => {
  const professionals = [
    {
      id: 1,
      image: about_one,
      name: "Tomi Adeboye",
      title: "Operations",
    },
    {
      id: 2,
      image: about_two,
      name: "Delphine Mike",
      title: "Housekeeping",
    },
    {
      id: 3,
      image: about_three,
      name: "Joyce Moses",
      title: "Customer Service",
    },
    {
      id: 4,
      image: about_one,
      name: "Stanley Ikeji",
      title: "Electrician",
    },
    {
      id: 5,
      image: about_two,
      name: "Rosemary Micheal",
      title: "Housekeeping",
    },
    {
      id: 6,
      image: about_three,
      name: "Martha John",
      title: "Launderer",
    },
  ];

  return (
    <div className="py-20 ">
      <figure>
        <Image
          src={about_banner}
          alt="About Banner"
          width={1280}
          height={700}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-contain"
        />
      </figure>

      <div>
        <h1 className="mt-24 font-league-spartan font-semibold text-5xl xl:text-[72px] text-center">
          About Us
        </h1>

        <p className=" font-inter text-2xl py-8">
          At Serenity, we do more than clean, we are your home&apos;s best
          friend. Our mission is to create a comfortable, well-maintained living
          space that allows you to focus on what matters most. From regular
          housekeeping and laundry to minor home repairs, we offer a wide
          variety of services tailored specifically to your needs. Whether
          it&apos;s keeping your floors spotless, your laundry fresh and folded,
          or fixing those minor home issues that have been piling up, we handle
          it all with care and precision.
        </p>

        <p className="font-inter text-2xl ">
          With Serenity, you can trust that your home will always be fresh,
          functional, and well cared for. Our team is dedicated to providing
          consistent, high-quality service with attention to detail, ensuring
          that every corner of your home reflects the calm and comfort you
          deserve.
        </p>

        <p className=" font-inter text-2xl py-8">
          We understand that life can get busy, and managing your home
          shouldn&apos;t be a hassle. That&apos;s why we make it easy for you to
          relax, knowing your space is in the hands of professionals who care as
          much about your home as you do. With Serenity by your side,
          you&apos;ll have more time to enjoy life&apos;s little moments, while
          we handle the rest.
        </p>
      </div>

      <div>
        <h1 className=" font-league-spartan font-medium text-5xl text-[77px] text-center mt-32">
          Meet Our Professionals At Serenity
        </h1>

        <div className="flex flex-wrap gap-3 mt-16  rounded-[10px]">
          {professionals.map((professional) => (
            <div
              key={professional.id}
              className="border rounded-[10px] border-[#C0B8B8] max-w-[391px] h-[392px] overflow-hidden backdrop-blur-md dark:bg-secondary"
            >
              <div>
                <Image
                  src={professional.image}
                  alt={professional.name}
                  width={0}
                  height={0}
                  className="w-full h-[262px] object-contain -mt-2"
                />
              </div>
              <div className="pt-6">
                <h2 className="font-league-spartan font-medium text-2xl text-center dark:text-black">
                  {professional.name}
                </h2>
                <p className="font-inter text-lg text-[#4E4848] text-center">
                  {professional.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 w-fit mx-auto">
          <Button>Become a professional</Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
