import React from "react";
import AdminPagination from "./AdminPagination";

function AdminTable() {
  return (
    <div className="AdminTable">
      <div class="container mb-1">
        <table class="table">
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
                <div class="container  text-center">
                  <button type="button" class="btn btn-success me-2">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button type="button" class="btn btn-warning">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <div class="container  text-center">
                <button type="button" class="btn btn-success me-2">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-warning">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <div class="container  text-center">
                <button type="button" class="btn btn-success me-2">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-warning">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <div class="container  text-center">
                <button type="button" class="btn btn-success me-2">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-warning">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
              <div class="container  text-center">
                <button type="button" class="btn btn-success me-2">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-warning">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </tr>
            {/* <tr>
                <th scope="row">6</th>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <div class="container  text-center">
                  <button type="button" class="btn btn-success me-2">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button type="button" class="btn btn-warning">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <div class="container  text-center">
                  <button type="button" class="btn btn-success me-2">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button type="button" class="btn btn-warning">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <div class="container  text-center">
                  <button type="button" class="btn btn-success me-2">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button type="button" class="btn btn-warning">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </tr>
              <tr>
                <th scope="row">9</th>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <div class="container  text-center">
                  <button type="button" class="btn btn-success me-2">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button type="button" class="btn btn-warning">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </tr>
              <tr>
                <th scope="row">10</th>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <div class="container  text-center">
                  <button type="button" class="btn btn-success me-2">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button type="button" class="btn btn-warning">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </tr> */}
          </tbody>
        </table>
      </div>
      <div class="position-relative">
        <div class="position-absolute  end-0">
          <AdminPagination />
        </div>
      </div>
    </div>
  );
}

export default AdminTable;
