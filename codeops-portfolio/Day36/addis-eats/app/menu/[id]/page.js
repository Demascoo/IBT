import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishBySlug, getAllSlugs } from "@/lib/dishes";
import AddToCartButton from "../AddToCartButton";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ id: slug }));
}

export const dynamicParams = false;

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = getDishBySlug(id);

  if (!dish) notFound();

  return (
    <main>
      <article>
        <Link href="/menu" style={{ fontSize: 13 }}>
          ← Back to menu
        </Link>

        <h1 style={{ marginTop: "0.5rem" }}>{dish.nameEn}</h1>
        <p style={{ color: "#666", marginTop: 0 }}>{dish.nameAm}</p>

        {dish.tagline && (
          <p>
            <em>{dish.tagline}</em>
          </p>
        )}

        <p>{dish.description}</p>

        <ul style={{ paddingLeft: "1.2rem" }}>
          <li>
            <strong>Price:</strong> {dish.priceETB} ETB
          </li>
          <li>
            <strong>Spice:</strong> {dish.spiceLevel}
          </li>
          <li>
            <strong>Category:</strong> {dish.category}
          </li>
          <li>
            <strong>Servings:</strong> {dish.servings}
          </li>
          {dish.isFasting && (
            <li>
              <strong>Fasting:</strong> Yes
            </li>
          )}
          {dish.isSpecial && (
            <li>
              ⭐ <em>Chef&apos;s Special</em>
            </li>
          )}
        </ul>

        <AddToCartButton dish={dish} />

        <h3 style={{ marginTop: "2rem" }}>Ingredients</h3>
        <ul style={{ paddingLeft: "1.2rem" }}>
          {dish.ingredients.map((ing) => (
            <li key={ing}>{ing}</li>
          ))}
        </ul>
      </article>
    </main>
  );
}
