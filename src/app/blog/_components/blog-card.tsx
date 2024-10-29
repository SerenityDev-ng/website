import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { Blog } from "../../../../types";
import urlBuilder from "@sanity/image-url";
import config from "@/lib/sanity.client";

type Props = {
  item: Blog | null;
};

const BlogCard = ({ item }: Props) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={
            urlBuilder(config)
              .image(item?.mainImage?.asset?._ref as string)
              .fit("max")
              .auto("format")
              .url() as string
          }
          alt={`Featured article ${item?.slug}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{item?.title}</h3>
        <Link
          href={`/blog/${item?.slug.current}`}
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
