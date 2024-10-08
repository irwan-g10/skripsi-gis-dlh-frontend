import React from "react";
import PropTypes from "prop-types";
import TPAItem from "./TPAItem";

function TPATable({ data }) {
  // console.log(data);
  return (
    <div className="TPATable">
      <div className="container mb-1">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Tempat</th>
              <th scope="col">Jenis Tong</th>
              <th scope="col">Lokasi</th>
              <th scope="col">Jadwal Pengangkutan</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <TPAItem
                key={item.id}
                nomor={index + 1}
                id={item.id}
                nama_tempat={item.nama_tempat}
                jenis_tong={item.jenis_tong}
                jadwal_pengangkutan={item.hari[0]}
                lokasi={item.lokasi}
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

export default TPATable;
