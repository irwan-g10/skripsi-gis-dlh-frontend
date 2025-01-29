import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function Profil() {
  const [nip, setNip] = React.useState("");
  const [nama, setNama] = React.useState("");
  const [upt_pengelola, setUptPengelola] = React.useState("");
  const [role, setRole] = React.useState("");
  const [kontak, setKontak] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordLama, setPasswordLama] = React.useState("");
  const [data, setData] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    const id = localStorage.getItem("id");
    axios
      .get(`${process.env.REACT_APP_API_URL}api/pengguna/${id}`)
      .then((response) => {
        setData(response.data.result);
        setNama(response.data.result.nama);
        setKontak(response.data.result.kontak);
        setLoading(true);
        // console.log(response.data.result);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

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
  const onPasswordLamaChangeHandler = (event) => {
    setPasswordLama(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let postData;

    if (passwordLama === "") {
      console.log("password kosong");
      postData = {
        nama: nama,
        kontak: kontak,
      };
    } else if (passwordLama !== data.password) {
      return alert("Password lama tidak sesuai");
    } else if (passwordLama === data.password) {
      console.log("password berhasil dirubah");
      postData = {
        nama: nama,
        kontak: kontak,
        password: password,
      };
      if (password === "") {
        return alert("password baru tidak boleh kosong");
      }
    }
    console.log(postData);
    // const postData = {
    //   nip: nip,
    //   nama: nama,
    //   upt_pengelola: upt_pengelola,
    //   password: password,
    //   kontak: kontak,
    //   role: role,
    // };
    const id = localStorage.getItem("id");

    await axios
      .patch(`${process.env.REACT_APP_API_URL}api/pengguna/${id}`, postData)
      .then((response) => {
        alert("sukses");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (loading) {
    return (
      <div className="PenggunaInput">
        <div className="container">
          <div className="mb-5">
            <h2>Profil Saya</h2>
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
                value={data.nip}
                disabled
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
              <input
                type="input"
                className="form-control"
                placeholder="Masukan Nama Lengkap ..."
                value={data.upt_pengelola.nama_upt}
                onChange={onNamaChangeHandler}
                disabled
              />
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
                Password Lama
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Masukan Password ..."
                value={passwordLama}
                onChange={onPasswordLamaChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor=" namaTempat" className="form-label">
                Password Baru
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Masukan Password ..."
                value={password}
                onChange={onPasswordChangeHandler}
              />
            </div>

            <div className="mb-3 m-3 d-grid">
              <button className={"btn btn-success"}>"Perbarui"</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Profil;
