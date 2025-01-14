import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function ItemAntrian({ data }) {
  const [distance, setDistance] = React.useState(null);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latA = parseFloat(data.latitude);
          const logA = parseFloat(data.longitude);
          const latB = parseFloat(position.coords.latitude);
          const logB = parseFloat(position.coords.longitude);

          const pointA = { lat: latA, lon: logA }; // Contoh titik A (Bandung)
          const pointB = { lat: latB, lon: logB }; // Contoh titik B (Bandung)
          const url = `http://router.project-osrm.org/route/v1/driving/${pointA.lon},${pointA.lat};${pointB.lon},${pointB.lat}?overview=false`;
          axios
            .get(url)
            .then((response) => {
              const route = response.data.routes[0];
              const distanceInMeters = route.distance;
              const distanceInKm = distanceInMeters / 1000;
              console.log(distanceInKm);
              setDistance(distanceInKm.toFixed(2)); // Set jarak dan bulatkan ke 2 angka desimal
            })
            .catch((error) => {
              alert(error.message);
            });
        },
        (err) => console.log("err.message")
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, [data.latitude, data.longitude]);
  function formatDateTime(date) {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dayName = days[date.getDay()]; // Nama hari
    const day = date.getDate(); // Tanggal
    const month = months[date.getMonth()]; // Nama bulan
    const year = date.getFullYear(); // Tahun
    const hours = String(date.getHours()).padStart(2, "0"); // Jam (2 digit)
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Menit (2 digit)

    // Format: 22.00 / Sabtu, 18 Agustus 2020
    return `${hours}.${minutes} / ${dayName}, ${day} ${month} ${year}`;
  }
  return (
    <tbody>
      <tr>
        <th scope="row">Nama</th>
        <td className="text-end">{data.nama_tempat}</td>
      </tr>

      <tr>
        <th scope="row">Alamat</th>
        <td className="text-end">{data.alamat}</td>
      </tr>
      <tr>
        <th scope="row">jarak</th>
        <td className="text-end">{distance} km</td>
      </tr>
      <tr>
        <th scope="row">tanggal laporan</th>
        <td className="text-end">
          {formatDateTime(new Date(data.tanggal_laporan))}
        </td>
      </tr>
    </tbody>
  );
}

export default ItemAntrian;
