import Link from "next/link";
import { db } from "@/lib/db";


async function getCategories() {
  const dishes = await db.dish.findMany();
  return Array.from(new Set(dishes.map((d) => d.category))).sort();
}

export default async function MenuLayout({ children }) {
  const categories = await getCategories();

  return (
    <div className="menu-shell">
      <aside className="menu-sidebar">
        <h3 style={{ marginTop: 0 }}>Categories</h3>
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
