import React from "react";
import { Link } from "react-router-dom";
import PengangkutanTable from "./PengangkutanTable";

// import PropTypes from "prop-types";
// import TPATable from "./TPATable";
// import TPAMaps from "./TPAMaps";
import axios from "axios";

function AdminDataPengangkutan() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isTable, setIstable] = React.useState(true);

  const [date, setDate] = React.useState("");
  const [pengangkut, setPengangkut] = React.useState([]);
  const [selectedPengangkut, setSelectedPengangkut] = React.useState("");
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/laporan-pengangkutan`)
      .then((response) => {
        setData(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}api/pengguna`)
      .then((response) => {
        setPengangkut(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  const onStatusChangeHandler = (event) => {
    setStatus(event.target.value);
  };
  const onSelectedPengangkutChangeHandler = (event) => {
    setSelectedPengangkut(event.target.value);
  };

  const onDateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const onSearchHandle = () => {
    const data = {};

    if (selectedPengangkut) {
      data.pengangkut = selectedPengangkut;
    }
    if (status) {
      data.status = status;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}api/laporan-pengangkutan`, {
        params: { ...data },
      })
      .then((response) => {
        // setData(response.data.result);
        const result = response.data.result;

        if (date) {
          const today = new Date(date);
          const todayStr = today.toISOString().split("T")[0]; // hanya ambil tanggalnya

          const filteredData = result.filter((item) => {
            const itemDate = item.tanggal_pengangkutan.split("T")[0];
            return itemDate === todayStr;
          });
          setData(filteredData);
        } else {
          setData(result);
        }
        console.log(result);
        // console.log(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  // const onIsTableOptionChange = (event) => {
  //   // Memastikan nilai event target diambil dengan benar
  //   setIstable(event.target.value === "table");
  //   console.log(event.target.value); // Debug untuk melihat nilai yang dipilih
  // };

  return (
    <div className="AdminDataTPA">
      <div className="container">
        <h2>Laporan Pengangkutan</h2>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>

        <div className="AdminOptionBar">
          <div className="container text-center mb-5">
            <div className="row">
              <div className="col-3 "></div>
              <div className="col">
                <div className="d-flex">
                  <input
                    id="startDate"
                    className="form-control mx-2"
                    type="date"
                    value={date}
                    onChange={onDateChangeHandler}
                  />
                  <select
                    className="form-select mx-2"
                    aria-label="Default select example"
                    onChange={onStatusChangeHandler}
                  >
                    <option value="">--- Status Aduan ---</option>

                    <option value="Sudah diangkut">Sudah diangkut</option>
                    <option value="Sedang diangkut">Sedang diangkut</option>
                    <option value="Belum ditindak lanjuti">
                      Belum ditindak lanjuti
                    </option>
                    <option value="Laporan Palsu">Laporan Palsu</option>
                  </select>
                  <select
                    className="form-select mx-2"
                    aria-label="Default select example"
                    onChange={onSelectedPengangkutChangeHandler}
                  >
                    <option value="">--- Pengangkut ---</option>

                    {pengangkut.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.nama}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    className="btn btn-outline-success"
                    onClick={onSearchHandle}
                  >
                    Search
                  </button>
                </div>
              </div>
              {/* <div className="col-3 ">
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
              </div> */}
            </div>
          </div>
        </div>
        <PengangkutanTable data={data} />
        {/* {loading ? (
          true
        ) : isTable ? (
          <TPATable data={data} />
        ) : (
          <TPAMaps data={data} />
        )} */}
      </div>
    </div>
  );
}

export default AdminDataPengangkutan;
