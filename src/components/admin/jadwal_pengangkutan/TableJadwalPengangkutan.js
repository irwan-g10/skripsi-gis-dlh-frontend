import React from "react";
import JadwalPengangkutanItem from "./JadwalPengangkutanItem";
// import TPAItem from "./TPAItem";

function TableJadwalPengangkutan({ data }) {
  // console.log(data);
  return (
    <div className="TableJadwalPengangkutan">
      <div className="container mb-1">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titik TPA</th>
              <th scope="col">Hari</th>

              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <JadwalPengangkutanItem
                key={item.id}
                nomor={index + 1}
                id={item.id}
                titik_tpa={item.titik_tpa}
                hari={item.hari[0]}
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

export default TableJadwalPengangkutan;
