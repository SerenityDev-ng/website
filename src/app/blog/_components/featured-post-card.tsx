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
    <main>
      <Image
        alt={`Featured article ${item?.slug}`}
        src={urlFor(item?.mainImage?.asset?._ref as string)}
        width={0}
        height={0}
        sizes="100vw"
        objectFit="cover"
        className="w-full max-h-60 object-cover rounded-t-xl"
      />

      <article className="mt-8 space-y-6 text-muted-foreground">
        <h1 className=" font-league-spartan font-medium text-xl lg:text-4xl text-black">
          {item?.title}
        </h1>
        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="text-sm uppercase">
            {item?.publishedAt
              ? formatDate(new Date(item?.publishedAt), "MMMM dd, yyyy")
              : ""}
          </p>
          <Link
            href={`/blog/featured/${item?.slug?.current}`}
            className="flex items-center gap-2"
          >
            <p>READ MORE</p>
            <ArrowRightToLine size={24} className="text-primary" />
          </Link>
        </div>
      </article>
    </main>
  );
};

export default FeaturedPostCard;
