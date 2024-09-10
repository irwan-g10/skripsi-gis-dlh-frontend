import React from "react";
import AdminDataContent from "./AdminDataContent";
import Navigation from "./Navigation";
import AdminSideContent from "./AdminSideContent";
import { Route, Routes } from "react-router-dom";

class AdminApp extends React.Component {
  render() {
    return (
      <div className="AdminApp">
        <Navigation />
        <div className="AdminContent" class="container-fluid">
          <div class="row">
            <div class="col-3">
              <AdminSideContent />
            </div>
            <div class="col ">
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
              </Routes>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminApp;
