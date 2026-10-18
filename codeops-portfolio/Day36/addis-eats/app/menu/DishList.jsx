import Link from "next/link";
import Image from "next/image";
const getDishImage = (id) => {
  const images = {
    dish_1: "https://images.unsplash.com/photo-1548943487-a2e4d43b2c37?w=800", // Doro Wat
    dish_2:
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800", // Beyaynetu
    dish_3:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800", // Kitfo
    dish_4:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800", // Shiro
  };
  return images[id] || images.dish_1;
};

export default function DishList({ dishes }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "1rem" }}>
      {dishes.map((d) => (
        <li
          key={d.id}
          style={{
            padding: "1rem",
            border: "1px solid #eee",
            borderRadius: 8,
            background: "#fff",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {/* 
            width & height are mandatory (aspect ratio).
            sizes tells the browser: "On mobile, take 100vw. On desktop, take 100px."
          */}
          <Image
            src={getDishImage(d.id)}
            alt={d.name}
            width={100}
            height={100}
            sizes="(max-width: 768px) 100vw, 100px"
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
          <div>
            <Link
              href={`/menu/${d.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}
              >
                <strong style={{ fontSize: "1.1rem" }}>{d.name}</strong>
                <span style={{ color: "#555" }}>
                  {d.price} {d.currency}
                </span>
              </div>
              <p style={{ margin: "0.5rem 0 0", color: "#666", fontSize: 14 }}>
                {d.description}
              </p>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
