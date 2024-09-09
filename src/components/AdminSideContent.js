import React from "react";

function AdminSideContent() {
  return (
    <ul class="list-group">
      <li class="list-group-item">user</li>
      <li class="list-group-item active" aria-current="true">
        <i class="bi bi-geo-alt-fill"></i> Titik TPA
      </li>
      <li class="list-group-item">
        <i class="bi bi-calendar-day"></i> Jadwal Pengangkutan
      </li>
      <li class="list-group-item">
        <i class="bi bi-building-fill"></i> UPT
      </li>
      <li class="list-group-item">
        <i class="bi bi-book-fill"> </i>
        Laporan
        <i class="bi bi-chevron-down"></i>
      </li>
      <li class="list-group-item text-end">Pengangkutan</li>
      <li class="list-group-item text-end">Pengaduan</li>
      <li class="list-group-item">
        <i class="bi bi-person-fill"></i> Pengguna
      </li>
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
