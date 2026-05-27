import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://paceclub.run";

const cities = ["london", "stockholm", "new-york", "los-angeles", "chicago", "austin", "gothenburg", "manchester"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: `${APP_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${APP_URL}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${APP_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${APP_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 }
  ];
  for (const c of cities) {
    base.push({
      url: `${APP_URL}/city/${c}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    });
  }
  return base;
}
