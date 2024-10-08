import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import TableTPA from "../tpa/TableTPA";
import AdminMaps from "../tpa/AdminMaps";
import axios from "axios";
import TableJadwalPengangkutan from "./TableJadwalPengangkutan";

function AdminJadwalPengangkutan() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isTable, setIstable] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/jadwal-pengangkutan`)
      .then((response) => {
        setData(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const onIsTableOptionChange = (event) => {
    // Memastikan nilai event target diambil dengan benar
    setIstable(event.target.value === "table");
  };

  return (
    <div className="AdminJadwalPengangkutan">
      <div className="container">
        <h2>Jadwal Pengangkutan</h2>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>

        <div className="AdminOptionBar">
          <div className="container text-center mb-5">
            <div className="row">
              <div className="col ">
                <Link to="/jadwal-pengangkutan-input">
                  <div className="col d-grid">
                    <button type="button" className="btn btn-primary d-grid">
                      Tambah
                    </button>
                  </div>
                </Link>
              </div>
              <div className="col">
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <div className="col-3 ">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    className="btn-check"
                    value="table"
                    id="btnradio1"
                    checked={isTable === true}
                    onChange={onIsTableOptionChange}
                  />
                  <label
                    className="btn btn-outline-secondary"
                    htmlFor="btnradio1"
                  >
                    Tabel
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    value="maps"
                    id="btnradio2"
                    checked={isTable === false}
                    onChange={onIsTableOptionChange}
                  />
                  <label
                    className="btn btn-outline-secondary"
                    htmlFor="btnradio2"
                  >
                    Maps
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading ? true : <TableJadwalPengangkutan data={data} />}

        {/* <AdminMaps /> */}
      </div>
    </div>
  );
}

export default AdminJadwalPengangkutan;
