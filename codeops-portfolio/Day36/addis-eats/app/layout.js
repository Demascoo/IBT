import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Addis Eats",
};

export default async function RootLayout({ children }) {
  // Check if user is signed in
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  async function signOut() {
    "use server";
    const store = await cookies();
    store.delete("session");
    redirect("/");
  }

  return (
    <html lang="en">
      <body>
        <Providers>
          <header>
            <nav>
              <Link href="/">Addis Eats</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/checkout">Checkout</Link>
              <Link href="/orders">Orders</Link>

              {session ? (
                <form action={signOut} style={{ display: "inline" }}>
                  <button
                    type="submit"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Sign Out
                  </button>
                </form>
              ) : (
                <Link href="/signin">Sign In</Link>
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
