import React from "react";
import InputLaporanPengaduan from "./InputLaporanPengaduan";

function LaporPengaduanSampah() {
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
    <div className="LaporPengaduanSampah border rounded p-5 mx-5 shadow ">
      <div className="container ">
        <div className="title-laporan">
          <div className="mb-5">
            <h2>Lapor Pengaduan Sampah</h2>
          </div>
          <div className="border-top border-2 border-dark my-4 mx-5"></div>
        </div>
        <div className="content-laporan">
          <div className="justify-content-center align-items-center d-flex">
            <div className=" col-9">
              <div className="greeting-pengaduan">
                <div className="text-center">
                  <h5>FORMULIR PENGADUAN</h5>
                  <h5>
                    DUGAAN PENCEMARAN DAN / ATAU PERUSAKAN LINGKUNGAN HIDUP
                  </h5>
                  <br></br>
                </div>
                <p>
                  Pada hari ini{" "}
                  {formatDateTime(new Date()).split("/")[1].trim()} pukul{" "}
                  {formatDateTime(new Date()).split("/")[0].trim()} WIB, yang
                  bertanda tangan di bawah ini :
                </p>
                <br></br>
              </div>
              <InputLaporanPengaduan />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaporPengaduanSampah;
