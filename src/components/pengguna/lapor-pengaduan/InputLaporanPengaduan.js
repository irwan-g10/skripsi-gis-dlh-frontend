/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
import React, { useRef } from "react";
import axios from "axios";
import SignaturePad from "react-signature-canvas";
import { initializeApp } from "firebase/app";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  uploadString,
} from "firebase/storage";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function InputLaporanPengaduan() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [nearestCity, setNearestCity] = React.useState("");
  const [distance, setDistance] = React.useState("");
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.latitude,
          });
          axios
            .get(
              `${process.env.REACT_APP_API_URL}api/titik-upt/nearest?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
            )
            .then((response) => {
              const upt = response.data.result;
              setData(upt);
              const graph = {
                Start: {},
              };
              upt.forEach((item) => {
                graph.Start[item.id] = parseFloat(item.distance);
              });

              const { nearestCity, distance } = dijkstra(graph, "Start");
              setNearestCity(nearestCity);
              setDistance(distance);
              setIsLoading(true);
            })
            .catch((error) => {
              alert(error.message);
            });
        },
        (err) => console.log(err.message)
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, []);
  const [nama, setNama] = React.useState("");
  const [alamatPengadu, setAlamatPengadu] = React.useState("");
  const [lokasiKejadian, setLokasiKejadian] = React.useState("");
  const [jenisKegiatan, setJenisKegiatan] = React.useState("");
  const [namaKegiatan, setNamaKegiatan] = React.useState("");
  const [waktuKejadian, setWaktuKejadian] = React.useState("");
  const [uraianKejadian, setUraianKejadian] = React.useState("");
  const [dampakkejadian, setDampakKejadian] = React.useState("");
  const [harapanPenyelesaian, setHarapanPenyelesaian] = React.useState("");
  const [informasiPengadu, setInformasiPengadu] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);
  const [signature, setSignature] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [location, setLocation] = React.useState({
    latitude: null,
    longitude: null,
  });
  const [spinnerLoading, setSpinnerLoading] = React.useState(false);

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
  const [markerPosition, setMarkerPosition] = React.useState(null); // Untuk menyimpan posisi marker

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
      setLokasiKejadian(data.display_name);
      console.log(data.display_name);
    } else {
      // setAddress("Address not found");
      console.log("alamat tidak ditemukan");
    }
  };

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const onNamaChangeHandler = (event) => {
    setNama(event.target.value);
  };
  const onAlamatPengaduChangeHandler = (event) => {
    setAlamatPengadu(event.target.value);
  };
  const onLokasiKejadianChangeHandler = (event) => {
    setLokasiKejadian(event.target.value);
  };
  const onJenisKegiatanChangeHandler = (event) => {
    setJenisKegiatan(event.target.value);
  };
  const onNamaKegiatanChangeHandler = (event) => {
    setNamaKegiatan(event.target.value);
  };
  const onWaktuKejadianChangeHandler = (event) => {
    setWaktuKejadian(event.target.value);
  };
  const onUraianKejadianChangeHandler = (event) => {
    setUraianKejadian(event.target.value);
  };
  const onDampakKejadianChangeHandler = (event) => {
    setDampakKejadian(event.target.value);
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  const onHarapanPenyelesaianChangeHandler = (event) => {
    setHarapanPenyelesaian(event.target.value);
  };

  const onInformasiPengaduChangeHandler = (event) => {
    setInformasiPengadu(event.target.value);
  };

  function dijkstra(graph, start) {
    // Inisialisasi jarak awal
    const distances = {};
    const visited = new Set();

    // Tetapkan jarak awal ke Infinity, kecuali node start
    for (let neighbor in graph[start]) {
      distances[neighbor] = graph[start][neighbor];
    }

    // Inisialisasi jarak node awal ke dirinya sendiri dengan 0
    distances[start] = 0;

    // Cari node dengan jarak terpendek yang belum dikunjungi
    const findNearestCity = () => {
      let nearest = null;

      for (let city in distances) {
        if (!visited.has(city)) {
          if (nearest === null || distances[city] < distances[nearest]) {
            nearest = city;
          }
        }
      }

      return nearest;
    };

    // Mulai pencarian
    while (visited.size < Object.keys(graph[start]).length) {
      const nearestCity = findNearestCity();
      visited.add(nearestCity);
    }

    // Temukan kota dengan jarak terpendek
    const nearestCity = Object.keys(distances).reduce((nearest, city) => {
      if (
        city !== start &&
        (nearest === null || distances[city] < distances[nearest])
      ) {
        return city;
      }
      return nearest;
    }, null);

    return { nearestCity, distance: distances[nearestCity] };
  }

  // Data graf
  // const graph = {
  //   Start: {},
  // };

  // Eksekusi algoritma
  // Eksekusi algoritma

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setSpinnerLoading(true);
    console.log(
      `UPT terdekat adalah ${nearestCity} dengan jarak ${distance} km`
    );
    console.log(data);

    if (!imageFile) return;
    const storage = getStorage(app);
    // console.log(imageFile);

    const storageRef = ref(storage, `images/${imageFile.name}-${Date.now()}`); // Referensi lokasi gambar di Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, imageFile); // Mulai proses upload

    // Memantau proses upload
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
          const postData = {
            nama: nama,
            upt_tujuan: nearestCity,
            alamat_pengadu: alamatPengadu,
            lokasi_kejadian: lokasiKejadian,
            jenis_kegiatan: jenisKegiatan,
            nama_kegiatan: namaKegiatan,
            waktu_kejadian: waktuKejadian,
            uraian_kejadian: uraianKejadian,
            dampak_kejadian: dampakkejadian,
            harapan_penyelesaian: harapanPenyelesaian,
            latitude,
            longitude,
            informasi_pengadu: informasiPengadu,
            image_url: url,
            signature,
            status: "Belum ditindak lanjuti",
          };

          await axios
            .post(
              `${process.env.REACT_APP_API_URL}api/laporan-pengaduan`,
              postData
            )
            .then((response) => {
              alert("sukses");
              window.location.href = "/";
            })
            .catch((error) => {
              alert(error.message);
            });

          console.log("File available at", url);
        });
      }
    );
  };
  const signCanva = useRef({});

  const clearSignature = () => {
    // console.log("button ditekan");
    signCanva.current.clear();
  };

  return (
    <div className="InputLaporanPengaduan">
      <form onSubmit={onSubmitHandler}>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>A.</h6>
            </div>
            <div className="col">
              <h6>Identitas Pengadu</h6>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">1.</h6>
            </div>
            <div className="col-3">
              <label className="form-label">Nama</label>
            </div>
            <div className="col">
              <input
                type="input"
                className="form-control"
                placeholder="Masukan nama tempat ..."
                value={nama}
                onChange={onNamaChangeHandler}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">2.</h6>
            </div>
            <div className="col-3">
              <label className="form-label">Alamat</label>
            </div>
            <div className="col">
              <textarea
                className="form-control"
                value={alamatPengadu}
                onChange={onAlamatPengaduChangeHandler}
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>B.</h6>
            </div>
            <div className="col">
              <h6>Lokasi Kejadian</h6>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">1.</h6>
            </div>
            <div className="col">
              <div className="col-3">
                <label className="form-label">Alamat</label>
              </div>
              <div className="col">
                <textarea
                  className="form-control"
                  rows="4"
                  value={lokasiKejadian}
                  onChange={onLokasiKejadianChangeHandler}
                ></textarea>
              </div>
            </div>
            <div className="col">
              <div className="pilih-map mb-3">
                <MapContainer
                  center={[-7.047407, 107.583554]} // Koordinat Jakarta
                  zoom={14}
                  style={{ height: "200px", width: "100%" }}
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
            </div>
          </div>
        </div>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>C.</h6>
            </div>
            <div className="col">
              <h6>Dugaan Sumber atau Penyebab</h6>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">1.</h6>
            </div>
            <div className="col-3">
              <label className="form-label">
                Jenis Kegiatan<br></br>
                <i>(jika diketahui)</i>
              </label>
            </div>
            <div className="col">
              <textarea
                className="form-control"
                value={jenisKegiatan}
                onChange={onJenisKegiatanChangeHandler}
                rows="2"
              ></textarea>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">2.</h6>
            </div>
            <div className="col-3">
              <label htmlFor=" nam" className="form-label">
                Nama Kegiatan Dan/atau usaha<br></br>
                <i>(jika diketahui)</i>
              </label>
            </div>
            <div className="col">
              <textarea
                className="form-control"
                value={namaKegiatan}
                rows="2"
                onChange={onNamaKegiatanChangeHandler}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>D.</h6>
            </div>
            <div className="col">
              <h6>Waktu dan Uraian Kejadian</h6>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">1.</h6>
            </div>
            <div className="col">
              <label htmlFor=" nam" className="form-label">
                Waktu diketahuinya pencemaran dan/atau perusakan lingkungan:
              </label>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1"></div>
            <div className="col">
              <textarea
                className="form-control"
                value={waktuKejadian}
                onChange={onWaktuKejadianChangeHandler}
                rows="2"
              ></textarea>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">2.</h6>
            </div>
            <div className="col">
              <label htmlFor=" nam" className="form-label">
                Uraian Kejadian:
              </label>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1"></div>
            <div className="col">
              <textarea
                className="form-control"
                value={uraianKejadian}
                onChange={onUraianKejadianChangeHandler}
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">3.</h6>
            </div>
            <div className="col">
              <label htmlFor=" nam" className="form-label">
                Dampak yang dirasakan akibat pencemaran dan atau perusakan
                lingkungan dan/atau perusakan hutan :
              </label>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1"></div>
            <div className="col">
              <textarea
                className="form-control"
                value={dampakkejadian}
                onChange={onDampakKejadianChangeHandler}
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>E.</h6>
            </div>
            <div className="col">
              <h6>Lampiran:</h6>
            </div>
          </div>
          <div className="row mb-2">
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
        </div>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>F.</h6>
            </div>
            <div className="col">
              <h6>Penyelesaian yang diinginkan:</h6>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1"></div>

            <div className="col">
              <textarea
                className="form-control"
                value={harapanPenyelesaian}
                onChange={onHarapanPenyelesaianChangeHandler}
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>G.</h6>
            </div>
            <div className="col">
              <h6>Informasi Pengaduan</h6>
              <p>Pengadu bersedia menerima informasi melalui : </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end"></h6>
            </div>
            <div className="col-3">
              <label htmlFor=" nam" className="form-label">
                SMS/Tlp, E-mail, Media Sosial, Lain-lain
              </label>
            </div>
            <div className="col">
              <input
                type="input"
                className="form-control"
                placeholder="Masukan nama tempat ..."
                value={informasiPengadu}
                onChange={onInformasiPengaduChangeHandler}
              />
            </div>
          </div>
        </div>

        <div className="tanda-tangan row">
          <div className="col"></div>
          <div
            onClick={clearSignature}
            className="col-1 bg-transparent border-0 justify-content-center align-items-center d-flex"
          >
            <i className="bi bi-eraser fs-1"></i>
          </div>
          <div className="col-5 text-center">
            Soreang, 9 Oktober 2024
            <br></br>Pengadu
            <SignaturePad ref={signCanva} />
            <br></br>( {nama} )
          </div>
        </div>
        {spinnerLoading ? (
          <div class="d-flex justify-content-center align-items-center ">
            <div class="spinner-border " role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="mb-3 m-3 d-grid">
            <button className="btn btn-primary">Laporkan</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default InputLaporanPengaduan;
