import React from "react";
import PropTypes from "prop-types";
import TPAItem from "./TPAItem";

function TableTPA(data) {
  // console.log(data);
  return (
    <div className="TableTPA">
      <div className="container mb-1">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item) => (
              <TPAItem
                key={item.id}
                id={item.id}
                nama_tempat={item.nama_tempat}
                jenis_tong={item.jenis_tong}
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

TableTPA.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableTPA;
