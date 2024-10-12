import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
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

function TPAInput({ isUpdate = false }) {
  const [nama_tempat, setNamaTempat] = React.useState("");
  const [jenis_tong, setJenisTong] = React.useState("");
  const [unit_pelayanan_teknis, setUnitPelayananTeknis] = React.useState("");
  const [alamat, setAlamat] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);
  const [listUpt, setListUpt] = React.useState([]);

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBXUi0DmcTQYaNevZm9PzA6kePU_5H7DsE",
    authDomain: "skripsi-gis-c3506.firebaseapp.com",
    projectId: "skripsi-gis-c3506",
    storageBucket: "skripsi-gis-c3506.appspot.com",
    messagingSenderId: "892978799903",
    appId: "1:892978799903:web:3a9747fcbefc9b11f77c2a",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

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

  const [hari, setHari] = React.useState({
    senin: false,
    selasa: false,
    rabu: false,
    kamis: false,
    jumat: false,
    sabtu: false,
    minggu: false,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/titik-upt`)
      .then((response) => {
        setListUpt(response.data.result);
        // console.log(response.data.result);
      })
      .catch((error) => {
        alert(error.message);
      });
    if (isUpdate) {
      axios
        .get(`http://localhost:5000/api/titik-tpa/${id}`)
        .then((response) => {
          const result = response.data.result;
          setNamaTempat(result.nama_tempat);
          setJenisTong(result.jenis_tong);
          setUnitPelayananTeknis(result.unit_pelayanan_teknis);
          setAlamat(result.alamat);
          setLatitude(result.latitude);
          setLongitude(result.longitude);
          setHari(result.hari[0]);
          setImageUrl(result.image_url);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      setImageUrl("./images/user.png");
    }
  }, [id, isUpdate]);

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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  const onNamaTempatChangeHandler = (event) => {
    setNamaTempat(event.target.value);
  };
  const onJenisTongChangeHandler = (event) => {
    setJenisTong(event.target.value);
  };
  const onUnitPelayananTeknisChangeHandler = (event) => {
    setUnitPelayananTeknis(event.target.value);
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

  const oncheckedHariChangeHandler = (event) => {
    const { name, checked } = event.target;
    setHari((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

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
          const postData = {
            nama_tempat,
            jenis_tong,
            unit_pelayanan_teknis,
            hari,
            alamat,
            latitude,
            longitude,
            image_url: url,
          };

          if (isUpdate) {
            await axios
              .patch(`http://localhost:5000/api/titik-tpa/${id}`, postData)
              .then((response) => {
                console.log(response.data);
                alert("sukses");
                navigate("/titik-tpa-table");
              })
              .catch((error) => {
                alert(error.message);
              });
          } else {
            await axios
              .post(`http://localhost:5000/api/titik-tpa`, postData)
              .then((response) => {
                alert("sukses");
                navigate("/titik-tpa-table");
              })
              .catch((error) => {
                alert(error.message);
              });
          }
          console.log("File available at", url);
        });
      }
    );
  };

  return (
    <div className="TPAInput">
      <div className="container">
        <div className="mb-5">
          <h2>{isUpdate ? "Perbarui Lokasi TPA" : "Tambah Lokasi TPA"}</h2>
        </div>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>
        <form onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col-4">
              <div className="card mb-3">
                <img
                  src={imageUrl}
                  className="card-img-top custom-img"
                  alt="..."
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor=" namaTempat" className="form-label">
                  Nama Tempat
                </label>
                <input
                  type="input"
                  className="form-control"
                  placeholder="Masukan nama tempat ..."
                  value={nama_tempat}
                  onChange={onNamaTempatChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Jenis Tempat Pembuangan
                </label>

                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={onJenisTongChangeHandler}
                >
                  <option value={jenis_tong}>
                    {isUpdate ? jenis_tong : "--- Pilih ---"}
                  </option>

                  <option value="Tempat Pembuangan Sampah ">
                    Tempat Pembuangan Sampah
                  </option>
                  <option value="Indurstri">Industri</option>
                  <option value="Pasar">Pasar</option>
                  <option value="Fasilitas Umum">Fasilitas Umum</option>
                  <option value="Acara dan Festival">Acara dan Festival</option>
                </select>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Unit Pelayanan Teknis
                </label>

                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={onUnitPelayananTeknisChangeHandler}
                >
                  <option value={unit_pelayanan_teknis}>
                    {isUpdate ? unit_pelayanan_teknis : "--- Pilih ---"}
                  </option>

                  {listUpt.map((item) => {
                    return (
                      <option value={item.nama_upt} key={item.id}>
                        {item.nama_upt}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="desa" className="form-label">
                  Upload Gambar
                </label>
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile02"
                    onChange={handleImageChange}
                  />
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupFile02"
                  >
                    Upload
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 row">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Hari Pengangkutan
            </label>
            <div className="form-check  col mx-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="senin"
                value="senin"
                id="senin"
                checked={hari.senin}
                onChange={oncheckedHariChangeHandler}
              />
              <label className="form-check-label" htmlFor="senin">
                Senin
              </label>
            </div>
            <div className="form-check  col">
              <input
                className="form-check-input"
                type="checkbox"
                name="selasa"
                value="selasa"
                id="selasa"
                checked={hari.selasa}
                onChange={oncheckedHariChangeHandler}
              />
              <label className="form-check-label" htmlFor="selasa">
                Selasa
              </label>
            </div>
            <div className="form-check  col">
              <input
                className="form-check-input"
                type="checkbox"
                name="rabu"
                value="rabu"
                id="rabu"
                checked={hari.rabu}
                onChange={oncheckedHariChangeHandler}
              />
              <label className="form-check-label" htmlFor="rabu">
                Rabu
              </label>
            </div>
            <div className="form-check  col">
              <input
                className="form-check-input"
                type="checkbox"
                name="kamis"
                value="kamis"
                id="kamis"
                checked={hari.kamis}
                onChange={oncheckedHariChangeHandler}
              />
              <label className="form-check-label" htmlFor="kamis">
                Kamis
              </label>
            </div>
            <div className="form-check  col">
              <input
                className="form-check-input"
                type="checkbox"
                name="jumat"
                value="jumat"
                id="jumat"
                checked={hari.jumat}
                onChange={oncheckedHariChangeHandler}
              />
              <label className="form-check-label" htmlFor="jumat">
                Jumat
              </label>
            </div>
            <div className="form-check  col">
              <input
                className="form-check-input"
                type="checkbox"
                name="sabtu"
                value="sabtu"
                id="sabtu"
                checked={hari.sabtu}
                onChange={oncheckedHariChangeHandler}
              />
              <label className="form-check-label" htmlFor="sabtu">
                Sabtu
              </label>
            </div>
            <div className="form-check  col">
              <input
                className="form-check-input"
                type="checkbox"
                name="minggu"
                value="minggu"
                id="minggu"
                checked={hari.minggu}
                onChange={oncheckedHariChangeHandler}
              />
              <label className="form-check-label" htmlFor="minggu">
                Minggu
              </label>
            </div>
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

export default TPAInput;
