import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

function TPAInput({ isUpdate = false }) {
  const [nama_tempat, setNamaTempat] = React.useState("");
  const [jenis_tong, setJenisTong] = React.useState("");
  const [unit_pelayanan_teknis, setUnitPelayananTeknis] = React.useState("");
  const [lokasi, setLokasi] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [kecamatan, setKecamatan] = React.useState("");
  // const [dataHari, setDataHari] = React.useState({});
  const [desa, setDesa] = React.useState("");

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

  React.useEffect(() => {
    if (isUpdate) {
      axios
        .get(`http://localhost:5000/api/titik-tpa/${id}`)
        .then((response) => {
          const result = response.data.result;
          setNamaTempat(result.nama_tempat);
          setJenisTong(result.jenis_tong);
          setUnitPelayananTeknis(result.unit_pelayanan_teknis);
          setLokasi(result.lokasi);
          setLatitude(result.latitude);
          setLongitude(result.longitude);
          setKecamatan(result.nama_tempat);
          setDesa(result.desa);
          console.log("mengambil data detail");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [id, isUpdate]);

  const onNamaTempatChangeHandler = (event) => {
    setNamaTempat(event.target.value);
  };
  const onJenisTongChangeHandler = (event) => {
    setJenisTong(event.target.value);
  };
  const onUnitPelayananTeknisChangeHandler = (event) => {
    setUnitPelayananTeknis(event.target.value);
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
  const oncheckedHariChangeHandler = (event) => {
    console.log("ditekan check");
    const { name, checked } = event.target;
    setHari((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const postData = {
      nama_tempat: nama_tempat,
      jenis_tong: jenis_tong,
      unit_pelayanan_teknis: unit_pelayanan_teknis,
      hari: hari,
      lokasi: lokasi,
      latitude: latitude,
      longitude: longitude,
      kecamatan: kecamatan,
      desa: desa,
    };
    console.log(postData);

    if (isUpdate) {
      await axios
        .patch(`http://localhost:5000/api/titik-tpa/${id}`, postData)
        .then((response) => {
          console.log(response.data);
          alert("sukses");
          window.location.reload();
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      await axios
        .post(`http://localhost:5000/api/titik-tpa`, postData)
        .then((response) => {
          alert("sukses");
          window.location.reload();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="TPAInput">
      <div className="container">
        <div className="mb-5">
          <h2>{isUpdate ? "Perbarui Lokasi TPA" : "Tambah Lokasi TPA"}</h2>
        </div>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>
        <form onSubmit={onSubmitHandler}>
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
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Jenis Tong
            </label>

            <select
              className="form-select"
              aria-label="Default select example"
              onChange={onJenisTongChangeHandler}
            >
              <option value={jenis_tong}>
                {isUpdate ? jenis_tong : "--- Pilih ---"}
              </option>
              <option value="Tong Besar">Tong Besar</option>
              <option value="Tong Sedang">Tong Sedang</option>
              <option value="Tong Kecil">Tong Kecil</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
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
              <option value="UPT Banjaran">UPT Banjaran</option>
              <option value="UPT Baleendah">UPT Baleendah</option>
              <option value="UPT Soreang">UPT Soreang</option>
            </select>
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

export default TPAInput;
