"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useDebounce } from "@/lib/useDebounce";
import Link from "next/link";

export default function SearchBox() {
  const [term, setTerm] = useState("");
  const debounced = useDebounce(term, 300);

  const { data, error, isLoading } = useSWR(
    debounced.trim()
      ? `/api/dishes/search?q=${encodeURIComponent(debounced)}`
      : null,
    fetcher,
    { keepPreviousData: true },
  );

  return (
    <div className="search-container">
      <h3>Search Menu</h3>
      <input
        type="search"
        placeholder="Search dishes (e.g., Doro, Kitfo)..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="search-input"
      />

      {/* Show hint if empty */}
      {!debounced.trim() && (
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 13,
            marginTop: "0.5rem",
          }}
        >
          Type to search…
        </p>
      )}

      {error && <p className="form-error">Search failed.</p>}

      {/* Only show "Searching..." if we have a term but no data yet */}
      {isLoading && !data && debounced.trim() && (
        <p style={{ marginTop: "0.5rem" }}>Searching…</p>
      )}

      {/* 
        FIX: Only show the list if debounced.trim() is true. 
        If the user hits backspace and clears the box, debounced.trim() becomes "", 
        and the list disappears instantly.
      */}
      {debounced.trim() && data?.data?.length === 0 && (
        <p style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>
          No dishes match “{data.query}”.
        </p>
      )}

      {debounced.trim() && data?.data?.length > 0 && (
        <ul style={{ listStyle: "none", marginTop: "1rem" }}>
          {data.data.map((d) => (
            <li
              key={d.id}
              style={{
                padding: "0.5rem 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <Link href={`/menu/${d.slug}`} style={{ fontWeight: "bold" }}>
                {d.nameEn}
              </Link>{" "}
              — {d.priceETB} ETB
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
