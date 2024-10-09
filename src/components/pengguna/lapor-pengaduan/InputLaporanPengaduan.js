import React, { useRef } from "react";
import SignaturePad from "react-signature-canvas";

function InputLaporanPengaduan() {
  const [nama_tempat, setNamaTempat] = React.useState("");
  const onNamaTempatChangeHandler = (event) => {
    setNamaTempat(event.target.value);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("item ditekan" + nama_tempat);
  };
  const signCanva = useRef({});

  const clearSignature = () => {
    console.log("button ditekan");
    signCanva.current.clear();
  };
  return (
    <div className="InputLaporanPengaduan">
      <form onSubmit={onSubmitHandler}>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>A.</h6>
            </div>
            <div className="col">
              <h6>Identitas Pengadu</h6>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">1.</h6>
            </div>
            <div className="col-3">
              <label htmlFor=" nam" className="form-label">
                Nama
              </label>
            </div>
            <div className="col">
              <input
                type="input"
                className="form-control"
                placeholder="Masukan nama tempat ..."
                value={nama_tempat}
                onChange={onNamaTempatChangeHandler}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">2.</h6>
            </div>
            <div className="col-3">
              <label htmlFor=" nam" className="form-label">
                Alamat
              </label>
            </div>
            <div className="col">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>B.</h6>
            </div>
            <div className="col">
              <h6>Lokasi Kejadian</h6>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">1.</h6>
            </div>
            <div className="col-3">
              <label htmlFor=" nam" className="form-label">
                Alamat
              </label>
            </div>
            <div className="col">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>C.</h6>
            </div>
            <div className="col">
              <h6>Dugaan Sumber atau Penyebab</h6>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">1.</h6>
            </div>
            <div className="col-3">
              <label htmlFor=" nam" className="form-label">
                Jenis Kegiatan<br></br>
                <i>(jika diketahui)</i>
              </label>
            </div>
            <div className="col">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
              ></textarea>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">2.</h6>
            </div>
            <div className="col-3">
              <label htmlFor=" nam" className="form-label">
                Nama Kegiatan Dan/atau usaha<br></br>
                <i>(jika diketahui)</i>
              </label>
            </div>
            <div className="col">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>D.</h6>
            </div>
            <div className="col">
              <h6>Waktu dan Uraian Kejadian</h6>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">1.</h6>
            </div>
            <div className="col">
              <label htmlFor=" nam" className="form-label">
                Waktu diketahuinya pencemaran dan/atau perusakan lingkungan:
              </label>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1"></div>
            <div className="col">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
              ></textarea>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">2.</h6>
            </div>
            <div className="col">
              <label htmlFor=" nam" className="form-label">
                Uraian Kejadian:
              </label>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1"></div>
            <div className="col">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">3.</h6>
            </div>
            <div className="col">
              <label htmlFor=" nam" className="form-label">
                Dampak yang dirasakan akibat pencemaran dan atau perusakan
                lingkungan dan/atau perusakan hutan :
              </label>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1"></div>
            <div className="col">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>E.</h6>
            </div>
            <div className="col">
              <h6>Lampiran:</h6>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1"></div>

            <div className="col">
              <div class="input-group mb-3">
                <input type="file" class="form-control" id="inputGroupFile02" />
                <label class="input-group-text" for="inputGroupFile02">
                  Upload
                </label>
              </div>
              <div class="input-group mb-3">
                <input type="file" class="form-control" id="inputGroupFile02" />
                <label class="input-group-text" for="inputGroupFile02">
                  Upload
                </label>
              </div>
              <div class="input-group mb-3">
                <input type="file" class="form-control" id="inputGroupFile02" />
                <label class="input-group-text" for="inputGroupFile02">
                  Upload
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>F.</h6>
            </div>
            <div className="col">
              <h6>Penyelesaian yang diinginkan:</h6>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1"></div>

            <div className="col">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>G.</h6>
            </div>
            <div className="col">
              <h6>Pernah Menyampaikan Pengaduan:</h6>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1"></div>
            <div className="col">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama Instansi</th>
                    <th scope="col">Tanggal/Bulan/Tahun</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      <input
                        type="input"
                        className="form-control"
                        placeholder="Masukan nama tempat ..."
                        value={nama_tempat}
                        onChange={onNamaTempatChangeHandler}
                      />
                    </td>
                    <td>
                      <input
                        type="input"
                        className="form-control"
                        placeholder="Masukan nama tempat ..."
                        value={nama_tempat}
                        onChange={onNamaTempatChangeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>
                      <input
                        type="input"
                        className="form-control"
                        placeholder="Masukan nama tempat ..."
                        value={nama_tempat}
                        onChange={onNamaTempatChangeHandler}
                      />
                    </td>
                    <td>
                      <input
                        type="input"
                        className="form-control"
                        placeholder="Masukan nama tempat ..."
                        value={nama_tempat}
                        onChange={onNamaTempatChangeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      <input
                        type="input"
                        className="form-control"
                        placeholder="Masukan nama tempat ..."
                        value={nama_tempat}
                        onChange={onNamaTempatChangeHandler}
                      />
                    </td>
                    <td>
                      <input
                        type="input"
                        className="form-control"
                        placeholder="Masukan nama tempat ..."
                        value={nama_tempat}
                        onChange={onNamaTempatChangeHandler}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <input
                        type="input"
                        className="form-control"
                        placeholder="Masukan nama tempat ..."
                        value={nama_tempat}
                        onChange={onNamaTempatChangeHandler}
                      /> */}
            </div>
          </div>
        </div>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>H.</h6>
            </div>
            <div className="col">
              <h6>Informasi Pengaduan</h6>
              <p>Pengadu bersedia menerima informasi melalui : </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">1.</h6>
            </div>
            <div className="col-3">
              <label htmlFor=" nam" className="form-label">
                SMS/Tlp
              </label>
            </div>
            <div className="col">
              <input
                type="input"
                className="form-control"
                placeholder="Masukan nama tempat ..."
                value={nama_tempat}
                onChange={onNamaTempatChangeHandler}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">2.</h6>
            </div>
            <div className="col-3">
              <label htmlFor=" nam" className="form-label">
                E-mail
              </label>
            </div>
            <div className="col">
              <input
                type="input"
                className="form-control"
                placeholder="Masukan nama tempat ..."
                value={nama_tempat}
                onChange={onNamaTempatChangeHandler}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">3.</h6>
            </div>
            <div className="col-3">
              <label htmlFor=" nam" className="form-label">
                Media Sosial
              </label>
            </div>
            <div className="col">
              <input
                type="input"
                className="form-control"
                placeholder="Masukan nama tempat ..."
                value={nama_tempat}
                onChange={onNamaTempatChangeHandler}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">4.</h6>
            </div>
            <div className="col-3">
              <label htmlFor=" nam" className="form-label">
                Aplikasi Pengaduan
              </label>
            </div>
            <div className="col">
              <input
                type="input"
                className="form-control"
                placeholder="Masukan nama tempat ..."
                value={nama_tempat}
                onChange={onNamaTempatChangeHandler}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">5.</h6>
            </div>
            <div className="col-3">
              <label htmlFor=" nam" className="form-label">
                Lain lain
              </label>
            </div>
            <div className="col">
              <input
                type="input"
                className="form-control"
                placeholder="Masukan nama tempat ..."
                value={nama_tempat}
                onChange={onNamaTempatChangeHandler}
              />
            </div>
          </div>
        </div>
        <div className="bagian-input mb-4">
          <div className="row">
            <div className="col-1">
              <h6>I.</h6>
            </div>
            <div className="col">
              <h6>Kerahasiaan Pengadu</h6>
              <p>
                Pengadu menginginkan informasi pengaduan untuk dirahasiakan :
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1"></div>

            <div className="col">
              <div className="mb-3 row">
                <div className="form-check  col-3 mx-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="senin"
                    value="senin"
                    id="senin"
                    // checked={hari.senin}
                    // onChange={oncheckedHariChangeHandler}
                  />
                  <label className="form-check-label" htmlFor="senin">
                    Ya
                  </label>
                </div>
                <div className="form-check  col">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="selasa"
                    value="selasa"
                    id="selasa"
                    // checked={hari.selasa}
                    // onChange={oncheckedHariChangeHandler}
                  />
                  <label className="form-check-label" htmlFor="selasa">
                    Tidak
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tanda-tangan row">
          <div className="col"></div>
          <button
            onClick={clearSignature}
            className="col-1 bg-transparent border-0 justify-content-center align-items-center d-flex"
          >
            <i class="bi bi-eraser fs-1"></i>
          </button>
          <div className="col-5 text-center">
            Soreang, 9 Oktober 2024
            <br></br>Pengadu
            <SignaturePad ref={signCanva} />
            <br></br>( {nama_tempat} )
          </div>
        </div>
        <div className="mb-3 m-3 d-grid">
          <button type="button" class="btn btn-primary">
            Laporkan
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputLaporanPengaduan;
