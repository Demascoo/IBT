import { Suspense } from "react";
import { db } from "@/lib/db";
import DishList from "./DishList";
import SearchBox from "./SearchBox";

export const metadata = {
  title: "Our Menu",
  description: "Browse our full menu.",
  alternates: { canonical: "/menu" },
};

export const dynamic = "force-static";
export const revalidate = 3600;

async function Dishes({ category }) {
  const allDishes = await db.dish.findMany();

  const filtered = category
    ? allDishes.filter((d) => d.category === category)
    : allDishes;

  const byCategory = filtered.reduce((acc, d) => {
    (acc[d.category] ??= []).push(d);
    return acc;
  }, {});

  if (filtered.length === 0) {
    return (
      <p style={{ marginTop: "2rem" }}>No dishes found in this category.</p>
    );
  }

  return (
    <>
      {Object.entries(byCategory).map(([cat, list]) => (
        <section key={cat} style={{ marginBottom: "2.5rem" }}>
          <h2>{cat}</h2>
          <DishList dishes={list} />
        </section>
      ))}
    </>
  );
}

export default async function MenuPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category;

  return (
    <>
      <h1>Our menu</h1>
      <SearchBox />
      <Suspense
        fallback={
          <div className="skeleton" style={{ height: "400px" }}>
            Loading dishes…
          </div>
        }
      >
        <Dishes category={category} />
      </Suspense>
    </>
  );
}
