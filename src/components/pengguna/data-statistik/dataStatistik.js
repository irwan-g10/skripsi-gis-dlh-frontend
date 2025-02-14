import axios from "axios";
import React from "react";

import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { toPercentage } from "chart.js/helpers";

Chart.register(ArcElement, Tooltip, Legend);
Chart.register(
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);
Chart.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

function DataStatistik() {
  const [dataUPT, setDataUPT] = React.useState([]);
  const [dataTPS, setDataTPS] = React.useState([]);
  const [dataLaporanPengangkutan, setDataLaporanPengangkutan] = React.useState(
    []
  );
  const [dataLaporanPengaduan, setDataLaporanPengaduan] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/titik-upt`)
      .then((response) => {
        setDataUPT(response.data.result);
      })
      .catch((error) => {
        alert(error.message);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}api/titik-tpa`)
      .then((response) => {
        setDataTPS(response.data.result);
      })
      .catch((error) => {
        alert(error.message);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}api/laporan-pengaduan`)
      .then((response) => {
        setDataLaporanPengaduan(response.data.result);
      })
      .catch((error) => {
        alert(error.message);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}api/laporan-pengangkutan`)
      .then((response) => {
        setDataLaporanPengangkutan(response.data.result);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  const pieTotalLaporanPengaduan = dataLaporanPengaduan.reduce(
    (acc, item) => acc + Number(item.jumlah),
    0
  );
  const pieTotalTempatPembuanganSampah = dataLaporanPengangkutan
    .filter((item) => item.titik_tpa.jenis_tong === "Tempat Pembuangan Sampah") // Filter hanya jenis 'A'
    .reduce((acc, item) => acc + Number(item.jumlah), 0);
  const pieTotalIndustri = dataLaporanPengangkutan
    .filter((item) => item.titik_tpa.jenis_tong === "Indurstri") // Filter hanya jenis 'A'
    .reduce((acc, item) => acc + Number(item.jumlah), 0);
  const pieTotaPasar = dataLaporanPengangkutan
    .filter((item) => item.titik_tpa.jenis_tong === "Pasar") // Filter hanya jenis 'A'
    .reduce((acc, item) => acc + Number(item.jumlah), 0);
  const pieTotaFasilitasUmum = dataLaporanPengangkutan
    .filter((item) => item.titik_tpa.jenis_tong === "Fasilitas Umum") // Filter hanya jenis 'A'
    .reduce((acc, item) => acc + Number(item.jumlah), 0);
  const pieTotAcaradanFestival = dataLaporanPengangkutan
    .filter((item) => item.titik_tpa.jenis_tong === "Acara dan Festival") // Filter hanya jenis 'A'
    .reduce((acc, item) => acc + Number(item.jumlah), 0);
  const dataPie = {
    labels: [
      "Tempat Pembuangan Sampah",
      "Industri",
      "Pasar",
      "Fasilitas Umum",
      "Acara dan Festival",
      "Laporan Pengaduan",
    ],
    datasets: [
      {
        label: "Total Sampah (Kg)",
        data: [
          pieTotalTempatPembuanganSampah,
          pieTotalIndustri,
          pieTotaPasar,
          pieTotaFasilitasUmum,
          pieTotAcaradanFestival,
          pieTotalLaporanPengaduan,
        ],
        backgroundColor: [
          "#FF6384", // Merah Muda
          "#36A2EB", // Biru
          "#FFCE56", // Kuning
          "#4BC0C0", // Hijau Tosca
          "#9966FF", // Ungu
          "#FF9F40", // Oranye
        ],
        hoverBackgroundColor: [
          "#FF4561", // Merah Muda (lebih gelap)
          "#2A91D1", // Biru (lebih gelap)
          "#FFB64C", // Kuning (lebih gelap)
          "#3AAFA9", // Hijau Tosca (lebih gelap)
          "#7E57C2", // Ungu (lebih gelap)
          "#FF784E", // Oranye (lebih gelap)
        ],
      },
    ],
  };

  const totalPengaduanUPTSoreang = dataLaporanPengaduan
    .filter(
      (item) =>
        item.upt_tujuan.nama_upt === "UPTD pengangkutan sampah wilayah Soreang"
    )
    .reduce((acc, item) => acc + Number(item.jumlah), 0);
  const totalPengangkutanUPTSoreang = dataLaporanPengangkutan
    .filter(
      (item) =>
        item.titik_tpa.unit_pelayanan_teknis.nama_upt ===
        "UPTD pengangkutan sampah wilayah Soreang"
    )
    .reduce((acc, item) => acc + Number(item.jumlah), 0);
  const totalPengaduanUPTBaleendah = dataLaporanPengaduan
    .filter(
      (item) =>
        item.upt_tujuan.nama_upt ===
        "UPTD pengangkutan sampah wilayah Baleendah"
    )
    .reduce((acc, item) => acc + Number(item.jumlah), 0);
  const totalPengangkutanUPTBaleendah = dataLaporanPengangkutan
    .filter(
      (item) =>
        item.titik_tpa.unit_pelayanan_teknis.nama_upt ===
        "UPTD pengangkutan sampah wilayah Baleendah"
    )
    .reduce((acc, item) => acc + Number(item.jumlah), 0);
  const totalPengaduanUPTCiparay = dataLaporanPengaduan
    .filter(
      (item) =>
        item.upt_tujuan.nama_upt === "UPTD pengangkutan sampah wilayah Ciparay"
    )
    .reduce((acc, item) => acc + Number(item.jumlah), 0);
  const totalPengangkutanUPTCiparay = dataLaporanPengangkutan
    .filter(
      (item) =>
        item.titik_tpa.unit_pelayanan_teknis.nama_upt ===
        "UPTD pengangkutan sampah wilayah Ciparay"
    )
    .reduce((acc, item) => acc + Number(item.jumlah), 0);
  const dataBar = {
    labels: ["UPTD Soreang", "UPTD Baleendah", "UPTD Ciparay"],
    datasets: [
      {
        label: "Total Sampah (Kg)",
        data: [
          totalPengaduanUPTSoreang + totalPengangkutanUPTSoreang,
          totalPengaduanUPTBaleendah + totalPengangkutanUPTBaleendah,
          totalPengaduanUPTCiparay + totalPengangkutanUPTCiparay,
        ],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
        hoverBackgroundColor: ["#45A049", "#1E88E5", "#FFB300"],
      },
    ],
  };
  const today = new Date();

  const getPreviousDates = (days) => {
    const date = new Date();
    date.setDate(today.getDate() - days);
    const tanggal = String(date.getDate()).padStart(2, "0");
    const bulan = String(date.getMonth() + 1).padStart(2, "0");
    const tahun = date.getFullYear();
    return `${tanggal}/${bulan}/${tahun}`;
  };

  // Mengambil 1–6 hari sebelumnya lalu mengurutkan dari lama ke terbaru
  const previousDates = Array.from({ length: 7 }, (_, i) =>
    getPreviousDates(6 - i)
  );

  const pengaduanH = dataLaporanPengaduan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(today.toISOString().split("T")[0])
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengaduanH = pengaduanH.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);
  const pengangkutanH = dataLaporanPengangkutan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(today.toISOString().split("T")[0])
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengangkutanH = pengangkutanH.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);
  // console.log(totalJumlahPengangkutanH);
  const day2 = new Date();
  day2.setDate(day2.getDate() - 1);
  const day2Date = day2.toISOString().split("T")[0];

  const pengaduanH2 = dataLaporanPengaduan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(day2Date)
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengaduanH2 = pengaduanH2.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);
  const penngangkutanH2 = dataLaporanPengangkutan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(day2Date)
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengangkutanH2 = penngangkutanH2.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);

  const day3 = new Date();
  day3.setDate(day3.getDate() - 2);
  const day3Date = day3.toISOString().split("T")[0];

  const pengaduanH3 = dataLaporanPengaduan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(day3Date)
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengaduanH3 = pengaduanH3.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);
  const penngangkutanH3 = dataLaporanPengangkutan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(day3Date)
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengangkutanH3 = penngangkutanH3.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);

  const day4 = new Date();
  day4.setDate(day4.getDate() - 3);
  const day4Date = day4.toISOString().split("T")[0];

  const pengaduanH4 = dataLaporanPengaduan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(day4Date)
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengaduanH4 = pengaduanH4.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);
  const penngangkutanH4 = dataLaporanPengangkutan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(day4Date)
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengangkutanH4 = penngangkutanH4.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);

  const day5 = new Date();
  day5.setDate(day5.getDate() - 4);
  const day5Date = day5.toISOString().split("T")[0];

  const pengaduanH5 = dataLaporanPengaduan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(day5Date)
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengaduanH5 = pengaduanH5.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);
  const penngangkutanH5 = dataLaporanPengangkutan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(day5Date)
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengangkutanH5 = penngangkutanH5.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);

  const day6 = new Date();
  day6.setDate(day6.getDate() - 5);
  const day6Date = day6.toISOString().split("T")[0];

  const pengaduanH6 = dataLaporanPengaduan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(day6Date)
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengaduanH6 = pengaduanH6.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);
  const penngangkutanH6 = dataLaporanPengangkutan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(day6Date)
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengangkutanH6 = penngangkutanH6.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);

  const day7 = new Date();
  day7.setDate(day7.getDate() - 6);
  const day7Date = day7.toISOString().split("T")[0];

  const pengaduanH7 = dataLaporanPengaduan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(day7Date)
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengaduanH7 = pengaduanH7.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);
  const penngangkutanH7 = dataLaporanPengangkutan.filter((item) =>
    item.tanggal_pengangkutan.startsWith(day7Date)
  );
  // Jumlahkan 'jumlah' dari pengaduan hari ini
  const totalJumlahPengangkutanH7 = penngangkutanH7.reduce((sum, item) => {
    return sum + (parseInt(item.jumlah) || 0);
  }, 0);

  const dataLine = {
    labels: [...previousDates],
    datasets: [
      {
        label: "Total Sampah (Kg)",
        data: [
          totalJumlahPengaduanH7 + totalJumlahPengangkutanH7,
          totalJumlahPengaduanH6 + totalJumlahPengangkutanH6,
          totalJumlahPengaduanH5 + totalJumlahPengangkutanH5,
          totalJumlahPengaduanH4 + totalJumlahPengangkutanH4,
          totalJumlahPengaduanH3 + totalJumlahPengangkutanH3,
          totalJumlahPengaduanH2 + totalJumlahPengangkutanH2,
          totalJumlahPengaduanH + totalJumlahPengangkutanH,
        ],
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        pointBackgroundColor: "#2196F3",
        pointBorderColor: "#fff",
        pointRadius: 5,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const optionsPie = {
    responsive: true,
    plugins: { legend: { position: "top" } },
  };
  const optionsBar = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: { title: { display: true, text: "Unit Pelayanan Teknis" } },
      y: { title: { display: true, text: "Jumlah" } },
    },
  };
  const optionsLine = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: { title: { display: true, text: "Hari" } },
      y: { title: { display: true, text: "Jumlah Pengangkutan" } },
    },
  };
  const kpiData = [
    { title: "Total TPS", value: dataTPS.length, color: "primary" },
    { title: "Total UPT", value: dataUPT.length, color: "success" },
    {
      title: "Total Laporan",
      value: dataLaporanPengaduan.length,
      color: "danger",
    },
  ];
  return (
    <div className="container">
      <div className="container mt-4">
        <div className="row">
          {kpiData.map((item, index) => (
            <div key={index} md={4} className=" col mb-4 text-center">
              <div className={`card border-${item.color} shadow`}>
                <div className="card-body">
                  <div className="card-title text-uppercase text-muted font-weight-bold">
                    {item.title}
                  </div>
                  <h3 className={`text-${item.color}`}>{item.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-top border-2 border-dark my-4 mx-5"></div>
      <div className="row">
        <div className="col">
          <div className="diagram-pie">
            <h2 className="text-center mb-4">Jenis Tempat Sampah</h2>
            <Pie data={dataPie} options={optionsPie} />
          </div>
        </div>
        <div className="col">
          <div className="diagram-bar">
            <h2 className="text-center mb-4">Total Sampah UPT</h2>
            <Bar data={dataBar} options={optionsBar} />
            <h2 className="text-center mb-4">Pengangkutan Harian</h2>
            <Line data={dataLine} options={optionsLine} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataStatistik;
