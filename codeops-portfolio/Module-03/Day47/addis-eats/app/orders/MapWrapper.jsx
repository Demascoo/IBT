"use client";

import dynamic from "next/dynamic";

// Now it's safe to use ssr: false because this is a Client Component
const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "320px",
        background: "#eee",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Loading map...
    </div>
  ),
});

export default function MapWrapper({ area }) {
  return <DeliveryMap area={area} />;
}
