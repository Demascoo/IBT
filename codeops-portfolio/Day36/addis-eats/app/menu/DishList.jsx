import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {dishes.map((d) => (
        <li
          key={d.id}
          style={{
            padding: "0.75rem",
            marginBottom: "0.5rem",
            border: "1px solid #eee",
            borderRadius: 8,
            background: "#fff",
          }}
        >
          <Link
            href={`/menu/${d.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <strong>{d.nameEn}</strong>
              <span style={{ color: "#555" }}>{d.priceETB} ETB</span>
            </div>
            <div style={{ color: "#666", fontSize: 14 }}>
              {d.nameAm} · {d.spiceLevel}
            </div>
            {d.isFasting && (
              <span
                style={{
                  display: "inline-block",
                  fontSize: 11,
                  marginTop: 4,
                  padding: "2px 6px",
                  background: "#e8f5e8",
                  borderRadius: 4,
                }}
              >
                Fasting
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
