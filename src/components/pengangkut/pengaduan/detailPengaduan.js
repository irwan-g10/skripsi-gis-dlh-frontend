import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
function DetailPengaduan() {
  const [data, setData] = React.useState([]);
  const [location, setLocation] = React.useState({
    latitude: null,
    longitude: null,
  });
  const [distance, setDistance] = React.useState(null);
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
    axios
      .get(`${process.env.REACT_APP_API_URL}api/laporan-pengaduan/${id}`)
      .then((response) => {
        setData(response.data.result);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [id]);

  const onSubmitHandler = async (item) => {
    const data = {
      lokasi_pengaduan: item.id,
      is_pengaduan: true,
      nama_tempat: "Permohonan Pengangkutan " + item.nama,
      alamat: item.lokasi_kejadian,
      latitude: item.latitude,
      longitude: item.longitude,
      pengangkut: localStorage.getItem("id"),
      image_url: item.image_url,
    };
    const dataLaporan = {
      status: "Sedang diangkut",
      tanggal_pengangkutan: new Date(),
      pengangkut: localStorage.getItem("id"),
    };
    console.log(
      `${process.env.REACT_APP_API_URL}api/laporan-pengaduan/${item.id}`
    );
    await axios
      .post(`${process.env.REACT_APP_API_URL}api/antrian`, data)
      .then((response) => {
        console.log(response.data);
        alert("sukses");
        window.location.href = "/";
      })
      .catch((error) => {
        alert(error.message);
      });

    await axios.patch(
      `${process.env.REACT_APP_API_URL}api/laporan-pengaduan/${item.id}`,
      dataLaporan
    );
  };
  React.useEffect(() => {
    const latA = parseFloat(data.latitude);
    const logA = parseFloat(data.longitude);
    const latB = parseFloat(location.latitude);
    const logB = parseFloat(location.longitude);

    if (!latA || !logA || !latB || !logB) return;

    const jarak = haversine(latA, logA, latB, logB);

    if (jarak !== distance) {
      // 🔹 Cegah infinite loop jika jarak sudah sama
      setDistance(jarak.toFixed(2));
    }
  }, [data, distance, location.latitude, location.longitude]);
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
  if (
    location.longitude &&
    location.latitude &&
    data.latitude &&
    data.longitude
  ) {
    // const latA = parseFloat(data.latitude);
    // const logA = parseFloat(data.longitude);
    // const latB = parseFloat(location.latitude);
    // const logB = parseFloat(location.longitude);

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
      <div className="Detail Pengaduan container p-5 lh">
        <h1 className="mb-5">Detail Pengaduan</h1>
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
                  </tbody>
                </table>
                <button
                  className="btn btn-primary  w-100"
                  onClick={() => {
                    onSubmitHandler(data);
                  }}
                >
                  Tambahkan
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
              position={[parseFloat(data.latitude), parseFloat(data.longitude)]}
            >
              <Popup>Permohonan Pengaduan {data.nama}</Popup>
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
      </div>
    );
  }
}
export default DetailPengaduan;
