import { gifting_side } from "@/assets/images";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SelectService from "./_components/select-sevice";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="pb-[115px]">
      <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-5 max-w-full overflow-x-hidden">
        <aside>
          <article className="md:max-w-[500px] lg:max-w-[820px] text-center lg:text-left">
            <h1 className=" font-inter font-semibold text-4xl md:text-5xl xl:text-[72px]">
              Spread love with the perfect gift.
            </h1>
            <p className="text-sm md:text-lg lg:text-xl xl:text-2xl font-league-spartan mt-7 lg:mt-9">
              Looking for the ultimate thoughtful gift? Help your loved ones
              relax with a little help from Serenity&apos;s all-in-one cleaning,
              laundry, and repair services.
            </p>
          </article>

          <div className="mt-[35px] w-fit mx-auto lg:mx-0">
            <Link href={"/services/gifting#select-service"}>
              <Button className=" button-grad">Gift A Service</Button>
            </Link>
          </div>
        </aside>

        <aside className="relative -mt-8 md:mt-10 lg:mt-0">
          <Image
            src={gifting_side}
            alt="Side"
            height={0}
            width={0}
            sizes="100vw"
            className="w-full h-[618px] max-w-[726px] object-contain relative z-10"
          />
        </aside>
      </div>

      <SelectService />
    </main>
  );
};

export default page;
