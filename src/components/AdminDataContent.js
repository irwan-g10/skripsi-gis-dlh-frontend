import React from "react";

import PropTypes from "prop-types";

import AdminTable from "./AdminTable";
import AdminPagination from "./AdminPagination";
import AdminOptionBar from "./AdminOptionBar";

function AdminDataContent({ title }) {
  return (
    <div className="AdminDataContent">
      <div class="container">
        <div class="row mb-3">
          <div class="col-9">
            <h2>{title}</h2>
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

AdminDataContent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AdminDataContent;
