import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import TPATable from "./TPATable";
import TPAMaps from "./TPAMaps";
import axios from "axios";

function AdminDataTPA() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isTable, setIstable] = React.useState(true);
  console.log("API URL:", process.env.REACT_APP_API_URL);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/titik-tpa`)
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
    console.log(event.target.value); // Debug untuk melihat nilai yang dipilih
  };

  return (
    <div className="AdminDataTPA">
      <div className="container">
        <h2>Titik TPS</h2>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>

        <div className="AdminOptionBar">
          <div className="container text-center mb-5">
            <div className="row">
              <div className="col ">
                <Link to="/titik-tpa-input">
                  <div className="col d-grid">
                    <button type="button" className="btn btn-primary d-grid">
                      Tambah
                    </button>
                  </div>
                </Link>
              </div>
              <div className="col"></div>
              <div className="col-3 ">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    className="btn-check"
                    // name="btnradio"
                    value="table"
                    id="btnradio1"
                    checked={isTable === true}
                    onChange={onIsTableOptionChange}
                    // autoComplete="off"
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
                    // name="btnradio"
                    value="maps"
                    id="btnradio2"
                    checked={isTable === false}
                    onChange={onIsTableOptionChange}
                    // autoComplete="off"
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
        {loading ? (
          true
        ) : isTable ? (
          <TPATable data={data} />
        ) : (
          <TPAMaps data={data} />
        )}
      </div>
    </div>
  );
}

export default AdminDataTPA;
