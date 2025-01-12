import React from "react";
import { Link, Navigate } from "react-router-dom";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import ItemAntrian from "./itemAntrian";

function ListAntrian({ data }) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  const onSubmitHandler = async (item) => {
    if (item.is_pengaduan) {
      console.log("update");
      const dataLaporan = {
        status: "Belum ditindak lanjuti",
        tanggal_pengangkutan: null,
        pengangkut: null,
      };
      await axios
        .patch(
          `http://localhost:5000/api/laporan-pengaduan/${item.lokasi_pengaduan.id}`,
          dataLaporan
        )
        .then((response) => {
          console.log(response.data);
          alert("sukses");
          // window.location.reload();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
    await axios
      .delete(`http://localhost:5000/api/antrian/${item.id}`)
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
    <div className="ListAntrian">
      {data.map((item) => {
        // console.log(item.lokasi_pengaduan?.id);
        return (
          <Link
            to={"/detail-antrian-pengaduan/" + item.lokasi_pengaduan?.id}
            key={item.id}
          >
            <div className="row border rounded p-3 shadow m-5">
              <div className="col-3 justify-content-center align-items-center d-flex ">
                <div className="row">
                  <img
                    src={item.image_url}
                    width="200"
                    className="custom-img-list-pengangkutan mb-3"
                    alt="..."
                  />
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      onSubmitHandler(item);
                    }}
                  >
                    Hapus Antrian
                  </button>
                </div>
              </div>
              <div className="col">
                <table className="table">
                  <ItemAntrian data={item} />
                </table>
              </div>
              <div className="col-3">
                <MapContainer
                  center={[
                    parseFloat(item.latitude),
                    parseFloat(item.longitude),
                  ]}
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
            //{" "}
          </Link>
        );
      })}
    </div>
  );
}

export default ListAntrian;
