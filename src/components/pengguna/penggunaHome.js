import React from "react";
import { Link } from "react-router-dom";
import InformasiGeografis from "./informasi-geografis/InformasiGeografis";
import JadwalPengangkutan from "./jadwal-pengangkutan/JadwalPengangkutan";
import LaporPengaduanSampah from "./lapor-pengaduan/LaporPengaduanSampah";
import DataStatistik from "./data-statistik/dataStatistik";

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
      <div className=" border rounded p-5 shadow m-3" id="informasi-geografis">
        <h2 className="mb-5">Data Statistik</h2>
        <div className="list-layanan ">
          <DataStatistik />
        </div>
      </div>
      <div className=" border rounded p-5 shadow m-3">
        <h2 className="mb-5">Layanan Publik</h2>
        <div className="list-layanan ">
          <div className="row">
            <div className="col m-2">
              <a href="#informasi-geografis">
                <div className="row border rounded p-2 shadow  px-5">
                  <div className="col-3 my-3">
                    <i className="bi bi-map fs-1"></i>
                  </div>
                  <div className="col  justify-content-center align-items-center text-end d-flex ms-5">
                    <h5>Informasi Geografis</h5>
                  </div>
                </div>
              </a>
            </div>
            <div className="col m-2">
              <a href="#jadwal-pengangkutan">
                <div className="row border rounded p-2 shadow px-3">
                  <div className="col-3 my-3 ">
                    <i className="bi bi-card-checklist fs-1"></i>
                  </div>
                  <div className="col  justify-content-center text-end align-items-center d-flex ms-5">
                    <h4>Jadwal Pengangkutan</h4>
                  </div>
                </div>
              </a>
            </div>
            <div className="col m-2">
              <a href="#lapor-pengaduan">
                <div className="row border rounded p-2 shadow px-2">
                  <div className="col-3 my-3">
                    <i className="bi bi-megaphone fs-1"></i>
                  </div>
                  <div className="col  justify-content-center text-end align-items-center d-flex ms-5">
                    <h4>Lapor Pengaduan Sampah</h4>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className=" border rounded p-5 shadow m-3" id="informasi-geografis">
        <h2 className="mb-5">Informasi Geografis</h2>
        <div className="list-layanan ">
          <InformasiGeografis />
        </div>
      </div>
      <div className=" border rounded p-5 shadow m-3" id="jadwal-pengangkutan">
        <h2 className="mb-5">Jadwal Pengangkutan</h2>
        <div className="list-layanan ">
          <JadwalPengangkutan />
        </div>
      </div>
      <div id="lapor-pengaduan">
        <LaporPengaduanSampah />
      </div>
    </div>
  );
}

export default PenggunaHome;
