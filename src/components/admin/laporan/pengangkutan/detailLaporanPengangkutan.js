import axios from "axios";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function DetailLaporanPengangkutan() {
  const [data, setData] = React.useState([]);
  const [dataUser, setDataUser] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // const [status, setStatus] = React.useState("");
  // const [location, setLocation] = React.useState({
  //   latitude: null,
  //   longitude: null,
  // });
  const [lakik, setLakik] = React.useState("12d");
  const [distance, setDistance] = React.useState("12d");
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
  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius bumi dalam km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Jarak dalam km
  }
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
      .get(`${process.env.REACT_APP_API_URL}api/laporan-pengangkutan/${id}`)
      .then((response) => {
        setData(response.data.result);
        // setLoading(true);
        axios
          .get(
            `${
              process.env.REACT_APP_API_URL
            }api/pengguna/${localStorage.getItem("id")}`
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

  React.useEffect(() => {
    if (!loading || !data || !dataUser) return;

    const latA = parseFloat(data.titik_tpa?.latitude);
    const logA = parseFloat(data.titik_tpa?.longitude);
    const latB = parseFloat(dataUser.upt_pengelola?.latitude);
    const logB = parseFloat(dataUser.upt_pengelola?.longitude);

    if (!latA || !logA || !latB || !logB) return;

    const jarak = haversine(latA, logA, latB, logB);

    if (jarak !== distance) {
      // 🔹 Cegah infinite loop jika jarak sudah sama
      setDistance(jarak.toFixed(2));
    }
  }, [loading, data, dataUser, distance]);
  if (loading) {
    console.log(data.image_url);
    if (
      dataUser.upt_pengelola.longitude &&
      dataUser.upt_pengelola.latitude &&
      data.titik_tpa.latitude &&
      data.titik_tpa.longitude
    ) {
      // const latA = parseFloat(data.titik_tpa.latitude);
      // const logA = parseFloat(data.titik_tpa.longitude);
      // const latB = parseFloat(dataUser.upt_pengelola.latitude);
      // const logB = parseFloat(dataUser.upt_pengelola.longitude);
      // const jarak = haversine(latA, logA, latB, logB);
      // console.log(distance + jarak.toFixed(2));
      // setDistance(jarak);

      // const pointA = { lat: latA, lon: logA }; // Contoh titik A (Bandung)
      // const pointB = { lat: latB, lon: logB }; // Contoh titik B (Bandung)
      // const url = `http://router.project-osrm.org/route/v1/driving/${pointA.lon},${pointA.lat};${pointB.lon},${pointB.lat}?overview=false`;
      // axios
      //   .get(url)
      //   .then((response) => {
      //     const route = response.data.routes[0];
      //     const distanceInMeters = route.distance;
      //     const distanceInKm = distanceInMeters / 1000;
      //     setDistance(distanceInKm.toFixed(2)); // Set jarak dan bulatkan ke 2 angka desimal
      //   })
      //   .catch((error) => {
      //     alert(error.message);
      //   });
      return (
        <div className="detail-antrian-pengangkutan container p-5 lh">
          {/* {console.log("halo")} */}
          <h1 className="mb-5">Detail Laporan Pengangkutan</h1>
          <div className="row mb-4">
            <div className="col-5">
              <div className="card">
                <img
                  src={data.titik_tpa.image_url}
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
                        <th scope="row">jarak</th>
                        <td className="text-end">{data.jumlah} Kg</td>
                      </tr>
                      <tr>
                        <th scope="row">Tanggal Pengangkutan</th>
                        <td className="text-end">
                          {formatDateTime(new Date(data.tanggal_pengangkutan))}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Pengangkut</th>
                        <td className="text-end">{data.pengangkut.nama}</td>
                      </tr>
                    </tbody>
                  </table>
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
                          {data.titik_tpa.nama_tempat}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Alamat </th>
                        <td className="text-end">{data.titik_tpa.alamat}</td>
                      </tr>
                      <tr>
                        <th scope="row">Jenis Tong </th>
                        <td className="text-end">
                          {data.titik_tpa.jenis_tong}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Unit Pelayanan Teknis </th>
                        <td className="text-end">
                          {data.titik_tpa.unit_pelayanan_teknis.nama_upt}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Jadwal Pengangkutan</th>
                        <td className="text-end">
                          Isi dari jadwal pengangkutan
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Keterangan</th>
                        <td className="text-end">{data.keterangan}</td>
                      </tr>
                      <tr>
                        <th scope="row">Status</th>
                        <td className="text-end">{data.status}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
                      parseFloat(data.titik_tpa.latitude),
                      parseFloat(data.titik_tpa.longitude),
                    ]}
                  >
                    <Popup>{data.titik_tpa.nama_tempat}</Popup>
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
              <h5 className="card-title mb-3">Lampiran</h5>
              <img
                src={data.image_url}
                className="card-img-top custom-img w"
                alt="..."
              />
            </div>
          </div>
          <div className="tanda-tangan row mt-5">
            <div className="col"></div>

            <div className="col-5 text-center">
              Bandung,{" "}
              {formatDateTime(new Date(data.tanggal_pengangkutan))
                .split(",")[1]
                .trim()}
              <br></br>
              Pengangkut
              <img
                src={data.signature}
                className="card-img-top custom-img"
                alt="..."
              />
              <br></br>
              {data.pengangkut.nama}
            </div>
          </div>
        </div>
      );
    }
  }
}
export default DetailLaporanPengangkutan;
