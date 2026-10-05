"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        type="search"
        placeholder="Search dishes…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "0.5rem 0.75rem",
          border: "1px solid #ccc",
          borderRadius: 6,
          width: "100%",
          marginBottom: "1rem",
        }}
      />
      {children}
    </div>
  );
}
