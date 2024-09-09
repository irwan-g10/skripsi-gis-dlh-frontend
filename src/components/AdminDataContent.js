import React from "react";
import AdminTable from "./AdminTable";
import AdminPagination from "./AdminPagination";
import AdminOptionBar from "./AdminOptionBar";

class AdminDataContent extends React.Component {
  render() {
    return (
      <div className="AdminDataContent">
        <div class="container">
          <div class="row mb-3">
            <div class="col-9">
              <h2>Titik TPA</h2>
            </div>
            <div class="col-3 ">
              <div class="col d-grid">
                <button type="button" class="btn btn-primary ">
                  Add
                </button>
              </div>
            </div>
          </div>
          <AdminOptionBar />
          <AdminTable />
          <div class="position-relative">
            <div class="position-absolute  end-0">
              <AdminPagination />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDataContent;
