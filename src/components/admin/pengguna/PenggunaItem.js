import React from "react";
import PropTyoe from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

function PenggunaItem({ id, nomor, nama, upt_pengelola, unit_kerja, role }) {
  async function onDeleteHandler(id) {
    await axios
      .delete(`http://localhost:5000/api/pengguna/${id}`)
      .then((response) => {
        alert("Berhasil di Hapus");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  // console.log(jadwal_pengangkutan);
  return (
    <tr>
      <th scope="row">{nomor}</th>
      <td>{nama}</td>
      <td>{upt_pengelola}</td>
      <td>{role}</td>

      <td>
        <div className="container  text-center">
          <Link to={"/pengguna-update/" + id}>
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

export default PenggunaItem;
