import axios from "axios";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import SignaturePad from "react-signature-canvas";

function DetailAntrianPengangkutan() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [location, setLocation] = React.useState({
    latitude: null,
    longitude: null,
  });
  const [keterangan, setKeterangan] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);
  const { id } = useParams(); // Ambil parameter id dari URL
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
  const onKeteranganChangeHandler = (event) => {
    setKeterangan(event.target.value);
  };
  const onStatusChangeHandler = (event) => {
    setStatus(event.target.value);
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const signCanva = useRef({});

  const clearSignature = () => {
    // console.log("button ditekan");
    signCanva.current.clear();
  };
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/antrian/${id}`)
      .then((response) => {
        setData(response.data.result);
        setLoading(true);
      })
      .catch((error) => {
        alert(error.message);
      });
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
  }, [id]);
  // console.log(loading);
  const onSubmitDeleteHandler = async (item) => {
    if (item.is_pengaduan) {
      // console.log("update");
      const dataLaporan = {
        status: "Belum ditindak lanjuti",
        tanggal_pengangkutan: null,
        pengangkut: null,
      };
      await axios
        .patch(
          `http://localhost:5000/api/laporan-pengaduan/${item.lokasi_pengangkutan.id}`,
          dataLaporan
        )
        .then((response) => {
          console.log(response.data);
          // alert("sukses");
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

  if (loading) {
    if (
      location.longitude &&
      location.latitude &&
      data.lokasi_pengangkutan.latitude &&
      data.lokasi_pengangkutan.longitude
    ) {
      return (
        <div className="detail-antrian-pengangkutan container p-5 lh">
          <h1 className="mb-5">Detail Antrian Pengangkutan</h1>
          <div className="row mb-4">
            <div className="col-5">
              <div className="card">
                <img
                  src={data.lokasi_pengangkutan.image_url}
                  className="card-img-top custom-img"
                  alt="..."
                />
                <div className="card-body">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">Status</th>
                        <td className="text-end">
                          {data.lokasi_pengangkutan.status}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">jarak</th>
                        <td className="text-end">...km</td>
                      </tr>
                      <tr>
                        <th scope="row">Tanggal Pengaduan</th>
                        <td className="text-end">
                          {data.lokasi_pengangkutan.tanggal_pengaduan}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    className="btn btn-warning  w-100"
                    onClick={() => {
                      onSubmitDeleteHandler(data);
                    }}
                  >
                    Hapus Antrian
                  </button>
                </div>
              </div>
            </div>
            <div className="col ">
              <h5 className="card-title">A. Informasi TPA</h5>
              <div className="row">
                <div className="col-1"></div>
                <div className="col">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">Nama Tempat</th>
                        <td className="text-end">
                          {data.lokasi_pengangkutan.nama_tempat}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Alamat </th>
                        <td className="text-end">
                          {data.lokasi_pengangkutan.alamat}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Jenis Tong </th>
                        <td className="text-end">
                          {data.lokasi_pengangkutan.jenis_tong}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Unit Pelayanan Teknis </th>
                        <td className="text-end">
                          {
                            data.lokasi_pengangkutan.unit_pelayanan_teknis
                              .nama_upt
                          }
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Jadwal Pengangkutan</th>
                        <td className="text-end">
                          Isi dari jadwal pengangkutan
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

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
              <Marker
                key={data.id}
                //   icon={red}
                position={[
                  parseFloat(data.lokasi_pengangkutan.latitude),
                  parseFloat(data.lokasi_pengangkutan.longitude),
                ]}
              >
                <Popup>{data.lokasi_pengangkutan.nama_tempat}</Popup>
              </Marker>
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
          <h5 className="card-title mt-5">F. Keterangan Petugas</h5>
          <div className="row">
            <div className="col-1"></div>
            <div className="col">
              <textarea
                className="form-control"
                value={keterangan}
                onChange={onKeteranganChangeHandler}
                rows="4"
              ></textarea>
            </div>
          </div>
          <h5 className="card-title">G. Lampiran Foto</h5>
          <div className="row">
            <div className="col-1"></div>
            <div className="col">
              <div className="input-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile02"
                  onChange={handleImageChange}
                />
                <label className="input-group-text" htmlFor="inputGroupFile02">
                  Upload
                </label>
              </div>
            </div>
          </div>
          <h5 className="card-title">H. Status</h5>
          <div className="row">
            <div className="col-1"></div>
            <div className="col">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={onStatusChangeHandler}
              >
                <option value={data.lokasi_pengangkutan.status}>
                  --- Pilih ---
                </option>

                <option value="Sudah diangkut">Sudah diangkut</option>
                <option value="Laporan Palsu">Laporan Palsu</option>
                <option value="Ditunda">Ditunda</option>
              </select>
            </div>
          </div>
          <div className="tanda-tangan row mb-3">
            <div className="col"></div>
            <button
              onClick={clearSignature}
              className="col-1 bg-transparent border-0 justify-content-center align-items-center d-flex"
            >
              <i className="bi bi-eraser fs-1"></i>
            </button>
            <div className="col-5 text-center">
              Soreang, 9 Oktober 2024
              <br></br>Pengadu
              <SignaturePad ref={signCanva} />
              <br></br>( {data.pengangkut.nama} )
            </div>
          </div>
          <button
            className="btn btn-primary  w-100"
            onClick={() => {
              // onSubmitDeleteHandler(data);
            }}
          >
            Tambah Antrian
          </button>
        </div>
      );
    }
  }
}
export default DetailAntrianPengangkutan;
