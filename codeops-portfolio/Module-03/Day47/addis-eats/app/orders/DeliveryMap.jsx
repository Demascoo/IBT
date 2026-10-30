"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix missing default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom red icon for the restaurant
const restaurantIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Addis Eats Restaurant Location (Fixed)
const RESTAURANT_COORD = [8.998, 38.792];

// Delivery Area Coordinates
const AREA_COORDS = {
  Bole: [8.995, 38.7896],
  Kazanchis: [9.018, 38.765],
  Megenagna: [9.02, 38.802],
};

const DEFAULT_COORD = [9.01, 38.78];

export default function DeliveryMap({ area }) {
  const deliveryCoord = AREA_COORDS[area] || DEFAULT_COORD;

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
        center={RESTAURANT_COORD}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* 1. Addis Eats Location (Red Pin) */}
        <Marker position={RESTAURANT_COORD} icon={restaurantIcon}>
          <Popup>Addis Eats Kitchen</Popup>
        </Marker>

        {/* 2. Delivery Address (Blue Pin) */}
        <Marker position={deliveryCoord}>
          <Popup>Delivery to {area}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
