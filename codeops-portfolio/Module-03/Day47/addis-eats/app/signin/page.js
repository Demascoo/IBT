"use client";

import { useActionState, useEffect } from "react";
import { authenticateUser } from "@/app/actions";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/";

  const [state, formAction, pending] = useActionState(authenticateUser, null);

  useEffect(() => {
    if (state?.success) {
  
      window.location.href = nextUrl;
    }
  }, [state, nextUrl]);

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

        <form
          action={formAction}
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
