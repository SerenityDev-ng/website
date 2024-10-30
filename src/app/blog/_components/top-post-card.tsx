import React from "react";
import { Blog } from "../../../../types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "date-fns";

type Props = {
  item: Blog | null;
};

const TopPostCard = ({ item }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <Image
        alt={`Featured article ${item?.slug}`}
        src={urlFor(item?.mainImage?.asset?._ref as string)}
        width={0}
        height={0}
        sizes="100vw"
        objectFit="contain"
        className="w-20 max-h-20 rounded-lg"
      />

      <article className="space-y-3 text-sm">
        <h1>{item?.title}</h1>
        <p className="text-muted-foreground uppercase font-medium text-xs">
          {item?.publishedAt
            ? formatDate(new Date(item?.publishedAt), "MMMM dd, yyyy")
            : ""}
        </p>
      </article>
    </div>
  );
};

export default TopPostCard;
