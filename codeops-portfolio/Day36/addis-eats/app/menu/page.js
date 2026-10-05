import { Suspense } from "react";
import { allDishes, specialDishes } from "@/lib/dishes";
import DishList from "./DishList";
import SpecialsStrip from "./SpecialsStrip";
import FilterShell from "./FilterShell";

export const revalidate = 3600;

async function getDishes() {
  await new Promise((r) => setTimeout(r, 1200));
  return allDishes;
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

      <SpecialsStrip dishes={specialDishes} />

      <Suspense fallback={<div className="skeleton">Loading dishes…</div>}>
        <FilterShell>
          <Dishes />
        </FilterShell>
      </Suspense>
    </>
  );
}
