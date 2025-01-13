import React from "react";
import PropTyoe from "prop-types";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function PengaduanItem({
  id,
  nomor,
  nama_pengadu,
  alamat,
  pengangkut,
  tanggal_pengaduan,
  tanggal_pengangkutan,
  status,
  keterangan,
}) {
  return (
    <tr>
      <th scope="row">{nomor}</th>
      <td>
        <Link to={`/detail-laporan-pengaduan/${id}`} key={id}>
          {nama_pengadu}
        </Link>
      </td>
      <td>{alamat}</td>
      <td>{tanggal_pengaduan}</td>
      <td>{pengangkut}</td>
      <td>{status}</td>
      <td>{keterangan}</td>
      <td>{tanggal_pengangkutan}</td>
    </tr>
  );
}

export default PengaduanItem;
