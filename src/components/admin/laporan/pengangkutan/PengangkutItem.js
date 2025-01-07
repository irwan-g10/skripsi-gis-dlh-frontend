import React from "react";
import PropTyoe from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

function PengangkutItem({
  id,
  nomor,
  nama_tempat,
  status,
  pengangkut,
  tanggal,
  keterangan,
}) {
  return (
    <tr>
      <th scope="row">{nomor}</th>
      <td>{nama_tempat}</td>
      <td>{pengangkut}</td>
      <td>{tanggal}</td>
      <td>{keterangan}</td>
      <td>{status}</td>
    </tr>
  );
}

export default PengangkutItem;
