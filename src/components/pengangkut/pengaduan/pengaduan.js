import axios from "axios";
import React from "react";
import ListPengaduan from "./ListPengaduan";

function Pengaduan() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/laporan-pengaduan`)
      .then((response) => {
        setData(response.data.result);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div className="Pengaduan">
      {/* {console.log(data)} */}
      <h1>this is Pengaduan</h1>
      {isLoading ? true : <ListPengaduan data={data} />}
    </div>
  );
}

export default Pengaduan;
