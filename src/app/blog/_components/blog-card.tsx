import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  item: {
    id: number;
    title: string;
    image: StaticImageData;
  };
};

const BlogCard = ({ item }: Props) => {
  return (
    <article
      key={item.id}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative aspect-video">
        <Image
          src={item.image}
          alt={`Featured article ${item.title}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        <Link
          href={`/article/${item.title}`}
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
