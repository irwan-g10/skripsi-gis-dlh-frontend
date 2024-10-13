import { Route, Routes } from "react-router-dom";
import PengangkutHome from "../components/pengangkut/PengangkutHome";
import PengangkutSideContent from "../components/pengangkut/PengangkutSideContent";
import Profil from "../components/pengangkut/profil/profil";
import Pengaduan from "../components/pengangkut/pengaduan/pengaduan";
import Antrian from "../components/pengangkut/antrian/antrian";
import DetailPengangkutan from "../components/pengangkut/pengangkutan/detailPengangkutan";

function PengangkutPage() {
  return (
    <div className="Pengangkut container-fluid">
      <div className="row">
        <div className="col-3">
          <PengangkutSideContent />
        </div>
        <div className="col ">
          <div className="border rounded p-3 shadow  ">
            <Routes>
              <Route path="/" element={<PengangkutHome />}></Route>

              <Route
                path="/pengangkutan-detail/:id"
                element={<DetailPengangkutan />}
              ></Route>
              <Route path="/antrian" element={<Antrian />}></Route>
              <Route path="/pengaduan" element={<Pengaduan />}></Route>
              <Route path="/profile" element={<Profil />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PengangkutPage;
