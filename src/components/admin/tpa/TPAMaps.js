import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function TPAMaps() {
  const positionMonas = [-6.17511, 106.865039]; // Monas
  const positionGBK = [-6.218607, 106.801445];
  // Gelora Bung Karno (GBK)

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  return (
    <div className="AdminMaps">
      <MapContainer
        center={positionMonas}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={positionMonas}>
          <Popup>Ini Monas</Popup>
        </Marker>
        <Marker position={positionGBK}>
          <Popup>Ini GBK</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default TPAMaps;
