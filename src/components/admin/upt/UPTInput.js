import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function UPTInput({ isUpdate = false }) {
  const [nama_upt, setNamaUpt] = React.useState("");
  const [alamat, setAlamat] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [markerPosition, setMarkerPosition] = React.useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  React.useEffect(() => {
    if (isUpdate) {
      axios
        .get(`http://localhost:5000/api/titik-upt/${id}`)
        .then((response) => {
          const result = response.data.result;
          setNamaUpt(result.nama_upt);
          setAlamat(result.alamat);
          setLatitude(result.latitude);
          setLongitude(result.longitude);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [id, isUpdate]);

  const onNamaUptChangeHandler = (event) => {
    setNamaUpt(event.target.value);
  };

  const onAlamatChangeHandler = (event) => {
    setAlamat(event.target.value);
  };
  const onLatitudeChangeHandler = (event) => {
    setLatitude(event.target.value);
  };
  const onLongitudeChangeHandler = (event) => {
    setLongitude(event.target.value);
  };

  const ClickableMap = ({ setMarkerPosition }) => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng; // Ambil koordinat klik
        console.log("Koordinat Klik:", lat, lng); // Cetak koordinat ke konsol
        setMarkerPosition([lat, lng]);
        setLatitude(lat);
        setLongitude(lng);
        getAddress(lat, lng);
        // Set posisi marker
      },
    });

    return null; // Komponen ini tidak perlu merender apa pun
  };
  const getAddress = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    if (data && data.display_name) {
      setAlamat(data.display_name);
      console.log(data.display_name);
    } else {
      // setAddress("Address not found");
      console.log("alamat tidak ditemukan");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const postData = {
      nama_upt: nama_upt,
      alamat: alamat,
      latitude: latitude,
      longitude: longitude,
    };
    console.log(postData);

    if (isUpdate) {
      await axios
        .patch(`http://localhost:5000/api/titik-upt/${id}`, postData)
        .then((response) => {
          console.log(response.data);
          alert("sukses");
          navigate("/titik-upt-table");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      await axios
        .post(`http://localhost:5000/api/titik-upt`, postData)
        .then((response) => {
          alert("sukses");
          navigate("/titik-upt-table");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="UPTInput">
      <div className="container">
        <div className="mb-5">
          <h2>
            {isUpdate
              ? "Perbarui Unit Pelayan Teknis"
              : "Tambah Unit Pelayan Teknis"}
          </h2>
        </div>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor=" namaTempat" className="form-label">
              Nama Unit Pelayanan Teknis
            </label>
            <input
              type="input"
              className="form-control"
              placeholder="Masukan nama tempat ..."
              value={nama_upt}
              onChange={onNamaUptChangeHandler}
            />
          </div>
          <div className=" row">
            <div className=" col">
              <div className="mb-3">
                <label htmlFor="latitude" className="form-label">
                  Latitude
                </label>
                <input
                  type="input"
                  className="form-control"
                  placeholder="Masukan latitude ..."
                  value={latitude}
                  onChange={onLatitudeChangeHandler}
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="longitude" className="form-label">
                  Logitude
                </label>
                <input
                  type="input"
                  className="form-control"
                  placeholder="Masukan longitude ...."
                  value={longitude}
                  onChange={onLongitudeChangeHandler}
                />
              </div>
            </div>
          </div>
          <div className="pilih-map mb-3">
            <MapContainer
              center={[-7.047407, 107.583554]} // Koordinat Jakarta
              zoom={14}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <ClickableMap setMarkerPosition={setMarkerPosition} />{" "}
              {/* Komponen untuk menangkap klik */}
              {markerPosition && ( // Jika markerPosition tidak null, tampilkan marker
                <Marker position={markerPosition}>
                  <Popup>
                    Koordinat: {markerPosition[0].toFixed(6)},{" "}
                    {markerPosition[1].toFixed(6)}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

          <div className="mb-3">
            <div className="mb-3">
              <label htmlFor="desa" className="form-label">
                Alamat
              </label>
              <textarea
                className="form-control"
                value={alamat}
                onChange={onAlamatChangeHandler}
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="mb-3 m-3 d-grid">
            <button className={"btn btn-" + (isUpdate ? "success" : "primary")}>
              {isUpdate ? "Perbarui" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UPTInput;
