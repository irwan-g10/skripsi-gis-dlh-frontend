import React from "react";
import ItemPengangkutan from "./itemPengangkutan";
import { Link, Navigate } from "react-router-dom";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

function ListPengangkutan({ data }) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  const onSubmitHandler = async (item) => {
    const data = {
      lokasi_pengangkutan: item.id,
      nama_tempat: item.nama_tempat,
      alamat: item.alamat,
      latitude: item.latitude,
      longitude: item.longitude,
      pengangkut: localStorage.getItem("id"),
      image_url: item.image_url,
    };
    const dataLaporan = {
      titik_tpa: item.id,
      status: "Sedang di ambil",
      pengangkut: localStorage.getItem("id"),
    };
    // console.log(data);
    await axios
      .post(`http://localhost:5000/api/antrian`, data)
      .then((response) => {
        console.log(response.data);
        alert("sukses");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });

    await axios
      .post(`http://localhost:5000/api/laporan-pengangkutan`, data)
      .then((response) => {
        console.log(response.data);
        alert("sukses");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="ListPengangkutan">
      {data.map((item) => {
        return (
          //   <Link to={"/pengangkutan-detail/" + item.id}>
          <div className="row border rounded p-3 shadow m-5" key={item.id}>
            <div className="col-3 justify-content-center align-items-center d-flex ">
              <div className="row">
                <img
                  src={item.image_url}
                  width="200"
                  className="custom-img-list-pengangkutan mb-3"
                  alt="..."
                />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    onSubmitHandler(item);
                  }}
                >
                  Tambah Antrian
                </button>
              </div>
            </div>
            <div className="col">
              <table className="table">
                <ItemPengangkutan data={item} />
              </table>
            </div>
            <div className="col-3">
              <MapContainer
                center={[parseFloat(item.latitude), parseFloat(item.longitude)]}
                zoom={13}
                style={{ height: "200px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[
                    parseFloat(item.latitude),
                    parseFloat(item.longitude),
                  ]}
                >
                  <Popup>{item.nama_tempat}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
          //   </Link>
        );
      })}
    </div>
  );
}

export default ListPengangkutan;
