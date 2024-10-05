import React from "react";
// import { Link } from "react-router-dom";

function TPAInput({ isUpdate }) {
  return (
    <div className="TPAInput">
      <div class="container">
        <div class="mb-5">
          <h2>{isUpdate ? "Informasi TPA TPA" : "Tambah Lokasi TPA"}</h2>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Nama
          </label>
          <input
            type="input"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Masukan data...."
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Jenis Tong
          </label>

          <select class="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Unit Pelayanan Teknis
          </label>

          <select class="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <div className=" row">
          <label for="exampleFormControlInput1" class="form-label">
            Lokasi
          </label>
          <div className=" col">
            <div class="mb-3">
              <input
                type="input"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Masukan data...."
              />
            </div>
          </div>
          <div className="col-1">
            <div class="mb-3">
              <button type="button" class="btn btn-primary ">
                <i class="bi bi-geo-alt-fill"></i>
              </button>
            </div>
          </div>
        </div>

        <div className=" row">
          <div className=" col">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Latitude
              </label>
              <input
                type="input"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Masukan data...."
              />
            </div>
          </div>
          <div className="col">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Logitude
              </label>
              <input
                type="input"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Masukan data...."
              />
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            kecamatan
          </label>
          <input
            type="input"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Masukan data...."
          />
          <div class="mb-5">
            <label for="exampleFormControlInput1" class="form-label">
              Desa
            </label>
            <input
              type="input"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Masukan data...."
            />
          </div>

          <div class="mb-3 m-3 d-grid">
            <button
              type="button"
              class={"btn btn-" + (isUpdate ? "success" : "primary")}
            >
              {isUpdate ? "Perbarui" : "Tambah"}
            </button>
          </div>
          {/* <div class="mb-3 m-3 d-grid">
            <button type="button" class="btn btn-success ">
              Update
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default TPAInput;
