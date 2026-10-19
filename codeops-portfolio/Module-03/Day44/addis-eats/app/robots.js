export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/orders", "/cart", "/signin"],
    },
    sitemap: "https://addis-eats.example.com/sitemap.xml",
  };
}
