import Link from "next/link";

export default function DishList({ dishes }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {dishes.map((d) => (
        <li key={d.id} style={{ padding: "0.5rem 0" }}>
          <Link href={`/menu/${d.id}`}>{d.name}</Link>
        </li>
      ))}
    </ul>
  );
}
