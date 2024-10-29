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
import { getPosts } from "@/lib/sanity.utils";
import BlogItem from "./_components/blog-dummy";
import { Suspense } from "react";
import { Pagination } from "./_components/pagination";
import { Metadata, ResolvingMetadata } from "next";
import { generateBlogMetadata } from "@/lib/metadata-blog";
import { BlogCardLoader } from "./_components/loader";

export async function generateMetadata(
  props: BlogPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateBlogMetadata(props, parent);
}

interface BlogPageProps {
  searchParams: { page?: string };
}

export default async function Blog({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 2;
  const { posts, totalPages, total } = await getPosts(currentPage, pageSize);

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Easy tips to make your home shine.
          </h1>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative aspect-video">
              <Image
                src={blog_banner}
                alt="Family relaxing at home"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Latest Article</h2>
              <ul className="space-y-4">
                {posts.slice(0, 3).map((post) => (
                  <li key={post._id}>
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="text-blue-600 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Articles
          </h2>
          <Suspense fallback={<BlogCardLoader />}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((item) => (
                <BlogCard item={item} key={item._id} />
              ))}
            </div>
          </Suspense>
        </section>

        <Suspense fallback={<div>Loading...</div>}>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </Suspense>
      </main>
    </>
  );
}
