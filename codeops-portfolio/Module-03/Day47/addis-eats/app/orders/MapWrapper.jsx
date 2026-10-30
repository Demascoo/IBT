"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "320px", background: "#eee", borderRadius: "8px" }} />
  ),
});

export default function MapWrapper({ area }) {
  return <DeliveryMap area={area} />;
}
