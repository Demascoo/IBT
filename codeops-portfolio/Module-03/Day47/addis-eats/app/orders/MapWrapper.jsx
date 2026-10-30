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
    const data = localStorage.getItem("addis-orders");
    if (data) {
      const orders = JSON.parse(data);
      if (orders.length > 0) {
        setArea(orders[0].area); // Get the latest order's area
      }
    }
  }, []);

  return <DeliveryMap area={area} />;
}
