import { Suspense } from "react";
import { db } from "@/lib/db";
import DishList from "./DishList";
import SearchBox from "./SearchBox";

export const metadata = {
  title: "Our Menu",
  description: "Browse our full menu.",
  alternates: { canonical: "/menu" },
};

// REMOVE force-static so the page can read URL parameters
export const dynamic = "force-dynamic";

async function Dishes({ category }) {
  const allDishes = await db.dish.findMany();

  // Filter by category if one is selected
  const filtered = category
    ? allDishes.filter((d) => d.category === category)
    : allDishes;

  // Group them
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
        <section key={cat} style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.75rem",
              borderBottom: "2px solid var(--border)",
              paddingBottom: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            {cat}
          </h2>
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
      <h1 style={{ fontFamily: "var(--font-serif)", marginBottom: "1rem" }}>
        Our Menu
      </h1>
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
