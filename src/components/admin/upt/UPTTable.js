import React from "react";
import UPTItem from "./UPTItem";

function UPTTable({ data }) {
  console.log(data);
  return (
    <div className="UPTTable">
      <div className="container mb-1">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama UPT</th>
              <th scope="col">Lokasi</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <UPTItem
                key={item.id}
                nomor={index + 1}
                id={item.id}
                nama_upt={item.nama_upt}
                lokasi={item.lokasi}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UPTTable;
