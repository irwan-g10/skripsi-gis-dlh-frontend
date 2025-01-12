import axios from "axios";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import SignaturePad from "react-signature-canvas";

function DetailAntrianPengaduan() {
  const [data, setData] = React.useState([]);
  const [location, setLocation] = React.useState({
    latitude: null,
    longitude: null,
  });
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

  const signCanva = useRef({});

  const clearSignature = () => {
    // console.log("button ditekan");
    signCanva.current.clear();
  };
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
      .get(`http://localhost:5000/api/laporan-pengaduan/${id}`)
      .then((response) => {
        setData(response.data.result);
        // console.log(response.data.result);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [id]);
  // const onSubmitHandler = async (item) => {
  //   const data = {
  //     lokasi_pengaduan: item.id,
  //     is_pengaduan: true,
  //     nama_tempat: "Permohonan Pengangkutan " + item.nama,
  //     alamat: item.lokasi_kejadian,
  //     latitude: item.latitude,
  //     longitude: item.longitude,
  //     pengangkut: localStorage.getItem("id"),
  //     image_url: item.image_url,
  //   };
  //   const dataLaporan = {
  //     status: "Sedang diangkut",
  //     tanggal_pengangkutan: new Date(),
  //     pengangkut: localStorage.getItem("id"),
  //   };
  //   await axios
  //     .post(`http://localhost:5000/api/antrian`, data)
  //     .then((response) => {
  //       console.log(response.data);
  //       alert("sukses");
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  //   await axios.patch(
  //     `http://localhost:5000/api/laporan-pengaduan/${item.id}`,
  //     dataLaporan
  //   );
  // };
  if (
    location.longitude &&
    location.latitude &&
    data.latitude &&
    data.longitude
  ) {
    return (
      <div className="detail-antrian-pengaduan container p-5 lh">
        {/* {console.log("halo")} */}
        <h1 className="mb-5">Detail Antrian Pengaduan</h1>
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
                      <td className="text-end">...km</td>
                    </tr>
                    <tr>
                      <th scope="row">Tanggal Pengaduan</th>
                      <td className="text-end">{data.tanggal_pengaduan}</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="btn btn-warning  w-100"
                  onClick={() => {
                    // onSubmitHandler(data);
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
        <h5 className="card-title mt-5">F. Keterangan Petugas</h5>
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
        <h5 className="card-title">G. Lampiran Foto</h5>
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
        <h5 className="card-title">H. Status</h5>
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
        <div className="tanda-tangan row">
          <div className="col"></div>
          <button
            // onClick={clearSignature}
            className="col-1 bg-transparent border-0 justify-content-center align-items-center d-flex"
          >
            <i className="bi bi-eraser fs-1"></i>
          </button>
          <div className="col-5 text-center">
            Soreang, 9 Oktober 2024
            <br></br>Pengadu
            <SignaturePad ref={signCanva} />
            <br></br>( {data.pengangkut?.nama} )
          </div>
        </div>
      </div>
    );
  }
}
export default DetailAntrianPengaduan;
