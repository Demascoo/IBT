export default function Loading() {
  return (
    <main>
      <h1>Your Orders</h1>
      <div
        style={{
          background: "var(--surface)",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
          padding: "1rem",
        }}
      >
        <div
          style={{
            height: "40px",
            marginBottom: "1rem",
            background: "var(--bg-color)",
            borderRadius: "4px",
          }}
        ></div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
          >
            <div className="skeleton" style={{ flex: 1, height: "30px" }}></div>
            <div className="skeleton" style={{ flex: 2, height: "30px" }}></div>
            <div className="skeleton" style={{ flex: 1, height: "30px" }}></div>
          </div>
        ))}
      </div>
    </main>
  );
}
