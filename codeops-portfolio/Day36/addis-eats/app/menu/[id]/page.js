import Link from "next/link";
import { notFound } from "next/navigation";
import { getDish } from "@/lib/db";
import AddToCartButton from "../AddToCartButton";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) return { title: "Dish Not Found" };

  return {
    title: dish.name,
    description: `${dish.description} — ${dish.price} ETB.`,
    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description: `Order ${dish.name} for ${dish.price} ETB.`,
      images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: dish.currency,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <Link href="/menu" style={{ fontSize: 13 }}>
          ← Back to menu
        </Link>
        <h1 style={{ marginTop: "0.5rem" }}>{dish.name}</h1>
        <p style={{ color: "#666" }}>{dish.description}</p>
        <p>
          <strong>
            {dish.price} {dish.currency}
          </strong>
        </p>
        <AddToCartButton dish={dish} />
      </article>
    </main>
  );
}
