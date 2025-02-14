import axios from "axios";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { initializeApp } from "firebase/app";
import "leaflet/dist/leaflet.css";

import SignaturePad from "react-signature-canvas";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";

function DetailAntrianPengangkutan() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [jumlah, setJumlah] = React.useState("");
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

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: "1:892978799903:web:3a9747fcbefc9b11f77c2a",
  };
  const app = initializeApp(firebaseConfig);
  const onKeteranganChangeHandler = (event) => {
    setKeterangan(event.target.value);
  };
  const onStatusChangeHandler = (event) => {
    setStatus(event.target.value);
  };
  const onJumlahChangeHandler = (event) => {
    setJumlah(event.target.value);
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
      .get(`${process.env.REACT_APP_API_URL}api/antrian/${id}`)
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

  const onSubmitKirimHandler = async (item) => {
    if (!imageFile) return;
    const storage = getStorage(app);

    const storageRef = ref(storage, `images/${imageFile.name}-${Date.now()}`); // Referensi lokasi gambar di Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, imageFile); // Mulai proses upload

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("gambar di upload");
      },
      (error) => {
        console.error("Error during upload:", error);
      },
      () => {
        // Mendapatkan URL download setelah selesai upload
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          const dataURL = signCanva.current.toDataURL("image/png");
          const storageRefSignature = ref(
            storage,
            `images/signature-${Date.now()}.png`
          );

          await uploadString(storageRefSignature, dataURL, "data_url");

          // Ambil URL download untuk gambar
          const signature = await getDownloadURL(storageRefSignature);
          const dataLaporan = {
            titik_tpa: item.lokasi_pengangkutan.id,
            status: status,
            tanggal_pengangkutan: new Date(),
            pengangkut: localStorage.getItem("id"),
            signature: signature,
            keterangan: keterangan,
            image_url: url,
            jumlah: jumlah,
          };
          await axios
            .post(
              `${process.env.REACT_APP_API_URL}api/laporan-pengangkutan`,
              dataLaporan
            )
            .then(async (response) => {
              await axios
                .delete(
                  `${process.env.REACT_APP_API_URL}api/antrian/${item.id}`
                )
                .then((response) => {
                  console.log(response.data);
                  alert("sukses");
                  window.location.href = "/antrian";
                })
                .catch((error) => {
                  alert(error.message);
                });
            })
            .catch((error) => {
              alert(error.message);
            });

          console.log("File available at", url);
        });
      }
    );
  };
  const onSubmitDeleteHandler = async (item) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}api/antrian/${item.id}`)
      .then((response) => {
        console.log(response.data);
        alert("sukses");
        window.location.href = "/antrian";
      })
      .catch((error) => {
        alert(error.message);
      });
    await axios
      .delete(`${process.env.REACT_APP_API_URL}api/laporan-pengangkutan/`, {
        params: {
          titik_tpa: item.lokasi_pengangkutan.id,
          pengangkut: localStorage.getItem("id"),
        }, // Kirim jenis data melalui query string
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
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
  React.useEffect(() => {
    if (!loading || !data || !location) return;

    const latA = parseFloat(data?.latitude);
    const logA = parseFloat(data?.longitude);
    const latB = parseFloat(location?.latitude);
    const logB = parseFloat(location?.longitude);

    if (!latA || !logA || !latB || !logB) return;

    const jarak = haversine(latA, logA, latB, logB);

    if (jarak !== distance) {
      // 🔹 Cegah infinite loop jika jarak sudah sama
      setDistance(jarak.toFixed(2));
    }
  }, [loading, data, distance, location]);
  if (loading) {
    if (
      location.longitude &&
      location.latitude &&
      data.lokasi_pengangkutan.latitude &&
      data.lokasi_pengangkutan.longitude
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
                        <td className="text-end">Sedang diangkut</td>
                      </tr>
                      <tr>
                        <th scope="row">jarak</th>
                        <td className="text-end">{distance} km</td>
                      </tr>
                      <tr>
                        <th scope="row">Tanggal Pengaduan</th>
                        <td className="text-end">
                          {formatDateTime(new Date())}
                        </td>
                      </tr>
                      <a
                        href={`https://www.google.com/maps/dir/${location.latitude},${location.longitude}/${data.latitude},${data.longitude}`}
                        className="btn btn-primary "
                        target="_blank"
                        rel="noreferrer"
                      >
                        Pergi ke tujuan
                      </a>
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
          <h5 className="card-title mt-5">B. Keterangan Petugas</h5>
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
          <h5 className="card-title">C. Lampiran Foto</h5>
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
          <h5 className="card-title">D. Status</h5>
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
          <h5 className="card-title mb-3">E. Perkiraan jumlah sampah (Kg)</h5>
          <div className="row">
            <div className="col-1"></div>
            <div className="col">
              <div className="mb-5 text-start">
                <input
                  type="number"
                  id="password"
                  className="form-control"
                  placeholder="Masukan jumlah ..."
                  value={jumlah}
                  onChange={onJumlahChangeHandler}
                ></input>
              </div>
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
              Bandung, {formatDateTime(new Date()).split(",")[1].trim()}
              <br></br>Pengadu
              <SignaturePad ref={signCanva} />
              <br></br>( {data.pengangkut.nama} )
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button
                className="btn btn-warning  w-100"
                onClick={() => {
                  onSubmitDeleteHandler(data);
                }}
              >
                Hapus Antrian
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-primary  w-100"
                onClick={() => {
                  onSubmitKirimHandler(data);
                }}
              >
                Kirim Laporan
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default DetailAntrianPengangkutan;
