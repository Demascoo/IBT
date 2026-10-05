export default function CategoryBar({ categories }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
      {categories.map((c) => (
        <button key={c}>{c}</button>
      ))}
    </div>
  );
}
