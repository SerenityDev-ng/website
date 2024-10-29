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

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "5 laundry hacks for busy moms.",
      image: blog_one,
    },
    {
      id: 2,
      title: "Essential electrical safety tips for home owners.",
      image: blog_tow,
    },
    {
      id: 3,
      title: "7 basic tools every home owner should have.",
      image: blog_three,
    },
    {
      id: 4,
      title: "5 laundry hacks for busy moms.",
      image: blog_one,
    },
    {
      id: 5,
      title: "Essential electrical safety tips for home owners.",
      image: blog_tow,
    },
    {
      id: 6,
      title: "7 basic tools every home owner should have.",
      image: blog_three,
    },
  ];
  return (
    <>
      <Head>
        <title>Serenity | Blog - Your Home Services Platform in Nigeria</title>
        <meta
          name="description"
          content="Serenity offers cleaning, laundry, and repair services in Nigeria. Get easy tips to make your home shine and discover our range of home services."
        />
        <meta
          name="keywords"
          content="home services, cleaning, laundry, repair, Nigeria, house tips"
        />
        <meta property="og:title" content="Serenity - Home Services Platform" />
        <meta
          property="og:description"
          content="Discover cleaning, laundry, and repair services in Nigeria with Serenity."
        />
        <meta property="og:image" content={serenity_logo} />
        <meta property="og:url" content="https://www.serenity.ng" />
        <link rel="canonical" href="https://www.serenity.ng" />
      </Head>
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
                <li>
                  <Link
                    href="/article/natural-hacks"
                    className="text-blue-600 hover:underline"
                  >
                    6 Natural hacks to free your home from unpleasant odor →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/article/housekeeping-mistakes"
                    className="text-blue-600 hover:underline"
                  >
                    Common housekeeping mistakes people make →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/article/deep-cleaning"
                    className="text-blue-600 hover:underline"
                  >
                    Dangers of neglecting deep cleaning in your kitchen →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((item) => (
              <BlogCard item={item} key={item.id} />
            ))}
          </div>
        </section>

        <nav className="flex justify-center py-8" aria-label="Pagination">
          <ul className="flex space-x-2">
            {[1, 2, 3].map((page) => (
              <li key={page}>
                <a
                  href={`#page-${page}`}
                  className={`w-3 h-3 rounded-full ${
                    page === 1 ? "bg-purple-600" : "bg-gray-300"
                  }`}
                  aria-current={page === 1 ? "page" : undefined}
                >
                  <span className="sr-only">Page {page}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </>
  );
}
