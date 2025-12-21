import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date().toISOString();
  const changeFrequency = 'weekly';

  const posts = await client.fetch(`
    *[_type == "post"] {
      "slug": slug.current,
      publishedAt
    }
  `);

  const blogRoutes = posts.map((post: any) => ({
    url: `https://www.serenity.ng/blog/${post.slug}`,
    lastModified: post.publishedAt || lastModified,
    changeFrequency: 'weekly',
  }));

  const routes = [
    {
      url: 'https://www.serenity.ng/',
      lastModified,
      changeFrequency,
    },
    {
      url: 'https://www.serenity.ng/about',
      lastModified,
      changeFrequency,
    },
    {
      url: 'https://www.serenity.ng/gifting',
      lastModified,
      changeFrequency,
    },
    {
      url: 'https://www.serenity.ng/blog',
      lastModified,
      changeFrequency,
    },
    {
      url: 'https://www.serenity.ng/employment',
      lastModified,
      changeFrequency,
    },
    {
      url: 'https://www.serenity.ng/privacy-policy',
      lastModified,
      changeFrequency,
    },
    {
      url: 'https://www.serenity.ng/terms-conditions',
      lastModified,
      changeFrequency,
    },
    {
      url: 'https://www.serenity.ng/services/cleaning',
      lastModified,
      changeFrequency,
    },
    {
      url: 'https://www.serenity.ng/services/laundry',
      lastModified,
      changeFrequency,
    },
    {
      url: 'https://www.serenity.ng/services/repair',
      lastModified,
      changeFrequency,
    },
  ];

  return [...routes, ...blogRoutes];
}
