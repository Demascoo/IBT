import Link from "next/link";
import { allDishes } from "@/lib/dishes";

const categories = Array.from(new Set(allDishes.map((d) => d.category))).sort();

export default function MenuLayout({ children }) {
  return (
    <div className="menu-shell">
      <aside className="menu-sidebar">
        <h3>Categories</h3>
        <ul>
          <li>
            <Link href="/menu">All dishes</Link>
          </li>
          {categories.map((c) => (
            <li key={c}>
              <Link href={`/menu?category=${encodeURIComponent(c)}`}>{c}</Link>
            </li>
          ))}
        </ul>
      </aside>

      <section className="menu-content">{children}</section>
    </div>
  );
}
