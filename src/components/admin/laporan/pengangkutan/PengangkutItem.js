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
  function formatDateTime(date) {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dayName = days[date.getDay()]; // Nama hari
    const day = date.getDate(); // Tanggal
    const month = months[date.getMonth()]; // Nama bulan
    const year = date.getFullYear(); // Tahun
    const hours = String(date.getHours()).padStart(2, "0"); // Jam (2 digit)
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Menit (2 digit)

    // Format: 22.00 / Sabtu, 18 Agustus 2020
    return `${hours}.${minutes} / ${dayName}, ${day} ${month} ${year}`;
  }
  return (
    <tr>
      <th scope="row">{nomor}</th>
      <td>
        <Link to={`/detail-laporan-pengangkutan/${id}`} key={id}>
          {nama_tempat}
        </Link>
      </td>
      <td>{pengangkut}</td>
      <td>{formatDateTime(new Date(tanggal))}</td>
      {/* <td>{tanggal}</td> */}
      <td>{keterangan}</td>
      <td>{status}</td>
    </tr>
  );
}

export default PengangkutItem;
