import menuData from "@/data/menu.json";
import specialsData from "@/data/specials.json";

export const allDishes = menuData.data;
export const specialDishes = specialsData.data;

export function getDishBySlug(slug) {
  return allDishes.find((d) => d.slug === slug) ?? null;
}

export function getDishById(id) {
  return allDishes.find((d) => d.id === id) ?? null;
}

export function getAllSlugs() {
  return allDishes.map((d) => d.slug);
}
