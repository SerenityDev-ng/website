import { team } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const AboutUs = (props: Props) => {
  return (
    <main>
      <h1 className=" font-league-spartan font-medium text-[36px] mb-[50px] text-center lg:text-left">
        About Us
      </h1>
      <div className="flex flex-col items-center gap-5 lg:justify-between lg:flex-row lg:items-center">
        <Image
          src={team}
          alt="Team"
          width={530}
          height={627}
          className="object-contain"
        />

        <aside className="max-w-[525px]">
          <h1 className=" font-league-spartan font-medium text-[36px] lg:text-[56px]">
            Your Home&apos;s Best Friend
          </h1>
          <p className=" font-inter text-xl text-[#4E4848] mt-[26px]">
            At Serenity, we understand that life gets busy, and home maintenance
            can feel overwhelming. That&apos;s why we offer everything from
            cleaning to laundry and repair services, making it easy to keep your
            space clean, functional, and comfortable.
          </p>

          <Button className=" button-grad text-lg font-medium mt-[50px] gap-2">
            Become A Professional
            <ArrowRight />
          </Button>
        </aside>
      </div>
    </main>
  );
};

export default AboutUs;
