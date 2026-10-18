"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useDebounce } from "@/lib/useDebounce";
import Link from "next/link";

export default function SearchBox() {
  const [term, setTerm] = useState("");
  const debounced = useDebounce(term, 300);

  // Null key prevents a fetch when the input is empty
  const { data, error, isLoading } = useSWR(
    debounced.trim()
      ? `/api/dishes/search?q=${encodeURIComponent(debounced)}`
      : null,
    fetcher,
    {
      keepPreviousData: true, // prevents flashing between keystrokes
    },
  );

  return (
    <div
      style={{
        marginBottom: "2rem",
        padding: "1rem",
        background: "#f0f0f0",
        borderRadius: 8,
      }}
    >
      <h3 style={{ marginTop: 0 }}>Search Menu</h3>
      <input
        type="search"
        placeholder="Search dishes (e.g., Doro, Kitfo)..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        style={{
          padding: "0.5rem 0.75rem",
          border: "1px solid #ccc",
          borderRadius: 6,
          width: "100%",
          maxWidth: 400,
        }}
      />

      {!debounced.trim() && (
        <p style={{ color: "#777", fontSize: 13, margin: "0.5rem 0 0" }}>
          Type to search…
        </p>
      )}

      {error && (
        <p style={{ color: "crimson", margin: "0.5rem 0 0" }}>Search failed.</p>
      )}

      {isLoading && !data && (
        <p style={{ color: "#777", margin: "0.5rem 0 0" }}>Searching…</p>
      )}

      {data?.data?.length === 0 && (
        <p style={{ color: "#777", margin: "0.5rem 0 0" }}>
          No dishes match “{data.query}”.
        </p>
      )}

      {data?.data?.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
          {data.data.map((d) => (
            <li
              key={d.id}
              style={{ padding: "0.5rem 0", borderBottom: "1px solid #ddd" }}
            >
              <Link
                href={`/menu/${d.id}`}
                style={{ fontWeight: "bold", color: "#111" }}
              >
                {d.name}
              </Link>{" "}
              — {d.price} {d.currency}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
