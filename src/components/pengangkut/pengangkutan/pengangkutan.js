import axios from "axios";
import React from "react";
import ListPengangkutan from "./listPengangkutan";
import PengangkutanMap from "./pengangkutanMap";

function Pengangkutan() {
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
            `http://localhost:5000/api/titik-tpa/filter?unit_pelayanan_teknis=${user.upt_pengelola.id}`
          )
          .then((response) => {
            setIsLoading(true);
            setData(response.data.result);
            // console.log(response.data.result);
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
  // if (isLoading) {
  //   console.log(data);
  // }

  return (
    <div className="Pengangkutan">
      {/* {console.log(data)} */}
      <div className="row">
        <div className="col">
          <h1>this is Pengangkutan</h1>
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

      {isTable ? (
        <ListPengangkutan data={data} />
      ) : (
        <PengangkutanMap data={data} />
      )}
    </div>
  );
}

export default Pengangkutan;
