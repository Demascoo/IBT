import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "./components/Navbar";
import { getSession } from "@/lib/session";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://addis-eats.vercel.app",
  ),
  title: {
    template: "%s | Addis Eats",
    default: "Addis Eats — Authentic Ethiopian Food",
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <Providers>
          <Navbar initialSession={session} />

          {children}

          <footer>
            <p>
              © {new Date().getFullYear()} Addis Eats — Made with love in Addis
              Ababa.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
