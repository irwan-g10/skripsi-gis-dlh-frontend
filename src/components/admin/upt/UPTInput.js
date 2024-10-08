import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function UPTInput({ isUpdate = false }) {
  const [nama_upt, setNamaUpt] = React.useState("");
  const [lokasi, setLokasi] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [kecamatan, setKecamatan] = React.useState("");
  const [desa, setDesa] = React.useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isUpdate) {
      axios
        .get(`http://localhost:5000/api/titik-upt/${id}`)
        .then((response) => {
          const result = response.data.result;
          setNamaUpt(result.nama_upt);
          setLokasi(result.lokasi);
          setLatitude(result.latitude);
          setLongitude(result.longitude);
          setKecamatan(result.kecamatan);
          setDesa(result.desa);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [id, isUpdate]);

  const onNamaUptChangeHandler = (event) => {
    setNamaUpt(event.target.value);
  };

  const onLokasiChangeHandler = (event) => {
    setLokasi(event.target.value);
  };
  const onLatitudeChangeHandler = (event) => {
    setLatitude(event.target.value);
  };
  const onLongitudeChangeHandler = (event) => {
    setLongitude(event.target.value);
  };
  const onKecamatanChangeHandler = (event) => {
    setKecamatan(event.target.value);
  };
  const onDesaChangeHandler = (event) => {
    setDesa(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const postData = {
      nama_upt: nama_upt,
      lokasi: lokasi,
      latitude: latitude,
      longitude: longitude,
      kecamatan: kecamatan,
      desa: desa,
    };

    if (isUpdate) {
      await axios
        .patch(`http://localhost:5000/api/titik-upt/${id}`, postData)
        .then((response) => {
          console.log(response.data);
          alert("sukses");
          navigate("/titik-upt-table");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      await axios
        .post(`http://localhost:5000/api/titik-upt`, postData)
        .then((response) => {
          alert("sukses");
          navigate("/titik-upt-table");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="UPTInput">
      <div className="container">
        <div className="mb-5">
          <h2>
            {isUpdate
              ? "Perbarui Unit Pelayan Teknis"
              : "Tambah Unit Pelayan Teknis"}
          </h2>
        </div>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor=" namaTempat" className="form-label">
              Nama Unit Pelayanan Teknis
            </label>
            <input
              type="input"
              className="form-control"
              placeholder="Masukan nama tempat ..."
              value={nama_upt}
              onChange={onNamaUptChangeHandler}
            />
          </div>
          <div className=" row">
            <label htmlFor="lokasi" className="form-label">
              Lokasi
            </label>
            <div className=" col">
              <div className="mb-3">
                <input
                  type="input"
                  className="form-control"
                  placeholder="Masukan lokasi ..."
                  value={lokasi}
                  onChange={onLokasiChangeHandler}
                />
              </div>
            </div>
            <div className="col-1">
              <div className="mb-3">
                <button type="button" className="btn btn-primary ">
                  <i className="bi bi-geo-alt-fill"></i>
                </button>
              </div>
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

          <div className="mb-3">
            <label htmlFor="kecamatan" className="form-label">
              Kecamatan
            </label>
            <input
              type="input"
              className="form-control"
              id="kecamatan"
              placeholder="Masukan Kecamatan ..."
              value={kecamatan}
              onChange={onKecamatanChangeHandler}
            />
            <div className="mb-5">
              <label htmlFor="desa" className="form-label">
                Desa
              </label>
              <input
                type="input"
                className="form-control"
                id="desa"
                placeholder="Masukan desa ..."
                value={desa}
                onChange={onDesaChangeHandler}
              />
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

export default UPTInput;
