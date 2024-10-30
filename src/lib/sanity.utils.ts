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

export async function sanityFetch<QueryResponse>({
  query,
  qParams,
  tags,
}: {
  query: string;
  qParams: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    cache: "force-cache",
    next: { tags },
  });
}

export const getPosts = async (page: number = 1, pageSize: number = 9) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data: { posts: Blog[]; total: number } = await sanityFetch({
    query: postQuery,
    qParams: { start, end },
    tags: ["post", "author", "categories"],
  });
  return {
    posts: data.posts,
    currentPage: page,
    totalPages: Math.ceil(data.total / pageSize),
    total: data.total,
  };
};

export const getPostBySlug = async (slug: string) => {
  const data: Blog = await sanityFetch({
    query: postQueryBySlug,
    qParams: { slug },
    tags: ["post", "author", "category"],
  });

  return data;
};
export const getFeaturedPostBySlug = async (slug: string) => {
  const data: Blog = await sanityFetch({
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
  const data: { posts: Blog[]; total: number } = await sanityFetch({
    query: postQueryByCategory,
    qParams: { slug, start, end },
    tags: ["post", "author", "category"],
  });

  return {
    posts: data.posts,
    currentPage: page,
    totalPages: Math.ceil(data.total / pageSize),
    total: data.total,
  };
};

export const getCategories = async () => {
  const data: Categories[] = await sanityFetch({
    query: postCategories,
    qParams: {},
    tags: ["category"],
  });
  return data;
};

export const getFeaturedPost = async () => {
  const data: Blog[] = await sanityFetch({
    query: featuredPosts,
    qParams: {},
    tags: ["post", "author", "category"],
  });
  return data;
};
