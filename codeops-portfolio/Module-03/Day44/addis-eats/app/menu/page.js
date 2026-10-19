import { Suspense } from "react";
import { db } from "@/lib/db";
import DishList from "./DishList";
import FilterShell from "./FilterShell";
import SearchBox from "./SearchBox";
import SpecialsStrip from "./SpecialsStrip";

export const metadata = {
  title: "Our Menu",
  description: "Browse our full menu.",
  alternates: { canonical: "/menu" },
};

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

   const allDishes = await db.dish.findMany(); 

    const specials = allDishes.filter((d) => d.isSpecial);

  return (
    <>
      <h1>Our menu</h1>

  
      {/* {!category && <SpecialsStrip dishes={specials} />} */}

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
