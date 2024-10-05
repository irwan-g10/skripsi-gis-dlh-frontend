import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import AdminTable from "./AdminTable";
import AdminMaps from "./AdminMaps";

function AdminDataContent({ title }) {
  return (
    <div className="AdminDataContent">
      <div class="container">
        <h2>{title}</h2>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>

        <div className="AdminOptionBar">
          <div class="container text-center mb-5">
            <div class="row">
              <div class="col ">
                <Link to="/titik-tpa-input">
                  <div class="col d-grid">
                    <button type="button" class="btn btn-primary d-grid">
                      Tambah
                    </button>
                  </div>
                </Link>
              </div>
              <div class="col">
                <form class="d-flex" role="search">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button class="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <div class="col-3 ">
                <div
                  class="btn-group"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio1"
                    autocomplete="off"
                    checked
                  />
                  <label class="btn btn-outline-secondary" for="btnradio1">
                    Tabel
                  </label>

                  <input
                    type="radio"
                    class="btn-check"
                    name="btnradio"
                    id="btnradio2"
                    autocomplete="off"
                  />
                  <label class="btn btn-outline-secondary" for="btnradio2">
                    Maps
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdminTable />
        {/* <AdminMaps /> */}
      </div>
    </div>
  );
}

AdminDataContent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AdminDataContent;
