import Link from "next/link";

export default function CartPage() {
  return (
    <>
      <h1>Your cart</h1>
      <p>Your cart is empty.</p>
      <Link href="/menu">Back to menu</Link>
    </>
  );
}
