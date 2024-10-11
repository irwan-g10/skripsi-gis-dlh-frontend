import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UPTItem({ id, nomor, nama_upt, alamat }) {
  async function onDeleteHandler(id) {
    await axios
      .delete(`http://localhost:5000/api/titik-upt/${id}`)
      .then((response) => {
        alert("Berhasil di Hapus");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <tr>
      <th scope="row">{nomor}</th>
      <td>{nama_upt}</td>
      <td>{alamat}</td>

      <td>
        <div className="container  text-center">
          <Link to={"/titik-upt-update/" + id}>
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

export default UPTItem;
