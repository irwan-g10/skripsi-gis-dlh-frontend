import React from "react";
import PropTypes from "prop-types";
import PengangkutItem from "./PengangkutItem";
// import TPAItem from "./TPAItem";

function PengangkutanTable({ data }) {
  console.log(data);
  return (
    <div className="PengangkutanTable">
      <div className="container mb-1">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Tempat</th>
              <th scope="col">Pengangkut</th>
              <th scope="col">Tanggal Pengangkutan</th>
              <th scope="col">Keterangan</th>
              <th scope="col">Status Angkutan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <PengangkutItem
                key={item.id}
                nomor={index + 1}
                id={item.id}
                nama_tempat={item.titik_tpa.nama_tempat}
                pengangkut={item.pengangkut.nama}
                tanggal={item.tanggal_pengangkutan}
                keterangan={item.keterangan}
                status={item.status}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* <PaginationTPA /> */}
    </div>
  );
}

// TPATable.propTypes = {
//   titikTpas: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default PengangkutanTable;
