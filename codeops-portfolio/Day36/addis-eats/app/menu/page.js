import { Suspense } from "react";
import { db } from "@/lib/db";
import DishList from "./DishList";
import FilterShell from "./FilterShell";
import SearchBox from "./SearchBox";

export const metadata = {
  title: "Our Menu",
  description:
    "Browse our full menu of traditional Ethiopian stews, tibs, and vegetarian platters.",
  alternates: {
    canonical: "/menu",
  },
};

export const revalidate = 3600;

async function getDishes() {
  await new Promise((r) => setTimeout(r, 1200));
  return db.dish.findMany();
}

async function Dishes() {
  const dishes = await getDishes();

  const byCategory = dishes.reduce((acc, d) => {
    (acc[d.category] ??= []).push(d);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(byCategory).map(([category, list]) => (
        <section key={category} style={{ marginBottom: "2rem" }}>
          <h2>{category}</h2>
          <DishList dishes={list} />
        </section>
      ))}
    </>
  );
}

export default function MenuPage() {
  return (
    <>
      <h1>Our menu</h1>
      <SearchBox />
      <Suspense fallback={<div className="skeleton">Loading dishes…</div>}>
        <FilterShell>
          <Dishes />
        </FilterShell>
      </Suspense>
    </>
  );
}
