import React from "react";
import PropTyoe from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

function TPAItem({
  id,
  nomor,
  nama_tempat,
  jenis_tong,
  alamat,
  jadwal_pengangkutan,
}) {
  async function onDeleteHandler(id) {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}api/titik-tpa/${id}`)
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

  // console.log(jadwal_pengangkutan);
  return (
    <tr>
      <th scope="row">{nomor}</th>
      <td>{nama_tempat}</td>
      <td>{jenis_tong}</td>
      <td>{alamat}</td>
      <td>
        <label className={filteredHari(jadwal_pengangkutan.senin)}>
          {" "}
          Senin,
        </label>
        <label className={filteredHari(jadwal_pengangkutan.selasa)}>
          {" "}
          Selasa,
        </label>
        <label className={filteredHari(jadwal_pengangkutan.rabu)}> Rabu,</label>
        <br></br>
        <label className={filteredHari(jadwal_pengangkutan.kamis)}>
          {" "}
          Kamis,
        </label>
        <label className={filteredHari(jadwal_pengangkutan.jumat)}>
          {" "}
          Jumat,
        </label>
        <label className={filteredHari(jadwal_pengangkutan.sabtu)}>
          {" "}
          Sabtu,
        </label>
        <label className={filteredHari(jadwal_pengangkutan.minggu)}>
          {" "}
          Minggu
        </label>
      </td>
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

export default TPAItem;
