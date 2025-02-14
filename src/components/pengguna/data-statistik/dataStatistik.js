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
  const dataPie = {
    labels: ["TPS Penuh", "TPS Kosong", "TPS Dalam Perawatan"],
    datasets: [
      {
        label: "Status TPS",
        data: [45, 30, 25],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF4561", "#2A91D1", "#FFB64C"],
      },
    ],
  };
  const dataBar = {
    labels: ["TPS Penuh", "TPS Kosong", "TPS Dalam Perawatan"],
    datasets: [
      {
        label: "Status TPS",
        data: [45, 30, 25],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
        hoverBackgroundColor: ["#45A049", "#1E88E5", "#FFB300"],
      },
    ],
  };
  const dataLine = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [
      {
        label: "Status TPS",
        data: [10, 5, 20, 30, 15, 5, 15],
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
      x: { title: { display: true, text: "Status TPS" } },
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
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="diagram-pie">
            <h2 className="text-center mb-4">Jenis Tempat Sampah</h2>
            <Pie data={dataPie} options={optionsPie} />
          </div>
        </div>
        <div className="col">
          <div className="diagram-bar">
            <h2 className="text-center mb-4">
              Total Sampah UPT (dalam 1 minggu)
            </h2>
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
