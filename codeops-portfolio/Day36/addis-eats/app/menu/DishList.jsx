import Link from "next/link";
import Image from "next/image";

const getDishImage = (id) => {
  const images = {
    dish_1: "https://images.unsplash.com/photo-1548943487-a2e4d43b2c37?w=800",
    dish_2:
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800",
    dish_3:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800",
    dish_4:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
  };
  return images[id] || images.dish_1;
};

export default function DishList({ dishes }) {
  return (
    <div className="dish-grid">
      {dishes.map((d) => (
        <div key={d.id} className="dish-card">
          <Image
            src={getDishImage(d.id)}
            alt={d.name}
            width={120}
            height={120}
            className="dish-image"
          />
          <div className="dish-info">
            <Link
              href={`/menu/${d.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="dish-title">
                <strong>{d.name}</strong>
                <span className="dish-price">
                  {d.price} {d.currency}
                </span>
              </div>
              <p className="dish-desc">{d.description}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
