import { Route, Routes } from "react-router-dom";
import PengangkutHome from "../components/pengangkut/PengangkutHome";
import PengangkutSideContent from "../components/pengangkut/PengangkutSideContent";
import Profil from "../components/pengangkut/profil/profil";
import Pengaduan from "../components/pengangkut/pengaduan/pengaduan";
import Antrian from "../components/pengangkut/antrian/antrian";
import DetailPengangkutan from "../components/pengangkut/pengangkutan/detailPengangkutan";
import DetailPengaduan from "../components/pengangkut/pengaduan/detailPengaduan";
import DetailAntrianPengaduan from "../components/pengangkut/antrian/detailAntrianPengaduan";
import DetailAntrianPengangkutan from "../components/pengangkut/antrian/detailAntrianPengangkutan";
import Navigation from "../components/pengangkut/NavigationPengangkut";

function PengangkutPage() {
  return (
    <div className="Pengangkut container-fluid">
      <Navigation />
      <div className="row m-4">
        <div className="col-3">
          <PengangkutSideContent />
        </div>
        <div className="col ">
          <div className="border rounded p-3 shadow  ">
            <Routes>
              <Route path="/" element={<PengangkutHome />}></Route>

              <Route
                path="/detail-pengaduan/:id"
                element={<DetailPengaduan />}
              ></Route>
              <Route path="/antrian" element={<Antrian />}></Route>
              <Route
                path="/detail-antrian-pengaduan/:id"
                element={<DetailAntrianPengaduan />}
              ></Route>
              <Route
                path="/detail-antrian-pengangkutan/:id"
                element={<DetailAntrianPengangkutan />}
              ></Route>
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
