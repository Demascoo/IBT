"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "320px", background: "#eee", borderRadius: "8px" }} />
  ),
});

export default function MapWrapper() {
  const [area, setArea] = useState("Bole"); // Default fallback

  useEffect(() => {
    // Read the latest order from LocalStorage
    const data = localStorage.getItem("addis-orders");
    if (data) {
      const orders = JSON.parse(data);
      if (orders.length > 0) {
        // Sort by newest first to get the latest
        const sorted = orders.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setArea(sorted[0].area);
      }
    }
  }, []);

  return <DeliveryMap area={area} />;
}
