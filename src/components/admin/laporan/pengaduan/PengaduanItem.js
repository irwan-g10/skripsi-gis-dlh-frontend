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
        <Link to={`/detail-laporan-pengaduan/${id}`} key={id}>
          {nama_pengadu}
        </Link>
      </td>
      <td>{alamat}</td>
      <td>{formatDateTime(new Date(tanggal_pengaduan))}</td>
      <td>{pengangkut}</td>
      <td>{status}</td>
      <td>{keterangan}</td>
      <td>
        {status === "Belum ditindak lanjuti"
          ? ""
          : formatDateTime(new Date(tanggal_pengangkutan))}
      </td>
    </tr>
  );
}

export default PengaduanItem;
