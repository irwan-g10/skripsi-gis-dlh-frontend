import React from "react";

function ListPengangkutan({ data }) {
  return (
    <div className="ListPengangkutan">
      {console.log(data)}
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
                    <th scope="row">Nama</th>
                    <td className="text-end">{item.nama_tempat}</td>
                  </tr>
                  <tr>
                    <th scope="row">Jenis</th>
                    <td className="text-end">{item.jenis_tong}</td>
                  </tr>
                  <tr>
                    <th scope="row">Alamat</th>
                    <td className="text-end">{item.alamat}</td>
                  </tr>
                  <tr>
                    <th scope="row">jarak</th>
                    <td className="text-end">3 km</td>
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

export default ListPengangkutan;
