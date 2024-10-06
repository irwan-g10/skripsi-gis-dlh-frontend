import React from "react";
// import { Link } from "react-router-dom";

function TPAInput({ isUpdate }) {
  return (
    <div className="TPAInput">
      <div class="container">
        <div class="mb-5">
          <h2>{isUpdate ? "Informasi TPA" : "Tambah Lokasi TPA"}</h2>
        </div>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>
        <div class="mb-3">
          <label for=" namaTempat" class="form-label">
            Nama Tempat
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
            Jenis Tong
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
            Unit Pelayanan Teknis
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
            Lokasi
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
                <i class="bi bi-geo-alt-fill"></i>
              </button>
            </div>
          </div>
        </div>

        <div className=" row">
          <div className=" col">
            <div class="mb-3">
              <label for="latitude" class="form-label">
                Latitude
              </label>
              <input
                type="input"
                class="form-control"
                id="latitude"
                placeholder="Masukan latitude ..."
              />
            </div>
          </div>
          <div className="col">
            <div class="mb-3">
              <label for="longitude" class="form-label">
                Logitude
              </label>
              <input
                type="input"
                class="form-control"
                id="longitude"
                placeholder="Masukan longitude ...."
              />
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="kecamatan" class="form-label">
            Kecamatan
          </label>
          <input
            type="input"
            class="form-control"
            id="kecamatan"
            placeholder="Masukan Kecamatan ..."
          />
          <div class="mb-5">
            <label for="desa" class="form-label">
              Desa
            </label>
            <input
              type="input"
              class="form-control"
              id="desa"
              placeholder="Masukan desa ..."
            />
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

export default TPAInput;
