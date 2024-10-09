import React from "react";

function LaporPengaduanSampah() {
  const [nama_tempat, setNamaTempat] = React.useState("");
  const onNamaTempatChangeHandler = (event) => {
    setNamaTempat(event.target.value);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("item ditekan" + nama_tempat);
  };
  return (
    <div className="LaporPengaduanSampah">
      <div className="container">
        <div className="mb-5">
          <h2>Lapor Pengaduan Sampah</h2>
        </div>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor=" namaTempat" className="form-label">
              Nama Tempat
            </label>
            <input
              type="input"
              className="form-control"
              placeholder="Masukan nama tempat ..."
              value={nama_tempat}
              onChange={onNamaTempatChangeHandler}
            />
          </div>

          <div className="mb-3 m-3 d-grid">
            <button className="btn btn-primary">Laporkan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LaporPengaduanSampah;
