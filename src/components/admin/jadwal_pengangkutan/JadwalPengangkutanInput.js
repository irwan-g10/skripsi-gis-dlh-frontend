import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

function JadwalPengangkutanInput({ isUpdate = false }) {
  const [titikTpa, setTitikTPa] = React.useState("");
  const [recentJadwal, setRecentJadwal] = React.useState([]);
  const [hari, setHari] = React.useState({
    senin: false,
    selasa: false,
    rabu: false,
    kamis: false,
    jumat: false,
    sabtu: false,
    minggu: false,
  });
  const [dataTpa, setDataTpa] = React.useState([]);
  // const [loading, setLoading] = React.useState(true);

  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/titik-tpa`)
      .then((response) => {
        setDataTpa(response.data.result);
      })
      .catch((error) => {
        alert(error.message);
      });

    axios
      .get(`http://localhost:5000/api/jadwal-pengangkutan`)
      .then((response) => {
        setRecentJadwal(response.data.result);
      })
      .catch((error) => {
        alert(error.message);
      });

    if (isUpdate) {
      // axios
      //   .get(`http://localhost:5000/api/titik-tpa/${id}`)
      //   .then((response) => {
      //     const result = response.data.result;
      //     setNamaTempat(result.nama_tempat);
      //     setJenisTong(result.jenis_tong);
      //     setUnitPelayananTeknis(result.unit_pelayanan_teknis);
      //     setLokasi(result.lokasi);
      //     setLatitude(result.latitude);
      //     setLongitude(result.longitude);
      //     setKecamatan(result.nama_tempat);
      //     setDesa(result.desa);
      //   })
      //   .catch((error) => {
      //     alert(error.message);
      //   });
    }
  }, [id, isUpdate]);

  const onTitikTpaChangeHandler = (event) => {
    setTitikTPa(event.target.value);
  };
  const oncheckedHariChangeHandler = (event) => {
    const { name, checked } = event.target;
    // console.log(checkedHari);
    setHari((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const postData = {
      titik_tpa: titikTpa,
      hari,
    };

    // if (isUpdate) {
    //   await axios
    //     .patch(`http://localhost:5000/api/titik-tpa/${id}`, postData)
    //     .then((response) => {
    //       alert("sukses");
    //       window.location.reload();
    //     })
    //     .catch((error) => {
    //       alert(error.message);
    //     });
    // } else {
    await axios
      .post(`http://localhost:5000/api/jadwal-pengangkutan`, postData)
      .then((response) => {
        alert("sukses");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
    // }

    // console.log(postData);
  };

  console.log("tpa");
  console.log(dataTpa);
  console.log("jadwal");
  console.log(recentJadwal);
  return (
    <div className="JadwalPengangkutanInput">
      <div className="container">
        <div className="mb-5">
          <h2>
            {isUpdate
              ? "Perbarui Jadwal Pengangkutan"
              : "Tambah Jadwal Pengangkutan"}
          </h2>
        </div>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Titik TPA
            </label>

            <select
              className="form-select"
              aria-label="Default select example"
              onChange={onTitikTpaChangeHandler}
            >
              <option value={titikTpa}>
                {isUpdate ? titikTpa : "--- Pilih ---"}
              </option>

              {dataTpa.map((item) => {
                return (
                  <option value={titikTpa.nama_tempat} key={item.id}>
                    {item.nama_tempat}
                  </option>
                );
              })}
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

export default JadwalPengangkutanInput;
