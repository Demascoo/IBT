import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";

export const metadata = {
  title: "Addis Eats",
  description: "Ethiopian dishes, delivered.",
};

export default function RootLayout({ children }) {
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
            </nav>
          </header>

          {children}

          <footer>
            <p>© {new Date().getFullYear()} Addis Eats — Made in Addis.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
