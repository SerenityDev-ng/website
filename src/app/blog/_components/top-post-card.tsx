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
        alt={`Featured article ${item?.title || item?.slug.current}`}
        src={
          (item?.mainImage as any)?.localPath ||
          (item?.mainImage?.asset?._ref
            ? urlFor(item.mainImage.asset._ref)
            : "https://via.placeholder.com/80x80?text=Post")
        }
        width={80}
        height={80}
        objectFit="cover"
        className="w-20 h-20 rounded-lg object-cover"
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
