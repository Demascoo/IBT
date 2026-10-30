import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";
import { getSession } from "@/lib/session";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://addis-eats.vercel.app",
  ),
  title: {
    template: "%s | Addis Eats",
    default: "Addis Eats — Food Delivery",
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const session = await getSession();
  const isStaff = session?.role === "staff";

  async function signOut() {
    "use server";
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.delete("session");
    const { redirect } = await import("next/navigation");
    redirect("/");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header>
            <nav>
              <Link href="/" className="nav-brand">
                Addis Eats
              </Link>

              {/* CUSTOMER LINKS (Only show if NOT staff) */}
              {!isStaff && (
                <>
                  <Link href="/menu">Menu</Link>
                  <Link href="/cart">Cart</Link>
                  <Link href="/checkout">Checkout</Link>
                  <Link href="/orders">Orders</Link>
                </>
              )}

              {/* STAFF LINKS (Only show if staff) */}
              {isStaff && (
                <Link
                  href="/dashboard"
                  style={{ color: "var(--brand)", fontWeight: "bold" }}
                >
                  Admin Dashboard
                </Link>
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
                  <span
                    style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}
                  >
                    Hi, {session.name.split(" ")[0]} {isStaff && "(Staff)"}
                  </span>
                  <form action={signOut}>
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                    >
                      Sign Out
                    </button>
                  </form>
                </div>
              ) : (
                <Link href="/signin" style={{ marginLeft: "auto" }}>
                  Sign In
                </Link>
              )}
            </nav>
          </header>

          {children}

          <footer>
            <p>© {new Date().getFullYear()} Addis Eats</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
