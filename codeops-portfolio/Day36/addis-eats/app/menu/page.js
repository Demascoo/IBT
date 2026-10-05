import DishList from "./DishList";
import CategoryBar from "./CategoryBar";

const dishes = [
  { id: "kitfo", name: "Kitfo" },
  { id: "shiro", name: "Shiro" },
  { id: "doro-wat", name: "Doro Wat" },
];

export default function MenuPage() {
  return (
    <>
      <h1>Our menu</h1>
      <CategoryBar categories={["All", "Vegetarian", "Meat"]} />
      <DishList dishes={dishes} />
    </>
  );
}
