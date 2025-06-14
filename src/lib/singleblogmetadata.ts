import { Metadata, ResolvingMetadata } from "next";
import createImageUrlBuilder from "@sanity/image-url"; // Sanity image builder
import { dataset, projectId } from "../../sanity/env"; // Sanity project config
import { Blog } from "../../types";

// Create a local Sanity image builder instance
const builder = createImageUrlBuilder({ projectId, dataset });

// Helper function to generate image URLs
const urlForImage = (source: any) => builder.image(source);

// Placeholder for portable text to plain text conversion
const portableTextToPlainText = (blocks: any[] = []) => {
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children.map((child: any) => child.text).join('');
    })
    .join('\n')
    .replace(/<[^>]+>/g, "") // Basic HTML stripping, might need improvement
    .trim();
};

interface GenerateBlogMetadataProps {
  params: { slug: string };
  post: Blog;
}

export async function generateBlogMetadata(
  { params, post }: GenerateBlogMetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { title, slug, author, mainImage, publishedAt, categories, body } =
    post || {};

  const previousImages = (await parent).openGraph?.images || [];

  const postDescription = post?.body
    ? portableTextToPlainText(post.body).slice(0, 155) + "..."
    : (post?.title ?? "").slice(0, 155).replace(/<[^>]+>/g, "").trim() + "...";

  let ogImageUrl = "https://www.serenity.ng/og-image.jpg"; // Default OG image
  if (mainImage && mainImage.asset && mainImage.asset._ref) {
    ogImageUrl = urlForImage(mainImage.asset._ref).width(1200).height(630).auto("format").url();
  }

  let twitterImageUrl = "https://www.serenity.ng/twitter-image.jpg"; // Default Twitter image
  if (mainImage && mainImage.asset && mainImage.asset._ref) {
    twitterImageUrl = urlForImage(mainImage.asset._ref).auto("format").url();
  }

  return {
    title: `${title} | Serenity - Your Home Services Platform in Nigeria`,
    description: postDescription,
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
      description: postDescription,
      url: `https://www.serenity.ng/blog/${slug?.current ?? ""} `,
      siteName: "Serenity",
      images: [ // Updated images
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title || "Blog post image",
        },
        ...previousImages,
      ],
      locale: "en_NG",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: postDescription,
      images: [twitterImageUrl], // Updated images
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
