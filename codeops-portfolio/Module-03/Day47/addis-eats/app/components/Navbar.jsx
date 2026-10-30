"use client";

import Link from "next/link";
import { useAuth } from "@/lib/useAuth";

export default function Navbar() {
  const { user, loading } = useAuth();

  async function handleSignOut() {
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/signin";
  }

  // PREVENT FLASH: If we are still checking the cookie, render nothing
  if (loading) {
    return (
      <header
        style={{ height: "61px", borderBottom: "1px solid var(--border)" }}
      />
    );
  }

  const isStaff = user?.role === "staff";

  return (
    <header>
      <nav>
        
        {isStaff ? (
          <Link
            href="/dashboard"
            className="nav-brand"
            style={{ color: "var(--brand)" }}
          >
            Addis Eats Admin
          </Link>
        ) : (
          <Link href="/" className="nav-brand">
            Addis Eats
          </Link>
        )}

        {/* Customer Links */}
        {!isStaff && user && (
          <>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
            <Link href="/orders">Orders</Link>
          </>
        )}

        {/* Staff Links (Already handled by the brand link above) */}
        {isStaff && null}

        {/* Right side: User Info */}
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
