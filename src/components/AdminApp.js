import React from "react";
import AdminDataContent from "./AdminDataContent";
import Navigation from "./Navigation";
import AdminSideContent from "./AdminSideContent";
import { Route, Routes } from "react-router-dom";
import TPAInput from "./TPAInput";
import JadwalPengangkutanInput from "./JadwalPengangkutanInput";
import UPTInput from "./UPTInput";
import PenggunaInput from "./PenggunaInput";
import LoginPage from "../pages/LoginPage";

class AdminApp extends React.Component {
  render() {
    return (
      <div className="AdminApp">
        <LoginPage />
        {/* <Navigation />
        <div className="AdminContent container-fluid ">
          <div class="row">
            <div class="col-3">
              <AdminSideContent />
            </div>
            <div class="col border rounded p-3">
              <Routes>
                <Route
                  path="/titik-tpa-table"
                  element={<AdminDataContent title={"Titik TPA"} />}
                ></Route>
                <Route
                  path="/jadwal-pengangkutan"
                  element={<AdminDataContent title={"Jadwal Pengangkutan"} />}
                ></Route>
                <Route
                  path="/upt"
                  element={<AdminDataContent title={"UPT"} />}
                ></Route>
                <Route
                  path="/laporan-pengangkutan"
                  element={<AdminDataContent title={"Laporan Pengangkutan"} />}
                ></Route>
                <Route
                  path="/laporan-pengaduan"
                  element={<AdminDataContent title={"Laporan Pengaduan"} />}
                ></Route>
                <Route
                  path="/pengguna"
                  element={<AdminDataContent title={"Pengguna"} />}
                ></Route>
                <Route path="/titik-tpa-input" element={<TPAInput />}></Route>
                <Route
                  path="/jadwal-pengangkutan-input"
                  element={<JadwalPengangkutanInput />}
                ></Route>
                <Route path="/upt-input" element={<UPTInput />}></Route>
                <Route
                  path="/pengguna-input"
                  element={<PenggunaInput />}
                ></Route>
                <Route
                  path="/titik-tpa-update"
                  element={<TPAInput isUpdate={true} />}
                ></Route>
              </Routes>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default AdminApp;
