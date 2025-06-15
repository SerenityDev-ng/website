import React from "react";

import { getPostBySlug } from "@/lib/sanity.utils";
import RenderBodyContent from "../_components/render-body";
import { Blog } from "../../../../types";
import { Metadata, ResolvingMetadata } from "next";
import { generateBlogMetadata } from "@/lib/singleblogmetadata";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatDate, formatISO } from "date-fns";
import Script from "next/script";

interface SingleBlogPageProps {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: SingleBlogPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return generateBlogMetadata({ params, post }, parent);
}

const SingleBlogPage = async ({ params }: SingleBlogPageProps) => {
  const post = await getPostBySlug(params?.slug);

  // Assuming critical data exists if the page renders
  // Fallback for _updatedAt is publishedAt
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: urlFor(post.mainImage.asset._ref),
    datePublished: formatISO(new Date(post.publishedAt)),
    dateModified: formatISO(new Date(post._updatedAt || post.publishedAt)),
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Serenity",
      logo: {
        "@type": "ImageObject",
        url: "https://www.serenity.ng/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.serenity.ng/blog/${post.slug.current}`,
    },
  };

  return (
    <article className="my-10 container mx-auto">
      <Script
        id="json-ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Image
        alt={`Featured article ${post?.slug}`}
        src={urlFor(post?.mainImage?.asset?._ref as string)}
        width={0}
        height={0}
        sizes="100vw"
        objectFit="cover"
        className="w-full max-h-60 object-cover rounded-t-xl mx-auto"
      />
      <div className="my-6 max-w-3xl mx-auto">
        <h1 className="text-2xl lg:text-4xl py-2 text-center capitalize font-league-spartan font-semibold text-primary">
          {post?.title}
        </h1>
        <div className="flex items-center justify-center mt-8 text-muted-foreground">
          <div className="flex items-center gap-2 px-3">
            <Image
              alt={`Featured article ${post?.slug}`}
              src={urlFor(post?.author?.image?.asset?._ref as string)}
              width={0}
              height={0}
              sizes="100vw"
              objectFit="cover"
              className="w-10 h-10 object-cover rounded-full"
            />

            <p>{post?.author?.name}</p>
          </div>

          <p className="px-3 border-l border-l-gray-300">
            {post?.publishedAt
              ? formatDate(new Date(post?.publishedAt), "MMMM dd, yyyy")
              : ""}
          </p>
        </div>
        {/* <p>{post.metadata}</p> */}
      </div>

      <article className={`prose lg:prose-xl mt-16 mx-auto dark:prose-invert`}>
        <RenderBodyContent post={post} />
      </article>
    </article>
  );
};

export default SingleBlogPage;
