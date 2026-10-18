import { db } from "@/lib/db";

export default async function sitemap() {
  const baseUrl = "https://addis-eats.example.com";
  const dishes = await db.dish.findMany();

  const dishUrls = dishes.map((d) => ({
    url: `${baseUrl}/menu/${d.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...dishUrls,
  ];
}
