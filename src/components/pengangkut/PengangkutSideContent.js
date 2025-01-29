import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function PengangkutSideContent() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const id = localStorage.getItem("id");

    // });
    axios
      .get(`${process.env.REACT_APP_API_URL}api/pengguna/${id}`)
      .then((response) => {
        const user = response.data.result;
        setData(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  const onClickKeluarHandler = async (event) => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="PengangkutSideContent shadow">
      <ul className="list-group">
        <li className="list-group-item text-center">
          <div className="mb-3">
            <img src="/images/user.png" width="150" alt="..." />
          </div>
          <h3>{data.nama}</h3>
        </li>
        <Link to="/">
          <li className="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col-2">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div className="col">Pengangkutan</div>
              <div className="col-1">
                <i className="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>
        <Link to="/pengaduan">
          <li className="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col-2">
                <i className="bi bi-building-fill"></i>
              </div>
              <div className="col">Pengaduan</div>
              <div className="col-1">
                <i className="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>
        <Link to="/antrian">
          <li className="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col-2">
                <i className="bi bi-person-fill"></i>
              </div>
              <div className="col">Antrian Saya</div>
              <div className="col-1">
                <i className="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>
        <Link to="/profile">
          <li className="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col-2">
                <i className="bi bi-person-fill"></i>
              </div>
              <div className="col">Profil Saya</div>
              <div className="col-1">
                <i className="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>

        <li
          onClick={onClickKeluarHandler}
          className="list-group-item text-center"
        >
          Keluar
        </li>
      </ul>
    </div>
  );
}

export default PengangkutSideContent;
