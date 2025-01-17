import axios from "axios";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function DetailLaporanPengaduan() {
  const [data, setData] = React.useState([]);
  const [dataUser, setDataUser] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // const [status, setStatus] = React.useState("");
  // const [location, setLocation] = React.useState({
  //   latitude: null,
  //   longitude: null,
  // });

  const [distance, setDistance] = React.useState(null);
  // const [keterangan, setKeterangan] = React.useState("");
  // const [imageUrl, setImageUrl] = React.useState("");
  // const [imageFile, setImageFile] = React.useState(null);
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
  // const onKeteranganChangeHandler = (event) => {
  //   setKeterangan(event.target.value);
  // };
  // const onStatusChangeHandler = (event) => {
  //   setStatus(event.target.value);
  // };
  // const handleImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImageFile(e.target.files[0]);
  //     setImageUrl(URL.createObjectURL(e.target.files[0]));
  //   }
  // };

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/laporan-pengaduan/${id}`)
      .then((response) => {
        setData(response.data.result);
        axios
          .get(
            `http://localhost:5000/api/pengguna/${localStorage.getItem("id")}`
          )
          .then((response) => {
            setDataUser(response.data.result);
            setLoading(true);
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [id]);
  function formatDateTime(date) {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dayName = days[date.getDay()]; // Nama hari
    const day = date.getDate(); // Tanggal
    const month = months[date.getMonth()]; // Nama bulan
    const year = date.getFullYear(); // Tahun
    const hours = String(date.getHours()).padStart(2, "0"); // Jam (2 digit)
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Menit (2 digit)

    // Format: 22.00 / Sabtu, 18 Agustus 2020
    return `${hours}.${minutes} / ${dayName}, ${day} ${month} ${year}`;
  }

  if (loading) {
    if (
      dataUser.upt_pengelola.longitude &&
      dataUser.upt_pengelola.latitude &&
      data.latitude &&
      data.longitude
    ) {
      const latA = parseFloat(data.latitude);
      const logA = parseFloat(data.longitude);
      const latB = parseFloat(dataUser.upt_pengelola.latitude);
      const logB = parseFloat(dataUser.upt_pengelola.longitude);

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
          <h1 className="mb-5">Detail Laporan Pengaduan</h1>
          <div className="row mb-4">
            <div className="col-5">
              <div className="card">
                <img
                  src={data.image_url}
                  className="card-img-top custom-img"
                  alt="..."
                />
                <div className="card-body">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">Status</th>
                        <td className="text-end">{data.status}</td>
                      </tr>
                      <tr>
                        <th scope="row">jarak</th>
                        <td className="text-end">{distance} km</td>
                      </tr>
                      <tr>
                        <th scope="row">Tanggal Pengaduan</th>
                        <td className="text-end">
                          {formatDateTime(new Date(data.tanggal_pengaduan))}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Tanggal Pengangkutan</th>
                        <td className="text-end">
                          {data.status === "Belum ditindak lanjuti"
                            ? ""
                            : formatDateTime(
                                new Date(data.tanggal_pengangkutan)
                              )}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Pengangkut</th>
                        <td className="text-end">{data.pengangkut?.nama}</td>
                      </tr>
                    </tbody>
                  </table>
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
                        <td className="text-end">{data.nama}</td>
                      </tr>
                      <tr>
                        <th scope="row">Alamat </th>
                        <td className="text-end">{data.alamat_pengadu}</td>
                      </tr>
                      <tr>
                        <th scope="row">Informasi Pengadu </th>
                        <td className="text-end">{data.informasi_pengadu}</td>
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
                        <td className="text-end">{data.lokasi_kejadian}</td>
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
                        <td className="text-end">{data.jenis_kegiatan}</td>
                      </tr>
                      <tr>
                        <th scope="row">Nama Kegiatan dan/atau Usaha </th>
                        <td className="text-end">{data.nama_kegiatan}</td>
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
                    <td className="text-end">{data.waktu_kejadian}</td>
                  </tr>
                  <tr>
                    <th scope="row">Uraian Kejadian </th>
                    <td className="text-end">{data.uraian_kejadian}</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Dampak yang dirasakan akibat pencemaran dan/atau perusakan
                      lingkungan dan/atau perusakan hutan
                    </th>
                    <td className="text-end">{data.dampak_kejadian}</td>
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
                    <td className="text-end">{data.harapan_penyelesaian}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h5 className="card-title mt-3">F. Keterangan Petugas</h5>
          <div className="row">
            <div className="col-1"></div>
            <div className="col">
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row"> </th>
                    <td className="text-end">{data.keterangan}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h5 className="card-title">G. Status</h5>
          <div className="row">
            <div className="col-1"></div>
            <div className="col">
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row"> </th>
                    <td className="text-end">{data.status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <MapContainer
                center={[
                  dataUser.upt_pengelola.latitude,
                  dataUser.upt_pengelola.longitude,
                ]}
                zoom={13}
                style={{ height: "350px", width: "100%" }}
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
                      parseFloat(data.latitude),
                      parseFloat(data.longitude),
                    ]}
                  >
                    <Popup>Permohonan Pengaduan {data.nama}</Popup>
                  </Marker>
                  <Marker
                    icon={redIcon}
                    position={[
                      parseFloat(dataUser.upt_pengelola.latitude),
                      parseFloat(dataUser.upt_pengelola.longitude),
                    ]}
                  >
                    <Popup>{dataUser.upt_pengelola.nama_upt}</Popup>
                  </Marker>
                </div>
                ;
              </MapContainer>
            </div>
            <div className="col">
              <h5 className="card-title mb-3">Lampiran Foto</h5>
              <img
                src={data.image_url_petugas}
                className="card-img-top custom-img w"
                alt="..."
              />
            </div>
          </div>

          <div className="tanda-tangan row mt-5">
            <label className="card-title text-end my-3">
              Bandung,{" "}
              {formatDateTime(new Date(data.tanggal_pengangkutan))
                .split(",")[1]
                .trim()}
            </label>
            <div className="col text-center">
              {/* <br></br> */}
              Pengadu
              <img
                src={data.signature}
                className="card-img-top custom-img"
                alt="..."
              />
              <br></br>
              {data.nama}
            </div>
            <div className="col text-center">
              {/* <br></br> */}
              Pengangkut
              <img
                src={data.signature_petugas}
                className="card-img-top custom-img"
                alt="..."
              />
              <br></br>
              {data.pengangkut?.nama}
            </div>
          </div>
        </div>
        // </div>
      );
    }
  }
}
export default DetailLaporanPengaduan;
