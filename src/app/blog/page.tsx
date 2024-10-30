import {
  blog_banner,
  blog_one,
  blog_three,
  blog_tow,
  serenity_logo,
} from "@/assets/images";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "./_components/blog-card";
import {
  getCategories,
  getFeaturedPost,
  getPostByCategory,
  getPosts,
} from "@/lib/sanity.utils";
import BlogItem from "./_components/blog-dummy";
import { Suspense } from "react";
import { Pagination } from "./_components/pagination";
import { Metadata, ResolvingMetadata } from "next";
import { generateBlogMetadata } from "@/lib/metadata-blog";
import { BlogCardLoader } from "./_components/loader";
import FeaturedPostCard from "./_components/featured-post-card";
import TopPostCard from "./_components/top-post-card";

export async function generateMetadata(
  props: BlogPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateBlogMetadata(props, parent);
}

interface BlogPageProps {
  searchParams: { page?: string; category?: string };
}

export default async function Blog({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const categorySlug = searchParams.category;
  const pageSize = 2;

  // Fetch categories for the filter menu
  const categories = await getCategories();

  // Fetch posts based on whether a category filter is active
  const { posts, totalPages, total } = categorySlug
    ? await getPostByCategory(categorySlug, currentPage, pageSize)
    : await getPosts(currentPage, pageSize);

  const features = await getFeaturedPost();
  const { posts: topPosts } = await getPosts();
  return (
    <>
      <main className="relative ">
        <aside className="mt-16 bg-primary text-white py-2">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-xl lg:text-5xl xl:text-5xl font-semibold font-league-spartan py-6 border-b border-secondary">
              Serenity Blog
            </h1>

            <div className="flex gap-3 p-5 justify-center items-center max-w-full overflow-x-auto scrollbar-none">
              <Link
                href="/blog"
                className={`uppercase duration-300 rounded-lg p-2 shrink-0 ${
                  !categorySlug
                    ? "bg-secondary text-primary font-semibold"
                    : "text-secondary"
                }`}
              >
                All
              </Link>
              {categories?.map((category) => (
                <Link
                  key={category._id}
                  href={`/blog?category=${category.slug.current}`}
                  className={` uppercase p-2 rounded-lg duration-300  shrink-0 ${
                    categorySlug === category.slug.current
                      ? "font-semibold bg-secondary text-primary"
                      : "text-secondary"
                  }`}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <section className="container mt-9">
          <aside className="flex flex-col lg:flex-row gap-12">
            <section className="flex flex-col gap-5">
              <p className="text-2xl lg:text-4xl font-semibold font-league-spartan">
                Featured posts.
              </p>
              {features &&
                features.length > 0 &&
                features.map((item) => (
                  <FeaturedPostCard item={item} key={item._id} />
                ))}
            </section>
            <section className="pl-8 border-l border-gray-300 flex flex-col gap-5">
              <p className="text-2xl lg:text-4xl font-semibold font-league-spartan">
                Top posts.
              </p>
              {topPosts.length > 0 ? (
                topPosts.map((item) => (
                  <Link key={item._id} href={`/blog/${item?.slug.current}`}>
                    <TopPostCard item={item} />
                  </Link>
                ))
              ) : (
                <p>No top posts yet</p>
              )}
            </section>
          </aside>

          <section className="py-12 mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Featured Articles
            </h2>
            <Suspense fallback={<BlogCardLoader />}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts?.map((item) => <BlogCard item={item} key={item._id} />)}
              </div>
            </Suspense>
          </section>

          <Suspense fallback={<div>Loading...</div>}>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </Suspense>
        </section>
      </main>
    </>
  );
}
