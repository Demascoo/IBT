import Link from "next/link";
import Image from "next/image";

const getDishImage = (slug) => {
  return `/images/${slug}.jpg`;
};

export default function DishList({ dishes }) {
  return (
    <div className="dish-grid">
      {dishes.map((d) => (
        <div key={d.id} className="dish-card">
          <div
            style={{
              width: "100%",
              height: "180px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "8px",
            }}
          >
            <Image
              src={getDishImage(d.slug)}
              alt={d.nameEn}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>

          <div
            className="dish-info"
            style={{
              marginTop: "1rem",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            
            <Link
              href={`/menu/${d.slug}`}
              style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
            >
              <div className="dish-title">
                <strong>{d.nameEn}</strong>
                <span className="dish-price">{d.priceETB} ETB</span>
              </div>
              <p className="dish-desc" style={{ marginTop: "0.5rem" }}>
                {d.description.substring(0, 80)}...
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
