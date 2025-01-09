import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function PengangkutanMap({ data }) {
  const [location, setLocation] = React.useState({
    latitude: null,
    longitude: null,
  });

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => console.log(err.message)
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, []);
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  const redIcon = new L.DivIcon({
    className: "custom-marker-red",
    html: '<div style="width: 20px; height: 20px; background-color: red; border-radius: 50%;"></div>',
    iconSize: [20, 20],
  });
  if (location.longitude && location.latitude) {
    return (
      <div className="PengangkutanMap">
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <div className="item-data">
            {data.map((item) => {
              return (
                <Marker
                  key={item.id}
                  //   icon={red}
                  position={[
                    parseFloat(item.latitude),
                    parseFloat(item.longitude),
                  ]}
                >
                  <Popup>{item.nama_tempat}</Popup>
                </Marker>
              );
            })}
            <Marker
              icon={redIcon}
              position={[
                parseFloat(location.latitude),
                parseFloat(location.longitude),
              ]}
            >
              <Popup>Lokasi anda</Popup>
            </Marker>
          </div>
          ;
        </MapContainer>
      </div>
    );
  }
}

export default PengangkutanMap;
