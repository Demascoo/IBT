"use client";

import { useActionState, useEffect, Suspense } from "react";
import { authenticateUser } from "@/app/actions";
import { useSearchParams } from "next/navigation";

function SignInForm() {
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/";
  const [state, formAction, pending] = useActionState(authenticateUser, null);

    useEffect(() => {
      if (state?.success) {
        window.location.href = state.redirectTo || "/";
      }
    }, [state]);

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
            marginBottom: "1rem",
            fontSize: "0.85rem",
          }}
        >
          <strong>Customer:</strong> customer@addis.com / password123
          <br />
          <strong>Staff:</strong> staff@addis.com / staff123
        </p>

        {state?.error && (
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
            {state.error}
          </div>
        )}

        {state?.success && (
          <div
            style={{
              padding: "0.75rem",
              marginBottom: "1.5rem",
              background: "#e8f5e9",
              color: "#2e7d32",
              borderRadius: "6px",
              fontSize: "0.9rem",
              textAlign: "center",
            }}
          >
            Success! Redirecting...
          </div>
        )}

        <form
          action={formAction}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" type="email" required className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              required
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="btn"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
