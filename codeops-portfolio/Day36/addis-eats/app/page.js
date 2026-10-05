import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Addis Eats</h1>
      <p>Ethiopian dishes, delivered.</p>
      <Link href="/menu">Browse the menu →</Link>
    </main>
  );
}
