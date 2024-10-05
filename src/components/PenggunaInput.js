import React from "react";
// import { Link } from "react-router-dom";

function PenggunaInput({ isUpdate }) {
  return (
    <div className="PenggunaInput">
      <div class="container">
        <div class="mb-5">
          <h2>{isUpdate ? "Informasi Pengguna" : "Tambah Pengguna"}</h2>
        </div>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>
        <div class="mb-3">
          <label for=" namaTempat" class="form-label">
            NIP
          </label>
          <input
            type="input"
            class="form-control"
            id=" namaTempat"
            placeholder="Masukan nama tempat ..."
          />
        </div>
        <div class="mb-3">
          <label for=" namaTempat" class="form-label">
            Nama
          </label>
          <input
            type="input"
            class="form-control"
            id=" namaTempat"
            placeholder="Masukan nama tempat ..."
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            UPT Pengelola
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
            Unit Kerja
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
            Role
          </label>

          <select class="form-select" aria-label="Default select example">
            <option selected>-- pilih --</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
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

export default PenggunaInput;
