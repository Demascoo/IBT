import Link from "next/link";

export default function SpecialsStrip({ dishes }) {
  if (!dishes?.length) return null;

  return (
    <section
      style={{
        marginBottom: "2rem",
        padding: "1rem",
        background: "#fffbe6",
        border: "1px solid #f0e0a0",
        borderRadius: 8,
      }}
    >
      <h2 style={{ marginTop: 0 }}>⭐ Chef&apos;s Specials</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {dishes.map((d) => (
          <Link
            key={d.id}
            href={`/menu/${d.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              padding: "0.75rem",
              background: "#fff",
              borderRadius: 6,
              border: "1px solid #eee",
            }}
          >
            <strong>{d.nameEn}</strong>
            <div style={{ fontSize: 13, color: "#666" }}>{d.nameAm}</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>{d.priceETB} ETB</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
