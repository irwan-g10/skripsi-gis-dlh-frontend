import React from "react";
import PropTyoe from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

// class TO
function TPAItem({ id, nomor, nama_tempat, jenis_tong, lokasi }) {
  async function onDeleteHandler(id) {
    await axios
      .delete(`http://localhost:5000/api/titik-tpa/${id}`)
      .then((response) => {
        alert("Berhasil Di Hapus");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <tr>
      <th scope="row">{nomor}</th>
      <td>{nama_tempat}</td>
      <td>{jenis_tong}</td>
      <td>{lokasi}</td>
      <td>
        <div className="container  text-center">
          <Link to={"/titik-tpa-update/" + id}>
            <button type="button" className="btn btn-success me-2">
              <i className="bi bi-pencil-square"></i>
            </button>
          </Link>
          <button
            className="btn btn-warning"
            onClick={() => onDeleteHandler(id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

TPAItem.propType = {
  id: PropTyoe.string.isRequired,
  nama_tempat: PropTyoe.string.isRequired,
  jenis_tong: PropTyoe.string.isRequired,
  lokasi: PropTyoe.string.isRequired,
};

export default TPAItem;
