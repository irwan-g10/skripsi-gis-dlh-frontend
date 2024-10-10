import React from "react";

function ListPengaduan({ data }) {
  return (
    <div className="ListPengaduan">
      {data.map((item) => {
        return (
          <div className="row border rounded p-3 shadow m-5" key={item.id}>
            <div className="col-3 justify-content-center align-items-center d-flex">
              <img src="/images/user.png" width="100" alt="..." />{" "}
            </div>
            <div className="col">
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Pelapor</th>
                    <td className="text-end">{item.nama}</td>
                  </tr>
                  <tr>
                    <th scope="row">Lokasi</th>
                    <td className="text-end">{item.lokasi_kejadian}</td>
                  </tr>
                  <tr>
                    <th scope="row">jarak</th>
                    <td className="text-end">3 km</td>
                  </tr>
                  <tr>
                    <th scope="row">Tanggal Pengaduan</th>
                    <td className="text-end">10 Oktober 2020, 10.59</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListPengaduan;
