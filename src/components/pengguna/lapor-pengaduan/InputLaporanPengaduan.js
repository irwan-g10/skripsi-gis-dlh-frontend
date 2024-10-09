import React, { useRef } from "react";
import SignaturePad from "react-signature-canvas";

function InputLaporanPengaduan() {
  const [nama, setNama] = React.useState("");
  const [alamatPengadu, setAlamatPengadu] = React.useState("");
  const [lokasiKejadian, setLokasiKejadian] = React.useState("");
  const [jenisKegiatan, setJenisKegiatan] = React.useState("");
  const [namaKegiatan, setNamaKegiatan] = React.useState("");
  const [waktuKejadian, setWaktuKejadian] = React.useState("");
  const [uraianKejadian, setUraianKejadian] = React.useState("");
  const [dampakkejadian, setDampakKejadian] = React.useState("");
  const [informasiSms, setInformasiSms] = React.useState("");
  const [informasiEmail, setInformasiEmail] = React.useState("");
  const [informasiMediaSosial, setInformasiMediaSosial] = React.useState("");
  const [informasiLain, setInformasiLain] = React.useState("");
  const [harapanPenyelesaian, setHarapanPenyelesaian] = React.useState("");

  const onNamaChangeHandler = (event) => {
    setNama(event.target.value);
  };
  const onAlamatPengaduChangeHandler = (event) => {
    setAlamatPengadu(event.target.value);
  };
  const onLokasiKejadianChangeHandler = (event) => {
    setLokasiKejadian(event.target.value);
  };
  const onJenisKegiatanChangeHandler = (event) => {
    setJenisKegiatan(event.target.value);
  };
  const onNamaKegiatanChangeHandler = (event) => {
    setNamaKegiatan(event.target.value);
  };
  const onWaktuKejadianChangeHandler = (event) => {
    setWaktuKejadian(event.target.value);
  };
  const onUraianKejadianChangeHandler = (event) => {
    setUraianKejadian(event.target.value);
  };
  const onDampakKejadianChangeHandler = (event) => {
    setDampakKejadian(event.target.value);
  };
  const onInformasiSmsChangeHandler = (event) => {
    setInformasiSms(event.target.value);
  };
  const onInformasiEmailChangeHandler = (event) => {
    setInformasiEmail(event.target.value);
  };
  const onInformasiMediaSosialChangeHandler = (event) => {
    setInformasiMediaSosial(event.target.value);
  };
  const onInformasiLainChangeHandler = (event) => {
    setInformasiLain(event.target.value);
  };
  const onHarapanPenyelesaianChangeHandler = (event) => {
    setHarapanPenyelesaian(event.target.value);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const postData = {
      nama,
      alamat_pengadu: alamatPengadu,
      lokasi_kejadian: lokasiKejadian,
      jenis_kegiatan: jenisKegiatan,
      nama_kegiatan: namaKegiatan,
      waktu_kejadian: waktuKejadian,
      uraian_kejadian: uraianKejadian,
      dampak_kejadian: dampakkejadian,
      harapan_penyelesaian: harapanPenyelesaian,
      informasi_telepon: informasiSms,
      informasi_email: informasiEmail,
      informasi_media_sosial: informasiMediaSosial,
      informasi_lain: informasiLain,
    };
    console.log(postData);
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
              <label className="form-label">Nama</label>
            </div>
            <div className="col">
              <input
                type="input"
                className="form-control"
                placeholder="Masukan nama tempat ..."
                value={nama}
                onChange={onNamaChangeHandler}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">2.</h6>
            </div>
            <div className="col-3">
              <label className="form-label">Alamat</label>
            </div>
            <div className="col">
              <textarea
                class="form-control"
                value={alamatPengadu}
                onChange={onAlamatPengaduChangeHandler}
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
              <label className="form-label">Alamat</label>
            </div>
            <div className="col">
              <textarea
                class="form-control"
                rows="4"
                value={lokasiKejadian}
                onChange={onLokasiKejadianChangeHandler}
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
              <label className="form-label">
                Jenis Kegiatan<br></br>
                <i>(jika diketahui)</i>
              </label>
            </div>
            <div className="col">
              <textarea
                class="form-control"
                value={jenisKegiatan}
                onChange={onJenisKegiatanChangeHandler}
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
                value={namaKegiatan}
                rows="2"
                onChange={onNamaKegiatanChangeHandler}
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
                value={waktuKejadian}
                onChange={onWaktuKejadianChangeHandler}
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
                value={uraianKejadian}
                onChange={onUraianKejadianChangeHandler}
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
                value={dampakkejadian}
                onChange={onDampakKejadianChangeHandler}
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
                value={harapanPenyelesaian}
                onChange={onHarapanPenyelesaianChangeHandler}
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
                        value={nama}
                        onChange={onNamaChangeHandler}
                      />
                    </td>
                    <td>
                      <input
                        type="input"
                        className="form-control"
                        placeholder="Masukan nama tempat ..."
                        value={nama}
                        onChange={onNamaChangeHandler}
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
                        value={nama}
                        onChange={onNamaChangeHandler}
                      />
                    </td>
                    <td>
                      <input
                        type="input"
                        className="form-control"
                        placeholder="Masukan nama tempat ..."
                        value={nama}
                        onChange={onNamaChangeHandler}
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
                        value={nama}
                        onChange={onNamaChangeHandler}
                      />
                    </td>
                    <td>
                      <input
                        type="input"
                        className="form-control"
                        placeholder="Masukan nama tempat ..."
                        value={nama}
                        onChange={onNamaChangeHandler}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
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
                value={informasiSms}
                onChange={onInformasiSmsChangeHandler}
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
                value={informasiEmail}
                onChange={onInformasiEmailChangeHandler}
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
                value={informasiMediaSosial}
                onChange={onInformasiMediaSosialChangeHandler}
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-1">
              <h6 className="text-end">4.</h6>
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
                value={informasiLain}
                onChange={onInformasiLainChangeHandler}
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
            <br></br>( {nama} )
          </div>
        </div>
        <div className="mb-3 m-3 d-grid">
          <button class="btn btn-primary">Laporkan</button>
        </div>
      </form>
    </div>
  );
}

export default InputLaporanPengaduan;
