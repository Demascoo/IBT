import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Addis Eats",
  description: "Ethiopian dishes, delivered.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/">Addis Eats</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>

        {children}

        <footer>
          <p>© {new Date().getFullYear()} Addis Eats — Made in Addis.</p>
        </footer>
      </body>
    </html>
  );
}
