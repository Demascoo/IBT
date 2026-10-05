"use client";

import { useState } from "react";

export default function CategoryBar({ categories }) {
  const [selected, setSelected] = useState("All");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        marginBottom: "1rem",
      }}
    >
      {["All", ...categories].map((c) => (
        <button
          key={c}
          onClick={() => setSelected(c)}
          style={{
            padding: "0.4rem 0.8rem",
            border: "1px solid #ccc",
            borderRadius: 999,
            background: selected === c ? "#111" : "#fff",
            color: selected === c ? "#fff" : "#111",
            cursor: "pointer",
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
