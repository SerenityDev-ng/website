import React from "react";
import { Blog } from "../../../../types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "date-fns";
import Link from "next/link";
import { ArrowRightToLine } from "lucide-react";

type Props = {
  item: Blog | null;
};

const FeaturedPostCard = ({ item }: Props) => {
  return (
    <div className="group relative bg-[#FDFDFF] dark:bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <Image
          alt={`Featured article ${item?.title || item?.slug?.current}`}
          src={
            (item?.mainImage as any)?.localPath ||
            (item?.mainImage?.asset?._ref
              ? urlFor(item.mainImage.asset._ref)
              : "https://via.placeholder.com/1200x600?text=Featured+Post")
          }
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Futuristic Overlay Badge */}
        <div className="absolute top-6 left-6 z-10">
          <span className="px-4 py-1.5 bg-primary/90 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-full border border-white/10 shadow-lg">
            Featured
          </span>
        </div>
      </div>

      <article className="p-8 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">
            {item?.publishedAt
              ? formatDate(new Date(item?.publishedAt), "MMMM dd, yyyy")
              : ""}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">
            Special Edition
          </span>
        </div>

        <h2 className="font-league-spartan font-bold text-2xl lg:text-4xl text-zinc-900 dark:text-white leading-[1.1] group-hover:text-primary transition-colors duration-300">
          {item?.title}
        </h2>

        <div className="pt-4 flex items-center justify-between border-t border-zinc-50 dark:border-zinc-800/50">
          <Link
            href={`/blog/featured/${item?.slug?.current}`}
            className="flex items-center gap-2 text-xs font-black text-primary group-hover:gap-4 transition-all duration-300 uppercase tracking-[0.2em]"
          >
            Read Exclusive
            <ArrowRightToLine size={20} className="text-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default FeaturedPostCard;
