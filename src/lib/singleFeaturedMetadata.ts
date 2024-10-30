import { Metadata, ResolvingMetadata } from "next";

import serenity_logo from "../public/images/serenity_logo.png";
import { Blog } from "../../types";
import urlBuilder from "@sanity/image-url";

interface GenerateBlogMetadataProps {
  params: { slug: string };
  post: Blog;
}

export async function generateBlogMetadata(
  { params, post }: GenerateBlogMetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { title, slug, author, mainImage, publishedAt, categories } =
    post || {};

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${title} | Serenity - Your Home Services Platform in Nigeria`,
    description:
      (post?.title ?? "")
        .slice(0, 155)
        .replace(/<[^>]+>/g, "")
        .trim() + "...",
    keywords: [
      "home services",
      "cleaning",
      "laundry",
      "repair",
      "Nigeria",
      "house tips",
      categories
        ? categories?.map((category) => category?.title).join(", ")
        : "",
    ],
    openGraph: {
      title,
      description:
        (post?.title ?? "")
          .slice(0, 155)
          .replace(/<[^>]+>/g, "")
          .trim() + "...",
      url: `https://www.serenity.ng/blog/${slug?.current ?? ""} `,
      siteName: "Serenity",

      locale: "en_NG",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description:
        (post?.title ?? "")
          .slice(0, 155)
          .replace(/<[^>]+>/g, "")
          .trim() + "...",
    },
    alternates: {
      canonical: `https://www.serenity.ng/blog/${slug?.current ?? ""}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
