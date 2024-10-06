import React from "react";
import PropTypes from "prop-types";
import TPAItem from "./TPAItem";

function TableTPA(data) {
  // console.log(data.titikTpas);
  return (
    <div className="TableTPA">
      <div className="container mb-1">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Tempat</th>
              <th scope="col">Jenis Tong</th>
              <th scope="col">Lokasi</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {data.titikTpas.map((titikTpa, index) => (
              <TPAItem
                key={titikTpa.id}
                nomor={index + 1}
                id={titikTpa.id}
                nama_tempat={titikTpa.nama_tempat}
                jenis_tong={titikTpa.jenis_tong}
                lokasi={titikTpa.lokasi}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* <PaginationTPA /> */}
    </div>
  );
}

// TableTPA.propTypes = {
//   titikTpas: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default TableTPA;
