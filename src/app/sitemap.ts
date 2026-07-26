import type { MetadataRoute } from "next";

const baseUrl = "https://heuer.ovh";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { en: baseUrl, ko: `${baseUrl}/ko` },
      },
    },
    {
      url: `${baseUrl}/legal`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: { en: `${baseUrl}/legal`, ko: `${baseUrl}/ko/legal` },
      },
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: { en: `${baseUrl}/privacy`, ko: `${baseUrl}/ko/privacy` },
      },
    },
  ];
}
