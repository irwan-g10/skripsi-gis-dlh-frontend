import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminSideContent() {
  const navigate = useNavigate();
  const onClickKeluarHandler = async (event) => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

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
  return (
    <div className="AdminSideContent shadow">
      <ul className="list-group">
        <li className="list-group-item text-center">
          <div className="mb-3">
            <img src="/images/user.png" width="150" alt="..." />
          </div>
          <h3>{data.nama}</h3>
        </li>
        <Link to="/titik-tpa-table">
          <li className="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col-2">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div className="col">Titik TPS</div>
              <div className="col-1">
                <i className="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>
        {/* <Link to="/jadwal-pengangkutan-tabel">
          <li className="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col-2">
                <i className="bi bi-calendar-day"></i>
              </div>
              <div className="col">Jadwal Pengangkutan</div>
              <div className="col-1">
                <i className="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link> */}
        <Link to="/titik-upt-table">
          <li className="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col-2">
                <i className="bi bi-building-fill"></i>
              </div>
              <div className="col">Unit Pelayanan Teknis</div>
              <div className="col-1">
                <i className="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>
        <li className="list-group-item " aria-current="true">
          <div className="row container">
            <div className="col-2">
              <i className="bi bi-book-fill"> </i>
            </div>
            <div className="col">Laporan</div>
          </div>
        </li>
        <Link to="/laporan-pengangkutan">
          <li className="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col text-end">Pengangkutan</div>
              <div className="col-1">
                <i className="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>
        <Link to="/laporan-pengaduan">
          <li className="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col text-end">Pengaduan</div>
              <div className="col-1">
                <i className="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>
        <Link to="/pengguna">
          <li className="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col-2">
                <i className="bi bi-person-fill"></i>
              </div>
              <div className="col">Pengguna</div>
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

export default AdminSideContent;
