import React from "react";
import PenggunaItem from "./PenggunaItem";

function PenggunaTable({ data }) {
  console.log(data);
  return (
    <div className="PenggunaTable">
      <div className="container mb-1">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama</th>
              <th scope="col">UPT Pengelola</th>
              <th scope="col">Unit Kerja</th>
              <th scope="col">Role</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <PenggunaItem
                key={item.id}
                nomor={index + 1}
                id={item.id}
                nama={item.nama}
                upt_pengelola={item.upt_pengelola}
                unit_kerja={item.unit_kerja}
                role={item.role}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PenggunaTable;
