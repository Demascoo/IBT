import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";

export const dynamic = "force-static";

export default async function HomePage() {
  const allDishes = await db.dish.findMany();
  const featuredDishes = allDishes.filter((d) => d.isSpecial).slice(0, 3);

  return (
    <main style={{ padding: 0, background: "var(--bg-color)" }}>
      {/* ── HERO SECTION ── */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "10rem 2rem",
          background:
            "radial-gradient(circle at center, #2A1B18 0%, #0E0B0A 100%)",
          minHeight: "600px",
          position: "relative",
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              color: "var(--accent-gold)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "1rem",
              fontSize: "0.9rem",
            }}
          >
            Authentic Ethiopian Cuisine
          </p>
          <h1
            style={{
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              color: "#ffffff",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-serif)",
              lineHeight: 1.1,
            }}
          >
            Experience Addis <br />
            <span style={{ color: "var(--brand)" }}>At Home</span>
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#B0B0B0",
              maxWidth: "600px",
              margin: "0 auto 3rem",
              fontWeight: 300,
            }}
          >
            Traditional dishes prepared fresh and delivered to your door. From
            fiery Kitfo to our vegan Beyaynetu.
          </p>
          <Link
            href="/menu"
            className="btn"
            style={{
              fontSize: "1rem",
              padding: "1.2rem 3rem",
              borderRadius: "50px",
              boxShadow: "0 10px 25px rgba(179, 38, 30, 0.4)",
            }}
          >
            Order Now
          </Link>
        </div>
      </section>

      {/* ── FEATURED DISHES ── */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "-5rem auto 6rem",
          padding: "0 2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {featuredDishes.map((dish) => (
            <Link
              key={dish.id}
              href={`/menu/${dish.slug}`}
              className="dish-card"
              style={{ textDecoration: "none" }}
            >
              <div
                style={{ position: "relative", height: "250px", width: "100%" }}
              >
                <Image
                  src={`/images/${dish.slug}.jpg`}
                  alt={dish.nameEn}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div style={{ padding: "2rem" }}>
                <div className="dish-title">
                  <strong>{dish.nameEn}</strong>
                  <span className="dish-price">{dish.priceETB} ETB</span>
                </div>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {dish.nameAm}
                </p>
                <p className="dish-desc">
                  {dish.description.substring(0, 70)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
