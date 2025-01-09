import axios from "axios";
import React from "react";
import ListAntrian from "./listAntrian";

function Antrian() {
  const [data, setData] = React.useState([]);
  const [isTable, setIstable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/antrian`)
      .then((response) => {
        setData(response.data.result);
        setIsLoading(false);
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
    <div className="Antrian">
      {/* {console.log(data)} */}
      <div className="row">
        <div className="col">
          <h1>this is Antrian</h1>
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
      <ListAntrian data={data} />
      {/* {isLoading ? (
        true
      ) : isTable ? (
        <ListAntrian data={data} />
      ) : (
        <PengangkutanMap data={data} />
      )} */}
    </div>
  );
}

export default Antrian;
