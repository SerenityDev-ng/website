import { Metadata, ResolvingMetadata } from "next";

import { headers } from "next/headers";
import { getPosts } from "./sanity.utils";

interface GenerateMetadataProps {
  searchParams: { page?: string };
}

export async function generateBlogMetadata(
  { searchParams }: GenerateMetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const headersList = headers();
  const host = headersList.get("host") || "www.serenity.ng";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // Get the current page from URL params
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 9;

  // Fetch the data for this page
  const { total, posts } = await getPosts(currentPage, pageSize);

  // Get the base metadata from parent
  const previousImages = (await parent).openGraph?.images || [];

  // Calculate page information
  const totalPages = Math.ceil(total / pageSize);
  const pageDescription =
    currentPage > 1
      ? `Page ${currentPage} of ${totalPages} - Browse our collection of home service tips and advice`
      : "Discover expert tips and advice for keeping your home clean, organized, and well-maintained";

  const title =
    currentPage > 1
      ? `Blog - Page ${currentPage} | Serenity - Your Home Services Platform in Nigeria`
      : "Blog | Serenity - Your Home Services Platform in Nigeria";

  // Generate keywords based on current page posts
  const postKeywords = posts
    .flatMap((post) => post.categories?.map((category) => category.title) || [])
    .filter((value, index, self) => self.indexOf(value) === index);

  const canonical = new URL("/blog", baseUrl);
  if (currentPage > 1) {
    canonical.searchParams.set("page", currentPage.toString());
  }

  return {
    title,
    description: pageDescription,
    keywords: [
      "home services",
      "cleaning",
      "laundry",
      "repair",
      "Nigeria",
      "house tips",
      ...postKeywords,
    ],
    openGraph: {
      title,
      description: pageDescription,
      url: canonical.toString(),
      siteName: "Serenity",
      images: [
        {
          url: "/images/serenity_logo.png", // Make sure this path is correct
          width: 1200,
          height: 630,
          alt: "Serenity Logo",
        },
        ...previousImages,
      ],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: pageDescription,
      images: ["/images/serenity_logo.png"], // Make sure this path is correct
    },
    alternates: {
      canonical: canonical.toString(),
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
