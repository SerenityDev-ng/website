import ImageUrlBuilder from "@sanity/image-url";
import { createClient, type QueryParams } from "next-sanity";
import { postQuery, postQueryBySlug } from "./sanity.query";
import clientConfig from "./sanity.client";
import { Blog } from "../../types";

// import { Blog } from "@/types/blog";

export const client = createClient(clientConfig);
export function imageBuilder(source: string) {
  return ImageUrlBuilder(clientConfig).image(source);
}

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
