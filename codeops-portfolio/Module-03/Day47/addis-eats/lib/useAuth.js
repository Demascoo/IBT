"use client";

import { useEffect, useState } from "react";
import { mockUsers } from "@/lib/users"; // Import users directly

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

    // Find user in the local list
    const found = mockUsers.find((u) => u.id === userId);
    setUser(found || null);
    setLoading(false);
  }, []);

  return { user, loading };
}
