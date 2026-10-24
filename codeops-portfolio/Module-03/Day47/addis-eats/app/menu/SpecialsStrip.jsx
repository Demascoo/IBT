import Link from "next/link";
import Image from "next/image";

const getDishImage = (slug) => {
  return `/images/${slug}.jpg`;
};

export default function SpecialsStrip({ dishes }) {
  if (!dishes || dishes.length === 0) return null;

  return (
    <section
      style={{
        padding: "2rem",
        background: "#fffbe6",
        border: "1px solid #f0e0a0",
        borderRadius: "var(--radius)",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          color: "#8c6b00",
          fontSize: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        ⭐ Chef&apos;s Specials
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {dishes.map((d) => (
          <Link
            key={d.id}
            href={`/menu/${d.slug}`}
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              borderRadius: "12px",
              border: "1px solid #eee",
              textDecoration: "none",
              color: "inherit",
              overflow: "hidden",
              boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "200px",
                background: "#f5f5f5",
              }}
            >
              <Image
                src={getDishImage(d.slug)}
                alt={d.nameEn || "Dish"}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>

            <div
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.5rem",
                }}
              >
                <strong style={{ fontSize: "1.25rem" }}>
                  {d.nameEn || "Unknown Dish"}
                </strong>
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: "var(--brand)",
                    whiteSpace: "nowrap",
                    marginLeft: "1rem",
                  }}
                >
                  {d.priceETB || "0"} ETB
                </span>
              </div>

              <div
                style={{
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  fontStyle: "italic",
                  marginBottom: "1rem",
                }}
              >
                {d.nameAm}
              </div>

              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {d.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
