"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const sessionCookie = cookies.find((c) => c.startsWith("session="));
    const userId = sessionCookie ? sessionCookie.split("=")[1] : null;

    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }

    import("@/lib/db").then(({ db }) => {
      db.user.findMany().then((users) => {
        const found = users.find((u) => u.id === userId);
        setUser(found || null);
        setLoading(false);
      });
    });
  }, []);

  return { user, loading };
}
