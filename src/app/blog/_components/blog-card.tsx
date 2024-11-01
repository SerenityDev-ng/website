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
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={urlFor(item?.mainImage?.asset?._ref as string)}
          alt={`Featured article ${item?.slug}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 dark:text-black">
          {item?.title}
        </h3>
        <Link
          href={`/blog/${item?.slug.current}`}
          className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary transition-colors"
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
