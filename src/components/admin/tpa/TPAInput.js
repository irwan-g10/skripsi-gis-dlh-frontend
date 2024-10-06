import axios from "axios";
import React from "react";
// import { Link } from "react-router-dom";
class TPAInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdate: false,
      nama_tempat: "",
      jenis_tong: "",
      unit_pelayanan_teknis: "",
      lokasi: "",
      latitude: "",
      longitude: "",
      kecamatan: "",
      desa: "",
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onNamaTempatChangeHandler = this.onNamaTempatChangeHandler.bind(this);
    this.onJenisTongChangeHandler = this.onJenisTongChangeHandler.bind(this);
    this.onUnitPelayananTeknisChangeHandler =
      this.onUnitPelayananTeknisChangeHandler.bind(this);
    this.onLokasiChangeHandler = this.onLokasiChangeHandler.bind(this);
    this.onLatitudeChangeHandler = this.onLatitudeChangeHandler.bind(this);
    this.onLongitudeChangeHandler = this.onLongitudeChangeHandler.bind(this);
    this.onKecamatanChangeHandler = this.onKecamatanChangeHandler.bind(this);
    this.onDesaChangeHandler = this.onDesaChangeHandler.bind(this);
  }

  onNamaTempatChangeHandler(event) {
    this.setState(() => {
      return {
        nama_tempat: event.target.value,
      };
    });
  }
  onJenisTongChangeHandler(event) {
    this.setState(() => {
      return {
        jenis_tong: event.target.value,
      };
    });
  }
  onUnitPelayananTeknisChangeHandler(event) {
    this.setState(() => {
      return {
        unit_pelayanan_teknis: event.target.value,
      };
    });
  }
  onLokasiChangeHandler(event) {
    this.setState(() => {
      return {
        lokasi: event.target.value,
      };
    });
  }
  onLatitudeChangeHandler(event) {
    this.setState(() => {
      return {
        latitude: event.target.value,
      };
    });
  }
  onLongitudeChangeHandler(event) {
    this.setState(() => {
      return {
        longitude: event.target.value,
      };
    });
  }
  onKecamatanChangeHandler(event) {
    this.setState(() => {
      return {
        kecamatan: event.target.value,
      };
    });
  }
  onDesaChangeHandler(event) {
    this.setState(() => {
      return {
        desa: event.target.value,
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();

    const postData = {
      nama_tempat: this.state.nama_tempat,
      jenis_tong: this.state.jenis_tong,
      unit_pelayanan_teknis: this.state.unit_pelayanan_teknis,
      lokasi: this.state.lokasi,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      kecamatan: this.state.kecamatan,
      desa: this.state.desa,
    };

    axios
      .post(`http://localhost:5000/api/titik-tpa`, postData)
      .then((response) => {
        alert("sukses");
      })
      .catch((error) => {
        alert(error.message);
      });

    // console.log(postData);
  }

  render() {
    return (
      <div className="TPAInput">
        <div className="container">
          <div className="mb-5">
            <h2>
              {this.state.isUpdate ? "Informasi TPA" : "Tambah Lokasi TPA"}
            </h2>
          </div>
          <div className="border-top border-2 border-dark my-4 mx-5"></div>
          <form onSubmit={this.onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor=" namaTempat" className="form-label">
                Nama Tempat
              </label>
              <input
                type="input"
                className="form-control"
                placeholder="Masukan nama tempat ..."
                value={this.state.nama_tempat}
                onChange={this.onNamaTempatChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Jenis Tong
              </label>

              <select
                className="form-select"
                aria-label="Default select example"
                onChange={this.onJenisTongChangeHandler}
              >
                <option value>-- pilih --</option>
                <option value="Tong Besar">Tong Besar</option>
                <option value="Tong Sedang">Tong Sedang</option>
                <option value="Tong Kecil">Tong Kecil</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Unit Pelayanan Teknis
              </label>

              <select
                className="form-select"
                aria-label="Default select example"
                onChange={this.onUnitPelayananTeknisChangeHandler}
              >
                <option value>-- pilih --</option>
                <option value="UPT Banjaran">UPT Banjaran</option>
                <option value="UPT Baleendah">UPT Baleendah</option>
                <option value="UPT Soreang">UPT Soreang</option>
              </select>
            </div>

            <div className=" row">
              <label htmlFor="lokasi" className="form-label">
                Lokasi
              </label>
              <div className=" col">
                <div className="mb-3">
                  <input
                    type="input"
                    className="form-control"
                    placeholder="Masukan lokasi ..."
                    value={this.state.lokasi}
                    onChange={this.onLokasiChangeHandler}
                  />
                </div>
              </div>
              <div className="col-1">
                <div className="mb-3">
                  <button type="button" className="btn btn-primary ">
                    <i className="bi bi-geo-alt-fill"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className=" row">
              <div className=" col">
                <div className="mb-3">
                  <label htmlFor="latitude" className="form-label">
                    Latitude
                  </label>
                  <input
                    type="input"
                    className="form-control"
                    placeholder="Masukan latitude ..."
                    value={this.state.latitude}
                    onChange={this.onLatitudeChangeHandler}
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="longitude" className="form-label">
                    Logitude
                  </label>
                  <input
                    type="input"
                    className="form-control"
                    placeholder="Masukan longitude ...."
                    value={this.state.longitude}
                    onChange={this.onLongitudeChangeHandler}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="kecamatan" className="form-label">
                Kecamatan
              </label>
              <input
                type="input"
                className="form-control"
                id="kecamatan"
                placeholder="Masukan Kecamatan ..."
                value={this.state.kecamatan}
                onChange={this.onKecamatanChangeHandler}
              />
              <div className="mb-5">
                <label htmlFor="desa" className="form-label">
                  Desa
                </label>
                <input
                  type="input"
                  className="form-control"
                  id="desa"
                  placeholder="Masukan desa ..."
                  value={this.state.desa}
                  onChange={this.onDesaChangeHandler}
                />
              </div>
            </div>
            <div className="mb-3 m-3 d-grid">
              <button
                className={
                  "btn btn-" + (this.state.isUpdate ? "success" : "primary")
                }
              >
                {this.state.isUpdate ? "Perbarui" : "Tambah"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TPAInput;
