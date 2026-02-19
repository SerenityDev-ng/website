import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { Blog } from "../../../../types";
import urlBuilder from "@sanity/image-url";
import config from "@/lib/sanity.client";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  item: Blog | null;
};

const BlogCard = ({ item }: Props) => {
  return (
    <article className="group relative bg-[#FDFDFF] dark:bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 flex flex-col h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5">
      {/* Glassmorphism gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={
            (item?.mainImage as any)?.localPath ||
            (item?.mainImage?.asset?._ref
              ? urlFor(item.mainImage.asset._ref)
              : "https://via.placeholder.com/800x450?text=Sanity+Not+Connected")
          }
          alt={`Featured article ${item?.title || item?.slug.current}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Minimal Category Badge */}
        {item?.categories && item.categories.length > 0 && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-white/80 dark:bg-black/40 backdrop-blur-md text-primary dark:text-secondary-foreground text-[10px] uppercase tracking-widest font-bold rounded-full border border-white/20">
              {item.categories[0].title}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-tight">
            {item?.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-tight">
            5 min read
          </span>
        </div>

        <h3 className="text-lg lg:text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {item?.title}
        </h3>

        <div className="mt-auto pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
          <Link
            href={`/blog/${item?.slug.current}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:gap-3 transition-all duration-300 uppercase tracking-widest"
          >
            Explore Article
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
