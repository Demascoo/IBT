import { notFound } from "next/navigation";

const dishes = {
  kitfo: { name: "Kitfo", price: 320, desc: "Minced beef with mitmita." },
  shiro: { name: "Shiro", price: 180, desc: "Chickpea stew." },
  "doro-wat": { name: "Doro Wat", price: 400, desc: "Spicy chicken stew." },
};

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = dishes[id];

  if (!dish) notFound();

  return (
    <>
      <h1>{dish.name}</h1>
      <p>{dish.desc}</p>
      <p>
        <strong>{dish.price} ETB</strong>
      </p>
    </>
  );
}
