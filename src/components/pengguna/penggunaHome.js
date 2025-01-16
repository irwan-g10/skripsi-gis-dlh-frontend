import React from "react";
import { Link } from "react-router-dom";

function PenggunaHome() {
  return (
    <div className="PenggunaHome">
      <div className="text-center border rounded p-5 shadow  m-3">
        <h1>Selamat Datang</h1>
        <div className="mb-3">
          <img src="/images/dlh-logo.png" className="m-5" alt="..." />
        </div>
        <h2>Layanan Aspirasi dan Pengaduan Online</h2>

        <p>
          Sampaikan laporan Anda langsung kepada instansi pemerintah berwenang
        </p>
      </div>
      <div className=" border rounded p-5 shadow m-3">
        <h2 className="mb-5">Layanan Publik</h2>
        <div className="list-layanan ">
          <div className="row">
            <div className="col m-2">
              <a href="/informasi-geografis">
                <div className="row border rounded p-2 shadow ">
                  <div className="col-3 ">
                    <img src="/images/user.png" width="100" alt="..." />
                  </div>
                  <div className="col  justify-content-center align-items-center d-flex ms-5">
                    <h5>Informasi Geografis</h5>
                  </div>
                </div>
              </a>
            </div>
            <div className="col m-2">
              <a href="/jadwal-pengangkutan">
                <div className="row border rounded p-2 shadow ">
                  <div className="col-3 ">
                    <img src="/images/user.png" width="100" alt="..." />
                  </div>
                  <div className="col  justify-content-center align-items-center d-flex ms-5">
                    <h4>Jadwal Pengangkutan</h4>
                  </div>
                </div>
              </a>
            </div>
            <div className="col m-2">
              <a href="/lapor-pengaduan">
                <div className="row border rounded p-2 shadow ">
                  <div className="col-3 ">
                    <img src="/images/user.png" width="100" alt="..." />
                  </div>
                  <div className="col  justify-content-center align-items-center d-flex ms-5">
                    <h4>Lapor Pengaduan Sampah</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PenggunaHome;
