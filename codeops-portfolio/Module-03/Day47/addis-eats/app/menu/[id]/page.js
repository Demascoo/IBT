import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDish, getAllSlugs } from "@/lib/db";
import AddToCartButton from "../AddToCartButton";

// FORCE STATIC RENDERING
export const dynamic = "force-static";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) return { title: "Dish Not Found" };

  return {
    title: dish.nameEn,
    description: `${dish.description} — ${dish.priceETB} ETB.`,
  };
}

// Pre-build one static HTML file per known dish
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ id: slug }));
}

const getDishImage = (slug) => {
  return `/images/${slug}.jpg`;
};

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.nameEn,
    description: dish.description,
    offers: { "@type": "Offer", price: dish.priceETB, priceCurrency: "ETB" },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/menu"
        style={{
          fontSize: "0.9rem",
          display: "inline-block",
          marginBottom: "1rem",
        }}
      >
        ← Back to menu
      </Link>

      <div
        style={{
          display: "flex",
          gap: "3rem",
          flexWrap: "wrap",
          background: "var(--surface)",
          padding: "2rem",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "500px",
            position: "relative",
            height: "400px",
          }}
        >
          <Image
            src={getDishImage(dish.slug)}
            alt={dish.nameEn || "Dish image"}
            fill
            style={{ objectFit: "cover", borderRadius: "12px" }}
            sizes="(max-width: 768px) 100vw, 500px"
            priority
          />
        </div>

        <div
          style={{
            flex: "1 1 300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 style={{ marginTop: 0, marginBottom: "0.25rem" }}>
            {dish.nameEn}
          </h1>
          <h3
            style={{
              color: "var(--text-muted)",
              marginBottom: "1rem",
              fontWeight: "normal",
            }}
          >
            {dish.nameAm}
          </h3>

          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--brand)",
              fontWeight: "bold",
              marginBottom: "1.5rem",
            }}
          >
            {dish.priceETB} ETB
          </p>

          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "2rem",
              fontSize: "1.1rem",
              lineHeight: 1.8,
            }}
          >
            {dish.description}
          </p>

          <div style={{ marginTop: "auto" }}>
            <AddToCartButton dish={dish} />
          </div>
        </div>
      </div>
    </main>
  );
}
