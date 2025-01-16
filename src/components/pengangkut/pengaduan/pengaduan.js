import axios from "axios";
import React from "react";
import ListPengaduan from "./listPengaduan";
import PengaduanMap from "./pengaduanMap";

function Pengaduan() {
  const [data, setData] = React.useState([]);
  const [isTable, setIstable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const id = localStorage.getItem("id");
    axios
      .get(`http://localhost:5000/api/pengguna/${id}`)
      .then((response) => {
        const user = response.data.result;
        axios
          .get(
            `http://localhost:5000/api/laporan-pengaduan?status=Belum+ditindak+lanjuti&upt_tujuan=${user.upt_pengelola.id}`
          )
          .then((response) => {
            setData(response.data.result);
            // console.log(response.data.query);
            setIsLoading(false);
          })
          .catch((error) => {
            alert(error.message);
          });
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
    <div className="Pengaduan">
      {/* {console.log(data)} */}
      <div className="row">
        <div className="col">
          <h1>this is Pengaduan</h1>
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
              // name="btnradio"
              value="table"
              id="btnradio1"
              checked={isTable === true}
              onChange={onIsTableOptionChange}
              // autoComplete="off"
            />
            <label className="btn btn-outline-secondary" htmlFor="btnradio1">
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
            <label className="btn btn-outline-secondary" htmlFor="btnradio2">
              Maps
            </label>
          </div>
        </div>
      </div>
      {isLoading ? (
        true
      ) : isTable ? (
        <ListPengaduan data={data} />
      ) : (
        <PengaduanMap data={data} />
      )}
    </div>
  );
}

export default Pengaduan;
