import React from "react";
import AdminPage from "../pages/AdminPage";
import PenggunaPage from "../pages/PenggunaPage";
import PengangkutPage from "../pages/PengangkutPage";

class AdminApp extends React.Component {
  render() {
    return (
      <div className="AdminApp">
        <AdminPage />
      </div>
    );
  }
}

export default AdminApp;
