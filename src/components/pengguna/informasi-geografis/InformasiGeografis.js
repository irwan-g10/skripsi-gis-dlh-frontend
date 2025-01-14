import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
function InformasiGeografis() {
  const [dataTpa, setDataTpa] = React.useState([]);
  const [dataUpt, setDataUpt] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [location, setLocation] = React.useState({
    latitude: null,
    longitude: null,
  });
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/titik-tpa`)
      .then((response) => {
        setDataTpa(response.data.result);
        axios
          .get(`http://localhost:5000/api/titik-upt`)
          .then((response) => {
            setDataUpt(response.data.result);
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setLoading(true);
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
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  const redIcon = new L.DivIcon({
    className: "custom-marker-red",
    html: '<div style="width: 20px; height: 20px; background-color: red; border-radius: 50%;"></div>',
    iconSize: [20, 20],
  });
  const blackIcon = new L.DivIcon({
    className: "custom-marker-black",
    html: '<div style="width: 20px; height: 20px; background-color: black; border-radius: 50%;"></div>',
    iconSize: [20, 20],
  });

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
  if (loading) {
    return (
      <div className="InformasiGeografis">
        <div className="pilih-map mb-3">
          <MapContainer
            center={[-7.047407, 107.583554]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {dataTpa.map((item) => {
              // console.log(item.latitude);
              return (
                <div key={item.id}>
                  <Marker
                    position={[
                      parseFloat(item.latitude),
                      parseFloat(item.longitude),
                    ]}
                  >
                    <Popup>{item.nama_tempat}</Popup>
                  </Marker>
                </div>
              );
            })}
            {dataUpt.map((item) => {
              return (
                <Marker
                  icon={redIcon}
                  position={[
                    parseFloat(item.latitude),
                    parseFloat(item.longitude),
                  ]}
                >
                  <Popup>{item.nama_upt}</Popup>
                </Marker>
              );
            })}
            <Marker
              icon={blackIcon}
              position={[
                parseFloat(location.latitude),
                parseFloat(location.longitude),
              ]}
            >
              <Popup>Lokasi Anda</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    );
  }
}

export default InformasiGeografis;
