import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: {
    template: "%s | Addis Eats",
    default: "Addis Eats — Food Delivery",
  },
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  async function signOut() {
    "use server";
    const store = await cookies();
    store.delete("session");
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
              <Link href="/menu">Menu</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/checkout">Checkout</Link>
              <Link href="/orders">Orders</Link>
              <Link href="/dashboard">Dashboard</Link>

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
                    Hi, {session.name.split(" ")[0]}
                  </span>
                  <form action={signOut} style={{ display: "inline" }}>
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
