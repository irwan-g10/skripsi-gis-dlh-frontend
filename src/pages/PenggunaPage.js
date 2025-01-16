import { Link, Route, Routes } from "react-router-dom";
import PenggunaHome from "../components/pengguna/penggunaHome";
import InformasiGeografis from "../components/pengguna/informasi-geografis/InformasiGeografis";
import JadwalPengangkutan from "../components/pengguna/jadwal-pengangkutan/JadwalPengangkutan";
import LaporPengaduanSampah from "../components/pengguna/lapor-pengaduan/LaporPengaduanSampah";
import LoginPage from "./LoginPage";

/* eslint-disable jsx-a11y/anchor-is-valid */
function PenggunaPage() {
  return (
    <div className="PenggunaPage container-fluid">
      <div className="pengguna-navbar">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <i className="bi bi-list"></i> DLH KAB BANDUNG
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                  ></a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <a
                  href="/login"
                  className="btn btn-outline-success"
                  type="submit"
                >
                  Masuk
                </a>
              </form>
            </div>
          </div>
        </nav>
      </div>
      <div className="pengguna-content p-4">
        <Routes>
          <Route path="/" element={<PenggunaHome />}></Route>
          <Route
            path="/informasi-geografis"
            element={<InformasiGeografis />}
          ></Route>
          <Route
            path="/jadwal-pengangkutan"
            element={<JadwalPengangkutan />}
          ></Route>
          <Route
            path="/lapor-pengaduan"
            element={<LaporPengaduanSampah />}
          ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default PenggunaPage;
