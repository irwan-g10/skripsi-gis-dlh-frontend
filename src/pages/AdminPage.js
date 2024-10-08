import React from "react";
import Navigation from "../components/admin/NavigationTPA";
import AdminSideContent from "../components/admin/AdminSideContent";
import { Route, Routes } from "react-router-dom";
import TPAInput from "../components/admin/tpa/TPAInput";
import AdminDataTPA from "../components/admin/tpa/AdminDataTPA";
import AdminDataUPT from "../components/admin/upt/DataUPT";
import UPTInput from "../components/admin/upt/UPTInput";

function AdminPage() {
  return (
    <div className="admin-page container-fluid">
      <Navigation />
      <div className="row">
        <div className="col-3">
          <AdminSideContent />
        </div>
        <div className="col ">
          <div className="border rounded p-3 shadow  rounded">
            <Routes>
              <Route path="/titik-tpa-table" element={<AdminDataTPA />}></Route>
              <Route path="/titik-tpa-input" element={<TPAInput />}></Route>
              <Route
                path="/titik-tpa-update/:id"
                element={<TPAInput isUpdate={true} />}
              ></Route>

              <Route path="/titik-upt-table" element={<AdminDataUPT />}></Route>
              <Route path="/titik-upt-input" element={<UPTInput />}></Route>
              <Route
                path="/titik-upt-update/:id"
                element={<UPTInput isUpdate={true} />}
              ></Route>
              {/*
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
              
              
              <Route path="/upt-input" element={<UPTInput />}></Route>
              <Route path="/pengguna-input" element={<PenggunaInput />}></Route>
              <Route
                path="/titik-tpa-update"
                element={<TPAInput isUpdate={true} />}
              ></Route> */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
