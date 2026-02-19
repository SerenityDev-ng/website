import React from "react";

import { getFeaturedPostBySlug, getPostBySlug } from "@/lib/sanity.utils";

import { Metadata, ResolvingMetadata } from "next";
import { generateBlogMetadata } from "@/lib/singleblogmetadata";
import RenderBodyContent from "../../_components/render-body";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "date-fns";
import { notFound } from "next/navigation";

interface SingleBlogPageProps {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: SingleBlogPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getFeaturedPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return generateBlogMetadata({ params, post }, parent);
}

const SingleBlogPage = async ({ params }: SingleBlogPageProps) => {
  const post = await getFeaturedPostBySlug(params?.slug);

  if (!post) {
    notFound();
  }

  // Assuming critical data exists if the page renders
  // Fallback for _updatedAt is publishedAt
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: (post?.mainImage as any)?.localPath || (post?.mainImage?.asset?._ref ? urlFor(post.mainImage.asset._ref) : ""),
    datePublished: formatDate(new Date(post.publishedAt), "yyyy-MM-dd'T'HH:mm:ssxxx"),
    dateModified: formatDate(new Date(post._updatedAt || post.publishedAt), "yyyy-MM-dd'T'HH:mm:ssxxx"),
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
      <Image
        alt={`Featured article ${post?.slug.current}`}
        src={(post?.mainImage as any)?.localPath || (post?.mainImage?.asset?._ref ? urlFor(post.mainImage.asset._ref) : "https://via.placeholder.com/1200x600?text=Featured+Post")}
        width={1200}
        height={600}
        sizes="100vw"
        objectFit="cover"
        className="w-full max-h-60 object-cover rounded-t-xl"
      />
      <div className="my-6 max-w-3xl mx-auto">
        <h1 className="text-2xl lg:text-4xl py-2 text-center capitalize font-league-spartan font-semibold text-primary">
          {post?.title}
        </h1>
        <div className="flex items-center justify-center mt-8 text-muted-foreground">
          <div className="flex items-center gap-2 px-3">
            <Image
              alt={`Author ${post?.author?.name}`}
              src={(post?.author?.image as any)?.localPath || (post?.author?.image?.asset?._ref ? urlFor(post.author.image.asset._ref) : "https://via.placeholder.com/40x40?text=A")}
              width={40}
              height={40}
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

      <article className="prose lg:prose-xl mt-16 mx-auto dark:prose-invert">
        <RenderBodyContent post={post} />
      </article>
    </article>
  );
};

export default SingleBlogPage;
