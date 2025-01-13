import axios from "axios";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import SignaturePad from "react-signature-canvas";

function DetailAntrianPengaduan() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [location, setLocation] = React.useState({
    latitude: null,
    longitude: null,
  });

  const [distance, setDistance] = React.useState(null);
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
  console.log(loading);
  const onSubmitDeleteHandler = async (item) => {
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
        window.location.href = "/antrian";
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  if (loading) {
    if (
      location.longitude &&
      location.latitude &&
      data.lokasi_pengaduan.latitude &&
      data.lokasi_pengaduan.longitude
    ) {
      const latA = parseFloat(data.latitude);
      const logA = parseFloat(data.longitude);
      const latB = parseFloat(location.latitude);
      const logB = parseFloat(location.longitude);

      const pointA = { lat: latA, lon: logA }; // Contoh titik A (Bandung)
      const pointB = { lat: latB, lon: logB }; // Contoh titik B (Bandung)
      const url = `http://router.project-osrm.org/route/v1/driving/${pointA.lon},${pointA.lat};${pointB.lon},${pointB.lat}?overview=false`;
      axios
        .get(url)
        .then((response) => {
          const route = response.data.routes[0];
          const distanceInMeters = route.distance;
          const distanceInKm = distanceInMeters / 1000;
          setDistance(distanceInKm.toFixed(2)); // Set jarak dan bulatkan ke 2 angka desimal
        })
        .catch((error) => {
          alert(error.message);
        });
      return (
        <div className="detail-antrian-pengaduan container p-5 lh">
          {/* {console.log("halo")} */}
          <h1 className="mb-5">Detail Antrian Pengaduan</h1>
          <div className="row mb-4">
            <div className="col-5">
              <div className="card">
                <img
                  src={data.lokasi_pengaduan.image_url}
                  className="card-img-top custom-img"
                  alt="..."
                />
                <div className="card-body">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">Status</th>
                        <td className="text-end">
                          {data.lokasi_pengaduan.status}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">jarak</th>
                        <td className="text-end">{distance} km</td>
                      </tr>
                      <tr>
                        <th scope="row">Tanggal Pengaduan</th>
                        <td className="text-end">
                          {data.lokasi_pengaduan.tanggal_pengaduan}
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
              <h5 className="card-title">A. Identitas Pengadu</h5>
              <div className="row">
                <div className="col-1"></div>
                <div className="col">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">Nama </th>
                        <td className="text-end">
                          {data.lokasi_pengaduan.nama}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Alamat </th>
                        <td className="text-end">
                          {data.lokasi_pengaduan.alamat_pengadu}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Informasi Pengadu </th>
                        <td className="text-end">
                          {data.lokasi_pengaduan.informasi_pengadu}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <h5 className="card-title">B. Lokasi Kejadian</h5>
              <div className="row">
                <div className="col-1"></div>
                <div className="col">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">Alamat </th>
                        <td className="text-end">
                          {data.lokasi_pengaduan.lokasi_kejadian}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <h5 className="card-title">C. Dugaan Sumber atau Penyebab</h5>
              <div className="row">
                <div className="col-1"></div>
                <div className="col">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">Jenis Kegiatan</th>
                        <td className="text-end">
                          {data.lokasi_pengaduan.jenis_kegiatan}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Nama Kegiatan dan/atau Usaha </th>
                        <td className="text-end">
                          {data.lokasi_pengaduan.nama_kegiatan}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <h5 className="card-title">D. Waktu dan Uraian kejadian</h5>
          <div className="row ">
            <div className="col-1"></div>
            <div className="col">
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">
                      Waktu diketahuinya pencemaran dan/atau <br></br>perusakan
                      lingkungan{" "}
                    </th>
                    <td className="text-end">
                      {data.lokasi_pengaduan.waktu_kejadian}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Uraian Kejadian </th>
                    <td className="text-end">
                      {data.lokasi_pengaduan.uraian_kejadian}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Dampak yang dirasakan akibat pencemaran dan/atau perusakan
                      lingkungan dan/atau perusakan hutan
                    </th>
                    <td className="text-end">
                      {data.lokasi_pengaduan.dampak_kejadian}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h5 className="card-title">E. Penyelesaian yang di inginkan</h5>
          <div className="row">
            <div className="col-1"></div>
            <div className="col">
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row"> </th>
                    <td className="text-end">
                      {data.lokasi_pengaduan.harapan_penyelesaian}
                    </td>
                  </tr>
                </tbody>
              </table>
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
                  parseFloat(data.lokasi_pengaduan.latitude),
                  parseFloat(data.lokasi_pengaduan.longitude),
                ]}
              >
                <Popup>Permohonan Pengaduan {data.lokasi_pengaduan.nama}</Popup>
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
                <option value={data.lokasi_pengaduan.status}>
                  --- Pilih ---
                </option>

                <option value="Sudah diangkut">Sudah diangkut</option>
                <option value="Laporan Palsu">Laporan Palsu</option>
                <option value="Ditunda">Ditunda</option>
              </select>
            </div>
          </div>
          <div className="tanda-tangan row">
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
        </div>
      );
    }
  }
}
export default DetailAntrianPengaduan;
