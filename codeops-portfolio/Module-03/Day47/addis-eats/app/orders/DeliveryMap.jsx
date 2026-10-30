"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix for missing icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const AREA_COORDS = {
  Bole: [8.995, 38.7896],
  Kazanchis: [9.018, 38.765],
  Megenagna: [9.02, 38.802],
};

const DEFAULT_COORD = [9.01, 38.78];

export default function DeliveryMap({ area }) {
  // If the area is unknown, default to Addis center
  const center = AREA_COORDS[area] || DEFAULT_COORD;

  return (
    <div
      style={{
        height: "320px",
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        position: "relative",
        zIndex: 0,
      }}
    >
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={center}>
          <Popup>Delivery to {area || "Addis Ababa"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
