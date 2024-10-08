import React from "react";
import PropTyoe from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

function JadwalPengangkutanItem({ id, nomor, titik_tpa, hari }) {
  async function onDeleteHandler(id) {
    await axios
      .delete(`http://localhost:5000/api/jadwal-pengangkutan/${id}`)
      .then((response) => {
        alert("Berhasil di Hapus");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  function filteredHari(hari) {
    const result = "d-none";
    if (!hari) {
      return result;
    }
  }
  return (
    <tr>
      <th scope="row">{nomor}</th>
      <td>{titik_tpa}</td>
      <td>
        <label className={filteredHari(hari.senin)}> Senin,</label>
        <label className={filteredHari(hari.selasa)}> Selasa,</label>
        <label className={filteredHari(hari.rabu)}> Rabu,</label>
        <br></br>
        <label className={filteredHari(hari.kamis)}> Kamis,</label>
        <label className={filteredHari(hari.jumat)}> Jumat,</label>
        <label className={filteredHari(hari.sabtu)}> Sabtu,</label>
        <label className={filteredHari(hari.minggu)}> Minggu</label>
      </td>
      {/* <td>{hari.map((item) => item.senin)}</td> */}
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

export default JadwalPengangkutanItem;
