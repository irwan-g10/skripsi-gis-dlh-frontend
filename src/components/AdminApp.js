import React from "react";
import AdminPage from "../pages/AdminPage";
import PenggunaPage from "../pages/PenggunaPage";

class AdminApp extends React.Component {
  render() {
    return (
      <div className="AdminApp">
        <PenggunaPage />
      </div>
    );
  }
}

export default AdminApp;
