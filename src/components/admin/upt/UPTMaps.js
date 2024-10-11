import React from "react";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function UPTMaps({ data }) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  return (
    <div className="UPTMaps">
      <MapContainer
        center={[-7.047407, 107.583554]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {data.map((item) => {
          // console.log(item.latitude);
          return (
            <div key={item.id}>
              <Marker
                position={[
                  parseFloat(item.latitude),
                  parseFloat(item.longitude),
                ]}
              >
                <Popup>{item.nama_upt}</Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default UPTMaps;
