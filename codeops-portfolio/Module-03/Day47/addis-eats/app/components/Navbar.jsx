"use client";

import Link from "next/link";
import { useAuth } from "@/lib/useAuth";

export default function Navbar() {
  const { user, loading } = useAuth();

  async function handleSignOut() {
    // Clear the cookie manually
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Force reload to clear state
    window.location.href = "/";
  }

  if (loading) return <div style={{ height: "60px" }} />; // Prevent hydration jump

  const isStaff = user?.role === "staff";

  return (
    <header>
      <nav>
        <Link href="/" className="nav-brand">
          Addis Eats
        </Link>

        {!isStaff && (
          <>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
            <Link href="/orders">Orders</Link>
          </>
        )}

        {isStaff && (
          <Link
            href="/dashboard"
            style={{ color: "var(--brand)", fontWeight: "bold" }}
          >
            Admin Dashboard
          </Link>
        )}

        {user ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginLeft: "auto",
            }}
          >
            <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Hi, {user.name.split(" ")[0]} {isStaff && "(Staff)"}
            </span>
            <button
              onClick={handleSignOut}
              className="btn btn-secondary"
              style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link href="/signin" style={{ marginLeft: "auto" }}>
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}
