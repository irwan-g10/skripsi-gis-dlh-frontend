import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function PenggunaInput({ isUpdate = false }) {
  const [nip, setNip] = React.useState("");
  const [nama, setNama] = React.useState("");
  const [upt_pengelola, setUptPengelola] = React.useState("");
  const [role, setRole] = React.useState("");
  const [kontak, setKontak] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [listUpt, setListUpt] = React.useState([]);

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
        .get(`http://localhost:5000/api/pengguna/${id}`)
        .then((response) => {
          const result = response.data.result;
          console.log(result);
          setNip(result.nip);
          setNama(result.nama);
          setUptPengelola(result.upt_pengelola);
          setKontak(result.kontak);
          setPassword(result.password);
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
  const onKontakChangeHandler = (event) => {
    setKontak(event.target.value);
  };
  const onRoleChangeHandler = (event) => {
    setRole(event.target.value);
  };
  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const postData = {
      nip: nip,
      nama: nama,
      upt_pengelola: upt_pengelola,
      password: password,
      kontak: kontak,
      role: role,
    };
    console.log(postData);

    if (isUpdate) {
      await axios
        .patch(`http://localhost:5000/api/pengguna/${id}`, postData)
        .then((response) => {
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
              placeholder="Masukan NIP ..."
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
              placeholder="Masukan Nama Lengkap ..."
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
              <option value={isUpdate ? upt_pengelola.id : ""}>
                {isUpdate ? upt_pengelola.nama_upt : "--- Pilih ---"}
              </option>
              {listUpt.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.nama_upt}
                  </option>
                );
              })}
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
              <option value="Admin">Admin</option>
              <option value="Pengangkut">Pengangkut</option>
              <option value="Pengguna">Pengguna</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor=" namaTempat" className="form-label">
              Kontak
            </label>
            <input
              type="input"
              className="form-control"
              placeholder="Masukan Kontak ..."
              value={kontak}
              onChange={onKontakChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor=" namaTempat" className="form-label">
              password
            </label>
            <input
              type="input"
              className="form-control"
              placeholder="Masukan Password ..."
              value={password}
              onChange={onPasswordChangeHandler}
            />
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
