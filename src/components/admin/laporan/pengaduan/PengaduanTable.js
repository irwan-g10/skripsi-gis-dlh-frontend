import React from "react";
import PropTypes from "prop-types";
import PengaduanItem from "./PengaduanItem";
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
              <th scope="col">Keterangan</th>
              <th scope="col">Tanggal Pengangkutan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <PengaduanItem
                key={item.id}
                nomor={index + 1}
                id={item.id}
                nama_pengadu={item.nama}
                alamat={item.lokasi_kejadian}
                tanggal_pengaduan={item.tanggal_pengaduan}
                pengangkut={item.alamat}
                status={item.alamat}
                keterangan={item.alamat}
                tanggal_pengangkutan={item.tanggal_pengangkutan}
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

export default PengaduanTable;
