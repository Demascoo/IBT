"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ initialSession }) {
  const router = useRouter();
  const session = initialSession;
  const isStaff = session?.role === "staff";

  async function handleSignOut() {
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/signin");
    router.refresh();
  }

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

        {!isStaff && session && (
          <>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
            <Link href="/orders">Orders</Link>
          </>
        )}

        {session ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginLeft: "auto",
            }}
          >
            <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Hi, {session.name.split(" ")[0]} {isStaff && "(Staff)"}
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
