import React from "react";
import AdminPagination from "./admin/tpa/PaginationTPA";
import { Link } from "react-router-dom";

function AdminTable() {
  return (
    <div className="AdminTable">
      <div className="container mb-1">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
                <div className="container  text-center">
                  <Link to="/titik-tpa-update">
                    <button type="button" className="btn btn-success me-2">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </Link>
                  <button type="button" className="btn btn-warning">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="position-relative">
        <div className="position-absolute  end-0">
          <AdminPagination />
        </div>
      </div>
    </div>
  );
}

export default AdminTable;
