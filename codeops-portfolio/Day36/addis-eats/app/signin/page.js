import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SignInPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const nextUrl = resolvedParams?.next || "/";

  async function signIn(formData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    // In a real app, you would verify the password hash here.
    // For this demo, any email/password combination works.
    if (!email || !password) {
      redirect(`/signin?error=MissingCredentials&next=${nextUrl}`);
    }

    const cookieStore = await cookies();
    cookieStore.set("session", "user_addis_101", {
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
    <main style={{ padding: 0 }}>
      <div className="auth-container">
        {/* Left Side: Image (Hidden on mobile) */}
        <div className="auth-image" aria-hidden="true" />

        {/* Right Side: Form */}
        <div className="auth-form-wrapper">
          <h1>Welcome back</h1>
          <p>Sign in to your Addis Eats account to place orders.</p>

          {resolvedParams?.error && (
            <div
              className="error-box"
              style={{
                padding: "0.75rem",
                marginBottom: "1.5rem",
                fontSize: "0.875rem",
              }}
            >
              Invalid email or password. Please try again.
            </div>
          )}

          <form
            action={signIn}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <div className="input-with-icon">
                <svg
                  className="input-icon"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  ></path>
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="abebe@example.com"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <a href="#" style={{ fontSize: "0.8rem" }}>
                  Forgot password?
                </a>
              </div>
              <div className="input-with-icon">
                <svg
                  className="input-icon"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Sign In
            </button>
          </form>

          <div className="auth-divider">or</div>

          <button
            className="btn btn-secondary"
            style={{ width: "100%" }}
            disabled
          >
            Continue with Google (Coming Soon)
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "2rem",
              fontSize: "0.9rem",
            }}
          >
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </main>
  );
}