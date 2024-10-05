import React from "react";
// import { Link } from "react-router-dom";

function JadwalPengangkutanInput({ isUpdate }) {
  return (
    <div className="JadwalPengangkutanInput">
      <div class="container">
        <div class="mb-5">
          <h2>
            {isUpdate
              ? "Informasi Jadwal Pengangkutan"
              : "Tambah Jadwal Pengangkutan"}
          </h2>
        </div>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Titik Pengangkutan
          </label>

          <select class="form-select" aria-label="Default select example">
            <option selected>-- pilih --</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Hari Pengangkutan
          </label>

          <select class="form-select" aria-label="Default select example">
            <option selected>-- pilih --</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <div className=" row">
          <label for="lokasi" class="form-label">
            Jam Pengangkutan
          </label>
          <div className=" col">
            <div class="mb-3">
              <input
                type="input"
                class="form-control"
                id="lokasi"
                placeholder="Masukan lokasi ..."
              />
            </div>
          </div>
          <div className="col-1">
            <div class="mb-3">
              <button type="button" class="btn btn-primary ">
                <i class="bi bi-clock"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="mb-3 m-3 d-grid">
          <button
            type="button"
            class={"btn btn-" + (isUpdate ? "success" : "primary")}
          >
            {isUpdate ? "Perbarui" : "Tambah"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JadwalPengangkutanInput;
