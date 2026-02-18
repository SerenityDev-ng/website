import ImageUrlBuilder from "@sanity/image-url";
import { createClient, type QueryParams } from "next-sanity";
import {
  featuredPosts,
  postCategories,
  postQuery,
  postQueryByCategory,
  postQueryBySlug,
  postQueryFeaturedBySlug,
} from "./sanity.query";
import clientConfig from "./sanity.client";
import { Blog, Categories } from "../../types";
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import fs from "fs";
import path from "path";

const localBlogPath = path.join(process.cwd(), "src/content/blog");

function getLocalPostsSync(): Blog[] {
  if (!fs.existsSync(localBlogPath)) return [];
  try {
    const files = fs.readdirSync(localBlogPath);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => {
        const content = fs.readFileSync(path.join(localBlogPath, file), "utf8");
        return JSON.parse(content);
      });
  } catch (e) {
    console.error("Error reading local blog posts", e);
    return [];
  }
}

export async function sanityFetch<QueryResponse>({
  query,
  qParams,
  tags,
}: {
  query: string;
  qParams: QueryParams;
  tags: string[];
}): Promise<QueryResponse | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<QueryResponse>(query, qParams, {
      cache: "force-cache",
      next: { tags, revalidate: 60 },
    });
  } catch (error) {
    console.warn("Sanity fetch failed", error);
    return null;
  }
}

export const getPosts = async (page: number = 1, pageSize: number = 9) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const data: { posts: Blog[]; total: number } | null = await sanityFetch({
    query: postQuery,
    qParams: { start, end },
    tags: ["post", "author", "categories"],
  });

  const allLocal = getLocalPostsSync();
  const sanityPosts = data?.posts || [];

  // Merge posts: Local posts take precedence, then Sanity posts
  // Deduplicate by slug
  const combinedPosts = [...allLocal, ...sanityPosts].reduce((acc, current) => {
    const x = acc.find((item) => item.slug.current === current.slug.current);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, [] as Blog[]);

  // Sort by publishedAt decending
  combinedPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return {
    posts: combinedPosts.slice(start, end),
    currentPage: page,
    totalPages: Math.ceil(combinedPosts.length / pageSize),
    total: combinedPosts.length,
  };
};

export const getPostBySlug = async (slug: string) => {
  const data: Blog | null = await sanityFetch({
    query: postQueryBySlug,
    qParams: { slug },
    tags: ["post", "author", "category"],
  });

  if (data) return data;

  // Fallback to local
  const allLocal = getLocalPostsSync();
  return allLocal.find((p) => p.slug.current === slug) || null;
};
export const getFeaturedPostBySlug = async (slug: string) => {
  const data: Blog | null = await sanityFetch({
    query: postQueryFeaturedBySlug,
    qParams: { slug },
    tags: ["post", "author", "category"],
  });

  return data;
};

export const getPostByCategory = async (
  slug: string,
  page: number = 1,
  pageSize = 9
) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data: { posts: Blog[]; total: number } | null = await sanityFetch({
    query: postQueryByCategory,
    qParams: { slug, start, end },
    tags: ["post", "author", "category"],
  });

  if (data) {
    return {
      posts: data.posts,
      currentPage: page,
      totalPages: Math.ceil(data.total / pageSize),
      total: data.total,
    };
  }

  return {
    posts: [],
    currentPage: page,
    totalPages: 0,
    total: 0,
  };
};

export const getCategories = async () => {
  const data: Categories[] | null = await sanityFetch({
    query: postCategories,
    qParams: {},
    tags: ["category"],
  });
  return data || [];
};

export const getFeaturedPost = async () => {
  const data: Blog[] | null = await sanityFetch({
    query: featuredPosts,
    qParams: {},
    tags: ["post", "author", "category"],
  });

  const sanityFeatured = data || [];
  const allLocal = getLocalPostsSync();

  // Merge and deduplicate
  const combined = [...allLocal.slice(0, 1), ...sanityFeatured].reduce((acc, current) => {
    const x = acc.find((item) => item.slug.current === current.slug.current);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, [] as Blog[]);

  return combined;
};
