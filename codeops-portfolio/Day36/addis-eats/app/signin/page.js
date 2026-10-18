import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage({ searchParams }) {
  // 1. Await searchParams (Next.js 15/16 requirement)
  const resolvedParams = await searchParams;
  const nextUrl = resolvedParams?.next || "/";

  async function signIn(formData) {
    "use server";

    const email = formData.get("email");
    if (!email) return;

    const cookieStore = await cookies();
    cookieStore.set("session", "user_addis_101", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // 2. Use the resolved nextUrl
    let next = nextUrl;
    if (!next.startsWith("/")) next = "/";

    redirect(next);
  }

  return (
    <main style={{ maxWidth: 400, margin: "4rem auto", padding: "2rem" }}>
      <h1>Sign In</h1>
      <p style={{ color: "#666" }}>Use any email to sign in (mock auth).</p>

      <form
        action={signIn}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          name="email"
          type="email"
          placeholder="abebe@example.com"
          required
          style={{ padding: "0.5rem" }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem",
            background: "#111",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </form>
    </main>
  );
}
