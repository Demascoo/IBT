import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authenticateUser } from "@/lib/auth";
import Link from "next/link";

export default async function SignInPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const nextUrl = resolvedParams?.next || "/";

  async function signIn(formData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await authenticateUser(email, password);

    if (!user) {
      redirect(`/signin?error=InvalidCredentials&next=${nextUrl}`);
    }

    const cookieStore = await cookies();

    // Set the session cookie to the user's ID
    cookieStore.set("session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    let next = nextUrl;
    if (!next.startsWith("/")) next = "/";
    redirect(next);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <div className="form-card" style={{ width: "100%", maxWidth: "400px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Sign In</h1>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            marginBottom: "2rem",
            fontSize: "0.9rem",
          }}
        >
          Try: customer@addis.com / password123
        </p>

        {resolvedParams?.error && (
          <div
            style={{
              padding: "0.75rem",
              marginBottom: "1.5rem",
              background: "#fee",
              color: "#c00",
              borderRadius: "6px",
              fontSize: "0.9rem",
              textAlign: "center",
            }}
          >
            Invalid email or password.
          </div>
        )}

        <form
          action={signIn}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              required
              className="form-input"
              placeholder="customer@addis.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="btn"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
