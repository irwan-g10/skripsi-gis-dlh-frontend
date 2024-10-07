import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

function JadwalPengangkutanInput({ isUpdate = false }) {
  const [titikTpa, setTitikTPa] = React.useState("");
  const [hari, setHari] = React.useState("");
  const [dataTpa, setDataTpa] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/titik-tpa`)
      .then((response) => {
        setDataTpa(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });

    if (isUpdate) {
      // axios
      //   .get(`http://localhost:5000/api/titik-tpa/${id}`)
      //   .then((response) => {
      //     const result = response.data.result;
      //     setNamaTempat(result.nama_tempat);
      //     setJenisTong(result.jenis_tong);
      //     setUnitPelayananTeknis(result.unit_pelayanan_teknis);
      //     setLokasi(result.lokasi);
      //     setLatitude(result.latitude);
      //     setLongitude(result.longitude);
      //     setKecamatan(result.nama_tempat);
      //     setDesa(result.desa);
      //   })
      //   .catch((error) => {
      //     alert(error.message);
      //   });
    }
  }, [id, isUpdate]);

  const onTitikTpaChangeHandler = (event) => {
    setTitikTPa(event.target.value);
  };
  const onHariChangeHandler = (event) => {
    setHari(event.target.value);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const postData = {
      titikTpa: titikTpa,
      hari: hari,
    };

    // if (isUpdate) {
    //   await axios
    //     .patch(`http://localhost:5000/api/titik-tpa/${id}`, postData)
    //     .then((response) => {
    //       alert("sukses");
    //       window.location.reload();
    //     })
    //     .catch((error) => {
    //       alert(error.message);
    //     });
    // } else {
    //   await axios
    //     .post(`http://localhost:5000/api/titik-tpa`, postData)
    //     .then((response) => {
    //       alert("sukses");
    //       window.location.reload();
    //     })
    //     .catch((error) => {
    //       alert(error.message);
    //     });
    // }

    // console.log(postData);
  };

  return (
    <div className="JadwalPengangkutanInput">
      {console.log(dataTpa)}
      <div className="container">
        <div className="mb-5">
          <h2>
            {isUpdate
              ? "Perbarui Jadwal Pengangkutan"
              : "Tambah Jadwal Pengangkutan"}
          </h2>
        </div>
        <div className="border-top border-2 border-dark my-4 mx-5"></div>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              TitikTPA
            </label>

            <select
              className="form-select"
              aria-label="Default select example"
              onChange={onTitikTpaChangeHandler}
            >
              <option value={titikTpa}>
                {isUpdate ? titikTpa : "--- Pilih ---"}
              </option>

              {dataTpa.map((item) => {
                return (
                  <option value={titikTpa.nama_tempat} key={item.id}>
                    {item.nama_tempat}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3 m-3 d-grid">
            <button className={"btn btn-" + (isUpdate ? "success" : "primary")}>
              {isUpdate ? "Perbarui" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JadwalPengangkutanInput;
