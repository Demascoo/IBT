"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default Leaflet marker icons missing in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Bole area coordinates [lat, lng]
const COURIER = [8.995, 38.7896];
const DELIVERY = [8.99, 38.795];

export default function DeliveryMap() {
  return (
    <MapContainer
      center={COURIER}
      zoom={14}
      style={{ height: "320px", width: "100%", borderRadius: "8px", zIndex: 0 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* The Courier */}
      <Marker position={COURIER}>
        <Popup>Courier is here</Popup>
      </Marker>

      {/* The Delivery Address */}
      <Marker position={DELIVERY}>
        <Popup>Your delivery address</Popup>
      </Marker>
    </MapContainer>
  );
}
