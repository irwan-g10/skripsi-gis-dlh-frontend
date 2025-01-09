import React from "react";
import PropTypes from "prop-types";
// import TPAItem from "./TPAItem";

function PengaduanTable({ data }) {
  // console.log(data);
  return (
    <div className="PengaduanTable">
      <div className="container mb-1">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Pengadu</th>
              <th scope="col">Alamat</th>
              <th scope="col">Tanggal Pengaduan</th>
              <th scope="col">Pengangkut</th>
              <th scope="col">Status Aduan</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((item, index) => (
              // <TPAItem
              //   key={item.id}
              //   nomor={index + 1}
              //   id={item.id}
              //   nama_tempat={item.nama_tempat}
              //   jenis_tong={item.jenis_tong}
              //   jadwal_pengangkutan={item.hari[0]}
              //   alamat={item.alamat}
              // />
            ))} */}
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

export default PengaduanTable;
