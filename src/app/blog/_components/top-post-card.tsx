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
    <div className="group flex items-center gap-5 p-2 rounded-xl border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900/50 transition-all duration-300">
      <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-lg">
        <Image
          alt={`Top article ${item?.title || item?.slug.current}`}
          src={
            (item?.mainImage as any)?.localPath ||
            (item?.mainImage?.asset?._ref
              ? urlFor(item.mainImage.asset._ref)
              : "https://via.placeholder.com/80x80?text=Post")
          }
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <article className="flex flex-col gap-1 overflow-hidden">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
          {item?.title}
        </h4>
        <div className="flex items-center gap-2">
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider">
            {item?.publishedAt
              ? formatDate(new Date(item?.publishedAt), "MMM dd, yyyy")
              : ""}
          </p>
        </div>
      </article>
    </div>
  );
};

export default TopPostCard;
