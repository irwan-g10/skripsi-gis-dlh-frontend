import axios from "axios";
import React from "react";

function JadwalPengangkutan() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/titik-tpa`)
      .then((response) => {
        setData(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  const filteredDataSenin = data.filter((item) => item.hari[0].senin === true);
  const filteredDataSelasa = data.filter(
    (item) => item.hari[0].selasa === true
  );
  const filteredDataRabu = data.filter((item) => item.hari[0].rabu === true);
  const filteredDataKamis = data.filter((item) => item.hari[0].kamis === true);
  const filteredDataJumat = data.filter((item) => item.hari[0].jumat === true);
  const filteredDataSabtu = data.filter((item) => item.hari[0].sabtu === true);
  const filteredDataMinggu = data.filter(
    (item) => item.hari[0].minggu === true
  );

  return (
    <div className="JadwalPengangkutan">
      <table className="table">
        <thead>
          <tr>
            <th className="text-center" scope="col">
              Senin
            </th>
            <th className="text-center" scope="col">
              Selasa
            </th>
            <th className="text-center" scope="col">
              Rabu
            </th>
            <th className="text-center" scope="col">
              Kamis
            </th>
            <th className="text-center" scope="col">
              Jumat
            </th>
            <th className="text-center" scope="col">
              Sabtu
            </th>
            <th className="text-center" scope="col">
              Minggu
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="col">
            <td className="text-center">
              {filteredDataSenin.map((item, index) => {
                return (
                  <div key={index}>
                    {item.nama_tempat}
                    <hr />
                  </div>
                );
              })}
            </td>
            <td className="text-center">
              {filteredDataSelasa.map((item, index) => {
                return (
                  <div key={index}>
                    {item.nama_tempat}
                    <hr />
                  </div>
                );
              })}
            </td>
            <td className="text-center">
              {filteredDataRabu.map((item, index) => {
                return (
                  <div key={index}>
                    {item.nama_tempat}
                    <hr />
                  </div>
                );
              })}
            </td>
            <td className="text-center">
              {filteredDataKamis.map((item, index) => {
                return (
                  <div key={index}>
                    {item.nama_tempat}
                    <hr />
                  </div>
                );
              })}
            </td>
            <td className="text-center">
              {filteredDataJumat.map((item, index) => {
                return (
                  <div key={index}>
                    {item.nama_tempat}
                    <hr />
                  </div>
                );
              })}
            </td>
            <td className="text-center">
              {filteredDataSabtu.map((item, index) => {
                return (
                  <div key={index}>
                    {item.nama_tempat}
                    <hr />
                  </div>
                );
              })}
            </td>
            <td className="text-center">
              {filteredDataMinggu.map((item, index) => {
                return (
                  <div key={index}>
                    {item.nama_tempat}
                    <hr />
                  </div>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default JadwalPengangkutan;
