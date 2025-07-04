import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import PenggunaTable from "./PenggunaTable";

function DataPengguna() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isTable, setIstable] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/pengguna`)
      .then((response) => {
        setData(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div className="DataPengguna">
      <div className="container">
        <h2>Data Pengguna</h2>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>

        <div className="AdminOptionBar">
          <div className="container text-center mb-5">
            <div className="row">
              <div className="col ">
                <Link to="/pengguna-input">
                  <div className="col d-grid">
                    <button type="button" className="btn btn-primary d-grid">
                      Tambah
                    </button>
                  </div>
                </Link>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>
        <PenggunaTable data={data} />
      </div>
    </div>
  );
}

export default DataPengguna;
