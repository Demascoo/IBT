import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";

// FORCE STATIC RENDERING
export const dynamic = "force-static";

export default async function HomePage() {
  const allDishes = await db.dish.findMany();

  // Get 3 dishes to feature
  const featuredDishes = allDishes.filter((d) => d.isSpecial).slice(0, 3);

  return (
    <main style={{ padding: 0, background: "#fff" }}>
      {/* ── HERO SECTION ── */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "6rem 2rem",
          backgroundColor: "#1a1a1a",
          borderBottom: "4px solid var(--brand)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            color: "#ffffff",
            marginBottom: "1rem",
            fontFamily: "serif",
          }}
        >
          Addis Eats
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#cccccc",
            maxWidth: "600px",
            margin: "0 auto 2rem",
          }}
        >
          Traditional Ethiopian food, prepared fresh and delivered to your door.
        </p>
        <Link
          href="/menu"
          className="btn"
          style={{
            fontSize: "1.1rem",
            padding: "0.8rem 2rem",
            borderRadius: "4px",
          }}
        >
          Order Now
        </Link>
      </section>

      {/* ── FEATURED DISHES ── */}
      <section
        style={{ maxWidth: "1000px", margin: "4rem auto", padding: "0 2rem" }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            Our Specialties
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            A taste of Ethiopia's finest dishes.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {featuredDishes.map((dish) => (
            <Link
              key={dish.id}
              href={`/menu/${dish.slug}`}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "250px",
                  width: "100%",
                  marginBottom: "1rem",
                }}
              >
                <Image
                  src={`/images/${dish.slug}.jpg`}
                  alt={dish.nameEn}
                  fill
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "0.5rem",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{dish.nameEn}</h3>
                <span style={{ fontWeight: "bold" }}>{dish.priceETB} ETB</span>
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.9rem",
                  marginTop: "0.5rem",
                }}
              >
                {dish.nameAm}
              </p>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <Link
            href="/menu"
            style={{ fontSize: "1.1rem", textDecoration: "underline" }}
          >
            View the full menu
          </Link>
        </div>
      </section>
    </main>
  );
}
