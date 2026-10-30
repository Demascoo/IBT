"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ExportButton from "./ExportButton";

function sortOrders(orders, sort, dir) {
  return [...orders].sort((a, b) => {
    let valA = a[sort] || "";
    let valB = b[sort] || "";

    if (sort === "date") {
      valA = new Date(a.createdAt).getTime();
      valB = new Date(b.createdAt).getTime();
    }

    if (valA < valB) return dir === "asc" ? -1 : 1;
    if (valA > valB) return dir === "asc" ? 1 : -1;
    return 0;
  });
}

export default function OrdersTable() {
  const searchParams = useSearchParams();
  const [allOrders, setAllOrders] = useState([]);
  const [mounted, setMounted] = useState(false);

  const sort = searchParams.get("sort") || "date";
  const dir = searchParams.get("dir") || "desc";
  const page = Number(searchParams.get("page") || "1");
  const pageSize = 5;

  useEffect(() => {
    const data = localStorage.getItem("addis-orders");
    if (data) {
      setAllOrders(JSON.parse(data));
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sortedOrders = sortOrders(allOrders, sort, dir);
  const totalPages = Math.ceil(sortedOrders.length / pageSize);
  const paginatedOrders = sortedOrders.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const getSortLink = (column) => {
    const newDir = sort === column && dir === "asc" ? "desc" : "asc";
    return `/orders?sort=${column}&dir=${newDir}&page=1`;
  };

  if (allOrders.length === 0) {
    return (
      <div
        className="form-card"
        style={{ textAlign: "center", padding: "3rem" }}
      >
        <h3>You have no orders yet</h3>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          When you place an order, it will appear here.
        </p>
        <Link href="/menu" className="btn">
          Browse the Menu
        </Link>
      </div>
    );
  }

  return (
    <>
      <ExportButton orders={allOrders} />

      <div
        style={{
          background: "var(--surface)",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontSize: "0.95rem",
          }}
        >
          <caption
            style={{
              padding: "1rem",
              textAlign: "left",
              fontWeight: "bold",
              borderBottom: "1px solid var(--border)",
            }}
          >
            Your order history
          </caption>
          <thead style={{ background: "var(--bg-color)" }}>
            <tr>
              <th style={{ padding: "1rem" }} scope="col">
                <Link href={getSortLink("id")}>Order ID</Link>
              </th>
              <th style={{ padding: "1rem" }} scope="col">
                <Link href={getSortLink("name")}>Customer</Link>
              </th>
              <th style={{ padding: "1rem", textAlign: "right" }} scope="col">
                <Link href={getSortLink("total")}>Total (ETB)</Link>
              </th>
              <th style={{ padding: "1rem" }} scope="col">
                <Link href={getSortLink("date")}>Date</Link>
              </th>
              <th style={{ padding: "1rem" }} scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((o) => (
              <tr
                key={o.id}
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <td style={{ padding: "1rem", fontWeight: "bold" }}>
                  <Link
                    href={`/orders/${o.id}`}
                    style={{ textDecoration: "underline" }}
                  >
                    {o.id}
                  </Link>
                </td>
                <td style={{ padding: "1rem" }}>{o.name}</td>
                <td
                  style={{
                    padding: "1rem",
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {o.total?.toLocaleString() || 0}
                </td>
                <td style={{ padding: "1rem" }}>
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: "1rem" }}>
                  <span
                    style={{
                      padding: "0.25rem 0.5rem",
                      background: "var(--bg-color)",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div
            style={{
              padding: "1rem",
              display: "flex",
              gap: "1rem",
              borderTop: "1px solid var(--border)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              href={`/orders?sort=${sort}&dir=${dir}&page=${page - 1}`}
              style={{
                opacity: page === 1 ? 0.5 : 1,
                pointerEvents: page === 1 ? "none" : "auto",
              }}
              className="btn btn-secondary"
            >
              Previous
            </Link>
            <span>
              Page {page} of {totalPages}
            </span>
            <Link
              href={`/orders?sort=${sort}&dir=${dir}&page=${page + 1}`}
              style={{
                opacity: page === totalPages ? 0.5 : 1,
                pointerEvents: page === totalPages ? "none" : "auto",
              }}
              className="btn btn-secondary"
            >
              Next
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
