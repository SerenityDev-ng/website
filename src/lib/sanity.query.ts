import { groq } from "next-sanity";
const postData = `{
  title,
  categories[]->{
      _id,
      title
    },
  slug,
  tags,
  author->{
    _id,
    name,
    slug,
    image,
  },
  mainImage,
  publishedAt,
  body,
  
}`;

export const postQuery = groq`{
    "posts": *[_type == "post"] | order(publishedAt desc) [$start...$end] {
  title,
  categories[]->{
      _id,
      title
    },
  slug,
  tags,
  author->{
    _id,
    name,
    slug,
    image,
  },
  mainImage,
  publishedAt,
  body
},
"total": count(*[_type == "post"])
}`;

export const postQueryBySlug = groq`*[_type == "post" && slug.current == $slug][0] ${postData}`;

export const postQueryByAuthor = groq`*[_type == "post" && author->slug.current == $slug] ${postData}`;

export const postQueryByCategory = groq`*[_type == "post" && $slug in categories[]->slug.current] ${postData}`;
