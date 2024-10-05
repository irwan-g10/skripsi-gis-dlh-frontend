import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import AdminTable from "./AdminTable";
import AdminPagination from "./AdminPagination";
import AdminOptionBar from "./AdminOptionBar";
import { Route, Routes } from "react-router-dom";
import AdminMaps from "./AdminMaps";

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
              <Link to="/titik-tpa-input">
                <button type="button" class="btn btn-primary ">
                  Add
                </button>
              </Link>
            </div>
          </div>
        </div>
        <AdminOptionBar />

        {/* <Routes>
          <Route path="/titik-tpa-table" element={<AdminTable />}></Route>
          <Route path="/titik-tpa-maps" element={<AdminMaps />}></Route>
        </Routes> */}
        <AdminTable />
      </div>
    </div>
  );
}

AdminDataContent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AdminDataContent;
