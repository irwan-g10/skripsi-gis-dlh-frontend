import React from "react";
import { Link } from "react-router-dom";

function AdminSideContent() {
  return (
    <ul class="list-group">
      <li class="list-group-item">user</li>

      <Link to="/titik-tpa">
        <li class="list-group-item active" aria-current="true">
          <i class="bi bi-geo-alt-fill"></i> Titik TPA
        </li>
      </Link>

      <Link to="/jadwal-pengangkutan">
        <li class="list-group-item">
          <i class="bi bi-calendar-day"></i> Jadwal Pengangkutan
        </li>
      </Link>
      <Link to="/upt">
        <li class="list-group-item">
          <i class="bi bi-building-fill"></i> UPT
        </li>
      </Link>
      <li class="list-group-item">
        <i class="bi bi-book-fill"> </i>
        Laporan
        <i class="bi bi-chevron-down"></i>
      </li>
      <Link to="/laporan-pengangkutan">
        <li class="list-group-item text-end">Pengangkutan</li>
      </Link>
      <Link to="/laporan-pengaduan">
        <li class="list-group-item text-end">Pengaduan</li>
      </Link>
      <Link to="/pengguna">
        <li class="list-group-item">
          <i class="bi bi-person-fill"></i> Pengguna
        </li>
      </Link>
      <li class="list-group-item">
        <br></br>
        <br></br>
        <br></br>
      </li>
      <li class="list-group-item text-center">Keluar</li>
    </ul>
  );
}

export default AdminSideContent;
