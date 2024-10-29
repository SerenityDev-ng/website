import React from "react";

import { getPostBySlug } from "@/lib/sanity.utils";
import RenderBodyContent from "../_components/render-body";

const SingleBlogPage = async ({ params }: { params: any }) => {
  const post = await getPostBySlug(params.slug);

  return (
    <article className="my-10 container">
      <div className="mb-5">
        <h1 className="text-2xl lg:text-4xl py-2 text-center capitalize font-league-spartan font-semibold text-primary">
          {post.title}
        </h1>
        <p className="pb-1 flex items-center justify-between gap-5 text-muted-foreground max-w-3xl mx-auto">
          {new Date(post.publishedAt).toDateString()}

          <span>{post.author.name}</span>
        </p>

        {/* <p>{post.metadata}</p> */}
      </div>

      <article className="prose lg:prose-xl mt-16">
        <RenderBodyContent post={post} />
      </article>
    </article>
  );
};

export default SingleBlogPage;
