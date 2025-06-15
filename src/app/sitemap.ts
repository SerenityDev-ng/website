import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();
  const changeFrequency = 'weekly';

  return [
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
}
