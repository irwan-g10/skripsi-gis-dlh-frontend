import React from "react";
import { Link } from "react-router-dom";

function AdminSideContent() {
  return (
    <div className="AdminSideContent">
      <ul class="list-group">
        <li class="list-group-item text-center">
          <div class="mb-3">
            <img src="/images/user.png" width="150" alt="..." />
          </div>
          <h3>Irwan Gumilar</h3>
        </li>
        <Link to="/titik-tpa-table">
          <li class="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col-2">
                <i class="bi bi-geo-alt-fill"></i>
              </div>
              <div className="col">Titik TPA</div>
              <div className="col-1">
                <i class="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>
        <Link to="/jadwal-pengangkutan">
          <li class="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col-2">
                <i class="bi bi-calendar-day"></i>
              </div>
              <div className="col">Jadwal Pengangkutan</div>
              <div className="col-1">
                <i class="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>
        <Link to="/upt">
          <li class="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col-2">
                <i class="bi bi-building-fill"></i>
              </div>
              <div className="col">Unit Pelayanan Teknis</div>
              <div className="col-1">
                <i class="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>
        <li class="list-group-item " aria-current="true">
          <div className="row container">
            <div className="col-2">
              <i class="bi bi-book-fill"> </i>
            </div>
            <div className="col">Laporan</div>
          </div>
        </li>
        <Link to="/laporan-pengangkutan">
          <li class="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col text-end">Pengangkutan</div>
              <div className="col-1">
                <i class="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>
        <Link to="/laporan-pengaduan">
          <li class="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col text-end">Pengaduan</div>
              <div className="col-1">
                <i class="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>
        <Link to="/pengguna">
          <li class="list-group-item " aria-current="true">
            <div className="row container">
              <div className="col-2">
                <i class="bi bi-person-fill"></i>
              </div>
              <div className="col">Pengguna</div>
              <div className="col-1">
                <i class="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </li>
        </Link>

        <li class="list-group-item text-center">Keluar</li>
      </ul>
    </div>
  );
}

export default AdminSideContent;
