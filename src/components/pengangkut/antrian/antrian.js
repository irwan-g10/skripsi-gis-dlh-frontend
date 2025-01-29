import axios from "axios";
import React from "react";
import ListAntrian from "./listAntrian";
import AntrianMap from "./antrianMap";

function Antrian() {
  const [data, setData] = React.useState([]);
  const [isTable, setIstable] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const id = localStorage.getItem("id");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log({
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.latitude,
          // });
          axios
            .get(`http://localhost:5000/api/pengguna/${id}`)
            .then((response) => {
              const user = response.data.result;
              axios
                .get(
                  `http://localhost:5000/api/antrian/filter?pengangkut=${id}&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
                )
                .then((response) => {
                  const dataResult = response.data.result;
                  const sortedData = dataResult.sort((a, b) => {
                    return parseFloat(a.distance) - parseFloat(b.distance);
                  });
                  setData(sortedData);
                  setIsLoading(false);
                })
                .catch((error) => {
                  alert(error.message);
                });
            })
            .catch((error) => {
              alert(error.message);
            });
        },
        (err) => console.log(err.message)
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
    // axios
    //   .get(`http://localhost:5000/api/pengguna/${id}`)
    //   .then((response) => {
    //     const user = response.data.result;
    //     axios
    //       .get(`http://localhost:5000/api/antrian?pengangkut=${id}`)
    //       .then((response) => {
    //         console.log(response.data.result);
    //         setIsLoading(false);
    //       })
    //       .catch((error) => {
    //         alert(error.message);
    //       });
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });
  }, []);
  // console.log(data);
  const onIsTableOptionChange = (event) => {
    // Memastikan nilai event target diambil dengan benar
    setIstable(event.target.value === "table");
  };
  console.log(data);
  return (
    <div className="Antrian">
      {/* {console.log(data)} */}
      <div className="row">
        <div className="col">
          <h1>Antrian Pengangkutan Saya</h1>
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
      {/* <ListAntrian data={data} /> */}
      {isLoading ? (
        true
      ) : isTable ? (
        <ListAntrian data={data} />
      ) : (
        <AntrianMap data={data} />
      )}
    </div>
  );
}

export default Antrian;
