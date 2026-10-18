import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL("https://addis-eats.example.com"),
  title: {
    template: "%s | Addis Eats",
    default: "Addis Eats — Food Delivery in Addis Ababa",
  },
  description:
    "Order Doro Wat, Tibs, and Kitfo from local kitchens. Delivered across Addis.",
  openGraph: {
    title: "Addis Eats",
    description: "Order authentic Ethiopian food, delivered.",
    url: "/",
    siteName: "Addis Eats",
    locale: "en_ET",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
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
      <body className={inter.className}>
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
