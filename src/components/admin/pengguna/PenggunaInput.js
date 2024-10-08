import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function PenggunaInput({ isUpdate = false }) {
  const [nip, setNip] = React.useState("");
  const [nama, setNama] = React.useState("");
  const [upt_pengelola, setUptPengelola] = React.useState("");
  const [unit_kerja, setUnitKerja] = React.useState("");
  const [role, setRole] = React.useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isUpdate) {
      axios
        .get(`http://localhost:5000/api/pengguna/${id}`)
        .then((response) => {
          const result = response.data.result;
          setNip(result.nip);
          setNama(result.nama);
          setUptPengelola(result.upt_pengelola);
          setUnitKerja(result.unit_kerja);
          setRole(result.role);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [id, isUpdate]);

  const onNamaChangeHandler = (event) => {
    setNama(event.target.value);
  };
  const onNipChangeHandler = (event) => {
    setNip(event.target.value);
  };
  const onUptPengelolaChangeHandler = (event) => {
    setUptPengelola(event.target.value);
  };
  const onUnitKerjaChangeHandler = (event) => {
    setUnitKerja(event.target.value);
  };
  const onRoleChangeHandler = (event) => {
    setRole(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const postData = {
      nip: nip,
      nama: nama,
      upt_pengelola: upt_pengelola,
      unit_kerja: unit_kerja,
      role: role,
    };

    if (isUpdate) {
      await axios
        .patch(`http://localhost:5000/api/pengguna/${id}`, postData)
        .then((response) => {
          console.log(response.data);
          alert("sukses");
          navigate("/pengguna");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      await axios
        .post(`http://localhost:5000/api/pengguna`, postData)
        .then((response) => {
          alert("sukses");
          navigate("/pengguna");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="PenggunaInput">
      <div className="container">
        <div className="mb-5">
          <h2>{isUpdate ? "Perbarui Pengguna" : "Tambah Pengguna"}</h2>
        </div>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor=" namaTempat" className="form-label">
              NIP
            </label>
            <input
              type="input"
              className="form-control"
              placeholder="Masukan nama tempat ..."
              value={nip}
              onChange={onNipChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor=" namaTempat" className="form-label">
              Nama
            </label>
            <input
              type="input"
              className="form-control"
              placeholder="Masukan nama tempat ..."
              value={nama}
              onChange={onNamaChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Upt Pengelola
            </label>

            <select
              className="form-select"
              aria-label="Default select example"
              onChange={onUptPengelolaChangeHandler}
            >
              <option value={upt_pengelola}>
                {isUpdate ? upt_pengelola : "--- Pilih ---"}
              </option>
              <option value="Tong Besar">Tong Besar</option>
              <option value="Tong Sedang">Tong Sedang</option>
              <option value="Tong Kecil">Tong Kecil</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              UPT Pengelola
            </label>

            <select
              className="form-select"
              aria-label="Default select example"
              onChange={onUnitKerjaChangeHandler}
            >
              <option value={unit_kerja}>
                {isUpdate ? unit_kerja : "--- Pilih ---"}
              </option>
              <option value="UPT Banjaran">UPT Banjaran</option>
              <option value="UPT Baleendah">UPT Baleendah</option>
              <option value="UPT Soreang">UPT Soreang</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Role
            </label>

            <select
              className="form-select"
              aria-label="Default select example"
              onChange={onRoleChangeHandler}
            >
              <option value={role}>{isUpdate ? role : "--- Pilih ---"}</option>
              <option value="UPT Banjaran">UPT Banjaran</option>
              <option value="UPT Baleendah">UPT Baleendah</option>
              <option value="UPT Soreang">UPT Soreang</option>
            </select>
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

export default PenggunaInput;
