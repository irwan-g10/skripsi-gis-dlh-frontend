import React from "react";
import AdminDataContent from "./AdminDataContent";
import Navigation from "./Navigation";
import AdminSideContent from "./AdminSideContent";

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
              <AdminDataContent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminApp;
