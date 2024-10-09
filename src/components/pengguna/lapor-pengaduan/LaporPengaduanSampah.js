import React from "react";
import InputLaporanPengaduan from "./InputLaporanPengaduan";

function LaporPengaduanSampah() {
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
                  Pada hari ini ……………… tanggal ……………………………… bulan ……………………..
                  tahun …………………………… pukul ……….. WIB, di ………………………………… yang
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
