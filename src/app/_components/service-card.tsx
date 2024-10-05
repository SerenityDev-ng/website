import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  image: StaticImageData;
  title: string;
};

const ServiceCard = ({ image, title }: Props) => {
  return (
    <main className="border border-[#C0B8B8] rounded-[10px] max-w-[391px] h-[509px] overflow-hidden dark:bg-secondary">
      <Image
        src={image}
        alt={title}
        width={0}
        height={0}
        sizes="100vw"
        className="h-[262px] w-full object-contain -mt-2"
      />
      <div className="p-5 py-8 text-lg text-[#4E4848]">
        <p>{title}</p>

        <Button className="button-grad mt-8">Schedule Service</Button>
      </div>
    </main>
  );
};

export default ServiceCard;
